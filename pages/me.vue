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
const stats = ref({ years: 0, commits: 0, issues: 0, pullRequests: 0, stars: 0 })

async function fetchGitHubStats() {
  try {
    const [userResp, reposResp] = await Promise.all([
      $fetch<any>('https://api.github.com/users/songdaochuanshu'),
      $fetch<any[]>('https://api.github.com/users/songdaochuanshu/repos?per_page=100'),
    ])
    const createdAt = new Date(userResp.created_at)
    const years = Math.max(1, Math.floor((Date.now() - createdAt.getTime()) / (365.25 * 24 * 60 * 60 * 1000)))
    const stars = reposResp.reduce((sum: number, repo: any) => sum + (repo.stargazers_count || 0), 0)
    const issues = reposResp.reduce((sum: number, repo: any) => sum + (repo.open_issues_count || 0), 0)
    let totalCommits = 0
    const detailedResults = await Promise.all(
      reposResp.slice(0, 10).map((repo: any) =>
        $fetch<any[]>(`https://api.github.com/repos/songdaochuanshu/${repo.name}/commits?per_page=1`)
          .then((commits: any[]) => commits.length)
          .catch(() => 0)
      )
    )
    totalCommits = detailedResults.reduce((a: number, b: number) => a + b, 0)
    const prResults = await Promise.all(
      reposResp.slice(0, 10).map((repo: any) =>
        $fetch<any[]>(`https://api.github.com/repos/songdaochuanshu/${repo.name}/pulls?state=all&per_page=1`)
          .then((prs: any[]) => prs.length)
          .catch(() => 0)
      )
    )
    const totalPRs = prResults.reduce((a: number, b: number) => a + b, 0)
    stats.value = { years, commits: totalCommits, issues, pullRequests: totalPRs, stars }
  } catch (error) {
    console.error('获取 GitHub 数据失败:', error)
  }
}

async function loadMe() {
  try {
    const content = await $fetch<string>(`${BASE_URL}/me.md`)
    let md = content
      .replace(/Over the past \*\*\d+\*\* years/, `Over the past **${stats.value.years}** years`)
      .replace(/\*\*\d+\*\* commits/, `**${stats.value.commits}** commits`)
      .replace(/\*\*\d+\*\* issues opened/, `**${stats.value.issues}** issues opened`)
      .replace(/\*\*\d+\*\* pull requests submitted/, `**${stats.value.pullRequests}** pull requests submitted`)
      .replace(/\*\*\d+\*\* stars across/, `**${stats.value.stars}** stars across`)
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
