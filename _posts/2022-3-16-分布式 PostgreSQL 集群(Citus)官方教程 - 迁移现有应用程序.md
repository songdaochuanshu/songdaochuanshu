---
layout: post
title: "分布式 PostgreSQL 集群(Citus)官方教程 - 迁移现有应用程序"
date: "2022-03-16T06:10:39.518Z"
---
分布式 PostgreSQL 集群(Citus)官方教程 - 迁移现有应用程序
=======================================

![](https://img2022.cnblogs.com/blog/436453/202203/436453-20220316105813549-1671497169.png)

将现有应用程序迁移到 `Citus` 有时需要调整 `schema` 和查询以获得最佳性能。 `Citus` 扩展了 `PostgreSQL` 的分布式功能，但它不是扩展所有工作负载的直接替代品。高性能 `Citus` 集群需要考虑数据模型、工具和所使用的 `SQL` 功能的选择。

第一步是优化现有的数据库模式，以便它可以在多台计算机上高效工作。

*   确定分布策略
    *   选择`分布键(distribution key)`
    *   识别表的类型
*   为迁移准备源表
    *   添加分布键
    *   回填新创建的列

接下来，更新应用程序代码和查询以处理 `schema` 更改。

*   准备申请 `Citus`
    *   建立开发 `Citus` 集群
    *   向查询添加分布键
    *   启用安全连接
    *   检查跨节点流量

在开发环境中测试更改后，最后一步是将生产数据迁移到 `Citus` 集群并切换生产应用程序。我们有技术可以最大限度地减少此步骤的停机时间。

*   迁移生产数据
    *   小型数据库迁移
    *   大数据库迁移

确定分布策略
------

### 选择分布键

迁移到 `Citus` 的第一步是确定合适的`distribution key` 并相应地规划表分布。 在多租户应用程序中，这通常是租户的内部标识符。我们通常将其称为`“租户 ID(tenant ID)”`。用例可能会有所不同，因此我们建议您在此步骤中进行彻底检查。

如需指导，请阅读以下部分：

1.  [确定应用程序类型](https://docs.citusdata.com/en/v10.2/develop/app_type.html#app-type)
    *   [https://docs.citusdata.com/en/v10.2/develop/app\_type.html#app-type](https://docs.citusdata.com/en/v10.2/develop/app_type.html#app-type)
2.  [选择分布列](https://docs.citusdata.com/en/v10.2/sharding/data_modeling.html#distributed-data-modeling)
    *   [https://docs.citusdata.com/en/v10.2/sharding/data\_modeling.html#distributed-data-modeling](https://docs.citusdata.com/en/v10.2/sharding/data_modeling.html#distributed-data-modeling)

我们很乐意帮助您检查您的环境，以确保选择了理想的 `distribution key`。 为此，我们通常会检查 `schema` 布局、更大的表、长时间运行和/或有问题的查询、标准用例等。

### 确定表的类型

一旦确定了 `distribution key`，请查看 `schema` 以确定如何处理每个表以及是否需要对表布局进行任何修改。我们通常建议使用电子表格进行跟踪，并创建了您可以使用的[模板](https://docs.google.com/spreadsheets/d/1jYlc22lHdP91pTrb6s35QfrN9nTE1BkVJnCSZeQ7ZmI/edit)。

*   [https://docs.google.com/spreadsheets/d/1jYlc22lHdP91pTrb6s35QfrN9nTE1BkVJnCSZeQ7ZmI/edit](https://docs.google.com/spreadsheets/d/1jYlc22lHdP91pTrb6s35QfrN9nTE1BkVJnCSZeQ7ZmI/edit)

表格通常属于以下类别之一：

1.  **准备分发。** 这些表已经包含 `distribution key`，并准备好分发。
2.  **需要回填。** 这些表可以按所选 `key` 进行逻辑分布，但不包含直接引用它的列。稍后将修改这些表以添加该列。
3.  **参考表。** 这些表通常很小，不包含 `distribution key`，通常由分布式表连接，和/或在租户之间共享。这些表中的每一个的副本将在所有节点上维护。常见示例包括国家代码查找、产品类别等。
4.  **本地表。** 这些通常不连接到其他表，并且不包含 `distribution key`。 它们仅在 `coordinator` 节点上维护。常见示例包括管理员用户查找和其他实用程序表。

考虑一个类似于 `Etsy` 或 `Shopify` 的示例多租户应用程序，其中每个租户都是商店。这是简化 `schema` 的一部分：

![](https://img2022.cnblogs.com/blog/436453/202203/436453-20220316105834399-1841308844.png)

（带下划线的项目是主键，斜体项目是外键。）

在此示例中，商店是自然租户。在这种情况下，租户 `ID` 是 `store_id`。 在集群中分布表之后，我们希望与同一存储相关的行一起驻留在同一节点上。

为迁移准备源表
-------

一旦确定了所需数据库更改的范围，下一个主要步骤就是修改应用程序现有数据库的数据结构。首先，修改需要回填的表，为 `distribution key` 添加一列。

### 添加分布键

在我们的店面示例中，`stores` 和 `products` 表有一个 `store_id` 并准备好分布。规范化后，`line_items` 表缺少`商店 ID`。如果我们想通过 `store_id` 分布，表需要这个列。

    -- denormalize line_items by including store_id
    
    ALTER TABLE line_items ADD COLUMN store_id uuid;
    

请务必检查所有表中的分布列是否具有相同的类型，例如：不要混合 `int` 和 `bigint`。列类型必须匹配以确保正确的数据托管。

### 回填新创建的列

更新 `schema` 后，在添加该列的表中回填 `tenant_id` 列的缺失值。 在我们的示例中，`line_items` 需要 `store_id` 的值。

我们通过从带有订单的 `join` 查询中获取缺失值来回填表：

    UPDATE line_items
       SET store_id = orders.store_id
      FROM line_items
     INNER JOIN orders
     WHERE line_items.order_id = orders.order_id;
    

一次执行整个表可能会导致数据库负载过大并中断其他查询。 相反，回填可以更慢地完成。 一种方法是创建一个一次回填小批量的函数，然后使用 [pg\_cron](https://github.com/citusdata/pg_cron) 重复调用该函数。

*   [https://github.com/citusdata/pg\_cron](https://github.com/citusdata/pg_cron)

    -- the function to backfill up to one
    -- thousand rows from line_items
    
    CREATE FUNCTION backfill_batch()
    RETURNS void LANGUAGE sql AS $$
      WITH batch AS (
        SELECT line_items_id, order_id
          FROM line_items
         WHERE store_id IS NULL
         LIMIT 10000
           FOR UPDATE
          SKIP LOCKED
      )
      UPDATE line_items AS li
         SET store_id = orders.store_id
        FROM batch, orders
       WHERE batch.line_item_id = li.line_item_id
         AND batch.order_id = orders.order_id;
    $$;
    
    -- run the function every quarter hour
    SELECT cron.schedule('*/15 * * * *', 'SELECT backfill_batch()');
    
    -- ^^ note the return value of cron.schedule
    

回填完成后，可以禁用 `cron job`：

    -- assuming 42 is the job id returned
    -- from cron.schedule
    
    SELECT cron.unschedule(42);
    

准备申请 Citus
----------

### 建立开发 Citus 集群

在修改应用程序以使用 `Citus` 时，您需要一个数据库来进行测试。 按照说明设置您选择的[单节点 Citus](https://docs.citusdata.com/en/v10.2/installation/single_node.html#development)。

*   [https://docs.citusdata.com/en/v10.2/installation/single\_node.html#development](https://docs.citusdata.com/en/v10.2/installation/single_node.html#development)

接下来从应用程序的原始数据库中转储 `schema` 的副本，并在新的开发数据库中恢复 `schema`。

    # get schema from source db
    
    pg_dump \
       --format=plain \
       --no-owner \
       --schema-only \
       --file=schema.sql \
       --schema=target_schema \
       postgres://user:pass@host:5432/db
    
    # load schema into test db
    
    psql postgres://user:pass@testhost:5432/db -f schema.sql
    

该 `schema` 应在您希望分发的所有表中包含一个分发键（`tenant id`）。在 `pg_dumping` _schema_ 之前，请确保您已完成上一节中的准备源表以进行迁移的步骤。

#### 在键中包含分布列

`Citus` [不能强制](https://docs.citusdata.com/en/v10.2/reference/common_errors.html#non-distribution-uniqueness)唯一性约束，除非唯一索引或主键包含分布列。因此，我们必须在示例中修改主键和外键以包含 `store_id`。

*   [https://docs.citusdata.com/en/v10.2/reference/common\_errors.html#non-distribution-uniqueness](https://docs.citusdata.com/en/v10.2/reference/common_errors.html#non-distribution-uniqueness)

下一节中列出的一些库能够帮助迁移数据库 `schema` 以将分布列包含在键中。 然而，下面是一个底层 `SQL` 命令示例，用于在开发数据库中组合简单键：

    BEGIN;
    
    -- drop simple primary keys (cascades to foreign keys)
    
    ALTER TABLE products   DROP CONSTRAINT products_pkey CASCADE;
    ALTER TABLE orders     DROP CONSTRAINT orders_pkey CASCADE;
    ALTER TABLE line_items DROP CONSTRAINT line_items_pkey CASCADE;
    
    -- recreate primary keys to include would-be distribution column
    
    ALTER TABLE products   ADD PRIMARY KEY (store_id, product_id);
    ALTER TABLE orders     ADD PRIMARY KEY (store_id, order_id);
    ALTER TABLE line_items ADD PRIMARY KEY (store_id, line_item_id);
    
    -- recreate foreign keys to include would-be distribution column
    
    ALTER TABLE line_items ADD CONSTRAINT line_items_store_fkey
      FOREIGN KEY (store_id) REFERENCES stores (store_id);
    ALTER TABLE line_items ADD CONSTRAINT line_items_product_fkey
      FOREIGN KEY (store_id, product_id) REFERENCES products (store_id, product_id);
    ALTER TABLE line_items ADD CONSTRAINT line_items_order_fkey
      FOREIGN KEY (store_id, order_id) REFERENCES orders (store_id, order_id);
    
    COMMIT;
    

至此完成，上一节中的 `schema` 将如下所示：

![](https://img2022.cnblogs.com/blog/436453/202203/436453-20220316105854147-719492515.png)

（带下划线的项目是主键，斜体项目是外键。）

请务必修改数据流以向传入数据添加键。

### 向查询添加分布键

一旦 `distribution key` 出现在所有适当的表上，应用程序就需要将它包含在查询中。 以下步骤应使用在开发环境中运行的应用程序副本完成，并针对 `Citus` 后端进行测试。在应用程序与 `Citus` 一起工作后，我们将了解如何将生产数据从源数据库迁移到真正的 `Citus` 集群中。

*   应更新写入表的应用程序代码和任何其他摄取进程以包含新列。
*   在 `Citus` 上针对修改后的 `schema` 运行应用程序测试套件是确定哪些代码区域需要修改的好方法。
*   启用数据库日志记录是个好主意。 这些日志可以帮助发现多租户应用程序中的杂散跨分片查询，这些查询应转换为每租户查询。

支持跨分片查询，但在多租户应用程序中，大多数查询应针对单个节点。 对于简单的 `select`、`update` 和 `delete` 查询，这意味着 `where` 子句应按 `tenant id` 进行过滤。`Citus` 然后可以在单个节点上有效地运行这些查询。

许多流行的应用程序框架都有一些帮助程序库，可以很容易地在查询中包含`租户 ID`：

*   [Ruby on Rails](https://docs.citusdata.com/en/v10.2/develop/migration_mt_ror.html)
    *   [https://docs.citusdata.com/en/v10.2/develop/migration\_mt\_ror.html](https://docs.citusdata.com/en/v10.2/develop/migration_mt_ror.html)
*   [Django](https://docs.citusdata.com/en/v10.2/develop/migration_mt_django.html)
    *   [https://docs.citusdata.com/en/v10.2/develop/migration\_mt\_django.html](https://docs.citusdata.com/en/v10.2/develop/migration_mt_django.html)
*   [ASP.NET](https://docs.citusdata.com/en/v10.2/develop/migration_mt_asp.html)
    *   [https://docs.citusdata.com/en/v10.2/develop/migration\_mt\_asp.html](https://docs.citusdata.com/en/v10.2/develop/migration_mt_asp.html)
*   [Java Hibernate](https://www.citusdata.com/blog/2018/02/13/using-hibernate-and-spring-to-build-multitenant-java-apps/)
    *   [https://www.citusdata.com/blog/2018/02/13/using-hibernate-and-spring-to-build-multitenant-java-apps/](https://www.citusdata.com/blog/2018/02/13/using-hibernate-and-spring-to-build-multitenant-java-apps/)

可以先将库用于数据库写入（包括数据摄取），然后再用于读取查询。 例如，[activerecord-multi-tenant](https://github.com/citusdata/activerecord-multi-tenant) gem 有一个只修改写查询的[只写模式(write-only mode)](https://github.com/citusdata/activerecord-multi-tenant#rolling-out-activerecord-multi-tenant-for-your-application-write-only-mode)。

*   activerecord-multi-tenant
    *   [https://github.com/citusdata/activerecord-multi-tenant](https://github.com/citusdata/activerecord-multi-tenant)
*   write-only mode
    *   [https://github.com/citusdata/activerecord-multi-tenant#rolling-out-activerecord-multi-tenant-for-your-application-write-only-mode](https://github.com/citusdata/activerecord-multi-tenant#rolling-out-activerecord-multi-tenant-for-your-application-write-only-mode)

#### 其他（SQL原则）

如果您使用与上述不同的 `ORM`，或者更直接地在 `SQL` 中执行多租户查询，请遵循这些一般原则。 我们将使用我们之前的电子商务应用程序示例。

假设我们想要获取订单的详细信息。过滤`租户 ID` 的分布式查询在多租户应用程序中运行效率最高，因此下面的更改使查询更快（而两个查询返回相同的结果）：

    -- before
    SELECT *
      FROM orders
     WHERE order_id = 123;
    
    -- after
    SELECT *
      FROM orders
     WHERE order_id = 123
       AND store_id = 42; -- <== added
    

`租户 id` 列不仅对插入语句有益，而且至关重要。插入必须包含`租户 id` 列的值，否则 `Citus` 将无法将数据路由到正确的分片并引发错误。

最后，在 `join` 表时，请确保也按`租户 ID` 进行过滤。 例如，这里是如何检查给定商店已售出多少“很棒的羊毛裤”：

    -- One way is to include store_id in the join and also
    -- filter by it in one of the queries
    
    SELECT sum(l.quantity)
      FROM line_items l
     INNER JOIN products p
        ON l.product_id = p.product_id
       AND l.store_id = p.store_id
     WHERE p.name='Awesome Wool Pants'
       AND l.store_id='8c69aa0d-3f13-4440-86ca-443566c1fc75'
    
    -- Equivalently you omit store_id from the join condition
    -- but filter both tables by it. This may be useful if
    -- building the query in an ORM
    
    SELECT sum(l.quantity)
      FROM line_items l
     INNER JOIN products p ON l.product_id = p.product_id
     WHERE p.name='Awesome Wool Pants'
       AND l.store_id='8c69aa0d-3f13-4440-86ca-443566c1fc75'
       AND p.store_id='8c69aa0d-3f13-4440-86ca-443566c1fc75'
    

### 启用安全连接

客户端应使用 `SSL` 连接到 `Citus` 以保护信息并防止中间人攻击。 事实上，`Citus Cloud` 拒绝未加密的连接。要了解如何建立 `SSL` 连接，请参阅使用 [SSL 连接](https://docs.citusdata.com/en/v10.2/cloud/security.html#cloud-ssl)。

*   SSL 连接
    *   [https://docs.citusdata.com/en/v10.2/cloud/security.html#cloud-ssl](https://docs.citusdata.com/en/v10.2/cloud/security.html#cloud-ssl)

### 检查跨节点流量

对于庞大而复杂的应用程序代码库，应用程序生成的某些查询通常会被忽略，因此不会对它们使用 `tenant_id` 过滤器。`Citus` 的并行执行器仍然会成功执行这些查询，因此，在测试期间，这些查询仍然隐藏，因为应用程序仍然可以正常工作。但是，如果查询不包含 `tenant_id` 过滤器，`Citus` 的执行程序将并行访问每个分片，但只有一个会返回数据。 这会不必要地消耗资源，并且只有在迁移到更高吞吐量的生产环境时才会出现问题。

为了防止在生产中启动后才遇到此类问题，可以设置一个配置值来记录命中多个分片的查询。在正确配置和迁移的多租户应用程序中，每个查询一次只能命中一个分片。

在测试期间，可以配置以下内容：

    -- adjust for your own database's name of course
    
    ALTER DATABASE citus SET citus.multi_task_query_log_level = 'error';
    

如果 `Citus` 遇到将命中多个分片的查询，它将出错。 测试期间出错允许应用程序开发人员查找和迁移此类查询。

在生产启动期间，可以配置相同的设置来记录，而不是错误输出：

    ALTER DATABASE citus SET citus.multi_task_query_log_level = 'log';
    

[配置参数部分](https://docs.citusdata.com/en/v10.2/develop/api_guc.html#multi-task-logging)包含有关此设置支持的值的更多信息。

*   配置参数部分
    *   [https://docs.citusdata.com/en/v10.2/develop/api\_guc.html#multi-task-logging](https://docs.citusdata.com/en/v10.2/develop/api_guc.html#multi-task-logging)

迁移生产数据
------

此时，已更新数据库 `schema` 和应用程序查询以与 `Citus` 一起使用，您已准备好进行最后一步。是时候将数据迁移到 `Citus` 集群并将应用程序切换到其新数据库了。

`数据迁移路径`取决于`停机时间要求`和`数据大小`，但通常属于以下两类之一。

*   小型数据库迁移
*   大数据库迁移

### 小型数据库迁移

对于可以容忍一点停机时间的较小环境，请使用简单的 `pg_dump/pg_restore` 进程。以下是步骤。

1.  从您的开发数据库中保存数据库结构：
    
        pg_dump \
           --format=plain \
           --no-owner \
           --schema-only \
           --file=schema.sql \
           --schema=target_schema \
           postgres://user:pass@host:5432/db
        
    
2.  使用 `psql` 连接到 `Citus` 集群并创建 `schema`：
    
        \i schema.sql
        
    
3.  运行您的 [`create_distributed_table`](https://docs.citusdata.com/en/v10.2/develop/api_udf.html#create-distributed-table) 和 [`create_reference_table`](https://docs.citusdata.com/en/v10.2/develop/api_udf.html#create-reference-table) 语句。如果您收到有关外键的错误，通常是由于操作顺序所致。 在分发表之前删除外键，然后重新添加它们。
    
4.  将应用程序置于维护模式，并禁用对旧数据库的任何其他写入。
    
5.  使用 `pg_dump` 将原始生产数据库中的数据保存到磁盘：
    
        pg_dump \
           --format=custom \
           --no-owner \
           --data-only \
           --file=data.dump \
           --schema=target_schema \
           postgres://user:pass@host:5432/db
        
    
6.  使用 `pg_restore` 导入 `Citus`：
    
        # remember to use connection details for Citus,
        # not the source database
        pg_restore  \
           --host=host \
           --dbname=dbname \
           --username=username \
           data.dump
        
        # it'll prompt you for the connection password
        
    
7.  测试应用。
    
8.  运行。
    

### 大数据库迁移(Citus Cloud)

较大的环境可以使用 `Citus Warp` 进行在线复制。`Citus Warp` 允许您在更改发生时将更改从 `PostgreSQL` 源数据库流式传输到 [`Citus Cloud`](https://docs.citusdata.com/en/v10.2/cloud/getting_started.html#cloud-overview) 集群。 就好像应用程序自动写入两个数据库而不是一个，除非具有完美的事务逻辑。`Citus Warp` 可与启用了 `logical_decoding` 插件的 `Postgres 9.4` 及更高版本一起使用（只要您使用的是 `9.4` 或更高版本，`Amazon RDS` 就支持此功能）。

对于此过程，我们强烈建议您通过开 `ticket`、联系我们在 `Slack` 上的解决方案工程师之一或任何适合您的方法来联系我们。为了进行 `warp`，我们通过 `VPC` 对等或 `IP 白名单`将 `Citus` 集群的 `coordinator` 节点连接到现有数据库，并开始复制。

以下是开始 `Citus Warp` 流程之前需要执行的步骤：

1.  在目标 `Citus` 集群上复制 `schema` 结构
2.  在源数据库中启用逻辑复制
3.  允许从 Citus `coordinator` 节点到源的网络连接
4.  联系我们开始复制

#### 重复 schema

将数据迁移到 `Citus` 的第一步是确保 `schema` 完全匹配，至少对于您选择迁移的表而言。 一种方法是针对您的开发数据库（用于本地测试应用程序的 `Citus` 数据库）运行 `pg_dump --schema-only`。在 `coordinator Citus` 节点上重放输出。 另一种方法是针对目标数据库运行应用程序迁移脚本。

您希望迁移的所有表都必须具有`主键`。 相应的目标表也必须具有`主键`，唯一的区别是这些键也允许组合以包含`分布列`，如识别分布策略中所述。

还要确保在开始复制之前在集群中分布表，这样数据就不必单独放在 `coordinator` 节点上。

#### 启用逻辑复制

某些托管数据库（例如 `Amazon RDS`）需要通过更改服务器配置参数来启用复制。在 `RDS` 上，您需要创建一个新参数组，在其中设置 `rds.logical_replication = 1`，然后将参数组设为活动参数组。 应用更改需要重新启动数据库服务器，这可以安排在下一个维护时段。

如果您正在管理自己的 `PostgreSQL` 安装，请将这些设置添加到 `postgresql.conf`：

    wal_level = logical
    max_replication_slots = 5 # has to be > 0
    max_wal_senders = 5       # has to be > 0
    

需要重新启动数据库才能使更改生效。

#### 开放访问网络连接

在 Cloud 控制台中，确定主机名（以 `db.citusdata.com` 结尾）。`Dig` 主机名以找到其 `IP` 地址：

    dig +short <hostname> A
    

如果您使用的是 `RDS`，请编辑入站数据库安全组以添加自定义 `TCP` 规则：

**Protocol**

*   TCP

**Port Range**

*   5432

**Source**

*   /32

这会将 `Citus coordinator` 节点的 `IP` 地址列入白名单以进行入站连接。 连接两者的另一种方法是在它们的 `VPC` 之间建立对等互连。如果需要，我们可以帮助进行设置。

#### 开始复制

通过在 `Citus Cloud` 控制台中打开 `support ticket` 与我们联系。云工程师将使用 `Citus Warp` 连接到您的数据库，以执行初始数据库转储、打开复制槽并开始复制。 我们可以在迁移中包含/排除您选择的表。

在复制的第一阶段，如果数据库处于写入负载下，`Postgres` 预写日志 (`WAL`) 可能会大幅增长。 在开始此过程之前，请确保源数据库上有足够的磁盘空间。我们建议 `100GB` 可用空间或总磁盘空间的 `20%`，以较大者为准。一旦初始 `dump/restore` 完成并开始复制，那么数据库将能够再次归档未使用的 `WAL` 文件。

随着 `Warp` 的进行，**请注意源数据库上的磁盘使用情况**。 如果源和目标之间存在数据类型不匹配，或其他意外的 `schema` 更改，则复制可能会停止。 在长时间停顿期间，复制槽可以在源上无限增长，从而导致潜在的崩溃。

由于复制停滞的可能性，我们强烈建议在进行 `Citus warp` 时尽量减少 `schema` 更改。 如果需要进行侵入式 `schema` 更改，您将需要停止 `warp` 并重试。

进行侵入式 `schema` 更改的步骤：

1.  请求 `Citus Cloud` 工程师停止 `warp`。
2.  更改源数据库上的 `schema`。
3.  更改目标数据库上的 `schema`。
4.  再次开始 `warp`。

#### 切换到 Citus 并停止与旧数据库的所有连接

当复制赶上源数据库的当前状态时，还有一件事要做。 由于复制过程的性质，序列值不会在目标数据库上正确更新。为了获得正确的序列值，例如 `id` 列，您需要在打开对目标数据库的写入之前手动调整序列值。

一旦这一切完成，应用程序就可以连接到新数据库了。 我们不建议同时写入源数据库和目标数据库。

当应用程序切换到新数据库并且源数据库上没有发生进一步的更改时，请再次联系我们以删除复制槽。 迁移完成。

更多
--

*   [分布式 PostgreSQL 集群(Citus)官方示例 - 多租户应用程序实战](https://mp.weixin.qq.com/s/QX1l8642kd6hpxsA2J6UxA)