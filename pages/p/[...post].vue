<script setup lang="ts">
import Giscus from '@giscus/vue'
import { giscus } from '@/site.config'
import { getRenderedPost } from '@/utils/r2'

const route = useRoute()
const slug = (route.params.post as string[]).join('/')
const fullPath = `/p/${slug}`

const { data: post, error } = await useAsyncData(
  `post-${fullPath}`,
  () => getRenderedPost(fullPath, { byPath: true }),
)

if (error.value || !post.value) {
  throw createError({ statusCode: 404, statusMessage: 'Not Found' })
}

const rendered = post.value!

useHead({
  title: rendered.meta.title,
  meta: [
    { name: 'description', content: rendered.meta.description || '' },
    { property: 'og:title', content: rendered.meta.title },
    { property: 'og:description', content: rendered.meta.description || '' },
    { property: 'article:published_time', content: rendered.meta.date || '' },
  ],
})
</script>

<template>
  <section class="prose relative slide-enter-content">
    <doc-back />
    <doc-render :article="{ ...rendered.meta, html: rendered.html }" :toc="rendered.toc" />
    <doc-toc v-if="rendered.toc.length" :toc="{ links: rendered.toc }" />
    <!-- Giscus 评论 -->
    <Giscus
      :repo="giscus.repo"
      :repo-id="giscus.repoId"
      :category-id="giscus.categoryId"
      :category="giscus.category"
      :mapping="giscus.mapping"
      :term="rendered.meta.title"
      :reactions-nenabled="giscus.reactionsEnabled"
      :emit-metadata="giscus.emitMetadata"
      :input-position="giscus.inputPosition"
      :theme="giscus.theme"
      :lang="giscus.lang"
      :loading="giscus.loading"
    />
  </section>
</template>