<template>
  <div class="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
    <div
      class="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000"
      :class="bgReady ? 'opacity-100' : 'opacity-0'"
      :style="bgImage ? { backgroundImage: `url(${bgImage})` } : {}"
    >
      <div class="absolute inset-0 bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm"></div>
    </div>
    <div class="relative z-10">
      <PageNav />
      <main class="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 class="text-4xl font-bold mb-8">分类</h1>
        <div v-if="hasError" class="text-center py-20 text-gray-400 dark:text-gray-500">
          <p class="mb-4">文章列表加载失败，请稍后重试</p>
          <button type="button" @click="retry" class="px-4 py-2 text-xs rounded-full bg-gray-900 text-white dark:bg-white dark:text-gray-900">重试</button>
        </div>
        <div v-if="categoryList.length > 0" class="space-y-3">
          <NuxtLink
            v-for="cat in categoryList"
            :key="cat.name"
            :to="`/?category=${cat.name}`"
            class="group block p-4 rounded-xl border border-gray-100 dark:border-gray-800 bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-800 hover:border-gray-200 dark:hover:border-gray-700 hover:shadow-md transition-all duration-300"
          >
            <div class="flex items-center justify-between">
              <span class="text-lg font-medium" :class="getCategoryColor(cat.name)">{{ cat.name }}</span>
              <span class="text-sm text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-400 transition-colors">
                {{ cat.count }} 篇文章 →
              </span>
            </div>
          </NuxtLink>
        </div>
        <div v-else-if="!hasError && status !== 'pending'" class="text-center py-20 text-gray-400 dark:text-gray-500">
          暂无分类...
        </div>
        <div v-else-if="status === 'pending'" class="text-center py-20 text-gray-400 dark:text-gray-500">加载中...</div>
      </main>
      <PageFooter />
    </div>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: '分类 - 松岛川树',
  ogTitle: '分类 - 松岛川树',
  description: '所有文章分类，快速找到你感兴趣的内容。',
  ogDescription: '所有文章分类，快速找到你感兴趣的内容。',
})

const { bgImage, bgReady } = useRandomImages()
const { manifest, status, hasError, retry } = useBlogManifest()

const categoryList = computed(() => {
  if (!manifest.value?.posts) return []
  const map = new Map<string, number>()
  for (const post of manifest.value.posts) {
    const cat = post.category || '未分类'
    map.set(cat, (map.get(cat) || 0) + 1)
  }
  return Array.from(map.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
})

function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    blog: 'text-sky-600 dark:text-sky-400',
    life: 'text-emerald-600 dark:text-emerald-400',
    record: 'text-amber-600 dark:text-amber-400',
    root: 'text-violet-600 dark:text-violet-400',
  }
  return colors[category] || 'text-gray-600 dark:text-gray-400'
}
</script>
