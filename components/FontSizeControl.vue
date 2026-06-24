<template>
  <div class="flex items-center gap-1.5">
    <button
      @click="decrease"
      :disabled="currentSize <= sizes[0]"
      class="w-7 h-7 flex items-center justify-center rounded border border-gray-200 dark:border-gray-700 text-xs text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
    >
      A-
    </button>
    <span class="text-[10px] text-gray-400 dark:text-gray-500 w-6 text-center">{{ label }}</span>
    <button
      @click="increase"
      :disabled="currentSize >= sizes[sizes.length - 1]"
      class="w-7 h-7 flex items-center justify-center rounded border border-gray-200 dark:border-gray-700 text-xs text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
    >
      A+
    </button>
  </div>
</template>

<script setup lang="ts">
const sizes = [14, 15, 16, 17, 18, 20]
const currentSize = ref(16)

const label = computed(() => `${currentSize.value}px`)

function apply() {
  document.documentElement.style.setProperty('--prose-font-size', `${currentSize.value}px`)
  localStorage.setItem('prose-font-size', String(currentSize.value))
}

function increase() {
  const idx = sizes.indexOf(currentSize.value)
  if (idx < sizes.length - 1) {
    currentSize.value = sizes[idx + 1]
    apply()
  }
}

function decrease() {
  const idx = sizes.indexOf(currentSize.value)
  if (idx > 0) {
    currentSize.value = sizes[idx - 1]
    apply()
  }
}

onMounted(() => {
  const saved = localStorage.getItem('prose-font-size')
  if (saved) {
    const val = parseInt(saved)
    if (sizes.includes(val)) {
      currentSize.value = val
    }
  }
  apply()
})
</script>
