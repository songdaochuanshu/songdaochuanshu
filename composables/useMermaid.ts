/**
 * Mermaid diagram support for Markdown-rendered pages.
 *
 * `renderMermaidCode` is used by the marked renderer: it emits a plain
 * `<div class="mermaid">` holding the escaped diagram source, so the source is
 * never passed through the syntax highlighter (which would mangle arrows such
 * as `-->` and turn the diagram into coloured spans).
 *
 * `renderDiagrams` runs on the client only: it lazily imports mermaid, renders
 * every `.mermaid` node currently in the page with the active theme, and keeps
 * the original source around so the diagram can be re-rendered when the user
 * switches between light and dark mode. A diagram that fails to parse falls
 * back to a readable source block instead of breaking the whole page.
 */

type MermaidApi = {
  initialize: (config: Record<string, unknown>) => void
  render: (id: string, text: string) => Promise<{ svg: string; bindFunctions?: (element: Element) => void }>
}

const MERMAID_LANGUAGE = 'mermaid'
const MERMAID_FONT_FAMILY = "Inter, 'Noto Serif SC', 'PingFang SC', 'Microsoft YaHei', ui-sans-serif, system-ui, sans-serif"

// Module level cache: mermaid is a heavy dependency, load it at most once.
let mermaidApi: MermaidApi | null = null
let mermaidLoading: Promise<MermaidApi | null> | null = null
// Bumped on every render pass so a stale pass stops touching the DOM once a
// newer one (another article, another theme) has started.
let renderSequence = 0

export function escapeHtmlText(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

export function isMermaidLanguage(lang?: string | null): boolean {
  return (lang || '').trim().toLowerCase() === MERMAID_LANGUAGE
}

/** HTML for a ```mermaid fence: source kept verbatim for the client renderer. */
export function renderMermaidCode(code: string): string {
  return `<div class="mermaid">${escapeHtmlText(code)}</div>`
}

function loadMermaid(): Promise<MermaidApi | null> {
  if (!import.meta.client) return Promise.resolve(null)
  if (mermaidApi) return Promise.resolve(mermaidApi)
  if (!mermaidLoading) {
    mermaidLoading = import('mermaid')
      .then((module) => {
        const api = ((module as { default?: MermaidApi }).default || module) as unknown as MermaidApi
        mermaidApi = api
        return api
      })
      .catch((error) => {
        console.error('[mermaid] 加载失败：', error)
        mermaidLoading = null
        return null
      })
  }
  return mermaidLoading
}

export function useMermaid() {
  const { isDark } = useDarkMode()

  function activeTheme(): 'dark' | 'default' {
    // The `dark` class on <html> is what the page actually renders with, so it
    // wins over the stored preference while the theme is still initialising.
    if (import.meta.client && document.documentElement.classList.contains('dark')) return 'dark'
    return isDark.value ? 'dark' : 'default'
  }

  async function renderDiagrams(): Promise<void> {
    if (!import.meta.client) return

    const nodes = Array.from(document.querySelectorAll<HTMLElement>('.mermaid'))
    if (nodes.length === 0) return

    const theme = activeTheme()
    const pending = nodes.filter((node) => node.dataset.mermaidRendered !== '1' || node.dataset.mermaidTheme !== theme)
    if (pending.length === 0) return

    const mermaid = await loadMermaid()
    if (!mermaid) {
      // Keep the source visible rather than leaving an empty block.
      pending.forEach((node) => node.classList.add('mermaid-error'))
      return
    }

    mermaid.initialize({
      startOnLoad: false,
      theme,
      securityLevel: 'strict',
      fontFamily: MERMAID_FONT_FAMILY,
      themeVariables: { background: 'transparent' },
    })

    const sequence = ++renderSequence
    for (const [index, node] of pending.entries()) {
      if (!node.isConnected) continue

      if (!node.dataset.mermaidSource) node.dataset.mermaidSource = node.textContent || ''
      const source = node.dataset.mermaidSource || ''
      if (!source.trim()) continue

      const id = `mermaid-diagram-${sequence}-${index}`
      try {
        const { svg, bindFunctions } = await mermaid.render(id, source)
        if (sequence !== renderSequence || !node.isConnected) return
        node.innerHTML = svg
        node.dataset.mermaidRendered = '1'
        node.dataset.mermaidTheme = theme
        node.classList.add('mermaid-rendered')
        node.classList.remove('mermaid-error')
        bindFunctions?.(node)
      } catch (error) {
        if (sequence !== renderSequence || !node.isConnected) return
        console.error('[mermaid] 图表语法解析失败，已回退为源码显示：', error)
        // mermaid leaves the failed attempt behind as #d{id}; drop it.
        document.getElementById(`d${id}`)?.remove()
        node.innerHTML = `<pre class="mermaid-source"><code>${escapeHtmlText(source)}</code></pre>`
        delete node.dataset.mermaidRendered
        node.dataset.mermaidTheme = theme
        node.classList.remove('mermaid-rendered')
        node.classList.add('mermaid-error')
      }
    }
  }

  if (import.meta.client) {
    // Re-render with the new palette after a light/dark switch.
    watch(isDark, () => { nextTick(() => { void renderDiagrams() }) })
  }

  return { renderDiagrams, renderMermaidCode, isMermaidLanguage, escapeHtmlText }
}
