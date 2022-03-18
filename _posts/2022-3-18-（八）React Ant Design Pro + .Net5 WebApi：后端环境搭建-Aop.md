---
layout: post
title: "（八）React Ant Design Pro + .Net5 WebApi：后端环境搭建-Aop"
date: "2022-03-18T08:48:34.462Z"
---
（八）React Ant Design Pro + .Net5 WebApi：后端环境搭建-Aop
=================================================

.net core Aop 面向切面编程 Autofac Castle.Core

一、Aop
-----

**Aop 面向切面编程(Aspect Oriented Program），在项目中，很多地方都会用到Aop的概念，比如：过滤器(Filter)，中间件(Middleware) 通常用来处理数据请求、切面缓存、记录日志、异常捕获等等。但是想在服务层中使用Aop，前面说的就不好使了，目的是减少代码入侵，降低解耦，又能实现业务需求，才是Aop意义所在。前面介绍使用了Autofac，在这还能发挥作用。**

#### 1、安装

**安装Autofac.Extras.DynamicProxy，Autofac实现Aop用的是Castle.Core动态代理，Castle.Core可以单独使用，跟Autofac配合起来更方便。Autofac.Extras.DynamicProxy依赖Autofac，所以有的文章是直接就装了这个包，一个效果。**  
![](https://img2022.cnblogs.com/blog/1780813/202203/1780813-20220301143632370-1662513915.png)

#### 2、异步处理

**Castle.Core本身是不支持异步的，所以[参考](https://www.cnblogs.com/wswind/p/13863104.html)封装异步Aop类 AsyncInterceptorBase 继承 IInterceptor。**

    public abstract class AsyncInterceptorBase : IInterceptor
    {
        public AsyncInterceptorBase()
        {
        }
    
        public void Intercept(IInvocation invocation)
        {
            BeforeProceed(invocation);
            invocation.Proceed();
            if (IsAsyncMethod(invocation.MethodInvocationTarget))
            {
                InterceptAsync((dynamic)invocation.ReturnValue, invocation);
            }
            else
            {
                AfterProceedSync(invocation);
            }
        }
    
        private bool CheckMethodReturnTypeIsTaskType(MethodInfo method)
        {
            var methodReturnType = method.ReturnType;
            if (methodReturnType.IsGenericType)
            {
                if (methodReturnType.GetGenericTypeDefinition() == typeof(Task<>) ||
                    methodReturnType.GetGenericTypeDefinition() == typeof(ValueTask<>))
                    return true;
            }
            else
            {
                if (methodReturnType == typeof(Task) ||
                    methodReturnType == typeof(ValueTask))
                    return true;
            }
            return false;
        }
    
        private bool IsAsyncMethod(MethodInfo method)
        {
            bool isDefAsync = Attribute.IsDefined(method, typeof(AsyncStateMachineAttribute), false);
            bool isTaskType = CheckMethodReturnTypeIsTaskType(method);
            bool isAsync = isDefAsync && isTaskType;
    
            return isAsync;
        }
    
        private async Task InterceptAsync(Task task, IInvocation invocation)
        {
            await task.ConfigureAwait(false);
            AfterProceedAsync(invocation, false);
        }
    
        private async Task<TResult> InterceptAsync<TResult>(Task<TResult> task, IInvocation invocation)
        {
            TResult ProceedAsyncResult = await task.ConfigureAwait(false);
            invocation.ReturnValue = ProceedAsyncResult;
            AfterProceedAsync(invocation, true);
            return ProceedAsyncResult;
        }
    
        private async ValueTask InterceptAsync(ValueTask task, IInvocation invocation)
        {
            await task.ConfigureAwait(false);
            AfterProceedAsync(invocation, false);
        }
    
        private async ValueTask<TResult> InterceptAsync<TResult>(ValueTask<TResult> task, IInvocation invocation)
        {
            TResult ProceedAsyncResult = await task.ConfigureAwait(false);
            invocation.ReturnValue = ProceedAsyncResult;
            AfterProceedAsync(invocation, true);
            return ProceedAsyncResult;
        }
    
        protected virtual void BeforeProceed(IInvocation invocation) { }
        protected virtual void AfterProceedSync(IInvocation invocation) { }
        protected virtual void AfterProceedAsync(IInvocation invocation, bool hasAsynResult) { }
    }
    

**新建一个服务切面类 ServiceAop 继承 AsyncInterceptorBase**

    public class ServiceAop : AsyncInterceptorBase
    {
        private readonly ILogger<ServiceAop> _logger;
        public ServiceAop(ILogger<ServiceAop> logger) {
            _logger = logger;
        }
        protected override void BeforeProceed(IInvocation invocation)
        {
            _logger.LogInformation($"ServiceAop调用方法：{invocation.Method.Name}，参数：{JsonConvert.SerializeObject(invocation.Arguments) }");
        }
    
        protected override void AfterProceedSync(IInvocation invocation)
        {
            _logger.LogInformation($"ServiceAop同步返回结果：{JsonConvert.SerializeObject(invocation.ReturnValue)}");
        }
    
        protected override void AfterProceedAsync(IInvocation invocation, bool hasAsynResult)
        {
            _logger.LogInformation($"ServiceAop异步返回结果：{JsonConvert.SerializeObject(invocation.ReturnValue)}");
        }
    }
    

**两个类放在了新建的Aop文件夹里，通过Autofac注入进行使用，修改 Startup.cs 代码如图：（不太明白的请看：[（五）Autofac](https://www.cnblogs.com/WinterSir/p/15619543.html)）**  
![](https://img2022.cnblogs.com/blog/1780813/202203/1780813-20220309164234279-1185026040.png)

#### 3、使用效果

![](https://img2022.cnblogs.com/blog/1780813/202203/1780813-20220309170250423-741250765.png)

二、前人栽树，后人乘凉
-----------

[https://blog.csdn.net/q932104843/article/details/97611912](https://blog.csdn.net/q932104843/article/details/97611912)  
[https://www.cnblogs.com/wswind/p/13863104.html](https://www.cnblogs.com/wswind/p/13863104.html)

测试签名