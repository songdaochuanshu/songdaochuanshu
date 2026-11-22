import { defineEventHandler, getRouterParam, createError, setResponseHeader } from 'h3'
import { getFriendBucket, readFriendLinks } from '../../utils/friend-links'

const allowedObjects = new Set(['me.md', 'friends.json'])
const R2_BASE_URL = 'https://blog-static.openserve.cloud'

/** /me 页面以 GitHub Profile README 为准，README 更新后自动同步，无需重新部署 */
const README_URL = 'https://raw.githubusercontent.com/songdaochuanshu/songdaochuanshu/main/README.md'
const REPO_RAW_BASE = 'https://raw.githubusercontent.com/songdaochuanshu/songdaochuanshu/main'
const SNAKE_FILE = 'github-contribution-grid-snake.svg'

/** 单个 Worker 实例内的短缓存：既能让 README 改动在 1 分钟内生效，又避免每次访问都打 GitHub raw（匿名限流 60 次/小时） */
const README_CACHE_TTL_MS = 60 * 1000
let readmeCache: { text: string; fetchedAt: number } | null = null

/** README 里的相对路径（如 ./github-contribution-grid-snake.svg）在 /me 路由下无法加载，统一换成仓库 raw 地址 */
function toAbsoluteRepoAssets(markdown: string): string {
  return markdown
    .split(`./${SNAKE_FILE}`).join(`${REPO_RAW_BASE}/${SNAKE_FILE}`)
    .replace(/\]\(\.\/([^)\s]+)\)/g, `](${REPO_RAW_BASE}/$1)`)
    .replace(/src="\.\/([^"]+)"/g, `src="${REPO_RAW_BASE}/$1"`)
}

async function fetchReadme(): Promise<string> {
  const now = Date.now()
  if (readmeCache && now - readmeCache.fetchedAt < README_CACHE_TTL_MS) {
    return readmeCache.text
  }

  const text = await $fetch<string>(README_URL, {
    responseType: 'text',
    headers: { Accept: 'text/plain', 'User-Agent': 'blog.openserve.cloud' },
    retry: 1,
    timeout: 5000,
  })
  if (typeof text !== 'string' || !text.trim()) {
    throw new Error('GitHub README 返回了空内容')
  }

  const normalized = toAbsoluteRepoAssets(text)
  readmeCache = { text: normalized, fetchedAt: now }
  return normalized
}

/** 兜底：优先 R2 绑定直读 me.md，读不到再走公共域名 */
async function fetchMeFallback(event: Parameters<typeof getFriendBucket>[0]): Promise<string> {
  const bucket = getFriendBucket(event)
  if (bucket) {
    try {
      const object = await bucket.get('me.md')
      if (object) {
        const text = await object.text()
        if (text && text.trim()) return text
      }
    } catch (error) {
      console.error('[content] 从 R2 绑定读取 me.md 失败，回退到公共地址', error)
    }
  }

  return await $fetch<string>(`${R2_BASE_URL}/me.md`, {
    responseType: 'text',
    headers: { Accept: 'text/markdown' },
  })
}

export default defineEventHandler(async (event) => {
  const name = getRouterParam(event, 'name') || ''
  if (!allowedObjects.has(name)) {
    throw createError({ statusCode: 404, statusMessage: 'Object not found' })
  }

  // 友链走 R2 绑定直读，并禁用缓存，保证审批通过后前台立刻可见
  if (name === 'friends.json') {
    setResponseHeader(event, 'Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0')
    const bucket = getFriendBucket(event)
    if (bucket) {
      try {
        const links = await readFriendLinks(bucket)
        return { links }
      } catch (error) {
        console.error('[content] 从 R2 绑定读取 friends.json 失败，回退到公共地址', error)
      }
    }
  }

  // 关于我：实时同步 GitHub Profile README，失败时回落到 R2 里的 me.md
  if (name === 'me.md') {
    setResponseHeader(event, 'Content-Type', 'text/markdown; charset=utf-8')
    setResponseHeader(event, 'Cache-Control', 'public, max-age=60, stale-while-revalidate=300')
    try {
      return await fetchReadme()
    } catch (error) {
      console.warn('[content] 实时拉取 GitHub README 失败，回退到 R2 me.md', error)
    }
    try {
      return await fetchMeFallback(event)
    } catch (error) {
      throw createError({ statusCode: 502, statusMessage: 'Content source unavailable', cause: error })
    }
  }

  try {
    return await $fetch(`${R2_BASE_URL}/${name}`, {
      responseType: name.endsWith('.md') ? 'text' : 'json',
      headers: { Accept: name.endsWith('.json') ? 'application/json' : 'text/markdown' },
    })
  } catch (error) {
    throw createError({ statusCode: 502, statusMessage: 'Content source unavailable', cause: error })
  }
})
