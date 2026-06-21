// 类型声明文件
declare global {
  interface Post {
    slug: string
    title: string
    date: string
    tags: string[]
    excerpt: string
    content: string
  }
}

export {}
