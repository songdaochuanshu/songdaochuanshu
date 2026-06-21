// 从 manifest.json 获取文章列表
const BASE_URL = 'https://blog-static.openserve.cloud';

async function getManifest() {
  const resp = await fetch(`${BASE_URL}/manifest.json`);
  return await resp.json();
}

async function getAllPosts() {
  const manifest = await getManifest();
  return manifest.posts;
}

getAllPosts().then(posts => {
  console.log(`Total posts: ${posts.length}`);
  console.log('\n=== blog/ ===');
  posts.filter(p => p.category === 'blog').slice(0, 5).forEach(p => {
    console.log(`  ${p.key} - ${p.title} (${p.date})`);
  });
  
  console.log('\n=== life/ ===');
  posts.filter(p => p.category === 'life').forEach(p => {
    console.log(`  ${p.key} - ${p.title} (${p.date})`);
  });
  
  console.log('\n=== record/ ===');
  posts.filter(p => p.category === 'record').forEach(p => {
    console.log(`  ${p.key} - ${p.title} (${p.date})`);
  });
});
