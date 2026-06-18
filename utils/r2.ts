/**
 * R2 工具：manifest 拉取、markdown 渲染、heading id 生成
 *
 * 工作流：
 *   - 列表页（/blog /tags ...）→ 拉 manifest.json
 *   - 文章页（/p/xxx）→ 拉对应 .md，用 marked 渲染
 *
 * manifest 缓存在 Worker 内存里（60s TTL），
 * 实际生产环境还可以加 Cloudflare Cache API 或 KV 持久化。
 */

import { marked } from "marked"

export interface ManifestPost {
  path: string
  key: string
  category: "blog" | "life" | "record" | "root"
  title: string
  date: string | null
  description: string
  tags: string[]
  layout: string
}

export interface Manifest {
  version: string
  generatedAt: string
  total: number
  posts: ManifestPost[]
}

export interface RenderedPost {
  meta: ManifestPost
  html: string
  toc: TocLink[]
}

export interface TocLink {
  id: string
  text: string
  depth: number
}

// ============ 配置 ============
export function getR2Base(): string {
  const cfg = useRuntimeConfig()
  return (cfg.public.r2Base as string) || "https://blog-static.songdaochuanshu.com"
}

// ============ marked 配置 ============
// heading id 用 slugify 逻辑加，TOC 收集 h2/h3
const slugifyCache = new Map<string, string>()

function slugify(text: string): string {
  const cached = slugifyCache.get(text)
  if (cached) return cached
  const stripped = text
    .toLowerCase()
    .replace(/<[^>]+>/g, "")
    .replace(/[^\u4e00-\u9fa5a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 80)
  const final = stripped || "heading"
  slugifyCache.set(text, final)
  return final
}

// 给 heading 加 id，收集 TOC
const tocCollector: TocLink[] = []
marked.use({
  gfm: true,
  breaks: false,
  renderer: {
    heading(this: any, text: string, level: number, raw: string) {
      if (level === 2 || level === 3) {
        const id = slugify(raw || text)
        tocCollector.push({ id, text: text.replace(/<[^>]+>/g, ""), depth: level })
        return `<h${level} id="${id}">${text}</h${level}>\n`
      }
      return `<h${level}>${text}</h${level}>\n`
    },
  },
})

// ============ manifest 缓存 ============
let manifestCache: { data: Manifest; fetchedAt: number } | null = null
const MANIFEST_TTL = 60_000 // 60 秒

export async function getManifest(force = false): Promise<Manifest> {
  if (!force && manifestCache && Date.now() - manifestCache.fetchedAt < MANIFEST_TTL) {
    return manifestCache.data
  }
  const base = getR2Base()
  const data = await $fetch<Manifest>(`${base}/manifest.json`, {
    headers: { "Cache-Control": "no-cache" },
  })
  manifestCache = { data, fetchedAt: Date.now() }
  return data
}

// ============ 文章渲染 ============
export async function getRenderedPost(pathOrKey: string, opts: { byPath?: boolean } = {}): Promise<RenderedPost | null> {
  const manifest = await getManifest()
  const base = getR2Base()

  let meta: ManifestPost | undefined
  if (opts.byPath) {
    meta = manifest.posts.find(p => p.path === pathOrKey)
  } else {
    meta = manifest.posts.find(p => p.key === pathOrKey)
  }
  if (!meta) return null

  const md = await $fetch<string>(`${base}/${meta.key}`, {
    responseType: "text",
    headers: { "Cache-Control": "no-cache" },
  })

  // 清空 TOC，重新收集
  tocCollector.length = 0
  const html = await marked.parse(md)

  return {
    meta,
    html: html as string,
    toc: tocCollector.slice(),
  }
}

// ============ 列表辅助 ============
export async function getPostsByCategory(category: string): Promise<ManifestPost[]> {
  const m = await getManifest()
  return m.posts.filter(p => p.category === category)
}

export async function getPostsByTag(tag: string): Promise<ManifestPost[]> {
  const m = await getManifest()
  return m.posts.filter(p => p.tags.includes(tag))
}

export async function getAllTags(): Promise<Record<string, number>> {
  const m = await getManifest()
  const counts: Record<string, number> = {}
  for (const p of m.posts) {
    for (const t of p.tags) {
      counts[t] = (counts[t] || 0) + 1
    }
  }
  return counts
}