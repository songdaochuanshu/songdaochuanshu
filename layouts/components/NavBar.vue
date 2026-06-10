<script setup lang="ts">
import { navLinks } from '@/site.config'

const route = useRoute()
</script>

<template>
  <nav class="flex items-center gap-1 sm:gap-2 text-base sm:text-lg max-w-70ch m-auto overflow-x-auto scrollbar-hide">
    <NuxtLink
      v-for="link in navLinks"
      :key="link.path"
      :to="link.path"
      class="nav-link flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all duration-300 whitespace-nowrap"
      :class="{
        'nav-link--active text-[#4a7c6f] dark:text-[#8fc4ab] bg-[var(--common-bg)]': route.path === link.path || (link.path !== '/' && route.path.startsWith(link.path)),
        'text-[var(--text-secondary)] hover:text-[var(--primary)]': !(route.path === link.path || (link.path !== '/' && route.path.startsWith(link.path))),
      }"
      :title="link.title"
    >
      <span :class="link.icon" class="text-lg" />
      <span class="hidden sm:inline font-medium">{{ link.title }}</span>
    </NuxtLink>
    <DarkMode class="ml-auto shrink-0" />
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
  border-radius: 1px;
}

.nav-link:hover::after {
  width: 80%;
}

.nav-link--active::after {
  width: 60%;
  opacity: 0.6;
}

/* Hide scrollbar for nav overflow */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
