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
            @click="selectCategory(cat.value)"
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
      <div v-if="paginatedPosts.length === 0" class="text-center py-20">
        <p class="text-gray-400 text-lg">暂无文章</p>
      </div>

      <div v-else class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <NuxtLink
          v-for="post in paginatedPosts"
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

      <!-- Pagination -->
      <div v-if="totalPages > 1" class="mt-12 flex items-center justify-center">
        <nav class="flex items-center gap-1">
          <!-- Prev -->
          <button
            @click="goToPage(currentPage - 1)"
            :disabled="currentPage === 1"
            class="w-9 h-9 flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed bg-white border border-gray-200 text-gray-500 hover:bg-gray-50 hover:border-gray-300"
            aria-label="上一页"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
          </button>

          <!-- Page numbers -->
          <template v-for="page in visiblePages" :key="page">
            <span
              v-if="page === '...'"
              class="w-9 h-9 flex items-center justify-center text-gray-400"
            >…</span>
            <button
              v-else
              @click="goToPage(page)"
              :class="[
                'w-9 h-9 flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-200',
                currentPage === page
                  ? 'bg-gray-900 text-white shadow-sm'
                  : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300'
              ]"
            >
              {{ page }}
            </button>
          </template>

          <!-- Next -->
          <button
            @click="goToPage(currentPage + 1)"
            :disabled="currentPage === totalPages"
            class="w-9 h-9 flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed bg-white border border-gray-200 text-gray-500 hover:bg-gray-50 hover:border-gray-300"
            aria-label="下一页"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
          </button>
        </nav>

        <!-- Page info -->
        <span class="ml-4 text-sm text-gray-400">
          {{ currentPage }} / {{ totalPages }}
        </span>
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
const PAGE_SIZE = 12

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

// Route query params for pagination + category
const route = useRoute()
const router = useRouter()

const selectedCategory = computed({
  get: () => (route.query.category as string) || 'all',
  set: (val: string) => {
    selectCategory(val)
  }
})

const currentPage = computed({
  get: () => Math.max(1, parseInt(route.query.page as string) || 1),
  set: (val: number) => goToPage(val)
})

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

// Sort by date descending
const sortedPosts = computed(() => {
  return [...filteredPosts.value].sort((a, b) => {
    const da = a.date ? new Date(a.date).getTime() : 0
    const db = b.date ? new Date(b.date).getTime() : 0
    return db - da
  })
})

const totalPages = computed(() => Math.ceil(sortedPosts.value.length / PAGE_SIZE))

const paginatedPosts = computed(() => {
  const start = (currentPage.value - 1) * PAGE_SIZE
  return sortedPosts.value.slice(start, start + PAGE_SIZE)
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
  return `/posts/${post.key}`
}

function selectCategory(category: string) {
  router.replace({
    query: { ...route.query, category, page: '1' }
  })
}

function goToPage(page: number) {
  if (page < 1 || page > totalPages.value) return
  router.replace({
    query: { ...route.query, page: String(page), category: selectedCategory.value === 'all' ? undefined : selectedCategory.value }
  })
}

// Compute visible page numbers for the paginator
const visiblePages = computed(() => {
  const total = totalPages.value
  const current = currentPage.value
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)

  const pages: (number | string)[] = []

  pages.push(1)

  if (current > 3) pages.push('...')

  const start = Math.max(2, current - 1)
  const end = Math.min(total - 1, current + 1)

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }

  if (current < total - 2) pages.push('...')

  pages.push(total)

  return pages
})

// Scroll to top on page change
watch(currentPage, () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
})
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
