---
layout: post
title: "（七）React Ant Design Pro + .Net5 WebApi：后端环境搭建-日志、异常处理"
date: "2022-03-16T06:10:35.016Z"
---
（七）React Ant Design Pro + .Net5 WebApi：后端环境搭建-日志、异常处理
=====================================================

.net core NLog 日志、异常处理 过滤器 中间件

一、日志
----

**日志具有帮助开发者快速的定位问题，记录各种信息，配合其他分析框架使用等等功能，收集日志的各类框架如：Log4net、NLog、Exceptionless、Serilog等等，百度或园子里介绍及对比文章不胜枚举，此不赘述。易用为主，选择NLog先集成，方便后面演示使用。**

#### 1、安装 NLog.Web.AspNetCore

![](https://img2022.cnblogs.com/blog/1780813/202203/1780813-20220306192341101-1612196766.png)

#### 2、新建 nlog.config，只改了输出路径。（配置和变量介绍参考最后链接，就不贴代码了）

![](https://img2022.cnblogs.com/blog/1780813/202203/1780813-20220307152549824-1544715947.png)

#### 3、注入到框架中，测试输出效果

![](https://img2022.cnblogs.com/blog/1780813/202203/1780813-20220307152759792-1324069925.png)![](https://img2022.cnblogs.com/blog/1780813/202203/1780813-20220307153331258-686193971.png)![](https://img2022.cnblogs.com/blog/1780813/202203/1780813-20220307153207901-657368024.png)

二、异常处理
------

**异常处理分为两种，一种是过滤器，一种是中间件。过滤器只能捕获Action以内的异常，而中间件可以捕获全局的异常，也可以只用中间件捕获全局异常，但通常是有所区分的。**

### 1、过滤器

#### （1）新建一个异常过滤器 ExceptionFilter，注入到框架中

![](https://img2022.cnblogs.com/blog/1780813/202203/1780813-20220309142625414-349677944.png)

#### （2）ExceptionFilter 继承 IAsyncExceptionFilter 接口，代码如下：

    public class ExceptionFilter : IAsyncExceptionFilter
    {
        private readonly ILogger<ExceptionFilter> _logger;
        public ExceptionFilter(ILogger<ExceptionFilter> logger)
        {
            _logger = logger;
        }
        public Task OnExceptionAsync(ExceptionContext context)
        {
            if (context.ExceptionHandled == false)
            {
                string msg = context.Exception.Message;
                context.Result = new ContentResult
                {
                    Content = msg,
                    StatusCode = 200,
                    ContentType = "application/json"
                };
                _logger.LogError("ExceptionFilter:" + msg);
            }
            context.ExceptionHandled = true; //设置异常已处理了，否则会被异常中间件再次捕获。
            return Task.CompletedTask;
        }
    }
    

#### （3）在插入接口直接抛出异常，swagger调用接口测试，输出日志

![](https://img2022.cnblogs.com/blog/1780813/202203/1780813-20220309151747519-1049973022.png)

### 2、中间件

#### （1）一定要按顺序注册且异常捕获最先

![](https://img2022.cnblogs.com/blog/1780813/202203/1780813-20220309160912441-1092324794.png)

#### （2）启动项目，捕获异常

![](https://img2022.cnblogs.com/blog/1780813/202203/1780813-20220309161502152-266062199.png)

三、前人栽树，后人乘凉
-----------

**Nlog日志：**  
[https://github.com/NLog/NLog/wiki/Getting-started-with-ASP.NET-Core-5](https://github.com/NLog/NLog/wiki/Getting-started-with-ASP.NET-Core-5)  
[https://www.cnblogs.com/tinys-top/p/12002673.html](https://www.cnblogs.com/tinys-top/p/12002673.html)  
**异常处理**  
[https://www.cnblogs.com/lucky\_hu/p/12444832.html](https://www.cnblogs.com/lucky_hu/p/12444832.html)  
[https://www.cnblogs.com/dotnet261010/p/13193124.html](https://www.cnblogs.com/dotnet261010/p/13193124.html)

测试签名