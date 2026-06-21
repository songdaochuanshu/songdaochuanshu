// 获取 R2 文件列表 - 用 R2 S3 兼容 API
const crypto = await import('crypto');

const accountId = 'd6397095e8c56098875c9b44f03fa970';
const accessKeyId = 'd6397095e8c56098875c9b44f03fa970';
const secretAccessKey = '05f63f71de77fe3b561a935c7995319733c832735545c58720c0c7509bee9443';
const bucketName = 'songdaochuanshu-static';

async function getList() {
  const date = new Date();
  const amzDate = date.toISOString().replace(/[:-]|\.\d{3}/g, '');
  const dateStamp = date.toISOString().split('T')[0];
  
  // 构建 canonical request
  const method = 'GET';
  const uri = `/r2/buckets/${bucketName}/objects`;
  const querystring = 'delimiter=/&encoding-type=url&list-type=2&prefix=';
  const canonicalHeaders = `host:${accountId}.r2.cloudflarestorage.com\nx-amz-date:${amzDate}\n`;
  const signedHeaders = 'host;x-amz-date';
  const payloadHash = 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855';
  
  const canonicalRequest = `${method}\n${uri}\n${querystring}\n${canonicalHeaders}\n${signedHeaders}\n${payloadHash}`;
  
  // 计算签名
  const algorithm = 'AWS4-HMAC-SHA256';
  const credentialScope = `${dateStamp}/auto/s3/aws4_request`;
  const hashedCanonicalRequest = crypto.createHash('sha256').update(canonicalRequest).digest('hex');
  const stringToSign = `${algorithm}\n${amzDate}\n${credentialScope}\n${hashedCanonicalRequest}`;
  
  const kDate = crypto.createHmac('sha256', `AWS4${secretAccessKey}`).update(dateStamp).digest();
  const kRegion = crypto.createHmac('sha256', kDate).update('auto').digest();
  const kService = crypto.createHmac('sha256', kRegion).update('s3').digest();
  const kSigning = crypto.createHmac('sha256', kService).update('aws4_request').digest();
  const signature = crypto.createHmac('sha256', kSigning).update(stringToSign).digest('hex');
  
  const authorization = `${algorithm} Credential=${accessKeyId}/${credentialScope}, SignedHeaders=${signedHeaders}, Signature=${signature}`;
  
  // 发送请求
  const url = `https://${accountId}.r2.cloudflarestorage.com/r2/buckets/${bucketName}/objects?delimiter=/&encoding-type=url&list-type=2&prefix=`;
  
  const resp = await fetch(url, {
    headers: {
      'Authorization': authorization,
      'x-amz-date': amzDate,
      'Host': `${accountId}.r2.cloudflarestorage.com`,
    },
  });
  
  console.log('Status:', resp.status);
  const text = await resp.text();
  console.log('Response:', text.substring(0, 1000));
}

getList();
