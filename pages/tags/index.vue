<script setup lang="ts">
import { getAllTags } from '@/utils/r2'

const { data: tagsContent } = await useAsyncData('all-tags', () => getAllTags())

useHead({ title: '标签' })
</script>

<template>
  <div>
    <h1 class="text-title mb-2em font-bold">Tags</h1>
    <ul class="flex gap-1em flex-wrap">
      <li
        v-for="(value, key, index) in tagsContent"
        :key="key"
        slide-enter
        :style="{ '--stagger': index + 1 }"
        class="px-2 bg-gray-400:20 rd-1"
      >
        <NuxtLink :to="`/tags/${key}`" class="flex gap-2">
          <span class="hover">#{{ key }}</span>
          <span>{{ value }}</span>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>