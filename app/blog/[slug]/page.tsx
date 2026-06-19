import { redirect } from "next/navigation"

export default function BlogSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  // redirect /blog/xxx to /p/xxx
  return null
}
