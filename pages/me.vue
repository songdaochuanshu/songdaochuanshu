<template>
  <div class="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 relative">
    <div class="fixed inset-0 z-0">
      <div class="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-700" :class="bgReady ? 'opacity-[0.06] dark:opacity-[0.04]' : 'opacity-0'" :style="{ backgroundImage: `url(${bgImage})` }"></div>
    </div>
    <div class="relative z-10">
      <PageNav />

      <main class="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-3xl">
        <!-- 常用编程语言 -->
        <div v-if="langStats.length" class="mb-8 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm p-6">
          <h3 class="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-4">常用语言</h3>
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
const langStats = ref<{ name: string; color: string; percentage: number }[]>([])

const LANG_COLORS: Record<string, string> = {
  Vue: '#41b883', TypeScript: '#3178c6', JavaScript: '#f1e05a',
  CSS: '#563d7c', HTML: '#e34c26', SCSS: '#c6538c',
  Python: '#3572A5', Java: '#b07219', Go: '#00ADD8',
  Rust: '#dea584', 'C++': '#f34b7d', C: '#555555',
  Shell: '#89e051', Dockerfile: '#384d54', Nix: '#7e7eff',
}

async function fetchLangStats() {
  try {
    const repos = await $fetch<any[]>('https://api.github.com/users/songdaochuanshu/repos?per_page=100')
    const langMap = new Map<string, number>()
    for (const repo of repos) {
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
  } catch (error) {
    console.error('获取语言统计失败:', error)
  }
}

async function loadMe() {
  try {
    const content = await $fetch<string>(`${BASE_URL}/me.md`)
    const techIndex = content.indexOf('## Tech Stack')
    const markdown = techIndex > 0 ? content.slice(0, techIndex).trim() : content
    renderedContent.value = marked(markdown)
  } catch (error) {
    console.error('Failed to load me page:', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => { fetchLangStats() })
await loadMe()
</script>
