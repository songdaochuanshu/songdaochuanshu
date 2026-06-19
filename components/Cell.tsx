import Link from "next/link"
import type { ManifestPost } from "@/lib/r2"

export default function Cell({ post }: { post: ManifestPost }) {
  return (
    <Link href={post.path} className="block rounded-lg border border-[var(--border-subtle)] p-4 hover:border-[var(--primary)] transition-colors">
      <h3 className="text-base font-medium">{post.title}</h3>
      <div className="mt-1 flex items-center gap-3 text-xs text-[var(--text-secondary)]">
        {post.date && <time>{post.date}</time>}
        {post.tags.length > 0 && (
          <span className="flex gap-1">
            {post.tags.slice(0, 3).map(t => <span key={t} className="rounded bg-[var(--bg-card)] px-1.5 py-0.5">{t}</span>)}
          </span>
        )}
      </div>
      {post.description && <p className="mt-2 text-sm text-[var(--text-secondary)] line-clamp-2">{post.description}</p>}
    </Link>
  )
}
