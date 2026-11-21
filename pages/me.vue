<template>
  <div class="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 relative">
    <div class="fixed inset-0 z-0"><div class="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-700" :class="bgReady ? 'opacity-[0.06] dark:opacity-[0.04]' : 'opacity-0'" :style="{ backgroundImage: `url(${bgImage})` }"></div></div>
    <div class="relative z-10">
      <PageNav />
      <main class="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-3xl">
        <div v-if="loading" class="text-center py-20"><div class="w-6 h-6 border-2 border-gray-200 dark:border-gray-700 border-t-gray-600 dark:border-t-gray-300 rounded-full animate-spin mx-auto"></div></div>
        <div v-else-if="contentError" class="text-center py-20"><p class="text-gray-500 dark:text-gray-400 text-sm">关于页面加载失败，请稍后重试</p><button type="button" @click="loadMe" class="mt-4 text-xs text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white">重试</button></div>
        <article v-else-if="renderedContent" class="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm px-8 py-10 prose max-w-none"><div v-html="renderedContent"></div></article>
      </main>
      <PageFooter />
    </div>
    <BackToTop />
  </div>
</template>

<script setup lang="ts">
import { marked } from 'marked'
const BASE_URL = '/api/content'
const { bgImage, bgReady } = useRandomImages()
const loading = ref(true)
const renderedContent = ref('')
const contentError = ref(false)
const stats = ref<Partial<{ years: number; commits: number; issues: number; pullRequests: number; stars: number }>>({})

async function fetchGitHubStats() {
  try { stats.value = await $fetch('/api/github-stats') }
  catch (cause) { console.error('获取 GitHub 统计失败:', cause) }
}

function applyStats(markdown: string) {
  const replacements: Record<string, number | undefined> = {
    'years': stats.value.years, 'commits': stats.value.commits, 'issues opened': stats.value.issues,
    'pull requests submitted': stats.value.pullRequests, 'stars across': stats.value.stars,
  }
  let result = markdown
  for (const [label, value] of Object.entries(replacements)) {
    const pattern = new RegExp(`\\*\\*\\d+\\*\\* ${label}`, 'g')
    result = result.replace(pattern, value === undefined ? `${label} (暂不可用)` : `**${value}** ${label}`)
  }
  return result
}

async function loadMe() {
  loading.value = true
  contentError.value = false
  try {
    const content = await $fetch<string>(`${BASE_URL}/me.md`)
    renderedContent.value = marked(applyStats(content))
  } catch (cause) {
    contentError.value = true
    console.error('加载关于页面失败:', cause)
  } finally { loading.value = false }
}

onMounted(async () => {
  await Promise.all([loadMe(), fetchGitHubStats()])
  if (renderedContent.value) {
    const content = await $fetch<string>(`${BASE_URL}/me.md`).catch(() => '')
    if (content) renderedContent.value = marked(applyStats(content))
  }
})
</script>
