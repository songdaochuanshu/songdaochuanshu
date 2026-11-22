import type { H3Event } from 'h3'
import { getFriendBucket } from './friend-links'

export interface QuotaResult {
  allowed: boolean
  count: number
  limit: number
}

/** 没有 R2 绑定时的兜底计数（只在单个实例内有效，仅用于本地开发/异常降级） */
const memoryCounters = new Map<string, { day: string; count: number }>()

/** 按北京时间切日，保证上限跟 Resend 的每日额度对齐 */
export function shanghaiDay(now = new Date()): string {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Shanghai',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(now)
}

/**
 * 每日配额：用 R2 里的 stats/<name>-<YYYY-MM-DD>.json 计数，跨实例持久。
 * 达到上限返回 allowed=false，调用方据此返回 429，守住 Resend 100 封/天的免费额度。
 */
export async function consumeDailyQuota(event: H3Event, name: string, limit: number): Promise<QuotaResult> {
  const day = shanghaiDay()
  const bucket = getFriendBucket(event)

  if (!bucket) {
    const current = memoryCounters.get(name)
    const count = current && current.day === day ? current.count : 0
    if (count >= limit) return { allowed: false, count, limit }
    memoryCounters.set(name, { day, count: count + 1 })
    return { allowed: true, count: count + 1, limit }
  }

  const key = `stats/${name}-${day}.json`
  let count = 0
  try {
    const object = await bucket.get(key)
    if (object) {
      const parsed = JSON.parse(await object.text())
      count = Number(parsed?.count) || 0
    }
  } catch (error) {
    console.error('[quota] 读取每日计数失败，按 0 继续', error)
  }

  if (count >= limit) return { allowed: false, count, limit }

  const next = count + 1
  try {
    await bucket.put(key, JSON.stringify({ count: next, day, updatedAt: new Date().toISOString() }), {
      httpMetadata: { contentType: 'application/json; charset=utf-8', cacheControl: 'no-store' },
    })
  } catch (error) {
    // 计数写失败时不拦真人投稿：IP 限流 + Turnstile 仍在前置拦截
    console.error('[quota] 写入每日计数失败，本轮放行', error)
  }
  return { allowed: true, count: next, limit }
}
