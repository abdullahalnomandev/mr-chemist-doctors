import { getBlogBySlug } from "@/lib/api/api-server";
import type { Metadata } from "next";
import BlogBySlugPage from "./page-blog";

type PageProps = { params: { blogSlug: string } };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const blog = await getBlogBySlug(params.blogSlug);

  if (!blog) {
    return {
      title: "Blog not found",
      description: "The blog post you're looking for could not be found.",
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_FRONT_END_URL || "http://localhost:3000";
  const fullUrl = `${siteUrl}/blog/${params.blogSlug}`;

  const { metaTitle, metaDescription, excerpt, title, imageUrls, tags, seoKeywords } = blog;

  return {
    title: metaTitle || title,
    description: metaDescription || excerpt || "Read this article on our blog.",
    keywords: seoKeywords?.length ? seoKeywords : tags || [],
    openGraph: {
      title: metaTitle || title,
      description: metaDescription || excerpt || "Discover more at our blog.",
      url: fullUrl,
      siteName: "mrchemist",
      type: "article",
      publishedTime: blog.publishedAt ? new Date(blog.publishedAt).toISOString() : undefined,
      images: imageUrls?.length
        ? [
            {
              url: imageUrls[0],
              width: 1200,
              height: 630,
              alt: title,
            },
          ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle || title,
      description: metaDescription || excerpt || "Check out our latest post.",
      images: imageUrls?.[0] || "",
    },
    alternates: {
      canonical: fullUrl,
    },
  };
}

export default async function Page({ params }: PageProps) {
  const blog = await getBlogBySlug(params.blogSlug);

  return <BlogBySlugPage blog={blog} />;
}
