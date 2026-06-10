<script setup lang="ts">
import { formattedDate } from '@/utils'

interface Article {
  _path: string
  title: string
  date: string
  description?: string
  tags?: string[]
  readingTime?: string
}

const { article } = defineProps<{ article: Article }>()
</script>

<template>
  <NuxtLink
    :to="`/p${article._path}`"
    class="group block p-5 rounded-2xl mb-4 transition-all duration-300 hover-lift glass-card relative overflow-hidden"
  >
    <!-- Decorative element -->
    <div class="absolute top-3 right-4 text-sm opacity-0 group-hover:opacity-30 transition-all duration-500 pointer-events-none select-none group-hover:rotate-12">
      ✦
    </div>

    <li :title="article.title" class="grid grid-cols-6 gap-3 items-center list-none">
      <!-- Title -->
      <span class="col-span-6 sm:col-span-4 text-lg font-medium truncate text-ellipsis overflow-hidden text-[var(--primary)] group-hover:text-[#4a7c6f] dark:group-hover:text-[#8fc4ab] transition-colors duration-300">
        {{ article.title }}
      </span>

      <!-- Spacer -->
      <span class="hidden sm:block sm:col-span-1" />

      <!-- Date & Arrow -->
      <span class="col-span-6 sm:col-span-1 text-sm text-[var(--text-secondary)] group-hover:text-[#4a7c6f] dark:group-hover:text-[#8fc4ab] transition-colors duration-300 flex items-center gap-1 justify-end sm:justify-start">
        {{ formattedDate(article.date) }}
        <span class="i-icon-park-outline-arrow-right ml-1 opacity-0 group-hover:opacity-100 transition-all duration-300 inline-block w-4 h-4 group-hover:translate-x-1" />
      </span>
    </li>

    <!-- Description (optional) -->
    <p v-if="article.description" class="mt-2 text-sm text-[var(--text-secondary)] line-clamp-1 opacity-0 group-hover:opacity-70 transition-opacity duration-300">
      {{ article.description }}
    </p>

    <!-- Bottom gradient line -->
    <div class="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#4a7c6f] via-[#6b9e8a] to-[#8fc4ab] opacity-0 group-hover:opacity-60 transition-opacity duration-300" />
  </NuxtLink>
</template>

<style scoped>
.group:hover {
  border-color: var(--common-bd);
  box-shadow: var(--shadow-soft);
}

.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
