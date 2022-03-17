---
layout: post
title: "Kubernetes：Ingress总结(一)"
date: "2022-03-17T13:24:58.918Z"
---
Kubernetes：Ingress总结(一)
=======================

Kubernetes的Ingress简单理解就是个规则定义，例如某个域名对应某个Service，即当某个域名的请求进来时，转发给某个Service。Ingress Controller负责实现这个规则，即Ingress Controller将其动态写入负载均衡器的配置中，从而实现服务的负载均衡。

> Blog：[博客园](https://www.cnblogs.com/Rohn/) [个人](https://k8sdev.com/)  
> 参考：[Ingress | Kubernetes](https://kubernetes.io/zh/docs/concepts/services-networking/ingress/)、《Kubernetes进阶实战》、《Kubernetes网络权威指南 》

何谓Ingress？从字面意思解读，就是**入站流量**。Kubernetes的Ingress资源对象是指**授权入站连接到达集群内服务的规则集合**。

我们知道，Kubernetes上的NodePort和LoadBalancer类型的Service资源能够把集群内部服务暴露给集群外部客户端访问，但两个负载均衡跃点(路由)必然产生更大的网络延迟，且无疑会大大增加组织在使用云服务方面的费用开销。

因此，Kubernetes为这种需求提供了一种更为高级的流量管理约束方式，尤其是对HTTP/HTTPS协议的约束。Kubernetes使用Ingress控制器作为统一的流量入口，管理内部各种必要的服务，并通过Ingress这一API资源来描述如何区分流量以及内部的路由逻辑。有了Ingress和Ingress控制器，我们就可通过定义路由流量的规则来完成服务发布，而无须创建一堆NodePort或LoadBalancer类型的Service，而且流量也会由Ingress控制器直接到达Pod对象。

Kubernetes Ingress提供了负载平衡器的典型特性：HTTP路由、黏性会话、SSL终止、SSL直通、TCP和UDP负载平衡等。目前，并不是所有的Ingress Controller都实现了这些功能，需要查看具体的Ingress Controller文档。Ingress控制器有各种类型，包括GoogleCloud Load Balancer、Nginx、Istio等。有些Ingress Controller可能还依赖各种插件，例如cert-manager，它可以为服务自动提供SSL证书。

> 💡Tips：人们通常把Kubernetes集群内部的通信称为东西向流量，而把集群内外部的通信称为南北向流量。

下面是一个将所有流量都发送到同一 Service 的简单 Ingress 示例：

![image-20220317141340808](https://rohn-web.oss-cn-hangzhou.aliyuncs.com/img/blog/image-20220317141340808.png?x-oss-process=style/cnblog)

通常情况下，Service和Pod仅可在集群内部网络中通过IP地址访问。所有到达边界路由的流量或被丢弃或被转发到其他地方。

Ingress的作用就是在边界路由处开个口子，放外部流量进来。因此，Ingress是建立在Service之上的L7访问入口，它支持通过URL的方式将Service暴露到k8s集群外；支持自定义Service的访问策略；提供按域名访问的虚拟主机功能；支持TLS通信。

### Ingress规则

每个 HTTP 规则都包含以下信息：

*   可选的 `host`。在此示例中，未指定 `host`，因此该规则适用于通过指定 IP 地址的所有入站 HTTP 通信。 如果提供了 `host`（例如 foo.bar.com），则 `rules` 适用于该 `host`。
*   路径列表 paths（例如，`/testpath`）,每个路径都有一个由 `serviceName` 和 `servicePort` 定义的关联后端。 在负载均衡器将流量定向到引用的服务之前，主机和路径都必须匹配传入请求的内容。
*   `backend`（后端）是 [Kubernetes：服务与负载均衡](https://www.cnblogs.com/Rohn/p/16012857.html)中所述的服务和端口名称的组合。 与规则的 `host` 和 `path` 匹配的对 Ingress 的 HTTP（和 HTTPS ）请求将发送到列出的 `backend`。

通常在 Ingress 控制器中会配置 `defaultBackend`（默认后端），以服务于任何不符合规约中 `path` 的请求。

> 💡注意：没有 `rules` 的 Ingress 将所有流量发送到同一个默认后端。如果 `hosts` 或 `paths` 都没有与 Ingress 对象中的 HTTP 请求匹配，则流量将路由到默认后端。

### 路径类型

Ingress 中的每个路径都需要有对应的路径类型（Path Type）。未明确设置 `pathType` 的路径无法通过合法性检查。当前支持的路径类型有三种：

*   `ImplementationSpecific`：对于这种路径类型，匹配方法取决于 IngressClass。 具体实现可以将其作为单独的 `pathType` 处理或者与 `Prefix` 或 `Exact` 类型作相同处理。
*   `Exact`：精确匹配 URL 路径，且区分大小写。
*   `Prefix`：基于以 `/` 分隔的 URL 路径前缀匹配。匹配区分大小写，并且对路径中的元素逐个完成。 路径元素指的是由 `/` 分隔符分隔的路径中的标签列表。 如果每个 _p_ 都是请求路径 _p_ 的元素前缀，则请求与路径 _p_ 匹配。

> 💡注意：如果路径的最后一个元素是请求路径中最后一个元素的子字符串，则不会匹配 （例如：`/foo/bar` 匹配 `/foo/bar/baz`, 但不匹配 `/foo/barbaz`）。

例如：

类型

路径

请求路径

匹配与否？

Prefix

`/`

（所有路径）

是

Exact

`/foo`

`/foo`

是

Exact

`/foo`

`/bar`

否

Exact

`/foo`

`/foo/`

否

Exact

`/foo/`

`/foo`

否

Prefix

`/foo`

`/foo`, `/foo/`

是

Prefix

`/foo/`

`/foo`, `/foo/`

是

Prefix

`/aaa/bb`

`/aaa/bbb`

否

Prefix

`/aaa/bbb`

`/aaa/bbb`

是

Prefix

`/aaa/bbb/`

`/aaa/bbb`

是，忽略尾部斜线

Prefix

`/aaa/bbb`

`/aaa/bbb/`

是，匹配尾部斜线

Prefix

`/aaa/bbb`

`/aaa/bbb/ccc`

是，匹配子路径

Prefix

`/aaa/bbb`

`/aaa/bbbxyz`

否，字符串前缀不匹配

Prefix

`/`, `/aaa`

`/aaa/ccc`

是，匹配 `/aaa` 前缀

Prefix

`/`, `/aaa`, `/aaa/bbb`

`/aaa/bbb`

是，匹配 `/aaa/bbb` 前缀

Prefix

`/`, `/aaa`, `/aaa/bbb`

`/ccc`

是，匹配 `/` 前缀

Prefix

`/aaa`

`/ccc`

否，使用默认后端

混合

`/foo` (Prefix), `/foo` (Exact)

`/foo`

是，优选 Exact 类型

在某些情况下，Ingress 中的多条路径会匹配同一个请求。 这种情况下最长的匹配路径优先。 如果仍然有两条同等的匹配路径，则精确路径类型优先于前缀路径类型。

### 主机名通配符

主机名可以是精确匹配（例如“`foo.bar.com`”）或者使用通配符来匹配 （例如“`*.foo.com`”）。 精确匹配要求 HTTP `host` 头部字段与 `host` 字段值完全匹配。 通配符匹配则要求 HTTP `host` 头部字段与通配符规则中的后缀部分相同。

主机

host 头部

匹配与否？

`*.foo.com`

`bar.foo.com`

基于相同的后缀匹配

`*.foo.com`

`baz.bar.foo.com`

不匹配，通配符仅覆盖了一个 DNS 标签

`*.foo.com`

`foo.com`

不匹配，通配符仅覆盖了一个 DNS 标签

### Ingress类型

#### 单个Service实现

现有的 Kubernetes 概念允许你暴露单个 Service，例如：

    apiVersion: networking.k8s.io/v1
    kind: Ingress
    metadata:
      name: test-ingress
    spec:
      defaultBackend:
        service:
          name: test
          port:
            number: 80
    

执行：

    [root@master test]# kubectl apply -f ./test-ingress.yaml 
    ingress.networking.k8s.io/test-ingress created
    

#### 简单扇出(Simple fanout)

一个扇出（fanout）配置根据请求的 HTTP URI 将来自同一 IP 地址的流量路由到多个 Service。 Ingress 允许你将负载均衡器的数量降至最低。例如，这样的设置：

![image-20220317143027055](https://rohn-web.oss-cn-hangzhou.aliyuncs.com/img/blog/image-20220317143027055.png?x-oss-process=style/cnblog)

配置如下：

    apiVersion: networking.k8s.io/v1
    kind: Ingress
    metadata:
      name: simple-fanout-example
    spec:
      rules:
      - host: foo.bar.com
        http:
          paths:
          - path: /foo
            pathType: Prefix
            backend:
              service:
                name: service1
                port:
                  number: 4200
          - path: /bar
            pathType: Prefix
            backend:
              service:
                name: service2
                port:
                  number: 8080
    

#### 基于名称的虚拟托管(Name based virtual hosting)

基于名称的虚拟主机支持将针对多个主机名的 HTTP 流量路由到同一 IP 地址上。

![image-20220317145747418](https://rohn-web.oss-cn-hangzhou.aliyuncs.com/img/blog/image-20220317145747418.png?x-oss-process=style/cnblog)

### 总结

Kubernetes的Ingress简单理解就是个规则定义，例如某个域名对应某个Service，即当某个域名的请求进来时，转发给某个Service。Ingress Controller负责实现这个规则，即Ingress Controller将其动态写入负载均衡器的配置中，从而实现服务的负载均衡。