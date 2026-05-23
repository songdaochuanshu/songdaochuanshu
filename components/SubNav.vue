<script setup lang="ts">
import { subNavLinks } from '@/site.config'

const route = useRoute()
const { path } = route
const router = useRouter()
</script>

<template>
  <ul class="flex gap-2 mb-6 p-1 rounded-xl bg-[var(--glass-bg)] backdrop-blur-md border border-[var(--border-subtle)]">
    <li
      v-for="(item) in subNavLinks" :key="item.path"
      class="relative cursor-pointer rounded-lg px-4 py-2 font-medium transition-all duration-300"
      :class="[
        path === item.path
          ? 'bg-gradient-to-r from-[#4a7c6f] to-[#6b9e8a] text-white shadow-md'
          : 'text-[var(--text-secondary)] hover:text-[var(--primary)] hover:bg-[var(--common-bg)]'
      ]"
      @click="router.push(item.path)"
    >
      <span class="text-base sm:text-lg"> {{ item.title }}</span>
    </li>
  </ul>
</template>