const STORAGE_KEY = 'blog-read-history'
const MAX_ITEMS = 100

export function useReadHistory() {
  function getReadKeys(): string[] {
    if (!import.meta.client) return []
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    } catch {
      return []
    }
  }

  function markAsRead(key: string) {
    if (!import.meta.client) return
    const keys = getReadKeys()
    if (!keys.includes(key)) {
      keys.unshift(key)
      if (keys.length > MAX_ITEMS) keys.pop()
      localStorage.setItem(STORAGE_KEY, JSON.stringify(keys))
    }
  }

  function isRead(key: string): boolean {
    return getReadKeys().includes(key)
  }

  return { markAsRead, isRead }
}
