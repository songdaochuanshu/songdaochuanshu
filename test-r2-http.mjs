// 测试 R2 连接 - 使用 Cloudflare HTTP API
const accountId = process.env.R2_ACCOUNT_ID;
const bucketName = process.env.R2_BUCKET_NAME;
const token = process.env.CLOUDFLARE_READ_TOKEN;

async function testR2HTTP() {
  const missing = [
    ['R2_ACCOUNT_ID', accountId],
    ['R2_BUCKET_NAME', bucketName],
    ['CLOUDFLARE_READ_TOKEN', token],
  ]
    .filter(([, value]) => !value)
    .map(([name]) => name);

  if (missing.length) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }

  try {
    const url = `https://api.cloudflare.com/client/v4/accounts/${accountId}/r2/buckets/${bucketName}/objects`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Cloudflare API request failed: HTTP ${response.status}`);
    }

    const data = await response.json();
    console.log('R2 HTTP connection succeeded.');
    console.log('Object count:', data.result?.length || 0);
    if (data.result) {
      data.result.forEach((obj) => console.log(`  - ${obj.key} (${obj.size} bytes)`));
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('R2 HTTP connection failed:', message);
    process.exitCode = 1;
  }
}

void testR2HTTP();
