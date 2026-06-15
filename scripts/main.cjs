const scraperjs = require('scraperjs')
const fs = require('node:fs').promises
const path = require('node:path')
const TurndownService = require('turndown')

const turndownService = new TurndownService({})
require('dotenv').config()

const { POST_URL } = process.env

if (!POST_URL) {
  console.error('POST_URL is not set in the environment variables.')
  process.exit(1)
}

// 动态获取项目根目录，并指定posts目录的相对路径
const postsDir = path.resolve(__dirname, '../content/blog')

// 确保_posts目录存在
fs.mkdir(postsDir, { recursive: true }).catch((err) => {
  console.error('Error creating directory:', err)
})

// 正则表达式用于匹配标题行，并清理多余的引号和转义字符
const titlePattern = /^title:\s*(['"]*)(.*?)(['"]*)$/im

function cleanTitle(title) {
  // 去除最外层引号、转义符和前后空白字符
  return title.replace(/^["']|["']$/g, '').replace(/\\(["'])/g, '$1').trim()
}

async function scrapePost(href, originalTitle) {
  try {
    const data = await scraperjs.StaticScraper.create(href).scrape((q) => {
      return q('.post')
        .map(function () {
          q(this).find('.postDesc').remove()
          q(this).find('#cb_post_title_url').attr('href', '')
          return q(this).html()
        })
        .get()
    })

    // 清理标题
    const cleanedTitle = cleanTitle(originalTitle)

    const fileName = `${Date.now()}.md`
    const postContent = addPost(cleanedTitle) + turndownService.turndown(data[0])

    await fs.writeFile(path.join(postsDir, fileName), postContent)
    console.log(`Successfully saved ${fileName}`)
  }
  catch (error) {
    console.error(`Failed to scrape or save post from ${href}:`, error)
  }
}

async function main() {
  try {
    // 清理已有的.md文件中的非法字符
    await cleanAllPosts()

    // 抓取新文章并保存
    await scraperjs.StaticScraper.create(POST_URL).scrape(async ($) => {
      const posts = $('.post-item').toArray().map(item => ({
        title: $(item).find('.post-item-title').text().trim(),
        href: $(item).find('.post-item-title').attr('href'),
      }))

      const promises = posts.map(({ title, href }) => {
        if (title && href)
          return scrapePost(href, title)

        return Promise.resolve() // 返回一个已经完成的 Promise
      })

      // Wait for all posts to be scraped and saved
      await Promise.all(promises)
    })
  }
  catch (error) {
    console.error('Error during scraping:', error)
  }
}

function addPost(title) {
  const date = new Date()
  const formattedDate = date.toISOString().replace(/\.\d{3}Z$/, 'Z')
  return `---
layout: post
title: "${title}"
date: "${formattedDate}"
---
`
}

// 清理文件中的非法字符
async function cleanFileContent(filePath) {
  try {
    let content = await fs.readFile(filePath, 'utf-8')
    // 移除空字节和其他非法字符
    content = content.replace(/\x00/g, '')
    await fs.writeFile(filePath, content, 'utf-8')
    console.log(`Cleaned: ${filePath}`)
  }
  catch (err) {
    console.error(`Failed to clean ${filePath}:`, err)
  }
}

// 批量处理所有 .md 文件
async function cleanAllPosts() {
  const files = await fs.readdir(postsDir)
    .then(files => files.filter(file => file.endsWith('.md')))
    .then(files => files.map(file => path.join(postsDir, file)))

  await Promise.all(files.map(cleanFileContent))
}

main().catch(console.error)
