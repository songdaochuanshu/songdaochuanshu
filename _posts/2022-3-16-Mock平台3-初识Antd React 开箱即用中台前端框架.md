---
layout: post
title: "Mock平台3-初识Antd React 开箱即用中台前端框架"
date: "2022-03-16T19:14:07.298Z"
---
Mock平台3-初识Antd React 开箱即用中台前端框架
===============================

> 微信搜索【大奇测试开】，关注这个坚持分享测试开发干货的家伙。

![](https://img2022.cnblogs.com/blog/2434628/202203/2434628-20220316215755006-1041886024.png)
---------------------------------------------------------------------------------------------

内容提要
====

首先说下为啥这次测试开发系列教程前端选择Antd React，其实也是纠结对比过最终决定挑战一把，想法大概有几下几点：

*   笔者自己走出`vue`舒适区，拓展全栈的能力，也为平台开发测试同学提供多一种选择；
*   对比后发现它有官方的持续维护和更完善生态，比如助手插件、区块、模板组件、图表、设计资源等；
*   在外企和远程的需求中 React 占很重的比例，或许为后续的测试转型提供一种可能技能。

当然本身Mock这个项目之前是用element ui admin完成的前端开发，在系列的最后如果需要的人多，我也可以整理作为一个分支分享出来，供有只想用vue的同学做学习参考。

**准备和说明**

编译环境： 开发电脑上已安装NodeJs，配置好 npm、node, tyarn 命令

开发工具：推荐 WebStorm

前端语言：**React** （是一个用于构建用户界面的 JavaScript 库 ）

**掌握内容**

*   了解Antd相关框架知识和官方一些建议
*   源代码运行演示，以及如何初始新项目
*   了解代码结构，对比React和Vue的不同

新手须知
====

`Ant Design Pro` 是蚂蚁开源的开箱即用的中台前端/设计解决方案，内部UI组件库是`antd`（基于 Ant Design 设计体系的 React UI 组件库）它提供完整的脚手架，涉及 [国际化](https://umijs.org/zh-CN/plugins/plugin-locale)，[权限](https://umijs.org/zh-CN/plugins/plugin-access)，mock，[数据流](https://umijs.org/zh-CN/plugins/plugin-model)，[网络请求](https://umijs.org/zh-CN/plugins/plugin-request)等各个方面。为中后台中常见的方案提供了最佳实践来减少学习和开发成本。同时为了提供更加高效的开发体验，提供了一系列模板组件，[ProLayout](https://procomponents.ant.design/components/layout)，[ProTable](https://procomponents.ant.design/components/table)，[ProList](https://procomponents.ant.design/components/list) 都是开发中后台的好帮手，可以显著的减少样板代码。可以通过下面的大图来了解整个 Ant Design Pro 的架构。

![](https://gw.alipayobjects.com/zos/antfincdn/AhUzrugUr%26/yuque_diagram.jpg)

更多的详细内容参考下官方文档，这里不粘贴复述，建议了解下。

> 新手需知：[https://pro.ant.design/zh-CN/docs/introduction/](https://pro.ant.design/zh-CN/docs/introduction/)
> 
> 官方网站：[https://pro.ant.design/zh-CN](https://pro.ant.design/zh-CN)

虽然 _知其然知其所以然_ 更好，但不会也没任何关系，对系列开发学习不会有太大影响，因为后续的文章后我会一步步带了解。

源码运行体验
======

首先看下源码（完整版）的运行的效果，顺便验证自己的开发环境是否OK。

**步骤（保姆级）如下：**

1\. 官方跳转github项目，复制https克隆地址

![](https://img2022.cnblogs.com/blog/2434628/202203/2434628-20220316215850820-1647549111.png)

2.通过Git下载然后IDE导入，或者WebStorm 通过Get from VCS直接创建

3.切到代码分支（重要）到**all-blocks**，因为默认master 是简版，没有包含全部演示页面

![](https://img2022.cnblogs.com/blog/2434628/202203/2434628-20220316215918438-332673648.png)

4.开启 Terminal进入项目 或WebStorm底部terminal直接打开

5.运行依赖安装和运行命令，正常会出现App running at 提示

npm isntall # 安装依赖
# npm isntall --force   # 依赖安装出错时尝试
# npm audit fix --force # 安装还不行时候尝试
npm start   # 开发模式编译运行

6\. 通过 [http://localhost:8000](http://localhost:8000) 访问，内部的更多页面可自行体验，下载源码及体验这个完整版的目的是后续如果有需要类似的页面，可以做很好的参考甚至直拷贝接使用。

![](https://img2022.cnblogs.com/blog/2434628/202203/2434628-20220316220058584-2068041996.gif)

官方在线预览地址 https://preview.pro.ant.design

模板项目
====

创建脚手架
-----

由于依赖初始化受外部网络的不稳定影像，官方建议的是使用`yarn`管理包

> 关于yarn也是一种JS包的管理工具，相比npm它有安装速度快、版本统一等优点，想了解更多参考[https://yarn.bootcss.com/docs](https://yarn.bootcss.com/docs)

1\. 创建模板项目，打开终端切断换到对应目录，通过命令执行脚手架

\# 使用 yarn
yarn create umi daqitemplete

2\. 按照终端提示提示，选择 ant-design-pro模板 -> 选择JavaScript语言 -> 选择simple基础模板

> antd 的模板中 simple 是基础模板，只提供了框架运行的基本内容，complete 包含 antd 的集成方案，不太适合当基础模板来进行二次开发，和上边源代码运行一样，比较适合参考开发。

3\. 安装依赖和运行脚手架项目

官方操作视频：[https://gw.alipayobjects.com/os/antfincdn/0wSaPUs36y/My%252520Sequence\_1.mp4](https://gw.alipayobjects.com/os/antfincdn/0wSaPUs36y/My%252520Sequence_1.mp4)

cd daqitemplete && tyarn
# 或
cd daqitemplete && npm install

# 开发模式运行
npm run start

除了命令行也同样可以导入WebStorm中配置运行，然后浏览器通过访问 [http://localhost:8000](http://localhost:8000) 预览，可以从下边的截图中看到只包含了最简单的三个页面简单后台

![](https://img2022.cnblogs.com/blog/2434628/202203/2434628-20220316220336266-47621523.png)

**Tips**：Antd有个很好用的工具插件可以方便添加区块和模版，可以通过命令打开后重新运行项目查看一下，具体的使用将在开发实战篇用应用。

\# 打开开发模式下页面右下角的小气泡，方便添加区块和模版等pro资产
tyarn add @umijs/preset-ui -D
# 或
npm install --save-dev @umijs/preset-ui

项目结构
----

脚手架会生成一套完整的开发框架，提供了涵盖后台开发的各类功能和坑位，官方给出的目录结构说明如下，有些在我们的Mock项目中用不到的，后续我逐步删掉，大家到时候注意下项目源代码即可。

├── config                   # umi 配置，包含路由，构建等配置
├── mock                     # 本地模拟数据
├── public
│   └── favicon.png          # Favicon
├── src
│   ├── assets               # 本地静态资源
│   ├── components           # 业务通用组件
│   ├── e2e                  # 集成测试用例
│   ├── layouts              # 通用布局
│   ├── models               # 全局 dva model
│   ├── pages                # 业务页面入口和常用模板
│   ├── services             # 后台接口服务
│   ├── utils                # 工具库
│   ├── locales              # 国际化资源
│   ├── global.less          # 全局样式
│   └── global.ts            # 全局 JS
├── tests                    # 测试工具
├── README.md
└── package.json

代码结构推荐
------

对于页面的开发，官方还给了一个推荐规范，目的让开发能够更方便的定位到相关页面组件代码，该规范只作为指导。

src
├── components
└── pages
    ├── Welcome        // 路由组件下不应该再包含其他路由组件，基于这个约定就能清楚的区分路由组件和非路由组件了
    |   ├── components // 对于复杂的页面可以再自己做更深层次的组织，但建议不要超过三层
    |   ├── Form.tsx
    |   ├── index.tsx  // 页面组件的代码
    |   └── index.less // 页面样式
    ├── Order          // 路由组件下不应该再包含其他路由组件，基于这个约定就能清楚的区分路由组件和非路由组件了
    |   ├── index.tsx
    |   └── index.less
    ├── user           // 一系列页面推荐通过小写的单一字母做 group 目录
    |   ├── components // group 下公用的组件集合
    |   ├── Login      // group 下的页面 Login
    |   ├── Register   // group 下的页面 Register
    |   └── util.ts    // 这里可以有一些共用方法之类，不做推荐和约束，看业务场景自行做组织
    └── \*              // 其它页面组件代码

React对比Vue

同vue一样`**React**`也一个JavaScript库，还有一个angular是目前比较流行的三大前端编程库，在我的浅显理解都是为了更好更快的做前端的开发，这里不会对其各种不同、优缺点做展开说，想知晓的网上一大堆自行搜索，还是那句话测试平台项目中只是掌握其如何应用。因此下边我也只给出两种库demo项目的页面编写对比，先了解下编码不同之处就行。

![](https://img2022.cnblogs.com/blog/2434628/202203/2434628-20220316220505973-2038007500.png)

从叠在一起的两个模版项目来看，首先是文件格式不同，然后最大的却别是语法格式上，vue页面是模块的化的，之前的提测平台系列讲过，分了 `<template>`、 `<script>`、 `<css>` 三部分，而react采用的是 JSX语法 ，从对比图上看script和html相关写在了一起。

JSX 是一个 JavaScript 的语法扩展，将HTML和JavaScript二者共同存放在称之为“组件”的松散耦合单元之中，来实现[关注点分离](https://en.wikipedia.org/wiki/Separation_of_concerns)，简化来说当遇到<，JSX就当HTML解析，遇到{就当JavaScript解析。React不强制要求使用 JSX。

具体JSX语法怎么写，Ant Design组件怎么应用，笔者也是在边学边整理中，期待一下自我的挑战吧，到此本篇前端基础就分享这么多，后边将陆续开始项目开发实战内容分享，欢迎长期关注一起交流成长！

_最后强调一下，本篇前端基础内容中给出很多链接，也涉及很多知识点，这些如果你有时间也感兴趣就大致快速学下，有助于你后边的理解和学习，但不必纠掌握没、是否需要全部深入学习等问题，因为学习的目的不同，过分看重只会让你怀疑人生以及打击积极性。_

**扩展学习推荐**

*   Web开发者指南 [https://developer.mozilla.org/zh-CN/docs/Web/Guide](https://developer.mozilla.org/zh-CN/docs/Web/Guide)
*   react官网 [https://react.docschina.org/](https://react.docschina.org/)

**重要的资源**

*   基本组件库: [https://ant.design/components/overview-cn/](https://ant.design/components/overview-cn/)
*   高级组件库：[https://procomponents.ant.design/](https://procomponents.ant.design/)
*   源代码库：[https://github.com/ant-design/ant-design-pro](https://github.com/ant-design/ant-design-pro)

> 关于后续更多进展和分享欢迎持续关注公众号或博客。

本文来自博客园，作者：[MrZ大奇](https://www.cnblogs.com/mrzcode/)，转载请注明原文链接：[https://www.cnblogs.com/mrzcode/p/16014782.html](https://www.cnblogs.com/mrzcode/p/16014782.html)