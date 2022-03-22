---
title: Egg.js如何编写curd语句（2）
date: 2020-04-21T16:00:00.000Z
tags:
  - Node.js
  - Egg.js
  - MySQL
categories:
  - Node.js
---
## 安装

```apl
$ npm i egg-mysql --save
```

egg 的 MySQL 插件，支持egg 应用访问 MySQL 数据库。

本插件基于[ali-rds](https://github.com/ali-sdk/ali-rds)，具体用法可以参考[ali-rds](https://github.com/ali-sdk/ali-rds)文档。

更改`${app_root}/config/plugin.js`以启用 MySQL 插件：

```
exports.mysql = {
  enable: true,
  package: 'egg-mysql',
};
```

配置数据库信息`${app_root}/config/config.default.js`：

### 简单的数据库实例

```
exports.mysql = {
  // database configuration
  client: {
    // host
    host: 'localhost',
    // port
    port: '3306',
    // username
    user: 'test_user',
    // password
    password: 'test_password',
    // database
    database: 'test',    
  },
  // load into app, default is open
  app: true,
  // load into agent, default is close
  agent: false,
};
```

用法：

```js
app.mysql.query(sql, values); // you can access to simple database instance by using app.mysql.

```

### 多数据库实例

```js
exports.mysql = {
  clients: {
    // clientId, access the client instance by app.mysql.get('clientId')
    db1: {
      // host
      host: 'mysql.com',
      // port
      port: '3306',
      // username
      user: 'test_user',
      // password
      password: 'test_password',
      // database
      database: 'test',
    },
    // ...
  },
  // default configuration for all databases
  default: {

  },

  // load into app, default is open
  app: true,
  // load into agent, default is close
  agent: false,
};

```

用法：

```js
const client1 = app.mysql.get('db1');
client1.query(sql, values);

const client2 = app.mysql.get('db2');
client2.query(sql, values);
```

## CRUD 用户指南

### 插入

```js
// 插入
const result = yield app.mysql.insert('posts', { title: 'Hello World' });
const insertSuccess = result.affectedRows === 1;
```

### 读

```js
// 获取
const post = yield app.mysql.get('posts', { id: 12 });
// 查询
const results = yield app.mysql.select('posts',{
  where: { status: 'draft' },
  orders: [['created_at','desc'], ['id','desc']],
  limit: 10,
  offset: 0
});
```

### 更新

```js
// 按主键 ID 更新，并刷新
const row = {
  id: 123,
  name: 'fengmk2',
  otherField: 'other field value',
  modifiedAt: app.mysql.literals.now, // `now()` 在数据库服务器上
};
const result = yield app.mysql.update('posts', row);
const updateSuccess = result.affectedRows === 1;
```

### 删除

```js
const result = yield app.mysql.delete('table-name', {
  name: 'fengmk2'
});
```

## 交易

### 手动

- 优势：`beginTransaction`，`commit`或者`rollback`可以完全由开发者控制
- 缺点：手写代码较多，忘记捕捉错误或清理会导致严重的bug。

```js
const conn = yield app.mysql.beginTransaction();

try {
  yield conn.insert(table, row1);
  yield conn.update(table, row2);
  yield conn.commit();
} catch (err) {
// 错误，回滚
  yield conn.rollback();  回滚调用不会抛出错误
  throw err;
}
```

### 自动控制：有作用域的事务

- 接口：

  ```
  *beginTransactionScope(scope, ctx)
  ```

  - `scope`：一个generatorFunction，它将执行这个事务的所有sqls。
  - `ctx`: 当前请求的上下文对象，它会确保即使在嵌套事务的情况下，一个请求中同时也只有一个活动事务。

- 优点：好用，就好像你的代码里没有事务一样。

- 缺点：所有交易都会成功或失败，无法精确控制

```js
const result = yield app.mysql.beginTransactionScope(function* (conn) {
  // don't commit or rollback by yourself
  yield conn.insert(table, row1);
  yield conn.update(table, row2);
  return { success: true };
}, ctx); // ctx 是当前请求的上下文，通过`this.ctx` 访问。
// 如果在作用域上抛出错误，将自动回滚
```

## 进步

### 自定义SQL拼接

```js
const results = yield app.mysql.query('update posts set hits = (hits + ?) where id = ?', [1, postId]);
```

### 文字

如果要在 mysql 中调用文字或函数，可以使用`Literal`.

#### 内部文字

- NOW()：数据库系统时间，可以通过`app.mysql.literals.now`.

```js
yield app.mysql.insert(table, {
  create_time: app.mysql.literals.now
});

// 插入`$table`(`create_time`) VALUES(NOW())
```

#### 自定义文字

下面的demo展示了如何`CONCAT(s1, ...sn)`在mysql中调用函数进行字符串拼接。

```js
const Literal = app.mysql.literals.Literal;
const first = 'James';
const last = 'Bond';
yield app.mysql.insert(table, {
  id: 123,
  fullname: new Literal(`CONCAT("${first}", "${last}"`),
});

// INSERT INTO `$table`(`id`, `fullname`) VALUES(123, CONCAT("James", "Bond"))
```

