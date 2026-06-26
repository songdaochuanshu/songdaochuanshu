<template>
  <div class="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 relative">
    <div class="fixed inset-0 z-0">
      <div class="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-700" :class="bgReady ? 'opacity-[0.06] dark:opacity-[0.04]' : 'opacity-0'" :style="{ backgroundImage: `url(${bgImage})` }"></div>
    </div>
    <div class="relative z-10">
      <PageNav />

      <main class="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-3xl">
        <div v-if="loading" class="text-center py-20">
          <div class="w-6 h-6 border-2 border-gray-200 dark:border-gray-700 border-t-gray-600 dark:border-t-gray-300 rounded-full animate-spin mx-auto"></div>
        </div>
        <article v-else-if="renderedContent" class="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm px-8 py-10 prose max-w-none">
          <div v-html="renderedContent"></div>
        </article>
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

// GitHub 真实数据
const githubStats = ref({
  years: 0,
  commits: 0,
  issues: 0,
  pullRequests: 0,
  stars: 0,
})

async function fetchGitHubStats() {
  try {
    const [userResp, reposResp, eventsResp] = await Promise.all([
      $fetch<any>('https://api.github.com/users/songdaochuanshu'),
      $fetch<any[]>('https://api.github.com/users/songdaochuanshu/repos?per_page=100'),
      $fetch<any[]>('https://api.github.com/users/songdaochuanshu/events/public?per_page=100'),
    ])
    // 计算活跃年份
    const createdAt = new Date(userResp.created_at)
    const years = Math.max(1, Math.floor((Date.now() - createdAt.getTime()) / (365.25 * 24 * 60 * 60 * 1000)))
    // 统计 commits、issues、PRs
    let commits = 0, issues = 0, prs = 0
    for (const event of eventsResp) {
      if (event.type === 'PushEvent') commits += event.payload?.size || 0
      if (event.type === 'IssuesEvent') issues++
      if (event.type === 'PullRequestEvent') prs++
    }
    // 统计 stars
    const stars = reposResp.reduce((sum: number, repo: any) => sum + (repo.stargazers_count || 0), 0)
    githubStats.value = { years, commits, issues, pullRequests: prs, stars }
  } catch (error) {
    console.error('获取 GitHub 数据失败:', error)
  }
}

async function loadMe() {
  try {
    const content = await $fetch<string>(`${BASE_URL}/me.md`)
    // 替换数字为真实数据
    let md = content
      .replace(/Over the past \*\*\d+\*\* years/, `Over the past **${githubStats.value.years}** years`)
      .replace(/\*\*\d+\*\* commits/, `**${githubStats.value.commits}** commits`)
      .replace(/\*\*\d+\*\* issues opened/, `**${githubStats.value.issues}** issues opened`)
      .replace(/\*\*\d+\*\* pull requests submitted/, `**${githubStats.value.pullRequests}** pull requests submitted`)
      .replace(/\*\*\d+\*\* stars across/, `**${githubStats.value.stars}** stars across`)
    renderedContent.value = marked(md)
  } catch (error) {
    console.error('Failed to load me page:', error)
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  await fetchGitHubStats()
  await loadMe()
})
</script>
