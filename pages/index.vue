<template>
  <div class="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 relative">
    <!-- Full-page background illustration -->
    <div class="fixed inset-0 z-0">
      <div
        class="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-700"
        :class="bgReady ? 'opacity-[0.06] dark:opacity-[0.04]' : 'opacity-0'"
        :style="{ backgroundImage: `url(${bgImage})` }"
      ></div>
    </div>

    <div class="relative z-10">
      <!-- Hero -->
      <header class="relative h-72 sm:h-96 overflow-hidden">
        <div
          class="absolute inset-0 bg-cover bg-center transition-opacity duration-700"
          :class="heroReady ? 'opacity-100' : 'opacity-0'"
          :style="{ backgroundImage: `url(${heroImage})` }"
        >
          <div class="absolute inset-0 bg-gradient-to-t from-white dark:from-gray-900 via-white/60 dark:via-gray-900/60 to-transparent"></div>
        </div>
        <div class="relative container mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-end pb-10">
          <div class="absolute top-6 right-4 sm:right-6 lg:right-8 flex items-center gap-3">
            <NuxtLink to="/archive" class="text-xs text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">归档</NuxtLink>
            <NuxtLink to="/categories" class="text-xs text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">分类</NuxtLink>
            <NuxtLink to="/tags" class="text-xs text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">标签</NuxtLink>
            <NuxtLink to="/me" class="text-xs text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">关于</NuxtLink>
            <ThemeToggle />
          </div>
          <h1 class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white tracking-tight">松岛川树</h1>
          <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">记录技术思考与生活感悟</p>
          <div class="mt-3 flex items-center gap-4 text-xs text-gray-400 dark:text-gray-500">
            <span>{{ posts.length }} 篇文章</span>
            <span class="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600"></span>
            <span>{{ categories.length - 1 }} 个分类</span>
          </div>
        </div>
      </header>

      <!-- Category Filter + Search -->
      <nav class="sticky top-0 z-20 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-b border-gray-100 dark:border-gray-800">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex items-center gap-3 py-3">
            <!-- Search -->
            <div class="relative flex-shrink-0">
              <svg class="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
              <input
                v-model="searchQuery"
                type="text"
                placeholder="搜索文章..."
                class="w-40 sm:w-52 pl-8 pr-3 py-1.5 text-xs bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full outline-none focus:border-gray-400 dark:focus:border-gray-500 focus:bg-white dark:focus:bg-gray-900 transition-colors placeholder:text-gray-400 dark:placeholder:text-gray-500 text-gray-700 dark:text-gray-300"
              />
              <button
                v-if="searchQuery"
                @click="searchQuery = ''"
                class="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>
            <!-- Categories -->
            <div class="flex gap-2 overflow-x-auto scrollbar-hide">
              <button
                v-for="cat in categories"
                :key="cat.value"
                @click="selectCategory(cat.value)"
                :class="[
                  'px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors',
                  selectedCategory === cat.value
                    ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
                ]"
              >
                {{ cat.label }}
                <span :class="selectedCategory === cat.value ? 'text-gray-400 dark:text-gray-500' : 'text-gray-300 dark:text-gray-600'" class="ml-1">
                  {{ getCategoryCount(cat.value) }}
                </span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <!-- Posts -->
      <main class="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <!-- Skeleton Loading -->
        <div v-if="status === 'pending'" class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <div v-for="i in 6" :key="i" class="bg-white dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-800 overflow-hidden">
            <div class="aspect-[16/9] skeleton"></div>
            <div class="p-5">
              <div class="flex gap-2 mb-3">
                <div class="skeleton w-12 h-4 rounded"></div>
                <div class="skeleton w-16 h-4 rounded"></div>
              </div>
              <div class="skeleton w-full h-4 rounded mb-2"></div>
              <div class="skeleton w-3/4 h-4 rounded mb-3"></div>
              <div class="skeleton w-full h-3 rounded mb-1"></div>
              <div class="skeleton w-2/3 h-3 rounded"></div>
            </div>
          </div>
        </div>

        <div v-else-if="paginatedPosts.length === 0" class="text-center py-20">
          <p class="text-gray-400 dark:text-gray-500">暂无文章</p>
        </div>

        <div v-else class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <NuxtLink
            v-for="post in paginatedPosts"
            :key="post.key"
            :to="getPostLink(post)"
            class="group block bg-white dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-800 overflow-hidden hover:shadow-lg hover:border-gray-200 dark:hover:border-gray-700 transition-all duration-200 hover:-translate-y-0.5"
          >
            <!-- Cover Image -->
            <div v-if="post.cover" class="aspect-[16/9] overflow-hidden bg-gray-100 dark:bg-gray-800">
              <img
                :src="post.cover"
                :alt="post.title"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
            </div>
            <div class="p-5">
              <div class="flex items-center gap-2 mb-3">
                <span :class="['px-2 py-0.5 text-[10px] font-semibold rounded tracking-wide', getCategoryColor(post.category)]">
                  {{ post.category }}
                </span>
                <span v-if="post.date" class="text-[11px] text-gray-400 dark:text-gray-500">{{ formatDate(post.date) }}</span>
                <span class="text-[11px] text-gray-300 dark:text-gray-600">· {{ getReadingTime(post) }}</span>
              </div>
              <h2 class="text-sm font-semibold text-gray-800 dark:text-gray-200 group-hover:text-gray-600 dark:group-hover:text-gray-400 transition-colors line-clamp-2 leading-snug mb-2">
                {{ post.title }}
              </h2>
              <p v-if="post.description" class="text-xs text-gray-400 dark:text-gray-500 line-clamp-2 leading-relaxed mb-3">
                {{ post.description }}
              </p>
              <!-- Tags -->
              <div v-if="post.tags?.length" class="flex flex-wrap gap-1 mb-3">
                <span
                  v-for="tag in post.tags.slice(0, 3)"
                  :key="tag"
                  class="px-1.5 py-0.5 text-[10px] text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-700/50 rounded"
                >
                  #{{ tag }}
                </span>
              </div>
              <div class="flex items-center gap-1 text-[11px] text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors">
                <span>阅读全文</span>
                <svg class="w-3 h-3 translate-x-0 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                </svg>
              </div>
            </div>
          </NuxtLink>
        </div>

        <!-- Pagination -->
        <div v-if="totalPages > 1" class="mt-10 flex items-center justify-center">
          <nav class="flex items-center gap-1.5">
            <button
              @click="goToPage(currentPage - 1)"
              :disabled="currentPage === 1"
              class="w-8 h-8 flex items-center justify-center rounded text-xs text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
            </button>

            <template v-for="page in visiblePages" :key="page">
              <span v-if="page === '...'" class="w-8 h-8 flex items-center justify-center text-gray-300 dark:text-gray-600 text-xs">…</span>
              <button
                v-else
                @click="goToPage(page)"
                :class="[
                  'w-8 h-8 flex items-center justify-center rounded text-xs transition-colors',
                  currentPage === page
                    ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900'
                    : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                ]"
              >
                {{ page }}
              </button>
            </template>

            <button
              @click="goToPage(currentPage + 1)"
              :disabled="currentPage === totalPages"
              class="w-8 h-8 flex items-center justify-center rounded text-xs text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
            </button>
          </nav>
          <span class="ml-3 text-xs text-gray-400 dark:text-gray-500">{{ currentPage }} / {{ totalPages }}</span>
        </div>
        <!-- Hot Posts -->
        <HotPosts :posts="posts" />
      </main>

      <!-- Footer -->
      <footer class="border-t border-gray-100 dark:border-gray-800 mt-16">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div class="flex items-center justify-center gap-4 text-xs text-gray-400 dark:text-gray-500">
            <span>© 2026 松岛川树 · Built with Nuxt 4</span>
            <span class="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600"></span>
            <a href="/rss.xml" class="hover:text-gray-900 dark:hover:text-white transition-colors">RSS</a>
          </div>
        </div>
      </footer>
    </div>

    <BackToTop />
  </div>
</template>

<script setup lang="ts">
const BASE_URL = 'https://blog-static.openserve.cloud'
const PAGE_SIZE = 8

const { heroImage, bgImage, bgReady, heroReady } = useRandomImages()
const { onKey, focusSearch } = useKeyboard()

onKey((e) => {
  if (e.key === '/' && !e.ctrlKey && !e.metaKey) {
    const target = e.target as HTMLElement
    if (target.tagName !== 'INPUT' && target.tagName !== 'TEXTAREA') {
      e.preventDefault()
      focusSearch()
    }
  }
})

useSeoMeta({
  title: '松岛川树',
  ogTitle: '松岛川树',
  description: '松岛川树的个人博客，记录生活与技术',
  ogDescription: '松岛川树的个人博客，记录生活与技术',
  ogType: 'website'
})

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

const route = useRoute()
const router = useRouter()
const searchQuery = ref('')

const selectedCategory = computed({
  get: () => (route.query.category as string) || 'all',
  set: (val: string) => selectCategory(val)
})

const currentPage = computed({
  get: () => Math.max(1, parseInt(route.query.page as string) || 1),
  set: (val: number) => goToPage(val)
})

const { data: manifest, status } = await useFetch(`${BASE_URL}/manifest.json`, { key: 'manifest' })

const posts = computed(() => (manifest.value?.posts || []) as PostMeta[])

const categories = computed(() => {
  const cats = [...new Set(posts.value.map((p: PostMeta) => p.category))]
  return [
    { label: '全部', value: 'all' },
    ...cats.map((c: string) => ({ label: c, value: c }))
  ]
})

const filteredPosts = computed(() => {
  let result = posts.value
  if (selectedCategory.value !== 'all') {
    result = result.filter((p: PostMeta) => p.category === selectedCategory.value)
  }
  if (searchQuery.value.trim()) {
    const q = searchQuery.value.trim().toLowerCase()
    result = result.filter((p: PostMeta) =>
      p.title.toLowerCase().includes(q) ||
      p.description?.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.tags?.some(t => t.toLowerCase().includes(q))
    )
  }
  return result
})

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
    blog: 'bg-sky-50 text-sky-600 dark:bg-sky-900/30 dark:text-sky-400',
    life: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400',
    record: 'bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400',
    root: 'bg-violet-50 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400',
  }
  return colors[category] || 'bg-gray-50 text-gray-500 dark:bg-gray-800 dark:text-gray-400'
}

function getReadingTime(post: PostMeta): string {
  const desc = post.description || ''
  const chars = desc.length
  if (chars < 50) return '1 分钟'
  if (chars < 100) return '3 分钟'
  if (chars < 150) return '5 分钟'
  return '8 分钟'
}

function getPostLink(post: PostMeta): string {
  if (post.layout === 'page') return post.path
  return `/posts/${post.key}`
}

function selectCategory(category: string) {
  router.replace({ query: { ...route.query, category, page: '1' } })
}

function goToPage(page: number) {
  if (page < 1 || page > totalPages.value) return
  router.replace({
    query: {
      ...route.query,
      page: String(page),
      category: selectedCategory.value === 'all' ? undefined : selectedCategory.value
    }
  })
}

const visiblePages = computed(() => {
  const total = totalPages.value
  const current = currentPage.value
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)
  const pages: (number | string)[] = []
  pages.push(1)
  if (current > 3) pages.push('...')
  const start = Math.max(2, current - 1)
  const end = Math.min(total - 1, current + 1)
  for (let i = start; i <= end; i++) pages.push(i)
  if (current < total - 2) pages.push('...')
  pages.push(total)
  return pages
})

watch(searchQuery, () => {
  router.replace({ query: { ...route.query, page: '1' } })
})

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
.scrollbar-hide::-webkit-scrollbar { display: none; }
.scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
</style>
