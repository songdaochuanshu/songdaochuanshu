/*
 * @Descripttion: 
 * @version: 
 * @Author: MiKin
 * @Date: 2022-03-11 13:46:22
 * @LastEditors: MiKin
 * @LastEditTime: 2022-03-11 14:27:32
 * @FilePath: \songdaochuanshu\build.js
 */
const fs = require('fs')
const path = require('path')
const postsDir = path.join(__dirname, '/src/pages/_posts')
const files = fs.readdirSync(postsDir)
const posts = files.map((file) => {
  const filePath = path.join(postsDir, file)
  const stat = fs.statSync(filePath)
  const isFile = stat.isFile()
  if (isFile) {
    const routePath = file.replace(/\.md$/, '')
    const content = fs.readFileSync(filePath, 'utf-8')
    const reg = /---\r\n([\s\S]*?)\r\n---/
    const match = content.match(reg)
    return {
      match: match?.[1] ?? '',
      path: routePath === 'index' ? '/' : `/${routePath}`,
    }
  }
})
const titleReg = /title: (.*)/
const dateReg = /date: (.*)/

const list = posts.map((post) => {
  const title = post.match.match(titleReg)?.[1] ?? new Date()
  const date = post.match.match(dateReg)?.[1] ?? new Date()
  return {
    title,
    date,
    path: post.path,
  }
})

console.log(list)

const json = JSON.stringify(list)
const jsonPath = path.join(__dirname, '/src/maps/list.json')
if (fs.existsSync(jsonPath)) {
  fs.writeFileSync(jsonPath, json)
} else {
  fs.writeFileSync(jsonPath, json)
}


const readmePath = path.join(__dirname, '/README.md')
const readmeContent = fs.readFileSync(readmePath, 'utf-8')
const readmeFile = path.join(__dirname, '/src/pages/about.md')
fs.writeFileSync(readmeFile, readmeContent)
