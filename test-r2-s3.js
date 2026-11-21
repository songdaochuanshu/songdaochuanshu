// 测试 R2 连接 - 凭据仅从环境变量读取，不输出凭据
const { S3Client, ListObjectsV2Command } = require('@aws-sdk/client-s3');
const accountId = process.env.R2_ACCOUNT_ID;
const accessKeyId = process.env.R2_ACCESS_KEY_ID;
const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;
const bucketName = process.env.R2_BUCKET_NAME;
for (const [name, value] of Object.entries({ R2_ACCOUNT_ID: accountId, R2_ACCESS_KEY_ID: accessKeyId, R2_SECRET_ACCESS_KEY: secretAccessKey, R2_BUCKET_NAME: bucketName })) {
  if (!value) throw new Error(`${name} is required`);
}
async function testR2S3() {
  try {
    const s3 = new S3Client({ region: 'auto', endpoint: `https://${accountId}.r2.cloudflarestorage.com`, credentials: { accessKeyId, secretAccessKey }, forcePathStyle: true });
    const response = await s3.send(new ListObjectsV2Command({ Bucket: bucketName }));
    console.log('R2 S3 连接成功！对象数量:', response.Contents?.length || 0);
  } catch (error) {
    console.error('R2 S3 连接失败:', error instanceof Error ? error.message : 'unknown error');
    process.exitCode = 1;
  }
}
testR2S3();
