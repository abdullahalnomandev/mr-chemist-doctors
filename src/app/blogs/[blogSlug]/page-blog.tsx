"use client";

import { TBlog } from "@/lib/types";
import { format } from "date-fns";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./blog-description.module.css";

export default function BlogBySlugPage({ blog }: { blog: TBlog | null }) {
  const [enhancedHTML, setEnhancedHTML] = useState<string>("");
  const [tocItems, setTocItems] = useState<{ id: string; text: string }[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (!blog?.content) return;

    const parser = new DOMParser();
    const doc = parser.parseFromString(blog.content, "text/html");
    const headings = doc.querySelectorAll("h2");

    const items: { id: string; text: string }[] = [];

    headings.forEach((heading, index) => {
      const text = heading.textContent || `Heading ${index + 1}`;
      const id = `heading-${index}-${text.toLowerCase().replace(/\s+/g, "-")}`;
      heading.setAttribute("id", id);
      items.push({ id, text });
    });

    setTocItems(items);
    setEnhancedHTML(doc.body.innerHTML);
  }, [blog?.content]);

  if (!blog) {
    return <div className="container mx-auto py-12 text-center">Blog post not found.</div>;
  }

  const formattedDate = blog.createdAt ? format(new Date(blog.createdAt), "MMM dd, yyyy") : "No date";
  const category = "Uncategorized";
  const tags = blog.tags?.join(", ") || "No tags";

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      {/* Title & Metadata */}
      <h1 className="text-3xl font-bold text-gray-900 md:text-4xl">{blog.title}</h1>
      <p className="mt-2 text-sm text-gray-600">
        {category} | {tags} | {formattedDate}
      </p>

      {/* Flex Layout: Content left, TOC right */}
      <div className="mt-8 flex flex-col-reverse gap-8 lg:flex-row">
        {/* Blog content area */}
        <div className="flex-1">
          {/* Featured image */}
          {blog.imageUrls?.length > 0 && (
            <div className="relative h-80 w-full overflow-hidden rounded-lg md:h-96">
              <Image
                src={blog.imageUrls[0]}
                alt={blog.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
              />
            </div>
          )}

          {/* HTML content */}
          <div className="prose mt-8 max-w-none scroll-smooth text-gray-700">
            <div className={styles.productDescription} dangerouslySetInnerHTML={{ __html: enhancedHTML }} />
          </div>

          {/* Footer title */}
          <div className="mt-12 border-t border-gray-200 pt-8">
            <h2 className="text-2xl font-bold text-gray-900">{blog.title}</h2>
          </div>
        </div>

        {/* TOC - Right side on large screens */}
        {tocItems.length > 0 && (
          <aside>
            <div className="rounded-lg p-4">
              <ol className="list-disc space-y-2 pl-5 text-sm">
                {tocItems.map(({ id, text }) => (
                  <li key={id} className={activeId === id ? "text-blue-700" : "text-gray-600"}>
                    <a
                      href={`#${id}`}
                      onClick={() => setActiveId(id)}
                      className={`hover:underline ${activeId === id ? "font-medium" : ""}`}
                    >
                      {text}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}
