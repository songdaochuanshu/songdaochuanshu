<template>
  <div class="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 text-gray-800 relative overflow-hidden">
    <!-- Decorative Background Elements -->
    <div class="fixed inset-0 pointer-events-none overflow-hidden">
      <div class="absolute top-20 left-10 w-32 h-32 bg-pink-200/30 rounded-full blur-3xl animate-float"></div>
      <div class="absolute top-40 right-20 w-40 h-40 bg-purple-200/30 rounded-full blur-3xl animate-float-delayed"></div>
      <div class="absolute bottom-32 left-1/4 w-36 h-36 bg-blue-200/30 rounded-full blur-3xl animate-float"></div>
      <div class="absolute bottom-20 right-1/3 w-28 h-28 bg-indigo-200/30 rounded-full blur-3xl animate-float-delayed"></div>
      <!-- Stars -->
      <div class="absolute top-10 left-1/4 w-2 h-2 bg-yellow-300 rounded-full animate-twinkle"></div>
      <div class="absolute top-1/3 right-1/4 w-1.5 h-1.5 bg-pink-300 rounded-full animate-twinkle-delayed"></div>
      <div class="absolute bottom-1/3 left-1/3 w-2 h-2 bg-purple-300 rounded-full animate-twinkle"></div>
      <div class="absolute top-2/3 right-1/3 w-1 h-1 bg-blue-300 rounded-full animate-twinkle-delayed"></div>
    </div>

    <!-- Hero Header -->
    <header class="bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 text-white relative overflow-hidden">
      <div class="absolute inset-0 opacity-20" style="background-image: radial-gradient(circle, #fff 1px, transparent 1px); background-size: 24px 24px;"></div>
      <!-- Decorative circles -->
      <div class="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
      <div class="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>

      <div class="relative container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div class="max-w-3xl">
          <div class="flex items-center gap-3 mb-5">
            <span class="text-3xl">✨</span>
            <span class="text-xs tracking-[0.2em] text-pink-100 uppercase font-semibold">Blog</span>
          </div>
          <h1 class="text-5xl sm:text-6xl font-bold tracking-tight mb-4 leading-none drop-shadow-lg">
            松岛川树
          </h1>
          <p class="text-base text-pink-50 leading-relaxed mt-4 font-medium">
            ✨ 记录技术思考与生活感悟 ✨
          </p>
          <div class="mt-8 flex items-center gap-6 text-xs text-pink-100 font-medium">
            <span>📝 {{ posts.length }} 篇文章</span>
            <span class="w-1 h-1 rounded-full bg-pink-200"></span>
            <span>🗂️ {{ categories.length - 1 }} 个分类</span>
          </div>
        </div>
      </div>
    </header>

    <!-- Category Filter -->
    <nav class="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-pink-100 shadow-sm">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex gap-2 py-3 overflow-x-auto scrollbar-hide">
          <button
            v-for="cat in categories"
            :key="cat.value"
            @click="selectCategory(cat.value)"
            :class="[
              'px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all duration-300 transform hover:scale-105',
              selectedCategory === cat.value
                ? 'bg-gradient-to-r from-pink-400 to-purple-400 text-white shadow-lg shadow-pink-200'
                : 'bg-white text-gray-600 border-2 border-pink-200 hover:border-purple-300 hover:text-purple-500'
            ]"
          >
            {{ cat.label }}
            <span :class="selectedCategory === cat.value ? 'text-pink-100' : 'text-gray-400'">
              ({{ getCategoryCount(cat.value) }})
            </span>
          </button>
        </div>
      </div>
    </nav>

    <!-- Posts Grid -->
    <main class="container mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10">
      <div v-if="paginatedPosts.length === 0" class="text-center py-20">
        <p class="text-purple-300 text-lg font-medium">✨ 暂无文章 ✨</p>
      </div>

      <div v-else class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <NuxtLink
          v-for="post in paginatedPosts"
          :key="post.key"
          :to="getPostLink(post)"
          class="group block bg-white rounded-2xl p-6 border-2 border-pink-100 hover:border-purple-300 hover:shadow-2xl hover:shadow-purple-200/50 transition-all duration-300 hover:-translate-y-2 hover:rotate-1 relative overflow-hidden"
        >
          <!-- Decorative corner -->
          <div class="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-pink-200/30 to-purple-200/30 rounded-bl-full transform translate-x-8 -translate-y-8 group-hover:scale-150 transition-transform duration-500"></div>

          <!-- Top row -->
          <div class="flex items-center justify-between mb-3 relative z-10">
            <span :class="['px-3 py-1 text-xs font-bold rounded-full shadow-sm', getCategoryColor(post.category)]">
              {{ post.category }}
            </span>
            <span v-if="post.date" class="text-xs text-gray-400 font-medium">
              📅 {{ formatDate(post.date) }}
            </span>
          </div>

          <!-- Title -->
          <h2 class="text-base font-bold text-gray-800 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-pink-500 group-hover:to-purple-500 transition-all line-clamp-2 mb-3 leading-snug">
            {{ post.title }}
          </h2>

          <!-- Description -->
          <p v-if="post.description" class="text-sm text-gray-600 line-clamp-2 leading-relaxed mb-4">
            {{ post.description }}
          </p>
          <p v-else class="text-sm text-gray-400 italic mb-4">✨ 暂无描述</p>

          <!-- Bottom arrow -->
          <div class="flex items-center gap-2 text-xs text-purple-400 group-hover:text-pink-500 transition-colors font-bold">
            <span>阅读全文</span>
            <svg class="w-4 h-4 translate-x-0 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </div>
        </NuxtLink>
      </div>

      <!-- Pagination -->
      <div v-if="totalPages > 1" class="mt-12 flex items-center justify-center relative z-10">
        <nav class="flex items-center gap-2">
          <button
            @click="goToPage(currentPage - 1)"
            :disabled="currentPage === 1"
            class="w-10 h-10 flex items-center justify-center rounded-full text-sm font-bold transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed bg-white border-2 border-pink-200 text-purple-500 hover:border-purple-300 hover:bg-purple-50 hover:scale-110 shadow-sm"
            aria-label="上一页"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
          </button>

          <template v-for="page in visiblePages" :key="page">
            <span v-if="page === '...'" class="w-10 h-10 flex items-center justify-center text-purple-300 font-bold">…</span>
            <button
              v-else
              @click="goToPage(page)"
              :class="[
                'w-10 h-10 flex items-center justify-center rounded-full text-sm font-bold transition-all duration-300 hover:scale-110',
                currentPage === page
                  ? 'bg-gradient-to-r from-pink-400 to-purple-400 text-white shadow-lg shadow-purple-200'
                  : 'bg-white border-2 border-pink-200 text-gray-600 hover:border-purple-300 hover:text-purple-500 shadow-sm'
              ]"
            >
              {{ page }}
            </button>
          </template>

          <button
            @click="goToPage(currentPage + 1)"
            :disabled="currentPage === totalPages"
            class="w-10 h-10 flex items-center justify-center rounded-full text-sm font-bold transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed bg-white border-2 border-pink-200 text-purple-500 hover:border-purple-300 hover:bg-purple-50 hover:scale-110 shadow-sm"
            aria-label="下一页"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
          </button>
        </nav>

        <span class="ml-4 text-sm text-purple-400 font-bold">
          {{ currentPage }} / {{ totalPages }}
        </span>
      </div>
    </main>

    <!-- Footer -->
    <footer class="border-t-2 border-pink-200 bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100 mt-16 relative overflow-hidden">
      <div class="absolute inset-0 opacity-30">
        <div class="absolute bottom-0 left-1/4 w-32 h-32 bg-pink-300/30 rounded-full blur-2xl"></div>
        <div class="absolute bottom-0 right-1/4 w-32 h-32 bg-purple-300/30 rounded-full blur-2xl"></div>
      </div>
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        <p class="text-center text-sm text-purple-600 font-medium">
          ✨ © 2026 松岛川树 · Built with Nuxt 4 & Cloudflare R2 ✨
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
const BASE_URL = 'https://blog-static.openserve.cloud'
const PAGE_SIZE = 8

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
    blog: 'bg-gradient-to-r from-pink-200 to-pink-300 text-pink-700 border border-pink-300',
    life: 'bg-gradient-to-r from-green-200 to-emerald-300 text-emerald-700 border border-emerald-300',
    record: 'bg-gradient-to-r from-yellow-200 to-amber-300 text-amber-700 border border-amber-300',
    root: 'bg-gradient-to-r from-purple-200 to-indigo-300 text-indigo-700 border border-indigo-300',
  }
  return colors[category] || 'bg-gradient-to-r from-gray-200 to-gray-300 text-gray-700 border border-gray-300'
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

@keyframes float {
  0%, 100% { transform: translateY(0px) translateX(0px); }
  50% { transform: translateY(-20px) translateX(10px); }
}

@keyframes float-delayed {
  0%, 100% { transform: translateY(0px) translateX(0px); }
  50% { transform: translateY(-15px) translateX(-10px); }
}

@keyframes twinkle {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.3; transform: scale(0.8); }
}

@keyframes twinkle-delayed {
  0%, 100% { opacity: 0.3; transform: scale(0.8); }
  50% { opacity: 1; transform: scale(1.2); }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-float-delayed {
  animation: float-delayed 7s ease-in-out infinite;
}

.animate-twinkle {
  animation: twinkle 2s ease-in-out infinite;
}

.animate-twinkle-delayed {
  animation: twinkle-delayed 3s ease-in-out infinite;
}
</style>
