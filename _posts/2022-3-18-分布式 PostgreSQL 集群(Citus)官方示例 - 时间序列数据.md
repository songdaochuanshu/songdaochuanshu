---
layout: post
title: "分布式 PostgreSQL 集群(Citus)官方示例 - 时间序列数据"
date: "2022-03-18T07:16:43.619Z"
---
分布式 PostgreSQL 集群(Citus)官方示例 - 时间序列数据
=====================================

![](https://img2022.cnblogs.com/blog/436453/202203/436453-20220318102329090-508054201.jpg)

在时间序列工作负载中，应用程序（例如一些[实时应用程序](https://docs.citusdata.com/en/v10.2/sharding/data_modeling.html#distributing-by-entity-id)查询最近的信息，同时归档旧信息。

*   [https://docs.citusdata.com/en/v10.2/sharding/data\_modeling.html#distributing-by-entity-id](https://docs.citusdata.com/en/v10.2/sharding/data_modeling.html#distributing-by-entity-id)

为了处理这种工作负载，单节点 `PostgreSQL` 数据库通常会使用[表分区](https://www.postgresql.org/docs/current/static/ddl-partitioning.html)将一个按时间排序的大数据表分解为多个继承表，每个表包含不同的时间范围。

*   [https://www.postgresql.org/docs/current/static/ddl-partitioning.html](https://www.postgresql.org/docs/current/static/ddl-partitioning.html)

将数据存储在多个物理表中会加速数据过期。 在单个大表中，删除行会产生扫描以查找要删除的行，然后清理清空空间的成本。 另一方面，删除分区是一种与数据大小无关的快速操作。 这相当于简单地删除磁盘上包含数据的文件。

将数据存储在多个物理表中会加快数据过期的速度。在一个大表中，删除行需要扫描以找到要删除的行，然后[清空空的空间](https://www.postgresql.org/docs/current/static/routine-vacuuming.html)。另一方面，删除分区是一种与数据大小无关的快速操作。这相当于简单地删除磁盘上包含数据的文件。

*   [https://www.postgresql.org/docs/current/static/routine-vacuuming.html](https://www.postgresql.org/docs/current/static/routine-vacuuming.html)

![](https://img2022.cnblogs.com/blog/436453/202203/436453-20220318102359540-2005133041.png)

对表进行分区还可以使每个日期范围内的索引更小更快。 对最近数据进行的查询很可能对适合内存的 `hot` 索引进行操作。这加快了读取速度。

![](https://img2022.cnblogs.com/blog/436453/202203/436453-20220318102415210-744617095.png)

插入也有更小的索引要更新，所以它们也更快。

![](https://img2022.cnblogs.com/blog/436453/202203/436453-20220318102435897-1933054958.png)

在以下情况下，基于时间的分区最有意义：

1.  大多数查询只访问最近数据的一个非常小的子集
2.  旧数据定期过期（删除/丢弃）

请记住，在错误的情况下，读取所有这些分区对开销的伤害大于帮助。 但是，在正确的情况下，它非常有帮助。 例如，保留一年的时间序列数据并定期仅查询最近一周。

扩展 Citus 上的时间序列数据
-----------------

我们可以将单节点表分区技术与 `Citus` 的分布式分片相结合，形成一个可扩展的时间序列数据库。这是两全其美的。它在 `Postgres` 的声明性表分区之上特别优雅。

![](https://img2022.cnblogs.com/blog/436453/202203/436453-20220318102451275-1730122436.png)

例如，让我们 `distribute` 和 `partition` 一个包含历史 [GitHub 事件数据](https://examples.citusdata.com/events.csv)的表。

*   GitHub 事件数据
    *   [https://examples.citusdata.com/events.csv](https://examples.citusdata.com/events.csv)

此 `GitHub` 数据集中的每条记录代表在 `GitHub` 中创建的事件，以及有关事件的关键信息，例如事件类型、创建日期和创建事件的用户。

第一步是按时间创建和`分区(partition)`表，就像我们在单节点 `PostgreSQL` 数据库中一样：

    -- declaratively partitioned table
    CREATE TABLE github_events (
      event_id bigint,
      event_type text,
      event_public boolean,
      repo_id bigint,
      payload jsonb,
      repo jsonb,
      actor jsonb,
      org jsonb,
      created_at timestamp
    ) PARTITION BY RANGE (created_at);
    

注意 `PARTITION BY RANGE (created_at)`。这告诉 `Postgres` 该表将由 `created_at` 列在有序范围内进行分区。不过，我们还没有为特定范围创建任何分区。

在创建特定分区之前，让我们在 `Citus` 中分布表。我们将按 `repo_id` 进行分片，这意味着事件将被聚集到每个存储库的分片中。

    SELECT create_distributed_table('github_events', 'repo_id');
    

此时 `Citus` 已跨工作节点为该表创建分片。在内部，每个分片是一个表，每个分片标识符 `N` 的名称为 `github_events_N`。此外，`Citus` 传播了分区信息，每个分片都声明了 `Partition key: RANGE (created_at)`。

分区表不能直接包含数据，它更像是跨分区的视图。因此，分片还没有准备好保存数据。 我们需要创建分区并指定它们的时间范围，之后我们可以插入与范围匹配的数据。

自动创建分区
------

`Citus` 为分区管理提供了辅助函数。我们可以使用 `create_time_partitions()` 创建一批每月分区：

    SELECT create_time_partitions(
      table_name         := 'github_events',
      partition_interval := '1 month',
      end_at             := now() + '12 months'
    );
    

`Citus` 还包括一个视图 [`time_partitions`](https://docs.citusdata.com/en/v10.2/develop/api_metadata.html#time-partitions)，以方便地调查它创建的分区。

![](https://img2022.cnblogs.com/blog/436453/202203/436453-20220318102510194-574185455.png)

随着时间的推移，您将需要进行一些维护以创建新分区并删除旧分区。最好设置一个`定期 job` 来运行带有 [pg\_cron](https://github.com/citusdata/pg_cron) 之类的扩展的维护功能：

*   pg\_cron
    *   [https://github.com/citusdata/pg\_cron](https://github.com/citusdata/pg_cron)

    -- set two monthly cron jobs:
    
    -- 1. ensure we have partitions for the next 12 months
    
    SELECT cron.schedule('create-partitions', '0 0 1 * *', $$
      SELECT create_time_partitions(
          table_name         := 'github_events',
          partition_interval := '1 month',
          end_at             := now() + '12 months'
      )
    $$);
    
    -- 2. (optional) ensure we never have more than one year of data
    
    SELECT cron.schedule('drop-partitions', '0 0 1 * *', $$
      CALL drop_old_time_partitions(
          'github_events',
          now() - interval '12 months' /* older_than */
      );
    $$);
    

一旦设置了定期维护，您就不必再考虑分区了，它们可以正常工作。

请注意，`Postgres` 中的原生分区仍然很新，并且有一些怪癖。 对分区表的维护操作将获取可能会短暂停止查询的激进锁。目前在 `postgres` 社区中正在进行大量工作来解决这些问题，因此预计 `Postgres` 中的 `time` 分区只会变得更好。

使用列式存储归档
--------

一些应用程序的数据在逻辑上分为可更新的小部分和`“冻结(frozen)”`的较大部分。 示例包括日志、点击流或销售记录。 在这种情况下，我们可以将分区与[列式表存储](https://docs.citusdata.com/en/v10.2/admin_guide/table_management.html#columnar)（在 `Citus 10` 中引入）结合起来压缩磁盘上的历史分区。Citus 柱状表目前是仅追加的，这意味着它们不支持更新或删除，但我们可以将它们用于不可变的历史分区。

*   列式表存储
    *   [https://docs.citusdata.com/en/v10.2/admin\_guide/table\_management.html#columnar](https://docs.citusdata.com/en/v10.2/admin_guide/table_management.html#columnar)

`分区表`可以由`行分区`和`列分区`的任意组合组成。在 `timestamp` _key_ 上使用范围分区时，我们可以将最新的分区制作成行表，并定期将最新的分区滚动到另一个历史列式分区中。

让我们看一个例子，再次使用 `GitHub 事件`。我们将创建一个名为 `github_columnar_events` 的新表，以消除前面示例中的歧义。 为了完全专注于列式存储方面，我们不会分布此表。

接下来，下载示例数据：

    wget http://examples.citusdata.com/github_archive/github_events-2015-01-01-{0..5}.csv.gz
    gzip -c -d github_events-2015-01-01-*.gz >> github_events.csv
    

    -- our new table, same structure as the example in
    -- the previous section
    
    CREATE TABLE github_columnar_events ( LIKE github_events )
    PARTITION BY RANGE (created_at);
    
    -- create partitions to hold two hours of data each
    
    SELECT create_time_partitions(
      table_name         := 'github_columnar_events',
      partition_interval := '2 hours',
      start_from         := '2015-01-01 00:00:00',
      end_at             := '2015-01-01 08:00:00'
    );
    
    -- fill with sample data
    -- (note that this data requires the database to have UTF8 encoding)
    
    \COPY github_columnar_events FROM 'github_events.csv' WITH (format CSV)
    
    -- list the partitions, and confirm they're
    -- using row-based storage (heap access method)
    
    SELECT partition, access_method
      FROM time_partitions
     WHERE parent_table = 'github_columnar_events'::regclass;
    

![](https://img2022.cnblogs.com/blog/436453/202203/436453-20220318102530928-1426238111.png)

    -- convert older partitions to use columnar storage
    
    CALL alter_old_partitions_set_access_method(
      'github_columnar_events',
      '2015-01-01 06:00:00' /* older_than */,
      'columnar'
    );
    
    -- the old partitions are now columnar, while the
    -- latest uses row storage and can be updated
    
    SELECT partition, access_method
      FROM time_partitions
     WHERE parent_table = 'github_columnar_events'::regclass;
    

![](https://img2022.cnblogs.com/blog/436453/202203/436453-20220318102547421-1861004919.png)

要查看柱状表的压缩率，请使用 `VACUUM VERBOSE`。我们三个柱状分区的压缩比相当不错：

    VACUUM VERBOSE github_columnar_events;
    

    INFO:  statistics for "github_columnar_events_p2015_01_01_0000":
    storage id: 10000000003
    total file size: 4481024, total data size: 4444425
    compression rate: 8.31x
    total row count: 15129, stripe count: 1, average rows per stripe: 15129
    chunk count: 18, containing data for dropped columns: 0, zstd compressed: 18
    
    INFO:  statistics for "github_columnar_events_p2015_01_01_0200":
    storage id: 10000000004
    total file size: 3579904, total data size: 3548221
    compression rate: 8.26x
    total row count: 12714, stripe count: 1, average rows per stripe: 12714
    chunk count: 18, containing data for dropped columns: 0, zstd compressed: 18
    
    INFO:  statistics for "github_columnar_events_p2015_01_01_0400":
    storage id: 10000000005
    total file size: 2949120, total data size: 2917407
    compression rate: 8.51x
    total row count: 11756, stripe count: 1, average rows per stripe: 11756
    chunk count: 18, containing data for dropped columns: 0, zstd compressed: 18
    

分区表 `github_columnar_events` 的一个强大之处在于它可以像普通表一样被完整地查询。

    SELECT COUNT(DISTINCT repo_id)
      FROM github_columnar_events;
    

![](https://img2022.cnblogs.com/blog/436453/202203/436453-20220318102604193-52898377.png)

只要分区键上有一个 `WHERE` 子句，它可以完全过滤到行表分区中，条目就可以被更新或删除。

将行分区归档到列式存储
-----------

当行分区已填满其范围时，您可以将其归档到压缩的列式存储中。我们可以使用 `pg_cron` 自动执行此操作，如下所示：

    -- a monthly cron job
    
    SELECT cron.schedule('compress-partitions', '0 0 1 * *', $$
      CALL alter_old_partitions_set_access_method(
        'github_columnar_events',
        now() - interval '6 months' /* older_than */,
        'columnar'
      );
    $$);
    

有关详细信息，请参阅[列式存储](https://docs.citusdata.com/en/v10.2/admin_guide/table_management.html#columnar)。

*   列式存储
    *   [https://docs.citusdata.com/en/v10.2/admin\_guide/table\_management.html#columnar](https://docs.citusdata.com/en/v10.2/admin_guide/table_management.html#columnar)

更多
--

*   [分布式 PostgreSQL 集群(Citus)官方示例 - 多租户应用程序实战](https://mp.weixin.qq.com/s/QX1l8642kd6hpxsA2J6UxA)
*   [分布式 PostgreSQL 集群(Citus)官方示例 - 实时仪表盘](https://mp.weixin.qq.com/s/VODPCLrRTCnI1vqn8NIBHA)