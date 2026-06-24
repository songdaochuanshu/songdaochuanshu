<template>
  <div v-if="seriesPosts.length > 0" class="mb-6 p-4 rounded-lg border border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/30">
    <p class="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">
      📚 {{ seriesName }}
    </p>
    <ol class="space-y-1.5">
      <li
        v-for="(sp, idx) in seriesPosts"
        :key="sp.key"
        :class="[
          'flex items-start gap-2 text-xs leading-relaxed',
          sp.key === currentKey ? 'text-gray-900 dark:text-white font-medium' : 'text-gray-500 dark:text-gray-400'
        ]"
      >
        <span class="flex-shrink-0 w-4 text-right text-[10px] text-gray-400 dark:text-gray-500 mt-0.5">{{ idx + 1 }}</span>
        <NuxtLink
          v-if="sp.key !== currentKey"
          :to="`/posts/${sp.key}`"
          class="hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          {{ sp.title }}
        </NuxtLink>
        <span v-else class="text-gray-900 dark:text-white">{{ sp.title }}</span>
      </li>
    </ol>
  </div>
</template>

<script setup lang="ts">
interface PostMeta {
  key: string
  title: string
  series?: string
  seriesOrder?: number
}

const props = defineProps<{
  currentKey: string
  allPosts: PostMeta[]
  currentSeries?: string
}>()

const seriesPosts = computed(() => {
  if (!props.currentSeries) return []
  return props.allPosts
    .filter(p => p.series === props.currentSeries)
    .sort((a, b) => (a.seriesOrder || 0) - (b.seriesOrder || 0))
})

const seriesName = computed(() => props.currentSeries || '')
</script>
