import { Skeleton } from "@/components/ui/skeleton";

export default function Treatment() {
  return (
    <section className="bg-muted py-10">
      <div className="container mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-4 md:grid-cols-2">
        {/* Left Content */}
        <div className="space-y-4">
          <Skeleton className="h-4 w-32 rounded-md" /> {/* Breadcrumb */}
          <Skeleton className="h-10 w-3/4 rounded-md" /> {/* Heading line 1 */}
          <Skeleton className="h-10 w-2/3 rounded-md" /> {/* Heading line 2 */}
          <Skeleton className="h-4 w-full rounded" /> {/* Subheading line 1 */}
          <Skeleton className="h-4 w-5/6 rounded" /> {/* Subheading line 2 */}
          <div className="flex items-center gap-4 pt-2">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-5 w-5 rounded-sm" />
              ))}
            </div>
            <Skeleton className="h-4 w-32 rounded" /> {/* Review count */}
          </div>
        </div>

        {/* Right Panel (Step Box) */}
        <div className="space-y-5 rounded-xl border bg-white p-6 shadow-sm">
          {/* Step 1 */}
          <div className="flex items-start gap-4">
            <Skeleton className="h-8 w-8 rounded-full" />
            <div className="w-full space-y-2">
              <Skeleton className="h-4 w-3/4 rounded" />
              <Skeleton className="h-10 w-60 rounded-full" /> {/* CTA button */}
            </div>
          </div>
          {/* Step 2 */}
          <div className="flex items-center gap-4">
            <Skeleton className="h-6 w-6 rounded-full" />
            <Skeleton className="h-4 w-2/3 rounded" />
          </div>
          {/* Step 3 */}
          <div className="flex items-center gap-4">
            <Skeleton className="h-6 w-6 rounded-full" />
            <Skeleton className="h-4 w-4/5 rounded" />
          </div>
        </div>
      </div>
    </section>
  );
}
