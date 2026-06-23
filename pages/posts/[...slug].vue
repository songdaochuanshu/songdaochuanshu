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
      <main class="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-5xl">
        <div v-if="post" class="flex gap-8">
          <!-- TOC Sidebar -->
          <aside v-if="tocItems.length > 0" class="hidden lg:block w-56 flex-shrink-0">
            <nav class="sticky top-20">
              <p class="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-3">目录</p>
              <ul class="space-y-1.5">
                <li
                  v-for="item in tocItems"
                  :key="item.id"
                  :class="[
                    'block text-xs leading-relaxed transition-colors cursor-pointer hover:text-gray-900',
                    item.level === 3 ? 'pl-3' : '',
                    activeTocId === item.id ? 'text-gray-900 font-medium' : 'text-gray-400'
                  ]"
                  @click="scrollToHeading(item.id)"
                >
                  {{ item.text }}
                </li>
              </ul>
            </nav>
          </aside>

          <!-- Main Article -->
          <article class="bg-white/70 backdrop-blur-sm rounded-xl border border-gray-100 shadow-sm overflow-hidden flex-1 min-w-0">
          <!-- Header -->
          <header class="px-8 pt-10 pb-8 border-b border-gray-50">
            <div class="flex items-center gap-3 mb-4">
              <span :class="['px-2 py-0.5 text-[10px] font-semibold rounded tracking-wide', getCategoryColor(post.category)]">
                {{ post.category }}
              </span>
              <span v-if="post.date" class="text-xs text-gray-400">{{ formatDate(post.date) }}</span>
              <span class="text-xs text-gray-300">· {{ readingTime }}</span>
            </div>
            <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">
              {{ post.title }}
            </h1>
            <p v-if="post.description" class="mt-3 text-sm text-gray-500 leading-relaxed">
              {{ post.description }}
            </p>
            <!-- Tags -->
            <div v-if="post.tags?.length" class="flex flex-wrap gap-1.5 mt-4">
              <span
                v-for="tag in post.tags"
                :key="tag"
                class="px-2 py-0.5 text-[10px] text-gray-500 bg-gray-50 rounded-full"
              >
                #{{ tag }}
              </span>
            </div>
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
        </div>

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
const tocItems = ref<{ id: string; text: string; level: number }[]>([])
const activeTocId = ref('')

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

const readingTime = computed(() => {
  const text = renderedContent.value.replace(/<[^>]*>/g, '')
  const chars = text.length
  const minutes = Math.max(1, Math.round(chars / 500))
  return `约 ${minutes} 分钟`
})

function extractToc(html: string) {
  const items: { id: string; text: string; level: number }[] = []
  const regex = /<h([23])[^>]*>(.*?)<\/h[23]>/gi
  let match
  while ((match = regex.exec(html)) !== null) {
    const level = parseInt(match[1])
    const rawText = match[2].replace(/<[^>]*>/g, '').trim()
    const id = rawText
      .toLowerCase()
      .replace(/[^\w\u4e00-\u9fff]+/g, '-')
      .replace(/^-|-$/g, '')
    items.push({ id, text: rawText, level })
  }
  return items
}

function scrollToHeading(id: string) {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

let scrollHandler: (() => void) | null = null

function setupScrollTracking() {
  if (!import.meta.client || tocItems.value.length === 0) return
  scrollHandler = () => {
    const headings = tocItems.value
      .map(item => document.getElementById(item.id))
      .filter(Boolean) as HTMLElement[]
    let current = ''
    for (const el of headings) {
      if (el.getBoundingClientRect().top <= 100) {
        current = el.id
      }
    }
    activeTocId.value = current
  }
  window.addEventListener('scroll', scrollHandler, { passive: true })
}

async function loadPost() {
  try {
    const manifestResp = await $fetch(`${BASE_URL}/manifest.json`)
    const found = manifestResp.posts.find((p: PostMeta) => p.key === key)

    if (found) {
      post.value = found
      const contentResp = await $fetch(`${BASE_URL}/${key}`)

      let markdown = contentResp
      const yamlMatch = contentResp.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
      if (yamlMatch) {
        const [, yamlBlock, md] = yamlMatch
        markdown = md
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
      }

      const html = marked(markdown)
      renderedContent.value = html

      const headingRegex = /<h([23])([^>]*)>(.*?)<\/h[23]>/gi
      renderedContent.value = html.replace(headingRegex, (match, level, attrs, text) => {
        const plainText = text.replace(/<[^>]*>/g, '').trim()
        const id = plainText
          .toLowerCase()
          .replace(/[^\w\u4e00-\u9fff]+/g, '-')
          .replace(/^-|-$/g, '')
        return `<h${level}${attrs} id="${id}">${text}</h${level}>`
      })

      tocItems.value = extractToc(html)
      nextTick(() => setupScrollTracking())
    }
  } catch (error) {
    console.error('Failed to load post:', error)
  } finally {
    loading.value = false
  }
}

await loadPost()

onUnmounted(() => {
  if (scrollHandler) window.removeEventListener('scroll', scrollHandler)
})
</script>

<style>
.prose h1 { font-size: 1.5rem; font-weight: 700; color: #111827; margin-bottom: 1rem; }
.prose h2 { font-size: 1.25rem; font-weight: 600; color: #111827; margin-top: 2rem; margin-bottom: 0.75rem; padding-bottom: 0.5rem; border-bottom: 1px solid #f3f4f6; }
.prose h3 { font-size: 1.125rem; font-weight: 600; color: #111827; margin-top: 1.5rem; margin-bottom: 0.5rem; }
.prose p { line-height: 1.8; margin-bottom: 1rem; color: #374151; }
.prose a { color: #2563eb; text-decoration: underline; text-underline-offset: 2px; }
.prose a:hover { color: #1d4ed8; }
.prose code { background: #f3f4f6; padding: 0.15rem 0.4rem; border-radius: 0.25rem; font-size: 0.875em; color: #e11d48; }
.prose pre { background: #1e293b; color: #e2e8f0; padding: 1rem; border-radius: 0.5rem; overflow-x: auto; margin: 1.5rem 0; font-size: 0.875rem; line-height: 1.7; }
.prose pre code { background: transparent; color: inherit; padding: 0; }
.prose blockquote { border-left: 3px solid #e5e7eb; padding-left: 1rem; color: #6b7280; margin: 1.5rem 0; font-style: italic; }
.prose ul, .prose ol { padding-left: 1.5rem; margin-bottom: 1rem; }
.prose li { margin-bottom: 0.25rem; line-height: 1.7; color: #374151; }
.prose img { max-width: 100%; border-radius: 0.5rem; margin: 1.5rem 0; }
.prose table { width: 100%; border-collapse: collapse; margin: 1.5rem 0; font-size: 0.875rem; }
.prose th, .prose td { border: 1px solid #e5e7eb; padding: 0.5rem 0.75rem; text-align: left; }
.prose th { background: #f9fafb; font-weight: 600; }
.prose hr { border: none; border-top: 1px solid #e5e7eb; margin: 2rem 0; }
</style>