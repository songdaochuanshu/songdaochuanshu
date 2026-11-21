/**
 * Small, dependency-free syntax highlighter used by the marked renderer.
 * Comment syntax is selected from the declared language so CSS/HTML colours
 * such as #fff are not mistaken for comments.
 */

const KEYWORDS: Record<string, Set<string>> = {
  javascript: new Set('const let var function return if else for while do switch case break continue new this class extends import export default from async await try catch finally throw typeof instanceof in of yield void delete null undefined true false NaN Infinity'.split(' ')),
  typescript: new Set('const let var function return if else for while do switch case break continue new this class extends import export default from async await try catch finally throw typeof instanceof in of yield void delete null undefined true false NaN Infinity interface type public private protected readonly enum implements'.split(' ')),
  python: new Set('and as assert async await break case class continue def del elif else except finally for from global if import in is lambda match nonlocal not or pass raise return try while with yield True False None'.split(' ')),
  ruby: new Set('BEGIN END alias and begin break case class def defined do else elsif end ensure false for if in module next nil not or redo rescue retry return self super then true undef unless until when while yield'.split(' ')),
  shell: new Set('if then else elif fi for while in do done case esac function select time until'.split(' ')),
  bash: new Set('if then else elif fi for while in do done case esac function select time until'.split(' ')),
  json: new Set(['true', 'false', 'null']),
  css: new Set('important inherit initial unset none block flex grid absolute relative fixed'.split(' ')),
}

const BUILT_INS = new Set('console window document Math JSON Promise Array Object String Number Boolean Map Set Symbol RegExp Error Date Proxy Reflect globalThis process require module exports __dirname __filename'.split(' '))

function escapeHtml(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

function languageName(lang: string): string {
  const normalized = lang.toLowerCase().replace(/^language-/, '').trim()
  if (normalized === 'js' || normalized === 'jsx' || normalized === 'mjs' || normalized === 'cjs') return 'javascript'
  if (normalized === 'ts' || normalized === 'tsx') return 'typescript'
  if (normalized === 'py') return 'python'
  if (normalized === 'rb') return 'ruby'
  if (normalized === 'sh' || normalized === 'zsh' || normalized === 'shell') return 'shell'
  if (normalized === 'yml' || normalized === 'yaml') return 'yaml'
  return normalized
}

function highlightCode(code: string, lang: string): string {
  const language = languageName(lang)
  const keywords = KEYWORDS[language] || KEYWORDS.javascript
  const hashComments = ['python', 'ruby', 'shell', 'bash', 'yaml', 'toml'].includes(language)
  const slashComments = !['python', 'ruby', 'shell', 'bash', 'yaml', 'toml', 'json'].includes(language)
  const output: string[] = []
  let index = 0

  while (index < code.length) {
    const rest = code.slice(index)
    const stringMatch = rest.match(/^("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`)/)
    if (stringMatch) {
      output.push(`<span class="hljs-string">${escapeHtml(stringMatch[0])}</span>`)
      index += stringMatch[0].length
      continue
    }

    const blockComment = slashComments && rest.match(/^\/\*[\s\S]*?\*\//)
    if (blockComment) {
      output.push(`<span class="hljs-comment">${escapeHtml(blockComment[0])}</span>`)
      index += blockComment[0].length
      continue
    }

    const lineComment = (slashComments && rest.match(/^\/\/[^\n]*/)) || (hashComments && rest.match(/^#[^\n]*/))
    if (lineComment) {
      output.push(`<span class="hljs-comment">${escapeHtml(lineComment[0])}</span>`)
      index += lineComment[0].length
      continue
    }

    const number = rest.match(/^(?:\b\d+(?:\.\d+)?(?:e[+-]?\d+)?\b)/i)
    if (number) {
      output.push(`<span class="hljs-number">${number[0]}</span>`)
      index += number[0].length
      continue
    }

    const word = rest.match(/^[A-Za-z_$][\w$]*/)
    if (word) {
      const value = word[0]
      const className = keywords.has(value) ? 'hljs-keyword' : BUILT_INS.has(value) ? 'hljs-built_in' : /^\s*\(/.test(rest.slice(value.length)) ? 'hljs-function' : ''
      output.push(className ? `<span class="${className}">${escapeHtml(value)}</span>` : escapeHtml(value))
      index += value.length
      continue
    }

    output.push(escapeHtml(code[index]))
    index += 1
  }

  return output.join('')
}

export function useHighlight() {
  return { highlightCode }
}
