# songdaochuanshu Blog

基于 Nuxt 4 + Cloudflare R2 的现代化博客系统，采用 SSR 架构渲染 Markdown 文章。

## 核心功能

- **SSR 渲染** — Nuxt 4 服务端渲染，SEO 友好
- **R2 存储** — 文章托管于 Cloudflare R2，零流量费用
- **Markdown 驱动** — 通过 `manifest.json` 管理文章索引
- **分类浏览** — 支持 blog / life / record / root 等多分类筛选
- **响应式设计** — Tailwind CSS 4 构建的自适应界面

## UI 设计方案

### 桌面端（≥768px）
- 顶部 Hero 区域：渐变背景 + 标题 + 简介
- 粘性分类筛选栏：水平滚动胶囊按钮
- 文章网格：3 列紧凑卡片布局（桌面）/ 2 列（平板）
- 圆角卡片 + 柔和边框 + hover 上浮动画
- 底部分页器：箭头 + 页码按钮
- 简洁白色背景，现代技术博客风格

## 技术栈

- [Nuxt 4](https://nuxt.com/) — Vue.js 全栈框架
- [Cloudflare R2](https://developers.cloudflare.com/r2/) — 对象存储
- [Tailwind CSS 4](https://tailwindcss.com/) — CSS 框架（原生 PostCSS 集成）
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
