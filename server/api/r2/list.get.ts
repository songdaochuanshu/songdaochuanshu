import { defineEventHandler, createError } from 'h3'

export default defineEventHandler(async () => {
  try {
    const manifestUrl = `${process.env.R2_PUBLIC_URL || 'https://blog-static.openserve.cloud'}/manifest.json`
    const response = await fetch(manifestUrl)
    if (!response.ok) throw new Error(`Failed to fetch manifest: ${response.status}`)
    const data = await response.json() as { posts?: Array<Record<string, unknown>> }
    return {
      objects: (data.posts || []).map((item) => ({
        key: item.key, size: item.size, etag: item.etag, uploaded: item.uploaded, storageClass: item.storageClass,
      })),
      truncated: false,
    }
  } catch (error) {
    console.error('R2 list error:', error instanceof Error ? error.message : 'unknown error')
    throw createError({ statusCode: 500, statusMessage: 'Failed to list R2 objects', cause: error })
  }
})
