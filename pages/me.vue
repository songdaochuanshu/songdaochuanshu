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
    // 活跃年份
    const createdAt = new Date(userResp.created_at)
    const years = Math.max(1, Math.floor((Date.now() - createdAt.getTime()) / (365.25 * 24 * 60 * 60 * 1000)))
    // stars
    const stars = reposResp.reduce((sum: number, repo: any) => sum + (repo.stargazers_count || 0), 0)
    // issues (open_issues_count 是所有仓库的总和)
    const issues = reposResp.reduce((sum: number, repo: any) => sum + (repo.open_issues_count || 0), 0)
    // 获取各仓库的最新提交时间来估算 commits
    const repoNames = reposResp.slice(0, 30).map((r: any) => r.name)
    const commitResults = await Promise.all(
      repoNames.map(name =>
        $fetch<any[]>(`https://api.github.com/repos/songdaochuanshu/${name}/commits?per_page=1`)
          .then(() => 1)
          .catch(() => 0)
      )
    )
    const activeRepos = commitResults.filter((r: number) => r > 0).length
    // 估算 commits: 用每个仓库的最近提交来估算
    // 更好的方式: 逐个仓库获取 commits 总数
    let totalCommits = 0
    const detailedResults = await Promise.all(
      repoNames.slice(0, 10).map(name =>
        $fetch<any[]>(`https://api.github.com/repos/songdaochuanshu/${name}/commits?per_page=1`)
          .then((commits: any[]) => commits.length)
          .catch(() => 0)
      )
    )
    totalCommits = detailedResults.reduce((a: number, b: number) => a + b, 0)
    // PRs: 统计所有仓库的 open PRs
    const prResults = await Promise.all(
      repoNames.slice(0, 10).map(name =>
        $fetch<any[]>(`https://api.github.com/repos/songdaochuanshu/${name}/pulls?state=all&per_page=1`)
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
