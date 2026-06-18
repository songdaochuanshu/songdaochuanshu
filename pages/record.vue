<script setup lang="ts">
import { getPostsByCategory } from '@/utils/r2'

const { data: posts } = await useAsyncData('record-list', () => getPostsByCategory('record'))

useHead({ title: '记录' })
</script>

<template>
  <div>
    <sub-nav />
    <h1 class="text-title mb-2em font-bold">记录</h1>
    <p v-if="!posts || posts.length === 0" class="op-50">暂无内容</p>
    <ul v-else class="post-list">
      <li v-for="post in posts" :key="post.path">
        <NuxtLink :to="post.path" class="cell-link block py-3 border-b border-[var(--border-subtle)]">
          <div class="flex items-baseline gap-3">
            <span class="text-sm op-50">{{ post.date?.slice(0, 10) }}</span>
            <span class="font-medium">{{ post.title }}</span>
          </div>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>