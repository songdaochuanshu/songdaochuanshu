const fs = require('fs');
const path = require('path');

const postsDir = path.join(__dirname, 'source', '_posts');

function fixFrontMatter(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  let fixedContent = '';

  for (let line of lines) {
    if (line.startsWith('title:')) {
      // Remove invalid characters and escape quotes
      const titleValue = line.substring(7).trim();
      const fixedTitleValue = titleValue.replace(/\x1D/g, '').replace(/"/g, '\\"');
      fixedContent += `title: "${fixedTitleValue}"\n`;
    } else {
      fixedContent += `${line}\n`;
    }
  }

  fs.writeFileSync(filePath, fixedContent, 'utf-8');
}

function processPostsDirectory(dirPath) {
  if (!fs.existsSync(dirPath)) {
    console.log(`Directory ${dirPath} does not exist.`);
    return;
  }

  fs.readdirSync(dirPath).forEach(file => {
    const filePath = path.join(dirPath, file);
    if (fs.statSync(filePath).isFile()) {
      fixFrontMatter(filePath);
    }
  });
}

processPostsDirectory(postsDir);
console.log('Front matter fixed in all posts.');