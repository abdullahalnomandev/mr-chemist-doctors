import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="mb-12 animate-pulse space-y-8">
      {/* Breadcrumb */}
      <div className="bg-secondary py-4">
        <div className="container mx-auto max-w-6xl">
          <Skeleton className="h-4 w-1/3 rounded-md" />
        </div>
      </div>

      <div className="container mx-auto max-w-6xl space-y-10 px-4 sm:px-16">
        {/* Image + Purchase area */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Image Skeleton */}
          <div className="bg-muted aspect-[4/3] w-full rounded-xl" />

          {/* Purchase Panel */}
          <div className="space-y-5">
            <Skeleton className="h-8 w-3/4 rounded-md" /> {/* Product Name */}
            <Skeleton className="h-6 w-1/2 rounded-md" /> {/* Subtitle */}
            <Skeleton className="h-6 w-24 rounded-md" /> {/* Price */}
            <Skeleton className="h-4 w-1/3 rounded-md" /> {/* Review stars */}
            <div className="space-y-3 pt-4">
              <Skeleton className="h-4 w-24 rounded" /> {/* Strength label */}
              <div className="flex gap-3">
                <Skeleton className="h-10 w-20 rounded-full" />
                <Skeleton className="h-10 w-20 rounded-full" />
              </div>
              <Skeleton className="h-10 w-full rounded-md" /> {/* Stock status */}
              <Skeleton className="h-12 w-full rounded-md" /> {/* Add to Cart */}
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="space-y-4">
          <Skeleton className="h-6 w-1/4 rounded-md" /> {/* Heading */}
          <Skeleton className="h-4 w-full rounded" />
          <Skeleton className="h-4 w-5/6 rounded" />
          <Skeleton className="h-4 w-4/6 rounded" />
        </div>
      </div>
    </main>
  );
}
