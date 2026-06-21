// 获取 manifest.json
import { defineEventHandler, getQuery } from 'h3'

const BASE_URL = 'https://blog-static.openserve.cloud'

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event)
    const category = query.category as string
    
    const manifestResp = await fetch(`${BASE_URL}/manifest.json`)
    const manifest = await manifestResp.json()
    let posts = manifest.posts
    
    if (category) {
      posts = posts.filter((p: any) => p.category === category)
    }
    
    posts.sort((a: any, b: any) => {
      const dateA = a.date ? new Date(a.date).getTime() : 0
      const dateB = b.date ? new Date(b.date).getTime() : 0
      return dateB - dateA
    })
    
    return {
      success: true,
      data: posts,
      total: posts.length
    }
  } catch (error: any) {
    return {
      success: false,
      error: error.message
    }
  }
})
