import Link from "next/link"

const links = [
  { href: "/blog", label: "Blog" },
  { href: "/life", label: "Life" },
  { href: "/record", label: "Record" },
  { href: "/tags", label: "Tags" },
  { href: "/search", label: "Search" },
  { href: "/projects", label: "Projects" },
  { href: "/me", label: "Me" },
]

export default function NavBar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[var(--border-subtle)] bg-[var(--bg-main)]/80 backdrop-blur">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-3">
        <Link href="/" className="text-lg font-bold tracking-tight hover:opacity-70">
          songdaochuanshu
        </Link>
        <div className="flex gap-5 text-sm">
          {links.map(l => (
            <Link key={l.href} href={l.href} className="text-[var(--text-secondary)] hover:text-[var(--text-main)] transition-colors">
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
