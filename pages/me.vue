<template>
  <div class="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 relative">
    <!-- Full-page background illustration -->
    <div class="fixed inset-0 z-0">
      <div
        class="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-700"
        :class="bgReady ? 'opacity-[0.06] dark:opacity-[0.04]' : 'opacity-0'"
        :style="{ backgroundImage: `url(${bgImage})` }"
      ></div>
    </div>

    <div class="relative z-10">
      <!-- Nav -->
      <div class="border-b border-gray-100 dark:border-gray-800 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <NuxtLink to="/" class="inline-flex items-center gap-2 py-4 text-xs text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
            </svg>
            松岛川树
          </NuxtLink>
          <ThemeToggle />
        </div>
      </div>

      <!-- Content -->
      <main class="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-3xl">
        <div v-if="loading" class="text-center py-20">
          <div class="w-6 h-6 border-2 border-gray-200 dark:border-gray-700 border-t-gray-600 dark:border-t-gray-300 rounded-full animate-spin mx-auto"></div>
          <p class="mt-3 text-xs text-gray-400 dark:text-gray-500">加载中...</p>
        </div>
        <article v-else-if="renderedContent" class="bg-white dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm px-8 py-10 prose max-w-none">
          <div v-html="renderedContent"></div>
        </article>
        <div v-else class="text-center py-20">
          <p class="text-gray-400 dark:text-gray-500 text-sm">页面未找到</p>
          <NuxtLink to="/" class="mt-3 inline-block text-xs text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">返回首页</NuxtLink>
        </div>
      </main>

      <!-- Footer -->
      <footer class="border-t border-gray-100 dark:border-gray-800 mt-16">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p class="text-center text-xs text-gray-400 dark:text-gray-500">© 2026 松岛川树</p>
        </div>
      </footer>
    </div>

    <BackToTop />
  </div>
</template>

<script setup lang="ts">
import { marked } from 'marked'

const BASE_URL = 'https://blog-static.openserve.cloud'
const { bgImage, bgReady } = useRandomImages()

const loading = ref(true)
const renderedContent = ref('')

async function loadMe() {
  try {
    const content = await $fetch<string>(`${BASE_URL}/me.md`)
    renderedContent.value = marked(content)
  } catch (error) {
    console.error('Failed to load me page:', error)
  } finally {
    loading.value = false
  }
}

await loadMe()
</script>
