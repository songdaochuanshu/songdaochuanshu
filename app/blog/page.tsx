import { getPostsByCategory } from "@/lib/r2"
import Cell from "@/components/Cell"
import Pagination from "@/components/Pagination"
import BlogList from "./BlogList"

export const dynamic = "force-dynamic"

export default function BlogPage() {
  return <BlogList />
}
