import { defineEventHandler, readBody, createError, getHeader, getRequestIP, getRequestURL } from 'h3'
import {
  createReviewToken,
  getFriendBucket,
  getRuntimeEnv,
  readFriendLinks,
  normalizeUrl,
  validateApplyInput,
  type FriendLink,
} from '../../utils/friend-links'
import { escapeHtml, sendMail } from '../../utils/mail'
import { verifyTurnstileToken } from '../../utils/turnstile'
import { consumeDailyQuota } from '../../utils/daily-quota'

/* 简单的同实例限流：同一 IP 10 分钟内最多 5 次提交 */
const RATE_WINDOW_MS = 10 * 60 * 1000
const RATE_LIMIT = 5
/* 每日发信总上限：守住 Resend 100 封/天的免费额度 */
const DAILY_MAIL_LIMIT = 20
const recentSubmissions = new Map<string, number[]>()

function tooManySubmissions(ip: string): boolean {
  const now = Date.now()
  const history = (recentSubmissions.get(ip) || []).filter(timestamp => now - timestamp < RATE_WINDOW_MS)
  if (history.length >= RATE_LIMIT) {
    recentSubmissions.set(ip, history)
    return true
  }
  history.push(now)
  recentSubmissions.set(ip, history)
  if (recentSubmissions.size > 500) {
    for (const [key, timestamps] of recentSubmissions) {
      if (!timestamps.some(timestamp => now - timestamp < RATE_WINDOW_MS)) recentSubmissions.delete(key)
    }
  }
  return false
}

function assertSameOrigin(event: any) {
  const origin = getHeader(event, 'origin')
  if (!origin) return // 同源表单在部分浏览器里不带 Origin，交给限流与蜜罐兜底
  try {
    const originHost = new URL(origin).host
    const requestHost = getRequestURL(event).host
    if (originHost !== requestHost) {
      throw createError({ statusCode: 403, statusMessage: '请求来源不合法' })
    }
  } catch (error: any) {
    if (error?.statusCode === 403) throw error
    throw createError({ statusCode: 403, statusMessage: '请求来源不合法' })
  }
}

function buildNotificationHtml(link: FriendLink, approveUrl: string, rejectUrl: string, submittedAt: string) {
  const rows: Array<[string, string]> = [
    ['站点名称', link.name],
    ['站点网址', link.url],
    ['一句话简介', link.description],
    ['头像链接', link.avatar],
  ]
  if (link.category) rows.push(['分类', link.category])
  rows.push(['提交时间', submittedAt])

  const rowsHtml = rows
    .map(
      ([label, value], index) => `
      <tr>
        <td style="padding:10px 0;${index === 0 ? '' : 'border-top:1px solid #eef2f7;'}width:96px;vertical-align:top;font-size:13px;color:#8b95a5;">${escapeHtml(label)}</td>
        <td style="padding:10px 0;${index === 0 ? '' : 'border-top:1px solid #eef2f7;'}font-size:13px;color:#1f2937;word-break:break-all;">${
          label === '站点网址'
            ? `<a href="${escapeHtml(link.url)}" target="_blank" style="color:#0f766e;text-decoration:none;">${escapeHtml(link.url)}</a>`
            : escapeHtml(value)
        }</td>
      </tr>`
    )
    .join('')

  return `<!DOCTYPE html>
<html lang="zh-CN">
<head><meta charset="utf-8" /><meta name="viewport" content="width=device-width,initial-scale=1" /></head>
<body style="margin:0;padding:24px 12px;background:#f6f7f9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','PingFang SC','Hiragino Sans GB','Microsoft YaHei',sans-serif;">
  <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:560px;margin:0 auto;background:#ffffff;border:1px solid #e8ebf0;border-radius:14px;overflow:hidden;">
    <tr>
      <td style="padding:24px 26px 8px 26px;">
        <div style="font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:#94a3b8;">松岛川树 · 友情链接</div>
        <h1 style="margin:8px 0 4px 0;font-size:19px;line-height:1.4;color:#0f172a;font-weight:600;">收到一条友链申请</h1>
        <p style="margin:0;font-size:13px;color:#64748b;">通过后会自动写入 R2 的 <code style="background:#f1f5f9;padding:1px 5px;border-radius:4px;font-size:12px;">friends.json</code>，前台立即生效。</p>
      </td>
    </tr>
    <tr>
      <td style="padding:8px 26px 0 26px;">
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%">${rowsHtml}</table>
      </td>
    </tr>
    <tr>
      <td style="padding:22px 26px 6px 26px;">
        <a href="${approveUrl}" target="_blank" style="display:inline-block;padding:11px 20px;background:#059669;color:#ffffff;font-size:14px;font-weight:600;text-decoration:none;border-radius:9px;">✅ 一键通过并更新 R2</a>
        <a href="${rejectUrl}" target="_blank" style="display:inline-block;margin-left:8px;padding:11px 20px;background:#f1f5f9;color:#475569;font-size:14px;font-weight:600;text-decoration:none;border-radius:9px;">❌ 忽略</a>
      </td>
    </tr>
    <tr>
      <td style="padding:14px 26px 26px 26px;">
        <p style="margin:0;font-size:12px;line-height:1.7;color:#94a3b8;">两个链接 7 天内有效，只能由持有本邮件的人使用。若按钮没有反应，可以把下面的地址复制到浏览器打开：<br /><span style="color:#64748b;word-break:break-all;">${escapeHtml(approveUrl)}</span></p>
      </td>
    </tr>
  </table>
</body>
</html>`
}

function buildNotificationText(link: FriendLink, approveUrl: string, rejectUrl: string) {
  const lines = [
    '收到一条友链申请',
    '',
    `站点名称：${link.name}`,
    `站点网址：${link.url}`,
    `一句话简介：${link.description}`,
    `头像链接：${link.avatar}`,
  ]
  if (link.category) lines.push(`分类：${link.category}`)
  lines.push('', `通过（写入 R2 friends.json）：${approveUrl}`, `忽略：${rejectUrl}`, '', '链接 7 天内有效。')
  return lines.join('\n')
}

export default defineEventHandler(async (event) => {
  assertSameOrigin(event)

  const ip = getHeader(event, 'cf-connecting-ip') || getRequestIP(event, { xForwardedFor: true }) || ''
  if (ip && tooManySubmissions(ip)) {
    throw createError({ statusCode: 429, statusMessage: '提交太频繁了，请稍后再试' })
  }

  const body = await readBody(event).catch(() => ({}) as any)

  // 人机验证：配置了 TURNSTILE_SECRET_KEY 才启用，失败直接 400
  const turnstile = await verifyTurnstileToken(event, (body as any)?.turnstileToken, ip || undefined)
  if (!turnstile.ok) {
    throw createError({ statusCode: 400, statusMessage: '人机验证未通过，请刷新页面重试' })
  }

  const validation = validateApplyInput(body || {})
  if (!validation.ok) {
    throw createError({ statusCode: 400, statusMessage: validation.message })
  }
  const link = validation.link

  const secret = getRuntimeEnv(event, 'FRIEND_LINK_SECRET')
  const adminEmail = getRuntimeEnv(event, 'ADMIN_EMAIL')
  if (!secret || !adminEmail) {
    console.error('[friend-links] 缺少 FRIEND_LINK_SECRET 或 ADMIN_EMAIL 环境变量')
    throw createError({ statusCode: 500, statusMessage: '服务暂时不可用，请稍后再试' })
  }

  // 每日发信封顶：计数存 R2（stats/ 前缀），超限直接 429，先于发信执行
  const quota = await consumeDailyQuota(event, 'friend-link-mail', DAILY_MAIL_LIMIT)
  if (!quota.allowed) {
    console.warn(`[friend-links] 今日友链通知邮件已达上限 ${quota.limit} 封，拒绝本次提交`)
    throw createError({ statusCode: 429, statusMessage: '今天收到的友链申请太多了，请明天再试' })
  }

  const token = await createReviewToken(secret, link)
  const baseUrl = getRequestURL(event).origin
  const approveUrl = `${baseUrl}/api/links/review?action=approve&token=${encodeURIComponent(token)}`
  const rejectUrl = `${baseUrl}/api/links/review?action=reject&token=${encodeURIComponent(token)}`
  const submittedAt = new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai', hour12: false })

  try {
    await sendMail(event, {
      to: adminEmail,
      subject: `【友链申请】${link.name}`,
      html: buildNotificationHtml(link, approveUrl, rejectUrl, submittedAt),
      text: buildNotificationText(link, approveUrl, rejectUrl),
    })
  } catch (error) {
    console.error('[friend-links] 通知邮件发送失败', error)
    throw createError({ statusCode: 502, statusMessage: '通知邮件发送失败，请稍后再试' })
  }

  // 已存在同一站点时提前告诉提交者，避免重复申请（读 R2 失败不影响这次提交）
  try {
    const bucket = getFriendBucket(event)
    if (bucket) {
      const existing = await readFriendLinks(bucket)
      if (existing.some(item => normalizeUrl(item.url) === normalizeUrl(link.url))) {
        return { ok: true, duplicated: true, message: '这个站点已经在友链里了，感谢再次推荐' }
      }
    }
  } catch (error) {
    console.error('[friend-links] 读取 friends.json 去重失败', error)
  }

  return { ok: true, duplicated: false, message: '申请已提交，等我看过就会出现在这里' }
})
