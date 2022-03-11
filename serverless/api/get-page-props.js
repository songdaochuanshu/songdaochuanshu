/*
 * @Descripttion: 
 * @version: 
 * @Author: MiKin
 * @Date: 2022-03-08 19:00:36
 * @LastEditors: MiKin
 * @LastEditTime: 2022-03-11 14:41:37
 * @FilePath: \songdaochuanshu\serverless\api\get-page-props.ts
 */
export default (req, res) => {
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
