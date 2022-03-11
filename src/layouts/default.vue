<!--
 * @Descripttion: 
 * @version: 
 * @Author: MiKin
 * @Date: 2022-03-08 19:00:36
 * @LastEditors: MiKin
 * @LastEditTime: 2022-03-11 13:15:44
 * @FilePath: \vite-blog\src\layouts\default.vue
-->
<template>
  <main class="text-gray-700 dark:text-gray-200">
    <Header />
    <router-view v-bind="$attrs" />
    <Footer />
  </main>
</template>
