// check-lolicon.mjs
// 检查 R2 里的图片哪些来自 Lolicon API，哪些不是
import crypto from 'crypto';
import { writeFileSync, mkdirSync } from 'fs';

const accountId = process.env.R2_ACCOUNT_ID;
const accessKeyId = process.env.R2_ACCESS_KEY_ID;
const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;
const bucketName = process.env.R2_IMAGES_BUCKET || 'homepage-bg';
const emptyPayloadHash = 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855';
const host = bucketName + '.' + accountId + '.r2.cloudflarestorage.com';

function getSignatureKey(key, dateStamp) {
  const kDate = crypto.createHmac('sha256', 'AWS4' + key).update(dateStamp).digest();
  const kRegion = crypto.createHmac('sha256', kDate).update('auto').digest();
  const kService = crypto.createHmac('sha256', kRegion).update('s3').digest();
  return crypto.createHmac('sha256', kService).update('aws4_request').digest();
}

function formatDate(date) {
  return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
}

function parseXmlObjects(xml) {
  const objects = [];
  const contents = xml.split('<Contents>');
  for (let i = 1; i < contents.length; i++) {
    const block = contents[i].split('</Contents>')[0];
    const keyMatch = block.match(/<Key>([^<]+)<\/Key>/);
    const sizeMatch = block.match(/<Size>(\d+)<\/Size>/);
    if (keyMatch) objects.push({ key: keyMatch[1], size: parseInt(sizeMatch?.[1] || '0') });
  }
  return objects;
}

async function listAllObjects() {
  const objects = [];
  let marker = '';
  while (true) {
    let query = 'max-keys=1000';
    if (marker) query += '&marker=' + encodeURIComponent(marker);
    const now = new Date();
    const amzDate = formatDate(now);
    const dateStamp = amzDate.slice(0, 8);
    const canonicalHeaders = 'host:' + host + '\nx-amz-content-sha256:' + emptyPayloadHash + '\nx-amz-date:' + amzDate + '\n';
    const signedHeaders = 'host;x-amz-content-sha256;x-amz-date';
    const canonicalRequest = 'GET\n/\n' + query + '\n' + canonicalHeaders + '\n' + signedHeaders + '\n' + emptyPayloadHash;
    const algorithm = 'AWS4-HMAC-SHA256';
    const credentialScope = dateStamp + '/auto/s3/aws4_request';
    const hashedCanonicalRequest = crypto.createHash('sha256').update(canonicalRequest).digest('hex');
    const stringToSign = algorithm + '\n' + amzDate + '\n' + credentialScope + '\n' + hashedCanonicalRequest;
    const signingKey = getSignatureKey(secretAccessKey, dateStamp);
    const signature = crypto.createHmac('sha256', signingKey).update(stringToSign).digest('hex');
    const authorization = algorithm + ' Credential=' + accessKeyId + '/' + credentialScope + ', SignedHeaders=' + signedHeaders + ', Signature=' + signature;
    const url = 'https://' + host + '/?' + query;
    const resp = await fetch(url, {
      headers: { 'Authorization': authorization, 'x-amz-content-sha256': emptyPayloadHash, 'x-amz-date': amzDate, 'Host': host },
    });
    if (!resp.ok) { console.error('R2 request failed:', resp.status); break; }
    const xml = await resp.text();
    objects.push(...parseXmlObjects(xml));
    if (!xml.includes('<IsTruncated>true</IsTruncated>')) break;
    const nextMarkerMatch = xml.match(/<NextMarker>([^<]+)<\/NextMarker>/);
    marker = nextMarkerMatch ? nextMarkerMatch[1] : '';
    console.log('Fetched ' + objects.length + ' objects...');
  }
  return objects;
}

async function checkLolicon(pid) {
  try {
    const resp = await fetch('https://api.lolicon.app/setu/v2?num=1&pid=' + pid);
    if (resp.status === 403) {
      await new Promise(r => setTimeout(r, 2000));
      const resp2 = await fetch('https://api.lolicon.app/setu/v2?num=1&pid=' + pid);
      const data = await resp2.json();
      return data.data && data.data.length > 0;
    }
    const data = await resp.json();
    return data.data && data.data.length > 0;
  } catch (e) {
    return null;
  }
}

async function main() {
  console.log('Fetching all images from R2...');
  const allObjects = await listAllObjects();
  console.log('Total files: ' + allObjects.length);
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
  const imageFiles = allObjects.filter(obj => {
    const ext = obj.key.toLowerCase().split('.').pop();
    return imageExtensions.includes('.' + ext);
  });
  console.log('Images: ' + imageFiles.length);
  const loliconImages = [];
  const nonLoliconImages = [];
  for (let i = 0; i < imageFiles.length; i++) {
    const obj = imageFiles[i];
    const filename = obj.key.split('/').pop();
    const pid = filename.replace(/\.[^.]+$/, '');
    process.stdout.write('[' + (i + 1) + '/' + imageFiles.length + '] Checking ' + pid + '... ');
    const exists = await checkLolicon(pid);
    if (exists === true) {
      console.log('Lolicon');
      loliconImages.push({ filename, pid, size_kb: Math.round((obj.size || 0) / 1024) });
    } else if (exists === false) {
      console.log('NOT Lolicon');
      nonLoliconImages.push({ filename, pid, size_kb: Math.round((obj.size || 0) / 1024), url: 'https://img-homepage.openserve.cloud/' + obj.key });
    } else {
      console.log('Error');
    }
    await new Promise(r => setTimeout(r, 1500));
  }
  console.log('\n========== 结果 ==========');
  console.log('Lolicon: ' + loliconImages.length);
  console.log('非 Lolicon: ' + nonLoliconImages.length);
  mkdirSync('public', { recursive: true });
  writeFileSync('public/non-lolicon-images.json', JSON.stringify(nonLoliconImages, null, 2));
  console.log('Saved to public/non-lolicon-images.json');
}

main();
