import { Marked } from "marked"

export interface ManifestPost {
  path: string; key: string; category: "blog" | "life" | "record" | "root"
  title: string; date: string | null; description: string; tags: string[]; layout: string
}
export interface Manifest { version: string; generatedAt: string; total: number; posts: ManifestPost[] }
export interface RenderedPost { meta: ManifestPost; html: string; toc: TocLink[] }
export interface TocLink { id: string; text: string; depth: number }

const R2_BASE = process.env.NUXT_PUBLIC_R2_BASE || "https://blog-static.openserve.cloud"

function slugify(text: string): string {
  return text.toLowerCase().replace(/<[^>]+>/g, "").replace(/[^\u4e00-\u9fa5a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-").slice(0, 80) || "heading"
}

function createMarked(toc: TocLink[]): Marked {
  const m = new Marked({ gfm: true, breaks: false })
  m.use({ renderer: { heading(_text: string, level: number, raw: string) {
    if (level === 2 || level === 3) {
      const id = slugify(raw || _text)
      toc.push({ id, text: _text.replace(/<[^>]+>/g, ""), depth: level })
      return `<h${level} id="${id}">${_text}</h${level}>\n`
    }
    return `<h${level}>${_text}</h${level}>\n`
  }}})
  return m
}

let _cache: { data: Manifest; ts: number } | null = null
export async function getManifest(): Promise<Manifest> {
  if (_cache && Date.now() - _cache.ts < 60_000) return _cache.data
  const res = await fetch(`${R2_BASE}/manifest.json`, { cache: "no-store" })
  _cache = { data: await res.json(), ts: Date.now() }
  return _cache.data
}

export async function getRenderedPost(pathOrKey: string, byPath = false): Promise<RenderedPost | null> {
  const mf = await getManifest()
  const meta = byPath ? mf.posts.find(p => p.path === pathOrKey) : mf.posts.find(p => p.key === pathOrKey)
  if (!meta) return null
  const res = await fetch(`${R2_BASE}/${meta.key}`, { cache: "no-store" })
  const md = await res.text()
  const toc: TocLink[] = []
  const marked = createMarked(toc)
  const html = await marked.parse(md) as string
  return { meta, html, toc }
}

export async function getPostsByCategory(cat: string): Promise<ManifestPost[]> {
  return (await getManifest()).posts.filter(p => p.category === cat)
}
export async function getPostsByTag(tag: string): Promise<ManifestPost[]> {
  return (await getManifest()).posts.filter(p => p.tags.includes(tag))
}
export async function getAllTags(): Promise<Record<string, number>> {
  const counts: Record<string, number> = {}
  for (const p of (await getManifest()).posts)
    for (const t of p.tags) counts[t] = (counts[t] || 0) + 1
  return counts
}
