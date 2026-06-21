// 文章列表 API
import { defineEventHandler } from 'h3'
import { fetchManifest } from '../utils/blog'

export default defineEventHandler(async () => {
  try {
    const manifest = await fetchManifest()
    // 过滤掉非文章的文件
    const posts = manifest.posts.filter(p => p.category !== 'root')
    return {
      posts,
      total: manifest.total,
    }
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch manifest',
    })
  }
})
