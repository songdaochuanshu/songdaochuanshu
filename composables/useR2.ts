// R2 客户端 composable - 使用 Cloudflare R2 API
import type { R2Object } from '../types/r2'

export function useR2() {
  const config = useRuntimeConfig()
  
  // 直接从环境变量读取配置（不通过 runtimeConfig 避免暴露到客户端）
  const accountId = 'd6397095e8c56098875c9b44f03fa970' // 从 Access Key ID 提取或单独配置
  const bucketName = 'songdaochuanshu-static'
  
  const listObjects = async (prefix = ''): Promise<R2Object[]> => {
    try {
      const response = await $fetch(`/api/r2/list${prefix ? `?prefix=${encodeURIComponent(prefix)}` : ''}`)
      return response.objects || []
    } catch (error) {
      console.error('Failed to list R2 objects:', error)
      return []
    }
  }
  
  const getObject = async (key: string): Promise<string | null> => {
    try {
      const response = await $fetch<string>(`/api/r2/get/${encodeURIComponent(key)}`)
      return response
    } catch (error) {
      console.error(`Failed to get object ${key}:`, error)
      return null
    }
  }
  
  const getPublicUrl = (key: string): string => {
    return `${config.public.r2Endpoint}/${bucketName}/${key}`
  }
  
  return {
    listObjects,
    getObject,
    getPublicUrl,
    bucketName,
  }
}
