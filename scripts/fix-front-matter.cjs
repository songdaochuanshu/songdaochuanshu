const fs = require('node:fs')
const path = require('node:path')

const postsDir = path.resolve(__dirname, '../content/blog')
// 检查posts目录是否存在
if (!fs.existsSync(postsDir)) {
  console.error(`The directory "${postsDir}" does not exist.`)
  process.exit(1)
}

// 正则表达式用于匹配标题行，并清理多余的引号和转义字符
const titlePattern = /^title:\s*(['"]*)(.*?)(['"]*)$/im

function cleanTitle(title) {
  let cleanedTitle = title
  let changesMade

  do {
    changesMade = false

    // 去除最外层引号
    const outerQuotesRemoved = cleanedTitle.replace(/^["']|["']$/g, '')
    if (outerQuotesRemoved !== cleanedTitle) {
      cleanedTitle = outerQuotesRemoved
      changesMade = true
    }

    // 去除转义符但保留引号本身
    const unescapedQuotesRemoved = cleanedTitle.replace(/\\(["'])/g, '$1')
    if (unescapedQuotesRemoved !== cleanedTitle) {
      cleanedTitle = unescapedQuotesRemoved
      changesMade = true
    }

    // 再次去除可能残留的引号
    const innerQuotesRemoved = cleanedTitle.replace(/^['"]+|['"]+$/g, '')
    if (innerQuotesRemoved !== cleanedTitle) {
      cleanedTitle = innerQuotesRemoved
      changesMade = true
    }

    // 去除多余的反斜杠
    const slashesRemoved = cleanedTitle.replace(/\\+/g, '')
    if (slashesRemoved !== cleanedTitle) {
      cleanedTitle = slashesRemoved
      changesMade = true
    }

    // 去除前后空白字符
    const trimmed = cleanedTitle.trim()
    if (trimmed !== cleanedTitle) {
      cleanedTitle = trimmed
      changesMade = true
    }
  } while (changesMade)

  return cleanedTitle
}

function processFile(filePath) {
  try {
    // 读取文件内容
    let content = fs.readFileSync(filePath, 'utf8')

    // 使用正则表达式匹配并提取front matter
    const frontMatterMatch = content.match(/---\s*\n([\s\S]*?)\n---/)

    if (frontMatterMatch) {
      let frontMatter = frontMatterMatch[1]
      // 匹配并修正title字段
      frontMatter = frontMatter.replace(titlePattern, (match, quotesStart, title, quotesEnd) => {
        const cleanedTitle = cleanTitle(title)
        console.log(`Original title: ${title}\nCleaned title: ${cleanedTitle}`)
        return `title: '${cleanedTitle}'`
      })

      // 更新文件内容
      content = content.replace(frontMatterMatch[0], `---\n${frontMatter}\n---`)
      fs.writeFileSync(filePath, content, 'utf8')
      console.log(`Processed file: ${filePath}`)
    }
    else {
      console.warn(`No front matter found in file: ${filePath}`)
    }
  }
  catch (err) {
    console.error(`Error processing file ${filePath}:`, err)
  }
}

try {
  // 遍历_posts目录下的所有.md文件
  const files = fs.readdirSync(postsDir)
  files.forEach((file) => {
    if (file.endsWith('.md')) {
      const filePath = path.join(postsDir, file)
      processFile(filePath)
    }
  })
  console.log('All files have been processed.')
}
catch (err) {
  console.error('Error reading directory:', err)
}
