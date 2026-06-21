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

    <!-- Article -->
    <main class="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-4xl">
      <article v-if="post" class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <!-- Article Header -->
        <header class="px-8 pt-8 pb-6 border-b border-gray-50">
          <div class="flex items-center gap-3 mb-4">
            <span
              :class="[
                'px-3 py-1 text-xs font-medium rounded-md',
                getCategoryColor(post.category)
              ]"
            >
              {{ post.category }}
            </span>
            <span v-if="post.date" class="text-sm text-gray-400">
              {{ formatDate(post.date) }}
            </span>
          </div>
          <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">
            {{ post.title }}
          </h1>
        </header>

        <!-- Loading -->
        <div v-if="loading" class="flex flex-col items-center justify-center py-20">
          <div class="w-8 h-8 border-2 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
          <p class="mt-4 text-sm text-gray-400">加载中...</p>
        </div>

        <!-- Article Content -->
        <div v-else class="px-8 py-8 prose prose-gray max-w-none">
          <div v-html="renderedContent" class="text-gray-700 leading-relaxed space-y-4"></div>
        </div>
      </article>

      <!-- Not Found -->
      <div v-else class="text-center py-20">
        <p class="text-gray-400 text-lg">文章未找到</p>
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
const route = useRoute()
const key = route.params.key as string

interface PostMeta {
  path: string
  key: string
  category: string
  title: string
  date: string | null
  description: string
  tags: string[]
  layout: string
}

const post = ref<PostMeta | null>(null)
const loading = ref(true)
const renderedContent = ref('')

function formatDate(dateStr: string): string {
  if (!dateStr) return ''
  try {
    const date = new Date(dateStr)
    return date.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' })
  } catch {
    return dateStr
  }
}

function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    blog: 'bg-blue-50 text-blue-700',
    life: 'bg-green-50 text-green-700',
    record: 'bg-amber-50 text-amber-700',
    root: 'bg-purple-50 text-purple-700',
  }
  return colors[category] || 'bg-gray-100 text-gray-600'
}

async function loadPost() {
  try {
    const manifestResp = await $fetch(`${BASE_URL}/manifest.json`)
    const found = manifestResp.posts.find((p: PostMeta) => p.key === key)
    
    if (found) {
      post.value = found
      
      const contentResp = await $fetch(`${BASE_URL}/${key}`)
      
      const yamlMatch = contentResp.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
      if (yamlMatch) {
        const [, yamlBlock, markdown] = yamlMatch
        const yamlObj: Record<string, string> = {}
        yamlBlock.split('\n').forEach(line => {
          const colonIdx = line.indexOf(':')
          if (colonIdx > 0) {
            const k = line.slice(0, colonIdx).trim()
            const v = line.slice(colonIdx + 1).trim()
            yamlObj[k] = v
          }
        })
        
        if (yamlObj.title) found.title = yamlObj.title
        if (yamlObj.date) found.date = yamlObj.date
        if (yamlObj.description) found.description = yamlObj.description
        
        renderedContent.value = marked(markdown)
      } else {
        renderedContent.value = marked(contentResp)
      }
    }
  } catch (error) {
    console.error('Failed to load post:', error)
  } finally {
    loading.value = false
  }
}

await loadPost()
</script>

<style>
.prose h1 { font-size: 1.875rem; font-weight: 700; color: #111827; margin-bottom: 1rem; }
.prose h2 { font-size: 1.5rem; font-weight: 600; color: #111827; margin-top: 2rem; margin-bottom: 0.75rem; }
.prose h3 { font-size: 1.25rem; font-weight: 600; color: #1f2937; margin-top: 1.5rem; margin-bottom: 0.5rem; }
.prose p { margin-bottom: 1rem; line-height: 1.75; }
.prose a { color: #2563eb; text-decoration: underline; }
.prose a:hover { color: #1d4ed8; }
.prose code { background: #f3f4f6; padding: 0.125rem 0.375rem; border-radius: 0.25rem; font-size: 0.875rem; color: #111827; }
.prose pre { background: #111827; padding: 1rem; border-radius: 0.5rem; overflow-x: auto; margin-bottom: 1rem; }
.prose pre code { background: none; color: #e5e7eb; padding: 0; }
.prose blockquote { border-left: 3px solid #e5e7eb; padding-left: 1rem; color: #6b7280; margin-bottom: 1rem; }
.prose ul, .prose ol { margin-bottom: 1rem; padding-left: 1.5rem; }
.prose li { margin-bottom: 0.25rem; }
.prose img { max-width: 100%; border-radius: 0.5rem; }
.prose hr { border-color: #e5e7eb; margin: 2rem 0; }
</style>
