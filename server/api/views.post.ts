import { useStorage } from '#imports'
import { getHeader, getRequestIP } from 'h3'

/* 同一 IP + 同一篇文章的计数窗口：10 分钟内只 +1，避免脚本连刷把阅读量刷假 */
const DEDUPE_WINDOW_MS = 10 * 60 * 1000

/** 只接受 manifest 里那种文章 key：blog/ 开头、.md 结尾，且不含穿越/查询字符 */
function isSafeViewKey(key: unknown): key is string {
  if (typeof key !== 'string' || key.length === 0 || key.length > 200) return false
  if (!key.startsWith('blog/') || !key.endsWith('.md')) return false
  if (/[\\?#\u0000-\u001f]/.test(key)) return false
  return key.split('/').every((segment) => segment !== '' && segment !== '.' && segment !== '..')
}

export default defineEventHandler(async (event) => {
  const body = await readBody(event).catch(() => ({}) as any)
  const key = (body as any)?.key
  if (!isSafeViewKey(key)) {
    throw createError({ statusCode: 400, message: 'Invalid key in body' })
  }

  const storage = useStorage('data')
  const viewsKey = `views:${key}`
  const ip = getHeader(event, 'cf-connecting-ip') || getRequestIP(event, { xForwardedFor: true }) || 'unknown'
  const dedupeKey = `views:recent:${ip}:${key}`
  const now = Date.now()

  const lastSeen = (await storage.getItem<number>(dedupeKey)) || 0
  const current = (await storage.getItem<number>(viewsKey)) || 0

  if (lastSeen && now - lastSeen < DEDUPE_WINDOW_MS) {
    return { key, views: current, deduped: true }
  }

  const updated = current + 1
  await storage.setItem(viewsKey, updated)
  await storage.setItem(dedupeKey, now)

  return { key, views: updated, deduped: false }
})
