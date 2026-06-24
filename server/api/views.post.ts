import { useStorage } from '#imports'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const key = body?.key
  if (!key) {
    throw createError({ statusCode: 400, message: 'Missing key in body' })
  }

  const storage = useStorage('data')
  const viewsKey = `views:${key}`
  const current = (await storage.getItem<number>(viewsKey)) || 0
  const updated = current + 1
  await storage.setItem(viewsKey, updated)

  return { key, views: updated }
})
