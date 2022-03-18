---
layout: post
title: "云原生入门 第五章：kubernetes学习实践"
date: "2022-03-18T04:32:01.864Z"
---
云原生入门 第五章：kubernetes学习实践
========================

* * *

1\. 简介
------

在本章中，我们将学习不同的Kubernetes对象，它们的用途以及如何与它们交互。  
在设置集群或使用现有集群之后，我们可以开始部署一些工作负载。Kubernetes中最小的计算单元不是一个容器，而是一个Pod对象。也就是说，Pod不是我们用于工作负载的唯一抽象。Kubernetes有各种各样的工作负载对象来控制如何部署、扩展和管理pod。  
部署工作负载并不是开发人员或管理员必须执行的唯一任务。Kubernetes为容器和编配的一些固有问题提供了解决方案，比如配置管理、跨节点网络、外部流量路由、负载平衡或pod的扩展。

2\. 学习目标
--------

在本章结束时，你应该能够:

*   解释什么是Kubernetes对象以及如何描述它。
*   讨论Pod的概念及其解决的问题。
*   了解如何使用工作负载资源来扩展和安排pod。
*   了解如何用服务抽象Pods，以及如何公开它们。

3\. Kubernetes对象
----------------

Kubernetes的核心概念之一是提供大量抽象资源(也称为对象)，您可以使用这些资源来描述应该如何处理工作负载。其中一些用于处理容器编排的问题，如调度和自愈，另一些用于解决容器的一些固有问题。  
Kubernetes对象可以区分为面向工作负载的对象(用于处理容器工作负载)和面向基础设施的对象(例如处理配置、网络和安全)。其中一些对象可以放在一个名称空间中，而其他对象可以跨整个集群使用。  
作为用户，我们可以用流行的数据序列化语言YAML描述这些对象，并将它们发送到api服务器，在创建它们之前要对它们进行验证。

    apiVersion: apps/v1
    kind: Deployment
    metadata:
      name: nginx-deployment
    spec: 
      selector:
        matchLabels:
          app: nginx
      replicas: 2 # tells deployment to run 2 pods matching the template
      template:
        metadata:
          labels:
            app: nginx
        spec:
          containers:
          - name: nginx
            image: nginx:1.19
            ports:
            - containerPort: 80
    

红色突出显示的字段是必填字段。它们包括:

*   `apiVersion`：每个对象都可以进行版本控制。这意味着对象的数据结构可以在不同的版本之间变化。
*   `kind`：应该创建的对象类型。  
    `metadata`：可以用来识别它的数据。每个对象都需要一个名称，并且必须是唯一的。如果需要多个具有相同名称的对象，可以使用名称空间。
*   `spec`：对象的说明。在这里你可以描述你想要的状态。要小心，因为对象的结构可能会随着它的版本而改变!

创建，修改或删除一个对象只是一个意图记录，在那里你描述你的对象应该处于的状态，你不像你在本地机器上做的那样主动启动pods或甚至容器，并获得直接反馈，如果它工作与否。

4\. 与Kubernetes交互
-----------------

要访问API，用户可以使用名为kubectl的官方命令行接口客户端。让我们看看Kubernetes日常使用的一些基本命令。  
注意:您可以在官方文档中了解如何安装kubectl。  
你可以用下面的命令列出集群中可用的对象:

    $ kubectl api-resources
    
    NAME                    SHORTNAMES  APIVERSION  NAMESPACED  KIND
    ...
    configmaps              cm          v1          true        ConfigMap
    ...
    namespaces              ns          v1          false       Namespace
    nodes                   no          v1          false       Node
    persistentvolumeclaims  pvc         v1          true        PersistentVolumeClaim
    ...
    pods                    po          v1          true        Pod
    ...
    services                svc         v1          true        Service
    

注意对象是如何使用短名称的。这对于名称较长的对象(如`configmaps`或`persistentvolumeclaims`)非常有用。该表还显示了哪些对象具有名称空间以及它们的可用版本。  
如果你想了解更多关于对象的信息，kubectl有一个内置的`explain`函数!  
让我们进一步了解pod:

    $ kubectl explain pod
    
    KIND:     Pod
    VERSION:  v1
    
    DESCRIPTION:
         Pod is a collection of containers that can run on a host. This resource is     
         created by clients and scheduled onto hosts. 
    
    FIELDS: 
       apiVersion <string>     
         APIVersion defines the versioned schema of this representation of an
         object. Servers should convert recognized schemas to the latest internal         
         value, and may reject unrecognized values.
    ...
       kind <string>
    ...
       metadata <Object>
    ...
       spec <Object>
    

要了解更多关于pod规范的信息，您可以深入了解对象定义。使用如下格式:`<type>.<fieldName>[.<fieldName>]`。

    $ kubectl explain pod.spec
    
    KIND:     Pod
    VERSION:  v1 
    
    RESOURCE: spec <Object>  
    
    DESCRIPTION:
         Specification of the desired behavior of the pod. More info:
    
    https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#spec-and-status      
    
         PodSpec is a description of a pod. 
    
    FIELDS:
       activeDeadlineSeconds <integer>     
         Optional duration in seconds the pod may be active on the node relative to       
         StartTime before the system will actively try to mark it failed and kill         
         associated containers. Value must be a positive integer. 
    
       affinity <object>     
         If specified, the pod's scheduling constraints 
    
       automountServiceAccountToken <boolean>     
         AutomountServiceAccountToken indicates whether a service account token           
         should be automatically mounted. 
    
       containers <[]Object> -required-
    ...
    

让我们看看基本的kubectl命令。你可以使用——help标志来查看它们:

    $ kubectl --help
    
    kubectl controls the Kubernetes cluster manager. 
    
     Find more information at: https://kubernetes.io/docs/reference/kubectl/overview/ 
    
    Basic Commands (Beginner):
      create Create a resource from a file or from stdin
      expose Take a replication controller, service, deployment or pod and expose it as a new Kubernetes service
      run Run a particular image on the cluster
      set Set specific features on objects 
    
    Basic Commands (Intermediate):
      explain Get documentation for a resource
      get Display one or many resources
      edit Edit a resource on the server
      delete Delete resources by file names, stdin, resources and names, or by resources and label selector
    

要在Kubernetes中从YAML文件创建一个对象，你可以使用以下命令:

    kubectl create -f <your-file>.yaml
    

Kubernetes有许多图形用户界面和仪表板，它们允许与集群进行可视化交互。

![在这里插入图片描述](https://img-blog.csdnimg.cn/80b0aef0e6b54f2a87dabfbf219b8e24.png)  
Kubernetes官方仪表盘的截图  
与Kubernetes交互的其他工具:

*   [kubernetes/dashboard](https://github.com/kubernetes/dashboard)
*   [derailed/k9s](https://github.com/derailed/k9s)
*   [Lens](https://k8slens.dev/)
*   [VMware Tanzu Octant](https://github.com/vmware-tanzu/octant)

尽管有许多CLI工具和gui，但还有一些高级工具允许创建模板和打包Kubernetes对象。也许今天Kubernetes最常用的工具是Helm。  
[Helm](https://helm.sh/)是一个Kubernetes的包管理器，它允许更简单的更新和与对象的交互。Helm将Kubernetes对象封装在所谓的Charts中，可以通过注册表与他人共享。要开始使用Kubernetes，您可以搜索[ArtifactHub](https://artifacthub.io/)，找到您最喜欢的软件包，准备部署。

### 4.1 Demo: kubectl

*   [kubectl 命令](https://blog.csdn.net/xixihahalelehehe/article/details/107714611?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522164734401216780261970494%2522%252C%2522scm%2522%253A%252220140713.130102334.pc%255Fblog.%2522%257D&request_id=164734401216780261970494&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~blog~first_rank_ecpm_v1~rank_v31_ecpm-2-107714611.nonecase&utm_term=kubectl&spm=1018.2226.3001.4450)

5\. Pod 概念
----------

Kubernetes中最重要的对象是Pod。pod描述一个或多个容器的单元，这些容器共享一个名称空间和cgroups隔离层。它是Kubernetes中最小的可部署单元，这也意味着Kubernetes不会直接与容器交互。pod概念的引入是为了允许运行相互依赖的多个进程的组合。pod中的所有容器共享一个IP地址，并且可以通过文件系统共享。

![在这里插入图片描述](https://img-blog.csdnimg.cn/2066df4484e14e76a9c650f8d328e576.png)  
多个容器共享名称空间形成一个pod  
下面是一个带有两个容器的简单Pod对象的例子:

    apiVersion: v1
    kind: Pod
    metadata:
      name: nginx-with-sidecar
    spec:
      containers:
      - name: nginx
        image: nginx:1.19
        ports:
        - containerPort: 80
      - name: count
        image: busybox:1.34
        args: [/bin/sh, -c,
                'i=0; while true; do echo "$i: $(date)"; i=$((i+1)); sleep 1; done']
    

您可以向主应用程序添加任意数量的容器。但是要小心，因为您失去了单独缩放它们的能力!使用支持主应用程序的第二个容器称为**sidecar容器**。  
所有定义的容器都是在同一时间启动的，没有顺序，但是您也可以使用[initContainers](https://kubernetes.io/zh/docs/concepts/workloads/pods/init-containers/)在主应用程序启动之前启动容器。在这个例子中，init容器`init-myservice`试图到达另一个服务。一旦完成，主容器就会启动。

    apiVersion: v1
    kind: Pod
    metadata:
      name: myapp-pod
      labels:
        app: myapp
    spec:
      containers:
      - name: myapp-container
        image: busybox
        command: ['sh', '-c', 'echo The app is running! && sleep 3600']
      initContainers:
      - name: init-myservice
        image: busybox
        command: ['sh', '-c', 'until nslookup myservice; do echo waiting for myservice; sleep 2; done;']
    

请务必浏览有关pod的文档，因为还有更多设置有待发现。对于Pod中的每个容器，可以设置的一些重要设置示例如下:

*   [resources](https://ghostwritten.blog.csdn.net/article/details/112524133): 设置一个资源请求和CPU和内存的最大限制
*   [livenessProbe](https://blog.csdn.net/xixihahalelehehe/article/details/108561740?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522164734455316780366546099%2522%252C%2522scm%2522%253A%252220140713.130102334.pc%255Fblog.%2522%257D&request_id=164734455316780366546099&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~blog~first_rank_ecpm_v1~rank_v31_ecpm-1-108561740.nonecase&utm_term=%20livenessProbe&spm=1018.2226.3001.4450): 配置定期检查应用程序是否仍处于活动状态的运行状况检查。如果检查失败，可以重新启动容器。
*   [securityContext](https://blog.csdn.net/xixihahalelehehe/article/details/108539153?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522164734458716780271923305%2522%252C%2522scm%2522%253A%252220140713.130102334.pc%255Fblog.%2522%257D&request_id=164734458716780271923305&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~blog~first_rank_ecpm_v1~rank_v31_ecpm-2-108539153.nonecase&utm_term=securityContext&spm=1018.2226.3001.4450): 设置用户和组设置，以及内核功能。

### 5.1 Demo: Pods

    docker run -d nginx:1.19
    kubectl run nginx  --image=nginx:1.19
    kubectl get pods
    kubectl describe pod nginx
    #获取IP
    curl http://IP
    

6\. 负载均衡
--------

在容器编排平台中，仅仅使用Pods是不够灵活的。例如，如果一个Pod因为一个节点失败而丢失，那么它就永远消失了。为了确保始终运行已定义数量的Pod副本，我们可以使用控制器对象来为我们管理Pod。

*   `ReplicaSet`  
    确保在任何给定时间运行所需数量的pod的控制器对象。replicaset可以用于向外扩展应用程序并提高其可用性。它们通过启动一个pod定义的多个副本来实现这一点。
*   `Deployment`  
    Kubernetes中功能最丰富的对象。部署可以用来描述完整的应用程序生命周期，它们通过管理多个`replicaset`来实现这一点，当应用程序被更改时，这些replicaset会被更新，例如，提供一个新的容器映像。部署非常适合在Kubernetes中运行无状态应用程序。
*   `StatefulSet`  
    StatefulSets可以用于在Kubernetes上运行像数据库这样的有状态应用程序，这在很长一段时间内都被认为是一个不好的实践。有状态应用程序有特殊的需求，这些需求不适合pod和容器的短暂性。与部署不同，StatefulSets尝试保留pod的IP地址，并给它们一个稳定的名称、持久的存储和更优雅的伸缩和更新处理。
*   `DaemonSet`  
    确保Pod的副本在集群的所有(或部分)节点上运行。守护进程集非常适合运行与基础设施相关的工作负载，例如监视或日志工具。
*   `Job`  
    创建一个或多个执行任务的Pods，然后终止该任务。作业对象非常适合运行数据库迁移或管理任务等一次性脚本。
*   `CronJob`  
    CronJobs为作业添加基于时间的配置。这允许定期运行Jobs，例如每天晚上4点执行备份作业。

交互式教程-部署一个应用程序并探索它  
在Kubernetes文档提供的交互式教程的第2部分中，您可以了解如何在Minikube集群中[部署应用程序](https://kubernetes.io/docs/tutorials/kubernetes-basics/deploy-app/deploy-intro/)。  
应用您从“与Kubernetes交互”中学到的知识，在交互式教程的第三部分[探索您的应用程序](https://kubernetes.io/docs/tutorials/kubernetes-basics/explore/explore-intro/)。

### 6.2 demo: pod、replicats、deployments

    apiVersion: v1
    kind: Pod
    metadata:
      name: simple-nginx-pod
      labels:
        role: myrole
    spec:
      containers:
        - name: web
          image: nginx
          ports:
            - name: web
              containerPort: 80
              protocol: TCP
    

    kubectl apply -f simple-nginx-pod.yaml
    

replicas部署

    apiVersion: apps/v1
    kind: ReplicaSet
    metadata:
      name: nginx
    spec:
      replicas: 3
      selector:
        matchLabels:
          apps: nginx
      template:
        metadata:
          labels: 
            apps: nginx
        spec: 
          containers:
          - name: web
            image: nginx
            ports:
            - containerPort: 80
    

    $ kubectl apply -f replicas.yaml
    $ k get pods
    NAME                                     READY   STATUS    RESTARTS   AGE
    nginx-5psrm                              1/1     Running   0          2m12s
    nginx-68x8p                              1/1     Running   0          2m12s
    nginx-q9zlq                              1/1     Running   0          2m12s
    
    
    $ kubectl scale --replicas=4 rs/nginx
    

deployment部署

    apiVersion: apps/v1
    kind: Deployment
    metadata:
      name: nginx-deployment
      labels:
        app: nginx
    spec:
      replicas: 3
      selector:
        matchLabels:
          app: nginx
      template:
        metadata:
          labels:
            app: nginx
        spec:
          containers:
          - name: nginx
            image: nginx:1.14.2
            ports:
            - containerPort: 80
    

    $ k apply -f deployment.yaml
    $ k get pods
    NAME                                     READY   STATUS    RESTARTS   AGE
    nginx-deployment-66b6c48dd5-55jrb        1/1     Running   0          2m35s
    nginx-deployment-66b6c48dd5-6x9cj        1/1     Running   0          2m35s
    nginx-deployment-66b6c48dd5-pj7qr        1/1     Running   0          2m35s
    
    
    $ k scale --replicas=4 deployment/nginx-deployment
    
    $ k get pods
    NAME                                     READY   STATUS    RESTARTS   AGE
    nginx-deployment-66b6c48dd5-55jrb        1/1     Running   0          4m15s
    nginx-deployment-66b6c48dd5-6x9cj        1/1     Running   0          4m15s
    nginx-deployment-66b6c48dd5-cxv8g        1/1     Running   0          3s
    nginx-deployment-66b6c48dd5-pj7qr        1/1     Running   0          4m15s
    
    $ k set image deployment/nginx-deployment nginx=nginx:1.20
    

7\. 网络
------

由于大量的Pods需要大量的手工网络配置，我们可以使用`Service`和`Ingress`对象来定义和抽象网络

*   `ClusterIP`  
    最常见的服务类型。`ClusterIP`是`Kubernetes`内部的一个虚拟IP，可以作为一组pods的单个端点使用。这种服务类型可以用作轮询负载均衡器。

![在这里插入图片描述](https://img-blog.csdnimg.cn/de1b650ea01e4cb2b126356c8c4cdc38.png#pic_center)

*   `NodePort`  
    NodePort服务类型通过添加简单的路由规则扩展了`ClusterIP`。它在集群中的每个节点上打开一个端口(默认在30000-32767之间)，并将其映射到ClusterIP。这种服务类型允许将外部流量路由到集群。
*   `loadbalance`  
    LoadBalancer服务类型通过部署外部LoadBalancer实例来扩展NodePort。只有当你在一个有API来配置LoadBalancer实例的环境中，比如GCP、AWS、Azure甚至OpenStack，这才会起作用。
*   `ExternalName`  
    一种没有任何路由的特殊服务类型。`ExternalName`使用Kubernetes内部DNS服务器创建DNS别名。您可以使用它创建一个简单的别名来解析一个相当复杂的主机名，比如:`my-cool-database-az1-uid123.cloud-provider-i-like.com`。如果您想从`Kubernetes`集群获取外部资源，这一点尤其有用。

![在这里插入图片描述](https://img-blog.csdnimg.cn/ebfc07d9f3ae488eb6e7b1f561578b43.png#pic_center)

ClusterIP、NodePort和LoadBalancer相互扩展

如果需要更大的灵活性来公开应用程序，可以使用`Ingress`对象。入口提供了一种从集群外部为集群内的服务公开HTTP和HTTPS路由的方法。它通过配置路由规则来实现这一点，用户可以通过入口控制器设置和实现路由规则。

![在这里插入图片描述](https://img-blog.csdnimg.cn/b4033da09fec4767ba8d62e530e67cda.png#pic_center)

一个Ingress将所有流量发送到一个Service的例子，从[Kubernetes文档中获取](https://kubernetes.io/docs/concepts/services-networking/ingress/)

入口控制器的标准特性可能包括:

*   LoadBalancing
*   TLS offloading/termination
*   Name-based virtual hosting
*   Path-based routing

许多入口控制器甚至提供了更多的功能，比如:

*   Redirects
*   Custom errors
*   Authentication
*   Session affinity
*   Monitoring
*   Logging
*   Weighted routing
*   Rate limiting.

`Kubernetes`还提供了一个具有`NetworkPolicy`概念的集群内部防火墙。`NetworkPolicies`是一个简单的IP防火墙(OSI三层或四层)，可以基于规则控制流量。您可以为传入(进入)和传出(出口)流量定义规则。NetworkPolicies的一个典型用例是限制两个不同名称空间之间的流量。

交互式教程-展示你的应用程序  
现在，您可以在Kubernetes文档提供的交互式教程的第4部分中了解[如何使用Service公开应用程序](https://kubernetes.io/docs/tutorials/kubernetes-basics/expose/expose-intro/)。

### 7.1 demo

    apiVersion: apps/v1
    kind: Deployment
    metadata:
      name: nginx-deployment
      labels:
        app: nginx
    spec:
      replicas: 3
      selector:
        matchLabels:
          app: nginx
      template:
        metadata:
          labels:
            app: nginx
        spec:
          containers:
          - name: nginx
            image: nginx:1.14.2
            ports:
            - containerPort: 80
    

    $ k apply -f nginx-deployment.yaml
    $ k expose deployment nginx-deployment 80
    $ k get svc
    NAME                    TYPE           CLUSTER-IP       EXTERNAL-IP   PORT(S)                      AGE
    kubernetes              ClusterIP      10.96.0.1        <none>        443/TCP                      51d
    nginx-deployment        ClusterIP      10.101.106.248   <none>        80/TCP                       8s
    $ curl 10.101.106.248:80
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
    
    

8\. Volume & Storage
--------------------

如前所述，在设计容器时并没有考虑到持久存储，特别是当存储跨越多个节点时。Kubernetes介绍了一些解决方案，但请注意，这些解决方案并没有自动消除使用容器管理存储的所有复杂性。  
集装箱已经有了安装卷的概念，但由于我们没有直接使用集装箱，Kubernetes将卷作为Pod的一部分，就像集装箱一样。  
下面是一个`hostPath`卷挂载的例子，类似于Docker引入的主机挂载:

    apiVersion: v1
    kind: Pod
    metadata:
      name: test-pd
    spec:
      containers:
      - image: k8s.gcr.io/test-webserver
        name: test-container
        volumeMounts:
        - mountPath: /test-pd
          name: test-volume
      volumes:
      - name: test-volume
        hostPath:
          # directory location on host
          path: /data
          # this field is optional
          type: Directory
    

![在这里插入图片描述](https://img-blog.csdnimg.cn/63c0ca09884d4d37854f1c14046900ab.png#pic_center)  
卷允许在同一个Pod中的多个容器之间共享数据。当您想要使用侧车模式时，这个概念允许极大的灵活性。它们的第二个用途是在Pod崩溃并在同一节点上重新启动时防止数据丢失。pod以干净的状态启动，但所有数据会丢失，除非写入卷。  
不幸的是，包含多个服务器的集群环境在持久性存储方面需要更多的灵活性。根据环境的不同，我们可以使用像[Amazon EBS](https://aws.amazon.com/ebs/)、[谷歌Persistent Disks](https://cloud.google.com/persistent-disk)、[Azure Disk storage](https://azure.microsoft.com/en-us/services/storage/disks/)这样的云块存储，也可以使用像[Ceph](https://ceph.io/en/)、[GlusterFS](https://www.gluster.org/)这样的存储系统或更传统的系统，比如NFS。  
这些只是Kubernetes中可以使用的存储的几个例子。为了让用户体验更加统一，Kubernetes使用了容器存储接口CSI (Container Storage Interface)，它允许存储供应商编写一个可以在Kubernetes中使用的插件(存储驱动程序)。

为了使用这个抽象，我们还有两个可以使用的对象:

*   PersistentVolumes (PV)  
    存储片的抽象描述。对象配置包含卷的类型、卷大小、访问模式和唯一标识符以及如何挂载它的信息。
*   PersistentVolumeClaims (PVC)  
    用户对存储的请求。如果集群有多个持久化卷，用户可以创建一个PVC，根据用户的需要预留一个持久化卷。

    apiVersion: v1
    kind: PersistentVolume
    metadata:
      name: test-pv
    spec:
      capacity:
        storage: 50Gi
      volumeMode: Filesystem
      accessModes:
        - ReadWriteOnce
      csi:
        driver: ebs.csi.aws.com
        volumeHandle: vol-05786ec9ec9526b67
    ---
    apiVersion: v1
    kind: PersistentVolumeClaim
    metadata:
      name: ebs-claim
    spec:
      accessModes:
        - ReadWriteOnce
      resources:
        requests:
          storage: 50Gi
    ---
    apiVersion: v1
    kind: Pod
    metadata:
      name: app
    spec:
      containers:
        - name: app
          image: centos
          command: ["/bin/sh"]
          args:
            ["-c", "while true; do echo $(date -u) >> /data/out.txt; sleep 5; done"]
          volumeMounts:
            - name: persistent-storage
              mountPath: /data
      volumes:
        - name: persistent-storage
          persistentVolumeClaim:
            claimName: ebs-claim
    

这个例子展示了一个`PersistentVolume`，它使用了一个使用CSI驱动程序实现的AWS EBS卷。在配置了PersistentVolume之后，开发人员可以使用PersistentVolumeClaim来预留它。最后一步是在Pod中使用PVC作为卷，就像我们之前看到的hostPath示例一样。  
可以直接在Kubernetes中操作存储集群。像[Rook](https://rook.io/)这样的项目提供云本地存储业务编排，并与经过实战测试的存储解决方案(如Ceph)集成。  
![在这里插入图片描述](https://img-blog.csdnimg.cn/485246bfc6ff4e809733f5384afc2eb5.png#pic_center)

Rook架构，[从Rook文档中检索](https://rook.io/docs/rook/v1.7/ceph-storage.html)

9\. 配置对象
--------

[12因素应用程序建议将配置存储在环境](https://12factor.net/config)中。但这到底是什么意思呢?运行应用程序需要的不仅仅是应用程序代码和一些库。应用程序有配置文件，连接到其他服务、数据库、存储系统或缓存，这需要像连接字符串这样的配置。  
将配置直接合并到容器构建中被认为是不好的做法。任何配置更改都需要重新构建整个映像，并重新部署整个容器或吊舱。当使用多个环境(开发、登台、生产)并为每个环境构建映像时，这个问题只会变得更糟。12因素应用程序更详细地解释了这个问题:[Dev/prod奇偶性](https://12factor.net/dev-prod-parity)。  
在Kubernetes中，这个问题是通过使用ConfigMap将配置从Pods中解耦来解决的。ConfigMaps可用于将整个配置文件或变量存储为键-值对。有两种可能的方式使用ConfigMap:

*   将ConfigMap挂载为Pod中的卷
*   将ConfigMap中的变量映射到Pod中的环境变量。

下面是一个包含nginx配置的ConfigMap示例:

    apiVersion: v1
    kind: ConfigMap
    metadata:
      name: nginx-conf
    data:
      nginx.conf: |
        user nginx;
        worker_processes 3;
        error_log /var/log/nginx/error.log;
    ...
          server {
              listen     80;
              server_name _;
              location / {
                  root   html;
                  index  index.html index.htm; } } }
    

一旦ConfigMap被创建，你就可以在Pod中使用它:

    apiVersion: v1
    kind: Pod
    metadata:
      name: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:1.19
        ports:
        - containerPort: 80
        volumeMounts:
        - mountPath: /etc/nginx
          name: nginx-conf
      volumes:
      - name: nginx-conf
        configMap:
          name: nginx-conf
    

从一开始，Kubernetes也提供了一个对象来存储敏感信息，如密码、密钥或其他凭证。这些对象被称为[Secrets](https://kubernetes.io/zh/docs/concepts/configuration/secret/#using-secrets)。秘密与ConfigMaps非常相关，基本上它们唯一的区别是秘密是base64编码的。  
关于使用“秘密”的风险，人们一直在争论不休，因为“秘密”(与名称相反)并不被认为是安全的。在原生云环境中，已经出现了专门创建的秘密管理工具，它们可以很好地与Kubernetes集成。[HashiCorp Vault](https://www.vaultproject.io/)就是一个例子。

10\. Autoscaling
----------------

自动伸缩机制

*   [Horizontal Pod Autoscaler (HPA)](https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/)  
    Horizontal Pod Autoscaler (HPA)是Kubernetes中最常用的自动定标器。HPA可以监视deployments或ReplicaSets，并在达到某个阈值时增加副本的数量。成像Pod可以使用500MiB的内存，并且您配置了80%的阈值。如果利用率超过400MiB(80%)，将调度第二个Pod。现在您的容量为1000MiB。如果使用了800MiB，将调度第三个Pod，以此类推。
*   [Cluster Autoscaler](https://github.com/kubernetes/autoscaler/tree/master/cluster-autoscaler)  
    当然，如果集群容量是固定的，那么启动越来越多的pod副本是没有意义的。如果需求增加，Cluster Autoscaler可以向集群添加新的工作节点。集群自动伸缩器与水平自动伸缩器协同工作。
*   [Vertical Pod Autoscaler](https://github.com/kubernetes/autoscaler/tree/master/vertical-pod-autoscaler)  
    Vertical Pod Autoscaler 相对较新，允许吊舱动态增加资源请求和限制。如前所述，垂直扩展受到节点容量的限制。

不幸的是，Kubernetes的(水平)自动伸缩是无法开箱即用的，需要安装一个名为[metrics-server](https://github.com/kubernetes-sigs/metrics-server)的附加组件。

但是，用Kubernetes Metrics api的[Prometheus Adapter](https://github.com/kubernetes-sigs/prometheus-adapter)替换度量服务器是可能的。prometheus-adapter允许您在Kubernetes中使用自定义指标，并根据系统上的请求或用户数量等因素进行放大或缩小。  
像[KEDA](https://keda.sh/)这样的项目可以根据外部系统触发的事件来扩展Kubernetes工作负载，而不是仅仅依赖于指标。KEDA是基于kubernetes的事件驱动自动scaler的缩写，于2019年作为微软和红帽公司的合作伙伴启动。与HPA类似，KEDA可以扩展部署、复制集、pod等，还可以扩展Kubernetes作业等其他对象。通过大量现成的扩展器的选择，KEDA可以扩展到特殊的触发器，比如数据库查询，甚至Kubernetes集群中pod的数量。

交互式教程-缩放您的应用程序  
在交互式教程的第五部分:运行应用程序的多个实例中，你可以学习[如何手动扩展应用程序](https://kubernetes.io/docs/tutorials/kubernetes-basics/scale/scale-intro/)。

11\. Additional Resources
-------------------------

Learn more about...

Differences between Containers and Pods

*   [What are Kubernetes Pods Anyway?](https://www.ianlewis.org/en/what-are-kubernetes-pods-anyway), by Ian Lewis (2017)
*   [Containers vs. Pods](https://iximiuz.com/en/posts/containers-vs-pods/) - Taking a Deeper Look, by Ivan Velichko (2021)

kubectl tips & tricks

*   [kubectl Cheat Sheet](https://kubernetes.io/docs/reference/kubectl/cheatsheet/)

Storage and CSI in Kubernetes

*   [Container Storage Interface (CSI) for Kubernetes GA](https://kubernetes.io/blog/2019/01/15/container-storage-interface-ga/), by Saad Ali  
    (2019)
*   [Kubernetes Storage: Ephemeral Inline Volumes, Volume Cloning,Snapshots and more!](https://www.inovex.de/de/blog/kubernetes-storage-volume-cloning-ephemeral-inline-volumes-snapshots/), by Henning Eggers (2020)

Autoscaling in Kubernetes

*   [Architecting Kubernetes clusters - choosing the best autoscaling strategy](https://learnk8s.io/kubernetes-autoscaling-strategies), by Daniele Polencic (2021)

* * *

关注公众号：爱死亡机器人