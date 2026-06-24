/**
 * Lightweight syntax highlighting via marked custom renderer.
 * Adds CSS classes to code tokens for styling — no external dependencies.
 */

const TOKEN_PATTERNS: [RegExp, string][] = [
  // Comments
  [/\/\/.*$/gm, 'hljs-comment'],
  [/\/\*[\s\S]*?\*\//gm, 'hljs-comment'],
  [/#.*$/gm, 'hljs-comment'],
  // Strings
  [/(["'`])(?:(?!\1|\\).|\\.)*\1/g, 'hljs-string'],
  // Numbers
  [/\b\d+\.?\d*(?:e[+-]?\d+)?\b/gi, 'hljs-number'],
  // Keywords
  [/\b(?:const|let|var|function|return|if|else|for|while|do|switch|case|break|continue|new|this|class|extends|import|export|default|from|async|await|try|catch|finally|throw|typeof|instanceof|in|of|yield|void|delete|null|undefined|true|false|NaN|Infinity)\b/g, 'hljs-keyword'],
  // Types / built-ins
  [/\b(?:console|window|document|Math|JSON|Promise|Array|Object|String|Number|Boolean|Map|Set|Symbol|RegExp|Error|Date|Proxy|Reflect|globalThis|process|require|module|exports|__dirname|__filename)\b/g, 'hljs-built_in'],
  // Function calls
  [/\b([a-zA-Z_$][\w$]*)\s*(?=\()/g, 'hljs-function'],
]

function escapeHtml(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function highlightCode(code: string, lang: string): string {
  let html = escapeHtml(code)

  // Apply token patterns
  for (const [pattern, className] of TOKEN_PATTERNS) {
    html = html.replace(pattern, (match) => {
      // Don't re-wrap if already inside a span
      if (match.includes('class="hljs-')) return match
      return `<span class="${className}">${match}</span>`
    })
  }

  return html
}

export function useHighlight() {
  return { highlightCode }
}
