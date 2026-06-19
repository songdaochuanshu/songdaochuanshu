import { getPostsByCategory } from "@/lib/r2"
import Cell from "@/components/Cell"

export const dynamic = "force-dynamic"

export default async function LifePage() {
  const posts = await getPostsByCategory("life")
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Life</h1>
      <div className="flex flex-col gap-3">
        {posts.map(p => <Cell key={p.path} post={p} />)}
      </div>
    </div>
  )
}
