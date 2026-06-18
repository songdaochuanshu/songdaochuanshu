<script setup lang="ts">
import { useDebounceFn } from '@vueuse/core'
import Cell from '~/components/Cell.vue'
import { getManifest } from '@/utils/r2'

const searchValue = ref('')
const allPosts = ref<any[]>([])
const queryResult = ref<any[]>([])

// 一次性把所有文章拉到前端，搜索在前端做（更快，避免每次搜索打 R2）
await useAsyncData('search-all', async () => {
  const m = await getManifest()
  allPosts.value = m.posts
  return m.posts
})

const doSearch = useDebounceFn(() => {
  const q = searchValue.value.trim().toLowerCase()
  if (!q) {
    queryResult.value = []
    return
  }
  queryResult.value = allPosts.value.filter((p) => {
    return (
      p.title?.toLowerCase().includes(q) ||
      p.description?.toLowerCase().includes(q) ||
      (p.tags || []).some((t: string) => t.toLowerCase().includes(q))
    )
  })
}, 300)

watch(searchValue, doSearch)

useHead({ title: '搜索' })
</script>

<template>
  <h1 class="text-title mb-2em font-bold">Search</h1>
  <div class="slide-enter-content">
    <input
      v-model="searchValue"
      placeholder="Search post title / description / tag"
      class="search-input mb-2em"
    >
    <ul>
      <Cell
        v-for="(article, index) in queryResult"
        :key="article.path"
        :article="article"
        slide-enter
        :style="{ '--stagger': index + 1 }"
      />
    </ul>
  </div>
</template>

<style>
.search-input {
  width: 100%;
  padding: 1em;
  background-color: var(--input-bg);
  border-bottom: 2px solid var(--common-bd);
  outline: none;
  transition: var(--common-transition);
}
.search-input:focus {
  border-color: currentcolor;
}
</style>