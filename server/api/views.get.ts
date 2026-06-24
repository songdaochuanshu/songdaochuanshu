import { useStorage } from '#imports'

export default defineEventHandler(async (event) => {
  const key = getQuery(event).key as string
  if (!key) {
    throw createError({ statusCode: 400, message: 'Missing key parameter' })
  }

  const storage = useStorage('data')
  const viewsKey = `views:${key}`
  const current = (await storage.getItem<number>(viewsKey)) || 0

  return { key, views: current }
})
