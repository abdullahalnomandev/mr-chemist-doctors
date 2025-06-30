import { getBlogs } from "@/lib/api/api-server";
import BlogsPage from "./page-blogs";

export default async function Page() {
  // Mark the component as async
  const blogs = await getBlogs(); // Await directly

  return <BlogsPage blogs={blogs} />;
}
