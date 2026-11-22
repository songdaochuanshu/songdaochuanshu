import { defineEventHandler, createError, getQuery, setResponseHeader, setResponseStatus } from 'h3'
import {
  getFriendBucket,
  getRuntimeEnv,
  readFriendLinks,
  writeFriendLinks,
  normalizeUrl,
  verifyReviewToken,
  type FriendLink,
} from '../../utils/friend-links'
import { escapeHtml } from '../../utils/mail'

type PageTone = 'success' | 'warning' | 'error'

const TONE_STYLES: Record<PageTone, { icon: string; accent: string; accentBg: string; accentBorder: string }> = {
  success: { icon: '✓', accent: '#059669', accentBg: '#ecfdf5', accentBorder: '#a7f3d0' },
  warning: { icon: '!', accent: '#d97706', accentBg: '#fffbeb', accentBorder: '#fde68a' },
  error: { icon: '×', accent: '#dc2626', accentBg: '#fef2f2', accentBorder: '#fecaca' },
}

function renderPage(options: {
  tone: PageTone
  title: string
  message: string
  detail?: string
  link?: FriendLink
  actionLabel?: string
}): string {
  const tone = TONE_STYLES[options.tone]
  const linkRows = options.link
    ? `<div class="card">
        <div class="row"><span>站点名称</span><strong>${escapeHtml(options.link.name)}</strong></div>
        <div class="row"><span>站点网址</span><a href="${escapeHtml(options.link.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(options.link.url)}</a></div>
        <div class="row"><span>一句话简介</span><strong>${escapeHtml(options.link.description)}</strong></div>
        ${options.link.category ? `<div class="row"><span>分类</span><strong>${escapeHtml(options.link.category)}</strong></div>` : ''}
      </div>`
    : ''

  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <meta name="robots" content="noindex,nofollow" />
  <title>${escapeHtml(options.title)} · 松岛川树</title>
  <style>
    :root { color-scheme: light dark; }
    * { box-sizing: border-box; }
    body {
      margin: 0; min-height: 100vh; display: flex; align-items: center; justify-content: center;
      padding: 24px; background: #f6f7f9; color: #1f2937;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif;
    }
    .wrap { width: 100%; max-width: 460px; }
    .panel { background: #fff; border: 1px solid #e8ebf0; border-radius: 16px; padding: 32px 28px; box-shadow: 0 1px 2px rgba(15,23,42,.04); }
    .badge { width: 44px; height: 44px; border-radius: 999px; display: flex; align-items: center; justify-content: center; font-size: 22px; font-weight: 700; color: ${tone.accent}; background: ${tone.accentBg}; border: 1px solid ${tone.accentBorder}; }
    h1 { margin: 18px 0 8px; font-size: 19px; line-height: 1.45; font-weight: 600; color: #0f172a; }
    p { margin: 0; font-size: 14px; line-height: 1.75; color: #64748b; }
    .card { margin: 20px 0 4px; border: 1px solid #eef2f7; border-radius: 12px; padding: 4px 14px; }
    .row { display: flex; gap: 12px; justify-content: space-between; padding: 10px 0; font-size: 13px; border-bottom: 1px solid #f1f5f9; }
    .row:last-child { border-bottom: none; }
    .row span { color: #94a3b8; flex: 0 0 auto; }
    .row strong, .row a { color: #1f2937; font-weight: 500; text-align: right; word-break: break-all; text-decoration: none; }
    .row a { color: #0f766e; }
    .actions { margin-top: 22px; }
    .btn { display: inline-block; padding: 10px 18px; border-radius: 9px; font-size: 14px; font-weight: 600; text-decoration: none; }
    .btn-primary { background: #0f172a; color: #fff; }
    .btn-ghost { background: #f1f5f9; color: #475569; margin-left: 8px; }
    .foot { margin-top: 18px; font-size: 12px; color: #94a3b8; text-align: center; }
    .foot a { color: #94a3b8; }
    @media (prefers-color-scheme: dark) {
      body { background: #0b1120; color: #e2e8f0; }
      .panel { background: #111827; border-color: #1f2937; box-shadow: none; }
      h1 { color: #f8fafc; }
      p { color: #94a3b8; }
      .card { border-color: #1f2937; }
      .row { border-bottom-color: #1f2937; }
      .row strong { color: #e2e8f0; }
      .row a { color: #5eead4; }
      .btn-primary { background: #f8fafc; color: #0f172a; }
      .btn-ghost { background: #1f2937; color: #cbd5e1; }
      .foot, .foot a { color: #64748b; }
    }
  </style>
</head>
<body>
  <div class="wrap">
    <div class="panel">
      <div class="badge">${tone.icon}</div>
      <h1>${escapeHtml(options.title)}</h1>
      <p>${escapeHtml(options.message)}</p>
      ${linkRows}
      <div class="actions">
        <a class="btn btn-primary" href="/links">${escapeHtml(options.actionLabel || '前往友链页')}</a>
        <a class="btn btn-ghost" href="/">回到首页</a>
      </div>
    </div>
    <div class="foot">松岛川树 · <a href="https://blog.openserve.cloud/links">blog.openserve.cloud/links</a></div>
  </div>
</body>
</html>`
}

function respond(event: any, statusCode: number, html: string) {
  setResponseHeader(event, 'Content-Type', 'text/html; charset=utf-8')
  setResponseHeader(event, 'Cache-Control', 'no-store, max-age=0')
  setResponseHeader(event, 'X-Robots-Tag', 'noindex, nofollow')
  setResponseStatus(event, statusCode)
  return html
}

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const action = String(query.action || 'approve')
  const token = String(query.token || '')

  if (!token) {
    return respond(
      event,
      400,
      renderPage({
        tone: 'error',
        title: '链接不完整',
        message: '这个审批链接缺少签名信息，可能是邮件里的链接被截断了。请在邮件里重新点一次按钮。',
      })
    )
  }

  const secret = getRuntimeEnv(event, 'FRIEND_LINK_SECRET')
  if (!secret) {
    console.error('[friend-links] 缺少 FRIEND_LINK_SECRET')
    return respond(
      event,
      500,
      renderPage({
        tone: 'error',
        title: '服务未配置完成',
        message: '服务器上还没配置 FRIEND_LINK_SECRET，暂时无法校验这个链接。',
      })
    )
  }

  const verification = await verifyReviewToken(secret, token)
  if (!verification.ok) {
    const expired = verification.reason === 'expired'
    return respond(
      event,
      expired ? 410 : 400,
      renderPage({
        tone: 'error',
        title: expired ? '链接已过期' : '链接无效',
        message: expired
          ? '这个审批链接超过了 7 天有效期，需要对方重新提交一次申请，或者手动把友链写进 friends.json。'
          : '签名校验没有通过，这个链接可能被改动过。为安全起见，我没有做任何修改。',
      })
    )
  }

  const link = verification.payload.link

  if (action === 'reject') {
    return respond(
      event,
      200,
      renderPage({
        tone: 'warning',
        title: '已忽略这条申请',
        message: '没有写入任何内容，friends.json 保持原样。',
        link,
        actionLabel: '查看现有友链',
      })
    )
  }

  if (action !== 'approve') {
    return respond(
      event,
      400,
      renderPage({
        tone: 'error',
        title: '未知操作',
        message: '链接里的 action 参数既不是 approve 也不是 reject，所以什么也没做。',
        link,
      })
    )
  }

  const bucket = getFriendBucket(event)
  if (!bucket) {
    console.error('[friend-links] 未绑定 BLOG_BUCKET')
    return respond(
      event,
      500,
      renderPage({
        tone: 'error',
        title: 'R2 存储桶未绑定',
        message: 'Pages Functions 里没有可用的 BLOG_BUCKET 绑定，读不到也写不了 friends.json。请在 Pages 项目设置里补上绑定后重试。',
        link,
      })
    )
  }

  const existing = await readFriendLinks(bucket)
  const target = normalizeUrl(link.url)
  if (existing.some(item => normalizeUrl(item.url) === target)) {
    return respond(
      event,
      200,
      renderPage({
        tone: 'warning',
        title: '这个站点已经在友链里了',
        message: '按网址去重后发现了同一条记录，这次没有重复写入。',
        link,
        actionLabel: '查看现有友链',
      })
    )
  }

  const next = [...existing, link]
  await writeFriendLinks(bucket, next)

  return respond(
    event,
    200,
    renderPage({
      tone: 'success',
      title: '已通过，友链已写入 R2',
      message: `friends.json 现在共 ${next.length} 条友链，前台刷新就能看到。`,
      link,
      actionLabel: '现在去友链页看看',
    })
  )
})
