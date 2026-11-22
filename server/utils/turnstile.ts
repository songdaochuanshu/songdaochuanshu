import type { H3Event } from 'h3'
import { getRuntimeEnv } from './friend-links'

const SITEVERIFY_ENDPOINT = 'https://challenges.cloudflare.com/turnstile/v0/siteverify'

export interface TurnstileResult {
  ok: boolean
  errorCodes: string[]
}

/** 只有配置了 TURNSTILE_SECRET_KEY 才启用校验，本地开发没配时直接跳过 */
export function turnstileEnabled(event: H3Event): boolean {
  return Boolean(getRuntimeEnv(event, 'TURNSTILE_SECRET_KEY'))
}

/**
 * 调用 Cloudflare siteverify 校验 Turnstile token。
 * 带上 remoteip 让 Cloudflare 结合来访 IP 判断，减少 token 被搬运重放的空间。
 */
export async function verifyTurnstileToken(
  event: H3Event,
  token: unknown,
  remoteip?: string
): Promise<TurnstileResult> {
  const secret = getRuntimeEnv(event, 'TURNSTILE_SECRET_KEY')
  if (!secret) return { ok: true, errorCodes: [] }

  if (typeof token !== 'string' || token.length === 0 || token.length > 2048) {
    return { ok: false, errorCodes: ['missing-input-response'] }
  }

  const form = new URLSearchParams()
  form.set('secret', secret)
  form.set('response', token)
  if (remoteip) form.set('remoteip', remoteip)

  try {
    const response = await fetch(SITEVERIFY_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: form.toString(),
    })
    if (!response.ok) {
      console.error('[turnstile] siteverify 返回异常状态', response.status)
      return { ok: false, errorCodes: [`http-${response.status}`] }
    }
    const result = (await response.json()) as { success?: boolean; 'error-codes'?: string[] }
    const errorCodes = Array.isArray(result?.['error-codes']) ? result['error-codes']! : []
    if (!result?.success) console.warn('[turnstile] 校验未通过', errorCodes)
    return { ok: Boolean(result?.success), errorCodes }
  } catch (error) {
    console.error('[turnstile] 校验请求失败', error)
    return { ok: false, errorCodes: ['internal-error'] }
  }
}
