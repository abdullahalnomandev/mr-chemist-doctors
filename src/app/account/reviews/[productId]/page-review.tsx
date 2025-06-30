"use client";

import { Breadcrumb } from "@/components/account/breadcrumb";
import { StarRatingInput } from "@/components/products/star-rating-input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { QK } from "@/lib/query-keys";
import { serverApiRequest } from "@/lib/utils-server";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2, PenLine, Save } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const reviewSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  rating: z.number().min(1).max(5),
});

type ReviewFormData = z.infer<typeof reviewSchema>;

export default function MyReviewPage() {
  const { productId } = useParams();
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);

  const {
    data: reviewData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [QK.REVIEW, productId],
    queryFn: () => serverApiRequest("GET", `/reviews/${productId}`),
    select: (res) => res?.data,
    enabled: !!productId,
  });

  const form = useForm<ReviewFormData>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      title: "",
      content: "",
      rating: 5,
    },
  });

  useEffect(() => {
    if (reviewData) {
      form.reset({
        title: reviewData.title,
        content: reviewData.content,
        rating: reviewData.rating,
      });
      setIsEditing(false); // or true, depending on your UX goal
    }
  }, [reviewData, form]);

  console.log("errors-form.formState.errors ->", form.formState.errors);

  // Mutation: POST if no review exists, PATCH if editing existing review
  const { mutate: submitReview, isPending: isSubmitting } = useMutation({
    mutationKey: [QK.REVIEW + "_SUBMIT", productId],
    mutationFn: (data: ReviewFormData) => {
      if (reviewData && reviewData?._id) {
        console.log("DATA--", data);
        // Update existing review by PATCH
        return serverApiRequest("PATCH", "/reviews", {
          data: {
            product: productId,
            title: data.title,
            content: data.content,
            rating: data.rating,
            platform: "site",
          },
        });
      } else {
        // Create new review by POST
        return serverApiRequest("POST", `/reviews`, {
          data: {
            review: {
              product: productId,
              title: data.title,
              content: data.content,
              rating: data.rating,
              platform: "site",
            },
          },
        });
      }
    },
    onSuccess: () => {
      toast.success("Review saved successfully");
      queryClient.invalidateQueries({ queryKey: [QK.REVIEW, productId] });
      setIsEditing(false);
    },
    onError: (error: any) => {
      toast.error(String(error) || "Failed to save review");
    },
  });

  const onSubmit = (data: ReviewFormData) => {
    submitReview(data);
  };

  const breadcrumbItems = [{ label: "My Review", href: "/account/reviews" }];

  return (
    <div className="space-y-6">
      <Breadcrumb items={breadcrumbItems} />

      <div className="rounded-lg bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-xl font-semibold">Review This Product</h1>
          {!isEditing && (
            <Button size="sm" onClick={() => setIsEditing(true)}>
              <PenLine className="mr-2 h-4 w-4" />
              {reviewData ? "Edit Review" : "Write Review"}
            </Button>
          )}
        </div>

        {isLoading ? (
          <div className="flex min-h-[200px] items-center justify-center">
            <Loader2 className="text-primary h-6 w-6 animate-spin" />
          </div>
        ) : isError ? (
          <div className="text-red-500">Error loading review</div>
        ) : isEditing || !reviewData ? (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter a title for your review" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Write your review here..." rows={5} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="rating"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rating</FormLabel>
                    <FormControl>
                      <StarRatingInput value={field.value} onChange={field.onChange} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Review
                  </>
                )}
              </Button>
            </form>
          </Form>
        ) : (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">{reviewData.title}</h2>
            <p className="whitespace-pre-wrap text-gray-700">{reviewData.content}</p>
            <p className="text-sm text-gray-500">Rating: {reviewData.rating}/5</p>
          </div>
        )}
      </div>
    </div>
  );
}
