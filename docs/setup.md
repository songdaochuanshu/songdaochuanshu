# R2 博客系统

## 配置

确保 `.env` 文件包含你的 R2 和 Cloudflare 凭证，参考 `.env.example`。

## 文章结构

R2 桶中有以下文件夹：
- `blog/` - 博客文章
- `life/` - 生活记录
- `record/` - 其他记录

## 使用方法

1. 将 Markdown 文件上传到对应文件夹
2. 使用 YAML frontmatter 定义元数据
3. 博客会自动读取并渲染

## 开发

```bash
pnpm install
pnpm dev
```
