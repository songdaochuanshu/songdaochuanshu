// R2 获取对象 API
import { defineEventHandler, getRouterParams, createError } from 'h3'

export default defineEventHandler(async (event) => {
  try {
    const params = getRouterParams(event)
    const key = params.key || ''
    
    if (!key) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Key is required',
      })
    }
    
    // Use public URL instead of R2 API
    const publicUrl = `${process.env.R2_PUBLIC_URL || 'https://pub-placeholder.r2.dev'}/${key}`
    const response = await fetch(publicUrl)
    
    if (!response.ok) {
      throw new Error(`Failed to fetch object: ${response.status}`)
    }
    
    const content = await response.text()
    
    // If Markdown file, parse frontmatter
    if (key.endsWith('.md') || key.endsWith('.mdx')) {
      const slug = key.replace('.md', '').replace('.mdx', '')
      const matter = content.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/s)
      if (matter) {
        const [, meta, body] = matter
        const metadata: Record<string, unknown> = {}
        meta.split('\n').forEach(line => {
          const [k, ...v] = line.split(': ')
          if (k && v.length) metadata[k.trim()] = v.join(': ').trim()
        })
        return { content: body, metadata, slug }
      }
      return { content, metadata: {}, slug: key }
    }
    
    return content
  } catch (error) {
    console.error('R2 get error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to get R2 object',
      cause: error,
    })
  }
})
