<template>
  <div
    class="rounded-2xl border p-4 transition-all duration-300"
    :class="[
      'border-gray-200/50 bg-white/60 backdrop-blur-sm',
      'dark:border-gray-700/50 dark:bg-gray-800/60'
    ]"
  >
    <div class="flex items-center gap-3 sm:hidden">
      <img :src="profile.avatar" :alt="profile.name" class="h-12 w-12 rounded-full border-2 border-gray-200 object-cover shadow-lg dark:border-gray-600 flex-shrink-0" />
      <div class="flex-1 min-w-0">
        <p v-if="profile.bio" class="text-xs text-gray-500 dark:text-gray-400 truncate">{{ profile.bio }}</p>
        <div v-if="profileLoaded" class="flex items-center gap-2 mt-1 text-xs font-bold text-gray-900 dark:text-white">
          <span>{{ profile.publicRepos }}</span><span class="text-[10px] text-gray-400">·</span>
          <span>{{ profile.followers }}</span><span class="text-[10px] text-gray-400">·</span>
          <span>{{ profile.following }}</span><span class="text-[10px] text-gray-400">·</span>
          <span class="text-yellow-600 dark:text-yellow-400">{{ profile.stars }}</span>
        </div>
      </div>
    </div>

    <div class="hidden sm:flex sm:flex-col sm:items-center sm:gap-4 md:flex-row md:items-start">
      <img :src="profile.avatar" :alt="profile.name" class="h-16 w-16 rounded-full border-2 border-gray-200 object-cover shadow-lg dark:border-gray-600" />
      <div class="flex-1 text-center md:text-left">
        <p v-if="profile.bio" class="mb-3 text-sm text-gray-600 dark:text-gray-400">{{ profile.bio }}</p>
        <div v-if="profileLoaded" class="mb-3 flex flex-wrap justify-center gap-3 md:justify-start">
          <a v-for="item in statLinks" :key="item.label" :href="item.href" target="_blank" rel="noopener noreferrer" class="flex flex-col items-center rounded-lg bg-gray-50 px-3 py-1.5 transition-colors dark:bg-gray-700/50 group">
            <span class="text-base font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">{{ item.value }}</span>
            <span class="text-[10px] text-gray-500 dark:text-gray-400">{{ item.label }}</span>
          </a>
          <div class="flex flex-col items-center rounded-lg bg-gray-50 px-3 py-1.5 dark:bg-gray-700/50">
            <span class="text-base font-bold text-yellow-600 dark:text-yellow-400">{{ profile.stars }}</span>
            <span class="text-[10px] text-gray-500 dark:text-gray-400">Star</span>
          </div>
        </div>
        <div class="flex flex-wrap items-center justify-center gap-3 text-[11px] text-gray-500 dark:text-gray-400 md:justify-start">
          <span v-if="profile.location">{{ profile.location }}</span>
          <a v-if="profile.blog" :href="profile.blog" target="_blank" rel="noopener noreferrer" class="hover:text-gray-700 dark:hover:text-gray-300">{{ profile.blogDomain }}</a>
          <a :href="`https://twitter.com/${profile.twitter}`" target="_blank" rel="noopener noreferrer" class="hover:text-gray-700 dark:hover:text-gray-300">@{{ profile.twitter }}</a>
        </div>
        <p v-if="error" class="mt-2 text-xs text-gray-400 dark:text-gray-500">GitHub 数据暂时不可用</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

interface Profile {
  name: string
  login: string
  avatar: string
  bio: string
  publicRepos: number | null
  followers: number | null
  following: number | null
  stars: number | null
  location: string
  blog: string
  blogDomain: string
  githubUrl: string
  twitter: string
}

const profile = ref<Profile>({ name: '松岛川树', login: 'songdaochuanshu', avatar: 'https://avatars.githubusercontent.com/u/81367559?v=4', bio: '', publicRepos: null, followers: null, following: null, stars: null, location: '', blog: 'https://blog.openserve.cloud', blogDomain: 'blog.openserve.cloud', githubUrl: 'https://github.com/songdaochuanshu', twitter: 'songdaochuanshu' })
const profileLoaded = ref(false)
const error = ref(false)
const statLinks = computed(() => [
  { label: '仓库', value: profile.value.publicRepos, href: `${profile.value.githubUrl}?tab=repositories` },
  { label: '粉丝', value: profile.value.followers, href: `${profile.value.githubUrl}?tab=followers` },
  { label: '关注', value: profile.value.following, href: `${profile.value.githubUrl}?tab=following` },
])

onMounted(async () => {
  try {
    profile.value = { ...profile.value, ...(await $fetch<Partial<Profile>>('/api/github-profile')) }
    profileLoaded.value = true
  } catch (cause) {
    error.value = true
    console.error('获取 GitHub 资料失败:', cause)
  }
})
</script>
