const scraperjs = require("scraperjs");
const fs = require("fs").promises;
const path = require("path");
const TurndownService = require("turndown");
const turndownService = new TurndownService({});
require("dotenv").config();

const { POST_URL } = process.env;

if (!POST_URL) {
  console.error("POST_URL is not set in the environment variables.");
  process.exit(1);
}

// 动态获取项目根目录，并指定_posts目录的相对路径
const projectRoot = path.dirname(require.main.filename);
const postsDir = path.join(projectRoot, 'source', '_posts');

// 确保_posts目录存在
fs.mkdir(postsDir, { recursive: true }).catch(err => {
  console.error('Error creating directory:', err);
});

// 正则表达式用于匹配标题行，并清理多余的引号和转义字符
const titlePattern = /^title:\s*(['"]*)(.*?)(['"]*)$/im;

function cleanTitle(title) {
  let cleanedTitle = title;
  let changesMade;

  do {
    changesMade = false;

    // 去除最外层引号
    const outerQuotesRemoved = cleanedTitle.replace(/^["']|["']$/g, '');
    if (outerQuotesRemoved !== cleanedTitle) {
      cleanedTitle = outerQuotesRemoved;
      changesMade = true;
    }

    // 去除转义符但保留引号本身
    const unescapedQuotesRemoved = cleanedTitle.replace(/\\(["'])/g, '$1');
    if (unescapedQuotesRemoved !== cleanedTitle) {
      cleanedTitle = unescapedQuotesRemoved;
      changesMade = true;
    }

    // 再次去除可能残留的引号
    const innerQuotesRemoved = cleanedTitle.replace(/^['"]+|['"]+$/g, '');
    if (innerQuotesRemoved !== cleanedTitle) {
      cleanedTitle = innerQuotesRemoved;
      changesMade = true;
    }

    // 去除多余的反斜杠
    const slashesRemoved = cleanedTitle.replace(/\\+/g, '');
    if (slashesRemoved !== cleanedTitle) {
      cleanedTitle = slashesRemoved;
      changesMade = true;
    }

    // 去除前后空白字符
    const trimmed = cleanedTitle.trim();
    if (trimmed !== cleanedTitle) {
      cleanedTitle = trimmed;
      changesMade = true;
    }
  } while (changesMade);

  return cleanedTitle;
}

async function scrapePost(href, originalTitle) {
  try {
    const data = await scraperjs.StaticScraper.create(href).scrape((q) => {
      return q(".post")
        .map(function () {
          q(this).find(".postDesc").remove();
          q(this).find("#cb_post_title_url").attr("href", "");
          return q(this).html();
        })
        .get();
    });

    // 清理标题
    const cleanedTitle = cleanTitle(originalTitle);
    
    const postContent = addPost(cleanedTitle) + turndownService.turndown(data[0]);
    const fileName = `${filterText(hash(cleanedTitle))}`;
    await fs.writeFile(path.join(postsDir, fileName), postContent);
    console.log(`Successfully saved ${fileName}`);
  } catch (error) {
    console.error(`Failed to scrape or save post from ${href}:`, error);
  }
}

async function main() {
  try {
    await scraperjs.StaticScraper.create(POST_URL).scrape(async ($) => {
      const promises = $(".post-item").map(async function () {
        $(this).find("footer").remove();
        const title = $(this).find(".post-item-title").text().trim();
        const href = $(this).find(".post-item-title").attr("href");

        if (title && href) {
          await scrapePost(href, title);
        }
      }).get();

      // Wait for all posts to be scraped and saved
      await Promise.all(promises);
    });
  } catch (error) {
    console.error("Error during scraping:", error);
  }
}

function filterText(text) {
  return `${text}.md`;
}

function addPost(title) {
  return `---
layout: post
title: "${title}"
date: "${new Date().toISOString()}"
---
`;
  return content;
}

function hash(str) {
  let hash = 5381;
  for (let i = str.length; i; ) {
    hash = (hash * 33) ^ str.charCodeAt(--i);
  }
  return hash >>> 0;
}

main().catch(console.error);