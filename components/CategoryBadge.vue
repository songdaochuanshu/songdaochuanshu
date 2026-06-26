<template>
  <span :class="['px-1.5 py-0.5 text-[10px] font-semibold rounded', colorClass]">
    {{ category }}
  </span>
</template>

<script setup lang="ts">
const props = defineProps<{
  category: string
}>()

const colorMap: Record<string, string> = {
  blog: 'bg-sky-50 text-sky-600 dark:bg-sky-900/30 dark:text-sky-400',
  life: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400',
  record: 'bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400',
  root: 'bg-violet-50 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400',
}

const colorClass = computed(() => colorMap[props.category] || 'bg-gray-50 text-gray-500 dark:bg-gray-800 dark:text-gray-400')
</script>
