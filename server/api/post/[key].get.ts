// 获取单个文章内容
import { defineEventHandler, getRouterParams } from 'h3'

const BASE_URL = 'https://blog-static.openserve.cloud'

export default defineEventHandler(async (event) => {
  try {
    const params = getRouterParams(event)
    const key = decodeURIComponent(params.key)
    
    const resp = await fetch(`${BASE_URL}/${key}`)
    
    if (!resp.ok) {
      return {
        success: false,
        error: 'Post not found'
      }
    }
    
    const content = await resp.text()
    
    return {
      success: true,
      content: content,
      key: key
    }
  } catch (error: any) {
    return {
      success: false,
      error: error.message
    }
  }
})
