<template>
  <div class="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 relative">
    <!-- Full-page background illustration -->
    <div class="fixed inset-0 z-0">
      <div
        class="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000"
        :class="bgReady ? 'opacity-20 dark:opacity-10' : 'opacity-0'"
        :style="{ backgroundImage: `url(${bgImage})` }"
      ></div>
      <div class="absolute inset-0 bg-gradient-to-b from-white/80 via-white/60 to-white dark:from-gray-900/80 dark:via-gray-900/60 dark:to-gray-900"></div>
    </div>

    <div class="relative z-10 max-w-3xl mx-auto px-6 py-12 sm:py-16">
      <!-- Hero area with image -->
      <header class="relative mb-12 h-72 sm:h-96 rounded-2xl overflow-hidden">
        <!-- Hero background image -->
        <div
          class="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 scale-105"
          :class="heroReady ? 'opacity-100' : 'opacity-0'"
          :style="{ backgroundImage: `url(${heroImage})` }"
        ></div>
        <!-- Gradient overlay for text readability -->
        <div class="absolute inset-0 bg-gradient-to-t from-white dark:from-gray-900 via-white/60 dark:via-gray-900/60 to-transparent"></div>
        <!-- Navigation links -->
        <nav class="absolute top-6 right-4 sm:right-6 lg:right-8 flex items-center gap-3 z-20">
          <NuxtLink
            v-for="link in [
              { to: '/archive', label: '归档' },
              { to: '/categories', label: '分类' },
              { to: '/tags', label: '标签' },
              { to: '/me', label: '关于' },
            ]"
            :key="link.to"
            :to="link.to"
            :class="navTextClass"
            class="text-sm transition-colors duration-300"
          >
            {{ link.label }}
          </NuxtLink>
          <ThemeToggle />
          <a
            href="https://github.com/songdaochuanshu"
            target="_blank"
            rel="noopener noreferrer"
            :class="navTextClass"
            class="transition-colors duration-300"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </a>
        </nav>
        <!-- Hero content -->
        <div class="absolute bottom-0 left-0 p-8 z-10">
          <h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-3">
            <span class="bg-gradient-to-r from-violet-600 to-blue-500 bg-clip-text text-transparent">松岛川树</span>
          </h1>
          <p class="text-gray-500 dark:text-gray-400 text-sm sm:text-base">
            记录技术思考与生活感悟
          </p>
          <div class="flex gap-4 mt-4 text-xs text-gray-400 dark:text-gray-500">
            <span>{{ posts.length }} 篇文章</span>
            <span>·</span>
            <span>{{ categories.length - 1 }} 个分类</span>
          </div>
        </div>
      </header>

      <!-- Search bar -->
      <div class="mb-8">
        <div class="relative">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="搜索文章..."
            class="w-full px-4 py-3 pl-10 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-violet-500/50 dark:focus:ring-violet-400/50 text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 transition-all duration-300"
          />
          <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      <!-- Categories filter -->
      <div class="mb-8 flex flex-wrap gap-2">
        <button
          v-for="cat in categories"
          :key="cat.value"
          @click="selectedCategory = cat.value"
          :class="[
            'px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300',
            selectedCategory === cat.value
              ? 'bg-violet-500 text-white shadow-sm'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
          ]"
        >
          {{ cat.label }}
          <span class="ml-1 opacity-60">{{ getCategoryCount(cat.value) }}</span>
        </button>
      </div>

      <!-- Posts list -->
      <div class="space-y-4">
        <!-- Skeleton loading -->
        <template v-if="status === 'pending'">
          <div v-for="i in 5" :key="i" class="animate-pulse">
            <div class="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-800">
              <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-3"></div>
              <div class="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
              <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
              <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
            </div>
          </div>
        </template>

        <!-- Actual posts -->
        <template v-else>
          <NuxtLink
            v-for="post in paginatedPosts"
            :key="post._path"
            :to="post._path"
            class="group block bg-white dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 border border-gray-100 dark:border-gray-800 hover:border-violet-200 dark:hover:border-violet-800 hover:shadow-lg hover:shadow-violet-500/5 transition-all duration-300"
          >
            <div class="flex items-center gap-2 text-xs text-violet-600 dark:text-violet-400 mb-2">
              <span class="font-medium">{{ post.category }}</span>
              <span class="text-gray-300 dark:text-gray-600">·</span>
              <time :datetime="post.date" class="text-gray-400 dark:text-gray-500">{{ formatDate(post.date) }}</time>
              <span class="text-gray-300 dark:text-gray-600">·</span>
              <span class="text-gray-400 dark:text-gray-500">{{ post.readingTime }} 分钟</span>
            </div>
            <h2 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
              {{ post.title }}
            </h2>
            <p v-if="post.description" class="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
              {{ post.description }}
            </p>
          </NuxtLink>

          <!-- Empty state -->
          <div v-if="paginatedPosts.length === 0" class="text-center py-12">
            <p class="text-gray-400 dark:text-gray-500">暂无文章</p>
          </div>
        </template>
      </div>

      <!-- Pagination -->
      <div v-if="totalPages > 1" class="mt-8 flex items-center justify-center gap-2">
        <button
          @click="currentPage--"
          :disabled="currentPage <= 1"
          class="px-3 py-1.5 rounded-lg text-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
        >
          上一页
        </button>
        <template v-for="page in totalPages" :key="page">
          <button
            v-if="page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1)"
            @click="currentPage = page"
            :class="[
              'w-8 h-8 rounded-lg text-sm transition-all duration-300',
              currentPage === page
                ? 'bg-violet-500 text-white'
                : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
            ]"
          >
            {{ page }}
          </button>
          <span v-else-if="page === currentPage - 2 || page === currentPage + 2" class="text-gray-400 dark:text-gray-500">...</span>
        </template>
        <button
          @click="currentPage++"
          :disabled="currentPage >= totalPages"
          class="px-3 py-1.5 rounded-lg text-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
        >
          下一页
        </button>
      </div>

      <!-- Page indicator -->
      <div v-if="totalPages > 1" class="mt-4 text-center text-xs text-gray-400 dark:text-gray-500">
        {{ currentPage }} / {{ totalPages }}
      </div>

      <!-- Footer -->
      <footer class="mt-16 pt-8 border-t border-gray-100 dark:border-gray-800">
        <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div class="text-sm text-gray-400 dark:text-gray-500">
            © 2026 <span class="bg-gradient-to-r from-violet-600 to-blue-500 bg-clip-text text-transparent">松岛川树</span> · Built with Nuxt 4
          </div>
          <div class="flex items-center gap-3">
            <NuxtLink to="/rss.xml" class="text-gray-400 dark:text-gray-500 hover:text-violet-500 dark:hover:text-violet-400 transition-colors">
              RSS
            </NuxtLink>
          </div>
        </div>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
const BASE_URL = 'https://blog-static.openserve.cloud'
const POSTS_PER_PAGE = 7

// Random images with progressive loading
const { heroImage, bgImage, bgReady, heroReady } = useRandomImages()

// Dynamic nav text color based on hero image pixel analysis
const { navTextClass } = useNavTextColor(heroImage, heroReady)

// Search and filter state
const searchQuery = ref('')
const selectedCategory = ref('all')
const currentPage = ref(1)

// Fetch all posts from Nuxt Content
const { data: postsData, status } = await useAsyncData('posts', () =>
  queryContent('/posts')
    .where({ _draft: { $ne: true } })
    .sort({ date: -1 })
    .find()
)

const posts = computed(() => postsData.value || [])

// Extract categories from posts
const categories = computed(() => {
  const cats = new Map<string, { label: string; value: string }>()
  cats.set('all', { label: '全部', value: 'all' })
  posts.value.forEach((post: any) => {
    if (post.category && !cats.has(post.category)) {
      cats.set(post.category, { label: post.category, value: post.category })
    }
  })
  return Array.from(cats.values())
})

// Filter posts by category and search
const filteredPosts = computed(() => {
  let result = posts.value

  // Category filter
  if (selectedCategory.value !== 'all') {
    result = result.filter((post: any) => post.category === selectedCategory.value)
  }

  // Search filter
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter((post: any) =>
      post.title?.toLowerCase().includes(query) ||
      post.description?.toLowerCase().includes(query) ||
      post.category?.toLowerCase().includes(query)
    )
  }

  return result
})

// Pagination
const totalPages = computed(() => Math.ceil(filteredPosts.value.length / POSTS_PER_PAGE))
const paginatedPosts = computed(() => {
  const start = (currentPage.value - 1) * POSTS_PER_PAGE
  return filteredPosts.value.slice(start, start + POSTS_PER_PAGE)
})

// Reset page when filters change
watch([selectedCategory, searchQuery], () => {
  currentPage.value = 1
})

// Format date
function formatDate(date: string) {
  if (!date) return ''
  return new Date(date).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

// Category count
function getCategoryCount(category: string) {
  if (category === 'all') return posts.value.length
  return posts.value.filter((post: any) => post.category === category).length
}
</script>

<style>
.scrollbar-hide::-webkit-scrollbar { display: none; }
.scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
</style>
