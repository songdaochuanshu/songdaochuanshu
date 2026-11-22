import { defineEventHandler, getRouterParam, createError, setResponseHeader } from 'h3'
import { getFriendBucket, readFriendLinks } from '../../utils/friend-links'

const allowedObjects = new Set(['me.md', 'friends.json'])
const R2_BASE_URL = 'https://blog-static.openserve.cloud'

export default defineEventHandler(async (event) => {
  const name = getRouterParam(event, 'name') || ''
  if (!allowedObjects.has(name)) {
    throw createError({ statusCode: 404, statusMessage: 'Object not found' })
  }

  // 友链走 R2 绑定直读，并禁用缓存，保证审批通过后前台立刻可见
  if (name === 'friends.json') {
    setResponseHeader(event, 'Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0')
    const bucket = getFriendBucket(event)
    if (bucket) {
      try {
        const links = await readFriendLinks(bucket)
        return { links }
      } catch (error) {
        console.error('[content] 从 R2 绑定读取 friends.json 失败，回退到公共地址', error)
      }
    }
  }

  try {
    return await $fetch(`${R2_BASE_URL}/${name}`, {
      responseType: name.endsWith('.md') ? 'text' : 'json',
      headers: { Accept: name.endsWith('.json') ? 'application/json' : 'text/markdown' },
    })
  } catch (error) {
    throw createError({ statusCode: 502, statusMessage: 'Content source unavailable', cause: error })
  }
})
