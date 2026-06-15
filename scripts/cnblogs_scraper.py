#!/usr/bin/env python3
"""
从博客园首页爬取文章，生成 Nuxt Content 格式的 markdown 文件。
替代原来的 Node.js scraper，直接让 Hermes 在 cron 中执行。
"""

import urllib.request
import urllib.error
import re
import os
import sys
import time
from datetime import datetime, timezone
from html import unescape
from pathlib import Path

BLOG_HOME = "https://www.cnblogs.com/"
POSTS_DIR = Path(__file__).parent.parent / "content" / "blog"

USER_AGENT = "Mozilla/5.0 (Linux; Android 15) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36"


def fetch_page(url):
    req = urllib.request.Request(url, headers={
        "User-Agent": USER_AGENT,
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8",
    })
    resp = urllib.request.urlopen(req, timeout=15)
    return resp.read().decode("utf-8")


def fetch_post_page(url):
    req = urllib.request.Request(url, headers={
        "User-Agent": USER_AGENT,
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8",
        "Referer": BLOG_HOME,
    })
    try:
        resp = urllib.request.urlopen(req, timeout=15)
        return resp.read().decode("utf-8")
    except urllib.error.HTTPError as e:
        if e.code == 403:
            req.add_header("Cookie", "cnblogs_allow_host=www.cnblogs.com")
            resp = urllib.request.urlopen(req, timeout=15)
            return resp.read().decode("utf-8")
        raise


def parse_homepage(html):
    posts = []
    article_pattern = re.compile(
        r'<article\s+class="post-item"\s+data-post-id="(\d+)"[^>]*>.*?'
        r'<a[^>]*class="post-item-title"[^>]*href="([^"]*)"[^>]*>([^<]*)</a>',
        re.DOTALL
    )
    for m in article_pattern.finditer(html):
        post_id = m.group(1)
        href = m.group(2)
        title = unescape(m.group(3).strip())
        if title:
            posts.append((title, href, post_id))
    return posts


def html_to_markdown(html):
    """HTML 转 Markdown"""
    # 先清理 CKE copybin 和多余 span
    md = re.sub(r'<span[^>]*data-cke-copybin-start[^>]*>.*?</span>', '', html, flags=re.DOTALL)
    md = re.sub(r'<span[^>]*>(.*?)</span>', r'\1', md, flags=re.DOTALL)

    # 代码块: <pre><code> 和裸 code — 先处理代码块，再处理行内代码
    # 清理嵌套的反引号
    md = re.sub(r'<pre[^>]*><code[^>]*class="[^"]*language-(\w+)"[^>]*>(.*?)</code></pre>',
                r'```\1\n\2\n```', md, flags=re.DOTALL)
    md = re.sub(r'<pre[^>]*><code>(.*?)</code></pre>',
                r'```\n\1\n```', md, flags=re.DOTALL)
    md = re.sub(r'<pre[^>]*>(.*?)</pre>', r'```\n\1\n```', md, flags=re.DOTALL)

    # 行内代码 - 清理嵌套反引号
    md = re.sub(r'<code[^>]*>(.*?)</code>', r'\1', md, flags=re.DOTALL)

    # 标题
    for i in range(6, 0, -1):
        tag = f'h{i}'
        hash_str = '#' * i
        md = re.sub(rf'<{tag}[^>]*>(.*?)</{tag}>', hash_str + r' \1\n', md, flags=re.DOTALL)

    # 粗体和斜体
    md = re.sub(r'<strong[^>]*>(.*?)</strong>', r'**\1**', md, flags=re.DOTALL)
    md = re.sub(r'<b[^>]*>(.*?)</b>', r'**\1**', md, flags=re.DOTALL)
    md = re.sub(r'<em[^>]*>(.*?)</em>', r'*\1*', md, flags=re.DOTALL)
    md = re.sub(r'<i[^>]*>(.*?)</i>', r'*\1*', md, flags=re.DOTALL)

    # 分割线
    md = re.sub(r'<hr\s*/?\s*>', '\n---\n', md)

    # 段落、换行、div
    md = re.sub(r'<br\s*/?\s*>', '\n', md)
    md = re.sub(r'</p>', '\n\n', md)
    md = re.sub(r'<p[^>]*>', '', md)
    md = re.sub(r'</div>', '\n', md)
    md = re.sub(r'<div[^>]*/?>', '\n', md)

    # 列表
    md = re.sub(r'<li[^>]*>', '\n- ', md)
    md = re.sub(r'</li>', '', md)

    # 图片
    md = re.sub(r'<img[^>]*src="([^"]*)"[^>]*alt="([^"]*)"[^>]*/?>', r'![\2](\1)', md)
    md = re.sub(r'<img[^>]*src="([^"]*)"[^>]*/?>', r'![](\1)', md)

    # 链接 (放后面，避免和其他标签冲突)
    md = re.sub(r'<a[^>]*href="([^"]*)"[^>]*>(.*?)</a>', r'[\2](\1)', md, flags=re.DOTALL)

    # 清理多余 HTML 标签
    md = re.sub(r'<[^>]+>', '', md)

    # 实体解码
    md = unescape(md)

    # 清理空白
    md = re.sub(r' +', ' ', md)
    md = re.sub(r'\n{3,}', '\n\n', md)
    md = md.strip()

    return md


def extract_post_page_content(html):
    """从文章页面提取正文"""
    idx = html.find('cnblogs_post_body')
    if idx < 0:
        return None
    
    # 从 cnblogs_post_body 开始，找到文章结束的标志性 div
    # 通常是 MySignature 或 post_next_prev
    sig_idx = html.find('id="MySignature"', idx)
    next_idx = html.find('id="post_next_prev"', idx)
    
    # 取更近的那个
    end_marker = min(x for x in [sig_idx, next_idx] if x >= 0)
    if end_marker < 0:
        # 都找不到，取 cnblogs_post_body 后面 200KB
        end_marker = idx + 200000
    
    # 取 cnblogs_post_body 到标记之间的内容
    content = html[idx:end_marker]
    
    if not content.strip():
        return None
    
    # 清理 script、style、签名
    content = re.sub(r'<script[^>]*>.*?</script>', '', content, flags=re.DOTALL)
    content = re.sub(r'<style[^>]*>.*?</style>', '', content, flags=re.DOTALL)
    content = re.sub(r"<div[^>]*class=\"?[^>]*advertisement[^>]*>.*?</div>", '', content, flags=re.DOTALL)
    content = re.sub(r"<div[^>]*class=\"?[^>]*comment[^>]*>.*?</div>", '', content, flags=re.DOTALL)
    content = re.sub(r"<div[^>]*id=\"MySignature\"[^>]*>.*?</div>", '', content, flags=re.DOTALL)

    md = html_to_markdown(content)
    return md.strip()


def create_post_file(title, md_content, post_id):
    """创建 Nuxt Content 格式的 markdown 文件"""
    now = datetime.now(timezone.utc)
    date_str = now.strftime("%Y-%m-%dT%H:%M:%SZ")
    filename = f"{post_id}.md"

    frontmatter = f'---\nlayout: post\ntitle: "{title}"\ndate: "{date_str}"\n---\n'
    content = frontmatter + md_content
    filepath = POSTS_DIR / filename

    if filepath.exists():
        return None

    filepath.write_text(content, encoding="utf-8")
    return filename


def get_existing_ids():
    if not POSTS_DIR.exists():
        return set()
    ids = set()
    for f in POSTS_DIR.glob("*.md"):
        m = re.match(r'(\d+)\.md', f.name)
        if m:
            ids.add(m.group(1))
    return ids


def main():
    print(f"[{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}] Starting cnblogs scraper...")

    POSTS_DIR.mkdir(parents=True, exist_ok=True)

    existing_ids = get_existing_ids()
    print(f"Found {len(existing_ids)} existing posts")

    try:
        html = fetch_page(BLOG_HOME)
        posts = parse_homepage(html)
        print(f"Found {len(posts)} posts on homepage")
    except Exception as e:
        print(f"Error fetching homepage: {e}")
        return

    scraped = 0
    skipped = 0
    failed = 0

    for title, href, post_id in posts:
        if post_id in existing_ids:
            skipped += 1
            continue

        print(f"  Scraping: {title}")
        try:
            post_html = fetch_post_page(href)
            md_content = extract_post_page_content(post_html)

            if md_content:
                filename = create_post_file(title, md_content, post_id)
                if filename:
                    print(f"    ✅ Saved as {filename}")
                    scraped += 1
                else:
                    skipped += 1
            else:
                print(f"    ⚠️  Failed to extract content")
                failed += 1
        except Exception as e:
            print(f"    ❌ Error: {e}")
            failed += 1

        time.sleep(0.5)

    print(f"\nDone! scraped={scraped} skipped={skipped} failed={failed}")


if __name__ == "__main__":
    main()
