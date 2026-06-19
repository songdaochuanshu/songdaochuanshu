import { getAllTags } from "@/lib/r2"
import Link from "next/link"

export const dynamic = "force-dynamic"

export default async function TagsPage() {
  const tags = await getAllTags()
  const sorted = Object.entries(tags).sort((a, b) => b[1] - a[1])
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Tags</h1>
      <div className="flex flex-wrap gap-3">
        {sorted.map(([tag, count]) => (
          <Link key={tag} href={`/tags/${encodeURIComponent(tag)}`}
            className="rounded-full border border-[var(--border-subtle)] px-4 py-1.5 text-sm hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors">
            {tag} <span className="text-[var(--text-secondary)]">({count})</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
