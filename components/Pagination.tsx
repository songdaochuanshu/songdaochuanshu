export default function Pagination({ total, current, onChange }: { total: number; current: number; onChange: (p: number) => void }) {
  if (total <= 1) return null
  return (
    <div className="mt-8 flex items-center justify-center gap-2">
      {current > 1 && <button onClick={() => onChange(current - 1)} className="rounded border border-[var(--border-subtle)] px-3 py-1 text-sm hover:border-[var(--primary)]">Prev</button>}
      <span className="text-sm text-[var(--text-secondary)]">{current} / {total}</span>
      {current < total && <button onClick={() => onChange(current + 1)} className="rounded border border-[var(--border-subtle)] px-3 py-1 text-sm hover:border-[var(--primary)]">Next</button>}
    </div>
  )
}
