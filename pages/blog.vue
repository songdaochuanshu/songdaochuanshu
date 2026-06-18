<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Pagination from '~/components/Pagination.vue'
import Cell from '~/components/Cell.vue'
import { getPostsByCategory } from '@/utils/r2'

const route = useRoute()
const router = useRouter()

const PER_PAGE = 15
const currentPage = ref(Number(route.query.page) || 1)
if (currentPage.value < 1) currentPage.value = 1

const { data, pending, error, refresh } = await useAsyncData(
  'blog-list',
  () => getPostsByCategory('blog'),
)

const allPosts = computed(() => data.value || [])
const totalPosts = computed(() => allPosts.value.length)
const totalPages = computed(() => Math.max(1, Math.ceil(totalPosts.value / PER_PAGE)))

const safeCurrentPage = computed(() => {
  if (currentPage.value > totalPages.value && totalPages.value > 0) {
    return totalPages.value
  }
  return currentPage.value
})

const paginated = computed(() => {
  const start = (safeCurrentPage.value - 1) * PER_PAGE
  return allPosts.value.slice(start, start + PER_PAGE)
})

useHead({
  title: `博客文章 - 第 ${safeCurrentPage.value} 页`,
  meta: [
    { name: 'description', content: `共 ${totalPosts.value} 篇文章，第 ${safeCurrentPage.value} 页` },
  ],
})

watch(() => route.query.page, (newPage) => {
  const p = Number(newPage) || 1
  if (p !== currentPage.value && p > 0) currentPage.value = p
})

function onPageChange(newPage: number) {
  if (newPage >= 1 && newPage <= totalPages.value) {
    router.push({ query: { page: newPage } })
    if (import.meta.client) window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}
</script>

<template>
  <div class="blog-list-container">
    <div class="blog-header">
      <h1>博客文章</h1>
      <p class="blog-count">
        共 {{ totalPosts }} 篇文章
        <span v-if="totalPages > 1" class="page-info">
          · 第 {{ safeCurrentPage }} / {{ totalPages }} 页
        </span>
      </p>
    </div>

    <div v-if="pending" class="loading-state">
      <div class="loading-spinner" />
      <p>加载中...</p>
    </div>

    <div v-else-if="error" class="error-state">
      <p>加载失败：{{ error.message }}</p>
      <button class="retry-btn" @click="refresh">重试</button>
    </div>

    <TransitionGroup
      v-else-if="paginated.length > 0"
      name="post-list"
      tag="ul"
      class="post-list"
    >
      <li v-for="post in paginated" :key="post.path" class="post-item">
        <Cell :article="post" />
      </li>
    </TransitionGroup>

    <div v-else class="empty-state">
      <p>暂无文章</p>
    </div>

    <Pagination
      v-if="totalPages > 1 && !pending && !error"
      :total-pages="totalPages"
      :current-page="safeCurrentPage"
      @update:current-page="onPageChange"
    />
  </div>
</template>

<style scoped>
.blog-list-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
}

.blog-header {
  border-bottom: 1px solid var(--border-subtle);
  padding-bottom: 1.5rem;
  margin-bottom: 2rem;
}

.blog-header h1 {
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0 0 0.5rem 0;
  letter-spacing: -0.02em;
}

.blog-count {
  color: var(--text-secondary);
  font-size: 1rem;
  margin: 0;
}

.page-info { opacity: 0.6; }

.loading-state,
.error-state,
.empty-state {
  text-align: center;
  padding: 4rem 0;
  color: var(--text-secondary);
}

.loading-spinner {
  width: 32px;
  height: 32px;
  margin: 0 auto 1rem;
  border: 3px solid var(--border-subtle);
  border-top-color: var(--primary);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin { to { transform: rotate(360deg); } }

.retry-btn {
  margin-top: 1rem;
  padding: 0.5rem 1.5rem;
  border: 1px solid var(--border-subtle);
  border-radius: 8px;
  background: transparent;
  color: var(--primary);
  cursor: pointer;
  font-size: 0.9rem;
}

.post-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  list-style: none;
  padding: 0;
  margin: 0;
}

.post-item { transition: transform 0.2s ease; }
.post-item:hover { transform: translateX(4px); }

.post-list-enter-active { transition: all 0.3s ease-out; }
.post-list-leave-active { transition: all 0.2s ease-in; }
.post-list-enter-from { opacity: 0; transform: translateX(20px); }
.post-list-leave-to { opacity: 0; transform: translateX(-20px); }
.post-list-move { transition: transform 0.3s ease; }
</style>