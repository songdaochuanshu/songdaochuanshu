<template>
  <div class="min-h-screen bg-[#fafafa] text-[#1a1a1a]">
    <!-- Hero Header -->
    <header class="relative overflow-hidden bg-white border-b border-gray-100">
      <div class="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50/30 to-purple-50/20"></div>
      <div class="relative container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div class="max-w-3xl">
          <h1 class="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 mb-4">
            松岛川树
          </h1>
          <p class="text-lg text-gray-500 leading-relaxed">
            记录技术思考与生活感悟的博客
          </p>
        </div>
      </div>
    </header>

    <!-- Category Filter -->
    <nav class="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex gap-2 py-4 overflow-x-auto scrollbar-hide">
          <button
            v-for="cat in categories"
            :key="cat.value"
            @click="selectedCategory = cat.value"
            :class="[
              'px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200',
              selectedCategory === cat.value
                ? 'bg-gray-900 text-white shadow-sm'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900'
            ]"
          >
            {{ cat.label }}
            <span :class="selectedCategory === cat.value ? 'text-gray-300' : 'text-gray-400'">
              ({{ getCategoryCount(cat.value) }})
            </span>
          </button>
        </div>
      </div>
    </nav>

    <!-- Posts Grid -->
    <main class="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div v-if="filteredPosts.length === 0" class="text-center py-20">
        <p class="text-gray-400 text-lg">暂无文章</p>
      </div>

      <div v-else class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <NuxtLink
          v-for="post in filteredPosts"
          :key="post.key"
          :to="getPostLink(post)"
          class="group block bg-white rounded-xl border border-gray-100 p-6 hover:shadow-lg hover:border-gray-200 transition-all duration-300 hover:-translate-y-0.5"
        >
          <!-- Category Badge -->
          <div class="flex items-center justify-between mb-4">
            <span
              :class="[
                'px-2.5 py-1 text-xs font-medium rounded-md',
                getCategoryColor(post.category)
              ]"
            >
              {{ post.category }}
            </span>
            <span v-if="post.date" class="text-xs text-gray-400">
              {{ formatDate(post.date) }}
            </span>
          </div>

          <!-- Title -->
          <h2 class="text-base font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 mb-2 leading-snug">
            {{ post.title }}
          </h2>

          <!-- Description -->
          <p v-if="post.description" class="text-sm text-gray-500 line-clamp-3 leading-relaxed">
            {{ post.description }}
          </p>
          <p v-else class="text-sm text-gray-400 italic">暂无描述</p>
        </NuxtLink>
      </div>
    </main>

    <!-- Footer -->
    <footer class="border-t border-gray-100 bg-white">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <p class="text-center text-sm text-gray-400">
          © 2026 松岛川树 · Built with Nuxt 3 & Cloudflare R2
        </p>
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
    return date.toLocaleDateString('zh-CN', { year: 'numeric', month: 'short', day: 'numeric' })
  } catch {
    return dateStr
  }
}

function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    blog: 'bg-blue-50 text-blue-700',
    life: 'bg-green-50 text-green-700',
    record: 'bg-amber-50 text-amber-700',
    root: 'bg-purple-50 text-purple-700',
  }
  return colors[category] || 'bg-gray-100 text-gray-600'
}

function getPostLink(post: PostMeta): string {
  if (post.layout === 'page') return post.path
  // Convert key like 'blog/1781748501638.md' to '/posts/blog/1781748501638.md'
  return `/posts/${post.key}`
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
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
