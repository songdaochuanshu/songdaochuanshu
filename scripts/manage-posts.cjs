const fs = require('node:fs')
const path = require('node:path')

const postsDir = 'content/blog'
const maxFiles = 200

function getSortedPosts() {
  const files = fs.readdirSync(postsDir)
    .filter(file => file.endsWith('.md'))
    .map(file => ({
      name: file,
      mtime: fs.statSync(path.join(postsDir, file)).mtime,
    }))
    .sort((a, b) => a.mtime - b.mtime)

  return files
}

function removeExtraPosts(files) {
  if (files.length <= maxFiles) return

  const extraFiles = files.slice(0, files.length - maxFiles)
  for (const { name } of extraFiles) {
    try {
      fs.unlinkSync(path.join(postsDir, name))
      console.log(`Deleted: ${name}`)
    }
    catch (err) {
      console.error(`Failed to delete ${name}:`, err)
    }
  }
}

async function main() {
  try {
    const sortedPosts = getSortedPosts()
    removeExtraPosts(sortedPosts)
    console.log(`Managed posts directory. Now contains ${sortedPosts.length} files.`)
  }
  catch (err) {
    console.error('Error managing posts:', err)
  }
}

main()
