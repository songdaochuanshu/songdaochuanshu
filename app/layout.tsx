import type { Metadata } from "next"
import NavBar from "@/components/NavBar"
import Footer from "@/components/Footer"
import "./globals.css"

export const metadata: Metadata = {
  title: { default: "songdaochuanshu", template: "%s - songdaochuanshu" },
  description: "Personal blog",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen bg-[var(--bg-main)] text-[var(--text-main)] font-sans antialiased">
        <NavBar />
        <main className="mx-auto max-w-4xl px-6 pt-20 pb-12">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
