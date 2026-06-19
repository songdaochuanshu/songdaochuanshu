"use client"
import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Cell from "@/components/Cell"
import Pagination from "@/components/Pagination"
import type { ManifestPost } from "@/lib/r2"

export default function BlogList() {
  const [posts, setPosts] = useState<ManifestPost[]>([])
  const searchParams = useSearchParams()
  const router = useRouter()
  const page = Number(searchParams.get("page")) || 1
  const PER = 15
  const total = Math.max(1, Math.ceil(posts.length / PER))
  const safe = page > total ? total : page
  const paginated = posts.slice((safe - 1) * PER, safe * PER)

  useEffect(() => {
    fetch("/api/posts?category=blog").then(r => r.json()).then(setPosts)
  }, [])

  if (!posts.length) return <div className="text-center py-16 text-[var(--text-secondary)]">Loading...</div>

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Blog</h1>
      <p className="text-sm text-[var(--text-secondary)] mb-6">{posts.length} posts &middot; Page {safe}/{total}</p>
      <div className="flex flex-col gap-3">
        {paginated.map(p => <Cell key={p.path} post={p} />)}
      </div>
      <Pagination total={total} current={safe} onChange={p => router.push(`/blog?page=${p}`)} />
    </div>
  )
}
