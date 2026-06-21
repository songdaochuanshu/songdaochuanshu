// 测试 R2 连接 - 使用 Cloudflare HTTP API
const accountId = 'd6397095e8c56098875c9b44f03fa970';
const bucketName = 'songdaochuanshu-static';
const token = 'cfat_M...602';

async function testR2HTTP() {
  try {
    // 列出根目录下的对象
    const url = `https://api.cloudflare.com/client/v4/accounts/${accountId}/r2/buckets/${bucketName}/objects`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API request failed: ${response.status} - ${errorText}`);
    }
    
    const data = await response.json();
    console.log('✅ R2 HTTP 连接成功！');
    console.log('对象数量:', data.result?.length || 0);
    if (data.result) {
      data.result.forEach(obj => {
        console.log(`  - ${obj.key} (${obj.size} bytes)`);
      });
    }
  } catch (error) {
    console.error('❌ R2 HTTP 连接失败:', error.message);
  }
}

testR2HTTP();
