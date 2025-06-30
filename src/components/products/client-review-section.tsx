"use client";

import { TestimonialsSection } from "@/components/home/testimonials";
import { QK } from "@/lib/query-keys";
import { serverApiRequest } from "@/lib/utils-server";
import { useQuery } from "@tanstack/react-query";

interface Props {
  productId: string;
  homePageData: {
    title?: string;
    totalReviews?: number;
    platform?: string;
  };
}

export function ClientReviewSection({ productId, homePageData }: Props) {
  const { data: productData } = useQuery({
    queryKey: [QK.REVIEW, productId],
    queryFn: () => serverApiRequest("GET", `/reviews/reviews/${productId}`),
    select: (res) => {
      return (res.data.result || []).map((review: any) => ({
        id: review._id,
        name: review.reviewerName,
        quote: review.title,
        content: review.content,
        rating: review.rating,
      }));
    },
    enabled: !!productId,
  });
  console.log({ productData });

  return (
    <TestimonialsSection
      title={homePageData?.title ?? ""}
      totalReviews={homePageData?.totalReviews ?? 0}
      platform={homePageData?.platform ?? ""}
      testimonials={productData ?? []}
      isTustpilot={false}
    />
  );
}
