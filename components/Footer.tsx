export default function Footer() {
  return (
    <footer className="border-t border-[var(--border-subtle)] py-8 text-center text-sm text-[var(--text-secondary)]">
      <p>&copy; {new Date().getFullYear()} songdaochuanshu. Built with Next.js.</p>
    </footer>
  )
}
