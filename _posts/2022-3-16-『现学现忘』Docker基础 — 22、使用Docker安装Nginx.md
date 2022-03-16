---
layout: post
title: "『现学现忘』Docker基础 — 22、使用Docker安装Nginx"
date: "2022-03-16T08:59:56.317Z"
---
『现学现忘』Docker基础 — 22、使用Docker安装Nginx
===================================

目录

*   [步骤1：搜索镜像](#步骤1搜索镜像)
*   [步骤2：下载Nginx镜像](#步骤2下载nginx镜像)
*   [步骤3：运行Nginx镜像](#步骤3运行nginx镜像)
*   [步骤4：进行本机测试](#步骤4进行本机测试)
*   [步骤5：进入容器内操作](#步骤5进入容器内操作)
*   [步骤6：测试外网访问容器](#步骤6测试外网访问容器)

步骤1：搜索镜像
--------

使用`docker search`命令进行搜索。

![image](https://img2022.cnblogs.com/blog/909968/202203/909968-20220316112623119-1660611279.png)

建议大家去Docker官方镜像仓库去搜索，地址[https://hub.docker.com/](https://hub.docker.com/)，可以看到详细的帮助文档，和镜像的仓库源所支持的版本。

步骤2：下载Nginx镜像
-------------

使用`docker pull`命令，从Docker镜像库中拉取镜像。

    [root@192 ~]# docker pull nginx
    Using default tag: latest
    latest: Pulling from library/nginx
    a076a628af6f: Already exists 
    0732ab25fa22: Already exists 
    d7f36f6fe38f: Already exists 
    f72584a26f32: Already exists 
    7125e4df9063: Already exists 
    Digest: sha256:10b8cc432d56da8b61b070f4c7d2543a9ed17c2b23010b43af434fd40e2ca4aa
    Status: Downloaded newer image for nginx:latest
    docker.io/library/nginx:latest
    
    [root@192 ~]# docker images
    REPOSITORY   TAG       IMAGE ID       CREATED        SIZE
    nginx        latest    f6d0b4767a6c   2 months ago   133MB
    centos       latest    300e315adb2f   3 months ago   209MB
    

步骤3：运行Nginx镜像
-------------

执行命令：`docker run -d --name nginx-01 -p 8888:80 nginx`，启动Nginx镜像。

`-d`：后台运行容器。  
`--name`：给容器命名。  
`-p 宿主机端口:容器内部端口`：配置Docker容器端口暴露，使外界能够访问Docker容器内部。通过宿主机的8888端口就可以访问容器的80端口的服务。

    [root@192 ~]# docker run -d --name nginx-01 -p 8888:80 nginx
    b82175d577fd4fc010f7ecf1ca544f3a8a52d8e0d83d3629eab24efb042ce12c
    

查看宿主机正在运行的容器。

![image](https://img2022.cnblogs.com/blog/909968/202203/909968-20220316112646950-1573586477.png)

**拓展：**

**Docker容器端口暴露是什么？**

端口暴露就是配置Docker容器的端口映射。

端口映射本质：Docker通过容器绑定主机系统的端口， 允许非本地客户端访问容器内部运行的服务。

我们先看下面一张图：

![image](https://img2022.cnblogs.com/blog/909968/202203/909968-20220316112702993-1247351609.png)

**说明：运行容器为什么要使用端口映射？**

默认情况下，容器使用的IP是`172.17.0.0/16`网段的，外界的用户只能访问宿主机的`192.168.134.129`网段，而无法访问`172.17.0.0/16`网段。

我们运行容器的目的：是希望运行在容器中的服务，能够被外界访问，这里就涉及到了外网`192.168.134.129`网段到容器内网`172.17.0.0/16`网段的转换，所以需要做端口映射。

**端口映射是 Docker 比较重要的一个功能，原因在于我们每次运行容器的时候容器的IP地址不能指定而是在桥接网卡的地址范围内随机生成的。**

**宿主机器的IP地址是固定的，我们可以将容器的端口的映射到宿主机器上的一个端口，免去每次访问容器中的某个服务时都要查看容器的IP的地址。**

**Docker运行容器端口映射的方法：**

    指定映射(Docker自动添加一条iptables规则实现端口映射)
        -p hostPort:containerPort（常用）
        -p ip:hostPort:containerPort 
        -p ip::containerPort(随机端口)
        -p hostPort:containerPort:udp
    
    同时可以指定多个映射端口：
        -p 81:80 -p 443:443 
    
    随机映射
        docker run -P （随机端口）
    

通过Docker容器端口映射之后，外网就能够访问容器内部的服务了。

> 提示：`-p 81:80`， 后边的端口是容器中服务的端口，容器中的服务比如是Nginx，默认的端口是`80`，所以：后边的位置是`80`，如果修改Nginx的默认端口为`8888`，则命令中要写成`-p 81:8888`。
> 
> 也就是容器中服务的端口号，要和冒号后边的端口号对应。

> 我们就先简单的说这么多，关于Docker容器网络方面，以后会详细说明。

步骤4：进行本机测试
----------

就是在宿主机本机上，直接访问容器内部。最后我们在测试外网访问宿主机内的容器的。（因为我是在虚拟机上开启的Docker，这个虚拟机就是本机，我的本地电脑就可以是外网主机。）

我们需要使用`curl`命令实现。

`curl`命令是Linux系统中常用的命令行工具，用来请求 Web 服务器。它的名字就是**客户端（client）的 URL 工具的意思。**

使用方式：`curl https://www.baidu.com`。

宿主机访问本机容器命令：`curl localhost:8888`

    [root@192 ~]# curl localhost:8888
    <!DOCTYPE html>
    <html>
    <head>
    <title>Welcome to nginx!</title>
    <style>
        body {
            width: 35em;
            margin: 0 auto;
            font-family: Tahoma, Verdana, Arial, sans-serif;
        }
    </style>
    </head>
    <body>
    <h1>Welcome to nginx!</h1>
    <p>If you see this page, the nginx web server is successfully installed and
    working. Further configuration is required.</p>
    
    <p>For online documentation and support please refer to
    <a href="http://nginx.org/">nginx.org</a>.<br/>
    Commercial support is available at
    <a href="http://nginx.com/">nginx.com</a>.</p>
    
    <p><em>Thank you for using nginx.</em></p>
    </body>
    </html>
    

可以看到返回的是一个HTML页面，页面中有`Welcome to nginx!`，说明Nginx正常启动。

步骤5：进入容器内操作
-----------

上面测试Nginx服务正常启动，我们就可以进入到Nginx中进行操作。

执行命令进入Nginx容器：`docker exec -it nginx-01 /bin/bash`

    [root@192 ~]# docker exec -it nginx-01 /bin/bash
    root@b82175d577fd:/# 
    

比如我们修改Nginx服务的欢迎界面。

    # 1.查看nginx相关文件的位置
    root@b82175d577fd:/# whereis nginx
    nginx: /usr/sbin/nginx /usr/lib/nginx /etc/nginx /usr/share/nginx
    
    # 2. 查看nginx服务欢迎界面的位置
    root@b82175d577fd:/# cat /usr/share/nginx/html/index.html 
    <!DOCTYPE html>
    <html>
    <head>
    <title>Welcome to nginx!</title>
    <style>
        body {
            width: 35em;
            margin: 0 auto;
            font-family: Tahoma, Verdana, Arial, sans-serif;
        }
    </style>
    </head>
    <body>
    <h1>Welcome to nginx!</h1>
    <p>If you see this page, the nginx web server is successfully installed and
    working. Further configuration is required.</p>
    
    <p>For online documentation and support please refer to
    <a href="http://nginx.org/">nginx.org</a>.<br/>
    Commercial support is available at
    <a href="http://nginx.com/">nginx.com</a>.</p>
    
    <p><em>Thank you for using nginx.</em></p>
    </body>
    </html>
    
    # 修改nginx服务欢迎界面
    root@b82175d577fd:/# vim /usr/share/nginx/html/index.html
    # 在Welcome to nginx!后加入hello docker
    # 修改nginx服务的欢迎界面不用重启服务。
    # 具体效果，下一步验证。
    

提示：Docker容器中没有vi编辑器的解决办法。

如果容器中没有vi编辑器，可以使用`apt-ge`t命令安装。

命令如下：`apt-get install vim`

可以出现的错误如下：

**（1）如果进入容器时没有指定`root`用户，则可能会报错。**

    E: Could not open lock file /var/lib/dpkg/lock - open (13: Permission denied)
    E: Unable to lock the administration directory (/var/lib/dpkg/), are you root?
    

解决方式：

1.  `exit`退出容器，指定`root`用户进入容器
2.  命令： `docker exec -it --user root b82175d577fd/bin/bash`

（我们自己练习时一般默认都是`root`用户登陆，如上练习中的`root@b82175d577fd:/#`）

**（2）如果之前没有执行`apt-get update`这个命令，可能会报错。**

    root@b82175d577fd:/# apt-get install vim
    Reading package lists... Done
    Building dependency tree       
    Reading state information... Done
    E: Unable to locate package vim
    

解决：

1.  先执行命令：`apt-get update`
2.  然后执行：`apt-get install vim`

（一般都是这种问题）

步骤6：测试外网访问容器
------------

先查看Linux虚拟机的IP地址。

    [root@192 ~]# ifconfig
    docker0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
            inet 172.17.0.1  netmask 255.255.0.0  broadcast 172.17.255.255
            inet6 fe80::42:77ff:feae:1e74  prefixlen 64  scopeid 0x20<link>
            ether 02:42:77:ae:1e:74  txqueuelen 0  (Ethernet)
            RX packets 6  bytes 1146 (1.1 KiB)
            RX errors 0  dropped 0  overruns 0  frame 0
            TX packets 13  bytes 1036 (1.0 KiB)
            TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0
    
    ens33: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
            inet 192.168.134.129  netmask 255.255.255.0  broadcast 192.168.134.255
            inet6 fe80::9211:a5e0:21ca:ae99  prefixlen 64  scopeid 0x20<link>
            ether 00:0c:29:43:c5:a0  txqueuelen 1000  (Ethernet)
            RX packets 1215  bytes 158212 (154.5 KiB)
            RX errors 0  dropped 0  overruns 0  frame 0
            TX packets 691  bytes 84321 (82.3 KiB)
            TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0
    ...# 省略
    

Linux虚拟机的IP地址为：`192.168.134.129`

在浏览器中访问`http://192.168.134.129:8888/`，我们同样可以访问Nginx容器，如下：

![image](https://img2022.cnblogs.com/blog/909968/202203/909968-20220316112731870-339653195.png)

同时也可以看到，我们第5步修改的内容已经成功了。

> 这篇文章就是一个小练习，拓展一下我们的思路。

> 思考问题：我们每次改动Nginx配置文件，都需要进入容器内部，十分的麻烦。是否可以在容器外部提供一个映射路径，使我们能够在容器外部修改文件，容器内部可以自动修改呢？
> 
> 可以，使用`-v`数据卷，之后会详细说明。