<template>
  <div class="min-h-screen bg-[#f7f4ef] text-[#1c1917]">
    <!-- Top Nav -->
    <div class="bg-[#1c1917] border-b border-white/5">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <NuxtLink to="/" class="inline-flex items-center gap-2 py-4 text-sm text-[#a8a29e] hover:text-white transition-colors">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
          </svg>
          松岛川树
        </NuxtLink>
      </div>
    </div>

    <!-- Content -->
    <main class="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-3xl">
      <div v-if="loading" class="text-center py-20">
        <div class="w-8 h-8 border-2 border-[#e8e2d9] border-t-[#c2410c] rounded-full animate-spin mx-auto"></div>
        <p class="mt-4 text-sm text-[#a8a29e]">加载中...</p>
      </div>
      <article v-else-if="renderedContent" class="bg-white rounded-2xl border border-[#e8e2d9] shadow-sm px-8 py-10 prose max-w-none">
        <div v-html="renderedContent"></div>
      </article>
      <div v-else class="text-center py-20">
        <p class="text-[#a8a29e] text-lg">页面未找到</p>
        <NuxtLink to="/" class="mt-4 inline-block text-sm text-[#c2410c] hover:underline">返回首页</NuxtLink>
      </div>
    </main>

    <!-- Footer -->
    <footer class="border-t border-[#e8e2d9] bg-[#1c1917] mt-8">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <p class="text-center text-sm text-[#57534e]">
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
.prose h1 { font-size: 1.75rem; font-weight: 700; color: #1c1917; margin-bottom: 1rem; }
.prose h2 { font-size: 1.375rem; font-weight: 600; color: #1c1917; margin-top: 2rem; margin-bottom: 0.75rem; padding-bottom: 0.5rem; border-bottom: 1px solid #f0ebe3; }
.prose h3 { font-size: 1.125rem; font-weight: 600; color: #292524; margin-top: 1.5rem; margin-bottom: 0.5rem; }
.prose p { margin-bottom: 1rem; line-height: 1.8; color: #44403c; }
.prose a { color: #c2410c; text-decoration: underline; text-underline-offset: 2px; }
.prose a:hover { color: #9a3412; }
.prose img { max-width: 100%; border-radius: 0.75rem; }
.prose hr { border-color: #e8e2d9; margin: 2rem 0; }
.prose ul, .prose ol { margin-bottom: 1rem; padding-left: 1.5rem; color: #44403c; }
.prose li { margin-bottom: 0.375rem; line-height: 1.7; }
</style>
