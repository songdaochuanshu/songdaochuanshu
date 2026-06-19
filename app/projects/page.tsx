export default function ProjectsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Projects</h1>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-lg border border-[var(--border-subtle)] p-5">
          <h3 className="font-semibold">songdaochuanshu</h3>
          <p className="mt-1 text-sm text-[var(--text-secondary)]">Personal blog built with Next.js &amp; Cloudflare R2.</p>
        </div>
      </div>
    </div>
  )
}
