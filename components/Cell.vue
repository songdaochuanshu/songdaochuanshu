<script setup lang="ts">
import { formattedDate } from '@/utils'

interface Article {
  _path: string
  title: string
  date: string
}

const { article } = defineProps<{ article: Article }>()
</script>

<template>
  <NuxtLink :to="`/p${article._path}`" class="p-2  rounded-lg mb-6">
    <li
      :title="article.title"
      class="grid grid-cols-3 gap-4 items-center"
    >
      <span class="col-span-2 basis-3/6 grow text-lg font-semibold truncate text-ellipsis overflow-hidden">
        {{ article.title }}
      </span>
      <span class="col-span-1 basis-1/6" /> <!-- 留空 -->
      <span class="col-span-1 basis-2/6 text-sm text-gray-500 ">
        {{ formattedDate(article.date) }}
      </span>
    </li>
  </NuxtLink>
</template>

<style scoped>
/* 如果需要额外的样式，可以在这里添加 */
.hover:hover {
  background-color: #f0f0f0;
}
</style>
