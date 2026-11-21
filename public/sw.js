const CACHE_NAME = 'blog-v2'
const STATIC_ASSETS = ['/', '/archive', '/categories', '/tags', '/me']
self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS)))
  self.skipWaiting()
})
self.addEventListener('activate', (event) => {
  event.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))))
  self.clients.claim()
})
self.addEventListener('fetch', (event) => {
  const { request } = event
  if (request.method !== 'GET') return
  const url = new URL(request.url)
  // API responses must never be served from the persistent static cache.
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(fetch(request))
    return
  }
  if (request.headers.get('accept')?.includes('text/html') || url.pathname.endsWith('manifest.json')) {
    event.respondWith(fetch(request).then((response) => {
      const clone = response.clone()
      caches.open(CACHE_NAME).then((cache) => cache.put(request, clone))
      return response
    }).catch(() => caches.match(request).then((cached) => cached || new Response('Offline', { status: 503 }))))
    return
  }
  event.respondWith(caches.match(request).then((cached) => cached || fetch(request).then((response) => {
    if (response.ok) { const clone = response.clone(); caches.open(CACHE_NAME).then((cache) => cache.put(request, clone)) }
    return response
  })))
})
