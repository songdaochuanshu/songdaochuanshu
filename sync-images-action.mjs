// 同步 homepage-bg 图片索引；凭据仅从环境变量读取，不输出凭据。
import crypto from 'crypto'
import { mkdirSync, writeFileSync } from 'fs'

const accountId = process.env.R2_ACCOUNT_ID
const accessKeyId = process.env.R2_ACCESS_KEY_ID
const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY
const bucketName = process.env.R2_IMAGES_BUCKET
const cdnBase = 'https://img-homepage.openserve.cloud'
const imageExtensions = new Set(['.jpg', '.jpeg', '.png', '.gif', '.webp'])
const emptyPayloadHash = 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'

if (bucketName !== 'homepage-bg') {
  console.log('Skipping image sync: R2_IMAGES_BUCKET is not explicitly set to homepage-bg.')
  process.exit(0)
}
for (const [name, value] of Object.entries({ R2_ACCOUNT_ID: accountId, R2_ACCESS_KEY_ID: accessKeyId, R2_SECRET_ACCESS_KEY: secretAccessKey })) {
  if (!value) throw new Error(`${name} is required when syncing homepage-bg`)
}

const host = `${bucketName}.${accountId}.r2.cloudflarestorage.com`
function formatDate(date) { return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '') }
function signingKey(key, dateStamp) {
  const date = crypto.createHmac('sha256', `AWS4${key}`).update(dateStamp).digest()
  const region = crypto.createHmac('sha256', date).update('auto').digest()
  const service = crypto.createHmac('sha256', region).update('s3').digest()
  return crypto.createHmac('sha256', service).update('aws4_request').digest()
}
function authorization(method, uri, query, payloadHash, date) {
  const amzDate = formatDate(date)
  const dateStamp = amzDate.slice(0, 8)
  const canonicalHeaders = `host:${host}\nx-amz-content-sha256:${payloadHash}\nx-amz-date:${amzDate}\n`
  const signedHeaders = 'host;x-amz-content-sha256;x-amz-date'
  const canonical = `${method}\n${uri}\n${query}\n${canonicalHeaders}\n${signedHeaders}\n${payloadHash}`
  const scope = `${dateStamp}/auto/s3/aws4_request`
  const hashed = crypto.createHash('sha256').update(canonical).digest('hex')
  const stringToSign = `AWS4-HMAC-SHA256\n${amzDate}\n${scope}\n${hashed}`
  const signature = crypto.createHmac('sha256', signingKey(secretAccessKey, dateStamp)).update(stringToSign).digest('hex')
  return { amzDate, authorization: `AWS4-HMAC-SHA256 Credential=${accessKeyId}/${scope}, SignedHeaders=${signedHeaders}, Signature=${signature}` }
}
function parseObjects(xml) {
  return [...xml.matchAll(/<Contents>([\s\S]*?)<\/Contents>/g)].flatMap(([, block]) => {
    const key = block.match(/<Key>([^<]+)<\/Key>/)?.[1]
    if (!key) return []
    return [{ key, size: Number(block.match(/<Size>(\d+)<\/Size>/)?.[1] || 0) }]
  })
}
async function listAllObjects() {
  const objects = []
  let marker = ''
  while (true) {
    const query = `list-type=2&max-keys=1000${marker ? `&continuation-token=${encodeURIComponent(marker)}` : ''}`
    const date = new Date()
    const { amzDate, authorization: auth } = authorization('GET', '/', query, emptyPayloadHash, date)
    const response = await fetch(`https://${host}/?${query}`, { headers: { Authorization: auth, 'x-amz-content-sha256': emptyPayloadHash, 'x-amz-date': amzDate } })
    if (!response.ok) throw new Error(`R2 list failed: ${response.status}`)
    const xml = await response.text()
    objects.push(...parseObjects(xml))
    if (!xml.includes('<IsTruncated>true</IsTruncated>')) return objects
    marker = xml.match(/<NextContinuationToken>([^<]+)<\/NextContinuationToken>/)?.[1] || ''
    if (!marker) return objects
  }
}
async function uploadToR2(key, body) {
  const payloadHash = crypto.createHash('sha256').update(body).digest('hex')
  const { amzDate, authorization: auth } = authorization('PUT', `/${key}`, '', payloadHash, new Date())
  const response = await fetch(`https://${host}/${key}`, { method: 'PUT', headers: { Authorization: auth, 'x-amz-content-sha256': payloadHash, 'x-amz-date': amzDate, 'Content-Type': 'application/json' }, body })
  if (!response.ok) throw new Error(`R2 upload failed: ${response.status}`)
}

async function main() {
  const allObjects = await listAllObjects()
  const imageFiles = allObjects.filter(({ key }) => imageExtensions.has(`.${key.toLowerCase().split('.').pop()}`))
  if (!imageFiles.length) {
    console.log('Skipping image sync: R2 image list is empty; existing index was not changed.')
    return
  }
  const data = { r18: [], normal: [] }
  for (const object of imageFiles) {
    const category = object.key.toLowerCase().startsWith('r18/') ? 'r18' : 'normal'
    data[category].push({ filename: object.key.split('/').pop(), url: `${cdnBase}/${object.key}`, size_kb: Math.round(object.size / 1024) })
  }
  const json = JSON.stringify(data, null, 2)
  await uploadToR2('images-info.json', json)
  mkdirSync('public', { recursive: true })
  writeFileSync('public/images-info.json', `${json}\n`)
  console.log(`Synced ${imageFiles.length} images.`)
}
main().catch((error) => { console.error(error instanceof Error ? error.message : 'Image sync failed'); process.exitCode = 1 })
