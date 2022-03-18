---
layout: post
title: "Java的jinfo命令使用详解"
date: "2022-03-18T13:31:29.491Z"
---
Java的jinfo命令使用详解
================

### jinfo命令简介

jinfo（Java Virtual Machine Configuration Information）是JDK提供的一个可以实时查看Java虚拟机各种配置参数和系统属性的命令行工具。使用jps命令的-v参数可以查看Java虚拟机启动时显式指定的配置参数，如果想查看没有显式指定的配置参数就可以使用jinfo命令进行查看。另外，jinfo命令还可以查询Java虚拟机进程的`System.getProperties()`的内容。

在没有`dbgeng.dll`的Windows系统中，必须安装用于Windows的调试工具才能使jinfo命令正常工作，PATH环境变量应该包含jvm.dll的位置。

### jinfo命令参数

命令语法：

    jinfo [option] pid
    

命令参数说明：

*   `option`：jinfo命令的可选参数。如果没有指定这个参数，jinfo命令会显示所有的配置参数和系统属性。
*   `pid`：要打印配置信息的Java虚拟机的进程ID。

想要要获取运行的Java虚拟机进程的列表，可以使用ps命令（Linux系统中）或tasklist命令（Windows系统中），如果Java虚拟机进程没有在单独的docker实例中运行，可以使用jps命令。

`option`都有哪些参数呢？我们来看一下。

### \-flag name

显示指定名称对应的配置参数，比如，查看了简单GC日志模式（PrintGC）是否开启：

    # jinfo -flag PrintGC 15729
    -XX:-PrintGC
    

### \-flag \[+|-\]name

启用或禁用指定名称的参数，该参数必须为`Boolean`类型。比如，开启简单GC日志模式：

    # jinfo -flag +PrintGC 15729
    # jinfo -flag PrintGC 15729
    -XX:+PrintGC
    

比如，禁用简单GC日志模式：

    # jinfo -flag -PrintGC 15729
    # jinfo -flag PrintGC 15729
    -XX:-PrintGC
    

### \-flag name=value

不需要重启Java虚拟机，修改指定名称的参数为指定的值。比如，修改空闲堆空间的最小百分比（MinHeapFreeRatio）为30%：

    # jinfo -flag MinHeapFreeRatio 15729
    -XX:MinHeapFreeRatio=40
    # jinfo -flag MinHeapFreeRatio=30 15729
    # jinfo -flag MinHeapFreeRatio 15729
    -XX:MinHeapFreeRatio=30
    

当然不是所有参数都可以这样修改的，比如并发垃圾收集器将使用的线程数（ConcGCThreads）：

    # jinfo -flag ConcGCThreads=5 15729
    Exception in thread "main" com.sun.tools.attach.AttachOperationFailedException: flag 'ConcGCThreads' cannot be changed
    
            at sun.tools.attach.LinuxVirtualMachine.execute(LinuxVirtualMachine.java:229)
            at sun.tools.attach.HotSpotVirtualMachine.executeCommand(HotSpotVirtualMachine.java:261)
            at sun.tools.attach.HotSpotVirtualMachine.setFlag(HotSpotVirtualMachine.java:234)
            at sun.tools.jinfo.JInfo.flag(JInfo.java:134)
            at sun.tools.jinfo.JInfo.main(JInfo.java:81)
    

那么，有哪些配置参数是支持动态修改的呢？我们可以通过`java -XX:+PrintFlagsInitial`命令找到标记为`manageable`的配置参数，运行结果如下图所示：

![万猫学社.png](https://img2022.cnblogs.com/other/145687/202203/145687-20220318112359772-1350605558.png)

### \-flags

显示全部的配置参数，比如：

    # jinfo -flags 15729
    Attaching to process ID 15729, please wait...
    Debugger attached successfully.
    Server compiler detected.
    JVM version is 25.251-b08
    Non-default VM flags: -XX:CICompilerCount=4 -XX:ConcGCThreads=2 -XX:G1HeapRegionSize=1048576 -XX:InitialHeapSize=1073741824 -XX:MarkStackSize=4194304 -XX:MaxHeapSize=1073741824 -XX:MaxNewSize=536870912 -XX:MetaspaceSize=268435456 -XX:MinHeapDeltaBytes=1048576 -XX:MinHeapFreeRatio=30 -XX:NewSize=536870912 -XX:-PrintGC -XX:SurvivorRatio=4 -XX:+UseCompressedClassPointers -XX:+UseCompressedOops -XX:+UseFastUnorderedTimeStamps -XX:+UseG1GC 
    Command line:  -Xmx1g -Xms1g -Xmn512m -XX:SurvivorRatio=4 -XX:MetaspaceSize=256m -XX:+UseG1GC
    

### \-sysprops

以键值对的方式显示当前Java虚拟机的全部的系统属性，比如：

    # jinfo -sysprops 15729
    Attaching to process ID 15729, please wait...
    Debugger attached successfully.
    Server compiler detected.
    JVM version is 25.251-b08
    java.runtime.name = Java(TM) SE Runtime Environment
    java.vm.version = 25.251-b08
    sun.boot.library.path = /usr/local/java/jdk1.8.0_251/jre/lib/amd64
    java.protocol.handler.pkgs = org.springframework.boot.loader
    java.vendor.url = http://java.oracle.com/
    java.vm.vendor = Oracle Corporation
    path.separator = :
    file.encoding.pkg = sun.io
    java.vm.name = Java HotSpot(TM) 64-Bit Server VM
    sun.os.patch.level = unknown
    sun.java.launcher = SUN_STANDARD
    user.country = CN
    java.vm.specification.name = Java Virtual Machine Specification
    PID = 15729
    java.runtime.version = 1.8.0_251-b08
    java.awt.graphicsenv = sun.awt.X11GraphicsEnvironment
    os.arch = amd64
    java.endorsed.dirs = /usr/local/java/jdk1.8.0_251/jre/lib/endorsed
    line.separator = 
    ......
    

### \-h 和 -help

显示jinfo命令的帮助信息。

### 结尾

虽然jinfo命令已经推出很久并且使用频率比较搞，但它仍然是一个“实验性质的，并且没有技术支持的”（Experimental and Unsupported）工具，日后可能会被转正，也有可能在某个JDK版本中无声无息地消失。所以，且用且珍惜吧。

> 最后，谢谢你这么帅，还给我**点赞**和**关注**。

微信公众号：万猫学社

微信扫描二维码

关注后回复「电子书」

获取12本Java必读技术书籍

![](https://images.cnblogs.com/cnblogs_com/heihaozi/1575453/o_onemore.jpg)

![](https://images.cnblogs.com/cnblogs_com/heihaozi/1575453/o_onemore.jpg)

作者：[万猫学社](http://www.cnblogs.com/heihaozi/)  
出处：[http://www.cnblogs.com/heihaozi/](http://www.cnblogs.com/heihaozi/)  
版权声明：本文遵循 [CC 4.0 BY-NC-SA](http://creativecommons.org/licenses/by-nc-sa/4.0/) 版权协议，转载请附上原文出处链接和本声明。  
微信扫描二维码，关注**万猫学社**，回复「**电子书**」，免费获取12本Java必读技术书籍。