---
title: "Vue3"
date: 2021-01-14T16:00:00.000Z
tags:
  - Vue3
categories:
  - Vue3
---

# `Vue3.0

官方网站地址: v3.vuejs.org

## 新增特性

- 向下兼容，Vue3 支持大多数 Vue2 的特性。
- 性能的提升，每个人都希望使用的框架更快，更轻。打包大小减少 41%，初次渲染快 55%，更新快 133%，内存使用减少 54%
- 新推出的`Composition API` ，在 Vue2 中遇到的问题就是复杂组件的代码变的非常麻烦，甚至不可维护。封装不好，重用不畅。
- 更好`TypeScript`支持,Vue3 的源代码就是使用`TypeScript`进行开发的。

## Vue-cli 搭建 

Vue3开发环境

安装:

`````bash
npm install -g @vue/cli			| 推介
# OR
yarn global add @vue/cli
`````

检查版本命令为：

```js
vue --version
```

 ## vue-cli 命令行创建项目

命令行中输入`vue create vue3-demo`

````bash
? Please pick a preset: (Use arrow keys)            //请选择预选项
> Default ([Vue 2] babel, eslint)                   //使用Vue2默认模板进行创建
  Default (Vue 3 Preview) ([Vue 3] babel, eslint)   //使用Vue3默认模板进行创建
  Manually select features                          //手动选择(自定义)的意思
````



`TypeScript`进行开发 Vue3 的代码  不能直接使用第二项默认模板

```bash
? Check the features needed for your project: (Press <space> to select, <a> to toggle all, <i> to invert selection)
>(*) Choose Vue version
 (*) Babel
 ( ) TypeScript
 ( ) Progressive Web App (PWA) Support
 ( ) Router
 ( ) Vuex
 ( ) CSS Pre-processors             //CSS预处理器
 (*) Linter / Formatter             //格式化工具
 ( ) Unit Testing                   //单元测试
 ( ) E2E Testing                    //E2E测试
```

`````
? Choose a version of Vue.js that you want to start the project with (Use arrow keys)
> 2.x
  3.x (Preview)
`````

`````
 Use class-style component syntax?
`````

是否需要使用`class-style`

是否使用`TypeScript`和`Babel`的形式编译 JSX

````bash
Use Babel alongside TypeScript (required for modern mode, auto-detected polyfills, transpiling JSX)? (Y/n)
````

回车后会让你选择增加`lint`的特性功能。

```bash
? Pick additional lint features: (Press <space> to select, <a> to toggle all, <i> to invert selection)
>(*) Lint on save         //保存的时候进行Lint
 ( ) Lint and fix on commit   //需要帮你进行fix（修理），这项我们不进行选择
```

选择这些配置文件时单独存放，还是直接存放在`package.json`文件里

`````bash
Where do you prefer placing config for Babel, ESLint, etc.? In dedicated config files
`````

需不需要把这些配置保存下来，下次好直接进行使用

`````bash
Save this as a preset for future projects? (y/N)
`````

## 图形化创建项目

使用 `vue ui`

```
Starting GUI.
Ready on http://localhost:80
```

把`http://localhost:80`地址拷贝到浏览器地址栏

进行选项配置

## 项目目录

````
|-node_modules       -- 所有的项目依赖包都放在这个目录下
|-public             -- 公共文件夹
---|favicon.ico      -- 网站的显示图标
---|index.html       -- 入口的html文件
|-src                -- 源文件目录，编写的代码基本都在这个目录下
---|assets           -- 放置静态文件的目录，比如logo.pn就放在这里
---|components       -- Vue的组件文件，自定义的组件都会放到这
---|App.vue          -- 根组件，这个在Vue2中也有
---|main.ts          -- 入口文件，因为采用了TypeScript所以是ts结尾
---|shims-vue.d.ts   -- 类文件(也叫定义文件)，因为.vue结尾的文件在ts中不认可，所以要有定义文件
|-.browserslistrc    -- 在不同前端工具之间公用目标浏览器和node版本的配置文件，作用是设置兼容性
|-.eslintrc.js       -- Eslint的配置文件，不用作过多介绍
|-.gitignore         -- 用来配置那些文件不归git管理
|-package.json       -- 命令配置和包管理文件
|-README.md          -- 项目的说明文件，使用markdown语法进行编写
|-tsconfig.json      -- 关于TypoScript的配置文件
|-yarn.lock          -- 使用yarn后自动生成的文件，由Yarn管理，安装yarn包时的重要信息存储到yarn.lock文件中
````

### package.json

```json
{
  //----
  "scripts": {
    "serve": "vue-cli-service serve",
    "build": "vue-cli-service build",
    "lint": "vue-cli-service lint"
  },
  //----
}
```

- serve : 在开发时用于查看效果的命令，视频中演示看一下效果
- build : 打包打码，一般用于生产环境中使用
- lint : 检查代码中的编写规范



### main.ts 文件

`````ts
import { createApp } from "vue"; // 引入vue文件，并导出`createApp`
import App from "./App.vue"; // 引入自定义组件，你在页面上看的东西基本都在这个组件里

createApp(App).mount("#app"); // 把App挂载到#app节点上，在public目录下的index.html找节点
`````

## setup()和 ref()函数

实例

````html
<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <div>
    <h2>欢迎光临红浪漫洗浴中心</h2>
    <div>请选择一位美女为你服务</div>
  </div>
  <div>
    <button> </button>
  </div>
</template>
````

`setup`中加入一个`girls`变量，为了能让模板中进行使用，还需要返回。

`````ts
<script lang="ts">
import { defineComponent, ref } from "vue";
export default defineComponent({
  name: "App",
  setup() {
    const girls = ref(["大脚", "刘英", "晓红"]);
    return {
      girls
    };
  },
});
</script>
`````

使用`v-for`语法

`````html
<button v-for="(item, index) in girls" v-bind:key="index">
  {{ index }} : {{ item }}
</button>
`````

点击按钮的时候，触发一个方法`selectGirlFun`，方法绑定一个选定值`selectGirl`

`````ts
<script lang="ts">
import { defineComponent, ref } from "vue";
export default defineComponent({
  name: "App",
  setup() {
    const girls = ref(["大脚", "刘英", "晓红"]);
    const selectGirl = ref("");
    const selectGirlFun = (index: number) => {
      selectGirl.value = girls.value[index];
    };
    //因为在模板中这些变量和方法都需要条用，所以需要return出去。
    return {
      girls,
      selectGirl,
      selectGirlFun,
    };
  },
});
</script>
`````

修改`template`代码

````html
<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <div>
    <h2>欢迎光临红浪漫洗浴中心</h2>
    <div>请选择一位美女为你服务</div>
  </div>
  <div>
    <button
      v-for="(item, index) in girls"
      v-bind:key="index"
      @click="selectGirlFun(index)"
    >
      {{ index }} : {{ item }}
    </button>
  </div>
  <div>你选择了【{{ selectGirl }}】为你服务</div>
</template>
````

- `setup` 函数的用法，可以代替 Vue2 中的 date 和 methods 属性，直接把逻辑写在 setup 里就可以
- `ref` 函数的使用，要在`template`中使用的变量，必须用`ref`包装一下。
- `return`出去的数据和方法，在模板中才可以使用，这样可以精准的控制暴露的变量和方法。

## reactive() 函数优化程序

`setup`中要改变和读取一个值的时候，还要加上`value`。

可以优化

引入一个新的 API`reactive`

`return`返回的时候只需要返回一个`data`,

```js
<script lang="ts">
import { ref, reactive } from "vue";
export default {
  name: "App",
  setup() {
    const data = reactive({
      girls: ["大脚", "刘英", "晓红"],
      selectGirl: "",
      selectGirlFun: (index: number) => {
        data.selectGirl = data.girls[index];
      },
    });

    return {
      data,
    };
  },
};
</script>
```

修改`template`部分的代码

字面量前要加入`data`

```html
<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <div>
    <h2>欢迎光临红浪漫洗浴中心</h2>
    <div>请选择一位美女为你服务</div>
  </div>
  <div>
    <button
      v-for="(item, index) in data.girls"
      v-bind:key="index"
      @click="data.selectGirlFun(index)"
    >
      {{ index }} : {{ item }}
    </button>
  </div>
  <div>你选择了【{{ data.selectGirl }}】为你服务</div>
</template>
```

## data 增加类型注解

接口(`interface`)来作类型注解。

```js
interface DataProps {
  girls: string[];
  selectGirl: string;
  selectGirlFun: (index: number) => void;
}
```

显示的为 `data` 变量作一个类型注解.

```js
cosnt data: DataProps = ...
```

## toRefs()继续优化

每次输出变量前面都要加一个`data`,这是可以优化的。

`...`扩展，运算符结构后就变成了普通变量，不再具有响应式的能力

新函数`toRefs()`

```js
import { reactive, toRefs } from "vue";
```

`data`进行包装

```js
const refData = toRefs(data);

return {
    ...refData,
};
```

`template`去掉 data

````typescript
<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <div>
    <h2>欢迎光临红浪漫洗浴中心</h2>
    <div>请选择一位美女为你服务</div>
  </div>
  <div>
    <button
      v-for="(item, index) in girls"
      v-bind:key="index"
      @click="selectGirlFun(index)"
    >
      {{ index }} : {{ item }}
    </button>
  </div>
  <div>你选择了【{{ selectGirl }}】为你服务</div>
</template>
````

## 示例代码

```````typescript
<template>
    <img alt="Vue logo" src="./assets/logo.png" />
  <div>
    <h2>欢迎光临红浪漫洗浴中心</h2>
    <div>请选择一位美女为你服务</div>
  </div>
  <div>
    <button 
      v-for="(item,index) in girls" 
      v-bind:key="index"
      @click="selectGirlFunction(index)"
      >{{index}}:{{item}}</button>
  </div>
  <div>你选择了{{selectGirl === "" ? "小白" : selectGirl}}为你服务</div>
</template>

<script lang="ts">
//reactive()
import {reactive,toRefs} from 'vue';
interface DataProps{
  girls: string[];
  selectGirl: string;
  selectGirlFunction: (index: number) => void;
}

export default {
  name: 'App',
  setup(){
    const data: DataProps  =  reactive({
      girls:["大脚", "刘英", "晓红"],
      selectGirl:"",
      selectGirlFunction:(index: number)=>{
         data.selectGirl=data.girls[index];
      }
    })
    const refData = toRefs(data);
    return{
      ...refData
    };
  } 

  
};
</script>
```````

## Vue3.生命周期和钩子函数

| 函数名            | 作用                                                         |
| ----------------- | ------------------------------------------------------------ |
| setup()           | 开始创建组件之前，在beforeCreate和created之前执行。创建的是data和method |
| onBeforeMount()   | 组件挂载到节点上之前执行的函数。                             |
| onMounted()       | 组件挂载完成后执行的函数。                                   |
| onBeforeUpdate()  | 组件更新之前执行的函数。                                     |
| onUpdated()       | 组件更新完成之后执行的函数。                                 |
| onBeforeUnmount() | 组件卸载之前执行的函数。                                     |
| onUnmounted()     | 组件卸载完成后执行的函数                                     |
| onActivated()     | 被包含在<keep-alive>中的组件，会多出两个生命周期钩子函数。被激活时执行。 |
| onDeactivated()   | 比如从 A 组件，切换到 B 组件，A 组件消失时执行。             |
| onErrorCaptured() | 当捕获一个来自子孙组件的异常时激活钩子函数                   |

引入

````ts
import {
  reactive,
  toRefs,
  onMounted,
  onBeforeMount,
  onBeforeUpdate,
  onUpdated,
} from "vue";
````

```js
<script lang="ts">

//....
const app = {
  name: "App",
  setup() {
    console.log("1-开始创建组件-----setup()");
    const data: DataProps = reactive({
      girls: ["大脚", "刘英", "晓红"],
      selectGirl: "",
      selectGirlFun: (index: number) => {
        data.selectGirl = data.girls[index];
      },
    });
    onBeforeMount(() => {
      console.log("2-组件挂载到页面之前执行-----onBeforeMount()");
    });

    onMounted(() => {
      console.log("3-组件挂载到页面之后执行-----onMounted()");
    });
    onBeforeUpdate(() => {
      console.log("4-组件更新之前-----onBeforeUpdate()");
    });

    onUpdated(() => {
      console.log("5-组件更新之后-----onUpdated()");
    });

    const refData = toRefs(data);

    return {
      ...refData,
    };
  },
};
export default app;
</script>
```

`setup()`,setup 这个函数是在`beforeCreate`和`created`之前运行的

### Vue2.x  Vue3.x 生命周期对比

```js
Vue2--------------vue3
beforeCreate  -> setup()
created       -> setup()
beforeMount   -> onBeforeMount
mounted       -> onMounted
beforeUpdate  -> onBeforeUpdate
updated       -> onUpdated
beforeDestroy -> onBeforeUnmount
destroyed     -> onUnmounted
activated     -> onActivated
deactivated   -> onDeactivated
errorCaptured -> onErrorCaptured
```

### onRenderTracked()和 onRenderTriggered()

onRenderTracked 状态跟踪

`onRenderTracked`直译过来就是`状态跟踪`，它会跟踪页面上所有响应式变量和方法的状态

页面有`update`的情况，他就会跟踪，然后生成一个`event`对象

```js
import { .... ,onRenderTracked,} from "vue";
```

在`setup()`函数中进行使用了。

```js
onRenderTracked((event) => {
  console.log("状态跟踪组件----------->");
  console.log(event);
});
```

`onRenderTriggered`就是狙击枪，只精确跟踪发生变化的值，进行针对性调试。

```js
import { .... ,onRenderTriggered,} from "vue";
```

```js
onRenderTriggered((event) => {
  console.log("状态触发组件--------------->");
  console.log(event);
});
```

 `event` 对象属性的详细介绍：

```js
- key 那边变量发生了变化
- newValue 更新后变量的值
- oldValue 更新前变量的值
- target 目前页面中的响应变量和函数
```