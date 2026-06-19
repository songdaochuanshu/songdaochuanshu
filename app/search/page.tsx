import { getManifest } from "@/lib/r2"
import Link from "next/link"

export const dynamic = "force-dynamic"

export default async function SearchPage() {
  const mf = await getManifest()
  const posts = mf.posts
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Search</h1>
      <p className="text-sm text-[var(--text-secondary)] mb-4">{posts.length} posts indexed</p>
      <div className="flex flex-col gap-3">
        {posts.slice(0, 50).map(p => (
          <Link key={p.path} href={p.path} className="block rounded-lg border border-[var(--border-subtle)] p-3 hover:border-[var(--primary)] transition-colors">
            <span className="font-medium">{p.title}</span>
            <span className="ml-2 text-xs text-[var(--text-secondary)]">{p.category}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
