---
layout: post
title: "Spring系列25：Spring AOP 切点详解"
date: "2022-03-17T12:32:30.649Z"
---
Spring系列25：Spring AOP 切点详解

### 本文内容

1.  Spring 10种切点表达式详解
2.  切点的组合使用
3.  公共切点的定义

### 声明切点@Poincut

@Poincut 的使用格式如下：

    @Poincut("PCD") // 切点表达式 表示对哪些方法进行增强
    public void pc(){} // 切点签名，返回值必须为void
    

### 10种切点表达式

AspectJ的切点指示符AspectJ pointcut designators (PCD) ，也就是俗称的切点表达式，Spring中支持10种，如下表：

表达式类型

作用

匹配规则

`execution`

用于匹配方法执行的连接点

`within`

用于匹配指定类型内的方法执行

within(x)匹配规则target.getClass().equals(x)

`this`

用于匹配当前AOP代理对象类型的执行方法，包含引入的接口类型匹配

this(x)匹配规则：x.getClass.isAssingableFrom(proxy.getClass)

`target`

用于匹配当前目标对象类型的执行方法，不包括引入接口的类型匹配

target(x)匹配规则：x.getClass().isAssignableFrom(target.getClass());

`args`

用于匹配当前执行的方法传入的参数为指定类型的执行方法

传入的目标位置参数.getClass().equals(@args(对应的参数位置的注解类型))!= null

`@target`

用于匹配当前目标对象类型的执行方法，其中目标对象持有指定的注解

target.class.getAnnotation(指定的注解类型) != null

`@args`

用于匹配当前执行的方法传入的参数持有指定注解的执行

传入的目标位置参数.getClass().getAnnotation(@args(对应的参数位置的注解类型))!= null

`@within`

用于匹配所有持有指定注解类型内的方法

被调用的目标方法Method对象.getDeclaringClass().getAnnotation(within中指定的注解类型) != null

`@annotation`

用于匹配当前执行方法持有指定注解的方法

target.getClass().getMethod("目标方法名").getDeclaredAnnotation(@annotation(目标注解))!=null

`bean`

Spring AOP扩展的，AspectJ没有对应的指示符，用于匹配特定名称的Bean对象的执行方法

ApplicationContext.getBean("bean表达式中指定的bean名称") != null

简单介绍下AspectJ中常用的3个通配符：

*   `*`：匹配任何数量字符
*   `..`：匹配任何数量字符的重复，如任何数量子包，任何数量方法参数
*   `+`：匹配指定类型及其子类型，仅作为后缀防过载类型模式后面。

#### execution

用于匹配方法执行，最常用。

##### 格式说明

       execution(modifiers-pattern? ret-type-pattern declaring-type-pattern?name-pattern(param-pattern)
                    throws-pattern?)
    

*   其中带 `?`号的 `modifiers-pattern?`，`declaring-type-pattern?`，`throws-pattern?`是可选项
*   `ret-type-pattern`,`name-pattern`, `parameters-pattern`是必选项
*   `modifier-pattern?` 修饰符匹配，如public 表示匹配公有方法，`*`表示任意修饰符
*   `ret-type-pattern` 返回值匹配，`*` 表示任何返回值，全路径的类名等
*   `declaring-type-pattern?` 类路径匹配
*   `name-pattern` 方法名匹配，`*` 代表所有，`xx*`代表以xx开头的所有方法
*   `(param-pattern)` 参数匹配，指定方法参数(声明的类型)，`(..)`代表所有参数，`(*,String)`代表第一个参数为任何值,第二个为String类型，`(..,String)`代表最后一个参数是String类型
*   `throws-pattern?` 异常类型匹配

##### 举例说明

    public class PointcutExecution {
    
        // com.crab.spring.aop.demo02包下任何类的任意方法
        @Pointcut("execution(* com.crab.spring.aop.demo02.*.*(..))")
        public void m1(){}
    
        // com.crab.spring.aop.demo02包及其子包下任何类的任意方法
        @Pointcut("execution(* com.crab.spring.aop.demo02..*.*(..))")
        public void m2(){}
    
        // com.crab.spring.aop包及其子包下IService接口的任意无参方法
        @Pointcut("execution(* com.crab.spring.aop..IService.*(..))")
        public void m3(){}
    
        // com.crab.spring.aop包及其子包下IService接口及其子类型的任意无参方法
        @Pointcut("execution(* com.crab.spring.aop..IService+.*(..))")
        public void m4(){}
    
        // com.crab.spring.aop.demo02.UserService类中有且只有一个String参数的方法
        @Pointcut("execution(* com.crab.spring.aop.demo02.UserService.*(String))")
        public void m5(){}
    
        // com.crab.spring.aop.demo02.UserService类中参数个数为2且最后一个参数类型是String的方法
        @Pointcut("execution(* com.crab.spring.aop.demo02.UserService.*(*,String))")
        public void m6(){}
    
        // com.crab.spring.aop.demo02.UserService类中最后一个参数类型是String的方法
        @Pointcut("execution(* com.crab.spring.aop.demo02.UserService.*(..,String))")
        public void m7(){}
    }
    

#### within

##### 格式说明

`within(类型表达式)`：目标对象target的类型是否和within中指定的类型匹配

> 匹配规则： target.getClass().equals(within表达式中指定的类型)

##### 举例说明

    public class PointcutWithin {
        // 匹配 com.crab.spring.aop.demo02包及其子包下任何类的任何方法
        @Pointcut("within(com.crab.spring.aop.demo02..*)")
        public void m() {
        }
    
        // 匹配m.crab.spring.aop.demo02包及其子包下IService类型及其子类型的任何方法
        @Pointcut("within(com.crab.spring.aop.demo02..IService+)")
        public void m2() {
        }
    
        // 匹配com.crab.spring.aop.demo02.UserService类中所有方法，不含其子类
        @Pointcut("within(com.crab.spring.aop.demo02.UserService)")
        public void m3() {
        }
    }
    

#### this

##### 格式说明

`this(类型全限定名)`：通过aop创建的**代理对象的类型**是否和this中指定的类型匹配；this中使用的表达式必须是类型全限定名，不支持通配符。

    this(x)的匹配规则是：x.getClass.isAssingableFrom(proxy.getClass)
    

##### 举例说明

    package com.crab.spring.aop.demo02.aspectj;
    
    import org.aspectj.lang.JoinPoint;
    import org.aspectj.lang.annotation.Aspect;
    import org.aspectj.lang.annotation.Before;
    import org.aspectj.lang.annotation.Pointcut;
    import org.springframework.aop.aspectj.annotation.AspectJProxyFactory;
    import org.springframework.aop.support.AopUtils;
    import org.springframework.util.ClassUtils;
    
    /**
     * @author zfd
     * @version v1.0
     * @date 2022/2/6 21:41
     * @关于我 请关注公众号 螃蟹的Java笔记 获取更多技术系列
     */
    @Aspect
    public class PointcutThis {
        interface I1{
            void m();
        }
        static class C1 implements I1{
    
            @Override
            public void m() {
                System.out.println("C1 m()");
            }
        }
    	// 匹配 I1类型或是其子类
        @Pointcut("this(com.crab.spring.aop.demo02.aspectj.PointcutThis.I1)")
        public void pc(){}
    
        @Before("pc()")
        public void before(JoinPoint joinPoint) {
            System.out.println("before: " + joinPoint);
        }
    
        public static void main(String[] args) {
            C1 target = new C1();
            AspectJProxyFactory proxyFactory = new AspectJProxyFactory();
            proxyFactory.setTarget(target);
            // proxyFactory.setProxyTargetClass(true);
            // 获取C1上所有接口 spring工具类提供的方法
            Class<?>[] allInterfaces = ClassUtils.getAllInterfaces(target);
            // 设置代理接口
            proxyFactory.setInterfaces(allInterfaces);
            // 添加切面
            proxyFactory.addAspect(PointcutThis.class);
            // 获取代理
            I1 proxy = proxyFactory.getProxy();
            // 调用方法
            proxy.m();
            System.out.println("JDK代理? " + AopUtils.isJdkDynamicProxy(proxy));
            System.out.println("CGLIB代理? " + AopUtils.isCglibProxy(proxy));
            //判断代理对象是否是C1类型的
            System.out.println(C1.class.isAssignableFrom(proxy.getClass()));
        }
    
    }
    

来观察下输出

    before: execution(void com.crab.spring.aop.demo02.aspectj.PointcutThis$C1.m())
    C1 m()
    JDK代理? false
    CGLIB代理? true
    true
    

使用JDK动态代理生成的代理对象，其类型是I1类型。

> 思考下：将切点表达式改成下面的输出结果是？
> 
> // 匹配 C1类型或是其子类  
> @Pointcut("this(com.crab.spring.aop.demo02.aspectj.PointcutThis.C1)")  
> public void pc(){}

#### target

##### 格式说明

`target(类型全限定名)`：判断**目标对象的类型**是否和指定的类型匹配；表达式必须是类型全限定名，不支持通配符。

    target(x)匹配规则：x.getClass().isAssignableFrom(target.getClass());
    

##### 举例说明

    @Aspect
    public class PointcutTarget {
        interface I1{
            void m();
        }
        static class C1 implements I1{
    
            @Override
            public void m() {
                System.out.println("C1 m()");
            }
        }
    
        // 匹配目标类型必须是
        @Pointcut("target(com.crab.spring.aop.demo02.aspectj.PointcutTarget.C1)")
        public void pc(){}
    
        @Before("pc()")
        public void before(JoinPoint joinPoint) {
            System.out.println("before: " + joinPoint);
        }
    
        public static void main(String[] args) {
            C1 target = new C1();
            AspectJProxyFactory proxyFactory = new AspectJProxyFactory();
            proxyFactory.setTarget(target);
            proxyFactory.setProxyTargetClass(true);
            // 获取C1上所有接口 spring工具类提供的方法
            Class<?>[] allInterfaces = ClassUtils.getAllInterfaces(target);
            // 设置代理接口
            proxyFactory.setInterfaces(allInterfaces);
            // 添加切面
            proxyFactory.addAspect(PointcutTarget.class);
            // 获取代理
            I1 proxy = proxyFactory.getProxy();
            // 调用方法
            proxy.m();
            System.out.println("JDK代理? " + AopUtils.isJdkDynamicProxy(proxy));
            System.out.println("CGLIB代理? " + AopUtils.isCglibProxy(proxy));
            //判断代理对象是否是C1类型的
            System.out.println(C1.class.isAssignableFrom(target.getClass()));
        }
    
    }
    

输出结果

    before: execution(void com.crab.spring.aop.demo02.aspectj.PointcutTarget$C1.m())
    C1 m()
    JDK代理? false
    CGLIB代理? true
    true
    

#### args

##### 格式说明

`args(参数类型列表)`匹配**当前执行的方法传入的参数**是否为args中指定的类型；参数类型列表中的参数必须是**类型全限定名，不支持通配符**；**args属于动态切入点，也就是执行方法的时候进行判断的，开销非常大，非特殊情况最好不要使用。**

    args(String) //    方法个数为1，类型是String
    args(*,String) //  方法参数个数2，第2个是String类型
    args(..,String) // 方法个数不限制，最后一个必须是String
    

##### 举例说明

    package com.crab.spring.aop.demo02.aspectj;
    
    import org.aspectj.lang.JoinPoint;
    import org.aspectj.lang.annotation.Aspect;
    import org.aspectj.lang.annotation.Before;
    import org.aspectj.lang.annotation.Pointcut;
    import org.springframework.aop.aspectj.annotation.AspectJProxyFactory;
    import org.springframework.aop.support.AopUtils;
    import org.springframework.util.ClassUtils;
    
    /**
     * @author zfd
     * @version v1.0
     * @date 2022/2/6 21:41
     * @关于我 请关注公众号 螃蟹的Java笔记 获取更多技术系列
     */
    @Aspect
    public class PointcutArgs {
        interface I1{
            void m(Object name);
        }
        static class C1 implements I1{
    
            @Override
            public void m(Object name) {
                String type = name.getClass().getName();
                System.out.println("C1 m() 参数类型 " + type);
            }
        }
    
        // 匹配方法参数个数1且类型是必须是String
        @Pointcut("args(String)")
        public void pc(){}
    
        @Before("pc()")
        public void before(JoinPoint joinPoint) {
            System.out.println("before: " + joinPoint);
        }
    
        public static void main(String[] args) {
            C1 target = new C1();
            AspectJProxyFactory proxyFactory = new AspectJProxyFactory();
            proxyFactory.setTarget(target);
            proxyFactory.setProxyTargetClass(true);
            // 获取C1上所有接口 spring工具类提供的方法
            Class<?>[] allInterfaces = ClassUtils.getAllInterfaces(target);
            // 设置代理接口
            proxyFactory.setInterfaces(allInterfaces);
            // 添加切面
            proxyFactory.addAspect(PointcutArgs.class);
            // 获取代理
            I1 proxy = proxyFactory.getProxy();
            // 调用方法
            proxy.m("xxxx");
            proxy.m(100L);
            System.out.println("JDK代理? " + AopUtils.isJdkDynamicProxy(proxy));
            System.out.println("CGLIB代理? " + AopUtils.isCglibProxy(proxy));
            //判断代理对象是否是C1类型的
            System.out.println(C1.class.isAssignableFrom(target.getClass()));
        }
    
    }
    

观察下输出

    before: execution(void com.crab.spring.aop.demo02.aspectj.PointcutArgs$C1.m(Object))
    C1 m() 参数类型 java.lang.String
    C1 m() 参数类型 java.lang.Long
    JDK代理? false
    CGLIB代理? true
    true	
    

参数类型传递是String时候增强了，而Long的时候没有执行增强方法。

#### @within

##### 格式说明

`@within(注解类型)`：匹配指定的注解内定义的方法。

    匹配规则： 被调用的目标方法Method对象.getDeclaringClass().getAnnotation(within中指定的注解类型) != null
    

##### 举例说明

    package com.crab.spring.aop.demo02.aspectj;
    
    import org.aspectj.lang.JoinPoint;
    import org.aspectj.lang.annotation.Aspect;
    import org.aspectj.lang.annotation.Before;
    import org.aspectj.lang.annotation.Pointcut;
    import org.springframework.aop.aspectj.annotation.AspectJProxyFactory;
    import org.springframework.aop.support.AopUtils;
    import org.springframework.util.ClassUtils;
    
    import java.lang.annotation.ElementType;
    import java.lang.annotation.Retention;
    import java.lang.annotation.RetentionPolicy;
    import java.lang.annotation.Target;
    
    /**
     * @author zfd
     * @version v1.0
     * @date 2022/2/6 21:41
     * @关于我 请关注公众号 螃蟹的Java笔记 获取更多技术系列
     */
    @Aspect
    public class PointcutAnnWithin {
        @Retention(RetentionPolicy.RUNTIME)
        @Target(ElementType.TYPE)
        @interface MyAnn {
        }
    
        interface I1 {
            void m();
        }
    
        @MyAnn
        static class C1 implements I1 {
            @Override
            public void m() {
                System.out.println("C1 m()");
            }
        }
    
        // 匹配目标类型必须上必须有注解MyAnn
        @Pointcut("@within(com.crab.spring.aop.demo02.aspectj.PointcutAnnWithin.MyAnn)")
        public void pc() {
        }
    
        @Before("pc()")
        public void before(JoinPoint joinPoint) {
            System.out.println("before: " + joinPoint);
        }
    
        public static void main(String[] args) {
            C1 target = new C1();
            AspectJProxyFactory proxyFactory = new AspectJProxyFactory();
            proxyFactory.setTarget(target);
            proxyFactory.setProxyTargetClass(true);
            // 获取C1上所有接口 spring工具类提供的方法
            Class<?>[] allInterfaces = ClassUtils.getAllInterfaces(target);
            // 设置代理接口
            proxyFactory.setInterfaces(allInterfaces);
            // 添加切面
            proxyFactory.addAspect(PointcutAnnWithin.class);
            // 获取代理
            I1 proxy = proxyFactory.getProxy();
            // 调用方法
            proxy.m();
            System.out.println("JDK代理? " + AopUtils.isJdkDynamicProxy(proxy));
            System.out.println("CGLIB代理? " + AopUtils.isCglibProxy(proxy));
            //判断代理对象是否是C1类型的
            System.out.println(C1.class.isAssignableFrom(target.getClass()));
        }
    
    }
    

输出

    before: execution(void com.crab.spring.aop.demo02.aspectj.PointcutAnnWithin$C1.m())
    C1 m()
    JDK代理? false
    CGLIB代理? true
    true
    

> 思考下父类上有注解，子类继承父类的方法，同时考虑下注解@Inherited是否在切点注解的场景？

#### @target

##### 格式说明

`@target(注解类型)`：判断目标对象target类型上是否有指定的注解；@target中注解类型也必须是全限定类型名。

    匹配规则： target.class.getAnnotation(指定的注解类型) != null
    

注意，如果目标注解是标注在父类上的，那么定义目标注解时候应使用`@Inherited`标注，使子类能继承父类的注解。

##### 举例说明

    package com.crab.spring.aop.demo02.aspectj;
    
    import org.aspectj.lang.JoinPoint;
    import org.aspectj.lang.annotation.Aspect;
    import org.aspectj.lang.annotation.Before;
    import org.aspectj.lang.annotation.Pointcut;
    import org.springframework.aop.aspectj.annotation.AspectJProxyFactory;
    import org.springframework.aop.support.AopUtils;
    import org.springframework.util.ClassUtils;
    
    import java.lang.annotation.*;
    
    /**
     * @author zfd
     * @version v1.0
     * @date 2022/2/6 21:41
     * @关于我 请关注公众号 螃蟹的Java笔记 获取更多技术系列
     */
    @Aspect
    public class PointcutAnnTarget {
        @Retention(RetentionPolicy.RUNTIME)
        @Target(ElementType.TYPE)
        @Inherited // 子类能继承父类的注解
        @interface MyAnn2 {
        }
    
        @MyAnn2 // 注解在父类上
        static class P1 {
            void m(){}
        }
    
        static class C1 extends P1 {
            @Override
            public void m() {
                System.out.println("C1 m()");
            }
        }
    
        // 匹配目标类型必须上必须有注解MyAnn
        @Pointcut("@target(com.crab.spring.aop.demo02.aspectj.PointcutAnnTarget.MyAnn2)")
        public void pc() {
        }
    
        @Before("pc()")
        public void before(JoinPoint joinPoint) {
            System.out.println("before: " + joinPoint);
        }
    
        public static void main(String[] args) {
            C1 target = new C1();
            AspectJProxyFactory proxyFactory = new AspectJProxyFactory();
            proxyFactory.setTarget(target);
            proxyFactory.setProxyTargetClass(true);
            // 获取C1上所有接口 spring工具类提供的方法
            Class<?>[] allInterfaces = ClassUtils.getAllInterfaces(target);
            // 设置代理接口
            proxyFactory.setInterfaces(allInterfaces);
            // 添加切面
            proxyFactory.addAspect(PointcutAnnTarget.class);
            // 获取代理
            C1 proxy = proxyFactory.getProxy();
            // 调用方法
            proxy.m();
            System.out.println("JDK代理? " + AopUtils.isJdkDynamicProxy(proxy));
            System.out.println("CGLIB代理? " + AopUtils.isCglibProxy(proxy));
            // 目标类上是否有切点注解
            System.out.println(target.getClass().getAnnotation(MyAnn2.class)!= null);
        }
    
    }
    

输出结果

    before: execution(void com.crab.spring.aop.demo02.aspectj.PointcutAnnTarget$C1.m())
    C1 m()
    JDK代理? false
    CGLIB代理? true
    true
    

从结果最后一行看，目标对象继承了父类的注解，符合@target的切点规则。

#### @args

##### 格式说明

`@args(注解类型)`：方法参数所属的类上有指定的注解；注意不是参数上有指定的注解，而是参数类型的类上有指定的注解。和`args`类似，不过针对的是参数类型上的注解。

    匹配规则： 传入的目标位置参数.getClass().getAnnotation(@args(对应的参数位置的注解类型))!= null
    

##### 举例说明

    package com.crab.spring.aop.demo02.aspectj;
    
    import org.aspectj.lang.JoinPoint;
    import org.aspectj.lang.annotation.Aspect;
    import org.aspectj.lang.annotation.Before;
    import org.aspectj.lang.annotation.Pointcut;
    import org.springframework.aop.aspectj.annotation.AspectJProxyFactory;
    import org.springframework.aop.support.AopUtils;
    import org.springframework.util.ClassUtils;
    
    import java.lang.annotation.*;
    
    /**
     * @author zfd
     * @version v1.0
     * @date 2022/2/6 21:41
     * @关于我 请关注公众号 螃蟹的Java笔记 获取更多技术系列
     */
    @Aspect
    public class PointcutAnnArgs {
        @Retention(RetentionPolicy.RUNTIME)
        @Target(ElementType.TYPE)
        @Inherited // 子类能继承父类的注解
        @interface MyAnn3 {
        }
    
        @MyAnn3
        static class MyParameter{
    
        }
    
        static class C1  {
            public void m(MyParameter myParameter) {
                System.out.println(myParameter.getClass().getAnnotation(MyAnn3.class));
                System.out.println("C1 m()");
            }
        }
    
        // 匹配方法上最后的一个参数类型上有注解MyAnn3
        @Pointcut("@args(..,com.crab.spring.aop.demo02.aspectj.PointcutAnnArgs.MyAnn3)")
        public void pc() {
        }
    
        @Before("pc()")
        public void before(JoinPoint joinPoint) {
            System.out.println("before: " + joinPoint);
        }
    
        public static void main(String[] args) {
            C1 target = new C1();
            AspectJProxyFactory proxyFactory = new AspectJProxyFactory();
            proxyFactory.setTarget(target);
            proxyFactory.setProxyTargetClass(true);
            // 获取C1上所有接口 spring工具类提供的方法
            Class<?>[] allInterfaces = ClassUtils.getAllInterfaces(target);
            // 设置代理接口
            proxyFactory.setInterfaces(allInterfaces);
            // 添加切面
            proxyFactory.addAspect(PointcutAnnArgs.class);
            // 获取代理
            C1 proxy = proxyFactory.getProxy();
            // 调用方法
            MyParameter myParameter = new MyParameter();
            proxy.m(myParameter);
            System.out.println("JDK代理? " + AopUtils.isJdkDynamicProxy(proxy));
            System.out.println("CGLIB代理? " + AopUtils.isCglibProxy(proxy));
            // 目标类上是否有切点注解
            System.out.println(myParameter.getClass().getAnnotation(MyAnn3.class)!= null);
        }
    
    }
    

观察结果

    before: execution(void com.crab.spring.aop.demo02.aspectj.PointcutAnnArgs$C1.m(MyParameter))
    @com.crab.spring.aop.demo02.aspectj.PointcutAnnArgs$MyAnn3()
    C1 m()
    JDK代理? false
    CGLIB代理? true
    true
    

第二行中目标方法上输出了参数的注解。

最后一行判断参数类型上确实有注解。

#### @annotation

##### 格式说明

`@annotation(注解类型)`：匹配被调用的目标对象的方法上有指定的注解

    匹配规则：target.getClass().getMethod("目标方法名").getDeclaredAnnotation(@annotation(目标注解))!=null
    

这个在针对特定注解的方法日志拦截场景下应用比较多。

##### 举例说明

    package com.crab.spring.aop.demo02.aspectj;
    
    import org.aspectj.lang.JoinPoint;
    import org.aspectj.lang.annotation.Aspect;
    import org.aspectj.lang.annotation.Before;
    import org.aspectj.lang.annotation.Pointcut;
    import org.springframework.aop.aspectj.annotation.AspectJProxyFactory;
    import org.springframework.aop.support.AopUtils;
    import org.springframework.util.ClassUtils;
    
    import java.lang.annotation.*;
    
    /**
     * @author zfd
     * @version v1.0
     * @date 2022/2/6 21:41
     * @关于我 请关注公众号 螃蟹的Java笔记 获取更多技术系列
     */
    @Aspect
    public class PointcutAnnotation {
        @Retention(RetentionPolicy.RUNTIME)
        @Target(ElementType.METHOD)
        @interface MyAnn4 {
        }
    
        /**
         * 父类 方法上都有@MyAnn4
         */
        static class P1{
            @MyAnn4
            public void m1(){
                System.out.println("P1 m()");
            }
            @MyAnn4
            public void m2(){
                System.out.println("P1 m2()");
            }
        }
    
        /**
         * 子类
         * 注意重新重写了父类的m1方法但是没有声明注解@Ann4
         * 新增了m3方法带注解@Ann4
         */
        static class C1 extends P1 {
            @Override
            public void m1() {
                System.out.println("C1 m1()");
            }
    
            @MyAnn4
            public void m3() {
                System.out.println("C1 m3()");
            }
        }
    
        // 匹配调用的方法上必须有注解
        @Pointcut("@annotation(com.crab.spring.aop.demo02.aspectj.PointcutAnnotation.MyAnn4)")
        public void pc() {
        }
    
        @Before("pc()")
        public void before(JoinPoint joinPoint) {
            System.out.println("before: " + joinPoint);
        }
    
        public static void main(String[] args) throws NoSuchMethodException {
            C1 target = new C1();
            AspectJProxyFactory proxyFactory = new AspectJProxyFactory();
            proxyFactory.setTarget(target);
            proxyFactory.setProxyTargetClass(true);
            // 获取C1上所有接口 spring工具类提供的方法
            Class<?>[] allInterfaces = ClassUtils.getAllInterfaces(target);
            // 设置代理接口
            proxyFactory.setInterfaces(allInterfaces);
            // 添加切面
            proxyFactory.addAspect(PointcutAnnotation.class);
            // 获取代理
            C1 proxy = proxyFactory.getProxy();
            // 调用方法
            proxy.m1();
            proxy.m2();
            proxy.m3();
    
            System.out.println("JDK代理? " + AopUtils.isJdkDynamicProxy(proxy));
            System.out.println("CGLIB代理? " + AopUtils.isCglibProxy(proxy));
    
            // 目标对象的目标方法上是否直接声明了注解MyAnn4
            System.out.println(target.getClass().getMethod("m1").getDeclaredAnnotation(MyAnn4.class)!=null);
            System.out.println(target.getClass().getMethod("m2").getDeclaredAnnotation(MyAnn4.class)!=null);
            System.out.println(target.getClass().getMethod("m3").getDeclaredAnnotation(MyAnn4.class)!=null);
        }
    
    }
    

观察下结果

    C1 m1()
    before: execution(void com.crab.spring.aop.demo02.aspectj.PointcutAnnotation$P1.m2())
    P1 m2()
    before: execution(void com.crab.spring.aop.demo02.aspectj.PointcutAnnotation$C1.m3())
    C1 m3()
    JDK代理? false
    CGLIB代理? true
    false
    true
    true
    

简单分析下:

1.  C1中重写了m1方法，上面有没有 @Ann4，所有方法没有被拦截
2.  其它的m2在父类上有注解@Ann4，m3在子类上也有注解@Ann4，所以拦截了。
3.  最后3行输出了目标对象的3个方法上是否有注解的情况。

#### bean

##### 格式说明

**bean(bean名称)**：这个用在spring环境中，匹配容器中指定名称的bean。

    匹配格式：ApplicationContext.getBean("bean表达式中指定的bean名称") != null
    

##### 举例说明

定义一个bean

    package com.crab.spring.aop.demo02.aspectj;
    
    /**
     * @author zfd
     * @version v1.0
     * @date 2022/2/6 23:30
     * @关于我 请关注公众号 螃蟹的Java笔记 获取更多技术系列
     */
    public class MyBean {
        private String beanName;
    
        public MyBean(String beanName) {
            this.beanName = beanName;
        }
    
        public void m() {
            System.out.println("我是" + this.beanName);
        }
    }
    

切面中的切点和通知定义

    @Aspect
    public class PointcutBean {
        // 容器中bean名称是"myBean1"的方法进行拦截
        @Pointcut("bean(myBean1)")
        public void pc() {
        }
    
        @Before("pc()")
        public void m(JoinPoint joinPoint) {
            System.out.println("start " + joinPoint);
        }
    }
    

组合使用

    @Aspect
    @Configuration
    @EnableAspectJAutoProxy // 自动生成代理对象
    public class PointcutBeanConfig {
    
        // 注入 myBean1
        @Bean("myBean1")
        public MyBean myBean1() {
            return new MyBean("myBean1");
        }
    
        //  myBean2
        @Bean("myBean2")
        public MyBean myBean2() {
            return new MyBean("myBean2");
        }
    
        // 注入切面
        @Bean("pointcutBean")
        public PointcutBean pointcutBean() {
            return new PointcutBean();
        }
    
        public static void main(String[] args) {
            AnnotationConfigApplicationContext context =
                    new AnnotationConfigApplicationContext(PointcutBeanConfig.class);
            MyBean myBean1 = context.getBean("myBean1", MyBean.class);
            myBean1.m();
            MyBean myBean2 = context.getBean("myBean2", MyBean.class);
            myBean2.m();
        }
    
    }
    

观察下结果

    start execution(void com.crab.spring.aop.demo02.aspectj.MyBean.m())
    我是myBean1
    我是myBean2
    

myBean1的方法被拦截了。

上面介绍了Spring中10中切点表达式，下面介绍下切点的组合使用和公共切点的抽取。

### 切点的组合

切点与切点直接支持逻辑逻辑组合操作： `&&` 、`||、` `!`。使用较小的命名组件构建更复杂的切入点表达式是最佳实践。

##### 同一个类内切点组合

    public class CombiningPointcut {
    
        /**
         * 匹配 com.crab.spring.aop.demo02包及子包下任何类的public方法
         */
        @Pointcut("execution(public * com.crab.spring.aop.demo02..*.*(..))")
        public void publicMethodPc() {
        }
    
        /**
         * com.crab.spring.aop.demo02.UserService类的所有方法
         */
        @Pointcut("execution(* com.crab.spring.aop.demo02.UserService.*(..))")
        public void serviceMethodPc(){}
    
    
        /**
         * 组合的切点
         */
        @Pointcut("publicMethodPc() && serviceMethodPc()")
        public void combiningPc(){
    
        }
        /**
         * 组合的切点2
         */
        @Pointcut("publicMethodPc() || !serviceMethodPc()")
        public void combiningPc2(){
    
        }
    
    }
    

##### 不同类之间切点组合

切点方法的可见性会影响组合但是不影响切点的匹配。

    public class CombiningPointcut2 {
    
        /**
         * com.crab.spring.aop.demo02.UserService类的所有方法
         */
        @Pointcut("execution(* com.crab.spring.aop.demo02.UserService.*(..))")
        public void serviceMethodPc2(){}
    
    
        /**
         * 组合的切点,跨类组合
         */
        @Pointcut("com.crab.spring.aop.demo02.aspectj.reuse.CombiningPointcut.publicMethodPc() && serviceMethodPc2()")
        public void combiningPc(){
    
        }
        /**
         * 组合的切点,跨类组合,由于serviceMethodPc是private, 此处无法组合
         */
        @Pointcut("com.crab.spring.aop.demo02.aspectj.reuse.CombiningPointcut.serviceMethodPc() && serviceMethodPc2()")
        public void combiningPc2(){
    
        }
    }
    

### 切点的公用

在使用企业应用程序时，开发人员通常希望从多个方面引用应用程序的模块和特定的操作集。建议为此目的定义一个捕获公共切入点表达式的 CommonPointcuts 方面。直接看案例。

不同层的公共切点

    /**
     * 公用的切点
     * @author zfd
     * @version v1.0
     * @date 2022/2/7 8:53
     * @关于我 请关注公众号 螃蟹的Java笔记 获取更多技术系列
     */
    public class CommonPointcuts {
    
        /**
         * web层的通用切点
         */
        @Pointcut("within(com.xyz.myapp.web..*)")
        public void inWebLayer() {}
    
        @Pointcut("within(com.xyz.myapp.service..*)")
        public void inServiceLayer() {}
    
        @Pointcut("within(com.xyz.myapp.dao..*)")
        public void inDataAccessLayer() {}
    
        @Pointcut("execution(* com.xyz.myapp..service.*.*(..))")
        public void businessService() {}
    
        @Pointcut("execution(* com.xyz.myapp.dao.*.*(..))")
        public void dataAccessOperation() {}
    }
    

程序中可以直接引用这些公共的切点

    /**
     * 使用公共的切点
     * @author zfd
     * @version v1.0
     * @date 2022/2/7 8:56
     * @关于我 请关注公众号 螃蟹的Java笔记 获取更多技术系列
     */
    @Aspect
    public class UseCommonPointcuts {
    
        /**
         * 直接使用公共切点
         */
        @Before("com.crab.spring.aop.demo02.aspectj.reuse.CommonPointcuts.inWebLayer()")
        public void before(JoinPoint joinPoint){
            System.out.println("before:" + joinPoint);
        }
    }
    

### 总结

本文介绍Spring中10种切点表达式，最常用的是`execution`，同时介绍切点如何组合使用和如何抽取公共的切点。

> 本节案例源码地址： [https://github.com/kongxubihai/pdf-spring-series/tree/main/spring-series-aop/src/main/java/com/crab/spring/aop/demo02/aspectj](https://github.com/kongxubihai/pdf-spring-series/tree/main/spring-series-aop/src/main/java/com/crab/spring/aop/demo02/aspectj)

> 知识分享，转载请注明出处。学无先后，达者为先！

posted on 2022-03-17 14:18  [kongxubihai](https://www.cnblogs.com/kongbubihai/)  阅读(0)  评论(0)  [编辑](https://i.cnblogs.com/EditPosts.aspx?postid=16017046)  [收藏](javascript:void(0))  [举报](javascript:void(0))