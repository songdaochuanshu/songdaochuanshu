import Link from "next/link"
import { getPostsByCategory } from "@/lib/r2"
import Cell from "@/components/Cell"

export const dynamic = "force-dynamic"

export default async function HomePage() {
  const posts = (await getPostsByCategory("blog")).slice(0, 5)
  return (
    <div>
      <section className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight">songdaochuanshu</h1>
        <p className="mt-3 text-lg text-[var(--text-secondary)]">Personal blog &amp; notes.</p>
      </section>
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Recent Posts</h2>
          <Link href="/blog" className="text-sm text-[var(--primary)] hover:underline">View all</Link>
        </div>
        <div className="flex flex-col gap-3">
          {posts.map(p => <Cell key={p.path} post={p} />)}
        </div>
      </section>
    </div>
  )
}
