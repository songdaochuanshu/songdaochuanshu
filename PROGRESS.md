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
| 交互体验 | 代码块复制按钮 | ✅ 已完成 | ⭐⭐⭐ |
| 交互体验 | 图片灯箱 | ✅ 已完成 | ⭐⭐ |
| 互动 | 分享按钮 | ✅ 已完成 | ⭐⭐ |
| 完善度 | PWA 支持 | ✅ 已完成 | ⭐ |
| 互动 | 访问量统计 | ✅ 已完成 | ⭐ |
| 互动 | 赞赏/打赏按钮 | ✅ 已完成 | ⭐ |
| 体验打磨 | 代码语法高亮 | ✅ 已完成 | ⭐⭐⭐ |
| 体验打磨 | 移动端 TOC | ✅ 已完成 | ⭐⭐⭐ |
| 体验打磨 | 骨架屏加载 | ✅ 已完成 | ⭐⭐⭐ |
| 体验打磨 | 图片懒加载 | ✅ 已完成 | ⭐⭐ |
| 体验打磨 | 键盘快捷键 | ✅ 已完成 | ⭐⭐ |
| 体验打磨 | 字体大小调节 | ✅ 已完成 | ⭐ |
| 体验打磨 | 文章内锚点链接 | ✅ 已完成 | ⭐ |
| 内容增强 | 热门文章 | ✅ 已完成 | ⭐⭐ |
| 内容增强 | 阅读历史 (已读标记) | ✅ 已完成 | ⭐ |
| 内容增强 | 草稿预览 | ✅ 已完成 | ⭐ |
| 技术优化 | 图片 CDN 优化 | ✅ 已完成 | ⭐⭐ |
| 技术优化 | 错误重试 + 降级缓存 | ✅ 已完成 | ⭐ |

---

## 📝 功能详情

### 🔍 搜索功能 ✅
- **目标**：支持按标题、描述、正文内容搜索文章
- **方案**：前端本地搜索，基于 manifest.json 的元数据
- **涉及文件**：`pages/index.vue`

### 📑 文章目录 (TOC) ✅
- **目标**：详情页自动生成 h2/h3 锚点导航
- **方案**：解析渲染后的 HTML 提取标题，桌面端侧边栏 + 移动端浮动按钮
- **涉及文件**：`pages/posts/[...slug].vue`，`components/MobileToc.vue`

### ⏱ 阅读时间估算 ✅
- **目标**：文章卡片和详情页显示预估阅读时间
- **方案**：基于正文字符数 / 500字/分钟
- **涉及文件**：`pages/index.vue`，`pages/posts/[...slug].vue`

### 🏷 标签系统 ✅
- **目标**：展示文章标签，支持按标签筛选
- **方案**：manifest tags 字段，卡片展示最多 3 个标签
- **涉及文件**：`pages/index.vue`，`pages/posts/[...slug].vue`

### ⬆ 回到顶部按钮 ✅
- **方案**：全局组件，监听 scroll 事件
- **涉及文件**：`components/BackToTop.vue`

### 📊 阅读进度条 ✅
- **方案**：监听滚动计算百分比，fixed 顶部进度条
- **涉及文件**：`pages/posts/[...slug].vue`

### 🌙 暗色模式 ✅
- **方案**：Tailwind CSS 4 `@custom-variant dark` + localStorage 持久化
- **涉及文件**：`composables/useDarkMode.ts`，`components/ThemeToggle.vue`

### 🎭 页面切换动画 ✅
- **方案**：Nuxt `pageTransition` + CSS transition
- **涉及文件**：`nuxt.config.ts`

### 📦 归档页 ✅
- **方案**：按年份分组时间线
- **涉及文件**：`pages/archive.vue`

### 🔗 相关文章推荐 ✅
- **方案**：category + tags 相似度匹配，取 top 2
- **涉及文件**：`pages/posts/[...slug].vue`

### 📡 RSS 订阅 ✅
- **方案**：Nuxt 服务端路由动态生成 RSS 2.0 XML
- **涉及文件**：`server/routes/rss.xml.ts`

### 🚫 自定义 404 页 ✅
- **涉及文件**：`error.vue`

### 🖼 文章封面图 ✅
- **方案**：manifest cover 字段，16:9 图文混排
- **涉及文件**：`pages/index.vue`

### 💬 评论系统 (Giscus) ✅
- **方案**：GitHub Discussions 作为后端
- **涉及文件**：`components/Giscus.vue`

### ⬅➡ 上一篇/下一篇导航 ✅
- **方案**：按发布时间排序的相邻文章链接
- **涉及文件**：`pages/posts/[...slug].vue`

### 🔍 SEO 增强 (OG + JSON-LD) ✅
- **方案**：`useSeoMeta` + JSON-LD Article schema
- **涉及文件**：`pages/posts/[...slug].vue`，`pages/index.vue`，`nuxt.config.ts`

### 🗺 站点地图 ✅
- **方案**：从 manifest 动态生成
- **涉及文件**：`server/routes/sitemap.xml.ts`

### 📂 分类/标签聚合页 ✅
- **涉及文件**：`pages/categories.vue`，`pages/tags.vue`

### 📋 代码块复制按钮 ✅
- **方案**：动态插入复制按钮到 pre code 元素
- **涉及文件**：`composables/useCodeCopy.ts`

### 🔎 图片灯箱 ✅
- **方案**：纯 CSS/JS 实现，点击放大查看
- **涉及文件**：`composables/useImageLightbox.ts`

### 🔗 分享按钮 ✅
- **方案**：复制链接 + Twitter + 微博 + 原生分享
- **涉及文件**：`components/ShareButtons.vue`

### 📱 PWA 支持 ✅
- **方案**：manifest + service worker + 离线缓存
- **涉及文件**：`public/site.webmanifest`，`public/sw.js`

### 📊 访问量统计 ✅
- **方案**：服务端 API + Nitro storage 持久化
- **涉及文件**：`server/api/views.get.ts`，`server/api/views.post.ts`

### ☕ 赞赏/打赏按钮 ✅
- **方案**：弹窗展示收款码
- **涉及文件**：`components/TipButton.vue`

### 🎨 代码语法高亮 ✅
- **方案**：marked 自定义 renderer + CSS token 着色
- **涉及文件**：`composables/useHighlight.ts`

### 📱 移动端 TOC ✅
- **方案**：浮动按钮 + 抽屉面板
- **涉及文件**：`components/MobileToc.vue`

### 💀 骨架屏加载 ✅
- **方案**：CSS 脉冲动画 + v-if/v-else 切换
- **涉及文件**：`pages/index.vue`，`pages/posts/[...slug].vue`

### 🖼 图片懒加载 ✅
- **方案**：loading=lazy + decoding=async
- **涉及文件**：`pages/posts/[...slug].vue`

### ⌨ 键盘快捷键 ✅
- **方案**：全局 keydown 事件监听
- **涉及文件**：`composables/useKeyboard.ts`

### 🔤 字体大小调节 ✅
- **方案**：CSS 变量 + localStorage 持久化
- **涉及文件**：`components/FontSizeControl.vue`

### 文章内锚点链接 ✅
- **方案**：标题旁 # 图标，点击复制直链
- **涉及文件**：`pages/posts/[...slug].vue`

### 🔥 热门文章 ✅
- **方案**：调用 /api/views 排序取 Top 5
- **涉及文件**：`components/HotPosts.vue`

### 📖 阅读历史 ✅
- **方案**：localStorage 记录已读 key，卡片显示已读标记
- **涉及文件**：`composables/useReadHistory.ts`

### 📝 草稿预览 ✅
- **方案**：/preview?key=*** 路由，从 R2 直接读取 md 渲染
- **涉及文件**：`pages/preview.vue`

### 🌐 图片 CDN 优化 ✅
- **方案**：lazy loading + async decoding 基础优化
- **涉及文件**：`composables/useImageOptimize.ts`

### 🔄 错误重试 + 降级缓存 ✅
- **方案**：$fetch retry 3 次 + service worker manifest 缓存降级
- **涉及文件**：`pages/index.vue`，`pages/posts/[...slug].vue`，`public/sw.js`

### 🖼 图片架构升级 ✅ (2026-06-28)
- **目标**：与 cloudflare-assets 仓库对齐，图片按 r18/normal 分类
- **方案**：images-info.json 改为 `{ r18: [], normal: [] }` 结构，博客只用 normal
- **涉及文件**：`composables/useRandomImages.ts`，`pages/index.vue`，`public/images-info.json`
- **关联仓库**：`songdaochuanshu/cloudflare-assets`

---

## 🚀 已完成功能

- [x] 随机插画背景（每次刷新更换）
- [x] 插画淡入效果（预加载 + 700ms 过渡）
- [x] 文章详情页背景半透明（插画可透视）
- [x] 分类筛选
- [x] 分页
- [x] 响应式布局
- [x] 移动端导航栏
- [x] 文章列表卡片优化
- [x] 图片架构升级：URL 迁移到 normal/ 前缀，images-info.json 改为分类结构
- [x] 博客只展示 normal 分类图片，R18 内容不进入前端