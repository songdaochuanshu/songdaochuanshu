<script setup lang="ts">
import { siteConfig, socialLinks } from '@/site.config'

const greetings = ['你好呀', 'Hello', 'こんにちは', 'Hola']
const currentGreeting = ref(greetings[0])
let index = 0

onMounted(() => {
  setInterval(() => {
    index = (index + 1) % greetings.length
    currentGreeting.value = greetings[index]
  }, 3000)
})
</script>

<template>
  <div>
    <!-- Hero Section -->
    <section class="py-12 sm:py-20 text-center slide-enter-content">
      <!-- Avatar -->
      <div class="mb-8 relative inline-block">
        <div
          class="w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden border-3 border-[var(--common-bd)] shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 hover:border-[#4a7c6f]"
        >
          <img
            src="https://github.com/songdaochuanshu.png"
            :alt="siteConfig.author"
            class="w-full h-full object-cover"
            loading="lazy"
          >
        </div>
        <!-- Online indicator -->
        <span class="absolute bottom-1 right-1 w-4 h-4 bg-[#4a7c6f] rounded-full border-2 border-[var(--c-bg)] animate-pulse" />
      </div>

      <!-- Greeting & Name -->
      <h1 class="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
        <span class="gradient-text">{{ currentGreeting }}</span>
        <span class="ml-2">👋</span>
      </h1>
      <h2 class="text-xl sm:text-2xl text-[var(--text-secondary)] mb-6 font-light">
        I'm <span class="gradient-text font-semibold">{{ siteConfig.author }}</span>
      </h2>

      <!-- Description -->
      <p class="text-[var(--text-secondary)] max-w-lg mx-auto mb-8 leading-relaxed">
        热爱技术与传统的交汇，用代码记录生活，用匠心打磨作品。
      </p>

      <!-- Social Buttons -->
      <div class="flex items-center justify-center gap-4 flex-wrap">
        <NuxtLink
          to="/blog"
          class="btn-primary inline-flex items-center gap-2"
        >
          <span class="i-icon-park-outline-align-text-right-one" />
          <span>阅读博客</span>
        </NuxtLink>
        <a
          v-for="link in socialLinks"
          :key="link.title"
          :href="link.path"
          target="_blank"
          rel="noopener noreferrer"
          class="btn-ghost inline-flex items-center gap-2"
        >
          <span :class="link.icon" />
          <span>{{ link.title }}</span>
        </a>
      </div>

      <!-- Scroll hint -->
      <div class="mt-16 animate-bounce opacity-40">
        <span class="i-icon-park-outline-down-one text-2xl" />
      </div>
    </section>

    <!-- Divider -->
    <div class="w-full h-px bg-gradient-to-r from-transparent via-[var(--common-bd)] to-transparent my-8" />

    <!-- About Content -->
    <section class="prose">
      <ContentDoc path="me" class="slide-enter-content" />
    </section>
  </div>
</template>
