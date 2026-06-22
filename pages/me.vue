<template>
  <div class="min-h-screen bg-[#fafafa] text-[#1a1a1a]">
    <!-- Back Button Bar -->
    <div class="border-b border-gray-100 bg-white">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <NuxtLink to="/" class="inline-flex items-center gap-2 py-4 text-sm text-gray-500 hover:text-gray-900 transition-colors">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
          </svg>
          返回首页
        </NuxtLink>
      </div>
    </div>

    <!-- Content -->
    <main class="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-3xl">
      <article v-if="!loading" class="prose prose-gray max-w-none">
        <div v-html="renderedContent"></div>
      </article>
      <div v-else-if="loading" class="text-center py-20">
        <p class="text-gray-400">加载中...</p>
      </div>
      <div v-else class="text-center py-20">
        <p class="text-gray-400 text-lg">页面未找到</p>
        <NuxtLink to="/" class="mt-4 inline-block text-sm text-blue-600 hover:underline">返回首页</NuxtLink>
      </div>
    </main>

    <!-- Footer -->
    <footer class="border-t border-gray-100 bg-white">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <p class="text-center text-xs text-gray-400">
          © 2026 松岛川树
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { marked } from 'marked'

const BASE_URL = 'https://blog-static.openserve.cloud'

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
.prose h1 { font-size: 1.875rem; font-weight: 700; color: #111827; margin-bottom: 1rem; }
.prose h2 { font-size: 1.5rem; font-weight: 600; color: #111827; margin-top: 2rem; margin-bottom: 0.75rem; }
.prose h3 { font-size: 1.25rem; font-weight: 600; color: #1f2937; margin-top: 1.5rem; margin-bottom: 0.5rem; }
.prose p { margin-bottom: 1rem; line-height: 1.75; }
.prose a { color: #2563eb; text-decoration: underline; }
.prose a:hover { color: #1d4ed8; }
.prose img { max-width: 100%; border-radius: 0.5rem; }
.prose hr { border-color: #e5e7eb; margin: 2rem 0; }
</style>
