<template>
  <div
    class="mb-12 rounded-2xl border p-6 transition-all duration-300"
    :class="[
      'border-gray-200/50 bg-white/60 backdrop-blur-sm',
      'dark:border-gray-700/50 dark:bg-gray-800/60'
    ]"
  >
    <div class="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
      <!-- 头像 -->
      <img
        :src="profile.avatar"
        :alt="profile.name"
        class="h-20 w-20 rounded-full border-2 border-gray-200 object-cover shadow-lg dark:border-gray-600"
      />

      <!-- 信息 -->
      <div class="flex-1 text-center sm:text-left">
        <div class="mb-2 flex flex-col items-center gap-2 sm:flex-row sm:items-baseline">
          <h3 class="text-xl font-bold text-gray-900 dark:text-white">
            {{ profile.name }}
          </h3>
          <a
            :href="profile.githubUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          >
            @{{ profile.login }}
          </a>
        </div>

        <p
          v-if="profile.bio"
          class="mb-4 text-sm text-gray-600 dark:text-gray-400"
        >
          {{ profile.bio }}
        </p>

        <!-- 统计数据 -->
        <div class="mb-4 flex flex-wrap justify-center gap-4 sm:justify-start">
          <a
            :href="`${profile.githubUrl}?tab=repositories`"
            target="_blank"
            rel="noopener noreferrer"
            class="stat-item group"
          >
            <span class="stat-value group-hover:text-blue-600 dark:group-hover:text-blue-400">
              {{ profile.publicRepos }}
            </span>
            <span class="stat-label">仓库</span>
          </a>
          <a
            :href="`${profile.githubUrl}?tab=followers`"
            target="_blank"
            rel="noopener noreferrer"
            class="stat-item group"
          >
            <span class="stat-value group-hover:text-purple-600 dark:group-hover:text-purple-400">
              {{ profile.followers }}
            </span>
            <span class="stat-label">粉丝</span>
          </a>
          <a
            :href="`${profile.githubUrl}?tab=following`"
            target="_blank"
            rel="noopener noreferrer"
            class="stat-item group"
          >
            <span class="stat-value group-hover:text-green-600 dark:group-hover:text-green-400">
              {{ profile.following }}
            </span>
            <span class="stat-label">关注</span>
          </a>
          <div class="stat-item">
            <span class="stat-value text-yellow-600 dark:text-yellow-400">
              {{ profile.stars }}
            </span>
            <span class="stat-label">Star</span>
          </div>
        </div>

        <!-- 附加信息 -->
        <div class="flex flex-wrap items-center justify-center gap-3 text-xs text-gray-500 dark:text-gray-400 sm:justify-start">
          <span v-if="profile.location" class="flex items-center gap-1">
            <svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {{ profile.location }}
          </span>
          <a
            v-if="profile.blog"
            :href="profile.blog.startsWith('http') ? profile.blog : `https://${profile.blog}`"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center gap-1 hover:text-gray-700 dark:hover:text-gray-300"
          >
            <svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
            {{ profile.blogDomain }}
          </a>
          <a
            v-if="profile.twitter"
            :href="`https://twitter.com/${profile.twitter}`"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center gap-1 hover:text-gray-700 dark:hover:text-gray-300"
          >
            <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            @{{ profile.twitter }}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const profile = {
  name: '松岛川树',
  login: 'songdaochuanshu',
  avatar: 'https://avatars.githubusercontent.com/u/81367559?v=4',
  bio: '🐻‍❄️ ',
  publicRepos: 32,
  followers: 53,
  following: 10,
  stars: 65,
  location: 'China',
  blog: 'http://songdaochuanshu.pages.dev',
  blogDomain: 'songdaochuanshu.pages.dev',
  twitter: 'songdaochuanshu',
  githubUrl: 'https://github.com/songdaochuanshu',
}
</script>

<style scoped>
.stat-item {
  @apply flex flex-col items-center rounded-lg bg-gray-50 px-4 py-2 transition-colors dark:bg-gray-700/50;
}
.stat-value {
  @apply text-lg font-bold text-gray-900 dark:text-white;
}
.stat-label {
  @apply text-xs text-gray-500 dark:text-gray-400;
}
</style>
