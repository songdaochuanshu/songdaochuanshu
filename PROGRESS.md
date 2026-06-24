# 松岛川树 - 项目进度

## 📌 约定

1. **每次推送代码时,必须同步更新本文件**(PROGRESS.md)
   - 已完成的功能 → 移到「已完成功能」并打勾
   - 进行中的功能 → 更新状态为 🔄 进行中
   - 新增/调整的功能 → 补充到对应分类
2. commit message 中涉及功能变更的,关联 PROGRESS.md 中的条目

---

## 📋 功能规划总览

| 分类 | 功能 | 状态 | 优先级 |
|------|------|------|--------|
| 内容体验 | 搜索功能 | ✅ 已完成 | ⭐⭐⭐ |
| 内容体验 | 文章目录 (TOC) | ✅ 已完成 | ⭐⭐⭐ |
| 内容体验 | 阅读时间估算 | ✅ 已完成 | ⭐⭐ |
| 内容体验 | 标签系统 | ✅ 已完成 | ⭐⭐ |
| 交互体验 | 回到顶部按钮 | ✅ 已完成 | ⭐⭐⭐ |
| 交互体验 | 阅读进度条 | ✅ 已完成 | ⭐⭐⭐ |
| 交互体验 | 暗色模式 | ✅ 已完成 | ⭐⭐ |
| 交互体验 | 页面切换动画 | ✅ 已完成 | ⭐ |
| 内容发现 | 归档页 | ✅ 已完成 | ⭐⭐ |
| 内容发现 | 相关文章推荐 | ✅ 已完成 | ⭐⭐ |
| 内容发现 | RSS 订阅 | ✅ 已完成 | ⭐ |
| 完善度 | 自定义 404 页 | ✅ 已完成 | ⭐⭐ |
| 完善度 | 文章封面图 | ✅ 已完成 | ⭐ |
| 互动 | 评论系统 (Giscus) | ✅ 已完成 | ⭐⭐⭐ |
| 内容体验 | 上一篇/下一篇导航 | ✅ 已完成 | ⭐⭐⭐ |
| 完善度 | SEO 增强 (OG + JSON-LD) | ✅ 已完成 | ⭐⭐⭐ |
| 完善度 | 站点地图 (sitemap.xml) | ✅ 已完成 | ⭐⭐ |
| 内容发现 | 分类/标签聚合页 | ✅ 已完成 | ⭐⭐ |
| 内容体验 | 文章系列/合集 | ✅ 已完成 | ⭐⭐ |
| 交互体验 | 代码块复制按钮 | ✅ 已完成 | ⭐⭐⭐ |
| 交互体验 | 图片灯箱 (medium-zoom) | ✅ 已完成 | ⭐⭐ |
| 互动 | 分享按钮 | ✅ 已完成 | ⭐⭐ |
| 完善度 | PWA 支持 | ✅ 已完成 | ⭐ |
| 互动 | 访问量统计 | ✅ 已完成 | ⭐ |
| 互动 | 赞赏/打赏按钮 | ✅ 已完成 | ⭐ |

---

## 📝 功能详情

### 🔍 搜索功能 ✅
- **目标**：支持按标题、描述、正文内容搜索文章
- **方案**：前端本地搜索，基于 manifest.json 的元数据 + 可选的全文索引
- **涉及文件**：`pages/index.vue` 导航栏添加搜索输入框，支持按标题/描述/分类/标签搜索，搜索时自动重置分页

### 📑 文章目录 (TOC) ✅
- **目标**：详情页自动生成 h2/h3 锚点导航，长文章快速跳转
- **方案**：解析渲染后的 HTML 提取标题，生成侧边或顶部目录
- **涉及文件**：`pages/posts/[...slug].vue` 左侧固定侧边栏，滚动时自动高亮当前章节，仅桌面端显示

### ⏱ 阅读时间估算 ✅
- **目标**：文章卡片和详情页显示预估阅读时间（如"约 5 分钟"）
- **方案**：基于正文字符数 / 平均阅读速度（~500字/分钟）
- **涉及文件**：`pages/index.vue` 卡片显示估算时间，`pages/posts/[...slug].vue` header 显示精确时间

### 🏷 标签系统 ✅
- **目标**：展示文章标签，支持按标签筛选
- **方案**：manifest 中已有 tags 字段，卡片展示最多 3 个标签，详情页展示全部标签
- **涉及文件**：`pages/index.vue` 卡片底部标签，`pages/posts/[...slug].vue` header 标签区域

### ⬆ 回到顶部按钮 ✅
- **目标**：滚动超过一屏后显示，点击平滑回顶
- **方案**：全局组件 `components/BackToTop.vue`，监听 scroll 事件，fixed 定位按钮 + 过渡动画
- **涉及文件**：`components/BackToTop.vue`，所有页面引入

### 📊 阅读进度条 ✅
- **目标**：详情页顶部细条，实时显示阅读进度百分比
- **方案**：监听滚动计算 `(scrollTop) / (scrollHeight - clientHeight)`，fixed 顶部进度条
- **涉及文件**：`pages/posts/[...slug].vue`

### 🌙 暗色模式 ✅
- **目标**：支持跟随系统偏好 + 手动切换
- **方案**：Tailwind CSS 4 `@custom-variant dark` + localStorage 持久化偏好，`composables/useDarkMode.ts` 管理状态，`components/ThemeToggle.vue` 切换按钮
- **涉及文件**：`assets/css/main.css`，`composables/useDarkMode.ts`，`components/ThemeToggle.vue`，所有页面 dark: class 适配

### 🎭 页面切换动画 ✅
- **目标**：路由切换时有淡入淡出过渡
- **方案**：Nuxt 的 `pageTransition` 配合 CSS transition
- **涉及文件**：`nuxt.config.ts`，`assets/css/main.css`

### 📦 归档页 ✅
- **目标**：按年月时间线展示所有文章
- **方案**：新增 `/archive` 路由，按日期分组渲染
- **涉及文件**：`pages/archive.vue`

### 🔗 相关文章推荐 ✅
- **目标**：详情页底部推荐 2 篇同分类/标签的文章
- **方案**：基于 category + tags 计算相似度，取 top 2
- **涉及文件**：`pages/posts/[...slug].vue`

### 📡 RSS 订阅 ✅
- **目标**：生成标准 RSS 2.0 feed
- **方案**：Nuxt 服务端路由动态生成 XML
- **涉及文件**：`server/routes/rss.xml.ts`

### 🚫 自定义 404 页 ✅
- **目标**：访问不存在的路径时展示友好页面
- **方案**：Nuxt `error.vue`
- **涉及文件**：`error.vue`

### 🖼 文章封面图 ✅
- **目标**：卡片展示文章缩略图，提升视觉丰富度
- **方案**：manifest 增加 cover 字段（前向兼容），卡片布局调整为图文混排，16:9 缩略图 + hover 缩放
- **涉及文件**：`pages/index.vue`，manifest 数据结构

### 💬 评论系统 (Giscus) ✅
- **目标**：文章详情页底部支持读者评论，基于 GitHub Discussions
- **方案**：接入 Giscus，使用 GitHub Discussions 作为后端，零成本
- **涉及文件**：`components/Giscus.vue`，`pages/posts/[...slug].vue`

### ⬅➡ 上一篇/下一篇导航 ✅
- **目标**：详情页底部展示上一篇/下一篇文章链接，引导连续阅读
- **方案**：基于 manifest 按发布时间排序，计算相邻文章信息
- **涉及文件**：`pages/posts/[...slug].vue` 底部导航区域

### 🔍 SEO 增强 (OG + JSON-LD) ✅
- **目标**：社交平台分享时展示卡片预览，搜索引擎结构化数据
- **方案**：`useSeoMeta` 设置 Open Graph + Twitter Card；JSON-LD Article schema
- **涉及文件**：`pages/posts/[...slug].vue`，`pages/index.vue`，`nuxt.config.ts`

### 🗺 站点地图 ✅
- **目标**：生成 sitemap.xml，便于搜索引擎收录
- **方案**：Nuxt 服务端路由，从 manifest 动态生成所有文章 URL
- **涉及文件**：`server/routes/sitemap.xml.ts`

### 📂 分类/标签聚合页 ✅
- **目标**：独立的 `/categories` 和 `/tags` 页面，展示分类/标签及文章数
- **方案**：从 manifest 提取统计，点击跳转首页带筛选参数
- **涉及文件**：`pages/categories.vue`，`pages/tags.vue`，导航栏链接

### 📚 文章系列/合集 ✅
- **目标**：多篇文章串成系列（如"Vue 深入"系列），系列内有序导航
- **方案**：manifest 增加 `series` 字段，详情页展示系列目录和当前位置
- **涉及文件**：manifest 数据结构，`pages/posts/[...slug].vue` 系列导航组件

### 📋 代码块复制按钮 ✅
- **目标**：代码块右上角显示复制按钮，点击复制全部代码
- **方案**：渲染后遍历 `<pre><code>` 元素，动态插入复制按钮
- **涉及文件**：`composables/useCodeCopy.ts` 或 `components/CodeBlock.vue`

### 🔎 图片灯箱 ✅
- **目标**：点击文章内图片放大查看，支持缩放和关闭
- **方案**：集成 medium-zoom，自动绑定文章内容区域图片
- **涉及文件**：`pages/posts/[...slug].vue`，`assets/css/main.css`

### 🔗 分享按钮 ✅
- **目标**：一键复制链接 / 分享到 Twitter、微博
- **方案**：Web Share API + 社交链接按钮组
- **涉及文件**：`components/ShareButtons.vue`，`pages/posts/[...slug].vue`

### 📱 PWA 支持 ✅
- **目标**：离线访问，手机端添加到主屏幕
- **方案**：`@vite-pwa/nuxt`，manifest + service worker + 离线缓存
- **涉及文件**：`nuxt.config.ts`，`public/` 静态资源

### 📊 访问量统计 ✅
- **目标**：展示文章阅读次数，了解热门内容
- **方案**：接 Umami 自托管，或 localStorage + R2 存储计数
- **涉及文件**：`server/api/views.ts`，`pages/posts/[...slug].vue`

### ☕ 赞赏/打赏按钮 ✅
- **目标**：文章底部展示赞赏入口
- **方案**：点击弹窗展示收款码图片（R2 存储），支持关闭
- **涉及文件**：`components/TipButton.vue`，`pages/posts/[...slug].vue`

---

## 🚀 已完成功能

- [x] 随机插画背景（每次刷新更换）
- [x] 插画淡入效果（预加载 + 700ms 过渡）
- [x] 文章详情页背景半透明（插画可透视）
- [x] 分类筛选
- [x] 分页
- [x] 响应式布局
- [x] 搜索功能（首页导航栏，按标题/描述/分类/标签搜索）
- [x] 文章目录 TOC（详情页侧边栏，h2/h3 锚点，滚动高亮）
- [x] 阅读时间估算（卡片 + 详情页显示"约 X 分钟"）
- [x] 标签系统（卡片展示标签，详情页展示全部标签）
- [x] 回到顶部按钮（全局组件，滚动 400px 显示）
- [x] 阅读进度条（详情页顶部，实时百分比）
- [x] 暗色模式（系统偏好 + 手动切换 + localStorage 持久化）
- [x] 页面切换动画（0.25s 淡入淡出）
- [x] 归档页（按年份分组时间线）
- [x] 相关文章推荐（category + tags 相似度匹配）
- [x] RSS 订阅（RSS 2.0，/rss.xml 动态生成）
- [x] 自定义 404 页（error.vue）
- [x] 文章封面图（cover 字段前向兼容，16:9 图文混排）
- [x] 代码块复制按钮（右上角复制，2 秒后自动恢复）
- [x] 上一篇/下一篇导航（按发布时间排序）
- [x] SEO 增强（Open Graph + Twitter Card + JSON-LD 结构化数据）
- [x] 站点地图（/sitemap.xml 动态生成）
- [x] 分类/标签聚合页（/categories、/tags）
- [x] 文章系列/合集（manifest series 字段 + SeriesNav 组件）
- [x] 图片灯箱（点击放大，纯 CSS/JS 实现）
- [x] 分享按钮（复制链接 + Twitter + 微博 + 原生分享）
- [x] PWA 支持（manifest + service worker + 离线缓存）
- [x] 访问量统计（服务端 API + 文件存储）
- [x] 赞赏/打赏按钮（弹窗展示收款码）
