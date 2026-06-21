// R2 列表 API
import { defineEventHandler, getQuery, createError } from 'h3'

export default defineEventHandler(async (event) => {
  try {
    const manifestUrl = `${process.env.R2_PUBLIC_URL || 'https://pub-ba3e6b3710404683b4c408cab6dc42a2.r2.dev'}/manifest.json`
    const response = await fetch(manifestUrl)
    
    if (!response.ok) {
      throw new Error(`Failed to fetch manifest: ${response.status}`)
    }
    
    const data = await response.json()
    
    return {
      objects: data.map((item: any) => ({
        key: item.key,
        size: item.size,
        etag: item.etag,
        uploaded: item.uploaded,
        storageClass: item.storageClass,
      })),
      truncated: false,
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
