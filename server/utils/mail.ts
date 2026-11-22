import type { H3Event } from 'h3'
import { getRuntimeEnv } from './friend-links'

const RESEND_ENDPOINT = 'https://api.resend.com/emails'
const FALLBACK_FROM = 'Friend Links <onboarding@resend.dev>'

export interface MailOptions {
  to: string
  subject: string
  html: string
  text: string
  replyTo?: string
}

export function escapeHtml(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

async function postToResend(apiKey: string, from: string, options: MailOptions): Promise<Response> {
  return fetch(RESEND_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [options.to],
      subject: options.subject,
      html: options.html,
      text: options.text,
      ...(options.replyTo ? { reply_to: options.replyTo } : {}),
    }),
  })
}

/**
 * 通过 Resend 发送邮件。
 * 发件地址优先用 MAIL_FROM，若 Resend 拒绝该域名则退回测试发件地址 onboarding@resend.dev。
 */
export async function sendMail(event: H3Event, options: MailOptions): Promise<void> {
  const apiKey = getRuntimeEnv(event, 'RESEND_API_KEY')
  if (!apiKey) {
    throw new Error('缺少 RESEND_API_KEY，无法发送通知邮件')
  }

  const preferredFrom = getRuntimeEnv(event, 'MAIL_FROM') || FALLBACK_FROM
  const attempts = preferredFrom === FALLBACK_FROM ? [preferredFrom] : [preferredFrom, FALLBACK_FROM]

  let lastError = ''
  for (const from of attempts) {
    const response = await postToResend(apiKey, from, options)
    if (response.ok) return

    const detail = await response.text().catch(() => '')
    lastError = `${response.status} ${detail.slice(0, 300)}`
    // 只有发件域名相关的问题才值得换发件地址重试
    if (response.status !== 403 && response.status !== 422) break
  }
  throw new Error(`Resend 发送失败: ${lastError}`)
}
