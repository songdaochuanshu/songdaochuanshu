<template>
  <div class="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 flex items-center justify-center relative">
    <div class="text-center">
      <p class="text-6xl font-bold text-gray-900 dark:text-white">404</p>
      <p class="mt-4 text-sm text-gray-500 dark:text-gray-400">页面走丢了，或者从来不存在</p>
      <NuxtLink to="/" class="mt-6 inline-flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
        </svg>
        回到首页
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  error: Object
})

useHead({ title: '404 - 松岛川树' })
</script>
