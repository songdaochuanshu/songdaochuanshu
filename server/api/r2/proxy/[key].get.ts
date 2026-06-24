export default defineEventHandler(async (event) => {
  const key = getRouterParam(event, 'key') || 'manifest.json'
  const target = `https://blog-static.openserve.cloud/${key}`

  try {
    const res = await $fetch(target, {
      method: 'GET',
      responseType: key.endsWith('.md') ? 'text' : 'json',
    })
    return res
  } catch (err: any) {
    throw createError({
      statusCode: 502,
      statusMessage: `R2 fetch failed: ${err.message}`,
    })
  }
})
