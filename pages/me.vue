<template>
  <div class="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 relative">
    <div class="fixed inset-0 z-0">
      <div class="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-700" :class="bgReady ? 'opacity-[0.06] dark:opacity-[0.04]' : 'opacity-0'" :style="{ backgroundImage: `url(${bgImage})` }"></div>
    </div>
    <div class="relative z-10">
      <PageNav />

      <main class="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-3xl">
        <!-- 个人简介 -->
        <div class="mb-8 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm p-6">
          <div v-if="githubData" class="flex items-center gap-4 mb-4">
            <img :src="githubData.avatar_url" :alt="githubData.name" class="w-16 h-16 rounded-full" />
            <div>
              <h2 class="text-lg font-bold text-gray-900 dark:text-white">{{ githubData.name }}</h2>
              <a :href="githubData.html_url" target="_blank" rel="noopener" class="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">@{{ githubData.login }}</a>
              <p v-if="githubData.bio" class="text-xs text-gray-400 dark:text-gray-500 mt-1">{{ githubData.bio }}</p>
            </div>
          </div>
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div class="text-center p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50">
              <div class="text-xl font-bold text-gray-900 dark:text-white">{{ githubData?.public_repos || 0 }}</div>
              <div class="text-[10px] text-gray-400 dark:text-gray-500">仓库</div>
            </div>
            <div class="text-center p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50">
              <div class="text-xl font-bold text-gray-900 dark:text-white">{{ githubData?.followers || 0 }}</div>
              <div class="text-[10px] text-gray-400 dark:text-gray-500">粉丝</div>
            </div>
            <div class="text-center p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50">
              <div class="text-xl font-bold text-gray-900 dark:text-white">{{ githubData?.following || 0 }}</div>
              <div class="text-[10px] text-gray-400 dark:text-gray-500">关注</div>
            </div>
            <div class="text-center p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50">
              <div class="text-xl font-bold text-gray-900 dark:text-white">{{ totalStars }}</div>
              <div class="text-[10px] text-gray-400 dark:text-gray-500">Star</div>
            </div>
          </div>
          <div class="flex flex-wrap gap-3 mt-4 text-xs text-gray-400 dark:text-gray-500">
            <span v-if="githubData?.location">📍 {{ githubData.location }}</span>
            <span v-if="githubData?.company">🏢 {{ githubData.company }}</span>
            <span v-if="githubData?.blog">🔗 <a :href="githubData.blog.startsWith('http') ? githubData.blog : `https://${githubData.blog}`" target="_blank" rel="noopener" class="hover:text-gray-900 dark:hover:text-white transition-colors">{{ githubData.blog }}</a></span>
          </div>
        </div>

        <!-- 最常用的编程语言 -->
        <div v-if="langStats.length" class="mb-8 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm p-6">
          <h3 class="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-4">常用语言</h3>
          <div class="flex flex-wrap gap-2">
            <div v-for="lang in langStats.slice(0, 6)" :key="lang.name" class="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-50 dark:bg-gray-700/50">
              <span class="w-2.5 h-2.5 rounded-full" :style="{ backgroundColor: lang.color }"></span>
              <span class="text-xs text-gray-600 dark:text-gray-300">{{ lang.name }}</span>
              <span class="text-[10px] text-gray-400 dark:text-gray-500">{{ lang.percentage }}%</span>
            </div>
          </div>
        </div>

        <!-- 最近活动 -->
        <div v-if="recentEvents.length" class="mb-8 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm p-6">
          <h3 class="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-4">最近活动</h3>
          <div class="space-y-3">
            <div v-for="event in recentEvents" :key="event.id" class="flex items-start gap-3">
              <span class="text-sm mt-0.5">{{ getEventIcon(event.type) }}</span>
              <div class="flex-1 min-w-0">
                <p class="text-sm text-gray-700 dark:text-gray-300">
                  <span class="font-medium text-gray-900 dark:text-white">{{ getEventAction(event.type) }}</span>
                  <a v-if="event.repo" :href="`https://github.com/${event.repo.name}`" target="_blank" rel="noopener" class="hover:text-gray-900 dark:hover:text-white transition-colors">{{ event.repo.name }}</a>
                </p>
                <p class="text-[10px] text-gray-400 dark:text-gray-500 mt-0.5">{{ formatEventTime(event.created_at) }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- 贡献图 -->
        <div class="mb-8 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm p-6 overflow-hidden">
          <h3 class="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-4">贡献热力图</h3>
          <img src="https://raw.githack.com/songdaochuanshu/songdaochuanshu/main/github-contribution-grid-snake.svg" alt="GitHub Contribution Grid" class="w-full rounded-lg" />
        </div>

        <!-- Markdown 内容 -->
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
const githubData = ref<any>(null)
const totalStars = ref(0)
const langStats = ref<{ name: string; color: string; percentage: number }[]>([])
const recentEvents = ref<any[]>([])

const LANG_COLORS: Record<string, string> = {
  Vue: '#41b883', TypeScript: '#3178c6', JavaScript: '#f1e05a',
  CSS: '#563d7c', HTML: '#e34c26', SCSS: '#c6538c',
  Python: '#3572A5', Java: '#b07219', Go: '#00ADD8',
  Rust: '#dea584', 'C++': '#f34b7d', C: '#555555',
  Shell: '#89e051', Dockerfile: '#384d54', Nix: '#7e7eff',
}

function getEventIcon(type: string): string {
  const icons: Record<string, string> = {
    PushEvent: '📦', CreateEvent: '🆕', DeleteEvent: '🗑️',
    IssuesEvent: '❗', IssueCommentEvent: '💬', PullRequestEvent: '🔀',
    PullRequestReviewEvent: '👁️', ForkEvent: '🍴', StarEvent: '⭐',
    ReleaseEvent: '🚀', WatchEvent: '👀', CommitCommentEvent: '📝',
  }
  return icons[type] || '📌'
}

function getEventAction(type: string): string {
  const actions: Record<string, string> = {
    PushEvent: '推送到', CreateEvent: '创建了', IssuesEvent: '在',
    IssueCommentEvent: '评论了', PullRequestEvent: '提交了 PR 到',
    ForkEvent: 'Fork 了', StarEvent: 'Star 了', WatchEvent: 'Watch 了',
  }
  return actions[type] || '操作了'
}

function formatEventTime(dateStr: string): string {
  const date = new Date(dateStr)
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)
  if (minutes < 1) return '刚刚'
  if (minutes < 60) return `${minutes} 分钟前`
  if (hours < 24) return `${hours} 小时前`
  if (days < 30) return `${days} 天前`
  return date.toLocaleDateString('zh-CN')
}

async function fetchGitHubData() {
  try {
    const [userResp, reposResp, eventsResp] = await Promise.all([
      $fetch<any>('https://api.github.com/users/songdaochuanshu'),
      $fetch<any[]>('https://api.github.com/users/songdaochuanshu/repos?per_page=100'),
      $fetch<any[]>('https://api.github.com/users/songdaochuanshu/events/public?per_page=10'),
    ])
    githubData.value = userResp
    totalStars.value = reposResp.reduce((sum: number, repo: any) => sum + (repo.stargazers_count || 0), 0)
    // 统计语言
    const langMap = new Map<string, number>()
    for (const repo of reposResp) {
      if (repo.language) langMap.set(repo.language, (langMap.get(repo.language) || 0) + 1)
    }
    const total = Array.from(langMap.values()).reduce((a, b) => a + b, 0)
    langStats.value = Array.from(langMap.entries())
      .map(([name, count]) => ({
        name,
        color: LANG_COLORS[name] || '#6b7280',
        percentage: Math.round((count / total) * 100),
      }))
      .sort((a, b) => b.percentage - a.percentage)
    // 最近活动
    recentEvents.value = eventsResp.slice(0, 8)
  } catch (error) {
    console.error('获取 GitHub 数据失败:', error)
  }
}

async function loadMe() {
  try {
    const content = await $fetch<string>(`${BASE_URL}/me.md`)
    // 只保留 Tech Stack 之前的内容（跳过静态数据部分）
    const techIndex = content.indexOf('## Tech Stack')
    const markdown = techIndex > 0 ? content.slice(0, techIndex).trim() : content
    renderedContent.value = marked(markdown)
  } catch (error) {
    console.error('Failed to load me page:', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => { fetchGitHubData() })
await loadMe()
</script>
