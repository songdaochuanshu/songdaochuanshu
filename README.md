# songdaochuanshu Blog

基于 Nuxt 3 + Cloudflare R2 的现代化博客系统，采用 SSR 架构渲染 Markdown 文章。

## 核心功能

- **SSR 渲染** — Nuxt 3 服务端渲染，SEO 友好
- **R2 存储** — 文章托管于 Cloudflare R2，零流量费用
- **Markdown 驱动** — 通过 `manifest.json` 管理文章索引
- **分类浏览** — 支持 blog / life / record 等多分类筛选
- **响应式设计** — Tailwind CSS 构建的自适应界面

## 技术栈

- [Nuxt 3](https://nuxt.com/) — Vue.js 全栈框架
- [Cloudflare R2](https://developers.cloudflare.com/r2/) — 对象存储
- [Tailwind CSS 4](https://tailwindcss.com/) — CSS 框架
- [TypeScript](https://www.typescriptlang.org/) — 类型安全

## 本地开发

```bash
pnpm install
cp .env.example .env
# 编辑 .env 填入你的 R2 配置
pnpm dev
```

访问 `http://localhost:3000`

## 部署

构建命令：`pnpm build`
输出目录：`.output/server`

支持部署到 Cloudflare Pages、Vercel、Node 服务器等平台。

## License

MIT
