import { Skeleton } from "@/components/ui/skeleton";
import { CircleChevronRight } from "lucide-react";

export default function HeaderMenuSkeleton() {
  const groupCount = 4;
  const itemsPerGroup = 3;

  return (
    <div className="grid w-[600px] grid-cols-2 gap-6 p-4">
      {Array.from({ length: groupCount }).map((_, groupIdx) => (
        <div key={groupIdx} className="space-y-3">
          {/* Group Header */}
          <div className="flex items-center justify-between border-b pb-1">
            <Skeleton className="h-4 w-28 rounded-sm" />
            <CircleChevronRight size={20} className="text-muted-foreground" />
          </div>

          {/* Product Items */}
          <ul className="space-y-2">
            {Array.from({ length: itemsPerGroup }).map((_, itemIdx) => (
              <li key={itemIdx}>
                <Skeleton className="h-3 w-[60%] rounded-sm" />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
