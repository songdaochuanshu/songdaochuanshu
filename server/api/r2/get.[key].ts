// R2 获取对象 API - 使用 HTTP API
import { defineEventHandler, getRouterParams, createError } from 'h3'
import { parseMarkdown } from '~/composables/useMarkdown'

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
    
    const accountId = process.env.R2_ACCOUNT_ID || 'd6397095e8c56098875c9b44f03fa970'
    const bucketName = process.env.R2_BUCKET_NAME || 'songdaochuanshu-static'
    const token = process.env.CLOUDFLARE_WRITE_TOKEN
    
    // 获取对象内容
    const url = `https://api.cloudflare.com/client/v4/accounts/${accountId}/r2/buckets/${bucketName}/objects/${encodeURIComponent(key)}`
    
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
    
    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`)
    }
    
    const content = await response.text()
    
    // 如果是 Markdown 文件，解析它
    if (key.endsWith('.md') || key.endsWith('.mdx')) {
      const slug = key.replace('.md', '').replace('.mdx', '')
      const parsed = await parseMarkdown(content, slug)
      return parsed
    }
    
    // 返回原始内容
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
