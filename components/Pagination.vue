<script setup lang="ts">
import { computed } from 'vue'

// 定义 props 类型并接收相关属性
const props = defineProps<{
  totalPages: number
  perPage: number
  currentPage: number
}>()

// 定义 emit 事件以通知父组件更新当前页
const emit = defineEmits(['update:currentPage'])

// 更新当前页的方法
function onPageChange(newPage: number) {
  if (newPage >= 1 && newPage <= props.totalPages)
    emit('update:currentPage', newPage)
}

// 计算要显示的页码
const displayedPages = computed(() => {
  const pages = []
  const range = 3
  const startPage = Math.max(1, props.currentPage - range)
  const endPage = Math.min(props.totalPages, props.currentPage + range)

  if (startPage > 2) pages.push(1)
  if (startPage > 2) pages.push('...')

  for (let i = startPage; i <= endPage; i++)
    pages.push(i)

  if (endPage < props.totalPages - 1) pages.push('...')
  if (endPage < props.totalPages) pages.push(props.totalPages)

  return pages
})
</script>

<template>
  <div class="flex items-center justify-center mt-8 gap-2">
    <button
      :disabled="currentPage === 1"
      class="px-4 py-2 mx-1 rounded-lg bg-[var(--card-bg)] border border-[var(--border-subtle)] text-[var(--primary)] font-medium transition-all duration-300 hover:bg-[var(--common-bg)] hover:border-[var(--common-bd)] hover:-translate-y-0.5 disabled:op-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
      @click="onPageChange(currentPage - 1)"
    >
      <span class="i-icon-park-outline-left mr-1"></span>
      Prev
    </button>
    <template v-for="(page, index) in displayedPages" :key="index">
      <span v-if="page === '...'" class="px-2 py-2 text-[var(--text-secondary)]">...</span>
      <button
        v-else
        class="w-10 h-10 mx-1 rounded-lg flex items-center justify-center font-medium transition-all duration-300"
        :class="[
          currentPage === page
            ? 'bg-gradient-to-r from-[#4a7c6f] to-[#6b9e8a] text-white shadow-md hover:shadow-lg'
            : 'bg-[var(--card-bg)] border border-[var(--border-subtle)] text-[var(--primary)] hover:bg-[var(--common-bg)] hover:border-[var(--common-bd)] hover:-translate-y-0.5'
        ]"
        @click="onPageChange(page)"
      >
        {{ page }}
      </button>
    </template>
    <button
      :disabled="currentPage === totalPages"
      class="px-4 py-2 mx-1 rounded-lg bg-[var(--card-bg)] border border-[var(--border-subtle)] text-[var(--primary)] font-medium transition-all duration-300 hover:bg-[var(--common-bg)] hover:border-[var(--common-bd)] hover:-translate-y-0.5 disabled:op-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
      @click="onPageChange(currentPage + 1)"
    >
      Next
      <span class="i-icon-park-outline-right ml-1"></span>
    </button>
  </div>
</template>

<style scoped>
button {
  cursor: pointer;
}

button:disabled {
  cursor: not-allowed;
}
</style>