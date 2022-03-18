---
layout: post
title: "VuePress 博客之 SEO 优化（三）标题、链接优化"
date: "2022-03-18T04:32:01.404Z"
---
VuePress 博客之 SEO 优化（三）标题、链接优化
=============================

前言
--

在 [《一篇带你用 VuePress + Github Pages 搭建博客》](https://github.com/mqyqingfeng/Blog/issues/235)中，我们使用 VuePress 搭建了一个博客，最终的效果查看：[TypeScript 中文文档](http://ts.yayujs.com/)。

本篇讲讲 SEO 中的一些细节优化。

1\. 设置全局的 title、description、keywords
------------------------------------

    // config.js
    module.exports = {
        title: "title",
        description: 'description',
        head: [
            ['meta', { name: 'keywords', content: 'keywords'}]
        ]
    }
    

关于标题如何写，参照老旧的 [《百度搜索引擎优化指南2.0》](https://ziyuan.baidu.com/college/courseinfo?id=193&page=3):

> 我们建议网页标题可以这样描述：
> 
> 首页：网站名称 或者 网站名称\_提供服务介绍or产品介绍
> 
> 频道页：频道名称\_网站名称
> 
> 文章页：文章title\_频道名称\_网站名称

也可以参考这篇[《百度搜索网页标题规范》](https://ziyuan.baidu.com/college/articleinfo?id=2726)里的规范。

关于描述：

> Meta description是对网页内容的精练概括。如果description描述与网页内容相符，百度会把description当做摘要的选择目标之一，一个好的description会帮助用户更方便的从搜索结果中判断你的网页内容是否和需求相符。Meta description不是权值计算的参考因素，这个标签存在与否不影响网页权值，只会用做搜索结果摘要的一个选择目标。

关于关键词，注意 keywords 使用英文逗号分隔，中文逗号则会被认为是长句。

我们直接看一个百度百科词条的设置：

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6a7fd9ad3bdb4678b7b425dbabbabc27~tplv-k3u1fbpfcp-zoom-1.image)

2\. 自定义页面 title、description、keywords
------------------------------------

通过 [Front Matter](https://vuepress.vuejs.org/zh/guide/frontmatter.html) 自定义：

    ---
    title: title
    description: description
    meta:
      - name: keywords
        content: super duper SEO
    ---
    

3\. 图片添加 alt 属性
---------------

根据 Google 的[新手 SEO 指南](https://developers.google.com/search/docs/beginner/seo-starter-guide?hl=zh-cn#usealtattribute)：

> 使用 alt 属性
> 
> 为图片提供说明性文件名和 alt 属性说明。alt 属性使您能够为图片指定替代文本，在图片由于某种原因不能显示时起到救场的作用。
> 
> 为什么使用此属性？如果用户使用屏幕阅读器等辅助技术查看您的网站，则 alt 属性的内容会提供关于照片的信息。
> 
> 另一个原因是，如果您将图片用作链接，则该图片的替代文本会等同于文字链接的定位文字。但是，如果文字链接可以起到相同的作用，我们建议不要在网站的导航中使用太多图片作为链接。最后，优化图片文件名和替代文本可使图片搜索项目（如 Google 图片）更好地理解您的图片。

4\. 精简 url
----------

参照[《百度搜索引擎优化指南2.0》](https://ziyuan.baidu.com/college/courseinfo?id=193&page=3)：

> URL尽量短，长URL不仅不美观，用户还很难从中获取额外有用的信息。另一方面，短url还有助于减小页面体积，加快网页打开速度，提升用户体验。

参照 Google 搜索中心的[《SEO 新手指南》](https://developers.google.com/search/docs/beginner/seo-starter-guide?hl=zh_cn#simpleurlsconveyinfo)：

> 简洁网址易于传达内容信息
> 
> 为网站上的文档创建描述准确的类别和文件名，不仅可以帮助您更好地组织网站，而且可以为希望链接到您的内容的用户创建更简单、易于使用的网址。如果网址极为冗长、含义模糊，并且包含很少的可识别字词，访问者可能会望而却步。
> 
> 下面的网址可能会造成困惑且不易于使用：  
> [https://www.brandonsbaseballcards.com/folder1/22447478/x2/14032015.html](https://www.brandonsbaseballcards.com/folder1/22447478/x2/14032015.html)
> 
> 如果您的网址有明确的含义，则该网址在不同上下文中都可能会更实用且更易于理解。  
> [https://www.brandonsbaseballcards.com/article/ten-rarest-baseball-cards.html](https://www.brandonsbaseballcards.com/article/ten-rarest-baseball-cards.html)

像我文档的地址是：[https://ts.yayujs.com/learn-typescript/handbook/TheBasics.html](https://ts.yayujs.com/learn-typescript/handbook/TheBasics.html)

其实其中的 learn-typescript 就是没有必要的，之所以会有这个，是因为之前使用 GitHub Pages，这是我对应的 GitHub 的仓库名，但如果是自己建站，其实就没有必要写这个了，我们直接修改 config.js 中的 base 配置：

    module.exports = {
      	base: ''
    }
    

但是如果你的地址已经对外发出去了呢？亦或者已经被收录了，这个时候你可以通过 Nginx 的 301 重定向来实现：

        server {
            listen 443 ssl;
            server_name ts.yayujs.com;
      			// ...
            location ^~ /learn-typescript/ {
        				rewrite ^/learn-typescript/(.*)$ https://yayujs.com/$1 permanent;
        				alias /home/www/website/ts/;
            }
      			// ...
       }
    
    

此时你再访问 [https://ts.yayujs.com/learn-typescript/handbook/EverydayType.html](https://ts.yayujs.com/learn-typescript/handbook/EverydayType.html)，就会跳转到 [https://yayujs.com/handbook/EverydayType.html](https://yayujs.com/handbook/EverydayType.html)

5\. 链接加上 nofollow
-----------------

搜索引擎基本的 PageRank 算法，其基本假设是：更重要的页面往往更多地被其他页面引用。所以我们可以使用 nofollow 来告知 Google 不要跟踪链接到的网页，这样就不会分走我们页面的权重。

那为什么会有 nofollow 这种方法存在呢？这也很好理解，就比如一些你在你的博客发表了一个垃圾网站的评论，为了提醒他人，加了这个网站的链接，你当然不希望这个网站因为你的声誉而获益。这时候就非常适合使用 nofollow。

使用 nofollow，我们只用在链接上加上 nofollow 属性即可：

    <a href="http://www.example.com" rel="nofollow">Anchor text here</a>
    

根据 VuePress 的[官方文档](https://v1.vuepress.vuejs.org/zh/config/#markdown-externallinks)，我们知道：

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/71e06d5e7c6b41398ad2e766f6b84904~tplv-k3u1fbpfcp-zoom-1.image)

VuePress 博客默认的链接属性是 noopener noreferrer，我们修改下 config.js，添加上 nofollow:

        
    module.exports = {
      	markdown: {
          externalLinks: { target: '_blank', rel: 'nofollow noopener noreferrer' }
        }
    }
    
    

我们再检查下 DOM 元素，就会发现带上了 nofollow 属性：

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2eab1572783b4316bd75a6c8501c2b7d~tplv-k3u1fbpfcp-zoom-1.image)

6\. 多页文章
--------

参考 Google 搜索中心的“[遵循抓取和索引编制最佳做法](https://developers.google.com/search/docs/advanced/guidelines/get-started?hl=zh-cn#follow-crawling-and-indexing-best-practices)”：

> 多页文章：如果您的文章分为几个页面，请确保有可供用户点击的下一页和上一页链接，并且这些链接是可抓取的链接。您只需这样做，Google 就可以抓取这种网页集。

这里不需要我们特别做什么，别觉得有了侧边栏，就把上下篇文章的链接干掉就行。

7\. robots.txt
--------------

robots.txt 文件规定了搜索引擎抓取工具可以访问你网站上的哪些网址， 此文件主要用于避免网站收到过多请求。

但是要注意：robots.txt 不是一个好的阻止搜索引擎抓取某个网页的机制，假如 robots.txt 规定了某个文件不应该被访问，但是否被执行，完全看搜索引擎是否按照 robots.txt 的规范来执行，当然像 Google 等搜索引擎会按照规范正规抓取，其他的搜索引擎就不一定了。又比如网页被其他公开的网页引用了，仍可能会找到该网页并收录。

若要正确阻止网址出现在 Google 搜索结果中，应该为[服务器上的文件设置密码保护](https://developers.google.com/search/docs/advanced/crawling/control-what-you-share)、[使用 noindex 元标记或响应标头](https://developers.google.com/search/docs/advanced/crawling/block-indexing)，或者彻底移除网页。

对于我这样一个允许完全访问的站点来说，更多的作用是告诉搜索引擎我的 sitemap 地址。

由于 robots.txt 文件应该位于网站的根目录下，因此，我们可以直接在 `.vupress/public`下新建一个 robots.txt 文件，文件内容写入：

    Sitemap: https://ts.yayujs.com/sitemap.xml
    
    User-agent: *
    

具体 robots.txt 可以设置的字段可以参阅[「创建 robots.txt 文件」](https://developers.google.com/search/docs/advanced/robots/create-robots-txt)。

除了直接创建，也可以使用 vuepress-plugin-robots 插件，这里就不多叙述了。

8\. 404 页面
----------

参照 [「搜索引擎优化 (SEO) 新手指南」](https://developers.google.com/search/docs/beginner/seo-starter-guide?hl=zh_cn)：

> **显示实用的 404 页面**
> 
> 用户偶尔会因点击损坏的链接或输入错误的网址而转到您网站上不存在的网页。使用自定义 404 页面能够有效引导用户返回到您网站上的正常网页，从而大幅提升用户的体验。不妨考虑添加返回根网页的链接，并提供指向您网站上热门内容或相关内容的链接。您可以使用 Google Search Console 找出导致“未找到”错误的网址来源。

`vuepress-theme-reco` 这个主题的 404 页面默认用的是腾讯公益：

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/88b8d898d15743cb9fb1977b314fce51~tplv-k3u1fbpfcp-zoom-1.image)

如果你想关闭：

    module.exports = {
      theme: 'reco',
      themeConfig: {
        noFoundPageByTencent: false
      }  
    }
    

样式会变成这样：

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/88e9b433a37a45c4afefc91ab5f186f4~tplv-k3u1fbpfcp-zoom-1.image)

如果你想要修改这里的文案，可以直接在源码里修改，目录为 `node_modules/vuepress-theme-reco/layouts/404.vue`：

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a6ee44a7a26e4d959185c6472fa211cc~tplv-k3u1fbpfcp-zoom-1.image)

9\. 移动端设置
---------

    module.exports = {
      	head: [
          ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1' }],
        ]
    }
    

> 此标记可告知浏览器如何在移动设备上呈现网页。该标记的存在可向 Google 表明该网页适合移动设备。

10\. 测试与优化工具
------------

### 10.1 Lighthouse

> Google Lighthouse 是一种用于衡量网页质量的开源自动化工具。它可以针对任何公共或要求身份验证的网页运行。Google Lighthouse 会对网页的性能，可访问性和搜索引擎优化进行审核。它还包括测试渐进式 Web 应用程序是否符合标准和最佳实践的功能。

我们[安装下 Lighthouse 扩展程序](https://chrome.google.com/webstore/detail/lighthouse/blipmdconlkpinefehnmjammfjpmpbjk?hl=zh)，然后在需要审查的网站上，点击 Lighthouse 插件，再点击「Generate report」：

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d7f3812b62fa47e686967d793b6dd581~tplv-k3u1fbpfcp-zoom-1.image)

等待一段时间，就会生成一个报告：

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0a92267e9c004959930570c641504e79~tplv-k3u1fbpfcp-zoom-1.image)

我们可以查看 Performance、Accessibility、Best Practices、SEO、PWA 五个方面的分数和修改建议，根据这个建议进行调整，尽可能的优化就好了。

### 10.2 web.dev

官网地址：[https://web.dev/measure/](https://web.dev/measure/)，你可以理解为网页版的 Lighthouse，只用在网页上输出你的地址就行，背后还是用的 Lighthouse

### 10.3 Page Speed Insights

Google 提供的页面速度测试工具，地址：[https://pagespeed.web.dev/](https://pagespeed.web.dev/)

输入地址后，就可以进行分析，会出现分数和优化建议：

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/02e56ad7e0b6434dac5cc90bf7a8441e~tplv-k3u1fbpfcp-zoom-1.image)

系列文章
----

博客搭建系列是我至今写的唯一一个偏实战的系列教程，预计 20 篇左右，讲解如何使用 VuePress 搭建、优化博客，并部署到 GitHub、Gitee、私有服务器等平台。本篇为第 29 篇，全系列文章地址：[https://github.com/mqyqingfeng/Blog](https://github.com/mqyqingfeng/Blog)

微信：「mqyqingfeng」，加我进冴羽唯一的读者群。

如果有错误或者不严谨的地方，请务必给予指正，十分感谢。如果喜欢或者有所启发，欢迎 star，对作者也是一种鼓励。