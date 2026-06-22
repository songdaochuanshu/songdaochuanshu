# 项目上下文

## 项目简介

基于 Nuxt 4 + Cloudflare R2 的个人博客，作者"松岛川树"。文章以 Markdown 存储于 R2，通过 `manifest.json` 管理索引，SSR 渲染。

## 技术栈

- Nuxt 4 + Vue 3（SSR）
- Tailwind CSS 4（PostCSS 集成）
- Cloudflare R2（文章存储，CDN：`https://blog-static.openserve.cloud`）
- `gray-matter` + `marked`（Markdown 解析）
- pnpm 包管理

## 项目进度

### 已完成
- Nuxt 4 基础框架搭建，Tailwind CSS 4 配置
- 首页（`pages/index.vue`）：Hero 区域、分类筛选、文章卡片网格、分页（URL query 驱动）
- 文章详情页（`pages/posts/[...slug].vue`）：支持嵌套路径、Markdown 渲染
- 关于我页面（`pages/me.vue`）：从 R2 加载 `me.md` 渲染
- 服务端工具（`server/utils/blog.ts`）：`fetchManifest`、`fetchPost`
- API 路由：`/api/manifest`（支持分类筛选）、`/api/posts.list`

### 待完成
- 搜索功能
- 标签页 / 归档页
- 深色模式
- SEO meta 优化

## 重要约定

1. **每次推送前更新本文件**：同步最新进度、新增约定、重要变更。
2. **每次提交后直接推送**：`git commit` 完成后立即执行 `git push`，不积压本地提交。
3. 文章数据只读，不在代码仓库中存储 Markdown 文章内容，统一由 R2 托管。
4. 路由命名：博客文章统一挂载在 `/posts/` 前缀下；特殊页面（layout: page）使用 `post.path` 直接路由。
5. 分页和分类筛选状态通过 URL query 参数（`page`、`category`）持久化，不使用组件内 state。
