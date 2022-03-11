/*
 * @Descripttion:
 * @version:
 * @Author: MiKin
 * @Date: 2022-03-09 20:18:49
 * @LastEditors: MiKin
 * @LastEditTime: 2022-03-10 15:53:46
 * @FilePath: \vite-blog\serverless\api\posts.ts
 */
import type { IncomingMessage, ServerResponse } from 'http'
export default (req: IncomingMessage, res: ServerResponse) => {
  console.log('test')


  res.end(
    JSON.stringify({
      server: true,
    })
  )
}
