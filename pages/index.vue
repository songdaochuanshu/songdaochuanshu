<template>
  <div class="min-h-screen bg-white text-gray-800 relative">
    <!-- Full-page background illustration -->
    <div class="fixed inset-0 z-0">
      <div
        class="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.06]"
        :style="{ backgroundImage: `url(${bgImage})` }"
      ></div>
    </div>

    <div class="relative z-10">
      <!-- Hero -->
      <header class="relative h-72 sm:h-96 overflow-hidden">
        <div
          class="absolute inset-0 bg-cover bg-center"
          :style="{ backgroundImage: `url(${heroImage})` }"
        >
          <div class="absolute inset-0 bg-gradient-to-t from-white via-white/60 to-transparent"></div>
        </div>
        <div class="relative container mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-end pb-10">
          <h1 class="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">松岛川树</h1>
          <p class="mt-2 text-sm text-gray-500">记录技术思考与生活感悟</p>
          <div class="mt-3 flex items-center gap-4 text-xs text-gray-400">
            <span>{{ posts.length }} 篇文章</span>
            <span class="w-1 h-1 rounded-full bg-gray-300"></span>
            <span>{{ categories.length - 1 }} 个分类</span>
          </div>
        </div>
      </header>

      <!-- Category Filter -->
      <nav class="sticky top-0 z-20 bg-white/90 backdrop-blur-sm border-b border-gray-100">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex gap-2 py-3 overflow-x-auto scrollbar-hide">
            <button
              v-for="cat in categories"
              :key="cat.value"
              @click="selectCategory(cat.value)"
              :class="[
                'px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors',
                selectedCategory === cat.value
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
              ]"
            >
              {{ cat.label }}
              <span :class="selectedCategory === cat.value ? 'text-gray-400' : 'text-gray-300'" class="ml-1">
                {{ getCategoryCount(cat.value) }}
              </span>
            </button>
          </div>
        </div>
      </nav>

      <!-- Posts -->
      <main class="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div v-if="paginatedPosts.length === 0" class="text-center py-20">
          <p class="text-gray-400">暂无文章</p>
        </div>

        <div v-else class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <NuxtLink
            v-for="post in paginatedPosts"
            :key="post.key"
            :to="getPostLink(post)"
            class="group block bg-white rounded-xl border border-gray-100 p-5 hover:shadow-lg hover:border-gray-200 transition-all duration-200 hover:-translate-y-0.5"
          >
            <div class="flex items-center gap-2 mb-3">
              <span :class="['px-2 py-0.5 text-[10px] font-semibold rounded tracking-wide', getCategoryColor(post.category)]">
                {{ post.category }}
              </span>
              <span v-if="post.date" class="text-[11px] text-gray-400">{{ formatDate(post.date) }}</span>
            </div>
            <h2 class="text-sm font-semibold text-gray-800 group-hover:text-gray-600 transition-colors line-clamp-2 leading-snug mb-2">
              {{ post.title }}
            </h2>
            <p v-if="post.description" class="text-xs text-gray-400 line-clamp-2 leading-relaxed mb-3">
              {{ post.description }}
            </p>
            <div class="flex items-center gap-1 text-[11px] text-gray-400 group-hover:text-gray-600 transition-colors">
              <span>阅读全文</span>
              <svg class="w-3 h-3 translate-x-0 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
            </div>
          </NuxtLink>
        </div>

        <!-- Pagination -->
        <div v-if="totalPages > 1" class="mt-10 flex items-center justify-center">
          <nav class="flex items-center gap-1.5">
            <button
              @click="goToPage(currentPage - 1)"
              :disabled="currentPage === 1"
              class="w-8 h-8 flex items-center justify-center rounded text-xs text-gray-500 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
            </button>

            <template v-for="page in visiblePages" :key="page">
              <span v-if="page === '...'" class="w-8 h-8 flex items-center justify-center text-gray-300 text-xs">…</span>
              <button
                v-else
                @click="goToPage(page)"
                :class="[
                  'w-8 h-8 flex items-center justify-center rounded text-xs transition-colors',
                  currentPage === page
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-500 hover:bg-gray-100'
                ]"
              >
                {{ page }}
              </button>
            </template>

            <button
              @click="goToPage(currentPage + 1)"
              :disabled="currentPage === totalPages"
              class="w-8 h-8 flex items-center justify-center rounded text-xs text-gray-500 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
            </button>
          </nav>
          <span class="ml-3 text-xs text-gray-400">{{ currentPage }} / {{ totalPages }}</span>
        </div>
      </main>

      <!-- Footer -->
      <footer class="border-t border-gray-100 mt-16">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p class="text-center text-xs text-gray-400">
            © 2026 松岛川树 · Built with Nuxt 4
          </p>
        </div>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
const BASE_URL = 'https://blog-static.openserve.cloud'
const PAGE_SIZE = 8

const { heroImage, bgImage } = useRandomImages()

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

const route = useRoute()
const router = useRouter()

const selectedCategory = computed({
  get: () => (route.query.category as string) || 'all',
  set: (val: string) => selectCategory(val)
})

const currentPage = computed({
  get: () => Math.max(1, parseInt(route.query.page as string) || 1),
  set: (val: number) => goToPage(val)
})

const { data: manifest } = await useFetch(`${BASE_URL}/manifest.json`, { key: 'manifest' })



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
    blog: 'bg-sky-50 text-sky-600',
    life: 'bg-emerald-50 text-emerald-600',
    record: 'bg-amber-50 text-amber-600',
    root: 'bg-violet-50 text-violet-600',
  }
  return colors[category] || 'bg-gray-50 text-gray-500'
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
