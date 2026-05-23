<script setup lang="ts">
import { siteConfig, socialLinks } from '@/site.config'
</script>

<template>
  <div class="relative">
    <div class="absolute -left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#4a7c6f] via-[#6b9e8a] to-transparent opacity-50"></div>
    <div class="flex flex-col items-center gap-4 py-6 px-3 glass-card rounded-xl hover-lift">
      <a
        v-for="link in socialLinks"
        :key="link.title"
        :title="link.title"
        :href="link.path"
        class="text-[var(--text-secondary)] hover:text-[#4a7c6f] dark:hover:text-[#8fc4ab] transition-all duration-300 hover:scale-110"
        target="_blank"
      >
        <span :class="link.icon" class="text-xl"></span>
      </a>
    </div>
    <div
      class="absolute -left-6 top-0 text-4xl pointer-events-none select-none font-handwriting opacity-20"
      style="writing-mode: vertical-rl;"
    >
      {{ siteConfig.author }}
    </div>
  </div>
</template>

<style scoped>
.glass-card {
  background: var(--glass-bg);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}
</style>