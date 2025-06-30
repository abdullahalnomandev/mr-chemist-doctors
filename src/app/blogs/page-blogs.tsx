import { TBlog } from "@/lib/types";
import { format } from "date-fns";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface BlogsPageProps {
  blogs: TBlog[];
}

export default async function BlogsPage({ blogs }: BlogsPageProps) {
  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-secondary px-6 py-4">
        <div className="mx-auto max-w-6xl">
          <nav className="text-sm text-gray-600">
            <Link href="/" className="hover:text-primary">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-primary font-medium">Health Advice</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto max-w-6xl px-4">
        <main className="my-12 space-y-12">
          <section className="mt-16">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Available Health Advices</h2>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {blogs.map((blog) => (
                <div key={blog._id} className="group">
                  <div className="relative h-48 overflow-hidden rounded-t-lg">
                    <Image
                      src={blog.imageUrls[0] || "/placeholder.svg"}
                      alt={blog.title}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <div className="bg-secondary space-y-2 rounded-b-lg p-4">
                    <span className="text-sm text-gray-500">{format(new Date(blog.createdAt), "MMM dd, yyyy")}</span>

                    <h3 className="group-hover:text-primary text-lg font-bold transition-colors">
                      <Link href={`/blogs/${blog.slug}`}>{blog.title}</Link>
                    </h3>
                    <p className="text-black">{blog.excerpt}</p>
                    <Link
                      href={`/blogs/${blog.slug}`}
                      className="text-primary flex items-center font-bold hover:underline"
                    >
                      Read More
                      <ArrowUpRight strokeWidth={3} className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
