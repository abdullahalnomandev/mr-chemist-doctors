import { Skeleton } from "@/components/ui/skeleton";

export default function PersonalProfileSkeleton() {
  return (
    <div className="space-y-4">
      {/* Breadcrumb */}
      <Skeleton className="h-6 w-56 rounded-md bg-gray-300" />

      {/* Card */}
      <div className="animate-pulse space-y-6 rounded-lg bg-white p-6 shadow-sm">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Skeleton className="h-7 w-48 rounded-md bg-gray-300" />
          <Skeleton className="h-8 w-24 rounded-md bg-gray-300" />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-x-8 gap-y-5 md:grid-cols-2">
          {/* First 10 Fields */}
          {Array.from({ length: 10 }).map((_, idx) => (
            <div key={idx} className="space-y-2">
              <Skeleton className="h-4 w-28 bg-gray-300" />
              <Skeleton className="h-10 w-full rounded-md bg-gray-200" />
            </div>
          ))}

          {/* Present Address */}
          <div className="col-span-1 space-y-2 md:col-span-2">
            <Skeleton className="h-4 w-36 bg-gray-300" />
            <Skeleton className="h-16 w-full rounded-md bg-gray-200" />
          </div>

          {/* Permanent Address */}
          <div className="col-span-1 space-y-2 md:col-span-2">
            <Skeleton className="h-4 w-40 bg-gray-300" />
            <Skeleton className="h-16 w-full rounded-md bg-gray-200" />
          </div>
        </div>

        {/* Save / Cancel buttons (optional) */}
        <div className="flex justify-end gap-3 pt-4">
          <Skeleton className="h-10 w-20 rounded-md bg-gray-300" />
          <Skeleton className="h-10 w-20 rounded-md bg-gray-300" />
        </div>
      </div>
    </div>
  );
}
