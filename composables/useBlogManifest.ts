export interface BlogPostMeta {
  path: string
  key: string
  category?: string
  title?: string
  date?: string | null
  description?: string
  tags?: string[]
  layout?: string
  cover?: string
  wordCount?: number
  readingMinutes?: number
}

export interface BlogManifest {
  posts: BlogPostMeta[]
}

const STORAGE_KEY = 'blog-manifest-last-good'
const ASYNC_KEY = 'blog-manifest'

function isValidManifest(value: unknown): value is BlogManifest {
  return !!value && typeof value === 'object' && Array.isArray((value as BlogManifest).posts)
}

export function useBlogManifest() {
  const request = useAsyncData<BlogManifest | null>(
    ASYNC_KEY,
    () => $fetch<BlogManifest>('/api/manifest', { retry: 3, retryDelay: 500 }),
    {
      server: true,
      dedupe: 'defer',
      default: () => null,
    },
  )
  const lastGood = useState<BlogManifest | null>('blog-manifest-last-good', () => null)

  const saveLastGood = (value: unknown) => {
    if (!isValidManifest(value)) return
    lastGood.value = value
    if (import.meta.client) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(value))
      } catch {
        // Storage may be unavailable; the in-memory shared value still works.
      }
    }
  }

  watch(request.data, (value) => saveLastGood(value), { immediate: true })

  if (import.meta.client) {
    onMounted(() => {
      if (!lastGood.value && !isValidManifest(request.data.value)) {
        try {
          const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null')
          if (isValidManifest(stored)) lastGood.value = stored
        } catch {
          // Ignore malformed or unavailable localStorage.
        }
      }
    })
  }

  const manifest = computed(() => lastGood.value || request.data.value || null)
  const hasError = computed(() => Boolean(request.error.value) && !manifest.value)
  const status = computed(() => {
    if (request.status.value === 'pending' && !manifest.value) return 'pending'
    if (hasError.value) return 'error'
    return manifest.value ? 'success' : request.status.value
  })

  async function retry() {
    await request.refresh()
  }

  return {
    manifest,
    status,
    error: request.error,
    hasError,
    retry,
  }
}
