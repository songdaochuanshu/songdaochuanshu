<template>
  <div v-if="items.length > 0" class="lg:hidden">
    <!-- Floating button -->
    <button
      @click="open = !open"
      class="fixed bottom-20 right-4 z-40 w-10 h-10 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
      :class="{ 'bg-gray-100 dark:bg-gray-700': open }"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7"/>
      </svg>
    </button>

    <!-- Drawer -->
    <Transition name="toc-slide">
      <div
        v-if="open"
        class="fixed bottom-32 right-4 z-40 w-64 max-h-80 overflow-y-auto bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-2xl p-4"
      >
        <p class="text-[10px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3">目录</p>
        <ul class="space-y-1.5">
          <li
            v-for="item in items"
            :key="item.id"
            :class="[
              'block text-xs leading-relaxed transition-colors cursor-pointer hover:text-gray-900 dark:hover:text-white',
              item.level === 3 ? 'pl-3' : '',
              activeId === item.id ? 'text-gray-900 dark:text-white font-medium' : 'text-gray-500 dark:text-gray-400'
            ]"
            @click="scrollTo(item.id)"
          >
            {{ item.text }}
          </li>
        </ul>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  items: { id: string; text: string; level: number }[]
  activeId: string
}>()

const open = ref(false)

function scrollTo(id: string) {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    open.value = false
  }
}

// Close on outside click
onMounted(() => {
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement
    if (!target.closest('.mobile-toc') && open.value) {
      open.value = false
    }
  })
})
</script>

<style scoped>
.toc-slide-enter-active,
.toc-slide-leave-active {
  transition: all 0.2s ease;
}
.toc-slide-enter-from,
.toc-slide-leave-to {
  opacity: 0;
  transform: translateY(10px) scale(0.95);
}
</style>
