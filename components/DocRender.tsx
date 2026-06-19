import type { ManifestPost } from "@/lib/r2"

export default function DocRender({ post, html }: { post: ManifestPost; html: string }) {
  return (
    <article>
      <header className="mb-8">
        <h1 className="text-3xl font-bold">{post.title}</h1>
        <div className="mt-2 flex items-center gap-3 text-sm text-[var(--text-secondary)]">
          {post.date && <time>{post.date}</time>}
          {post.tags.map(t => <span key={t} className="rounded bg-[var(--bg-card)] px-2 py-0.5 text-xs">{t}</span>)}
        </div>
      </header>
      <div className="prose dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: html }} />
    </article>
  )
}
