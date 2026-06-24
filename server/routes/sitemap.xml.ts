export default defineEventHandler(async (event) => {
  const BASE_URL = 'https://blog-static.openserve.cloud'
  const SITE = 'https://songdaochuanshu.dev'

  let posts: any[] = []
  try {
    const manifest = await $fetch<any>(`${BASE_URL}/manifest.json`)
    posts = manifest.posts || []
  } catch {}

  const urls = [
    { loc: SITE, priority: '1.0', changefreq: 'daily' },
    { loc: `${SITE}/archive`, priority: '0.6', changefreq: 'weekly' },
    { loc: `${SITE}/me`, priority: '0.5', changefreq: 'monthly' },
    ...posts
      .filter((p: any) => p.layout !== 'page')
      .map((p: any) => ({
        loc: `${SITE}/posts/${p.key}`,
        lastmod: p.date || undefined,
        priority: '0.8',
        changefreq: 'monthly'
      }))
  ]

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url>
    <loc>${u.loc}</loc>${u.lastmod ? `\n    <lastmod>${u.lastmod}</lastmod>` : ''}
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>`

  setResponseHeader(event, 'Content-Type', 'application/xml')
  return xml
})
