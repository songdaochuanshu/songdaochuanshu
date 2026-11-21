import { onUnmounted } from 'vue'

export function useImageLightbox() {
  let activeClose: (() => void) | null = null

  function bindLightbox() {
    if (!import.meta.client) return

    nextTick(() => {
      const images = document.querySelectorAll('.prose img')
      images.forEach((img) => {
        if ((img as HTMLElement).dataset.lightbox) return
        ;(img as HTMLElement).dataset.lightbox = 'true'
        img.style.cursor = 'zoom-in'

        img.addEventListener('click', () => {
          activeClose?.()

          const overlay = document.createElement('div')
          overlay.className = 'lightbox-overlay'
          overlay.innerHTML = `
            <div class="lightbox-backdrop"></div>
            <img src="${(img as HTMLImageElement).currentSrc || (img as HTMLImageElement).src}" class="lightbox-img" referrerpolicy="no-referrer" />
          `
          document.body.appendChild(overlay)
          document.body.style.overflow = 'hidden'

          let closed = false
          const onKeydown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') close()
          }
          const close = () => {
            if (closed) return
            closed = true
            document.removeEventListener('keydown', onKeydown)
            if (activeClose === close) activeClose = null
            overlay.classList.remove('lightbox-visible')
            setTimeout(() => {
              overlay.remove()
              document.body.style.overflow = ''
            }, 200)
          }

          activeClose = close
          requestAnimationFrame(() => overlay.classList.add('lightbox-visible'))
          overlay.querySelector('.lightbox-backdrop')?.addEventListener('click', close)
          document.addEventListener('keydown', onKeydown)
        })
      })
    })
  }

  onUnmounted(() => {
    activeClose?.()
    activeClose = null
  })

  return { bindLightbox }
}
