import { getPostsByTag } from "@/lib/r2"
import Cell from "@/components/Cell"

export const dynamic = "force-dynamic"

export default async function TagPage({ params }: { params: Promise<{ tag: string }> }) {
  const { tag } = await params
  const decoded = decodeURIComponent(tag)
  const posts = await getPostsByTag(decoded)
  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">#{decoded}</h1>
      <p className="text-sm text-[var(--text-secondary)] mb-6">{posts.length} posts</p>
      <div className="flex flex-col gap-3">
        {posts.map(p => <Cell key={p.path} post={p} />)}
      </div>
    </div>
  )
}
