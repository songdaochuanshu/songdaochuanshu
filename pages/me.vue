<template>
  <div class="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 relative">
    <div class="fixed inset-0 z-0">
      <div class="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-700" :class="bgReady ? 'opacity-[0.06] dark:opacity-[0.04]' : 'opacity-0'" :style="{ backgroundImage: `url(${bgImage})` }"></div>
    </div>
    <div class="relative z-10">
      <PageNav />

      <main class="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-3xl">
        <!-- GitHub 实时数据卡片 -->
        <div v-if="githubData" class="mb-8 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm p-6">
          <div class="flex items-center gap-4 mb-4">
            <img :src="githubData.avatar_url" :alt="githubData.name" class="w-16 h-16 rounded-full" />
            <div>
              <h2 class="text-lg font-bold text-gray-900 dark:text-white">{{ githubData.name }}</h2>
              <a :href="githubData.html_url" target="_blank" rel="noopener" class="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">@{{ githubData.login }}</a>
              <p v-if="githubData.bio" class="text-xs text-gray-400 dark:text-gray-500 mt-1">{{ githubData.bio }}</p>
            </div>
          </div>
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div class="text-center p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50">
              <div class="text-xl font-bold text-gray-900 dark:text-white">{{ githubData.public_repos }}</div>
              <div class="text-[10px] text-gray-400 dark:text-gray-500">仓库</div>
            </div>
            <div class="text-center p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50">
              <div class="text-xl font-bold text-gray-900 dark:text-white">{{ githubData.followers }}</div>
              <div class="text-[10px] text-gray-400 dark:text-gray-500">粉丝</div>
            </div>
            <div class="text-center p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50">
              <div class="text-xl font-bold text-gray-900 dark:text-white">{{ githubData.following }}</div>
              <div class="text-[10px] text-gray-400 dark:text-gray-500">关注</div>
            </div>
            <div class="text-center p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50">
              <div class="text-xl font-bold text-gray-900 dark:text-white">{{ totalStars }}</div>
              <div class="text-[10px] text-gray-400 dark:text-gray-500">Star</div>
            </div>
          </div>
          <div class="flex flex-wrap gap-3 mt-4 text-xs text-gray-400 dark:text-gray-500">
            <span v-if="githubData.location">📍 {{ githubData.location }}</span>
            <span v-if="githubData.company">🏢 {{ githubData.company }}</span>
            <span v-if="githubData.blog">🔗 <a :href="githubData.blog.startsWith('http') ? githubData.blog : `https://${githubData.blog}`" target="_blank" rel="noopener" class="hover:text-gray-900 dark:hover:text-white transition-colors">{{ githubData.blog }}</a></span>
            <span v-if="githubData.twitter_username">🐦 <a :href="`https://twitter.com/${githubData.twitter_username}`" target="_blank" rel="noopener" class="hover:text-gray-900 dark:hover:text-white transition-colors">@{{ githubData.twitter_username }}</a></span>
          </div>
        </div>

        <!-- 在线时长 -->
        <div class="mb-8 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm p-6">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="relative flex h-2.5 w-2.5">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
              </span>
              <span class="text-xs text-gray-500 dark:text-gray-400">在线时长</span>
            </div>
            <span class="text-sm font-mono text-gray-700 dark:text-gray-300">{{ onlineDuration }}</span>
          </div>
        </div>

        <!-- Markdown 内容 -->
        <div v-if="loading" class="text-center py-20">
          <div class="w-6 h-6 border-2 border-gray-200 dark:border-gray-700 border-t-gray-600 dark:border-t-gray-300 rounded-full animate-spin mx-auto"></div>
          <p class="mt-3 text-xs text-gray-400 dark:text-gray-500">加载中...</p>
        </div>
        <article v-else-if="renderedContent" class="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm px-8 py-10 prose max-w-none">
          <div v-html="renderedContent"></div>
        </article>
        <div v-else class="text-center py-20">
          <p class="text-gray-400 dark:text-gray-500 text-sm">页面未找到</p>
          <NuxtLink to="/" class="mt-3 inline-block text-xs text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">返回首页</NuxtLink>
        </div>
      </main>

      <PageFooter />
    </div>
    <BackToTop />
  </div>
</template>

<script setup lang="ts">
import { marked } from 'marked'

const BASE_URL = 'https://blog-static.openserve.cloud'
const { bgImage, bgReady } = useRandomImages()

const loading = ref(true)
const renderedContent = ref('')
const githubData = ref<any>(null)
const totalStars = ref(0)
const onlineDuration = ref('00:00:00')
let timer: ReturnType<typeof setInterval> | null = null
const startTime = Date.now()

function formatDuration(ms: number): string {
  const seconds = Math.floor(ms / 1000)
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = seconds % 60
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

function startTimer() {
  timer = setInterval(() => {
    onlineDuration.value = formatDuration(Date.now() - startTime)
  }, 1000)
}

async function fetchGitHubData() {
  try {
    const [userResp, reposResp] = await Promise.all([
      $fetch<any>('https://api.github.com/users/songdaochuanshu'),
      $fetch<any[]>('https://api.github.com/users/songdaochuanshu/repos?per_page=100')
    ])
    githubData.value = userResp
    totalStars.value = reposResp.reduce((sum: number, repo: any) => sum + (repo.stargazers_count || 0), 0)
  } catch (error) {
    console.error('获取 GitHub 数据失败:', error)
  }
}

async function loadMe() {
  try {
    const content = await $fetch<string>(`${BASE_URL}/me.md`)
    renderedContent.value = marked(content)
  } catch (error) {
    console.error('Failed to load me page:', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  startTimer()
  fetchGitHubData()
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})

await loadMe()
</script>
