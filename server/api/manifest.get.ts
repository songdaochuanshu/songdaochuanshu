import { defineEventHandler, createError } from 'h3'
import { fetchManifest } from '../utils/blog'

export default defineEventHandler(async () => {
  try {
    return await fetchManifest()
  } catch (error) {
    throw createError({ statusCode: 502, statusMessage: 'Failed to fetch manifest', cause: error })
  }
})
