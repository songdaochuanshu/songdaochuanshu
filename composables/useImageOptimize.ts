/**
 * Image CDN optimization helpers.
 * Adds lazy loading, decoding, and optional srcset for responsive images.
 * For Cloudflare Image Resizing, prepend /cdn-cgi/image/ to the URL.
 */

export function useImageOptimize() {
  /**
   * Process HTML content to add optimization attributes to images.
   */
  function optimizeImages(html: string): string {
    return html.replace(/<img ([^>]*)>/gi, (match, attrs) => {
      // Skip if already processed
      if (attrs.includes('decoding')) return match

      // Add lazy loading and async decoding
      let optimized = attrs
      if (!optimized.includes('loading=')) {
        optimized += ' loading="lazy"'
      }
      if (!optimized.includes('decoding=')) {
        optimized += ' decoding="async"'
      }

      return `<img ${optimized}>`
    })
  }

  return { optimizeImages }
}
