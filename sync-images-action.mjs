// sync-images-action.mjs
// 从 R2 桶同步所有图片到 images-info.json
// 在 GitHub Actions 中运行

import crypto from 'crypto';
import { writeFileSync } from 'fs';

const accountId = process.env.R2_ACCOUNT_ID;
const accessKeyId = process.env.R2_ACCESS_KEY_ID;
const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;
const bucketName = process.env.R2_BUCKET_NAME || 'songdaochuanshu-static';
const cdnBase = 'https://img-homepage.openserve.cloud';
const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];

function aws4Sign(method, path, query, date) {
  const amzDate = date.toISOString().replace(/[:-] | \.\d{3}/g, '');
  const dateStamp = date.toISOString().split('T')[0];
  const canonicalHeaders = `host:${accountId}.r2.cloudflarestorage.com\nx-amz-date:${amzDate}\n`;
  const signedHeaders = 'host;x-amz-date';
  const payloadHash = 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855';
  const canonicalRequest = `${method}\n${path}\n${query}\n${canonicalHeaders}\n${signedHeaders}\n${payloadHash}`;
  const algorithm = 'AWS4-HMAC-SHA256';
  const credentialScope = `${dateStamp}/auto/s3/aws4_request`;
  const hashedCanonicalRequest = crypto.createHash('sha256').update(canonicalRequest).digest('hex');
  const stringToSign = `${algorithm}\n${amzDate}\n${credentialScope}\n${hashedCanonicalRequest}`;
  const kDate = crypto.createHmac('sha256', `AWS4${secretAccessKey}`).update(dateStamp).digest();
  const kRegion = crypto.createHmac('sha256', kDate).update('auto').digest();
  const kService = crypto.createHmac('sha256', kRegion).update('s3').digest();
  const kSigning = crypto.createHmac('sha256', kService).update('aws4_request').digest();
  const signature = crypto.createHmac('sha256', kSigning).update(stringToSign).digest('hex');
  return {
    authorization: `${algorithm} Credential=${accessKeyId}/${credentialScope}, SignedHeaders=${signedHeaders}, Signature=${signature}`,
    amzDate,
  };
}

async function listAllObjects() {
  const objects = [];
  let continuationToken = '';
  do {
    let query = 'list-type=2&prefix=images/';
    if (continuationToken) query += `&continuation-token=${encodeURIComponent(continuationToken)}`;
    const date = new Date();
    const { authorization, amzDate } = aws4Sign('GET', `/r2/buckets/${bucketName}/objects`, query, date);
    const url = `https://${accountId}.r2.cloudflarestorage.com/r2/buckets/${bucketName}/objects?${query}`;
    const resp = await fetch(url, {
      headers: {
        'Authorization': authorization,
        'x-amz-date': amzDate,
        'Host': `${accountId}.r2.cloudflarestorage.com`,
      },
    });
    if (!resp.ok) {
      console.error('Request failed:', resp.status, await resp.text());
      break;
    }
    const data = await resp.json();
    if (data.objects) objects.push(...data.objects);
    continuationToken = data.continuation_token || '';
    console.log(`Fetched ${objects.length} objects...`);
  } while (continuationToken);
  return objects;
}

async function main() {
  console.log('🔄 Syncing images from R2...');
  console.log(`Bucket: ${bucketName}`);
  console.log(`Account: ${accountId}`);
  
  const allObjects = await listAllObjects();
  console.log(`📦 Total files: ${allObjects.length}`);
  
  const imageFiles = allObjects.filter(obj => {
    const ext = obj.key.toLowerCase().split('.').pop();
    return imageExtensions.includes(`.${ext}`);
  });
  
  console.log(`🖼️ Images: ${imageFiles.length}`);
  
  const imagesInfo = imageFiles.map(obj => ({
    filename: obj.key.split('/').pop(),
    url: `${cdnBase}/${obj.key}`,
    size_kb: Math.round((obj.size || 0) / 1024),
  }));
  
  writeFileSync('public/images-info.json', JSON.stringify(imagesInfo, null, 2));
  console.log('✅ Saved to public/images-info.json');
  
  // 统计
  const totalSizeMB = Math.round(imagesInfo.reduce((sum, img) => sum + img.size_kb, 0) / 1024);
  console.log(`📊 Total size: ${totalSizeMB} MB`);
  console.log(`📊 Average size: ${Math.round(imagesInfo.reduce((sum, img) => sum + img.size_kb, 0) / imagesInfo.length)} KB`);
}

main();
