// 从 manifest.json 获取文章索引
const BASE_URL = 'https://blog-static.openserve.cloud'

export interface BlogPost {
  path: string
  key: string
  category: string
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
  posts: BlogPost[]
}

export async function fetchManifest(): Promise<Manifest> {
  const resp = await fetch(`${BASE_URL}/manifest.json`)
  if (!resp.ok) throw new Error('Failed to fetch manifest')
  return resp.json()
}

export async function fetchPost(key: string): Promise<string> {
  const resp = await fetch(`${BASE_URL}/${key}`)
  if (!resp.ok) throw new Error(`Failed to fetch ${key}`)
  return resp.text()
}

export function extractSlug(key: string): string {
  return key.replace('.md', '').replace('.mdx', '')
}
