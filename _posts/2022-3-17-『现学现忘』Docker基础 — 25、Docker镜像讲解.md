---
layout: post
title: "『现学现忘』Docker基础 — 25、Docker镜像讲解"
date: "2022-03-17T18:51:43.433Z"
---
『现学现忘』Docker基础 — 25、Docker镜像讲解
==============================

目录

*   [1、镜像是什么](#1镜像是什么)
*   [2、Docker镜像获取的方式](#2docker镜像获取的方式)
*   [3、Docker镜像加载原理](#3docker镜像加载原理)
    *   [（1）UnionFS（联合文件系统）](#1unionfs联合文件系统)
    *   [（2）Docker镜像加载原理](#2docker镜像加载原理)

1、镜像是什么
-------

镜像是一种轻量级、可执行的独立软件包，用来打包软件运行环境和基于运行环境开发的软件，它包含运行某个软件所需的所有内容，包括代码、运行时环境、库、环境变量和配置文件。

即：所有的应用，直接打包成Docker镜像，就可以直接跑起来！

2、Docker镜像获取的方式
---------------

1.  从仓库中拉取镜像（`docker pull`）。
2.  从本地文件中载入镜像（`docker load`）。
3.  由容器生成新的镜像（`docker commit`）。
4.  自己构建新的镜像（`docker build`）。

3、Docker镜像加载原理
--------------

### （1）UnionFS（联合文件系统）

*   `Union`文件系统（`UnionFS`）是一种分层、轻量级并且高性能的文件系统，它支持对文件系统的修改作为一次提交，来一层层的叠加。
*   同时可以将不同目录，挂载到同一个虚拟文件系统下（`unite several directories into a single virtual filesystem`）。
*   `Union`文件系统是Docker镜像的基础。
*   镜像可以通过分层来进行继承，基于基础镜像（没有父镜像概念），可以制作各种具体的应用镜像。

> 总结：一次同时加载多个文件系统，但从外面看起来，只能看到**一个文件系统**，联合加载会把各层文件系统叠加起来，这样最终的文件系统会包含所有底层的文件和目录。

我们下载镜像的时候，看到的一层层就是这个，如下：

    [root@192 /]# docker pull redis
    Using default tag: latest
    latest: Pulling from library/redis
    a076a628af6f: Already exists # 本地种已存在基础镜像
    f40dd07fe7be: Pull complete  # 一层一层下载
    ce21c8a3dbee: Pull complete  # 一层一层叠加
    ee99c35818f8: Pull complete 
    56b9a72e68ff: Pull complete 
    3f703e7f380f: Pull complete 
    Digest: sha256:0f97c1c9daf5b69b93390ccbe8d3e2971617ec4801fd0882c72bf7cad3a13494
    Status: Downloaded newer image for redis:latest
    docker.io/library/redis:latest
    

所以这种`UnionFS`（联合文件系统）来管理镜像是非常高效和节省空间的。

### （2）Docker镜像加载原理

Docker的镜像实际上由一层一层的文件系统组成，这种层级的文件系统`UnionFS`（联合文件系统）。

分为两个部分：

*   `bootfs`（`boot file system`）：主要包含`bootloader`和`kernel`（Linux内核），`bootloader`主要是引导加载`kernel`，Linux刚启动时会加载`bootfs`文件系统，而在Docker镜像的最底层也是`bootfs`这一层，这与我们典型的Linux/Unix系统是一样的，包含`boot`加载器和内核。当`boot`加载完成之后，整个内核就都在内存中了，此时内存的使用权已由`bootfs`转交给内核，此时系统也会卸载`bootfs`。  
    即：系统启动时需要的引导加载，这个过程会需要一定时间。就是黑屏到开机之间的这么一个过程。电脑、虚拟机、Docker容器启动都需要的过程。在说回镜像，所以这一部分，无论是什么镜像都是公用的。
*   `rootfs`（`root file system`）：`rootfs`在`bootfs`之上。包含的就是典型Linux系统中的`/dev`，`/proc`，`/bin`，`/etc`等标准目录和文件。`rootfs`就是各种不同的操作系统发行版，比如Ubuntu，CentOS等等。  
    即：镜像启动之后的一个小的底层系统，这就是我们之前所说的，容器就是一个小的虚拟机环境，比如Ubuntu，CentOS等，这个小的虚拟机环境就相当于`rootfs`。

**`bootfs`和`rootfs`关系如下图：**

![image](https://img2022.cnblogs.com/blog/909968/202203/909968-20220317152118797-354746312.png)

**平时我们安装进虚拟机的CentOS系统都是好几个G，为什么Docker这里才200M？**

如下：

    [root@192 /]# docker images
    REPOSITORY            TAG       IMAGE ID       CREATED        SIZE
    centos                latest    300e315adb2f   3 months ago   209MB
    

对于一个精简的OS系统，`rootfs`可以很小，只需要包含最基本的命令、工具和程序库就可以了，因为底层直接用`Host`（宿主机）的`kernel`（也就是宿主机或者服务器的`boosfs+`内核），自己只需要提供`rootfs`就可以了。

由此可见对于不同的Linux发行版，`bootfs`基本是一致的，`rootfs`会有差别，因此不同的发行版可以公用`bootfs`部分。

这就是我们之前说：**虚拟机的启动是分钟级的，容器的启动是秒级的**。