<script setup lang="ts">
import { siteConfig } from '@/site.config'

const showBackToTop = ref(false)

// 计算网站运行时间
const startDate = new Date('2023-01-01')
const runningDays = computed(() => {
  const now = new Date()
  return Math.floor((now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))
})

onMounted(() => {
  window.addEventListener('scroll', () => {
    showBackToTop.value = window.scrollY > 500
  })
})

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <footer class="pt-12 mt-12 border-t border-[var(--border-subtle)]">
    <!-- Stats -->
    <div class="flex items-center justify-center gap-6 mb-8 text-sm text-[var(--text-secondary)]">
      <span class="flex items-center gap-1.5">
        <span class="i-icon-park-outline-time text-[#4a7c6f] dark:text-[#8fc4ab]" />
        <span>已运行 <strong class="gradient-text">{{ runningDays }}</strong> 天</span>
      </span>
      <span class="w-1 h-1 rounded-full bg-[var(--text-secondary)] opacity-40" />
      <span class="flex items-center gap-1.5">
        <span class="i-icon-park-outline-book-open text-[#4a7c6f] dark:text-[#8fc4ab]" />
        <span>用文字记录生活</span>
      </span>
    </div>

    <!-- Links -->
    <div class="flex items-center justify-center md:justify-between flex-col md:flex-row gap-4 text-sm text-[var(--text-secondary)]">
      <span class="flex items-center gap-2">
        <span class="i-icon-park-outline-copyright mr-1" />
        <a
          href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
          target="_blank"
          rel="noopener noreferrer"
          class="link-accent font-medium hover:opacity-80 transition-opacity"
        >
          CC BY-NC-SA 4.0
        </a>
        2023-PRESENT © {{ siteConfig.author }}
      </span>
      <span class="flex items-center gap-2 opacity-60">
        <span class="i-icon-park-outline-heart text-[#4a7c6f]" />
        Built with passion
      </span>
    </div>

    <!-- Back to top -->
    <Transition name="fade">
      <button
        v-if="showBackToTop"
        class="fixed bottom-8 right-8 z-50 w-10 h-10 rounded-full glass-card flex items-center justify-center text-[var(--text-secondary)] hover:text-[#4a7c6f] dark:hover:text-[#8fc4ab] transition-all duration-300 hover:scale-110 shadow-lg"
        title="回到顶部"
        @click="scrollToTop"
      >
        <span class="i-icon-park-outline-up-one text-lg" />
      </button>
    </Transition>
  </footer>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
