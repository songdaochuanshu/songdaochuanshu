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
      <PageNav />

      <main class="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-3xl">
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">友情链接</h1>
        <p class="text-xs text-gray-400 dark:text-gray-500 mb-10">感谢这些优秀的博主和朋友</p>

        <div v-if="categories.length > 0" class="flex flex-wrap gap-2 mb-8">
          <button
            @click="activeCategory = ''"
            :class="['px-3 py-1 text-xs rounded-full font-medium transition-colors', activeCategory === '' ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700']"
          >
            全部 ({{ links.length }})
          </button>
          <button
            v-for="cat in categories"
            :key="cat"
            @click="activeCategory = cat"
            :class="['px-3 py-1 text-xs rounded-full font-medium transition-colors', activeCategory === cat ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700']"
          >
            {{ cat }} ({{ getLinksByCategory(cat).length }})
          </button>
        </div>

        <div v-if="loading" class="text-center py-20">
          <div class="w-6 h-6 border-2 border-gray-200 dark:border-gray-700 border-t-gray-600 dark:border-t-gray-300 rounded-full animate-spin mx-auto"></div>
        </div>

        <div v-else-if="error" class="text-center py-20">
          <p class="text-gray-500 dark:text-gray-400 text-sm">{{ error }}</p>
          <button @click="fetchLinks" class="mt-4 text-xs text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">
            重试
          </button>
        </div>

        <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <a
            v-for="link in filteredLinks"
            :key="link.url"
            :href="link.url"
            target="_blank"
            rel="noopener noreferrer"
            class="group flex items-start gap-3 p-4 rounded-lg border border-gray-100 dark:border-gray-800 hover:border-gray-200 dark:hover:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all duration-200"
          >
            <img
              :src="link.avatar"
              :alt="link.name"
              class="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex-shrink-0"
              @error="handleAvatarError"
            />
            <div class="flex-1 min-w-0">
              <h3 class="text-sm font-medium text-gray-900 dark:text-white group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors truncate">
                {{ link.name }}
              </h3>
              <p class="text-xs text-gray-400 dark:text-gray-500 mt-0.5 line-clamp-2">
                {{ link.description }}
              </p>
              <CategoryBadge v-if="link.category" :category="link.category" class="mt-1.5" />
            </div>
          </a>
        </div>

        <div v-if="!loading && !error && filteredLinks.length === 0" class="text-center py-20">
          <p class="text-gray-400 dark:text-gray-500 text-sm">暂无友链</p>
        </div>
      </main>

      <PageFooter />
    </div>

    <BackToTop />
  </div>
</template>

<script setup lang="ts">
interface FriendLink {
  name: string
  url: string
  avatar: string
  description: string
  category?: string
}

const { bgImage, bgReady } = useRandomImages()
const links = ref<FriendLink[]>([])
const loading = ref(true)
const error = ref('')
const activeCategory = ref('')

const fetchLinks = async () => {
  loading.value = true
  error.value = ''
  try {
    const response = await fetch('https://blog-static.openserve.cloud/friends.json')
    if (!response.ok) throw new Error('请求失败')
    const data = await response.json()
    if (data && data.links) {
      links.value = data.links
    } else {
      throw new Error('数据格式错误')
    }
  } catch (e) {
    console.error('获取友链失败:', e)
    error.value = '加载友链失败，请稍后重试'
  } finally {
    loading.value = false
  }
}

const categories = computed(() => {
  const cats = new Set<string>()
  links.value.forEach(link => { if (link.category) cats.add(link.category) })
  return Array.from(cats).sort()
})

const getLinksByCategory = (category: string) => links.value.filter(link => link.category === category)

const filteredLinks = computed(() => {
  if (!activeCategory.value) return links.value
  return links.value.filter(link => link.category === activeCategory.value)
})

const handleAvatarError = (e: Event) => {
  const img = e.target as HTMLImageElement
  img.src = 'https://api.dicebear.com/7.x/avataaars/svg?seed=default'
}

onMounted(() => { fetchLinks() })
</script>

<style scoped>
.line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
</style>