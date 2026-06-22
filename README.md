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

### 移动端（<768px）— CodeCat's Blog 二次元风格
- **顶部导航栏**：左侧汉堡菜单图标 | 中间站点标题 | 右侧搜索图标
- **Hero Banner**：
  - 背景使用 Lolicon API 随机获取的 Pixiv 二次元插画
  - 半透明遮罩层保证文字可读性
  - 标题 + 副标题 + "了解更多"按钮
- **最新文章**：
  - 横向滚动卡片列表（4 张一组）
  - 每张卡片：缩略图（Lolicon API 随机插画）+ 标签 + 日期 + 浏览量
  - 圆角卡片 + 柔和阴影
- **底部固定导航栏**（4 个 tab）：
  - 🏠 首页 | 📁 归档 | 🏷️ 标签 | 👤 我的
  - 选中态高亮（紫色主题色）
  - 固定在屏幕底部，安全区域适配
- **抽屉菜单**（汉堡按钮触发）：
  - 从底部滑出的半屏面板
  - 包含：首页 / 归档 / 分类 / 标签 / 项目 / 关于我
  - 主题切换：浅色 / 深色
  - 社交图标：GitHub / QQ / 微博 / 邮箱
- **归档页**：
  - 按年份分组的时间线展示
  - 每年下按月列出文章数量
  - 分类统计 + 标签统计
- **标签页**：
  - 标签云布局（按使用频率显示不同字号）
  - 每个标签显示关联文章数
- **我的页面**：
  - 头像 + 昵称 + 角色标签
  - 个人简介
  - 统计数据（文章数 / 分类数 / 标签数 / 访问量）
  - 社交链接
- **配色方案**：
  - 主色：淡紫色 (#b19cd9)、薰衣草色 (#d8b4fe)、粉色 (#f9a8d4)
  - 背景：白色 + 极淡紫灰渐变
  - 文字：深灰 (#1a1a2e) + 中灰 (#6b7280)
  - 强调色：紫色 (#9333ea)
- **装饰元素**：
  - 猫耳 / 猫咪吉祥物插画
  - 圆润的边角设计（rounded-2xl / rounded-3xl）
  - 柔和的阴影和过渡动画
  - 二次元风格点缀元素

### 响应式断点
- `sm`: 640px — 平板竖屏
- `md`: 768px — 平板横屏 / 小笔记本
- `lg`: 1024px — 桌面端
- `xl`: 1280px — 大屏桌面

### 技术实现
- 使用 `useMediaQuery('(max-width: 767px)')` 检测移动端
- 桌面端和移动端共用同一套数据源（manifest.json）
- 移动端独立模板，桌面端保持现有布局
- Lolicon API：`https://api.lolicon.app/setu/v2?num=1&size=regular&rating=0`
- 插画 CDN：`https://i.pixiv.re/` 或 `https://i.pximg.net/`

## 技术栈

- [Nuxt 4](https://nuxt.com/) — Vue.js 全栈框架
- [Cloudflare R2](https://developers.cloudflare.com/r2/) — 对象存储
- [Tailwind CSS 4](https://tailwindcss.com/) — CSS 框架（原生 PostCSS 集成）
- [TypeScript](https://www.typescriptlang.org/) — 类型安全
- [Lolicon API](https://docs.api.lolicon.app) — 二次元插画随机获取

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
