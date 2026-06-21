// R2 客户端 composable
import type { R2Object } from '../types/r2'

export function useR2() {
  const config = useRuntimeConfig()
  
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
    return `${config.public.r2Endpoint}/${key}`
  }
  
  return {
    listObjects,
    getObject,
    getPublicUrl,
  }
}
