import Link from "next/link"

export default function NotFound() {
  return (
    <div className="text-center py-20">
      <h1 className="text-6xl font-bold text-[var(--text-secondary)]">404</h1>
      <p className="mt-4 text-lg">Page not found</p>
      <Link href="/" className="mt-6 inline-block text-[var(--primary)] hover:underline">Back to home</Link>
    </div>
  )
}
