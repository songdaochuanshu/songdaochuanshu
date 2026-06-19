import Link from "next/link"

export default function DocBack() {
  return (
    <Link href="/blog" className="inline-flex items-center gap-1 text-sm text-[var(--text-secondary)] hover:text-[var(--text-main)] mb-6">
      &larr; Back
    </Link>
  )
}
