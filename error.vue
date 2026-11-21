<template>
  <div class="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 flex items-center justify-center relative">
    <div class="text-center">
      <p class="text-6xl font-bold text-gray-900 dark:text-white">{{ statusCode }}</p>
      <p class="mt-4 text-sm text-gray-500 dark:text-gray-400">{{ message }}</p>
      <NuxtLink to="/" class="mt-6 inline-flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">回到首页</NuxtLink>
    </div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps<{ error: { statusCode?: number; statusMessage?: string; message?: string } }>()
const statusCode = computed(() => props.error?.statusCode || 500)
const message = computed(() => {
  if (statusCode.value === 404) return '页面走丢了，或者从来不存在'
  if (statusCode.value >= 500) return '服务器暂时遇到问题，请稍后再试'
  return props.error?.statusMessage || props.error?.message || '页面加载失败'
})
useHead(() => ({ title: `${statusCode.value} - 松岛川树` }))
</script>
