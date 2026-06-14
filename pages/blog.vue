<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Pagination from '~/components/Pagination.vue'
import Cell from '~/components/Cell.vue'

const route = useRoute()
const router = useRouter()

// 默认每页 15 篇（712 篇 / 15 = 约 48 页，比 10 篇少很多）
const perPage = ref(15)
// 从 URL 获取当前页
const currentPage = ref(Number(route.query.page) || 1)
// 确保页数在合理范围内
if (currentPage.value < 1) currentPage.value = 1

// 使用 queryContent 的 cursor 分页（比 skip/limit 高效得多）
const { data: postPage, pending, error } = await useAsyncData(
  `blog-posts-${currentPage.value}-${perPage.value}`,
  async () => {
    // 一次查询：获取数据 + 总数
    const posts = await queryContent('blog')
      .sort({ date: -1 })
      .skip((currentPage.value - 1) * perPage.value)
      .limit(perPage.value)
      .find()

    const totalResult = await queryContent('blog').count()
    const total = totalResult[0]?.count || 0

    return {
      posts,
      total,
      currentPage: currentPage.value,
    }
  },
  { watch: [() => currentPage.value, perPage] },
)

const totalPosts = computed(() => postPage.value?.total || 0)
const totalPages = computed(() => Math.ceil(totalPosts.value / perPage.value))
// 确保当前页不超过总页数
const safeCurrentPage = computed(() => {
  if (currentPage.value > totalPages.value && totalPages.value > 0) {
    return totalPages.value
  }
  return currentPage.value
})

// SEO
useHead({
  title: `博客文章 - 第 ${safeCurrentPage.value} 页`,
  meta: [
    {
      name: 'description',
      content: `共 ${totalPosts.value} 篇文章，第 ${safeCurrentPage.value} 页`,
    },
  ],
})

// 当 URL 中的 page 参数变化时更新
watch(
  () => route.query.page,
  (newPage) => {
    const page = Number(newPage) || 1
    if (page !== currentPage.value && page > 0) {
      currentPage.value = page
    }
  },
)

function onPageChange(newPage: number) {
  if (newPage >= 1 && newPage <= totalPages.value) {
    router.push({ query: { page: newPage } })
    // 滚动到顶部
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}
</script>

<template>
  <div class="blog-list-container">
    <!-- Header -->
    <div class="blog-header">
      <h1>博客文章</h1>
      <p class="blog-count">
        共 {{ totalPosts }} 篇文章
        <span v-if="totalPages > 1" class="page-info">
          · 第 {{ safeCurrentPage }} / {{ totalPages }} 页
        </span>
      </p>
    </div>

    <!-- Loading state -->
    <div v-if="pending" class="loading-state">
      <div class="loading-spinner" />
      <p>加载中...</p>
    </div>

    <!-- Error state -->
    <div v-else-if="error" class="error-state">
      <p>加载失败：{{ error.message }}</p>
      <button class="retry-btn" @click="() => router.push({ query: { page: 1 } })">
        返回第一页
      </button>
    </div>

    <!-- Posts list -->
    <TransitionGroup
      v-else-if="postPage?.posts && postPage.posts.length > 0"
      name="post-list"
      tag="ul"
      class="post-list"
    >
      <li
        v-for="post in postPage.posts"
        :key="post._path"
        class="post-item"
      >
        <Cell :article="post" />
      </li>
    </TransitionGroup>

    <!-- Empty state -->
    <div v-else class="empty-state">
      <p>暂无文章</p>
    </div>

    <!-- Pagination -->
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

.page-info {
  opacity: 0.6;
}

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

@keyframes spin {
  to { transform: rotate(360deg); }
}

.retry-btn {
  margin-top: 1rem;
  padding: 0.5rem 1.5rem;
  border: 1px solid var(--border-subtle);
  border-radius: 8px;
  background: transparent;
  color: var(--primary);
  cursor: pointer;
  font-size: 0.9rem;
  transition: var(--common-transition);
}

.retry-btn:hover {
  background: var(--common-bg);
  border-color: var(--common-bd);
}

.post-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  list-style: none;
  padding: 0;
  margin: 0;
}

.post-item {
  transition: transform 0.2s ease;
}

.post-item:hover {
  transform: translateX(4px);
}

/* TransitionGroup animations */
.post-list-enter-active {
  transition: all 0.3s ease-out;
}

.post-list-leave-active {
  transition: all 0.2s ease-in;
}

.post-list-enter-from {
  opacity: 0;
  transform: translateX(20px);
}

.post-list-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}

.post-list-move {
  transition: transform 0.3s ease;
}
</style>
