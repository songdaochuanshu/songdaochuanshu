<script setup lang="ts">
interface Repo {
  id: number
  name: string
  full_name: string
  description: string | null
  html_url: string
  star_count: number
  fork_count: number
  language: string | null
  topics: string[]
  updated_at: string
  visibility: string
}

const username = 'songdaochuanshu'
const repos = ref<Repo[]>([])
const isLoading = ref(true)
const error = ref<string | null>(null)

// 过滤掉组织和没有描述的仓库
const filteredRepos = computed(() => {
  return repos.value.filter(repo => {
    return !repo.full_name.startsWith('Programming-With-Love') && repo.description
  })
})

// 获取仓库数据
async function fetchRepos() {
  try {
    const response = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=100&type=public`,
      {
        headers: {
          'Accept': 'application/vnd.github.v3+json'
        }
      }
    )

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`)
    }

    const data = await response.json()

    repos.value = data.map((repo: any) => ({
      id: repo.id,
      name: repo.name,
      full_name: repo.full_name,
      description: repo.description,
      html_url: repo.html_url,
      star_count: repo.stargazers_count,
      fork_count: repo.forks_count,
      language: repo.language,
      topics: repo.topics || [],
      updated_at: repo.updated_at,
      visibility: repo.visibility
    }))
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Failed to fetch repositories'
  } finally {
    isLoading.value = false
  }
}

// 格式化日期
function formatDate(dateString: string) {
  const date = new Date(dateString)
  return date.toLocaleDateString('zh-CN', { year: 'numeric', month: 'short', day: 'numeric' })
}

onMounted(() => {
  fetchRepos()
})
</script>

<template>
  <div>
    <h1 class="text-title mb-8 font-bold text-center gradient-text">
      Projects
    </h1>

    <!-- Loading State -->
    <div v-if="isLoading" class="flex items-center justify-center py-20">
      <div class="flex flex-col items-center gap-4">
        <div class="w-12 h-12 border-4 border-[var(--common-bd)] border-t-[#4a7c6f] rounded-full animate-spin"></div>
        <span class="text-[var(--text-secondary)]">Loading repositories...</span>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="text-center py-12">
      <div class="i-icon-park-outline-warning-circle text-5xl text-red-500 mb-4"></div>
      <p class="text-[var(--text-secondary)]">{{ error }}</p>
    </div>

    <!-- Repositories Grid -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <a
        v-for="(repo, index) in filteredRepos"
        :key="repo.id"
        :href="repo.html_url"
        target="_blank"
        rel="noopener noreferrer"
        class="group glass-card rounded-xl p-5 hover-lift transition-all duration-300"
        :style="{ animationDelay: `${index * 80}ms` }"
      >
        <div class="flex items-start justify-between gap-4 mb-3">
          <div class="flex items-center gap-2">
            <span class="i-icon-park-outline-folder-open text-xl text-[#4a7c6f] group-hover:text-[#6b9e8a] transition-colors"></span>
            <h3 class="font-semibold text-lg text-[var(--primary)] group-hover:text-[#4a7c6f] transition-colors">
              {{ repo.name }}
            </h3>
          </div>
          <span class="i-icon-park-outline-arrow-right text-lg text-[var(--text-secondary)] group-hover:translate-x-1 group-hover:text-[#4a7c6f] transition-all"></span>
        </div>

        <p class="text-[var(--text-secondary)] text-sm leading-relaxed mb-4 line-clamp-2">
          {{ repo.description }}
        </p>

        <div class="flex flex-wrap items-center gap-3 text-xs text-[var(--text-secondary)]">
          <span v-if="repo.language" class="flex items-center gap-1.5 px-2 py-1 rounded-full bg-[var(--common-bg)]">
            <span class="w-2 h-2 rounded-full bg-[#4a7c6f]"></span>
            {{ repo.language }}
          </span>

          <span v-if="repo.star_count > 0" class="flex items-center gap-1">
            <span class="i-icon-park-outline-star"></span>
            {{ repo.star_count }}
          </span>

          <span v-if="repo.fork_count > 0" class="flex items-center gap-1">
            <span class="i-icon-park-outline-branch"></span>
            {{ repo.fork_count }}
          </span>

          <span class="ml-auto opacity-60">
            {{ formatDate(repo.updated_at) }}
          </span>
        </div>

        <!-- Topics -->
        <div v-if="repo.topics.length > 0" class="flex flex-wrap gap-2 mt-3">
          <span
            v-for="topic in repo.topics.slice(0, 5)"
            :key="topic"
            class="tag text-xs"
          >
            {{ topic }}
          </span>
        </div>
      </a>
    </div>

    <!-- Empty State -->
    <div v-if="!isLoading && !error && filteredRepos.length === 0" class="text-center py-12">
      <div class="i-icon-park-outline-folder-archive text-5xl text-[var(--text-secondary)] opacity-50 mb-4"></div>
      <p class="text-[var(--text-secondary)]">No projects with descriptions found</p>
    </div>
  </div>
</template>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.glass-card {
  animation: fade-in-up 0.6s ease forwards;
  opacity: 0;
}
</style>