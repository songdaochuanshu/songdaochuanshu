// sync-images-action.mjs
import crypto from 'crypto';
import { writeFileSync, mkdirSync } from 'fs';

const accountId = process.env.R2_ACCOUNT_ID;
const accessKeyId = process.env.R2_ACCESS_KEY_ID;
const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;
const bucketName = process.env.R2_IMAGES_BUCKET || 'homepage-bg';
const cdnBase = 'https://img-homepage.openserve.cloud';
const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
const emptyPayloadHash = 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855';

// 虚拟托管风格域名
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

// 简易 XML 解析
function parseXmlObjects(xml) {
  const objects = [];
  const contents = xml.split('<Contents>');
  for (let i = 1; i < contents.length; i++) {
    const block = contents[i].split('</Contents>')[0];
    const keyMatch = block.match(/<Key>([^<]+)<\/Key>/);
    const sizeMatch = block.match(/<Size>(\d+)<\/Size>/);
    if (keyMatch) {
      objects.push({ key: keyMatch[1], size: parseInt(sizeMatch?.[1] || '0') });
    }
  }
  return objects;
}

function parseIsTruncated(xml) {
  return xml.includes('<IsTruncated>true</IsTruncated>');
}

function parseNextMarker(xml) {
  const match = xml.match(/<NextMarker>([^<]+)<\/NextMarker>/);
  return match ? match[1] : '';
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
    
    const canonicalUri = '/';
    const canonicalQueryString = query;
    const canonicalHeaders = 'host:' + host + '\nx-amz-content-sha256:' + emptyPayloadHash + '\nx-amz-date:' + amzDate + '\n';
    const signedHeaders = 'host;x-amz-content-sha256;x-amz-date';
    
    const canonicalRequest = 'GET\n' + canonicalUri + '\n' + canonicalQueryString + '\n' + canonicalHeaders + '\n' + signedHeaders + '\n' + emptyPayloadHash;
    
    const algorithm = 'AWS4-HMAC-SHA256';
    const credentialScope = dateStamp + '/auto/s3/aws4_request';
    const hashedCanonicalRequest = crypto.createHash('sha256').update(canonicalRequest).digest('hex');
    const stringToSign = algorithm + '\n' + amzDate + '\n' + credentialScope + '\n' + hashedCanonicalRequest;
    
    const signingKey = getSignatureKey(secretAccessKey, dateStamp);
    const signature = crypto.createHmac('sha256', signingKey).update(stringToSign).digest('hex');
    
    const authorization = algorithm + ' Credential=' + accessKeyId + '/' + credentialScope + ', SignedHeaders=' + signedHeaders + ', Signature=' + signature;
    
    const url = 'https://' + host + '/?' + query;
    
    const resp = await fetch(url, {
      headers: {
        'Authorization': authorization,
        'x-amz-content-sha256': emptyPayloadHash,
        'x-amz-date': amzDate,
        'Host': host,
      },
    });
    
    if (!resp.ok) {
      const errText = await resp.text();
      console.error('Request failed:', resp.status, errText);
      break;
    }
    
    const xml = await resp.text();
    const batch = parseXmlObjects(xml);
    objects.push(...batch);
    
    if (!parseIsTruncated(xml)) break;
    marker = parseNextMarker(xml);
    if (!marker && batch.length > 0) marker = batch[batch.length - 1].key;
    console.log('Fetched ' + objects.length + ' objects...');
  }
  
  return objects;
}

async function main() {
  console.log('Syncing images from R2 ' + bucketName + ' bucket...');
  console.log('Account: ' + accountId);
  
  const allObjects = await listAllObjects();
  console.log('Total files: ' + allObjects.length);
  
  const imageFiles = allObjects.filter(obj => {
    const ext = obj.key.toLowerCase().split('.').pop();
    return imageExtensions.includes('.' + ext);
  });
  
  console.log('Images: ' + imageFiles.length);
  
  const imagesInfo = imageFiles.map(obj => ({
    filename: obj.key.split('/').pop(),
    url: cdnBase + '/' + obj.key,
    size_kb: Math.round((obj.size || 0) / 1024),
  }));
  
  mkdirSync('public', { recursive: true });
  writeFileSync('public/images-info.json', JSON.stringify(imagesInfo, null, 2));
  console.log('Saved to public/images-info.json');
  
  const totalSizeMB = Math.round(imagesInfo.reduce((sum, img) => sum + img.size_kb, 0) / 1024);
  console.log('Total size: ' + totalSizeMB + ' MB');
}

main();
