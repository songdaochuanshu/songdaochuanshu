<template>
  <div class="min-h-screen bg-[#f7f4ef] text-[#1c1917]">
    <!-- Hero Header -->
    <header class="bg-[#1c1917] text-white relative overflow-hidden">
      <div class="absolute inset-0 opacity-[0.04]" style="background-image: radial-gradient(circle, #fff 1px, transparent 1px); background-size: 24px 24px;"></div>
      <div class="relative container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div class="max-w-3xl">
          <div class="flex items-center gap-3 mb-5">
            <span class="w-8 h-0.5 bg-[#c2410c]"></span>
            <span class="text-xs tracking-[0.2em] text-[#a8a29e] uppercase">Blog</span>
          </div>
          <h1 class="text-5xl sm:text-6xl font-bold tracking-tight mb-4 leading-none">
            松岛川树
          </h1>
          <p class="text-base text-[#a8a29e] leading-relaxed mt-4">
            记录技术思考与生活感悟
          </p>
          <div class="mt-8 flex items-center gap-6 text-xs text-[#57534e]">
            <span>{{ posts.length }} 篇文章</span>
            <span class="w-1 h-1 rounded-full bg-[#57534e]"></span>
            <span>{{ categories.length - 1 }} 个分类</span>
          </div>
        </div>
      </div>
    </header>

    <!-- Category Filter -->
    <nav class="sticky top-0 z-10 bg-[#f7f4ef]/90 backdrop-blur-md border-b border-[#e8e2d9]">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex gap-2 py-3 overflow-x-auto scrollbar-hide">
          <button
            v-for="cat in categories"
            :key="cat.value"
            @click="selectCategory(cat.value)"
            :class="[
              'px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200',
              selectedCategory === cat.value
                ? 'bg-[#c2410c] text-white shadow-sm'
                : 'bg-white text-[#78716c] border border-[#e8e2d9] hover:border-[#c2410c] hover:text-[#c2410c]'
            ]"
          >
            {{ cat.label }}
            <span :class="selectedCategory === cat.value ? 'text-orange-200' : 'text-[#a8a29e]'">
              ({{ getCategoryCount(cat.value) }})
            </span>
          </button>
        </div>
      </div>
    </nav>

    <!-- Posts Grid -->
    <main class="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div v-if="paginatedPosts.length === 0" class="text-center py-20">
        <p class="text-[#a8a29e] text-lg">暂无文章</p>
      </div>

      <div v-else class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <NuxtLink
          v-for="post in paginatedPosts"
          :key="post.key"
          :to="getPostLink(post)"
          class="group block bg-white rounded-xl p-5 border border-[#e8e2d9] hover:border-[#c2410c]/30 hover:shadow-[0_4px_20px_rgba(194,65,12,0.08)] transition-all duration-300 hover:-translate-y-0.5"
        >
          <!-- Top row -->
          <div class="flex items-center justify-between mb-3">
            <span :class="['px-2 py-0.5 text-[10px] font-semibold rounded tracking-wide uppercase', getCategoryColor(post.category)]">
              {{ post.category }}
            </span>
            <span v-if="post.date" class="text-[10px] text-[#a8a29e]">
              {{ formatDate(post.date) }}
            </span>
          </div>

          <!-- Title -->
          <h2 class="text-sm font-semibold text-[#1c1917] group-hover:text-[#c2410c] transition-colors line-clamp-2 mb-2 leading-snug">
            {{ post.title }}
          </h2>

          <!-- Description -->
          <p v-if="post.description" class="text-xs text-[#78716c] line-clamp-2 leading-relaxed">
            {{ post.description }}
          </p>
          <p v-else class="text-xs text-[#a8a29e] italic">暂无描述</p>

          <!-- Bottom arrow -->
          <div class="mt-4 flex items-center gap-1 text-[10px] text-[#a8a29e] group-hover:text-[#c2410c] transition-colors">
            <span>阅读全文</span>
            <svg class="w-3 h-3 translate-x-0 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </div>
        </NuxtLink>
      </div>

      <!-- Pagination -->
      <div v-if="totalPages > 1" class="mt-12 flex items-center justify-center">
        <nav class="flex items-center gap-1">
          <button
            @click="goToPage(currentPage - 1)"
            :disabled="currentPage === 1"
            class="w-9 h-9 flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed bg-white border border-[#e8e2d9] text-[#78716c] hover:border-[#c2410c] hover:text-[#c2410c]"
            aria-label="上一页"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
          </button>

          <template v-for="page in visiblePages" :key="page">
            <span v-if="page === '...'" class="w-9 h-9 flex items-center justify-center text-[#a8a29e]">…</span>
            <button
              v-else
              @click="goToPage(page)"
              :class="[
                'w-9 h-9 flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-200',
                currentPage === page
                  ? 'bg-[#c2410c] text-white shadow-sm'
                  : 'bg-white border border-[#e8e2d9] text-[#78716c] hover:border-[#c2410c] hover:text-[#c2410c]'
              ]"
            >
              {{ page }}
            </button>
          </template>

          <button
            @click="goToPage(currentPage + 1)"
            :disabled="currentPage === totalPages"
            class="w-9 h-9 flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed bg-white border border-[#e8e2d9] text-[#78716c] hover:border-[#c2410c] hover:text-[#c2410c]"
            aria-label="下一页"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
          </button>
        </nav>

        <span class="ml-4 text-sm text-[#a8a29e]">
          {{ currentPage }} / {{ totalPages }}
        </span>
      </div>
    </main>

    <!-- Footer -->
    <footer class="border-t border-[#e8e2d9] bg-[#1c1917] mt-16">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <p class="text-center text-sm text-[#57534e]">
          © 2026 松岛川树 · Built with Nuxt 4 & Cloudflare R2
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
    blog: 'bg-sky-50 text-sky-700',
    life: 'bg-emerald-50 text-emerald-700',
    record: 'bg-amber-50 text-amber-700',
    root: 'bg-violet-50 text-violet-700',
  }
  return colors[category] || 'bg-stone-100 text-stone-600'
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
</style>
