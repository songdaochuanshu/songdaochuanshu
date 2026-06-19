import { getRenderedPost } from "@/lib/r2"
import DocBack from "@/components/DocBack"
import DocRender from "@/components/DocRender"
import DocToc from "@/components/DocToc"
import GiscusComments from "@/components/GiscusComments"
import { notFound } from "next/navigation"
import type { Metadata } from "next"

export const dynamic = "force-dynamic"

export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }): Promise<Metadata> {
  const { slug } = await params
  const fullPath = `/p/${slug.join("/")}`
  const post = await getRenderedPost(fullPath, true)
  if (!post) return { title: "Not Found" }
  return { title: post.meta.title, description: post.meta.description }
}

export default async function PostPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params
  const fullPath = `/p/${slug.join("/")}`
  const post = await getRenderedPost(fullPath, true)
  if (!post) notFound()
  return (
    <div className="relative">
      <DocBack />
      <DocRender post={post.meta} html={post.html} />
      {post.toc.length > 0 && <DocToc toc={post.toc} />}
      <GiscusComments term={post.meta.title} />
    </div>
  )
}
