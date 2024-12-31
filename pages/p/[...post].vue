<script setup lang="ts">
import Giscus from '@giscus/vue'
import { giscus } from '@/site.config'

const route = useRoute()
const post = route.params.post as Array<string>
const path = post.join('/')
</script>

<template>
  <section class="prose relative slide-enter-content">
    <ContentDoc :path="path">
      <template #default="{ doc }">
        <doc-back />
        <doc-render :article="doc" />
        <doc-toc :toc="doc.body.toc" />
        <!-- config your giscus -->
        <Giscus
          :repo="giscus.repo"
          :repo-id="giscus.repoId"
          :category-id="giscus.categoryId"
          :category="giscus.category"
          :mapping="giscus.mapping"
          :term="doc.title"
          :reactions-nenabled="giscus.reactionsEnabled"
          :emit-metadata="giscus.emitMetadata"
          :input-position="giscus.inputPosition"
          :theme="giscus.theme"
          :lang="giscus.lang"
          :loading="giscus.loading"
        />
      </template>

      <template #empty>
        <h1 class="text-center">
          Document is empty😅
        </h1>
      </template>

      <template #not-found>
        <h1 class="text-center">
          Not Found Any Document😗
        </h1>
      </template>
    </ContentDoc>
  </section>
</template>
