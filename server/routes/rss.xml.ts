const BASE_URL = 'https://blog-static.openserve.cloud'
const SITE_URL = 'https://songdaochuanshu.pages.dev'

export default defineEventHandler(async (event) => {
  try {
    const manifest = await $fetch<{ posts: any[] }>(`${BASE_URL}/manifest.json`)

    const items = (manifest.posts || [])
      .filter((p: any) => p.layout !== 'page')
      .sort((a: any, b: any) => {
        const da = a.date ? new Date(a.date).getTime() : 0
        const db = b.date ? new Date(b.date).getTime() : 0
        return db - da
      })
      .map((p: any) => {
        const link = `${SITE_URL}/posts/${p.key}`
        const pubDate = p.date ? new Date(p.date).toUTCString() : new Date().toUTCString()
        const desc = p.description || ''
        return `    <item>
      <title><![CDATA[${p.title || p.key}]]></title>
      <link>${link}</link>
      <guid>${link}</guid>
      <pubDate>${pubDate}</pubDate>
      <category>${p.category || ''}</category>
      <description><![CDATA[${desc}]]></description>
    </item>`
      })
      .join('\n')

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>松岛川树</title>
    <link>${SITE_URL}</link>
    <description>记录技术思考与生活感悟</description>
    <language>zh-CN</language>
${items}
  </channel>
</rss>`

    setHeader(event, 'content-type', 'application/xml; charset=utf-8')
    setHeader(event, 'cache-control', 'public, max-age=3600')
    return xml
  } catch (e) {
    setResponseStatus(event, 500)
    return '<?xml version="1.0" encoding="UTF-8"?><error>Failed to generate RSS feed</error>'
  }
})
