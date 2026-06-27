<template>
  <div class="border-b border-gray-100 dark:border-gray-800 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between py-3">
        <div class="flex items-center gap-3">
          <NuxtLink
            to="/"
            class="inline-flex items-center gap-2 py-1 text-xs text-gray-400 hover:text-gray-900 dark:text-gray-500 dark:hover:text-white transition-colors"
          >
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
            返回
          </NuxtLink>
          <span class="text-gray-200 dark:text-gray-700">·</span>
          <NuxtLink
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            class="text-xs transition-colors hover:text-gray-900 dark:hover:text-white"
            :class="[
              $route.path === link.to
                ? 'text-gray-900 dark:text-white font-medium'
                : 'text-gray-400 dark:text-gray-500'
            ]"
          >
            {{ link.label }}
          </NuxtLink>
        </div>
        <ThemeToggle />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const navLinks = [
  { label: '归档', to: '/archive' },
  { label: '分类', to: '/categories' },
  { label: '标签', to: '/tags' },
  { label: '友链', to: '/links' },
  { label: '关于', to: '/me' },
]
</script>
