# 项目上下文摘要

## 项目简介
这是一个基于 **Nuxt 4 + Cloudflare R2** 的个人博客项目，作者为 **松岛川树**。文章以 Markdown 格式存储于 Cloudflare R2 对象存储中，通过 `manifest.json` 文件管理索引，并使用 Nuxt 4 的 SSR（服务端渲染）模式进行渲染。

## 技术栈
- **前端框架**：Nuxt 4 + Vue 3 (SSR)
- **样式**：Tailwind CSS 4 (PostCSS 集成)
- **存储与CDN**：Cloudflare R2 (文章存储，CDN域名：`https://blog-static.openserve.cloud`)
- **图片CDN**：`https://img-homepage.openserve.cloud`（R2 桶 `homepage-bg`，独立图片管理仓库 `cloudflare-assets`）
- **内容解析**：`gray-matter` + `marked` (Markdown 解析)
- **包管理**：pnpm

## 图片架构

### R2 桶结构（homepage-bg）
```
├── r18/              # R18 插画（博客不使用）
├── normal/           # 普通插画（博客展示用）
└── images-info.json  # 元数据，按分类组织
```

### images-info.json 结构
```json
{
  "r18": [{ "pid": 123, "url": "...", ... }],
  "normal": [{ "pid": 456, "url": "...", ... }]
}
```

### 博客侧使用
- `composables/useRandomImages.ts` — 从 `images-info.json` 读取 `data.normal`，随机选取 Hero 和背景图
- `components/BackgroundCanvas.vue` — 背景图硬编码 `normal/104001051.jpg`
- `pages/index.vue` — OG 图片使用 `normal/100064089.png`

### 图片来源
- 由 `cloudflare-assets` 仓库的爬虫自动管理
- Lolicon API `r18=0` 的图片存入 `normal/`
- Lolicon API `r18=1` 的图片存入 `r18/`（博客不展示）

## 项目进度概览
项目已完成功能开发、视觉改版和多项内容体验功能的迭代。

### 已完成功能
1.  **基础框架与页面**：
    - Nuxt 4 基础框架搭建，Tailwind CSS 4 配置。
    - 首页 (`pages/index.vue`)：包含 Hero 区域、分类筛选、文章卡片网格、分页（URL query 驱动）。
    - 文章详情页 (`pages/posts/[...slug].vue`)：支持嵌套路径、Markdown 渲染。
    - 关于我页面 (`pages/me.vue`)：从 R2 加载 `me.md` 渲染。
    - 服务端工具 (`server/utils/blog.ts`)：`fetchManifest`、`fetchPost`。
    - API 路由：`/api/manifest`（支持分类筛选）、`/api/posts.list`。

2.  **视觉风格迭代**：
    - **初始设计**：暖奶油色背景 + 深墨色 Hero + 朱砂红主色。
    - **二次元风格改版 (2026-06-22)**：全站粉紫蓝渐变背景，添加浮动圆圈、闪烁星星等装饰元素，卡片、按钮等组件采用圆角、渐变、阴影等设计。
    - **简洁风格 + 二次元插画背景 (2026-06-23)**：去除花哨装饰，改为白底简洁风格。Hero 区域和全页使用 R2 二次元插画作为背景图（透明度 12%），通过 `public/site.json` 配置图片。
    - **插画淡入优化 (2026-06-23)**：新增图片预加载函数，页面统一 700ms opacity 过渡淡入，文章详情页卡片背景改为半透明模糊效果。

3.  **内容体验功能 (2026-06-23)**：
    - **搜索功能**：首页导航栏搜索框，支持按标题/描述/分类/标签过滤。
    - **文章目录 TOC**：详情页左侧固定侧边栏，解析 h2/h3 生成锚点导航，滚动自动高亮。
    - **阅读时间估算**：卡片显示估算时间，详情页 header 显示精确时间。
    - **标签系统**：卡片展示最多 3 个标签，详情页展示全部。

4.  **全功能完善 (2026-06-24)**：
    - 回到顶部按钮、阅读进度条、暗色模式、归档页、相关文章推荐
    - 自定义 404 页、页面切换动画、RSS 订阅、文章封面图、导航完善

5.  **批量功能开发 (2026-06-24)**：
    - 代码块复制按钮、上下篇导航、SEO 增强、Giscus 评论、站点地图
    - 分类/标签聚合页、图片灯箱、分享按钮、PWA、访问量统计、打赏按钮
    - 代码高亮、移动端 TOC、骨架屏、图片懒加载、键盘快捷键
    - 字体调节、锚点链接、热门文章、阅读历史、草稿预览、CDN 优化、错误重试

6.  **图片架构升级 (2026-06-28)**：
    - 图片 URL 从根目录迁移到 `normal/` 前缀
    - `images-info.json` 改为 `{ "r18": [...], "normal": [...] }` 分类结构
    - 博客只使用 `normal` 分类的图片，不展示 R18 内容
    - 背景图、OG 图、随机插画全部指向 `normal/` 路径

### 待完成
详见 `PROGRESS.md` 文件（功能规划总览 + 进度追踪）。

## 重要约定
1.  **文件同步**：每次推送前必须更新 `context.md` 和 `PROGRESS.md`，同步最新进度、新增约定、重要变更。
2.  **即时推送**：每次 `git commit` 完成后立即执行 `git push`，不积压本地提交。
3.  **数据分离**：文章数据只读，不在代码仓库中存储 Markdown 文章内容，统一由 R2 托管。
4.  **路由规则**：博客文章统一挂载在 `/posts/` 前缀下；特殊页面（layout: page）使用 `post.path` 直接路由。
5.  **状态管理**：分页和分类筛选状态通过 URL query 参数（`page`、`category`）持久化，不使用组件内 state。
6.  **图片规范**：博客只展示 `normal/` 分类的图片，R18 内容不进入博客前端。
