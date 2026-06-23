<template>
  <div class="min-h-screen bg-white text-gray-800 relative">
    <!-- Full-page background illustration -->
    <div class="fixed inset-0 z-0">
      <div
        class="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.06]"
        :style="{ backgroundImage: `url(${bgImage})` }"
      ></div>
    </div>

    <div class="relative z-10">
      <!-- Nav -->
      <div class="border-b border-gray-100 bg-white/90 backdrop-blur-sm">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
          <NuxtLink to="/" class="inline-flex items-center gap-2 py-4 text-xs text-gray-400 hover:text-gray-900 transition-colors">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
            </svg>
            松岛川树
          </NuxtLink>
        </div>
      </div>

      <!-- Content -->
      <main class="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-3xl">
        <div v-if="loading" class="text-center py-20">
          <div class="w-6 h-6 border-2 border-gray-200 border-t-gray-600 rounded-full animate-spin mx-auto"></div>
          <p class="mt-3 text-xs text-gray-400">加载中...</p>
        </div>
        <article v-else-if="renderedContent" class="bg-white rounded-xl border border-gray-100 shadow-sm px-8 py-10 prose max-w-none">
          <div v-html="renderedContent"></div>
        </article>
        <div v-else class="text-center py-20">
          <p class="text-gray-400 text-sm">页面未找到</p>
          <NuxtLink to="/" class="mt-3 inline-block text-xs text-gray-500 hover:text-gray-900 transition-colors">返回首页</NuxtLink>
        </div>
      </main>

      <!-- Footer -->
      <footer class="border-t border-gray-100 mt-16">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p class="text-center text-xs text-gray-400">© 2026 松岛川树</p>
        </div>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { marked } from 'marked'

const BASE_URL = 'https://blog-static.openserve.cloud'
const { bgImage } = useRandomImages()

const loading = ref(true)
const renderedContent = ref('')

async function loadMe() {
  try {
    const content = await $fetch(`${BASE_URL}/me.md`)
    renderedContent.value = marked(content)
  } catch (error) {
    console.error('Failed to load me page:', error)
  } finally {
    loading.value = false
  }
}

await loadMe()
</script>

<style>
.prose h1 { font-size: 1.5rem; font-weight: 700; color: #111827; margin-bottom: 1rem; }
.prose h2 { font-size: 1.25rem; font-weight: 600; color: #111827; margin-top: 2rem; margin-bottom: 0.75rem; padding-bottom: 0.5rem; border-bottom: 1px solid #f3f4f6; }
.prose h3 { font-size: 1.125rem; font-weight: 600; color: #1f2937; margin-top: 1.5rem; margin-bottom: 0.5rem; }
.prose p { margin-bottom: 1rem; line-height: 1.8; color: #4b5563; font-size: 0.9375rem; }
.prose a { color: #374151; text-decoration: underline; text-underline-offset: 2px; }
.prose a:hover { color: #111827; }
.prose img { max-width: 100%; border-radius: 0.75rem; }
.prose hr { border-color: #f3f4f6; margin: 2rem 0; }
.prose ul, .prose ol { margin-bottom: 1rem; padding-left: 1.5rem; color: #4b5563; }
.prose li { margin-bottom: 0.375rem; line-height: 1.7; font-size: 0.9375rem; }
</style>
