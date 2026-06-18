#!/usr/bin/env node
/**
 * 把 content/ 下的 markdown 上传到 R2，并生成 manifest.json
 *
 * 用法：
 *   1) 设置环境变量：
 *        export CF_API_TOKEN=xxx        # Cloudflare API Token，需要 R2:Edit 权限
 *        export CF_ACCOUNT_ID=xxx       # Cloudflare 账户 ID
 *      （R2 桶名和自定义域名在脚本顶部常量里改）
 *
 *   2) 跑：
 *        pnpm run upload:r2
 *      或：
 *        node scripts/upload-to-r2.mjs
 */

import { readdir, readFile, writeFile } from "node:fs/promises";
import { join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";
import matter from "gray-matter";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const CONTENT_DIR = join(ROOT, "content");

// ============== 配置区 ==============
const BUCKET_NAME = "songdaochuanshu-static";
const PARALLEL = 8; // 并发上传数
// ====================================

const ACCOUNT_ID = process.env.CF_ACCOUNT_ID;
const TOKEN = process.env.CF_API_TOKEN;

if (!ACCOUNT_ID || !TOKEN) {
  console.error(
    "\n❌ 缺少环境变量！请先设置：\n" +
      "   export CF_ACCOUNT_ID=<你的 Cloudflare 账户 ID>\n" +
      "   export CF_API_TOKEN=<R2:Edit 权限的 token>\n",
  );
  process.exit(1);
}

const API_BASE = `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/r2/buckets/${BUCKET_NAME}/objects`;

/**
 * 递归找 content/ 下所有 .md
 */
async function walkMd(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const e of entries) {
    const full = join(dir, e.name);
    if (e.isDirectory()) {
      files.push(...(await walkMd(full)));
    } else if (e.isFile() && e.name.endsWith(".md")) {
      files.push(full);
    }
  }
  return files;
}

/**
 * 上传单个对象到 R2（REST API）
 */
async function uploadObject(key, body) {
  const url = `${API_BASE}/${encodeURI(key)}`;
  const res = await fetch(url, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "text/markdown; charset=utf-8",
    },
    body,
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`上传失败 [${key}]: ${res.status} ${text.slice(0, 200)}`);
  }
}

/**
 * 并发池
 */
async function pool(items, limit, worker) {
  const results = new Array(items.length);
  let i = 0;
  const runners = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (true) {
      const idx = i++;
      if (idx >= items.length) return;
      results[idx] = await worker(items[idx], idx);
    }
  });
  await Promise.all(runners);
  return results;
}

function toPosix(p) {
  return p.split(sep).join("/");
}

function slugFromKey(key) {
  // blog/foo.md -> foo
  // foo.md -> foo
  // nested/foo/bar.md -> nested/foo/bar
  return key.replace(/\.md$/, "");
}

function urlFromKey(key, category) {
  // blog/foo.md -> /p/foo
  // me.md -> /me
  // 404.md -> 不暴露，跳过
  const slug = slugFromKey(key);
  if (category === "blog" || category === "life" || category === "record") {
    return `/p/${slug}`;
  }
  if (slug === "me") return `/me`;
  return `/${slug}`;
}

/**
 * 主流程
 */
async function main() {
  console.log(`📂 扫描 ${CONTENT_DIR} ...`);
  const files = await walkMd(CONTENT_DIR);
  console.log(`   找到 ${files.length} 个 markdown 文件`);

  const manifestPosts = [];
  const uploads = [];

  for (const file of files) {
    const relKey = toPosix(relative(CONTENT_DIR, file)); // blog/foo.md
    const category = relKey.includes("/") ? relKey.split("/")[0] : "root";

    // 404.md 跳过（静态 fallback 用，不需要走 R2）
    if (relKey === "404.md") continue;

    const raw = await readFile(file, "utf8");
    const parsed = matter(raw);

    // 上传去掉 frontmatter 的纯 md（运行时不再解析 frontmatter）
    const cleanBody = parsed.content.replace(/^\n+/, "");
    uploads.push({ key: relKey, body: cleanBody });

    // manifest entry
    const data = parsed.data || {};
    manifestPosts.push({
      path: urlFromKey(relKey, category),
      key: relKey,
      category,
      title: data.title || slugFromKey(relKey),
      date: data.date ? new Date(data.date).toISOString() : null,
      description: data.description || "",
      tags: Array.isArray(data.tags) ? data.tags : [],
      layout: data.layout || "post",
    });
  }

  // 按日期倒序
  manifestPosts.sort((a, b) => {
    const da = a.date ? new Date(a.date).getTime() : 0;
    const db = b.date ? new Date(b.date).getTime() : 0;
    return db - da;
  });

  console.log(`🚀 开始并发上传（并发数=${PARALLEL}）...`);
  const t0 = Date.now();
  let done = 0;
  await pool(uploads, PARALLEL, async (u) => {
    await uploadObject(u.key, u.body);
    done++;
    if (done % 20 === 0 || done === uploads.length) {
      const pct = ((done / uploads.length) * 100).toFixed(1);
      process.stdout.write(`\r   ${done}/${uploads.length} (${pct}%)`);
    }
  });
  console.log(`\n✅ 上传完成，耗时 ${((Date.now() - t0) / 1000).toFixed(1)}s`);

  // 生成 manifest
  const manifest = {
    version: "1.0",
    generatedAt: new Date().toISOString(),
    total: manifestPosts.length,
    posts: manifestPosts,
  };
  const manifestKey = "manifest.json";
  await uploadObject(manifestKey, JSON.stringify(manifest, null, 2));
  console.log(`📝 manifest.json 已上传（${manifestPosts.length} 条记录）`);

  // 本地也存一份方便排查
  await writeFile(
    join(ROOT, "manifest.local.json"),
    JSON.stringify(manifest, null, 2),
    "utf8",
  );
  console.log(`💾 本地副本：manifest.local.json`);
}

main().catch((err) => {
  console.error("\n❌ 出错了：", err.message);
  process.exit(1);
});