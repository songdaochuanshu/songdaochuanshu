const fs = require('node:fs')
const path = require('node:path')

const sourceFilePath = path.join(__dirname, '../README.md')

const targetFilePath = path.join(__dirname, '../content/me.md')

fs.readFile(sourceFilePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading README.md:', err)
    return
  }

  fs.writeFile(targetFilePath, data, (err) => {
    if (err)
      console.error('Error writing to me.md:', err)
    else
      console.log('Content from README.md has been copied to me.md')
  })
})
