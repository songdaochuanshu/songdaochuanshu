<script setup lang="ts">
import { formattedDate } from '@/utils'

interface Props {
  article: {
    title: string
    date: string | null
    description?: string
    tags?: string[]
    html: string
  }
  toc?: Array<{ id: string; text: string; depth: number }>
}

const props = defineProps<Props>()
</script>

<template>
  <div class="doc-render">
    <header class="article-header">
      <h1 class="article-title">{{ props.article.title }}</h1>
      <div class="article-meta">
        <span v-if="props.article.date" class="meta-date">
          <i class="i-icon-park-outline-calendar" /> {{ formattedDate(props.article.date) }}
        </span>
        <span v-if="props.article.tags?.length" class="meta-tags">
          <NuxtLink
            v-for="tag in props.article.tags"
            :key="tag"
            :to="`/tags/${tag}`"
            class="meta-tag"
          >
            #{{ tag }}
          </NuxtLink>
        </span>
      </div>
    </header>

    <!-- marked 渲染好的 HTML -->
    <div class="article-body" v-html="props.article.html" />

    <doc-footer :article="props.article" />
  </div>
</template>

<style scoped>
.doc-render {
  max-width: 75ch;
  margin: 0 auto;
}

.article-header {
  margin-bottom: 2.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid var(--border-subtle);
}

.article-title {
  font-size: 2rem;
  font-weight: 700;
  line-height: 1.3;
  margin: 0 0 1rem 0;
  letter-spacing: -0.01em;
}

.article-meta {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.meta-date {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.9rem;
  color: var(--text-secondary);
}

.meta-tags {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.meta-tag {
  font-size: 0.8rem;
  padding: 0.2rem 0.6rem;
  border-radius: 6px;
  background: var(--common-bg);
  color: #4a7c6f;
  border: 1px solid var(--common-bd);
  text-decoration: none;
}

.meta-tag:hover {
  border-color: currentColor;
}

.article-body {
  line-height: 1.8;
  word-break: break-word;
}

.article-body :deep(h1),
.article-body :deep(h2),
.article-body :deep(h3),
.article-body :deep(h4),
.article-body :deep(h5),
.article-body :deep(h6) {
  margin-top: 2em;
  margin-bottom: 0.8em;
  font-weight: 600;
  scroll-margin-top: 80px;
}

.article-body :deep(h1) { font-size: 1.8em; }
.article-body :deep(h2) {
  font-size: 1.5em;
  padding-bottom: 0.3em;
  border-bottom: 1px solid var(--border-subtle);
}
.article-body :deep(h3) { font-size: 1.25em; }

.article-body :deep(p) {
  margin: 1.2em 0;
}

.article-body :deep(a) {
  color: #4a7c6f;
  text-decoration: underline var(--common-bd);
  text-decoration-thickness: 1px;
  text-underline-offset: 0.3em;
}

.article-body :deep(a:hover) {
  text-decoration-color: currentColor;
}

.article-body :deep(pre) {
  padding: 1.2em 1em;
  margin: 1.5em 0;
  overflow-x: auto;
  background-color: var(--common-bg);
  border-radius: var(--common-rd);
  border: 1px solid var(--border-subtle);
}

.article-body :deep(code) {
  font-family: 'Source Code Pro', ui-monospace, monospace;
  font-size: 0.9em;
}

.article-body :deep(:not(pre) > code) {
  padding: 0.2em 0.4em;
  border-radius: 4px;
  background: var(--common-bg);
  border: 1px solid var(--border-subtle);
}

.article-body :deep(img) {
  max-width: 100%;
  border-radius: var(--common-rd);
  margin: 1.5em 0;
}

.article-body :deep(blockquote) {
  margin: 1.5em 0;
  padding: 1em 1.5em;
  border-left: 4px solid var(--common-bd);
  background: var(--common-bg);
  border-radius: 0 var(--common-rd) var(--common-rd) 0;
}

.article-body :deep(ul),
.article-body :deep(ol) {
  padding-left: 2em;
  margin: 1.2em 0;
}

.article-body :deep(li) {
  margin: 0.4em 0;
}

.article-body :deep(table) {
  width: 100%;
  margin: 1.5em 0;
  border-collapse: collapse;
  font-size: 0.95em;
}

.article-body :deep(th),
.article-body :deep(td) {
  padding: 0.75em 1em;
  border: 1px solid var(--border-subtle);
  text-align: left;
}

.article-body :deep(th) {
  background: var(--common-bg);
  font-weight: 600;
}

@media (max-width: 768px) {
  .article-title { font-size: 1.5rem; }
  .article-body { font-size: 1rem; }
  .article-body :deep(pre) {
    padding: 1em;
    margin: 1em 0;
  }
}
</style>