<script setup lang="ts">
import { siteConfig, socialLinks } from '@/site.config'
import { getRenderedPost } from '@/utils/r2'

const greetings = ['你好呀', 'Hello', 'こんにちは', 'Hola']
const currentGreeting = ref(greetings[0])
let index = 0

onMounted(() => {
  setInterval(() => {
    index = (index + 1) % greetings.length
    currentGreeting.value = greetings[index]
  }, 3000)
})

// me.md 从 R2 拉
const { data: me } = await useAsyncData('me-page', () => getRenderedPost('/me', { byPath: true }))
</script>

<template>
  <div>
    <!-- Hero Section -->
    <section class="py-12 sm:py-20 text-center slide-enter-content">
      <div class="mb-8 relative inline-block">
        <div class="w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden border-3 border-[var(--common-bd)] shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 hover:border-[#4a7c6f]">
          <img
            src="https://github.com/songdaochuanshu.png"
            :alt="siteConfig.author"
            class="w-full h-full object-cover"
            loading="lazy"
          >
        </div>
        <span class="absolute bottom-1 right-1 w-4 h-4 bg-[#4a7c6f] rounded-full border-2 border-[var(--c-bg)] animate-pulse" />
      </div>

      <h1 class="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
        <span class="gradient-text">{{ currentGreeting }}</span>
        <span class="ml-2">👋</span>
      </h1>
      <h2 class="text-xl sm:text-2xl text-[var(--text-secondary)] mb-6 font-light">
        I'm <span class="gradient-text font-semibold">{{ siteConfig.author }}</span>
      </h2>

      <p class="text-[var(--text-secondary)] max-w-lg mx-auto mb-8 leading-relaxed">
        热爱技术与传统的交汇，用代码记录生活，用匠心打磨作品。
      </p>

      <div class="flex items-center justify-center gap-4 flex-wrap">
        <NuxtLink to="/blog" class="btn-primary inline-flex items-center gap-2">
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

      <div class="mt-16 animate-bounce opacity-40">
        <span class="i-icon-park-outline-down-one text-2xl" />
      </div>
    </section>

    <div class="w-full h-px bg-gradient-to-r from-transparent via-[var(--common-bd)] to-transparent my-8" />

    <!-- me.md 内容 -->
    <section class="prose">
      <div v-if="me" class="slide-enter-content article-body" v-html="me.html" />
      <p v-else class="op-50">正在加载...</p>
    </section>
  </div>
</template>

<style scoped>
.article-body :deep(h1),
.article-body :deep(h2),
.article-body :deep(h3) {
  margin-top: 1.5em;
  margin-bottom: 0.6em;
  font-weight: 600;
}
.article-body :deep(p) {
  margin: 1em 0;
  line-height: 1.8;
}
.article-body :deep(a) {
  color: #4a7c6f;
}
.article-body :deep(pre) {
  background: var(--common-bg);
  padding: 1em;
  border-radius: 8px;
  overflow-x: auto;
}
.article-body :deep(code) {
  font-family: ui-monospace, monospace;
  font-size: 0.9em;
}
.article-body :deep(:not(pre) > code) {
  background: var(--common-bg);
  padding: 0.2em 0.4em;
  border-radius: 4px;
}
</style>