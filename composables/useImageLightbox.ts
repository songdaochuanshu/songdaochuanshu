export function useImageLightbox() {
  function bindLightbox() {
    if (!import.meta.client) return

    nextTick(() => {
      const images = document.querySelectorAll('.prose img')
      images.forEach((img) => {
        if ((img as HTMLElement).dataset.lightbox) return
        ;(img as HTMLElement).dataset.lightbox = 'true'
        img.style.cursor = 'zoom-in'

        img.addEventListener('click', () => {
          const overlay = document.createElement('div')
          overlay.className = 'lightbox-overlay'
          overlay.innerHTML = `
            <div class="lightbox-backdrop"></div>
            <img src="${(img as HTMLImageElement).src}" class="lightbox-img" />
          `
          document.body.appendChild(overlay)
          document.body.style.overflow = 'hidden'

          requestAnimationFrame(() => {
            overlay.classList.add('lightbox-visible')
          })

          const close = () => {
            overlay.classList.remove('lightbox-visible')
            setTimeout(() => {
              overlay.remove()
              document.body.style.overflow = ''
            }, 200)
          }

          overlay.querySelector('.lightbox-backdrop')!.addEventListener('click', close)
          overlay.addEventListener('keydown', (e) => { if (e.key === 'Escape') close() })
          document.addEventListener('keydown', function handler(e) {
            if (e.key === 'Escape') {
              close()
              document.removeEventListener('keydown', handler)
            }
          })
        })
      })
    })
  }

  return { bindLightbox }
}
