<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <nav class="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
      <div class="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <NuxtLink to="/" class="flex items-center gap-2 text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          <span class="font-medium">返回首页</span>
        </NuxtLink>
        <h1 class="text-lg font-semibold text-gray-900 dark:text-white">友情链接</h1>
        <ThemeToggle />
      </div>
    </nav>

    <main class="pt-24 pb-16 px-4">
      <div class="max-w-4xl mx-auto">
        <div class="text-center mb-12">
          <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">友情链接</h1>
          <p class="text-gray-600 dark:text-gray-400">感谢这些优秀的博主和朋友</p>
        </div>

        <div v-if="categories.length > 0" class="flex flex-wrap justify-center gap-2 mb-8">
          <button @click="activeCategory = ''" :class="['px-4 py-2 rounded-full text-sm font-medium transition-colors', activeCategory === '' ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600']">全部 ({{ links.length }})</button>
          <button v-for="cat in categories" :key="cat" @click="activeCategory = cat" :class="['px-4 py-2 rounded-full text-sm font-medium transition-colors', activeCategory === cat ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600']">{{ cat }} ({{ getLinksByCategory(cat).length }})</button>
        </div>

        <div v-if="loading" class="text-center py-12">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p class="mt-4 text-gray-500 dark:text-gray-400">加载中...</p>
        </div>

        <div v-else-if="error" class="text-center py-12">
          <p class="text-red-500 dark:text-red-400">{{ error }}</p>
          <button @click="fetchLinks" class="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">重试</button>
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <a v-for="link in filteredLinks" :key="link.url" :href="link.url" target="_blank" rel="noopener noreferrer" class="group block bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600">
            <div class="p-6">
              <div class="flex items-start gap-4">
                <img :src="link.avatar" :alt="link.name" class="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 flex-shrink-0" @error="handleAvatarError" />
                <div class="flex-1 min-w-0">
                  <h3 class="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">{{ link.name }}</h3>
                  <p class="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">{{ link.description }}</p>
                  <span v-if="link.category" class="inline-block mt-2 px-2 py-0.5 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded">{{ link.category }}</span>
                </div>
              </div>
            </div>
          </a>
        </div>

        <div v-if="!loading && !error && filteredLinks.length === 0" class="text-center py-12">
          <p class="text-gray-500 dark:text-gray-400">暂无友链</p>
        </div>
      </div>
    </main>

    <footer class="py-8 text-center text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700">
      <p>© 2024 松岛川树. All rights reserved.</p>
    </footer>
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

const links = ref<FriendLink[]>([])
const loading = ref(true)
const error = ref('')
const activeCategory = ref('')

const fetchLinks = async () => {
  loading.value = true
  error.value = ''
  try {
    const response = await fetch('https://songdaochuanshu-static.9fc8fa0ea2d6a5c7dbc2a6196b3139a3.r2.cloudflarestorage.com/friends.json')
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

const getLinksByCategory = (category: string) => {
  return links.value.filter(link => link.category === category)
}

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