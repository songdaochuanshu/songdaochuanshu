// sync-images-action.mjs
// 从 R2 homepage-bg 桶同步所有图片到 images-info.json
import crypto from 'crypto';
import { writeFileSync, mkdirSync } from 'fs';

const accountId = process.env.R2_ACCOUNT_ID;
const accessKeyId = process.env.R2_ACCESS_KEY_ID;
const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;
const bucketName = process.env.R2_IMAGES_BUCKET || 'homepage-bg';
const cdnBase = 'https://img-homepage.openserve.cloud';
const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
const emptyPayloadHash = 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855';

function getSignatureKey(key, dateStamp) {
  const kDate = crypto.createHmac('sha256', 'AWS4' + key).update(dateStamp).digest();
  const kRegion = crypto.createHmac('sha256', kDate).update('auto').digest();
  const kService = crypto.createHmac('sha256', kRegion).update('s3').digest();
  const kSigning = crypto.createHmac('sha256', kService).update('aws4_request').digest();
  return kSigning;
}

function formatDate(date) {
  return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
}

async function listAllObjects() {
  const objects = [];
  let continuationToken = '';
  
  do {
    let query = 'list-type=2&max-keys=1000';
    if (continuationToken) query += '&continuation-token=' + encodeURIComponent(continuationToken);
    
    const now = new Date();
    const amzDate = formatDate(now);
    const dateStamp = amzDate.slice(0, 8);
    
    const canonicalUri = '/';
    const canonicalQueryString = query;
    const canonicalHeaders = 'host:' + accountId + '.r2.cloudflarestorage.com\nx-amz-content-sha256:' + emptyPayloadHash + '\nx-amz-date:' + amzDate + '\n';
    const signedHeaders = 'host;x-amz-content-sha256;x-amz-date';
    
    const canonicalRequest = 'GET\n' + canonicalUri + '\n' + canonicalQueryString + '\n' + canonicalHeaders + '\n' + signedHeaders + '\n' + emptyPayloadHash;
    
    const algorithm = 'AWS4-HMAC-SHA256';
    const credentialScope = dateStamp + '/auto/s3/aws4_request';
    const hashedCanonicalRequest = crypto.createHash('sha256').update(canonicalRequest).digest('hex');
    const stringToSign = algorithm + '\n' + amzDate + '\n' + credentialScope + '\n' + hashedCanonicalRequest;
    
    const signingKey = getSignatureKey(secretAccessKey, dateStamp);
    const signature = crypto.createHmac('sha256', signingKey).update(stringToSign).digest('hex');
    
    const authorization = algorithm + ' Credential=' + accessKeyId + '/' + credentialScope + ', SignedHeaders=' + signedHeaders + ', Signature=' + signature;
    
    const url = 'https://' + accountId + '.r2.cloudflarestorage.com/?' + query;
    
    const resp = await fetch(url, {
      headers: {
        'Authorization': authorization,
        'x-amz-content-sha256': emptyPayloadHash,
        'x-amz-date': amzDate,
        'Host': accountId + '.r2.cloudflarestorage.com',
      },
    });
    
    if (!resp.ok) {
      const errText = await resp.text();
      console.error('Request failed:', resp.status, errText);
      break;
    }
    
    const data = await resp.json();
    if (data.Contents) {
      for (const obj of data.Contents) {
        objects.push({ key: obj.Key, size: obj.Size });
      }
    }
    continuationToken = data.NextContinuationToken || '';
    console.log('Fetched ' + objects.length + ' objects...');
  } while (continuationToken);
  
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
