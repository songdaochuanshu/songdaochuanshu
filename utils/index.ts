import { format, parseISO } from 'date-fns'

export function formattedDate(date: string) {
  if (!date) return ''
  try {
    const dateObject = parseISO(date)
    return format(dateObject, 'yyyy/MM/dd')
  } catch {
    return ''
  }
}

export function insertYearToPosts(posts: any[]) {
  let currentYear = -1
  return posts.reduce(
    (acc: any[], post: any) => {
      if (!post.date) {
        acc.push(post)
        return acc
      }
      const year = new Date(post.date).getFullYear()
      if (year !== currentYear && !isNaN(year)) {
        acc.push({ isMarked: true, year })
        currentYear = year
      }
      acc.push(post)
      return acc
    },
    [],
  )
}

// 旧的 queryContent-based 函数已移除，新版本见 utils/r2.ts