---
layout: post
title: "用两行代码实现重试功能，spring-retry真是简单而优雅"
date: "2022-03-18T13:31:29.565Z"
---
用两行代码实现重试功能，spring-retry真是简单而优雅
===============================

背景
--

最近做的一个需求，需要调用第三方接口。正常情况下，接口的响应是符合要求的，只有在网络抖动等极少数的情况下，会存在超时情况。因为是小概率事件，所以一次超时之后，进行一次重试操作应该就可以了。重试很简单，设定最多的重试次数，用一个循环来实现就好了。比如一次请求是这样：

    @Controller
    public class RetryController {
        @Autowired
        private RetryRequestService retryRequestService;
    
        public String doSth(String param) {
            String result = retryRequestService.request(param);
            return "响应是" + result;
        }
    }
    

改成重试三次，可以是这样：

    @Controller
    public class RetryController {
        @Autowired
        private RetryRequestService retryRequestService;
    
        public String doSth(String param) {
            int count = 0;
            String result = "";
            while (count < 3) {
                try {
                    result = retryRequestService.request(param);
                    break;
                } catch (Exception e) {
                    count++;
                }
            }
            return "响应是" + result;
        }
    }
    

如果请求接口超时（抛异常）了，那么会继续进入下一次循环重试。如果在超时时间内获取到了结果，那就结束循环，继续往下走。

用倒是能用，但是太丑了。不好看，还狠狠的侵入了原有的代码。所以有没有更优雅的方式呢？

快速接入spring-retry
----------------

这么常用的东西，肯定有轮子啊！于是spring-retry闪亮登场！

这是一个属于Spring全家桶的项目，也是被广泛运用的组件。在这里我默认你是个Spring Boot的项目了哈。

使用起来非常简单，只需要三步。

### 1、引入依赖

    <!--springboot项目都不用引入版本号-->
    <dependency>
      <groupId>org.springframework.retry</groupId>
      <artifactId>spring-retry</artifactId>
    </dependency>
    <!--还是需要aop的支持的-->
    <dependency>
      <groupId>org.springframework</groupId>
      <artifactId>spring-aspects</artifactId>
    </dependency>
    

### 2、在启动类上加注解@EnableRetry

此举是让你的Spring Boot项目支持spring-retry的重试功能。像这样：

    @SpringBootApplication
    @EnableRetry
    @Slf4j
    public class FastKindleApplication {
        public static void main(String[] args) {
            ConfigurableApplicationContext applicationContext = SpringApplication.run(FastKindleApplication.class, args);
            String result = applicationContext.getBean(RetryController.class).doSth("");
            log.info(result);
        }
    }
    

### 3、在需要重试的方法上加注解@Retryable

如上文所说，我们需要重试的方法是retryRequestService.request这个方法。那么我们就在这个方法上加@Retryable注解。如下：

    @Service
    @Slf4j
    public class RetryRequestService {
        @Autowired
        private OtherSystemSpi otherSystemSpi;
    
        @Retryable(value = RuntimeException.class, maxAttempts = 5, backoff = @Backoff(delay = 100))
        public String request(String param) {
            double random = Math.random();
            log.info("请求进来了，随机值为：" + random);
            if (random > 0.1) {
                throw new RuntimeException("超时");
            }
            return otherSystemSpi.request(param);
        }
    }
    

当然，我们这里写了个调皮的逻辑来模拟超时。如果随机值大于0.1则抛出一个RuntimeException异常。每次请求进来时都会输出日志。

我来解释一下@Retryable注解中的信息。

*   value = RuntimeException.class：是指方法抛出RuntimeException异常时，进行重试。这里可以指定你想要拦截的异常。
*   maxAttempts：是最大重试次数。如果不写，则是默认3次。
*   backoff = @Backoff(delay = 100)：是指重试间隔。delay=100意味着下一次的重试，要等100毫秒之后才能执行。

我们来执行一下，可以看到日志输出：

    2022-03-15 23:51:19.754  INFO 3343 --- [main] c.e.fastkindle.FastKindleApplication     : Started FastKindleApplication in 0.347 seconds (JVM running for 0.536)
    2022-03-15 23:51:19.762  INFO 3343 --- [main] c.e.f.service.retry.RetryRequestService  : 请求进来了，随机值为：0.11030214774098712
    2022-03-15 23:51:19.867  INFO 3343 --- [main] c.e.f.service.retry.RetryRequestService  : 请求进来了，随机值为：0.09624689154608002
    2022-03-15 23:51:19.867  INFO 3343 --- [main] c.e.fastkindle.FastKindleApplication     : 响应是mock
    

前两次的随机值都大于0.1，所以进行了重试，而且注意时间，都是间隔了大概100毫秒输出的日志。第三次的随机值小于0.1，就直接返回数据了。

我又试了几次，使五次请求的随机值都大于0.1，则结果是进行了五次请求，最后抛出了个异常。

    2022-03-15 23:52:58.193  INFO 3449 --- [main] c.e.fastkindle.FastKindleApplication     : Started FastKindleApplication in 0.41 seconds (JVM running for 0.635)
    2022-03-15 23:52:58.201  INFO 3449 --- [main] c.e.f.service.retry.RetryRequestService  : 请求进来了，随机值为：0.5265644192525288
    2022-03-15 23:52:58.303  INFO 3449 --- [main] c.e.f.service.retry.RetryRequestService  : 请求进来了，随机值为：0.6343538744876432
    2022-03-15 23:52:58.407  INFO 3449 --- [main] c.e.f.service.retry.RetryRequestService  : 请求进来了，随机值为：0.5482463853575078
    2022-03-15 23:52:58.511  INFO 3449 --- [main] c.e.f.service.retry.RetryRequestService  : 请求进来了，随机值为：0.5624923285641071
    2022-03-15 23:52:58.616  INFO 3449 --- [main] c.e.f.service.retry.RetryRequestService  : 请求进来了，随机值为：0.305945622979098
    Exception in thread "main" java.lang.RuntimeException: 超时
            at com.esparks.fastkindle.service.retry.RetryRequestService.request(RetryRequestService.java:24)
            at com.esparks.fastkindle.service.retry.RetryRequestService$$FastClassBySpringCGLIB$$50f0bdca.invoke(<generated>)
            at org.springframework.cglib.proxy.MethodProxy.invoke(MethodProxy.java:218)
    

总结
--

好啦，咱今天就介绍一下快速的接入spring-retry来实现重试功能。更详细的功能和实现原理，之后再详细介绍吧（又给自己挖了个坑）