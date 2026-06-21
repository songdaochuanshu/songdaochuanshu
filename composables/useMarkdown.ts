// Markdown 解析 composable
import matter from 'gray-matter'
import { marked } from 'marked'

export interface ParsedPost {
  slug: string
  title: string
  date: string
  tags: string[]
  excerpt: string
  content: string
  html: string
}

export async function parseMarkdown(content: string, slug: string): Promise<ParsedPost> {
  const { data, content: markdown } = matter(content)
  
  // 配置 marked 选项
  marked.setOptions({
    breaks: true,
    gfm: true,
  })
  
  // 渲染 HTML
  const html = await marked.parse(markdown || '')
  
  return {
    slug,
    title: data.title || 'Untitled',
    date: data.date || new Date().toISOString(),
    tags: data.tags || [],
    excerpt: data.excerpt || markdown?.substring(0, 200) || '',
    content: markdown || '',
    html: html as string,
  }
}

export function extractSlug(filename: string): string {
  return filename.replace('.md', '').replace('.mdx', '')
}

// 为了方便在 Vue 组件中使用
export function useParseMarkdown() {
  return parseMarkdown
}

export function useExtractSlug() {
  return extractSlug
}
