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
  <NuxtLink :to="`/p${article._path}`" class="group block p-4 rounded-2xl mb-4 transition-all duration-300 hover-lift glass-card relative overflow-hidden">
    <!-- 装饰音符 -->
    <div class="absolute top-2 right-3 text-xs opacity-0 group-hover:opacity-40 transition-opacity duration-300 pointer-events-none select-none">
      ♪
    </div>

    <li
      :title="article.title"
      class="grid grid-cols-3 gap-4 items-center list-none"
    >
      <span class="col-span-2 basis-3/6 grow text-lg font-medium truncate text-ellipsis overflow-hidden text-[var(--primary)] group-hover:text-[#39C5BB] transition-colors duration-300">
        {{ article.title }}
      </span>
      <span class="col-span-1 basis-1/6" />
      <span class="col-span-1 basis-2/6 text-sm text-[var(--text-secondary)] group-hover:text-[#7DF9FF] transition-colors duration-300 flex items-center gap-1">
        {{ formattedDate(article.date) }}
        <span class="i-icon-park-outline-arrow-right ml-1 op-0 group-hover:op-100 transition-all duration-300 inline-block w-4 h-4 group-hover:translate-x-1"></span>
      </span>
    </li>

    <!-- 底部渐变线条 -->
    <div class="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#39C5BB] via-[#7DF9FF] to-[#00B8A9] opacity-0 group-hover:opacity-60 transition-opacity duration-300"></div>
  </NuxtLink>
</template>

<style scoped>
.group:hover {
  border-color: var(--common-bd);
  box-shadow: var(--shadow-glow);
}
</style>
