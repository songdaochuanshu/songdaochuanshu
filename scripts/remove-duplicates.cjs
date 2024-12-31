const fs = require('node:fs')
const path = require('node:path')
const natural = require('natural')
const marked = require('marked')
const cosineSimilarity = require('cosine-similarity')

// 文章所在的目录（相对于当前脚本文件）
const articlesDir = path.join(__dirname, '../content/blog')
const similarityThreshold = 0.85 // 相似度阈值，超过此值认为是重复

// 读取并解析 Markdown 文件为纯文本
function readAndParseMarkdown(directory) {
  return fs.readdirSync(directory).map((file) => {
    if (path.extname(file) === '.md') {
      const filePath = path.join(directory, file)
      const content = fs.readFileSync(filePath, 'utf-8')
      const parsedContent = marked.parse(content)
      return { name: file, content: parsedContent }
    }
    return null
  }).filter(Boolean) // 移除非 .md 文件
}

// 计算两个文本之间的相似度
function calculateSimilarity(text1, text2) {
  const tokenizer = new natural.WordTokenizer()
  const words1 = tokenizer.tokenize(text1.toLowerCase())
  const words2 = tokenizer.tokenize(text2.toLowerCase())

  // 使用余弦相似度计算
  const vector1 = words1.reduce((acc, word) => {
    acc[word] = (acc[word] || 0) + 1
    return acc
  }, {})

  const vector2 = words2.reduce((acc, word) => {
    acc[word] = (acc[word] || 0) + 1
    return acc
  }, {})

  const similarity = cosineSimilarity(Object.values(vector1), Object.values(vector2))
  return similarity
}

// 查找并删除重复文章
function removeDuplicates(articles) {
  const toDelete = new Set()

  for (let i = 0; i < articles.length; i++) {
    for (let j = i + 1; j < articles.length; j++) {
      const similarity = calculateSimilarity(articles[i].content, articles[j].content)
      if (similarity > similarityThreshold) {
        console.log(`Found duplicate: ${articles[i].name} and ${articles[j].name} with similarity ${similarity}`)
        toDelete.add(articles[j].name)
      }
    }
  }

  // 删除重复的文章文件
  toDelete.forEach((fileName) => {
    const filePath = path.join(articlesDir, fileName)
    fs.unlinkSync(filePath)
    console.log(`Deleted file: ${fileName}`)
  })
}

// 读取所有 Markdown 文章
const articles = readAndParseMarkdown(articlesDir)

// 执行去重操作
removeDuplicates(articles)
