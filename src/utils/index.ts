/*
 * @Descripttion: 
 * @version: 
 * @Author: MiKin
 * @Date: 2022-03-09 16:05:03
 * @LastEditors: MiKin
 * @LastEditTime: 2022-03-09 16:42:18
 * @FilePath: \vite-blog\src\utils\index.ts
 */
import dayjs from 'dayjs'

export function formatDate(d: string | Date) {
    const date = dayjs(d)
    if (date.year() === dayjs().year())
        return date.format('YYYY-MM-D')
    return date.format('YYYY-MM-D')
}
