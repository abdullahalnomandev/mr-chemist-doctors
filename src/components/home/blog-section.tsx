"use client";

import { format } from "date-fns";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { SectionDescription, SectionTitle } from "./shared";

interface BlogsPageProps {
  blogs: {
    _id: string;
    title: string;
    slug: string;
    imageUrls: string[];
    excerpt: string;
    createdAt: string;
  }[];
  title: string;
  description: string;
}

export function BlogSection({ blogs, title, description }: BlogsPageProps) {
  return (
    <section className="container mx-auto max-w-6xl">
      <div className="mx-auto mb-12 max-w-4xl text-center">
        <SectionTitle title={title} />
        <SectionDescription description={description} />
      </div>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {(blogs ?? []).map((blog) => (
          <div key={blog._id} className="group flex flex-col overflow-hidden rounded-lg border shadow-sm">
            <div className="relative h-48 sm:h-56 md:h-60 lg:h-64">
              <Image
                src={blog.imageUrls[0] || "/placeholder.svg"}
                alt={blog.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="bg-secondary flex flex-1 flex-col justify-between space-y-2 p-4">
              <span className="text-sm text-gray-500">{format(new Date(blog.createdAt), "MMM dd, yyyy")}</span>
              <h3 className="group-hover:text-primary text-lg font-bold transition-colors">
                <Link href={`/blogs/${blog.slug}`}>{blog.title}</Link>
              </h3>
              <p className="text-sm text-black">{blog.excerpt}</p>
              <Link
                href={`/blogs/${blog.slug}`}
                className="text-primary mt-2 inline-flex items-center font-bold hover:underline"
              >
                Read More
                <ArrowUpRight strokeWidth={3} className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// export function BlogSection({ title, description, posts }: BlogSectionProps) {
//   return (
//     <section className="container mx-auto max-w-6xl px-4 sm:px-16">
//       <div className="mb-12 text-center">
//         <SectionTitle title={title} />
//         <SectionDescription description={description} />
//       </div>

//       <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
//         {posts.map((post) => (
//           <div key={post.id} className="group">
//             <div className="relative h-48 overflow-hidden rounded-t-lg">
//               <Image
//                 src={post.imageSrc || "/placeholder.svg"}
//                 alt={post.title}
//                 fill
//                 className="object-cover transition-transform group-hover:scale-105"
//               />
//             </div>
//             <div className="bg-secondary space-y-2 rounded-b-lg p-4">
//               <span className="text-sm text-gray-500">
//                 {post.category} | {post.date}
//               </span>

//               <h3 className="group-hover:text-primary text-lg font-bold transition-colors">
//                 <Link href={`/blog/${post.slug}`}>{post.title}</Link>
//               </h3>
//               <p className="text-black">{post.excerpt}</p>
//               <Link href={`/blog/${post.slug}`} className="text-primary flex items-center font-bold hover:underline">
//                 Read More
//                 <ArrowUpRight strokeWidth={3} className="ml-1 h-4 w-4" />
//               </Link>
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }
