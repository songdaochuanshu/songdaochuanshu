// R2 配置
import { createClient } from '@cloudflare/workers-types';

interface Env {
  R2_BUCKET: R2Bucket;
}

export async function listPosts(context: { env: Env }) {
  const bucket = context.env.R2_BUCKET;
  
  // 列出所有 Markdown 文件
  const objects = await bucket.list({
    prefix: '',
    delimiter: '/',
  });
  
  return objects.keys;
}

export async function getPost(context: { env: Env }, key: string) {
  const bucket = context.env.R2_BUCKET;
  const object = await bucket.get(key);
  
  if (!object) {
    return null;
  }
  
  return await object.text();
}
