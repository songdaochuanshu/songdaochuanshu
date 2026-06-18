import { getManifest, getR2Base } from '~/utils/r2'

export default defineEventHandler(async (event) => {
  const manifest = await getManifest()
  const base = getR2Base()
  const siteUrl = getRequestURL(event).origin

  const items = manifest.posts
    .slice(0, 50) // RSS 只取最新 50 篇
    .map((p) => {
      const url = `${siteUrl}${p.path}`
      const pubDate = p.date ? new Date(p.date).toUTCString() : new Date().toUTCString()
      return `    <item>
      <title><![CDATA[${p.title}]]></title>
      <link>${url}</link>
      <guid>${url}</guid>
      <pubDate>${pubDate}</pubDate>
      ${p.description ? `<description><![CDATA[${p.description}]]></description>` : ''}
      ${(p.tags || []).map((t) => `<category>${t}</category>`).join('\n      ')}
    </item>`
    })
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Songdaochuanshu Blog</title>
    <link>${siteUrl}</link>
    <description>Latest posts from songdaochuanshu's blog</description>
    <language>zh-CN</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>`

  setHeader(event, 'Content-Type', 'application/xml; charset=utf-8')
  return xml
})