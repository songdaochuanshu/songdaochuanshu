<script setup lang="ts">
import Cell from '~/components/Cell.vue'
import { getPostsByTag } from '@/utils/r2'

const route = useRoute()
const tag = route.params.tag as string

const { data: posts } = await useAsyncData(`tag-${tag}`, () => getPostsByTag(tag))

useHead({ title: `#${tag}` })
</script>

<template>
  <div>
    <h1 class="text-title mb-2em">
      <NuxtLink to="/tags" class="hover">Tags</NuxtLink> / {{ tag }}
    </h1>
    <ul v-if="posts && posts.length">
      <Cell v-for="article in posts" :key="article.path" :article="article" />
    </ul>
    <h1 v-else class="text-2xl text-center">Not Found Any Document😗</h1>
  </div>
</template>