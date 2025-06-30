import { Skeleton } from "@/components/ui/skeleton";
import { HelpCircle } from "lucide-react";

export default function CheckoutShippingFormSkeleton() {
  return (
    <form className="animate-pulse">
      <div className="rounded-3xl bg-white p-4 shadow-xs">
        <div className="mb-6 flex items-center justify-between">
          <Skeleton className="h-6 w-32 rounded" />
          <Skeleton className="h-4 w-48 rounded" />
        </div>

        <div className="space-y-4">
          <div>
            <Skeleton className="mb-2 h-4 w-20" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>
          <div className="flex items-center space-x-2">
            <Skeleton className="h-4 w-4 rounded-sm" />
            <Skeleton className="h-4 w-40" />
          </div>
        </div>
      </div>

      {/* Shipping Address */}
      <div className="mt-6 rounded-3xl bg-white p-4 shadow-xs">
        <Skeleton className="mb-6 h-6 w-40 rounded" />

        <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <Skeleton className="mb-2 h-4 w-24" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>
          <div>
            <Skeleton className="mb-2 h-4 w-24" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <Skeleton className="mb-2 h-4 w-20" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>
          <div>
            <Skeleton className="mb-2 h-4 w-60" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            <div>
              <Skeleton className="mb-2 h-4 w-16" />
              <Skeleton className="h-10 w-full rounded-md" />
            </div>
            <div>
              <Skeleton className="mb-2 h-4 w-16" />
              <Skeleton className="h-10 w-full rounded-md" />
            </div>
            <div>
              <Skeleton className="mb-2 h-4 w-24" />
              <Skeleton className="h-10 w-full rounded-md" />
            </div>
          </div>

          <div className="relative">
            <Skeleton className="mb-2 h-4 w-16" />
            <Skeleton className="h-10 w-full rounded-md" />
            <HelpCircle size={16} className="absolute top-9 right-3 text-gray-300" />
          </div>
        </div>

        <div className="mt-6 flex items-center space-x-2">
          <Skeleton className="h-4 w-4 rounded-sm" />
          <Skeleton className="h-4 w-52" />
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <Skeleton className="h-10 w-20 rounded-md" />
          <Skeleton className="h-10 w-20 rounded-md" />
        </div>
      </div>
    </form>
  );
}
