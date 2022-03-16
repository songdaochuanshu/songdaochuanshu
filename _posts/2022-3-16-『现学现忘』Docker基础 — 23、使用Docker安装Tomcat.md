---
layout: post
title: "『现学现忘』Docker基础 — 23、使用Docker安装Tomcat"
date: "2022-03-16T10:21:21.452Z"
---
『现学现忘』Docker基础 — 23、使用Docker安装Tomcat
====================================

目录

*   [步骤1：搜索镜像](#步骤1搜索镜像)
*   [步骤2：下载Tomcat镜像](#步骤2下载tomcat镜像)
*   [步骤3：运行Tomcat镜像](#步骤3运行tomcat镜像)
*   [步骤4：本机和外网测试](#步骤4本机和外网测试)
*   [步骤5：解决问题](#步骤5解决问题)
*   [补充：`--rm`选项](#补充--rm选项)

步骤1：搜索镜像
--------

使用`docker search`命令进行搜索。

![image](https://img2022.cnblogs.com/blog/909968/202203/909968-20220316170813234-2118196707.png)

建议大家去Docker官方镜像仓库去搜索，地址[https://hub.docker.com/](https://hub.docker.com/)，可以看到详细的帮助文档，和镜像的仓库源所支持的版本。

![image](https://img2022.cnblogs.com/blog/909968/202203/909968-20220316170831913-10046651.png)

步骤2：下载Tomcat镜像
--------------

使用`docker pull`命令，从Docker镜像库中拉取镜像。

    [root@192 ~]# docker pull tomcat:9.0
    9.0: Pulling from library/tomcat
    b9a857cbf04d: Pull complete 
    d557ee20540b: Pull complete 
    3b9ca4f00c2e: Pull complete 
    667fd949ed93: Pull complete 
    661d3b55f657: Pull complete 
    511ef4338a0b: Pull complete 
    a56db448fefe: Pull complete 
    00612a99c7dc: Pull complete 
    326f9601c512: Pull complete 
    c547db74f1e1: Pull complete 
    Digest: sha256:94cc18203335e400dbafcd0633f33c53663b1c1012a13bcad58cced9cd9d1305
    Status: Downloaded newer image for tomcat:9.0
    docker.io/library/tomcat:9.0
    
    [root@192 ~]# docker images
    REPOSITORY   TAG       IMAGE ID       CREATED        SIZE
    tomcat       9.0       040bdb29ab37   2 months ago   649MB
    nginx        latest    f6d0b4767a6c   2 months ago   133MB
    centos       latest    300e315adb2f   3 months ago   209MB
    

步骤3：运行Tomcat镜像
--------------

执行命令：`docker run -d --name tomcat-01 -p 9999:8080 040bdb29ab37`，启动Tomcat镜像。

*   `-d`：后台运行容器。
*   `--name`：给容器命名。
*   `-p 宿主机端口:容器内部端口`：配置Docker容器端口暴露，使外界能够访问Docker容器内部。通过宿主机的`9999`端口就可以访问容器的`8080`端口的服务。

（原理看上一篇文章即可）

    # 启动Tomcat镜像
    [root@192 ~]# docker run -d --name tomcat-01 -p 9999:8080 040bdb29ab37
    4de54013836c23a53f7b3943403b0543bfc4c390e81bb76f08810289d85813b3
    

查看宿主机正在运行的容器。

![image](https://img2022.cnblogs.com/blog/909968/202203/909968-20220316170852314-1411422303.png)

步骤4：本机和外网测试
-----------

进行本地访问Tomcat容器服务，如下：

    [root@192 ~]# curl localhost:9999
    <!DOCTYPE html>
    <html lang="en">
     <head>
      <title>HTTP Status 404 – Not Found</title>
      <style type="text/css">body {font-family:Tahoma,Arial,sans-serif;} h1, h2, h3, b {color:white;background-color:#525D76;} h1 {font-size:22px;} h2 {font-size:16px;} h3 {font-size:14px;} p {font-size:12px;} a {color:black;} .line {height:1px;background-color:#525D76;border:none;}</style>
     </head>
     <body>
      <h1>HTTP Status 404 – Not Found</h1>
      <hr class="line" />
      <p><b>Type</b> Status Report</p>
      <p><b>Description</b> The origin server did not find a current representation for the target resource or is not willing to disclose that one exists.</p>
      <hr class="line" />
      <h3>Apache Tomcat/9.0.41</h3>
     </body>
    </html>
    

进行外网测试访问Tomcat容器服务，如下：

![image](https://img2022.cnblogs.com/blog/909968/202203/909968-20220316170910774-867686841.png)

我们发现本机访问和外网访问Docker容器的Tomcat服务，都是无法访问到Tomcat服务的欢迎界面。

原因：阿里云镜像，默认是最小的镜像，把所有不必要的都剔除掉。所以在Tomcat文件中的`webapps`目录中没有文件，也就无法返回欢迎界面了。并不是我们的Tomcat容器无法接收请求。

因为阿里云镜像只保证最小可运行的环境，所以会出现：

1.  Linux命令缺少。
2.  Tomcat文件被精简。

下面开始解决。

步骤5：解决问题
--------

**（1）进入到正在运行的Tomcat容器中。**

    [root@192 ~]# docker exec -it tomcat-01 /bin/bash
    root@4de54013836c:/usr/local/tomcat# 
    

**（2）查看Tomcat中的webapps目录。**

    # 查看Tomcat中的目录
    root@4de54013836c:/usr/local/tomcat# ls -l
    total 128
    -rw-r--r--. 1 root root 18982 Dec  3 11:48 BUILDING.txt
    -rw-r--r--. 1 root root  5409 Dec  3 11:48 CONTRIBUTING.md
    -rw-r--r--. 1 root root 57092 Dec  3 11:48 LICENSE
    -rw-r--r--. 1 root root  2333 Dec  3 11:48 NOTICE
    -rw-r--r--. 1 root root  3257 Dec  3 11:48 README.md
    -rw-r--r--. 1 root root  6898 Dec  3 11:48 RELEASE-NOTES
    -rw-r--r--. 1 root root 16507 Dec  3 11:48 RUNNING.txt
    drwxr-xr-x. 2 root root  4096 Jan 13 08:25 bin
    drwxr-xr-x. 1 root root    22 Mar 17 09:22 conf
    drwxr-xr-x. 2 root root  4096 Jan 13 08:25 lib
    drwxrwxrwx. 1 root root   177 Mar 17 09:22 logs
    drwxr-xr-x. 2 root root   134 Jan 13 08:25 native-jni-lib
    drwxrwxrwx. 2 root root    30 Jan 13 08:25 temp
    drwxr-xr-x. 2 root root     6 Jan 13 08:25 webapps
    drwxr-xr-x. 7 root root    81 Dec  3 11:45 webapps.dist
    drwxrwxrwx. 2 root root     6 Dec  3 11:43 work
    
    # 查看webapps目录中的内容
    root@4de54013836c:/usr/local/tomcat# ls -l webapps
    total 0
    

我们可以看到`webapps`目录中没有任何文件。

**（3）解决问题。**

但是从上面我们可以看到在Tomcat中有一个`webapps.dist`目录，而`webapps.dist`目录中的内容就是我们需要的内容，包括欢迎界面等数据文件。

我们只需要把`webapps.dist`目录中的内容，全部拷贝到`webapps`目录中即可。

    # 查看webapps.dist中的内容
    root@4de54013836c:/usr/local/tomcat# ls -l webapps.dist/
    total 4
    drwxr-xr-x.  3 root root  223 Jan 13 08:25 ROOT
    drwxr-xr-x. 15 root root 4096 Jan 13 08:25 docs
    drwxr-xr-x.  7 root root   99 Jan 13 08:25 examples
    drwxr-xr-x.  6 root root   79 Jan 13 08:25 host-manager
    drwxr-xr-x.  6 root root  114 Jan 13 08:25 manager
    
    # 把webapps.dist目录中的内容，全部拷贝到webapps目录中
    root@4de54013836c:/usr/local/tomcat# cp -r webapps.dist/* webapps
    
    # 查看webapps目录中内容
    root@4de54013836c:/usr/local/tomcat# ls -l webapps
    total 4
    drwxr-xr-x.  3 root root  223 Mar 17 09:56 ROOT
    drwxr-xr-x. 15 root root 4096 Mar 17 09:56 docs
    drwxr-xr-x.  7 root root   99 Mar 17 09:56 examples
    drwxr-xr-x.  6 root root   79 Mar 17 09:56 host-manager
    drwxr-xr-x.  6 root root  114 Mar 17 09:56 manager
    

这样我们就可以访问到欢迎界面了，不需要重启Tomcat服务。

**（4）直接外网访问Docker容器中的Tomcat服务。**

![image](https://img2022.cnblogs.com/blog/909968/202203/909968-20220316170938296-486389615.png)

如上图，我们成功看到了Tomcat服务的欢迎界面。

补充：`--rm`选项
-----------

在看Tomcat镜像的介绍时（官方镜像仓库网页），有如下一条命令。

    $ docker run -it --rm tomcat:9.0
    

说明该命令：

*   如果本地没有Tomcat9镜像，会先从镜像库中下载镜像到本地宿主机，然后直接启动容器。
*   当容器停止之后，直接删除本地容器（下载到本地的Tomcat9镜像不会删除）。

`--rm`选项也就是容器停止后，直接在本地删除该容器，即容器用完即删，一般测试的时候可以用用。