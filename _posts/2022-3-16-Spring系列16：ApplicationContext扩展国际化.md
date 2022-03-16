---
layout: post
title: "Spring系列16：ApplicationContext扩展国际化"
date: "2022-03-16T06:10:34.775Z"
---
Spring系列16：ApplicationContext扩展国际化

### 本文内容

1.  BeanFactory对比ApplicationContext
    
2.  ApplicationContext的扩展能力
    
3.  国际化
    

### BeanFactory对比ApplicationContext

简单点对比下两者的功能定位：

*   BeanFactory 提供了管理和操作 bean 的基本功能，为 Spring的IoC 功能提供了底层基础，用于与 Spring 的其他部分以及相关的第三方框架的集成
*   ApplicationContext 在 BeanFactory 基础上还扩展了其他接口以提供更多面向应用程序框架和企业开发的附加功能。

下表列出了 BeanFactory 和 ApplicationContext 接口和实现提供的功能。

功能特性

`BeanFactory`

`ApplicationContext`

Bean实例化和属性注入

Yes

Yes

生命周期管理

No

Yes

`BeanPostProcessor` 自动注册

No

Yes

`BeanFactoryPotProcessor` 自动注册

No

Yes

国际化 `MessageSource`

No

Yes

内置的 `ApplicationEvent` 发布机制

No

Yes

因为ApplicationContext包含BeanFactory的所有功能，所以通常建议使用它而不是普通的BeanFactory，除非需要完全控制bean处理的场景。

### ApplicationContext的扩展能力

上面讨论了`org.springframework.beans.factory`包提供了管理和操作bean的基本功能，包括以编程的方式。`org.springframework.context`包添加了ApplicationContext接口，它扩展了BeanFactory接口，此外还扩展了其他接口，以更面向应用程序框架的方式提供额外的功能。

*   国际化： 通过 MessageSource 接口以 i18n 方式访问消息
*   通过 ResourceLoader 接口访问资源，例如 URL 和文件
*   事件发布，即通过使用 ApplicationEventPublisher 接口发布到实现 ApplicationListener 接口的 bean
*   通过 HierarchicalBeanFactory 接口加载多个（分层）上下文，让每个上下文都专注于一个特定的层，例如应用程序的 Web 层

### 国际化 MessageSource

ApplicationContext 接口扩展了一个名为 MessageSource 的接口，因此提供了国际化（“i18n”）功能。

MessageSource 接口定义和主要方法如下

    public interface MessageSource {
        // 获取消息： code消息key args替换内支持{} default默认值 loc语言
    	String getMessage(String code, Object[] args, String default, Locale loc);
        String getMessage(String code, Object[] args, Locale loc)
    	String getMessage(String code, Object[] args, Locale loc)
    }
    

> `java.util.Locale` 对象表示特定的地理、政治或文化区域。如中国是`zh`

#### Spring中查找加载MessageSource过程

*   加载 ApplicationContext 时，它会自动搜索上下文中定义的 MessageSource bean。 bean 必须具有名称 **messageSource**。
*   如果找到了这样的bean，那么对上述方法的所有调用都被委托给消息源。
*   如果没有找到消息源，ApplicationContext将尝试查找包含具有相同名称的bean的父类。如果有，则使用该bean作为MessageSource。
*   如果 ApplicationContext 找不到任何消息源，则实例化一个空的 DelegatingMessageSource 以便能够接受对上面定义的方法的调用。

#### MessageSource 实现

Spring 提供了三个 MessageSource 实现：

*   ResourceBundleMessageSource
    
    使用指定的基本名称访问资源包，这个类依赖于底层 JDK 的 ResourceBundle 实现，结合 MessageFormat 提供的 JDK 标准消息解析。
    
*   ReloadableResourceBundleMessageSource
    
    Spring 特定的实现，使用指定的基本名称访问资源包，参与 Spring .ApplicationContext 的资源加载。与基于 JDK 的 ResourceBundleMessageSource 相比，该类使用 `java.util.Properties`实例作为其自定义的消息数据结构，通过 Spring Resource 句柄的 `org.springframework.util.PropertiesPersister` 策略加载它们。**该策略不仅能够基于时间戳更改重新加载文件，还能够加载具有特定字符编码的属性文件。它还将检测 XML 属性文件。**
    
*   StaticMessageSource。
    
    MessageSource 的简单实现，它允许以编程方式注册消息。此 MessageSource 支持基本的国际化。用于测试而不是用于生产系统。
    

它们都实现了 HierarchicalMessageSource 以进行嵌套消息传递。

> Resource 相关的知识点后续文章已经安排上

#### 综合案例

提供一个ResourceBundleMessageSource 的案例，方便理解。

1.  类路径定义国际化资源文件，定义默认和中文的
    
    demo16/exceptions\_en.properties 文件，支持{..}占位符内容替换
    
        argument.required=The {0} argument is required.
        
    
    demo16/exceptions\_zh.properties 文件
    
        argument.required={0} 参数是必须的.
        
    
    demo16/format\_zh.properties 文件
    
        message=中文消息
        
    
    demo16/format\_en.properties 文件
    
        message=en
        
    
2.  注入 ResourceBundleMessageSource 实例，名称为 **messageSource**
    
        @Configuration
        @ComponentScan
        public class AppConfig {
        
            @Bean("messageSource")
            public ResourceBundleMessageSource messageSource() {
                ResourceBundleMessageSource source = new ResourceBundleMessageSource();
                //  设置类路径下的资源文件
                source.setBasenames("demo16/format","demo16/exceptions","demo16/windows");
                return source;
            }
        }
        
    
3.  bean中调用 MessageSource 接口方法使用
    
        @Component
        public class MyBean {
            @Autowired
            private MessageSource messageSource;
        
            // 获取消息内容
            public void execute() {
                System.out.println("获取消息内容:");
                String message = this.messageSource.getMessage("message", null, "Default", Locale.ENGLISH);
                System.out.println(message);
            }
        
            // 替换占位符内容 字符串形式
            public void execute1() {
                System.out.println(" 替换占位符内容 字符串形式: ");
                String message = this.messageSource.getMessage("argument.required", new Object[]{"messageSource"},
                        "Required", Locale.ENGLISH);
                System.out.println(message);
            }
        
        
            // 获取中文消息
            public void getChinesMessage() {
                System.out.println("替换占位符内容 字符串形式，语言是中文: ");
                String message = this.messageSource.getMessage("argument.required", new Object[]{"messageSource"},
                        "Required", Locale.CHINESE);
                System.out.println(message);
            }
        }
        
    
4.  测试并观察结果
    
        @Test
        public void test1() {
            AnnotationConfigApplicationContext context =
                    new AnnotationConfigApplicationContext(AppConfig.class);
            MyBean myBean = context.getBean(MyBean.class);
            myBean.execute();
            myBean.execute1();
            myBean.getChinesMessage();
        }
        
    
        获取消息内容:
        en
         替换占位符内容 字符串形式: 
        The messageSource argument is required.
        替换占位符内容 字符串形式，语言是中文: 
        messageSource 参数是必须的.
        
    
    已经可以根据语言进行国际化切换了
    

### 总结

本文介绍了Spring中BeanFactory和AppplicationContext的对比，重点介绍了AppplicationContext中扩展实现国际化。

> 本篇源码地址： [https://github.com/kongxubihai/pdf-spring-series/tree/main/spring-series-ioc/src/main/java/com/crab/spring/ioc/demo16](https://github.com/kongxubihai/pdf-spring-series/tree/main/spring-series-ioc/src/main/java/com/crab/spring/ioc/demo16)  
> 知识分享，转载请注明出处。学无先后，达者为先！

posted on 2022-03-16 08:27  [kongxubihai](https://www.cnblogs.com/kongbubihai/)  阅读(41)  评论(0)  [编辑](https://i.cnblogs.com/EditPosts.aspx?postid=16011336)  [收藏](javascript:void(0))  [举报](javascript:void(0))