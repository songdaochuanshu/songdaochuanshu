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
  const range = 3 // 显示前后各多少页
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
  <div class="flex items-center justify-center mt-4">
    <button :disabled="currentPage === 1" class="px-3 py-2 mx-1 bg-gray-200 rounded" @click="onPageChange(currentPage - 1)">
      Previous
    </button>
    <template v-for="(page, index) in displayedPages" :key="index">
      <span v-if="page === '...'">...</span>
      <button
        v-else
        class="px-3 py-2 mx-1 rounded" :class="[{ 'bg-gray-500 text-white': currentPage === page }]"
        @click="onPageChange(page)"
      >
        {{ page }}
      </button>
    </template>
    <button :disabled="currentPage === totalPages" class="px-3 py-2 mx-1 bg-gray-200 rounded" @click="onPageChange(currentPage + 1)">
      Next
    </button>
  </div>
</template>

<style scoped>
button {
  cursor: pointer;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

button:hover:not(:disabled) {
  background-color: #e0e0e0;
}

button.bg-gray-500 {
  background-color: #6b7280; /* 更改当前页码按钮的背景颜色 */
}

button.bg-gray-500:hover {
  background-color: #6b7280; /* 确保悬停时背景颜色不变 */
}
</style>
