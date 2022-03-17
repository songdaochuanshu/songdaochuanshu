---
layout: post
title: "『现学现忘』Docker基础 — 24、Docker图形化管理工具Portainer"
date: "2022-03-17T07:17:34.412Z"
---
『现学现忘』Docker基础 — 24、Docker图形化管理工具Portainer
==========================================

目录

*   [1、Portainer介绍](#1portainer介绍)
*   [2、Portainer安装启动](#2portainer安装启动)
*   [3、Portainer初始化配置](#3portainer初始化配置)
*   [4、Portainer汉化](#4portainer汉化)

1、Portainer介绍
-------------

（1）**Portainer** 是一款轻量级的图形化管理工具，通过它我们可以轻松管理不同的 **Docker** 环境。**Portainer** 部署和使用都非常的简单，它由一个可以运行在任何 **Docker** 引擎上的容器组成。

（2）**Portainer** 功能十分全面，提供状态显示面板、应用模板快速部署、容器镜像网络数据卷的基本操作（包括上传下载镜像，创建容器等操作）、事件日志显示、容器控制台操作、**Swarm** 集群和服务等集中管理和操作、登录用户管理和控制等功能。基本能满足中小型单位对容器管理的全部需求。

简单来说，Portainer就是Docker的可视化工具，让我们可以用更直观的方式来管理和监控Docker里面的镜像和容器。

Portainer官网：[https://www.portainer.io/](https://www.portainer.io/)

Portainer官网提供的安装文档：

*   [https://www.portainer.io/installation/](https://www.portainer.io/installation/)
*   [https://portainer.readthedocs.io/en/stable/deployment.html](https://portainer.readthedocs.io/en/stable/deployment.html)

2、Portainer安装启动
---------------

如果仅有一个Docker宿主机，则可使用单机版运行就可以，来管理该机器上的Docker镜像、容器等数据。

直接执行如下命令使用独立容器启动 **Portainer**工具。

**步骤1：搜索Portainer镜像**

执行命令：`docker search Portainer`

![image](https://img2022.cnblogs.com/blog/909968/202203/909968-20220316171704787-981245380.png)

我们下载第一个镜像就可以。

**步骤2：下载Portainer镜像到本地**

执行命令：`docker pull portainer/portainer`

    [root@192 ~]# docker pull portainer/portainer 
    Using default tag: latest
    latest: Pulling from portainer/portainer
    d1e017099d17: Pull complete 
    717377b83d5c: Pull complete 
    Digest: sha256:f8c2b0a9ca640edf508a8a0830cf1963a1e0d2fd9936a64104b3f658e120b868
    Status: Downloaded newer image for portainer/portainer:latest
    docker.io/portainer/portainer:latest
    
    [root@192 ~]# docker images
    REPOSITORY            TAG       IMAGE ID       CREATED        SIZE
    tomcat                9.0       040bdb29ab37   2 months ago   649MB
    portainer/portainer   latest    62771b0b9b09   7 months ago   79.1MB
    

**步骤3：运行Portainer镜像**

执行命令：

    docker run -d -p 9000:9000 \
    --name portainer \
    --restart always \
    -v /var/run/docker.sock:/var/run/docker.sock \
    -v /tmp/portainer_data:/data \
    portainer/portainer
    

解释上面命令中的参数含义：

*   `-d` 以后台方式运行容器；
*   `-p 9000:9000` 将宿主机端口映射到容器端口；
*   `--name portainer` 设置容器名称，若不指定则随机生成；
*   `--restart always` 容器退出时总是重新启动，若需退出手动运行 `docker stop portainer`；
*   `-v /var/run/docker.sock:/var/run/docker.sock` 将宿主机`docker.sock(Docker API)`映射到容器；
*   `-v portainer_data:/data` 映射宿主机数据卷到容器 `/data` 目录；  
    使用`docker volume create --name portainer_data`命令，单独创建数据卷也行。  
    命令中还是使用`-v portainer_data:/data`。
*   `--privileged-true`：（选用）  
    使用该参数，`container内`的`root`拥有真正的`root`权限。  
    否则，`container`内的`root`只是外部的一个普通用户权限。
*   `portainer/portainer`：Portainer的镜像名称。

完成后浏览器访问 `http://服务器IP:9000/` 进行初始化配置。

> 注意**：**Portainer的数据存储在容器内部的 **/data** 目录，这样容器重启的时候数据会丢失，所以要确保数据持久化。

示例：

![image](https://img2022.cnblogs.com/blog/909968/202203/909968-20220316171720757-1356561437.png)

**步骤4：外网主机访问Portainer容器**

其实就是在本地电脑的浏览器访问虚拟机中Docker的Portainer容器。

即浏览器访问 `http://服务器IP:9000/` 进行初始化配置。

如下图：

![image](https://img2022.cnblogs.com/blog/909968/202203/909968-20220316171737948-1656315342.png)

3、Portainer初始化配置
----------------

输入密码进入Portainer。

![image](https://img2022.cnblogs.com/blog/909968/202203/909968-20220316171751958-1185173758.png)

简单说明一下界面的内容：

`Connect Portalner to the Docker environment you want to manage.`

将Portalner连接到您要管理的Docker环境。

*   `Local`：`Manage the local Docker environment`  
    管理本地Docker环境。
*   `Remote`：`Manage a remote Docker environment`  
    管理远程Docker环境（分布式）。
*   `Agent`：`Connect to a Portalner agent`  
    连接到Portalner代理。
*   `Azure`：`Connect to Microsoft Azure ACI`  
    连接到Microsoft Azure容器实例(ACI)。

`Manage the Docker environment where Portalner Is running.`

管理运行Portalner的Docker环境。

`Ensure that you have started the Portainer contalner with the following Docker flag:`

确保已使用以下Docker标志启动了Portainer contalner：

刚才在`run`这个镜像的时候添加了这些参数。选择`Local`，最后点击`Connect`进行连接。

如下图：

![image](https://img2022.cnblogs.com/blog/909968/202203/909968-20220316171826089-1884347813.png)

登录后我们可以查看服务上各个镜像、容器、网络、Volume等信息，并可以对它们进行管理。

关于具体的操作，我们自己点击试着用用就好了，也可以在网上查查，在实际的工作中用的不多，这里就不展开了。

> 说明：Portainer工具我们自己会简单的用用就可以了，在持续集成`CI/CD`的时候，我们一般使用Rancher工具

4、Portainer汉化
-------------

**（1）环境说明：**

*   系统：CentOS 7.8.2003。
*   Docker：20.10.5

**（2）上传汉化文件到服务器：**

将下载汉化包解压之后，并将解压后的`public`文件夹上传到`centos`系统的根目录下，如下图所示：

    # 将汉化包public拷贝到/目录中
    [root@192 /]# ll public/
    总用量 8
    drwxr-xr-x. 2 root root   30 3月  17 22:07 css
    drwxr-xr-x. 2 root root 4096 3月  17 22:07 fonts
    drwxr-xr-x. 2 root root  272 3月  17 22:07 ico
    drwxr-xr-x. 2 root root  165 3月  17 22:07 images
    -rw-r--r--. 1 root root 2810 3月  17 22:07 inde
    
    

> 提示：一定要放在根目录下，我放在其他地方不好使。

**（3）启动Portainer：**

就是在上面Portainer启动命令中加入如下选项：`-v /public:/public`

    [root@192 /]# docker run -d -p 9000:9000 \
    > --name portainer \
    > --restart always \
    > -v /var/run/docker.sock:/var/run/docker.sock \
    > -v /tmp/portainer_data:/data \
    > -v /public:/public \
    > portainer/portainer
    b991a3d4058f0abaea218c5b68f6e4987d69ce363c4942ee40e271dd5eb4ca50
    [root@192 /]# 
    
    

使用浏览器访问如下：

![image](https://img2022.cnblogs.com/blog/909968/202203/909968-20220316171912568-999824956.png)

![image](https://img2022.cnblogs.com/blog/909968/202203/909968-20220316171921255-955057640.png)

> 提示：如果已部署Portainer容器，需要将之前的容器删除，在重新启动。