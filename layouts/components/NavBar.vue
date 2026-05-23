<script setup lang="ts">
import { navLinks } from '@/site.config'
</script>

<template>
  <nav class="flex items-center gap-3 sm:gap-4 text-base sm:text-lg max-w-70ch m-auto">
    <NuxtLink
      v-for="link in navLinks"
      :key="link.path"
      :to="link.path"
      class="nav-link flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all duration-300"
      :title="link.title"
    >
      <span :class="link.icon" class="text-lg"></span>
      <span class="hidden sm:inline font-medium">{{ link.title }}</span>
    </NuxtLink>
    <DarkMode class="ml-auto" />
  </nav>
</template>

<style scoped>
.nav-link {
  position: relative;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, #4a7c6f, #8fc4ab);
  transform: translateX(-50%);
  transition: all 0.3s ease;
}

.nav-link:hover::after {
  width: 80%;
}
</style>