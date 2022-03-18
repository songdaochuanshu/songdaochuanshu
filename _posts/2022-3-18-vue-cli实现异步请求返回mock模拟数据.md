---
layout: post
title: "vue-cli实现异步请求返回mock模拟数据"
date: "2022-03-18T04:32:01.835Z"
---
vue-cli实现异步请求返回mock模拟数据
=======================

　　在前后端分离开发的过程中，前端开发过程中，页面的数据显示一般都是写死的静态数据，也就是没有经过接口，直接写死在代码中的，在后端给出接口后，再替换为接口数据，为了减少对接成本，mock就出现了。通过预先跟服务器端约定好的接口，模拟请求数据甚至逻辑，能够让前端开发更加独立自主，不会被服务端的开发所阻塞。

　　网上有不少使用mockjs模拟数据的文章，但基本都是本地拦截请求返回数据，在`network` 中没有发出任何的请求，本地调试起来很不好，只能通过`console.log`来调试。为了实现真正的异步请求，那么就需要真正的服务器接口，而在开发vue-cli项目时，本地开发运行启动命令后，实际就是启动了一个本地服务器，那么只要把接口地址都在本地服务器中配置并使用mock返回数据就可以实现真正的异步请求了，这样调试就和真正的请求一模一样了。

　　**开始实现**

　　因为是vue-cli项目，请先安装node和npm。

　　1、首先，需要全局安装vue-cli：

\> npm install -g @vue-cli

　　2、创建vue-cli项目：

\> vue create vue-mock

　　创建成功后进入项目根目录，运行npm run serve启动，应该可以成功访问vue示例页面　　

　　本示例使用的版本是vue-cli 4.5.13、vue3、webpack4，如果发现某个配置不生效，请留意是否已经被废弃。

　　3、安装axios

\> npm install axios -S

　　4、main.js添加aixos，修改如下

// main.js  
import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'

const vueApp \= createApp(App)
vueApp.config.globalProperties.$axios \= axios // vue3与vue2的区别，不再是通过prototype
vueApp.mount('#app')

　　5、安装mockjs

\> npm install mockjs -D

　　6、在根目录新建mock文件夹，在mock文件夹下新建index.js文件，并在main.js中引入index.js，代码如下：

// mock/index.js  
import Mock from 'mockjs'
Mock.mock('/url', 'get', (req, res) => {
  return Mock.mock({
    status: 200,
    req,
    res,
    data: '请求成功'
  })
})

// main.js  
import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'
import '../mock/index' // 引入mock路由拦截
const vueApp = createApp(App)
vueApp.config.globalProperties.$axios \= axios
vueApp.mount('#app')

　　7、修改helloWorld.vue文件如下：

// helloWorld.vue  
<template>
  <div>
    <button @click="getMockData">获取mock数据</button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  methods: {
    getMockData() {
      this.$axios.get('/url').then(res => {
        console.log(res)
      })
    }
  }
}
</script>
<style scoped>

</style>

这时候页面效果如下：

![](https://img2022.cnblogs.com/blog/803235/202203/803235-20220317155204614-625982336.png)

　　 到了这一步可以说是成功实现mock数据返回了，细心的朋友可能已经发现，network里面并没有出现请求，我们只能通过console查看返回结果，当请求数量多时就不太好调试了，那有没有什么办法可以让请求出现在network中呢？

　　前面已经说到运行项目时，就是启动了一个本地服务器，只要想办法把接口路由配置进去就可以了，接着往下看

　　9、修改vue.config.js中的devServer的配置，如果没有该文件则新建

// vue.config.js
const Mock = require('mockjs')
module.exports \= {
  //...
  devServer: {
    port: 8082,
    before: function(app, server) { // webpack4使用before，webpack使用setupMiddlewares
      app.get('/url', function(req, res) {
        res.json(Mock.mock({
          status: 200,
          data: '请求成功啦~'
        }));
      });
    }
  }
};

 　　注释main.js中引入的mock配置

import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'
// import '../mock/index' // 引入mock路由拦截
const vueApp = createApp(App)
vueApp.config.globalProperties.$axios \= axios
vueApp.mount('#app')

　　重启服务，重新点击按钮，成功请求，并且在network也出现了该请求，如下图

![](https://img2022.cnblogs.com/blog/803235/202203/803235-20220318085516984-1394805729.png)

　　这样似乎已经实现了我们的目的了，既使用了mock模拟数据，也方便了调试，但是，在我们修改了返回的数据内容时，请求接口，发现还是原来的数据，因为是修改配置文件，所以每次修改都需要重启服务，这也太麻烦了吧，我们想每次修改before里的内容时，服务器都能够自动热更新，就像修改其他文件一样，浏览器自动更新，继续往下走。

　　10、安装chokidar插件，监听mock文件夹，实现接口路由热更新，想了解更多chokidar的内容请自行搜索

\> npm install chokidar -D

　　11、在mock文件夹下新建mock-server.js，借鉴于[vue-element-admin](https://panjiachen.gitee.io/vue-element-admin-site/zh/guide/essentials/mock-api.html)中的mock新方案实现，内容如下，就不具体细说了，大家可以自行调试

// mock/mock-server.js  
const chokidar = require('chokidar')
const path \= require('path')

const mockDir \= path.join(process.cwd(), 'mock')

// 删除对应的接口路由缓存
function removeRegisterRoutes() {
  Object.keys(require.cache).forEach(i \=> {
    if (i.includes(mockDir)) {
      console.log(i)
      delete require.cache\[require.resolve(i)\]
    }
  })
}
// 注册接口路由，每增加一个路由，app.\_router.stack就增加一个堆栈
function registerRoutes(app){
  const mocks \= require('./index') // 这里必须在函数内引用，否则无法实现热更新
  let count = 0
  for (const mock of mocks) {
    app\[mock.method\](mock.url, mock.response);
    count++
  }
  return {
    start: app.\_router.stack.length \- count,
    count
  }
}

module.exports \= (app) => {
  let { start, count } \= registerRoutes(app)
  chokidar.watch(mockDir, {}).on('all', (event, path) => {
    if (event === 'change' || event === 'add') {
      app.\_router.stack.splice(start, count) // 先删除旧的api路由，再重新注册新的路由
      removeRegisterRoutes()
      const stack \= registerRoutes(app)
      start \= stack.start
      count \= stack.count
    }
  })
}

　　注意，修改mock-server.js文件内容不会触发自动更新，具体原因这里就不说了，可以自己想一想哦~

　　12、修改mock中的index.js文件

// mock/index.js  
const Mock = require('mockjs')

const routers \= \[
  {
    url: '/url',
    method: 'get',
    response: (req, res) \=> {
      res.json(Mock.mock({
        status: 200,
        data: '请求成功~'
      }))
    }
  },
  {
    url: '/url/path',
    method: 'get',
    response: (req, res) \=> {
      res.json(Mock.mock({
        status: 200,
        data: '请求接口/url/path'
      }))
    }
  }
\]
module.exports \= routers

　　13、修改vue.config.js的beforte

// vue.config.js  
// const Mock = require('mockjs')
module.exports = {
  //...
  devServer: {
    port: 8082,
    before: require('./mock/mock-server')
  }
};

　　重新启动，点击按钮，请求成功，修改mock中的index里面的返回数据，回到页面点击按钮，发现返回数据已改变，到此，已实现接口请求返回mock数据。

　　[示例代码请点击获取](https://gitee.com/xg_xiaoguai/vue-cli-mock)

　　如有不对或者建议，请提出，谢谢。