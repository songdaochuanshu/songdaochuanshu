<script setup lang="ts">
import { computed, ref } from 'vue'
import Pagination from './Pagination.vue'
import Cell from './Cell.vue'

// 定义 Post 接口
interface Post {
  _path: string
  isMarked: boolean
  year?: number // 年份可能是可选的，取决于你的数据结构
  // ... 其他属性
}

// 定义 props 类型并接收 posts 属性
const props = defineProps<{
  posts: Post[]
}>()

// 分页相关状态
const currentPage = ref(1)
const perPage = ref(5)

// 计算分页后的内容
const paginatedPosts = computed(() => {
  const start = (currentPage.value - 1) * perPage.value
  const end = start + perPage.value
  return props.posts.slice(start, end)
})

// 计算总页数
const totalPages = computed(() => Math.ceil(props.posts.length / perPage.value))

// 更新当前页的方法
function onPageChange(newPage: number) {
  if (newPage >= 1 && newPage <= totalPages.value)
    currentPage.value = newPage
}

// 截断文本的方法
function truncatedYear(year: number | undefined): string {
  if (!year) return ''
  const truncatedText = year.toString().slice(0, 30)
  return truncatedText.length === 30 ? `${truncatedText}...` : truncatedText
}
</script>

<template>
  <ul class="flex flex-wrap -mx-3">
    <template v-for="(article, index) in paginatedPosts" :key="article._path">
      <transition name="slide-enter">
        <div v-if="article.isMarked" class="pointer-events-none select-none h-20 slide-item w-full fixed" :style="{ '--stagger': index + 1 }">
          <!-- 使用 w-full 确保 div 占据整个可用宽度 -->
          <span class="text-8em font-bold op-15 absolute -top-0.2em  text-right color-transparent text-stroke-2 text-stroke-hex-aaa">{{ truncatedYear(article.year) }}</span>
          <!-- 添加 right-0 和 text-right 来让文本靠右对齐 -->
        </div>
        <Cell v-else :article="article" class="slide-item" :class="[{ '--stagger': index + 1 }]" />
      </transition>
    </template>
  </ul>
  <!-- 添加分页组件 -->
  <Pagination
    :total-pages="totalPages"
    :per-page="perPage"
    :current-page="currentPage"
    @update:current-page="onPageChange"
  />
</template>
