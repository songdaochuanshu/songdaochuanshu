import type { H3Event } from 'h3'

export interface FriendLink {
  name: string
  url: string
  avatar: string
  description: string
  category?: string
}

export const FRIENDS_KEY = 'friends.json'
export const REVIEW_TOKEN_TTL_SECONDS = 7 * 24 * 60 * 60

/** Pages / Workers 运行时绑定 */
type RuntimeEnv = Record<string, unknown>

function cloudflareEnv(event?: H3Event): RuntimeEnv {
  const env = (event?.context as any)?.cloudflare?.env
  if (env && typeof env === 'object') return env as RuntimeEnv
  const globalEnv = (globalThis as any)?.__env__
  if (globalEnv && typeof globalEnv === 'object') return globalEnv as RuntimeEnv
  return {}
}

/** 依次从 Cloudflare 绑定、process.env、runtimeConfig 中读取字符串变量 */
export function getRuntimeEnv(event: H3Event | undefined, key: string): string | undefined {
  const fromCf = cloudflareEnv(event)[key]
  if (typeof fromCf === 'string' && fromCf.length > 0) return fromCf

  const fromProcess = (globalThis as any)?.process?.env?.[key]
  if (typeof fromProcess === 'string' && fromProcess.length > 0) return fromProcess

  try {
    const config = useRuntimeConfig(event as any)
    const value = (config as any)?.[key] ?? (config as any)?.public?.[key]
    if (typeof value === 'string' && value.length > 0) return value
  } catch {
    /* runtimeConfig 在部分上下文不可用，忽略 */
  }
  return undefined
}

/** 取 R2 绑定；只有在 Functions 里配置了 BLOG_BUCKET 时才拿得到 */
export function getFriendBucket(event: H3Event): R2BucketLike | null {
  const bucket = cloudflareEnv(event).BLOG_BUCKET
  if (bucket && typeof (bucket as any).get === 'function' && typeof (bucket as any).put === 'function') {
    return bucket as R2BucketLike
  }
  return null
}

export interface R2ObjectLike {
  text(): Promise<string>
}

export interface R2BucketLike {
  get(key: string): Promise<R2ObjectLike | null>
  put(
    key: string,
    value: string,
    options?: { httpMetadata?: { contentType?: string; cacheControl?: string } }
  ): Promise<unknown>
}

/** 读取 friends.json；文件不存在或内容损坏时返回空列表，读取本身失败会抛出 */
export async function readFriendLinks(bucket: R2BucketLike | null): Promise<FriendLink[]> {
  if (!bucket) return []
  const object = await bucket.get(FRIENDS_KEY)
  if (!object) return []
  try {
    const raw = await object.text()
    const parsed = JSON.parse(raw)
    const list = Array.isArray(parsed) ? parsed : parsed?.links
    if (!Array.isArray(list)) return []
    return list.filter(isFriendLink)
  } catch {
    return []
  }
}

export async function writeFriendLinks(bucket: R2BucketLike, links: FriendLink[]): Promise<void> {
  const body = JSON.stringify({ links }, null, 2) + '\n'
  await bucket.put(FRIENDS_KEY, body, {
    httpMetadata: {
      contentType: 'application/json; charset=utf-8',
      cacheControl: 'no-cache, no-store, must-revalidate',
    },
  })
}

export function isFriendLink(value: any): value is FriendLink {
  return Boolean(
    value &&
      typeof value.name === 'string' &&
      typeof value.url === 'string' &&
      typeof value.avatar === 'string' &&
      typeof value.description === 'string' &&
      (value.category === undefined || typeof value.category === 'string')
  )
}

/** 去重用的归一化 URL：小写主机、去掉末尾斜杠与 hash */
export function normalizeUrl(input: string): string {
  try {
    const url = new URL(input.trim())
    url.hash = ''
    const host = url.host.toLowerCase().replace(/^www\./, '')
    const path = url.pathname.replace(/\/+$/, '')
    return `${host}${path}${url.search}`.toLowerCase()
  } catch {
    return input.trim().toLowerCase()
  }
}

/* ------------------------------ HMAC token ------------------------------ */

function toBase64Url(input: string): string {
  const bytes = new TextEncoder().encode(input)
  let binary = ''
  for (const byte of bytes) binary += String.fromCharCode(byte)
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '')
}

function fromBase64Url(input: string): string {
  const normalized = input.replace(/-/g, '+').replace(/_/g, '/')
  const padded = normalized + '='.repeat((4 - (normalized.length % 4)) % 4)
  const binary = atob(padded)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i)
  return new TextDecoder().decode(bytes)
}

async function signHmac(secret: string, message: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )
  const signature = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(message))
  const bytes = new Uint8Array(signature)
  let binary = ''
  for (const byte of bytes) binary += String.fromCharCode(byte)
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '')
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false
  let diff = 0
  for (let i = 0; i < a.length; i += 1) diff |= a.charCodeAt(i) ^ b.charCodeAt(i)
  return diff === 0
}

export interface ReviewTokenPayload {
  link: FriendLink
  issuedAt: number
  expiresAt: number
}

/** 生成带 7 天有效期的 HMAC-SHA256 签名 Token */
export async function createReviewToken(secret: string, link: FriendLink): Promise<string> {
  const issuedAt = Math.floor(Date.now() / 1000)
  const payload = toBase64Url(JSON.stringify({ link, iat: issuedAt, exp: issuedAt + REVIEW_TOKEN_TTL_SECONDS }))
  const signature = await signHmac(secret, payload)
  return `${payload}.${signature}`
}

export type ReviewTokenResult =
  | { ok: true; payload: ReviewTokenPayload }
  | { ok: false; reason: 'invalid' | 'expired' }

export async function verifyReviewToken(secret: string, token: string): Promise<ReviewTokenResult> {
  const parts = (token || '').split('.')
  if (parts.length !== 2) return { ok: false, reason: 'invalid' }
  const [payloadPart, signature] = parts

  const expected = await signHmac(secret, payloadPart)
  if (!timingSafeEqual(expected, signature)) return { ok: false, reason: 'invalid' }

  let decoded: any
  try {
    decoded = JSON.parse(fromBase64Url(payloadPart))
  } catch {
    return { ok: false, reason: 'invalid' }
  }
  if (!decoded || !isFriendLink(decoded.link)) return { ok: false, reason: 'invalid' }

  const now = Math.floor(Date.now() / 1000)
  if (typeof decoded.exp !== 'number' || decoded.exp < now) return { ok: false, reason: 'expired' }

  return {
    ok: true,
    payload: { link: decoded.link, issuedAt: Number(decoded.iat) || 0, expiresAt: decoded.exp },
  }
}

/* ------------------------------ 字段校验 ------------------------------ */

export interface ApplyInput {
  name?: string
  url?: string
  avatar?: string
  description?: string
  category?: string
  website?: string
}

const MAX = { name: 40, url: 200, avatar: 300, description: 80, category: 20 } as const

function clean(value: unknown): string {
  return typeof value === 'string' ? value.trim() : ''
}

function isHttpUrl(value: string): boolean {
  try {
    const url = new URL(value)
    if (url.protocol !== 'http:' && url.protocol !== 'https:') return false
    return url.hostname.includes('.') && !url.hostname.startsWith('.')
  } catch {
    return false
  }
}

export type ApplyValidation =
  | { ok: true; link: FriendLink }
  | { ok: false; message: string }

export function validateApplyInput(input: ApplyInput): ApplyValidation {
  if (clean(input.website)) {
    // 蜜罐字段被填写：大概率是机器人
    return { ok: false, message: '提交被拒绝，请刷新页面后重试' }
  }

  const name = clean(input.name)
  if (!name) return { ok: false, message: '请填写站点名称' }
  if (name.length > MAX.name) return { ok: false, message: `站点名称不超过 ${MAX.name} 个字符` }

  const url = clean(input.url)
  if (!url) return { ok: false, message: '请填写站点网址' }
  if (url.length > MAX.url) return { ok: false, message: `站点网址不超过 ${MAX.url} 个字符` }
  if (!/^https?:\/\//i.test(url)) return { ok: false, message: '站点网址需要以 http:// 或 https:// 开头' }
  if (!isHttpUrl(url)) return { ok: false, message: '站点网址格式不正确' }

  const description = clean(input.description)
  if (!description) return { ok: false, message: '请写一句站点简介' }
  if (description.length > MAX.description) {
    return { ok: false, message: `一句话简介不超过 ${MAX.description} 个字符` }
  }

  const avatarRaw = clean(input.avatar)
  if (avatarRaw.length > MAX.avatar) return { ok: false, message: `头像链接不超过 ${MAX.avatar} 个字符` }
  if (avatarRaw && !isHttpUrl(avatarRaw)) return { ok: false, message: '头像链接格式不正确，需要是完整的 http(s) 地址' }

  const categoryRaw = clean(input.category)
  if (categoryRaw.length > MAX.category) return { ok: false, message: `分类不超过 ${MAX.category} 个字符` }

  const link: FriendLink = {
    name,
    url,
    avatar: avatarRaw || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`,
    description,
  }
  if (categoryRaw) link.category = categoryRaw
  return { ok: true, link }
}
