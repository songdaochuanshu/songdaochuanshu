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
  <NuxtLink :to="`/p${article._path}`" class="group block p-4 rounded-xl mb-4 transition-all duration-300 hover-lift glass-card">
    <li
      :title="article.title"
      class="grid grid-cols-3 gap-4 items-center"
    >
      <span class="col-span-2 basis-3/6 grow text-lg font-medium truncate text-ellipsis overflow-hidden text-[var(--primary)] group-hover:text-[#4a7c6f] transition-colors duration-300">
        {{ article.title }}
      </span>
      <span class="col-span-1 basis-1/6" />
      <span class="col-span-1 basis-2/6 text-sm text-[var(--text-secondary)] group-hover:text-[#4a7c6f] transition-colors duration-300">
        {{ formattedDate(article.date) }}
        <span class="i-icon-park-outline-arrow-right ml-2 op-0 group-hover:op-100 transition-all duration-300 inline-block w-4 h-4"></span>
      </span>
    </li>
  </NuxtLink>
</template>

<style scoped>
.group:hover {
  border-color: var(--common-bd);
}
</style>