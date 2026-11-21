const allowedObjects = new Set(['me.md', 'friends.json'])
const R2_BASE_URL = 'https://blog-static.openserve.cloud'

export default defineEventHandler(async (event) => {
  const name = getRouterParam(event, 'name') || ''
  if (!allowedObjects.has(name)) {
    throw createError({ statusCode: 404, statusMessage: 'Object not found' })
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
