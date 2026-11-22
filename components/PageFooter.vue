<template>
  <footer class="border-t border-gray-100 dark:border-gray-800 mt-16">
    <div class="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8 py-8">
      <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
        <!-- 站点统计 -->
        <section
          class="rounded-xl border border-gray-100 dark:border-gray-800 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm shadow-sm px-5 py-4"
        >
          <h2 class="flex items-center gap-2 text-[13px] font-medium text-gray-700 dark:text-gray-200">
            <span class="h-3.5 w-0.5 rounded-full bg-gray-300 dark:bg-gray-600" aria-hidden="true"></span>
            <svg
              class="h-3.5 w-3.5 text-gray-400 dark:text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M4 20v-7M9.5 20V4M15 20v-5M20.5 20V9" />
            </svg>
            站点统计
          </h2>
          <dl class="mt-3 grid grid-cols-2 gap-x-6 gap-y-2.5">
            <div
              v-for="item in statItems"
              :key="item.label"
              class="flex items-baseline justify-between gap-2"
            >
              <dt class="text-[11px] text-gray-400 dark:text-gray-500">{{ item.label }}</dt>
              <dd class="text-[13px] font-medium text-gray-800 dark:text-gray-100 tabular-nums">
                {{ item.value }}
              </dd>
            </div>
          </dl>
        </section>

        <!-- 站点信息 -->
        <section
          class="rounded-xl border border-gray-100 dark:border-gray-800 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm shadow-sm px-5 py-4"
        >
          <h2 class="flex items-center gap-2 text-[13px] font-medium text-gray-700 dark:text-gray-200">
            <span class="h-3.5 w-0.5 rounded-full bg-gray-300 dark:bg-gray-600" aria-hidden="true"></span>
            <svg
              class="h-3.5 w-3.5 text-gray-400 dark:text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="9" stroke-width="1.8" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M12 11v5.5M12 7.6h.01" />
            </svg>
            站点信息
          </h2>
          <dl class="mt-3 space-y-2.5">
            <div v-for="item in infoItems" :key="item.label" class="flex items-baseline justify-between gap-3">
              <dt class="shrink-0 text-[11px] text-gray-400 dark:text-gray-500">{{ item.label }}</dt>
              <dd class="text-right text-[13px] font-medium text-gray-800 dark:text-gray-100">
                {{ item.value }}
              </dd>
            </div>
          </dl>
        </section>
      </div>

      <div
        class="mt-5 flex flex-col items-center gap-2 text-[11px] text-gray-400 dark:text-gray-500 sm:flex-row sm:justify-between sm:gap-3"
      >
        <p>&copy; 2026 松岛川树</p>
        <nav class="flex items-center gap-4" aria-label="站点链接">
          <a
            href="/rss.xml"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-1 transition-colors hover:text-gray-600 dark:hover:text-gray-300"
          >
            <svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 5c7.18 0 13 5.82 13 13M6 11a7 7 0 017 7m-6 0a1 1 0 11-2 0 1 1 0 012 0z" />
            </svg>
            RSS
          </a>
          <NuxtLink to="/links" class="transition-colors hover:text-gray-600 dark:hover:text-gray-300">友链</NuxtLink>
          <NuxtLink to="/me" class="transition-colors hover:text-gray-600 dark:hover:text-gray-300">关于</NuxtLink>
        </nav>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import type { BlogPostMeta } from '~/composables/useBlogManifest'

// 建站日（仓库首个内容提交的日期），用于计算运行时长。
const SITE_LAUNCH_DATE = '2026-06-21'
const SITE_TIME_ZONE = 'Asia/Shanghai'
const DAY_MS = 86_400_000

const { manifest } = useBlogManifest()

const posts = computed<BlogPostMeta[]>(() => manifest.value?.posts ?? [])
const hasData = computed(() => posts.value.length > 0)

// 统一按站点时区取「日」，避免服务端（UTC）与访客本地时区算出不同的「今天」。
function dayKey(date: Date): string {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: SITE_TIME_ZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date)
}

function dayNumber(key: string): number {
  return Math.floor(Date.parse(`${key}T00:00:00Z`) / DAY_MS)
}

// useState 让服务端算出的「今天」随 payload 传到客户端，保证水合前后一致。
const todayKey = useState('page-footer-today', () => dayKey(new Date()))

const wordCount = computed(() =>
  posts.value.reduce((sum, post) => sum + (post.wordCount || 0), 0),
)
const categoryCount = computed(
  () => new Set(posts.value.map((post) => post.category).filter(Boolean)).size,
)
const tagCount = computed(
  () => new Set(posts.value.flatMap((post) => post.tags ?? [])).size,
)
const runningDays = computed(() =>
  Math.max(0, dayNumber(todayKey.value) - dayNumber(SITE_LAUNCH_DATE)),
)

const lastActive = computed<string | null>(() => {
  const newest = posts.value.reduce((latest, post) => {
    const time = post.date ? Date.parse(post.date) : Number.NaN
    return Number.isNaN(time) ? latest : Math.max(latest, time)
  }, Number.NEGATIVE_INFINITY)

  if (!Number.isFinite(newest)) return null

  const days = Math.max(0, dayNumber(todayKey.value) - dayNumber(dayKey(new Date(newest))))
  if (days === 0) return '今天'
  if (days === 1) return '昨天'
  return `${days} 天前`
})

const formatNumber = (value: number) => value.toLocaleString('en-US')

const statItems = computed(() => [
  { label: '文章', value: hasData.value ? formatNumber(posts.value.length) : '—' },
  { label: '分类', value: hasData.value ? formatNumber(categoryCount.value) : '—' },
  { label: '标签', value: hasData.value ? formatNumber(tagCount.value) : '—' },
  { label: '总字数', value: hasData.value ? formatNumber(wordCount.value) : '—' },
  { label: '运行时长', value: `${formatNumber(runningDays.value)} 天` },
  { label: '最后活动', value: lastActive.value ?? '—' },
])

const infoItems = [
  { label: '构建平台', value: 'Cloudflare Pages + R2' },
  { label: '驱动框架', value: 'Nuxt 4 + Vue 3' },
  { label: '文章许可', value: 'CC BY-NC-SA 4.0' },
]
</script>
