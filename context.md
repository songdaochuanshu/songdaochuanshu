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

### 已完成（续）
- 全站个性化视觉重设计：暖奶油色背景（#f7f4ef）+ 深墨色 Hero（#1c1917）+ 朱砂红主色（#c2410c）
- 三个页面（index、posts/[...slug]、me）视觉风格统一
- 文章卡片新增"阅读全文"箭头提示、hover 朱砂红阴影
- 文章详情页 prose 样式重写，blockquote 加朱砂左边框、代码块深色背景

### 二次元风格改版（2026-06-22）
- 全站背景改为粉紫蓝渐变色（from-pink-50 via-purple-50 to-blue-50）
- 添加装饰性浮动背景元素（彩色圆圈、闪烁星星、CSS动画）
- Hero区域改为粉紫渐变背景（from-pink-400 via-purple-400 to-indigo-400）
- 分类按钮改为圆角胶囊设计，选中时粉紫渐变+阴影效果
- 文章卡片：圆角2xl、粉色边框、hover时上浮+轻微旋转+紫色阴影
- 文章卡片右上角添加渐变装饰圆角
- 标题文字hover时渐变色效果（粉到紫）
- 分类标签改为渐变色背景
- 分页器按钮改为圆形设计，粉紫配色
- 页脚改为粉紫蓝渐变背景
- 添加CSS动画：float（浮动）、twinkle（闪烁）

### 简洁风格 + 二次元插画背景（2026-06-23）
- 去除所有粉紫渐变、浮动圆圈、闪烁星星等花哨装饰
- 全站改为白底简洁风格，干净的卡片和按钮
- Hero 区域使用 R2 二次元插画作为背景图
- 全页使用淡雅插画作为底图（opacity 6%，不干扰阅读）
- 插画图片来源：`img-homepage.openserve.cloud` R2 桶
- 站点配置文件 `public/site.json`，可切换 heroImage 和 bgImage
- 分类按钮改为极简风格：灰色文字，选中时黑底白字
- 文章卡片：白色底、细边框、hover 时微上浮+阴影
- 页脚简化，去掉渐变背景

### 插画淡入优化（2026-06-23）
- `composables/useRandomImages.ts` 新增 `preloadImage()` 预加载函数
- 图片下载完成后才标记 `bgReady` / `heroReady`，避免半加载状态
- 三个页面（index、posts、me）统一 700ms opacity 过渡淡入
- 文章详情页卡片背景改为 `bg-white/70 backdrop-blur-sm`，插画可透视
- 插画透明度从 6% 提升到 12%

### 待完成
- 详见 `PROGRESS.md`（功能规划总览 + 进度追踪）

## 重要约定

1. **每次推送前更新本文件（context.md）和 PROGRESS.md**：同步最新进度、新增约定、重要变更。
2. **每次提交后直接推送**：`git commit` 完成后立即执行 `git push`，不积压本地提交。
3. 文章数据只读，不在代码仓库中存储 Markdown 文章内容，统一由 R2 托管。
4. 路由命名：博客文章统一挂载在 `/posts/` 前缀下；特殊页面（layout: page）使用 `post.path` 直接路由。
5. 分页和分类筛选状态通过 URL query 参数（`page`、`category`）持久化，不使用组件内 state。
