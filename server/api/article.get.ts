import { createError, defineEventHandler, getQuery, setHeader } from 'h3'
import { fetchManifest, fetchPost } from '../utils/blog'

function isSafeArticleKey(key: string): boolean {
  const segments = key.split('/')
  return (
    key.startsWith('blog/') &&
    key.endsWith('.md') &&
    !/[\\?#\u0000]/.test(key) &&
    segments.length >= 2 &&
    segments.every((segment) => segment !== '' && segment !== '.' && segment !== '..')
  )
}

export default defineEventHandler(async (event) => {
  const requestedKey = getQuery(event).key
  if (typeof requestedKey !== 'string' || !isSafeArticleKey(requestedKey)) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid article key' })
  }

  let manifest
  try {
    manifest = await fetchManifest()
  } catch (error) {
    throw createError({ statusCode: 502, statusMessage: 'Article index unavailable', cause: error })
  }

  if (!manifest.posts.some((post) => post.key === requestedKey)) {
    throw createError({ statusCode: 404, statusMessage: 'Article not found' })
  }

  try {
    const content = await fetchPost(requestedKey)
    setHeader(event, 'Content-Type', 'text/markdown; charset=utf-8')
    return content
  } catch (error) {
    throw createError({ statusCode: 502, statusMessage: 'Article source unavailable', cause: error })
  }
})
