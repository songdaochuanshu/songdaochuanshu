# Nuxt 3 + Cloudflare R2 博客系统 📝

一个使用 Nuxt 3 和 Cloudflare R2 构建的现代化博客系统，支持 SSR 渲染 Markdown 文章。

## ✨ 特性

- 🚀 **Nuxt 3 SSR** - 快速的首屏加载和 SEO 优化
- ☁️ **Cloudflare R2** - 零 egress 费用的对象存储
- 🎨 **Tailwind CSS** - 现代响应式设计
- 🌓 **深色模式** - 自动适配系统主题
- 📝 **Markdown 支持** - 简单的文章管理
- 🏷️ **标签系统** - 文章分类和搜索
- 🔍 **全文搜索** - 客户端即时搜索

## 🛠️ 技术栈

- [Nuxt 3](https://nuxt.com/) - Vue.js 全栈框架
- [Cloudflare R2](https://developers.cloudflare.com/r2/) - 对象存储
- [Tailwind CSS](https://tailwindcss.com/) - CSS 框架
- [TypeScript](https://www.typescriptlang.org/) - 类型安全
- [gray-matter](https://github.com/jonschlinkert/gray-matter) - YAML frontmatter 解析
- [marked](https://marked.js.org/) - Markdown 渲染

## 📦 安装

```bash
# 安装依赖
pnpm install

# 创建 .env 文件
cp .env.example .env
```

## 🔧 配置

编辑 `.env` 文件：

```env
# R2 配置
R2_ACCOUNT_ID=d6397095e8c56098875c9b44f03fa970
R2_BUCKET_NAME=songdaochuanshu-static
R2_PUBLIC_URL=https://pub-ba3e6b3710404683b4c408cab6dc42a2.r2.dev

# Cloudflare Tokens
CLOUDFLARE_WRITE_TOKEN=cfat_M2G7nglcQK6o7AZUTS16CHxbbSJAHbgKRL0gJhi7d94e7602
CLOUDFLARE_READ_TOKEN=cfat_FUsHENbGIkUqfQxX8XQs88L9R6C6fA1D4RwAVZNod29fd22e
```

## 🚀 开发

```bash
# 启动开发服务器
pnpm dev

# 访问 http://localhost:3000
```

## 📝 添加文章

1. 在 R2 的 `blog/`、`life/`、`record/` 目录上传 Markdown 文件
2. 使用 YAML frontmatter 定义元数据：

```markdown
---
title: "文章标题"
date: "2025-06-21"
tags: ["标签1", "标签2"]
excerpt: "文章摘要"
---

# 文章内容

这里是你的 Markdown 内容...
```

## 🏗️ 构建和部署

```bash
# 构建生产版本
pnpm build

# 预览生产版本
pnpm preview
```

### 部署到 Cloudflare Pages

1. 连接你的 Git 仓库
2. 构建命令：`pnpm build`
3. 输出目录：`.output/server`
4. 添加环境变量

### 部署到其他平台

也可以部署到 Vercel、Netlify 等支持 Node.js 的平台。

## 📁 项目结构

```
r2-blog/
├── assets/           # 静态资源
├── components/       # Vue 组件
├── composables/      # 组合式函数
│   ├── useR2.ts      # R2 客户端
│   └── useMarkdown.ts # Markdown 解析
├── data/            # 示例数据
├── pages/           # 页面路由
│   ├── index.vue    # 首页
│   └── posts/       # 文章相关
│       ├── [slug].vue # 文章详情
│       └── index.vue  # 文章列表
├── public/          # 公共静态文件
├── server/          # 服务器端代码
│   └── api/         # API 路由
├── types/           # TypeScript 类型
├── .env             # 环境变量
├── nuxt.config.ts   # Nuxt 配置
└── package.json     # 项目依赖
```

## 🔐 安全提示

- 永远不要将 `.env` 文件提交到版本控制
- 使用 Cloudflare Workers 环境变量存储敏感信息
- 定期轮换 API tokens

## 📄 License

MIT
