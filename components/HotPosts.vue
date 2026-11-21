<template>
  <div v-if="hotPosts.length > 0" class="mt-10 pt-8 border-t border-gray-100 dark:border-gray-800">
    <p class="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-4">🔥 热门文章</p>
    <div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
      <NuxtLink
        v-for="(post, idx) in hotPosts"
        :key="post.key"
        :to="`/posts/${post.key}`"
        class="group flex items-start gap-3 p-3 rounded-lg border border-gray-100 dark:border-gray-800 hover:border-gray-200 dark:hover:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all"
      >
        <span class="flex-shrink-0 w-5 h-5 flex items-center justify-center rounded text-[10px] font-bold"
          :class="idx < 3 ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900' : 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500'"
        >
          {{ idx + 1 }}
        </span>
        <div class="min-w-0 flex-1">
          <p class="text-xs text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors line-clamp-2 leading-relaxed">
            {{ post.title }}
          </p>
          <p class="text-[10px] text-gray-400 dark:text-gray-500 mt-1">{{ post.views }} 次阅读</p>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
interface PostMeta {
  key: string
  title: string
  category: string
}

const props = defineProps<{
  posts: PostMeta[]
}>()

const hotPosts = ref<(PostMeta & { views: number })[]>([])

watch(
  () => JSON.stringify(props.posts.map((post) => post.key)),
  async (_keys, _previous, onCleanup) => {
    if (!import.meta.client) return
    let active = true
    onCleanup(() => { active = false })
    const posts = props.posts.slice(0, 20)
    if (posts.length === 0) {
      hotPosts.value = []
      return
    }
    try {
      const results = await Promise.all(
        posts.map(async (post) => {
          try {
            const data = await $fetch<{ views: number }>('/api/views', { params: { key: post.key } })
            return { ...post, views: data.views || 0 }
          } catch {
            return { ...post, views: 0 }
          }
        }),
      )
      if (!active) return
      hotPosts.value = results
        .filter((result) => result.views > 0)
        .sort((a, b) => b.views - a.views)
        .slice(0, 5)
    } catch {
      if (active) hotPosts.value = []
    }
  },
  { immediate: true },
)
</script>
