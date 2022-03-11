<!--
 * @Descripttion: 
 * @version: 
 * @Author: MiKin
 * @Date: 2022-03-08 19:00:36
 * @LastEditors: MiKin
 * @LastEditTime: 2022-03-11 12:57:31
 * @FilePath: \vite-blog\src\layouts\home.vue
-->
<template>
   <main class=" text-gray-700 dark:text-gray-200">
    <Header />
    <router-view v-bind="$attrs" />
    <div class="text-center mt-5 mx-auto opacity-25 text-sm">
      [Home Layout]
    </div>
  </main>
</template>
