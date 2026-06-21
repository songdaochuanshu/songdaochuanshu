<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
    <header class="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
      <div class="container mx-auto px-4 py-6">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">📝 我的博客</h1>
        <p class="text-gray-600 dark:text-gray-400 mt-2">Nuxt + Cloudflare R2</p>
      </div>
    </header>

    <main class="container mx-auto px-4 py-8">
      <!-- 分类标签 -->
      <div class="flex gap-4 mb-8">
        <button
          v-for="cat in categories"
          :key="cat.value"
          @click="selectedCategory = cat.value"
          :class="[
            'px-4 py-2 rounded-full text-sm font-medium transition-colors',
            selectedCategory === cat.value
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
          ]"
        >
          {{ cat.label }} ({{ getCategoryCount(cat.value) }})
        </button>
      </div>

      <!-- 文章列表 -->
      <div v-if="!posts.length" class="text-center py-12">
        <p class="text-gray-600 dark:text-gray-400">暂无文章</p>
      </div>

      <div v-else class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <NuxtLink
          v-for="post in filteredPosts"
          :key="post.path"
          :to="`/posts/${encodeURIComponent(post.key)}`"
          class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow border border-gray-200 dark:border-gray-700"
        >
          <div class="p-6">
            <div class="flex items-center gap-2 mb-3">
              <span class="px-2 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full">
                {{ post.category }}
              </span>
              <span v-if="post.date" class="text-xs text-gray-500 dark:text-gray-400">
                {{ formatDate(post.date) }}
              </span>
            </div>
            <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
              {{ post.title }}
            </h2>
            <p class="text-gray-600 dark:text-gray-400 text-sm line-clamp-3">
              {{ post.description || '暂无描述' }}
            </p>
          </div>
        </NuxtLink>
      </div>
    </main>

    <footer class="mt-16 py-8 border-t border-gray-200 dark:border-gray-700">
      <div class="container mx-auto px-4 text-center text-gray-600 dark:text-gray-400">
        <p>© 2026 松岛川树. Built with Nuxt & Cloudflare R2.</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
const BASE_URL = 'https://blog-static.openserve.cloud'

interface PostMeta {
  path: string
  key: string
  category: string
  title: string
  date: string | null
  description: string
  tags: string[]
  layout: string
}

const selectedCategory = ref('all')

const { data: manifest } = await useFetch(`${BASE_URL}/manifest.json`, {
  key: 'manifest',
})

const posts = computed(() => (manifest.value?.posts || []) as PostMeta[])

const categories = computed(() => {
  const cats = [...new Set(posts.value.map((p: PostMeta) => p.category))]
  return [
    { label: '全部', value: 'all' },
    ...cats.map((c: string) => ({ label: c, value: c }))
  ]
})

const filteredPosts = computed(() => {
  if (selectedCategory.value === 'all') return posts.value
  return posts.value.filter((p: PostMeta) => p.category === selectedCategory.value)
})

function getCategoryCount(category: string) {
  if (category === 'all') return posts.value.length
  return posts.value.filter((p: PostMeta) => p.category === category).length
}

function formatDate(dateStr: string): string {
  if (!dateStr) return ''
  try {
    const date = new Date(dateStr)
    return date.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' })
  } catch {
    return dateStr
  }
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
