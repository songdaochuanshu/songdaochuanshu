---
layout: post
label: til
title: "Node.js"
date: 2020-02-12T16:00:00.000Z
tags:
  - Node.js
categories:
  - Node.js
---

## Node.js

### 	**特点**

- 属于单线程逻辑处理
- 不会产生死锁
- 适合做基于社交网络的大规模WEB应用

#### 	对比js

​		js运行在客户浏览器，存在多种解释器，有代码兼容性问题；Node.js运行在服务器，只有V8引擎一种解释器，不存在代码兼容性问题

​		两者都有相同内置对象和自定义对象，不同的宿主对象

​		js用于开发就浏览器端的交互效果，Node.js用于服务器端功能开发，例如数据库的访问，其他服务器得到调用

#### 	运行方式

​		脚本模式：node 文件的路径 	回车

​		交互模式：node 回车 进入交互模式

​		退出：两次ctrl+c/ctrl+d/.exit

#### 	全局对象

​		global对象

​			(1)，检测一个变量或函数是否为全局的

​			(2)，在交互模式下属于全局作用域，里面的变量是和函数都是全局的

​			(3)，在脚本模式下不属于全局作用域，里面的变量和函数都不是全局的，可以防止全局污染

​		console对象

​				console.log(1);//输出日志		console.info(2);//输出消息

​				console.warn(3);//输出警告	 console.error(4);//输出错误

​				console.time()开始计时	console.timeEnd()结束计时

​				开始计时和结束计时提供的值要保持一致

​		process对象

​			进程：计算机在运行软件的时候，都会产生相应的进程

```
process.arch	查看当前CPU的架构

process.platfrom	查看当前的操作系统

process.version	查看当前Node.js版本

process.pid	查看当前进程的编号

process.kill(编号)	结束指定进程
```

​		Buffer缓冲区

```
缓冲区，是内存中临时存储的区域

let buf = Buffer.alloc(4,'root');

创建Buffer，设置大小为4个字节，并填充数据，每个字节占3个字节

String(buf)/buf.toString();//将Buffer数据转为字符串
```

​		定时器函数

​			

```
//一次性定时器：	setTimeout(回调函数，时间/毫秒)；
//清除定时器：	 clearTimeout(定时器的变量)；
//周期性定时器：	setInterval(回调函数，时间/毫秒)   每隔一段时间，调用一次函数
//清除定时器 		   clear Interval(定时器的变量);
//立即执行定时器
//开启setImmediate(回调函数)	清除clearImmediate(timer)
//开启process.nextTick(回调函数)	宏任务
```

​		

#### 	模块

​		每文件是一个模块，每一个模块都是一个独立的功能

​		一个模块引入其他的模块

​		一个模块也可以被其他的模块引入

```
require( ) //是一个函数，用于引入其他的模块

module.exports  //导出的对象，默认是一个空对象，如果要导出哪些内容需要放入到这个对象

__dirname: //是一个局部变量，当前模块 的绝对路径

__filename: //是一个叫局部变量，当前模块的绝对路径+模块名称
```



##### 	模块分类

##### 		1.自定义模块，第三方模块，核心模块

|          | 以路径开头                                                   | 不以路径开头                                                 |
| :------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| 文件形式 | require('./文件名.js')用于引入自定义模块                     | require('querystring')用于引入官方提供的核心模块             |
| 目录形式 | require('./文件名')首先会找到目录下寻找package.json文件中main对应的文件，如果找不到则会寻找index.js | require('tao')首先会找到同一级目录下的node_modules目录中寻找tao，如果没找到会一直往上一级的node_modules目录中寻找；用于引入第三方模块 |

##### 	2.包和npm

​		CommonJS：是一种规范，制定了Node.js的模块化概念

​		包：通常指的是目录模块

​		npm：是用于管理包的工具模块

​				网址：https://www/npmjs.com

​		使用npm：**npm init -y**   生成package.json文件，作为项目文件，可以用于记录下载安装的包的信息

​		下载包：**npm  install   包的名称**	；下载安装指定的包，将包放入到node_modules目录中，如果目录不存在会先创建，同时生成package-lock.json,用于记录所有包的版本号

​		npm  install  自动下载package.json和package-lock.json中记录的包

​		下载或运行其他版本文件：**npx   -p  node@8  node  拖拽文件**     下载指定版本的Node.js运行文件，运行完以后再把下载的Node.js删除

##### 		3.查询字符串模块(querystring)

​			查询字符串：浏览器向WEB服务器发送请求，传递的数据的一种方式，位于浏览器的地址栏中

***keyword=笔记本&enc=utf-8***

查询字符串模块用于操作查询字符串的工具

​		parse(  )将查询字符串解析为对象

##### 		4.URL模块

​			URL：统一资源定位，互联网上的任何资源都有对应的URL

​			new URL(  )	将一个URL解析为对象，获取URL的各个部分

##### 		5.文件系统模块

​			用于操作服务器端的文件，例如文件的读取，写入，删除......

​			文件分为目录形式和文件形式	**同步加Sync**

​				（1）fs.statSync(文件的路径) / fs.stat(文件的路径，回调函数)

​				查看是否为文件形式	isFile()	返回true或false

​				查看是否为目录文件	isDirectory()	返回true或false

​				（2）创建目录		fs.mkdirSync('目录的路径')

​				（3）移除目录		fs.rmdirSync(‘目录的路径’)	//只能移除空目录

​				（4）读取目录		fs.readdirSync('../上级目录文件名') / readdir(目录的路径，回调函数)

​				（5）覆盖写入文件	writeFileSync(文件的路径，数据)  / writeFile(文件的路径，数据，回调函数)

​					如果文件不存在，则先创建文件然后写入数据

​					如果文件已经存在，会清空文件内容然后写入文件

​				（6）追加写入文件	appendFileSync(文件的路径，数据) / appendFile(文件的路径，数据，回调函数)

​					如果文件不存在，则先创建文件然后写入文件

​					如果文件已经存在，会在文件的末尾追加写入数据

​				（7）读取文件数据	readFileSync(文件的路径) / readFile(文件的路径，回调函数)

​					读取的数据结果为buffer数据格式

​				（8）删除文件	unlinkSync(文件的路径) / unlink(文件的路径，回调函数)

​			fs模块

​				（9）判断文件是否存在	existsSync(文件/目录) 存在-->true  不存在-->false

​				（10）拷贝文件	copyFileSync(源文件路径，目标文件路径) / copyFile(源文件路径，目标文件路径，回调函数)

##### 		6.*同步和异步

​			同步：在主程序中执行，会阻止后续代码的执行，通过返回值来获取结果

​			异步：在一个独立的线程执行，不会阻止主程序后续代码的执行，将结果以会低矮函数的形式放入到事件队列

#### 文件流

```
createReadStream()	创建可读取的文件流

createWriteStream()	创建可写入的文件流

on(事件名称，回调函数) 添加事件，事件名称是固定的字符串，一旦坚挺到事件呼呼自动执行回调函数

pipe()管道，可以将读取的流添加到写入的流
```



#### HTTP协议

​	浏览器和WEB服务器之间的通信协议

​	(1)通信头信息

```
Request URL：请求的服务器端的资源

Request Method: 请求的方法，对资源的操作方式	get/post/detele/put

Status Code: 响应的状态码
```

​	

​				100：接受到了请求，还没有做出响应

​				200：成功的响应

​				300：响应的重定向，跳转到另一个url

​				400：客户端错误

​				500：服务器错误	

​	(2)响应头信息	response

```
Content-Type：响应的内容类型   text/html; charset=UTF-8
Location:设置要跳转的url
```

​	(3)请求头信息	request

​	(4)请求主题

​		显示传递的数据，不是每一次都出现

#### HTTP模块

​	可以用来创建WEB服务器

​	**(1)创建服务器**

```
引入HTTP模块const http = require('http');

创建WEB服务器const app = http.createServer();

设置端口app.listen(80,()=>{  });
```

​	**(2)接收请求作出相应**

```
//给服务器添加事件
app.on('request',(req,res)=>{
		req	请求对象
		req.url	获取请求的url，显示的端口号后的部分，
		req.method	获取请求的方法
		res	响应对象
		*res.writeHead(状态码，头信息)	设置响应的状态码和头信息，第二个参数可以为空
		*res.write()	设置响应到浏览器的内容
		*res.end()	结束并发送响应
})
```

​		

#### 框架

​	框架：是一整套解决方案，简化了已有的功能，添加了之前没有的功能

​	Node.js框架：express，koa，egg

​	1.express框架

​		express是基于 [Node.js](https://nodejs.org/en/) 平台，快速、开放、极简的 Web 开发框架

​		属于是第三方模块，需要先下载安装	npm install express

##### 		(1)创建WEB服务器

```
引入express模块	const express = require('express');
创建WEB服务器	const app = express();
设置端口	app.listen(8080,()=>{ })
```

​			

##### 		(2)路由

​			根据请求的URL和请求的方法来做出特定的响应

​			包含三部分：请求的URL，请求的方法，回调函数

```
req请求对象
	req.url		获取请求的URL
	req.method	获取请求的方法
	req.query	获取get传递的数据。格式为对象
```

​			

​	

```
res响应对象
	res.send( )	设置响应的内容并发送
	res.redirect( )	设置响应的重定向并发送
	res.sendFile( )	设置响应的文件并发送
	//以上三个方法在路由中只能执行一次	
```

​				

数据传递的方式

| 名称     | 格式                                            | 获取                                                         |
| -------- | ----------------------------------------------- | ------------------------------------------------------------ |
| get方式  | http://127.0.0.1:8080/mysearch?keyword=传递的值 | req.query                                                    |
| post方式 | URL中不可见，在http协议的请求主体               | req.on('data',(chunk)=>{chunk.toString() 需要使用查询字符串解析为对象}) |
| 路由传参 | http://127.0.0.1:8080/package/mysql             | app.get('/package/:pname',(req,res)=>{req.params})           |

##### 	(3)路由器

​		路由器可以统一管理路由，还额可以给一组路由器添加统一的前缀

```
//路由器
const r = express.Router();	 创建路由器对象
module.exports = r;	导出路由器对象
```

​		WEB服务器

```
//引入
app.use('/produck',perduckRouter)	挂载路由器到WEB服务器
```



#### 中间件

​	拦截对服务端的请求，也可以做出响应

​	express下中间件分为应用级中间件，路由级中间件，内置中间件，第三方中间件，错误处理中间件

​	（1）应用级中间件

​			也成为自定义中间件，本质上就是一个函数

​			app.use(URL，回调函数)

​			app.use(回调函数)

​		(2)路由级中间件

​			app.use(拦截的url，回调函数) 

​		(3)内置中间件

​			托管静态资源

​			客户端请求静态资源（html，css ，js，图像...）不在创建路由，让客户端自动到指定的目录下查找

​			app.use(express.static('要托管的目录'))

​		(4)第三方中间件

​			第三方中间件以第三方模块的形式出现，需要先下载安装

​			

```javascript
//1.引入中间件
const bodyParser = require('body-Parser')
//2.使用中间件，将所有post请求的数据解析为对象
app.use(bodyParser.urlencoded({
	extended:false //false 不使用第三方的查询字符串模块，就会使用核心querystring
}))
//3.在路由中获取数据，格式为对象
req.body
```

### MySQL模块

​	Node.js下，专门用于操作MySQL数据库的第三方模块

​		node install mysql  下载安装

​		mysql命令

```mysql
mysql -uroot //登录数据库
mysql.exe -h127.0.0.1 -p3306 -uroot -p
mysql -uroot<拖拽脚本 //
insert into 表名 values(.....);
delete from 表名 where 列名=值;
update 表名 set 列名=修改的值,....where 列名=值;
select * from 表名;
```

SQL注入：在让用于提供的值中，并拼接了其他的SQL注入。

占位符（ ? ）：先对数据进行过滤，过滤完以后在替换占位符

```mysql
mysql.createConnection({
	host:'127.0.0.1',
    port:'3306',
    user:'root',
    password:'',
    database:'xz', //数据库名
    connectionLimit:15 //默认15
}) //创建连接对象
connect() //测试连接
query(SQL命令，要过滤的数据，回调函数)
```

#### 连接池

​	开始的时候创建一批的链接，可以被反复的使用，用完后会归还

```mysql
mysql.createPool( ) 创建连接池对象
query( ) 执行SQL命令
```



#### RESTful接口

​	接口：后端为前端提供的动态资源（对数据的增删改查）

​	RESTful：是一种接口的设计规范

​	①URL		

```node
员工资源 
http://127.0.0.1:8080 /v1 /emps		多个资源
							版本  资源名称(复数形式)	
http://127.0.0.1:8080 /v1 /emps /5		单个资源

								编号
http://127.0.0.1:8080 /v1 /login	对资源特殊操作

						   登录
```

​	②请求的方法

​		对资源的操作方式

```node
get		获取资源
delete	删除资源
put		修改资源
post	新建资源
```

​	③过滤数据

```
//针对于多个资源的操作
http://127.0.0.1:8080/v1/emps?pno=1&count=9
//通过分页过滤的数据				当前页码	每页数据量
```

```
http://127.0.0.1:8080/v1/emps?*salary1=6000&salary2=8000*
//过滤一组区间的数据
```

​	④返回结果

​		格式为json对象：字符串形式的对象，实姓名必须用双引号，属性值是字符串也得是双引号

​		包含状态码（人为规定），消息，数据

​		

### 正则表达式

```
test( )	检测字符串是否符合规则	

​	replace(规则,替换的字符串)	查找并替换

​	search(规则)	查找符合规则的第一个，返回下标，找不到返回-1

​	match(规则)	查找符合规则的所有，返回数组
```

​	修饰符

```
g - global 全局查找			i - ignore 忽略大小写
```



