// R2 列表 API - 使用 HTTP API
import { defineEventHandler, getQuery, createError } from 'h3'

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event)
    const prefix = (query.prefix as string) || ''
    
    const accountId = process.env.R2_ACCOUNT_ID || 'd6397095e8c56098875c9b44f03fa970'
    const bucketName = process.env.R2_BUCKET_NAME || 'songdaochuanshu-static'
    const token = process.env.CLOUDFLARE_WRITE_TOKEN
    
    // 构建 API URL
    const url = new URL(`https://api.cloudflare.com/client/v4/accounts/${accountId}/r2/buckets/${bucketName}/objects`)
    url.searchParams.set('prefix', prefix || 'posts/')
    url.searchParams.set('limit', '100')
    
    // 发起请求
    const response = await fetch(url.toString(), {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
    
    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`)
    }
    
    const data = await response.json()
    
    return {
      objects: (data.result || []).map((obj: any) => ({
        key: obj.key,
        size: obj.size,
        etag: obj.etag,
        uploaded: obj.uploaded,
        storageClass: obj.storageClass,
      })),
      truncated: data.result?.truncated || false,
    }
  } catch (error) {
    console.error('R2 list error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to list R2 objects',
      cause: error,
    })
  }
})
