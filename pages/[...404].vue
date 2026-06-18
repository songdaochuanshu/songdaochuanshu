<script setup lang="ts">
import { getRenderedPost } from '@/utils/r2'

const { data: notFound } = await useAsyncData('404-page', () => getRenderedPost('/404', { byPath: true }).catch(() => null))

useHead({ title: '404 Not Found' })
</script>

<template>
  <section class="prose">
    <div v-if="notFound" class="slide-enter-content article-body" v-html="notFound.html" />
    <h1 v-else class="text-center text-2xl">404 Not Found 😅</h1>
  </section>
</template>

<style scoped>
.article-body :deep(p) { margin: 1em 0; line-height: 1.8; }
.article-body :deep(a) { color: #4a7c6f; }
</style>