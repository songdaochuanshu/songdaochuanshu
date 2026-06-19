import { getPostsByCategory, getPostsByTag } from "@/lib/r2"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const category = searchParams.get("category")
  const tag = searchParams.get("tag")
  let posts
  if (tag) posts = await getPostsByTag(tag)
  else posts = await getPostsByCategory(category || "blog")
  return Response.json(posts)
}
