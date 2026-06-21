// 本地开发用的示例文章数据
export const samplePosts = [
  {
    slug: 'welcome',
    title: '欢迎使用 Nuxt R2 博客',
    date: '2025-06-21',
    tags: ['Nuxt', 'Cloudflare', 'R2', '博客'],
    excerpt: '这是一个使用 Nuxt 3 和 Cloudflare R2 构建的现代化博客系统的欢迎文章。',
    content: `# 欢迎使用 Nuxt R2 博客

你好！欢迎来到我的博客系统。这个博客使用以下技术栈构建：

## 技术栈

- **Nuxt 3** - Vue.js 全栈框架，支持 SSR
- **Cloudflare R2** - 对象存储，无 egress 费用
- **Tailwind CSS** - 实用优先的 CSS 框架
- **TypeScript** - 类型安全的开发体验

## 特性

✅ SSR 渲染，SEO 友好  
✅ 从 R2 动态加载 Markdown 文章  
✅ 响应式设计，支持深色模式  
✅ 标签系统和搜索功能  
✅ 快速的页面加载速度  

## 如何开始

1. 在 Cloudflare 创建 R2 bucket
2. 配置环境变量
3. 上传 Markdown 文章到 \`posts/\` 目录
4. 部署到 Cloudflare Pages 或其他支持 Node.js 的平台`,
    html: '<h1>欢迎使用 Nuxt R2 博客</h1><p>你好！欢迎来到我的博客系统。这个博客使用以下技术栈构建：</p><h2>技术栈</h2><ul><li><strong>Nuxt 3</strong> - Vue.js 全栈框架，支持 SSR</li><li><strong>Cloudflare R2</strong> - 对象存储，无 egress 费用</li><li><strong>Tailwind CSS</strong> - 实用优先的 CSS 框架</li><li><strong>TypeScript</strong> - 类型安全的开发体验</li></ul>'
  },
  {
    slug: 'nuxt-tutorial',
    title: 'Nuxt 3 入门教程',
    date: '2025-06-20',
    tags: ['Nuxt', 'Vue', '教程'],
    excerpt: '学习如何使用 Nuxt 3 构建现代化的 Vue.js 应用程序。',
    content: '# Nuxt 3 入门教程\n\nNuxt 3 是一个基于 Vue.js 的通用应用框架。\n\n## 特性\n\n- 自动化路由\n- 服务端渲染 (SSR)\n- 静态站点生成 (SSG)\n- 热模块替换 (HMR)\n- TypeScript 支持',
    html: '<h1>Nuxt 3 入门教程</h1><p>Nuxt 3 是一个基于 Vue.js 的通用应用框架。</p>'
  }
]
