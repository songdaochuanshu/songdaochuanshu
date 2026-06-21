// R2 签名 API 路由
import { defineEventHandler, readBody } from 'h3'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { objectKey } = body
  
  if (!objectKey) {
    throw createError({
      statusCode: 400,
      statusMessage: 'objectKey is required'
    })
  }
  
  // 这里应该调用 R2 API 生成预签名 URL
  // 由于 Nitro R2 驱动的配置问题，我们先返回模拟数据
  return {
    url: `/storage/r2/${objectKey}`,
    success: true
  }
})
