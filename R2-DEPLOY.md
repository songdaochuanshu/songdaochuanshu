# R2 + Cloudflare Pages 部署指南

## 一次性配置

### 1. Cloudflare R2 桶
- Dashboard → R2 → Create bucket → 名字 `songdaochuanshu-static`
- Settings → Public access → 绑定你的域名 `blog-static.songdaochuanshu.com`
- （或者先用 `xxx.r2.dev` 测试）

### 2. Cloudflare API Token
- Dashboard → My Profile → API Tokens → Create Token
- Permissions: **Account → R2: Edit**
- Account Resources: 选你的账户
- 创建后**立即复制**，只显示一次

### 3. 拿到 Account ID
- Dashboard 右侧边栏 R2 上面那一行 "Account ID"

### 4. 本地安装新依赖
```bash
pnpm install
# 会装 gray-matter（manifest 生成用）
```

### 5. Cloudflare Pages 后台改配置

进入 Pages 项目 → Settings → Builds & deployments：

| 项 | 值 |
|---|---|
| Build command | `npx nuxt build` |
| Build output directory | `.output` ⚠️ 不是 `/dist` 了 |
| Root directory | （留空） |
| Environment variables | `NUXT_PUBLIC_R2_BASE` = `https://blog-static.songdaochuanshu.com` |

（如果你的域名是 `xxx.r2.dev`，把上面那个 URL 换掉）

### 6. 把仓库改动 push 上去触发第一次部署
```bash
git add -A
git commit -m "refactor: 迁移文章到 R2，改用 SSR"
git push origin main
```

第一次部署应该 1-2 分钟搞定（因为只 prerender 10 几个索引页）。

## 每次加新文章的工作流

### 本地编辑后
```bash
# 1. 把新文章放到 content/blog/xxx.md（或 life / record）
# 2. 编辑好 frontmatter：
#       ---
#       layout: post
#       title: 新文章标题
#       date: 2026-06-18
#       tags: [标签1, 标签2]
#       description: 简介
#       ---
# 3. 上传到 R2：
export CF_API_TOKEN=新token
export CF_ACCOUNT_ID=你的账户ID
pnpm run upload:r2
```

上传完成后**不需要重新部署**！新文章立刻在 `/p/xxx` 可访问。

如果改了 `me.md` 或 `life/record` 内容，**需要重新部署**一次，因为这些页 prerender 了。

## 文件位置速查

| 文件 | 作用 |
|---|---|
| `scripts/upload-to-r2.mjs` | 上传脚本 |
| `utils/r2.ts` | manifest 缓存 + markdown 渲染 |
| `utils/index.ts` | 工具函数（日期、年度分隔） |
| `nuxt.config.ts` | SSR preset + R2 base URL |
| `manifest.local.json` | 上传后本地副本，方便调试 |

## 常见问题

**Q: 部署后页面空白？**
A: 看下 Cloudflare Pages 部署日志，确认 `.output/_worker.js` 存在。环境变量 `NUXT_PUBLIC_R2_BASE` 没设的话会 fallback 到默认值。

**Q: 文章页 404？**
A: 用浏览器直接打开 `https://blog-static.songdaochuanshu.com/manifest.json`，看能不能看到 JSON。能看到说明 R2 通了；看不到说明 R2 没开 public access 或域名没绑好。

**Q: 我本地怎么测？**
A: 
```bash
pnpm install
export NUXT_PUBLIC_R2_BASE=https://blog-static.songdaochuanshu.com
pnpm dev
```
Dev server 会从 R2 拉真数据。

**Q: 想批量加很多文章？**
A: 把所有 .md 放到 content/ 下，一次性 `pnpm run upload:r2` 全部传上去。