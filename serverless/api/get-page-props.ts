/*
 * @Descripttion: 
 * @version: 
 * @Author: MiKin
 * @Date: 2022-03-08 19:00:36
 * @LastEditors: MiKin
 * @LastEditTime: 2022-03-09 20:26:32
 * @FilePath: \vite-blog\serverless\api\get-page-props.ts
 */
import type { IncomingMessage, ServerResponse } from 'http'
export default (req: IncomingMessage, res: ServerResponse) => {
  const url = new URL('http://e.g' + req.url)
  console.log('-- getPageProps', url.searchParams.toString())

  const routeName = url.searchParams.get('name') || ''

  res.setHeader(
    'Cache-Control',
    'max-age=0, s-maxage=86400, stale-while-revalidate'
  )

  res.end(
    JSON.stringify({
      server: true,
      message: `This is page "${routeName.toUpperCase()}"`,
    })
  )
}
