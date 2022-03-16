---
layout: post
title: "Kubernetes：服务与负载均衡"
date: "2022-03-16T10:21:21.709Z"
---
Kubernetes：服务与负载均衡
==================

Kubernetes Service从逻辑上代表了一组Pod(通常称为微服务)，具体是哪些Pod则是由label来挑选的(selector)。Service有自己的IP，而且这个IP是不变的。客户端只需要访问Service的IP，Kubernetes则负责建立和维护Service与Pod的映射关系。无论后端Pod如何变化，对客户端不会有任何影响，因为Service没有变。

> Blog：[博客园](https://www.cnblogs.com/Rohn/) [个人](https://k8sdev.com/)  
> 参考：[Service | Kubernetes](https://kubernetes.io/docs/concepts/services-networking/service/)、《Kubernetes进阶实战》

有了 Workload，我们可以方便地管理多实例的应用，但是要想能够方便地访问应用，我们还需要一个类似于 `负载均衡` 的资源来分发请求，在 kubernetes 中，有两个资源负责这个功能，分别是 **Service** 以及 **Ingress**。其中 Service 主要负责集群内部的访问，而 Ingress 主要负责来自集群外部的访问。

Kubernetes Service从逻辑上代表了一组Pod(通常称为微服务)，具体是哪些Pod则是由label来挑选的(selector)。Service有自己的IP，而且这个IP是不变的。客户端只需要访问Service的IP，Kubernetes则负责建立和维护Service与Pod的映射关系。无论后端Pod如何变化，对客户端不会有任何影响，因为Service没有变。

举个例子，考虑一个图片处理后端，它运行了 3 个副本。这些副本是可互换的 —— 前端不需要关心它们调用了哪个后端副本。 然而组成这一组后端程序的 Pod 实际上可能会发生变化， 前端客户端不应该也没必要知道，而且也不需要跟踪这一组后端的状态。

Service 定义的抽象能够解耦这种关联。

### Service类型

Service有4种类型：

*   **ClusterIP**：通过集群的内部 IP 暴露服务，选择该值时**服务只能够在集群内部访问**。 这也是默认的 `ServiceType`。
*   NodePort：通过每个节点上的 IP 和静态端口（`NodePort`）暴露服务。 `NodePort` 服务会路由到自动创建的 `ClusterIP` 服务。 通过请求 `<节点 IP>:<节点端口>`，你可以**从集群的外部访问**一个 `NodePort` 服务。
*   LoadBalancer：使用云提供商的负载均衡器向外部暴露服务。 外部负载均衡器可以将流量路由到自动创建的 `NodePort` 服务和 `ClusterIP` 服务上。
*   ExternalName：通过返回 `CNAME` 和对应值，可以将服务映射到 `externalName` 字段的内容（例如，`foo.bar.example.com`）。 无需创建任何类型代理。

总体来说，若需要将Service资源发布至集群外部，应该将其配置为NodePort或Load-Balancer类型，而若要把外部的服务发布于集群内部供Pod对象使用，则需要定义一个ExternalName类型的Service资源，只是这种类型的实现要依赖于v1.7及更高版本的Kubernetes。

> 💡Tips：Service的默认协议是 TCP。

### 代理模式(proxy mode)

代理模式分为3种：userspace、iptables和ipvs。

#### userspace代理模式

此处的userspace是指Linux操作系统的用户空间。在这种模型中，kube-proxy负责跟踪API Server上Service和Endpoints对象的变动（创建或移除），并据此调整Service资源的定义。

对于每个Service对象，它会随机打开一个本地端口（运行于用户空间的kube-proxy进程负责监听），任何到达此代理端口的连接请求都将被代理至当前Service资源后端的各Pod对象，至于哪个Pod对象会被选中则取决于当前Service资源的调度方式，**默认调度算法是轮询（round-robin）**。

另外，此类Service对象还会创建iptables规则以捕获任何到达ClusterIP和端口的流量。在Kubernetes 1.1版本之前，userspace是默认的代理模型。

![image-20220316142655672](https://rohn-web.oss-cn-hangzhou.aliyuncs.com/img/blog/image-20220316142655672.png?x-oss-process=style/cnblog)

#### iptables代理模式

创建Service对象的操作会触发集群中的每个kube-proxy并将其转换为定义在所属节点上的iptables规则，用于转发工作接口接收到的、与此Service资源ClusterIP和端口相关的流量。客户端发来请求将直接由相关的iptables规则进行目标地址转换（DNAT）后根据算法调度并转发至集群内的Pod对象之上，而**无须再经由kube-proxy进程进行处理**，因而称为iptables代理模式。

**使用 iptables 处理流量具有较低的系统开销，因为流量由 Linux netfilter 处理， 而无需在用户空间和内核空间之间切换。 这种方法也可能更可靠。但是性能一般，而且受规模影响较大，仅适用于少量Service规模的集群。**

对于每个Endpoints对象，Service资源会为其创建iptables规则并指向其iptables地址和端口，而流量转发到多个Endpoint对象之上的默认调度机制是随机算法。iptables代理模型由Kubernetes v1.1版本引入，并于v1.2版本成为默认的类型。

![image-20220316144248272](https://rohn-web.oss-cn-hangzhou.aliyuncs.com/img/blog/image-20220316144248272.png?x-oss-process=style/cnblog)

#### ipvs代理模式

Kubernetes自v1.9版本起引入ipvs代理模式，且自v1.11版本起成为默认设置。在此种模型中，kube-proxy跟踪API Server上Service和Endpoints对象的变动，并据此来调用netlink接口创建或变更ipvs（NAT）规则。

它与iptables规则的不同之处仅在于客户端请求流量的调度功能由ipvs实现，余下的其他功能仍由iptables完成。

![image-20220316144658093](https://rohn-web.oss-cn-hangzhou.aliyuncs.com/img/blog/image-20220316144658093.png?x-oss-process=style/cnblog)

ipvs代理模型中Service的服务发现和负载均衡功能均基于内核中的ipvs规则实现。类似于iptables，ipvs也构建于内核中的netfilter之上，但它使用hash表作为底层数据结构且工作于内核空间，因此具有流量转发速度快、规则同步性能好的特性，适用于存在大量Service资源且对性能要求较高的场景。

支持的调度算法：

*   `rr`：轮替（Round-Robin）
*   `lc`：最少链接（Least Connection），即打开链接数量最少者优先
*   `dh`：目标地址哈希（Destination Hashing）
*   `sh`：源地址哈希（Source Hashing）
*   `sed`：最短预期延迟（Shortest Expected Delay）
*   `nq`：从不排队（Never Queue）

### 示例

创建一个 Nginx Pod：

    apiVersion: apps/v1
    kind: Deployment
    metadata:
      name: my-nginx
    spec:
      selector:
        matchLabels:
          run: my-nginx
      replicas: 2
      template:
        metadata:
          labels:
            run: my-nginx
        spec:
          containers:
          - name: my-nginx
            image: nginx
            ports:
            - containerPort: 80
    

然后执行：

    kubectl apply -f ./run-nginx.yaml
    

查看运行：

    [root@master test]# kubectl get pods -l run=my-nginx -o wide
    NAME                        READY   STATUS    RESTARTS   AGE   IP              NODE     NOMINATED NODE   READINESS GATES
    my-nginx-5b56ccd65f-rnv9b   1/1     Running   0          34s   10.233.112.27   node-1   <none>           <none>
    my-nginx-5b56ccd65f-rx2mq   1/1     Running   0          34s   10.233.112.26   node-1   <none>           <none>
    

检查 Pod 的 IP 地址：

    [root@master test]# kubectl get pods -l run=my-nginx -o yaml | grep ' podIP:'
        podIP: 10.233.112.27
        podIP: 10.233.112.26
    

创建service：

    [root@master test]# kubectl expose deployment/my-nginx
    service/my-nginx exposed
    

这等价于使用 `kubectl create -f` 命令创建，对应如下的 yaml 文件：

    apiVersion: v1
    kind: Service
    metadata:
      name: my-nginx
      labels:
        run: my-nginx
    spec:
      ports:
      - port: 80
        protocol: TCP
      selector:
        run: my-nginx
    

查看 Service 资源:

    [root@master test]# kubectl get svc my-nginx
    NAME       TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)   AGE
    my-nginx   ClusterIP   10.233.22.145   <none>        80/TCP    79s
    

一个 Service 由一组 backend Pod 组成。这些 Pod 通过 `endpoints` 暴露出来。 Service Selector 将持续评估，结果被 POST 到一个名称为 `my-nginx` 的 Endpoint 对象上。 当 Pod 终止后，它会自动从 Endpoint 中移除，新的能够匹配上 Service Selector 的 Pod 将自动地被添加到 Endpoint 中。 检查该 Endpoint：

    [root@master test]# kubectl describe svc my-nginx
    Name:              my-nginx
    Namespace:         default
    Labels:            <none>
    Annotations:       <none>
    Selector:          run=my-nginx
    Type:              ClusterIP
    IP Family Policy:  SingleStack
    IP Families:       IPv4
    IP:                10.233.22.145
    IPs:               10.233.22.145
    Port:              <unset>  80/TCP
    TargetPort:        80/TCP
    Endpoints:         10.233.112.26:80,10.233.112.27:80
    Session Affinity:  None
    Events:            <none>
    

查看endporints：

    [root@master test]# kubectl get ep my-nginx
    NAME       ENDPOINTS                           AGE
    my-nginx   10.233.112.26:80,10.233.112.27:80   3m22s
    

任意节点测试：

    # master节点
    [root@master test]# curl 10.233.22.145
    <!DOCTYPE html>
    <html>
    <head>
    <title>Welcome to nginx!</title>
    <style>
    html { color-scheme: light dark; }
    body { width: 35em; margin: 0 auto;
    font-family: Tahoma, Verdana, Arial, sans-serif; }
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
    
    # worker节点
    [root@node-2 ~]# curl 10.233.22.145
    <!DOCTYPE html>
    <html>
    <head>
    <title>Welcome to nginx!</title>
    <style>
    html { color-scheme: light dark; }
    body { width: 35em; margin: 0 auto;
    font-family: Tahoma, Verdana, Arial, sans-serif; }
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