export function useCodeCopy() {
  function addCopyButtons(containerRef: Ref<string>) {
    watch(containerRef, () => {
      nextTick(() => {
        const containers = document.querySelectorAll('.prose pre')
        containers.forEach((pre) => {
          if (pre.querySelector('.code-copy-btn')) return
          const btn = document.createElement('button')
          btn.className = 'code-copy-btn'
          btn.textContent = '复制'
          btn.addEventListener('click', () => {
            const code = pre.querySelector('code')
            if (!code) return
            navigator.clipboard.writeText(code.textContent || '').then(() => {
              btn.textContent = '已复制 ✓'
              btn.classList.add('copied')
              setTimeout(() => {
                btn.textContent = '复制'
                btn.classList.remove('copied')
              }, 2000)
            })
          })
          pre.style.position = 'relative'
          pre.appendChild(btn)
        })
      })
    })
  }

  return { addCopyButtons }
}
