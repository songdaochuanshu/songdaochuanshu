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
          <p class="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
            A passionate web developer and open source enthusiast based in China. I believe in the power of technology and community to create meaningful impact.
          </p>
        </div>

        <!-- GitHub 贡献数据 -->
        <div v-if="githubData" class="mb-8 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm p-6">
          <h3 class="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-4">My Journey</h3>
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
              <div class="text-xl font-bold text-gray-900 dark:text-white">{{ totalStars }}</div>
              <div class="text-[10px] text-gray-400 dark:text-gray-500">Star</div>
            </div>
            <div class="text-center p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50">
              <div class="text-xl font-bold text-gray-900 dark:text-white">{{ githubData.following }}</div>
              <div class="text-[10px] text-gray-400 dark:text-gray-500">关注</div>
            </div>
          </div>
        </div>

        <!-- 常用语言 -->
        <div v-if="langStats.length" class="mb-8 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm p-6">
          <h3 class="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-4">Tech Stack</h3>
          <div class="space-y-3">
            <div v-for="lang in langStats.slice(0, 8)" :key="lang.name" class="flex items-center gap-3">
              <span class="w-2.5 h-2.5 rounded-full flex-shrink-0" :style="{ backgroundColor: lang.color }"></span>
              <span class="text-sm text-gray-700 dark:text-gray-300 w-20 flex-shrink-0">{{ lang.name }}</span>
              <div class="flex-1 h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                <div class="h-full rounded-full transition-all duration-500" :style="{ width: `${lang.percentage}%`, backgroundColor: lang.color }"></div>
              </div>
              <span class="text-xs text-gray-400 dark:text-gray-500 w-10 text-right">{{ lang.percentage }}%</span>
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
      </main>

      <PageFooter />
    </div>
    <BackToTop />
  </div>
</template>

<script setup lang="ts">
const { bgImage, bgReady } = useRandomImages()

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
  nesC: '#94B0C7', Less: '#1d365d',
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
  const diff = Date.now() - new Date(dateStr).getTime()
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)
  if (minutes < 1) return '刚刚'
  if (minutes < 60) return `${minutes} 分钟前`
  if (hours < 24) return `${hours} 小时前`
  if (days < 30) return `${days} 天前`
  return new Date(dateStr).toLocaleDateString('zh-CN')
}

async function fetchData() {
  try {
    const [userResp, reposResp, eventsResp] = await Promise.all([
      $fetch<any>('https://api.github.com/users/songdaochuanshu'),
      $fetch<any[]>('https://api.github.com/users/songdaochuanshu/repos?per_page=100'),
      $fetch<any[]>('https://api.github.com/users/songdaochuanshu/events/public?per_page=8'),
    ])
    githubData.value = userResp
    totalStars.value = reposResp.reduce((sum: number, repo: any) => sum + (repo.stargazers_count || 0), 0)
    // 语言统计
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
    recentEvents.value = eventsResp
  } catch (error) {
    console.error('获取数据失败:', error)
  }
}

onMounted(() => { fetchData() })
</script>
