// 测试 R2 连接 - 使用 S3 兼容 API
import { S3Client, ListObjectsV2Command } from '@aws-sdk/client-s3';

const accountId = 'd6397095e8c56098875c9b44f03fa970';
const accessKeyId = 'd6397095e8c56098875c9b44f03fa970';
const secretAccessKey = '05f63f...720c0c7509bee9443';
const bucketName = 'songdaochuanshu-static';

async function testR2S3() {
  try {
    const s3 = new S3Client({
      region: 'auto',
      endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
      tlsSocket: {
        alpnVersions: ['http/1.1']
      }
    });

    // 列出对象
    const listCommand = new ListObjectsV2Command({
      Bucket: bucketName,
    });

    const response = await s3.send(listCommand);
    console.log('✅ R2 S3 连接成功！');
    console.log('对象数量:', response.Contents?.length || 0);
    if (response.Contents) {
      response.Contents.forEach(obj => {
        console.log(`  - ${obj.Key} (${obj.Size} bytes)`);
      });
    }
  } catch (error) {
    console.error('❌ R2 S3 连接失败:', error.message);
  }
}

testR2S3();
