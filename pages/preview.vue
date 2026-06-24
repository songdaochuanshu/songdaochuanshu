<template>
  <div class="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200">
    <div class="border-b border-gray-100 dark:border-gray-800 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <NuxtLink to="/" class="inline-flex items-center gap-2 py-4 text-xs text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
          </svg>
          松岛川树
        </NuxtLink>
        <span class="px-2 py-0.5 text-[10px] font-semibold rounded bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400">
          草稿预览
        </span>
      </div>
    </div>

    <main class="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-3xl">
      <div v-if="loading" class="text-center py-20">
        <div class="w-6 h-6 border-2 border-gray-200 dark:border-gray-700 border-t-gray-600 dark:border-t-gray-300 rounded-full animate-spin mx-auto"></div>
        <p class="mt-3 text-xs text-gray-400 dark:text-gray-500">加载中...</p>
      </div>

      <div v-else-if="error" class="text-center py-20">
        <p class="text-sm text-red-400">{{ error }}</p>
        <p class="text-xs text-gray-400 dark:text-gray-500 mt-2">请检查 key 参数是否正确</p>
      </div>

      <article v-else class="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
        <header class="px-8 pt-10 pb-8 border-b border-gray-50 dark:border-gray-800">
          <h1 class="text-2xl font-bold text-gray-900 dark:text-white">{{ title }}</h1>
          <p v-if="description" class="mt-2 text-sm text-gray-500 dark:text-gray-400">{{ description }}</p>
        </header>
        <div class="px-8 py-10 prose max-w-none" v-html="content"></div>
      </article>
    </main>
  </div>
</template>

<script setup lang="ts">
import { marked } from 'marked'

const BASE_URL = 'https://blog-static.openserve.cloud'
const route = useRoute()
const key = route.query.key as string

const loading = ref(true)
const error = ref('')
const content = ref('')
const title = ref('')
const description = ref('')

onMounted(async () => {
  if (!key) {
    error.value = '缺少 key 参数'
    loading.value = false
    return
  }

  try {
    const resp = await $fetch<string>(`${BASE_URL}/${key}`)
    let markdown = resp

    const yamlMatch = resp.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
    if (yamlMatch) {
      const [, yamlBlock, md] = yamlMatch
      markdown = md
      yamlBlock.split('\n').forEach(line => {
        const colonIdx = line.indexOf(':')
        if (colonIdx > 0) {
          const k = line.slice(0, colonIdx).trim()
          const v = line.slice(colonIdx + 1).trim()
          if (k === 'title') title.value = v
          if (k === 'description') description.value = v
        }
      })
    }

    if (!title.value) title.value = key

    let html = marked(markdown) as string
    html = html.replace(/<img /g, '<img loading="lazy" decoding="async" ')

    const headingRegex = /<h([23])([^>]*)>(.*?)<\/h[23]>/gi
    content.value = html.replace(headingRegex, (match, level, attrs, text) => {
      const plainText = text.replace(/<[^>]*>/g, '').trim()
      const id = plainText.toLowerCase().replace(/[^\w\u4e00-\u9fff]+/g, '-').replace(/^-|-$/g, '')
      return `<h${level}${attrs} id="${id}">${text}</h${level}>`
    })
  } catch (e: any) {
    error.value = e.message || '加载失败'
  } finally {
    loading.value = false
  }
})
</script>
