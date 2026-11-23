import { defineEventHandler, sendRedirect, setHeader } from 'h3'

/**
 * 博客园头图随机背景
 * GET /api/hero-bg -> 302 到 R2 图床 normal/ 里随机一张图
 * 清单来源与 composables/useRandomImages.ts 相同（images-info.json）。
 * 响应禁止缓存，保证每次刷新页面都是新图；失败时兜底 104001051.jpg。
 */

const IMG_BASE = 'https://img-homepage.openserve.cloud'
const MANIFEST_URL = `${IMG_BASE}/images-info.json`
const FALLBACK = `${IMG_BASE}/normal/104001051.jpg`
const CACHE_TTL = 5 * 60 * 1000

interface ImageInfo {
  filename?: string
  url?: string
}

interface ManifestCache {
  list: ImageInfo[]
  at: number
}

let cache: ManifestCache | null = null

async function getNormalImages(): Promise<ImageInfo[]> {
  if (cache && Date.now() - cache.at < CACHE_TTL) return cache.list

  const data = await $fetch<{ normal?: ImageInfo[] }>(MANIFEST_URL)
  const list = (data?.normal || []).filter((img) => img && (img.url || img.filename))
  cache = { list, at: Date.now() }
  return list
}

export default defineEventHandler(async (event) => {
  setHeader(event, 'Cache-Control', 'no-store, no-cache, must-revalidate')
  setHeader(event, 'Pragma', 'no-cache')

  let target = FALLBACK
  try {
    const images = await getNormalImages()
    if (images.length) {
      const picked = images[Math.floor(Math.random() * images.length)]
      target = picked.url || `${IMG_BASE}/normal/${picked.filename}`
    }
  } catch {
    target = FALLBACK
  }

  return sendRedirect(event, target, 302)
})
