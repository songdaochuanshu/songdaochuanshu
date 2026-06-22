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

    <!-- Article -->
    <main class="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-4xl">
      <article v-if="post" class="bg-white rounded-2xl border border-[#e8e2d9] shadow-sm overflow-hidden">
        <!-- Article Header -->
        <header class="px-8 pt-10 pb-8 border-b border-[#f0ebe3]">
          <div class="flex items-center gap-3 mb-5">
            <span :class="['px-2.5 py-1 text-xs font-semibold rounded tracking-wide uppercase', getCategoryColor(post.category)]">
              {{ post.category }}
            </span>
            <span v-if="post.date" class="text-sm text-[#a8a29e]">
              {{ formatDate(post.date) }}
            </span>
          </div>
          <h1 class="text-2xl sm:text-3xl font-bold text-[#1c1917] leading-tight">
            {{ post.title }}
          </h1>
          <p v-if="post.description" class="mt-3 text-[#78716c] leading-relaxed">
            {{ post.description }}
          </p>
        </header>

        <!-- Loading -->
        <div v-if="loading" class="flex flex-col items-center justify-center py-20">
          <div class="w-8 h-8 border-2 border-[#e8e2d9] border-t-[#c2410c] rounded-full animate-spin"></div>
          <p class="mt-4 text-sm text-[#a8a29e]">加载中...</p>
        </div>

        <!-- Article Content -->
        <div v-else class="px-8 py-10 prose max-w-none">
          <div v-html="renderedContent"></div>
        </div>
      </article>

      <!-- Not Found -->
      <div v-else class="text-center py-20">
        <p class="text-[#a8a29e] text-lg">文章未找到</p>
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
const route = useRoute()
const slugParts = route.params.slug as string[]
const key = slugParts.join('/')

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
    blog: 'bg-sky-50 text-sky-700',
    life: 'bg-emerald-50 text-emerald-700',
    record: 'bg-amber-50 text-amber-700',
    root: 'bg-violet-50 text-violet-700',
  }
  return colors[category] || 'bg-stone-100 text-stone-600'
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
.prose h1 { font-size: 1.75rem; font-weight: 700; color: #1c1917; margin-bottom: 1rem; }
.prose h2 { font-size: 1.375rem; font-weight: 600; color: #1c1917; margin-top: 2rem; margin-bottom: 0.75rem; padding-bottom: 0.5rem; border-bottom: 1px solid #f0ebe3; }
.prose h3 { font-size: 1.125rem; font-weight: 600; color: #292524; margin-top: 1.5rem; margin-bottom: 0.5rem; }
.prose p { margin-bottom: 1rem; line-height: 1.8; color: #44403c; }
.prose a { color: #c2410c; text-decoration: underline; text-underline-offset: 2px; }
.prose a:hover { color: #9a3412; }
.prose code { background: #f7f4ef; padding: 0.125rem 0.375rem; border-radius: 0.25rem; font-size: 0.875rem; color: #c2410c; border: 1px solid #e8e2d9; }
.prose pre { background: #1c1917; padding: 1.25rem; border-radius: 0.75rem; overflow-x: auto; margin-bottom: 1rem; }
.prose pre code { background: none; color: #e7e5e4; padding: 0; border: none; font-size: 0.875rem; }
.prose blockquote { border-left: 3px solid #c2410c; padding-left: 1rem; color: #78716c; margin-bottom: 1rem; background: #fef9f7; padding-top: 0.5rem; padding-bottom: 0.5rem; border-radius: 0 0.375rem 0.375rem 0; }
.prose ul, .prose ol { margin-bottom: 1rem; padding-left: 1.5rem; color: #44403c; }
.prose li { margin-bottom: 0.375rem; line-height: 1.7; }
.prose img { max-width: 100%; border-radius: 0.75rem; }
.prose hr { border-color: #e8e2d9; margin: 2rem 0; }
.prose table { width: 100%; border-collapse: collapse; margin-bottom: 1rem; }
.prose th { background: #f7f4ef; padding: 0.5rem 0.75rem; text-align: left; font-weight: 600; border: 1px solid #e8e2d9; }
.prose td { padding: 0.5rem 0.75rem; border: 1px solid #e8e2d9; }
</style>
