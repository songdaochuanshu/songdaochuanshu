<template>
  <div class="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 relative">
    <!-- Background illustration -->
    <div class="fixed inset-0 z-0">
      <div
        class="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-700"
        :class="bgReady ? 'opacity-[0.06] dark:opacity-[0.04]' : 'opacity-0'"
        :style="{ backgroundImage: `url(${bgImage})` }"
      ></div>
    </div>

    <div class="relative z-10">
      <!-- Nav -->
      <div class="border-b border-gray-100 dark:border-gray-800 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <NuxtLink to="/" class="inline-flex items-center gap-2 py-4 text-xs text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
            </svg>
            松岛川树
          </NuxtLink>
          <ThemeToggle />
        </div>
      </div>

      <!-- Content -->
      <main class="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-3xl">
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">归档</h1>
        <p class="text-xs text-gray-400 dark:text-gray-500 mb-10">{{ posts.length }} 篇文章 · 按时间排列</p>

        <div v-if="loading" class="text-center py-20">
          <div class="w-6 h-6 border-2 border-gray-200 dark:border-gray-700 border-t-gray-600 dark:border-t-gray-300 rounded-full animate-spin mx-auto"></div>
        </div>

        <div v-else class="space-y-10">
          <div v-for="group in groupedPosts" :key="group.year">
            <div class="flex items-baseline gap-3 mb-4">
              <h2 class="text-lg font-bold text-gray-900 dark:text-white">{{ group.year }}</h2>
              <span class="text-xs text-gray-400 dark:text-gray-500">{{ group.posts.length }} 篇</span>
              <div class="flex-1 h-px bg-gray-100 dark:bg-gray-800"></div>
            </div>
            <ul class="space-y-3">
              <li v-for="post in group.posts" :key="post.key">
                <NuxtLink
                  :to="getPostLink(post)"
                  class="group flex items-center gap-4 py-1"
                >
                  <span class="text-xs text-gray-400 dark:text-gray-500 w-16 flex-shrink-0">{{ formatDate(post.date) }}</span>
                  <span class="text-sm text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                    {{ post.title }}
                  </span>
                  <span v-if="post.category" :class="['px-1.5 py-0.5 text-[10px] font-semibold rounded flex-shrink-0', getCategoryColor(post.category)]">
                    {{ post.category }}
                  </span>
                </NuxtLink>
              </li>
            </ul>
          </div>
        </div>
      </main>

      <!-- Footer -->
      <footer class="border-t border-gray-100 dark:border-gray-800 mt-16">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p class="text-center text-xs text-gray-400 dark:text-gray-500">© 2026 松岛川树</p>
        </div>
      </footer>
    </div>

    <BackToTop />
  </div>
</template>

<script setup lang="ts">
const BASE_URL = 'https://blog-static.openserve.cloud'
const { bgImage, bgReady } = useRandomImages()

interface PostMeta {
  path: string
  key: string
  category: string
  title: string
  date: string | null
  description: string
  tags: string[]
  layout: string
  cover?: string
}

const loading = ref(true)
const posts = ref<PostMeta[]>([])

const groupedPosts = computed(() => {
  const groups: Record<string, PostMeta[]> = {}
  for (const post of posts.value) {
    const year = post.date ? new Date(post.date).getFullYear().toString() : '未知'
    if (!groups[year]) groups[year] = []
    groups[year].push(post)
  }
  return Object.entries(groups)
    .sort((a, b) => parseInt(b[0]) - parseInt(a[0]))
    .map(([year, posts]) => ({ year, posts }))
})

function formatDate(dateStr: string): string {
  if (!dateStr) return ''
  try {
    const date = new Date(dateStr)
    return `${date.getMonth() + 1}月${date.getDate()}日`
  } catch {
    return ''
  }
}

function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    blog: 'bg-sky-50 text-sky-600 dark:bg-sky-900/30 dark:text-sky-400',
    life: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400',
    record: 'bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400',
    root: 'bg-violet-50 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400',
  }
  return colors[category] || 'bg-gray-50 text-gray-500 dark:bg-gray-800 dark:text-gray-400'
}

function getPostLink(post: PostMeta): string {
  if (post.layout === 'page') return post.path
  return `/posts/${post.key}`
}

const { data: manifest } = await useFetch(`${BASE_URL}/manifest.json`, { key: 'manifest' })

watchEffect(() => {
  if (manifest.value) {
    posts.value = (manifest.value.posts || []) as PostMeta[]
    loading.value = false
  }
})
</script>
