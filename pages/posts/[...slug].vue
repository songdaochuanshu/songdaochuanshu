<template>
  <div class="min-h-screen bg-white text-gray-800 relative">
    <!-- Full-page background illustration -->
    <div class="fixed inset-0 z-0">
      <div
        class="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-700"
        :class="bgReady ? 'opacity-[0.12]' : 'opacity-0'"
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

      <!-- Article -->
      <main class="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-4xl">
        <article v-if="post" class="bg-white/70 backdrop-blur-sm rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <!-- Header -->
          <header class="px-8 pt-10 pb-8 border-b border-gray-50">
            <div class="flex items-center gap-3 mb-4">
              <span :class="['px-2 py-0.5 text-[10px] font-semibold rounded tracking-wide', getCategoryColor(post.category)]">
                {{ post.category }}
              </span>
              <span v-if="post.date" class="text-xs text-gray-400">{{ formatDate(post.date) }}</span>
            </div>
            <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">
              {{ post.title }}
            </h1>
            <p v-if="post.description" class="mt-3 text-sm text-gray-500 leading-relaxed">
              {{ post.description }}
            </p>
          </header>

          <!-- Loading -->
          <div v-if="loading" class="flex flex-col items-center justify-center py-20">
            <div class="w-6 h-6 border-2 border-gray-200 border-t-gray-600 rounded-full animate-spin"></div>
            <p class="mt-3 text-xs text-gray-400">加载中...</p>
          </div>

          <!-- Content -->
          <div v-else class="px-8 py-10 prose max-w-none">
            <div v-html="renderedContent"></div>
          </div>
        </article>

        <!-- Not Found -->
        <div v-else class="text-center py-20">
          <p class="text-gray-400 text-sm">文章未找到</p>
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
const route = useRoute()
const slugParts = route.params.slug as string[]
const key = slugParts.join('/')

const { bgImage, bgReady } = useRandomImages()

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
    blog: 'bg-sky-50 text-sky-600',
    life: 'bg-emerald-50 text-emerald-600',
    record: 'bg-amber-50 text-amber-600',
    root: 'bg-violet-50 text-violet-600',
  }
  return colors[category] || 'bg-gray-50 text-gray-500'
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
.prose h1 { font-size: 1.5rem; font-weight: 700; color: #111827; margin-bottom: 1rem; }
.prose h2 { font-size: 1.25rem; font-weight: 600; color: #111827; margin-top: 2rem; margin-bottom: 0.75rem; padding-bottom: 0.5rem; border-bottom: 1px solid #f3f4f6; }
.prose h3 { font-size: 1.125rem; font-weight: 600; color: #1f2937; margin-top: 1.5rem; margin-bottom: 0.5rem; }
.prose p { margin-bottom: 1rem; line-height: 1.8; color: #4b5563; font-size: 0.9375rem; }
.prose a { color: #374151; text-decoration: underline; text-underline-offset: 2px; }
.prose a:hover { color: #111827; }
.prose code { background: #f9fafb; padding: 0.125rem 0.375rem; border-radius: 0.25rem; font-size: 0.875rem; color: #374151; border: 1px solid #f3f4f6; }
.prose pre { background: #111827; padding: 1.25rem; border-radius: 0.5rem; overflow-x: auto; margin-bottom: 1rem; }
.prose pre code { background: none; color: #e5e7eb; padding: 0; border: none; font-size: 0.875rem; }
.prose blockquote { border-left: 3px solid #d1d5db; padding-left: 1rem; color: #6b7280; margin-bottom: 1rem; background: #f9fafb; padding-top: 0.5rem; padding-bottom: 0.5rem; border-radius: 0 0.375rem 0.375rem 0; }
.prose ul, .prose ol { margin-bottom: 1rem; padding-left: 1.5rem; color: #4b5563; }
.prose li { margin-bottom: 0.375rem; line-height: 1.7; font-size: 0.9375rem; }
.prose img { max-width: 100%; border-radius: 0.75rem; }
.prose hr { border-color: #f3f4f6; margin: 2rem 0; }
.prose table { width: 100%; border-collapse: collapse; margin-bottom: 1rem; }
.prose th { background: #f9fafb; padding: 0.5rem 0.75rem; text-align: left; font-weight: 600; border: 1px solid #f3f4f6; font-size: 0.875rem; }
.prose td { padding: 0.5rem 0.75rem; border: 1px solid #f3f4f6; font-size: 0.875rem; }
</style>
