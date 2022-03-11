<!--
 * @Descripttion: 
 * @version: 
 * @Author: MiKin
 * @Date: 2022-03-08 19:00:36
 * @LastEditors: MiKin
 * @LastEditTime: 2022-03-11 13:24:43
 * @FilePath: \vite-blog\src\App.vue
-->
<script setup lang="ts">

const title = 'blog | 松岛川树'
const description = '许多人来来去去,相聚又别离'

useHead({
  title,
  meta: [
    { name: 'description', content: description },
    { name: 'description', content: description },
    { property: 'og:title', content: title },
    {
      property: 'og:image',
      content:
        'https://avatars.githubusercontent.com/u/81367559?v=4',
    },
  ],
})
</script>

<template>
  <router-view />
</template>
