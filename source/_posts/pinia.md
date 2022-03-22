---
title: 初试pinia
date: 2022-01-02T16:00:00.000Z
tags:
  - pinia
  - js
categories:
  - js
---
# Pinia 是什么?
 - Pinia 是一个用于 Vue 的状态管理库，类似 Vuex, 是 Vue 的另一种状态管理方案
 - Pinia 支持 Vue2 和 Vue3

> 本文只讲 Pinia 在 Vue3 中的使用, 在 Vue2 中使用略有差异，参考 [官方文档](https://pinia.vuejs.org/) 

# Pinia 优势
- 符合直觉，易于学习
- 极轻， 仅有 1 KB
- 模块化设计，便于拆分状态

# 安装 Pinia
安装需要 @next 因为 Pinia 2 处于 beta 阶段, Pinia 2 是对应 Vue3 的版本

# 使用 npm
```bash
npm install pinia@next
```
# 使用 yarn
```bash
yarn add pinia@next
```
创建一个 pinia（根存储）并将其传递给应用程序：
```ts
import { createPinia } from 'pinia';
app.use(createPinia());
```

核心概念与基本使用
# Store
Store 是一个保存状态和业务逻辑的实体，可以自由读取和写入，并通过导入后在 setup 中使用

## 创建一个 store
```ts
// store.js
import { defineStore } from "pinia";

// defineStore 调用后返回一个函数，调用该函数获得 Store 实体
export const useStore = defineStore({
  // id: 必须的，在所有 Store 中唯一
  id: "myGlobalState",
  // state: 返回对象的函数
  state: ()=> ({
    count: 1
  }),
});

```
# 使用 Store
```vue 
// xxx.vue
<template>
  <div>
    {{store.count}}
  </div>
</template>
<script>
  // 导入 Store， 使用自己的路径
  import { useStore } from "@/store/store.js";
  export default {
    setup() {
      // 调用函数 获得Store
      const store = useStore();
      return {
        store
      }
    }
  }
</script>
```

# Getters
Pinia 中的 Getters 作用与 Vuex 中的 Getters 相同，但使用略有差异
Pinia 中的 Getters 直接在 Store 上读取，形似 Store.xx，就和一般的属性读取一样
## Getter基本使用

- Getter 第一个参数是 state，是当前的状态，也可以使用 this.xx 获取状态
- Getter 中也可以访问其他的 Getter， 或者是其他的 Store

```ts

例子：
// 修改 store.js
import { defineStore } from "pinia";

import { otherState } from "@/store/otherState.js";

export const useStore = defineStore({
  id: "myGlobalState",
  state: ()=> ({
    count: 2
  }),
  getters: {
    // 一个基本的 Getter： 计算 count 的平方
    // 使用参数
    countPow2(state) {
      return state.count ** 2;
    },
    // 使用 this
    /* 
    countPow2() {
      return this.count ** 2;
    }, 
    */
    // 简单的 Getter 直接使用箭头函数
    // countPow2: state=> state.count ** 2

    // 获取其它 Getter， 直接通过 this
    countPow2Getter() {
      return this.countPow2;
    }

    // 使用其它 Store
    otherStoreCount(state) {
      // 这里是其他的 Store，调用获取 Store，就和在 setup 中一样
      const otherStore = useOtherStore();
      return otherStore.count;
    },
  }
});

// otherState.js
import { defineStore } from "pinia";

export const useStore = defineStore({
  id: "otherState",
  state: ()=> ({
    count: 5
  }),
});
```
# actions
 - Pinia 没有 Mutations，统一在 actions 中操作 state，通过this.xx 访问相应状态

 - 虽然可以直接操作 Store，但还是推荐在 actions 中操作，保证状态不被意外改变
 
 - action 和普通的函数一样
 - action 同样可以像 Getter 一样访问其他的 Store，同上方式使用其它 Store，这里不在赘述,详细请移步 [官方文档](https://pinia.vuejs.org/) 
# Actions
## action 基本使用
```ts

// store.js
export const useStore({
  state: ()=> ({
    count: 2,
    // ...
  })
  // ...
  actinos: {
    countPlusOne() {
      this.count++;
    },
    countPlus(num) {
      this.count += num;
    }
  }
})
```
# 总结
- Pinia 相比 Vuex 更加简单，而且 Pinia 可以自由扩展 官方文档 Plugins
- Pinia 是符合直觉的状态管理方式，让使用者回到了模块导入导出的原始状态，使状态的来源更加清晰可见
- Pinia 的使用感受类似于 Recoil，但没有那么多的概念和 API，主体非常精简，极易上手（Recoil 是 Facebook 官方出品的用于 React 状态管理库，使用 React Hooks 管理状态）
- Pinia 2 目前还在 Beta 状态，不建议在生产环境中使用，不过相信稳定了以后会成为 Vue 生态中另一大状态管理方案
