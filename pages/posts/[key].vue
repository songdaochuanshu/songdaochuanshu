<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
    <header class="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
      <div class="container mx-auto px-4 py-6">
        <NuxtLink to="/" class="text-blue-600 dark:text-blue-400 hover:underline">← 返回首页</NuxtLink>
      </div>
    </header>

    <main class="container mx-auto px-4 py-8 max-w-4xl">
      <article v-if="post" class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 border border-gray-200 dark:border-gray-700">
        <div class="mb-6">
          <div class="flex items-center gap-3 mb-4">
            <span class="px-3 py-1 text-sm font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full">
              {{ post.category }}
            </span>
            <span v-if="post.date" class="text-sm text-gray-500 dark:text-gray-400">
              {{ formatDate(post.date) }}
            </span>
          </div>
          <h1 class="text-3xl font-bold text-gray-900 dark:text-white">{{ post.title }}</h1>
        </div>

        <div v-if="loading" class="text-center py-12">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p class="mt-4 text-gray-600 dark:text-gray-400">加载中...</p>
        </div>

        <div v-else class="prose prose-lg dark:prose-invert max-w-none" v-html="renderedContent"></div>
      </article>

      <div v-else class="text-center py-12">
        <p class="text-gray-600 dark:text-gray-400">文章未找到</p>
        <NuxtLink to="/" class="mt-4 inline-block text-blue-600 dark:text-blue-400 hover:underline">返回首页</NuxtLink>
      </div>
    </main>
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
