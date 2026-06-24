<template>
  <div class="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 relative">
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

      <main class="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-3xl">
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-8">标签</h1>

        <div v-if="tagList.length" class="flex flex-wrap gap-2">
          <NuxtLink
            v-for="tag in tagList"
            :key="tag.name"
            :to="`/?category=all`"
            class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gray-100 dark:border-gray-800 hover:border-gray-200 dark:hover:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all group"
          >
            <span class="text-sm text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
              #{{ tag.name }}
            </span>
            <span class="text-[10px] text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded-full">
              {{ tag.count }}
            </span>
          </NuxtLink>
        </div>

        <div v-else class="text-center py-20">
          <p class="text-gray-400 dark:text-gray-500 text-sm">加载中...</p>
        </div>
      </main>

      <footer class="border-t border-gray-100 dark:border-gray-800 mt-16">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p class="text-center text-xs text-gray-400 dark:text-gray-500">© 2026 松岛川树</p>
        </div>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
const BASE_URL = 'https://blog-static.openserve.cloud'
const { bgImage, bgReady } = useRandomImages()

useSeoMeta({
  title: '标签 - 松岛川树',
  description: '按标签浏览所有文章'
})

interface PostMeta {
  key: string
  category: string
  title: string
  date: string | null
  tags: string[]
}

const { data: manifest } = await useFetch<{ posts: PostMeta[] }>(`${BASE_URL}/manifest.json`)

const tagList = computed(() => {
  const posts = manifest.value?.posts || []
  const map = new Map<string, number>()
  posts.forEach(p => {
    (p.tags || []).forEach(t => {
      map.set(t, (map.get(t) || 0) + 1)
    })
  })
  return Array.from(map.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
})
</script>
