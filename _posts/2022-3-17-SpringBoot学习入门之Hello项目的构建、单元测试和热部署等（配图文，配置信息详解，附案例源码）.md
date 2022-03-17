---
layout: post
title: "SpringBoot学习入门之Hello项目的构建、单元测试和热部署等（配图文，配置信息详解，附案例源码）"
date: "2022-03-17T16:25:47.389Z"
---
SpringBoot学习入门之Hello项目的构建、单元测试和热部署等（配图文，配置信息详解，附案例源码）
=====================================================

![SpringBoot学习入门之Hello项目的构建、单元测试和热部署等（配图文，配置信息详解，附案例源码）](https://img2022.cnblogs.com/blog/2769248/202203/2769248-20220317111315810-1440797870.png) SpringBoot学习入门之简单项目的构建和单元测试、热部署和自动化配置原理详解、以及SpringBoot项目的执行流程等知识介绍。

前言：
---

 本文章主要是个人在学习SpringBoot框架时做的一些准备，参考老师讲解进行完善对SpringBoot构建简单项目的学习汇集成本篇文章，作为自己对SpringBoot框架的总结与笔记。

你将会从此篇文章了解到以下四点内容：

1.   SpringBoot框架简介
2.  Hello SpringBoot项目的构建
3.  单元测试与热部署
4.   Spring Boot 原理分析和实现

一、SpringBoot框架简介
================

*   随着互联网的兴起，Spring势如破竹，占据着Java领域轻量级开发的王者地位。
*   随着Java语言的发展以及市场开发的需求，Spring推陈出新，推出了全新的Spring Boot框架。
*   Spring Boot是Spring家族的一个子项目，其设计初衷是为了简化Spring配置，从而可以轻松构建独立运行的程序，并极大提高开发效率。

springboot官网：[Spring Boot](https://spring.io/projects/spring-boot)

Spring Boot是由Pivotal团队提供的全新框架，其设计目的是用来简化新Spring应用的初始搭建以及开发过程。该框架使用了特定的方式来进行配置，从而使开发人员不再需要定义样板化的配置。通过这种方式，Spring Boot致力于在蓬勃发展的快速应用开发领域(rapid application development)成为领导者。

*   Spring Boot是基于Spring框架开发的全新框架，其设计目的是简化新Spring应用的初始化搭建和开发过程。
*   Spring Boot整合了许多框架和第三方库配置，几乎可以达到“开箱即用”

**特点:**

SpringBoot基于Spring4.0设计，不仅继承了Spring框架原有的优秀特性，而且还通过简化配置来进一步简化了Spring应用的整个搭建和开发过程。另外SpringBoot通过集成大量的框架使得依赖包的版本冲突，以及引用的不稳定性等问题得到了很好的解决。

SpringBoot所具备的特征有：

1.  可以创建独立的Spring应用程序，并且基于其Maven或Gradle插件，可以创建可执行的JARs和WARs；
2.  内嵌Tomcat或Jetty等Servlet容器；
3.  提供自动配置的“starter”项目对象模型（POMS）以简化Maven配置；
4.  尽可能自动配置Spring容器；
5.  提供准备好的特性，如指标、健康检查和外部化配置；
6.  绝对没有代码生成，不需要XML配置。

二、Hello SpringBoot项目的构建
=======================

1.项目构建前提
--------

*   JDK 1.8（及以上版本）
*   Apache Maven 3.6.0+
*   IntelliJ IDEA Ultimate旗舰版

**PS：**如需JDK、Maven依赖包和idea工具安装包百度网盘获取（地址如下）

链接：https://pan.baidu.com/s/1bCkqDovbPL5npyEDfKLoWQ?pwd=1234   
提取码：1234

2.认识idea开发工具
------------

### 2.1 idea欢迎页面

![](https://img2022.cnblogs.com/blog/2769248/202203/2769248-20220317114855538-661371649.png)

### 2.2初始化Maven设置

（1）单击【Configure】→【Project Defaults】→【Settings】进入设置Maven界面

![](https://img2022.cnblogs.com/blog/2769248/202203/2769248-20220317114855595-87665310.png)

（2）初始化Maven设置

![](https://img2022.cnblogs.com/blog/2769248/202203/2769248-20220317114855739-1250655610.png)

### 2.3**初始化****JDK****设置**

（1）【Configure】→【Project Defaults】→【Project Structure】进入JDK设置页

![](https://img2022.cnblogs.com/blog/2769248/202203/2769248-20220317114855637-1736899516.png)

（2）在界面左侧选择【Project Settings】→【Project】选项（点击Edit选择JDK的安装路径）

![](https://img2022.cnblogs.com/blog/2769248/202203/2769248-20220317114855763-1256181868.png)

3.SpringBoot项目的创建
-----------------

SpringBoot项目的创建有两种方式

*   方法一：使用Maven创建Spring Boot项目
*   方法二：使用Spring Initializr创建SpringBoot项目

### 3.1使用Maven方式构建Spring Boot项目

**搭建步骤：**

（1）创建Maven项目

![](https://img2022.cnblogs.com/blog/2769248/202203/2769248-20220317114855738-914326163.png)

然后Next

![](https://img2022.cnblogs.com/blog/2769248/202203/2769248-20220317114855495-1063588378.png)

再点击Fnish

![](https://img2022.cnblogs.com/blog/2769248/202203/2769248-20220317114856526-697262693.png)

（2） 在pom.xml中添加Spring Boot相关依赖

     1 <!-- 选择的Web模块依赖启动器、统一父类项目管理 -->
     2         <dependency>
     3             <groupId>org.springframework.boot</groupId>
     4             <artifactId>spring-boot-starter-web</artifactId>
     5         </dependency>
     6 
     7         <!-- 测试类依赖、引入Web场景依赖启动器 -->
     8         <dependency>
     9             <groupId>org.springframework.boot</groupId>
    10             <artifactId>spring-boot-starter-test</artifactId>
    11             <scope>test</scope>
    12         </dependency>

（3）编写主程序启动类

    1 @SpringBootApplication 
    2 public class ManualChapter01Application {
    3 public static void main(String[] args){
    4        SpringApplication.run(ManualChapter01Application.class,args);
    5     }
    6  }

 （4）创建一个用于Web访问的Controller

    1 @RestController     //  该注解为组合注解，等同于Spring中@Controller+@ResponseBody注解
    2 public class HelloController {
    3     @GetMapping("/hello")  // 该注解等同于Spring框架中@RequestMapping(RequestMethod.GET)注解
    4     public String hello(){
    5         return "hello Spring Boot";
    6     }
    7 }

（5）运行项目

**启动项目，在浏览器上访问****[http://localhost:8080/hello](http://localhost:8080/hello)**

![](https://img2022.cnblogs.com/blog/2769248/202203/2769248-20220317152902736-908094655.png)

###  3.2使用Spring Initializr方式构建Spring Boot项目

**搭建步骤：**

(1)创建Spring Boot项目

![](https://img2022.cnblogs.com/blog/2769248/202203/2769248-20220317152902826-478004054.png)

然后Next

![](https://img2022.cnblogs.com/blog/2769248/202203/2769248-20220317152902872-9539748.png)

创建好的项目结构如下图所示：

![](https://img2022.cnblogs.com/blog/2769248/202203/2769248-20220317152902938-2078017178.png)

（2）创建一个用于Web访问的Controller

    1 @RestController   
    2 public class HelloController {
    3 @GetMapping("/hello")
    4    public String hello(){
    5         return "hello Spring Boot";
    6     }
    7 }

（3）运行项目

**启动项目，在浏览器上访问****[http://localhost:8080/hello](http://localhost:8080/hello)**

![](https://img2022.cnblogs.com/blog/2769248/202203/2769248-20220317152902923-1439711793.png)

三、单元测试与热部署
==========

1.单元测试
------

单元测试（unit testing），是指对软件中的最小可测试单元进行检查和验证。对于单元测试中单元的含义，一般来说，要根据实际情况去判定其具体含义，如C语言中单元指一个函数，Java里单元指一个类，图形化的软件中可以指一个窗口或一个菜单等。总的来说，单元就是人为规定的最小的被测功能模块。单元测试是在软件开发过程中要进行的最低级别的测试活动，软件的独立单元将在与程序的其他部分相隔离的情况下进行测试。

**搭建步骤：**

### 1.1在pom文件中添加spring-boot-starter-test测试启动器

    1 <!-- 引入热部署依赖 -->
    2 <dependency>
    3     <groupId>org.springframework.boot</groupId>
    4     <artifactId>spring-boot-starter-test</artifactId>
    5     <scope>test</scope>
    6 </dependency>

### 1.2编写单元测试类

    1 @RunWith(SpringRunner.class)   // 测试启动器，并加载Spring Boot测试注解
    2 @SpringBootTest       // 标记为Spring Boot单元测试类，并加载项目的ApplicationContext上下文环境
    3 public class Chapter01ApplicationTests {
    4 
    5     // 自动创建的单元测试方法示例
    6     @Test
    7     public void contextLoads() {
    8     }
    9 ｝

### 1.3编写单元测试方法

    1  @Autowired//注入HelloController实例对象
    2     private HelloController helloController;
    3     @Test
    4     public void helloControllerTest() {
    5         String hello = helloController.hello();
    6         System.out.println(hello);
    7     }

### 1.4运行结果

**执行****测试方法****helloControllerTest****()****，控制台输出如图。**

![](https://img2022.cnblogs.com/blog/2769248/202203/2769248-20220317152902759-918102760.png)

2.热部署
-----

所谓热部署，就是在应用正在运行的时候升级软件，却不需要重新启动应用。

对于Java应用程序来说，热部署就是在运行时更新Java类文件。在基于Java的应用服务器实现热部署的过程中，类装入器扮演着重要的角色。大多数基于Java的应用服务器，包括EJB服务器和Servlet容器，都支持热部署。类装入器不能重新装入一个已经装入的类，但只要使用一个新的类装入器实例，就可以将类再次装入一个正在运行的应用程序。

**搭建步骤：**

### 2.1在pom文件中添加spring-boot-devtools热部署依赖

    1  <!-- 引入热部署依赖 -->
    2 <dependency>                
    3    <groupId>org.springframework.boot</groupId>
    4    <artifactId>spring-boot-devtools</artifactId>
    5 </dependency>

### 2.2IDEA中热部署设置

 （1）**选择【****File****】****→****【****Settings****】选项，打开****Compiler****面板设置页****。**

设置为自动编译

![](https://img2022.cnblogs.com/blog/2769248/202203/2769248-20220317152902930-1668920992.png)

（2）**使用快捷键“****Ctrl+Shift+Alt****+/****”打开****Maintenance****选项框****，****选中并****打****开****Registry****页面****。**

指定IDEA工具在程序运行过程中自动编译

![](https://img2022.cnblogs.com/blog/2769248/202203/2769248-20220317152902915-711610394.png)

### 2.3热部署测试

（1)启动chapter01项目，通过浏览器访问**[http://localhost:8080/hello](http://localhost:8080/hello)**

![](https://img2022.cnblogs.com/blog/2769248/202203/2769248-20220317152902652-1606049745.png)

(2)修改类HelloController中的请求处理方法hello()的返回值，刷新浏览器。

![](https://img2022.cnblogs.com/blog/2769248/202203/2769248-20220317152902759-921118824.png)

四、**Spring Boot** **原理分析**
==========================

**1.Spring Boot** **依赖管理**
--------------------------

**Spring Boot为完成不同需求的Spring应用构建，提供了多种不同的依赖管理模板，每种模板均为一系列已完成的依赖的管理。例如在我们的入门程序中，需要构建web项目，我们只需添加spring-boot-starter-web的依赖即可，它会将你所需的其他依赖导入到你的工程中。官方称之为“物料清单”（Bills of Materials），也因此在使用时我们需要构建工具的支持，如Maven或者Gradle等。**

### 1.1 spring-boot-starter-parent依赖

    1 <!-- Spring Boot父项目依赖管理 -->
    2 <parent>
    3     <groupId>org.springframework.boot</groupId>
    4     <artifactId>spring-boot-starter-parent</artifactId>
    5     <version>2.1.3.RELEASE</version>
    6     <relativePath/>
    7 </parent>

**注：**spring-boot-starter-parent是通过<properties>标签对一些常用技术框架的依赖文件进行了统一版本号管理。

### 1.2 spring-boot-starter-web依赖

    1 <dependency>
    2    <groupId>org.springframework.boot</groupId>
    3     <artifactId>spring-boot-starter-web</artifactId>
    4 </dependency>

**注：**spring-boot-starter-web依赖启动器的主要作用是提供Web开发场景所需的底层所有依赖文件，它对Web开发场景所需的依赖文件进行了统一管理。

2.Spring Boot自动配置
-----------------

Spring Boot会根据类路径中的jar包、类，为jar包里的类自动配置，这样可以极大的减少配置的数量。简单点说就是它会根据定义在classpath下的类，自动的给你生成一些Bean，并加载到Spring的Context中。自动配置充分的利用了spring 4.0的条件化配置特性，能够自动配置特定的Spring bean，用来启动某项特性。

### 2.1 Spring Boot自动配置的实现

*   Spring Boot应用的启动入口是@SpringBootApplication注解标注类中的main()方法；
*   @SpringBootApplication能够扫描Spring组件并自动配置Spring Boot。
*   @SpringBootApplication注解是一个组合注解，包含@SpringBootConfiguration、@EnableAutoConfiguration、@ComponentScan三个核心注解

![](https://img2022.cnblogs.com/blog/2769248/202203/2769248-20220317152902646-951759221.png)

### 2.2 Spring Boot 的执行流程主要分为两步：

![](https://img2022.cnblogs.com/blog/2769248/202203/2769248-20220317152902677-841926513.png)

（1）初始化Spring Application实例

![](https://img2022.cnblogs.com/blog/2769248/202203/2769248-20220317152902888-624550946.png)

（2）初始化Spring Boot 项目启动

![](https://img2022.cnblogs.com/blog/2769248/202203/2769248-20220317152902874-485887757.png)

总结：
---

看完本篇文章，你应该学会了自主搭建SpringBoot项目，认识了此框架的单元测试和热部署等配置信息。

以上便是本篇文章所写的关于SpringBoot框架入门的所有内容了，码字不易，对你有帮助的话，请给个三连（关注、点赞、收藏）有问题可评论区留言讨论。

后期会完善SpringBoot框架进阶的相关知识，如有帮助的话，敬请关注楼主后续发文（不定时发文）

转载时请注明出处链接

 参考文档：
------

 1.百度百科：https://www.baidu.com/

2.传智播客-黑马程序教程：[http://stu.ityxb.com/](http://stu.ityxb.com/)

本文来自博客园，作者：[智博程序园](https://www.cnblogs.com/zbcxy506/)，转载请注明原文链接，谢谢配合：[https://www.cnblogs.com/zbcxy506/p/zbcxy506\_5springboot-01.html](https://www.cnblogs.com/zbcxy506/p/zbcxy506_5springboot-01.html)