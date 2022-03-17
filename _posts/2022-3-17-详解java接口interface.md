---
layout: post
title: "详解java接口interface"
date: "2022-03-17T13:24:58.595Z"
---
详解java接口interface
-----------------

引言
--

**接口**这个词在生活中我们并不陌生。

在中国大陆，我们可以将自己的家用电器的插头插到符合它插口的插座上；

我们在戴尔，惠普，联想，苹果等品牌电脑之间传输数据时，可以使用U盘进行传输。

插座的普适性是因为大部分都是**国标**的；U盘可以插到这些电脑上，是因为都遵循了USB2.0或者USB3.0的标准。

在遵循相同标准的前提下，就出现了接口。

接口的定义
-----

由引言可知，**接口就是多个类之间的公共规范。**

我们知道，普通类的定义是这样的

    public class 类名{
        
    }
    

接口的定义把**class**换成**interface**便可以了,如下所示：

    public interface 接口名{
        
    }
    

接口中定义抽象方法
---------

接口中抽象方法的定义如下：

    public abstract 方法返回类型 方法名();
    

其中public和abstract是可以**省略**的。从而，可以简写为如下形式：

    方法返回类型 方法名();
    

接口的抽象方法的使用
----------

**接口是不能new对象实例的。**那我们怎么调用接口的抽象方法呢？

我们需要新定义一个类来**实现**这个接口，然后覆盖重写接口中所有的抽象方法。其中实现接口的类定义方式如下：

    public class 类名 implements 需要实现的接口名{
     //重写所有抽象方法
    }
    

比如，可以定义一个接口和一个实现类,然后再定义一个类，来调用方法。

    package com.sjdwz;
    
    /**
     * @Description 接口示例代码
     * @Date 2022/3/17
     * @Created by 随机的未知 sjdwz.com
     */
    public interface MyInterfaceStudy1 {
        public abstract void test01();
    }
    

    package com.sjdwz;
    
    /**
     * @Description MyInterfaceStudy1接口的实现
     * @Date 2022/3/17
     * @Created by 随机的未知 sjdwz.com
     */
    public class MyInterfaceStudy1Impl implements MyInterfaceStudy1{
        @Override
        public void test01() {
            System.out.println("实现了接口MyInterfaceStudy1的test01方法");
        }
    }
    

    package com.sjdwz;
    
    /**
     * @Description 接口抽象方法使用测试
     * @Date 2022/3/17
     * @Created by 随机的未知 sjdwz.com
     */
    public class MyInterfaceStudyTest1 {
        public static void main(String[] args) {
            MyInterfaceStudy1Impl myInterfaceStudy1 = new MyInterfaceStudy1Impl();
            myInterfaceStudy1.test01();
        }
    }
    

注意：如果没有覆盖重写所有的抽象方法，那么本实现类需要是一个抽象类。

接口中定义默认方法
---------

假设某场景下，我们的接口需要进行升级，必须添加某些方法来满足新的需要，如果我们再定义抽象方法的话，那么我们之前实现该接口的所有非抽象类都需要重新进行修改。

那么有没有一种办法，能够让我们不改动接口实现类的代码就能完成接口的升级呢？

在Java8中对此给出了答案。

我们可以在接口中定义默认方法。

定义方式如下：

    public default 方法返回类型 方法名(){
    	//方法里面需要执行的内容
    }
    

public可以省略。

接口的默认方法的使用
----------

我们在定义接口的实现类时，不需要对默认方法进行覆盖重写，就可以使用该方法。请看如下的例子：

接口类的定义

    package com.sjdwz;
    
    /**
     * @Description 接口的默认方法
     * @Date 2022/3/17
     * @Created by 随机的未知 sjdwz.com
     */
    public interface MyInterfaceStudy2 {
        default void defaultFucTest01(){
            System.out.println("我在defaultFucTest01中，我是一个默认方法，我解决了接口升级的问题");
        }
        void testAbstarct();
    }
    
    

两个实现类的定义

    package com.sjdwz;
    
    /**
     * @Description TODO
     * @Date 2022/3/17
     * @Created by 随机的未知 sjdwz.com
     */
    public class MyInterfaceStudy2Impl implements MyInterfaceStudy2{
        @Override
        public void testAbstarct() {
            System.out.println("我在MyInterfaceStudy2Impl中，我重写了MyInterfaceStudy2中的抽象方法");
        }
    }
    

    package com.sjdwz;
    
    /**
     * @Description TODO
     * @Date 2022/3/17
     * @Created by 随机的未知 sjdwz.com
     */
    public class MyInterfaceStudy2DefaultImpl implements MyInterfaceStudy2{
        @Override
        public void defaultFucTest01() {
            System.out.println("我在MyInterfaceStudy2DefaultImpl中，我重写了MyInterfaceStudy2的默认方法");
        }
        @Override
        public void testAbstarct() {
            System.out.println("我在MyInterfaceStudy2DefaultImpl中，我重写了MyInterfaceStudy2的默认方法");
        }
    }
    

它们的使用：

    package com.sjdwz;
    
    /**
     * @Description TODO
     * @Date 2022/3/17
     * @Created by 随机的未知 sjdwz.com
     */
    public class MyInterfaceStudyTest2 {
        public static void main(String[] args) {
            MyInterfaceStudy2Impl myInterfaceStudy2 = new MyInterfaceStudy2Impl();
            myInterfaceStudy2.defaultFucTest01();
            myInterfaceStudy2.testAbstarct();
    
            MyInterfaceStudy2DefaultImpl myInterfaceStudy2Default = new MyInterfaceStudy2DefaultImpl();
            myInterfaceStudy2Default.defaultFucTest01();
            myInterfaceStudy2Default.testAbstarct();
        }
    }
    

输出如下：

![输出](https://sjdwz-1309011246.file.myqcloud.com/%E6%96%87%E7%AB%A0/%E8%AF%A6%E8%A7%A3java%E6%8E%A5%E5%8F%A3interface/202203172052725.png)

由此可见，接口实现类如果没有重写接口中的默认方法，会去调用接口中的默认方法；如果实现类重写了接口的默认方法，便会调用重写的方法。

接口中定义静态方法
---------

定义方式如下

    public static 方法返回类型 方法名(){
    	//方法里面需要执行的内容
    }
    

public可以省略

接口的静态方法的使用
----------

定义接口如下：

    package com.sjdwz;
    /**
     * @Description 接口中的静态方法
     * @Date 2022/3/17
     * @Created by 随机的未知 sjdwz.com
     */
    public interface MyInterfaceStudy3 {
        static void staticFuc(){
            System.out.println("我在MyInterfaceStudy3接口中，这是我的静态方法");
        }
    }
    

该接口的实现类如下

    package com.sjdwz;
    
    /**
     * @Description 实现类
     * @Date 2022/3/17
     * @Created by 随机的未知 sjdwz.com
     */
    public class MyInterfaceStudy3Impl implements MyInterfaceStudy3{
    }
    

如果我使用方式如下可以吗？

![错误使用](https://sjdwz-1309011246.file.myqcloud.com/%E6%96%87%E7%AB%A0/%E8%AF%A6%E8%A7%A3java%E6%8E%A5%E5%8F%A3interface/202203172052727.png)

强大的Java编辑器已经帮我们提示错误了。这样使用是不可以的。

正确使用方式时**接口名.静态方法名(参数)；**。

    package com.sjdwz;
    
    /**
     * @Description 接口静态方法的使用测试
     * @Date 2022/3/17
     * @Created by 随机的未知 sjdwz.com
     */
    public class MyInterfaceStudyTest3 {
        public static void main(String[] args) {
            MyInterfaceStudy3.staticFuc();
        }
    }
    

输出如下

![接口中静态方法的输出](https://sjdwz-1309011246.file.myqcloud.com/%E6%96%87%E7%AB%A0/%E8%AF%A6%E8%A7%A3java%E6%8E%A5%E5%8F%A3interface/202203172052728.png)

接口中定义常量
-------

定义方式如下

    public static final 数据类型 常量名 = 666;
    

其中public static final可以省略。

一般常量名的每个字母都大写，如果时多个单词，使用下划线连接。

如下所示：

    int NUM = 666;
    int DAILY_HOURS = 24;
    

接口中常量的使用
--------

定义接口如下：

    package com.sjdwz;
    /**
     * @Description 接口中定义常量
     * @Date 2022/3/17
     * @Created by 随机的未知 sjdwz.com
     */
    public interface MyInterfaceStudy4 {
        int NUM = 666;
        int DAILY_HOURS = 24;
    }
    

实现类如下

    package com.sjdwz;
    
    /**
     * @Description 实现类
     * @Date 2022/3/17
     * @Created by 随机的未知 sjdwz.com
     */
    public class MyInterfaceStudy4Impl {
    }
    

我们可以使用如下吗？

![错误使用](https://sjdwz-1309011246.file.myqcloud.com/%E6%96%87%E7%AB%A0/%E8%AF%A6%E8%A7%A3java%E6%8E%A5%E5%8F%A3interface/202203172052729.png)

很明显，又提示错误了。不能使用**实现类.常量**和**实现类的对象.常量**来使用。

正确使用如下：

    package com.sjdwz;
    
    /**
     * @Description 接口的常量使用测试
     * @Date 2022/3/17
     * @Created by 随机的未知 sjdwz.com
     */
    public class MyInterfaceStudyTest4 {
        public static void main(String[] args) {
            System.out.println("用接口来访问接口中的常量NUM：======"+MyInterfaceStudy4.NUM);
            System.out.println("用接口来方法接口中的常量DAILY_HOURS：======"+MyInterfaceStudy4.DAILY_HOURS);
        }
    }
    

输出如下：

![输出](https://sjdwz-1309011246.file.myqcloud.com/%E6%96%87%E7%AB%A0/%E8%AF%A6%E8%A7%A3java%E6%8E%A5%E5%8F%A3interface/202203172052730.png)

原文链接为：[https://sjdwz.com/11171.html](https://sjdwz.com/11171.html)

posted on 2022-03-17 21:07  [随机的未知](https://www.cnblogs.com/nicaicai/)  阅读(0)  评论(0)  [编辑](https://i.cnblogs.com/EditPosts.aspx?postid=16019171)  [收藏](javascript:void(0))  [举报](javascript:void(0))