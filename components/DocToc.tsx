import type { TocLink } from "@/lib/r2"

export default function DocToc({ toc }: { toc: TocLink[] }) {
  return (
    <nav className="fixed right-4 top-24 hidden w-48 xl:block">
      <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">On this page</h4>
      <ul className="space-y-1">
        {toc.map(h => (
          <li key={h.id} style={{ paddingLeft: `${(h.depth - 2) * 12}px` }}>
            <a href={`#${h.id}`} className="block text-xs text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors truncate">
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
