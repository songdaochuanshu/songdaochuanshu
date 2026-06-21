// 测试 R2 直接访问
const publicUrl = 'https://pub-ba3e6b3710404683b4c408cab6dc42a2.r2.dev';

async function testDirectAccess() {
  try {
    // 尝试访问根目录
    const response = await fetch(publicUrl);
    console.log('状态码:', response.status);
    console.log('响应头:', response.headers);
    
    // 尝试访问具体文件
    const meResponse = await fetch(`${publicUrl}/me.md`);
    console.log('me.md 状态码:', meResponse.status);
    if (meResponse.ok) {
      const content = await meResponse.text();
      console.log('me.md 内容:', content);
    }
  } catch (error) {
    console.error('访问失败:', error.message);
  }
}

testDirectAccess();
