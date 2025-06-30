import { cn } from "@/lib/utils"; // optional: your classNames utility if available
import Link from "next/link";

type BreadcrumbItem = {
  label: string;
  href?: string; // if not provided, considered current page
};

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

const Breadcrumbs = ({ items, className }: BreadcrumbsProps) => {
  return (
    <div className={cn("bg-secondary py-4", className)}>
      <div className="container mx-auto max-w-6xl px-4">
        <div className="text-sm text-gray-500">
          {items.map((item, idx) => {
            const isLast = idx === items.length - 1;

            return (
              <span key={idx}>
                {item.href && !isLast ? (
                  <Link href={item.href} className="hover:text-primary">
                    {item.label}
                  </Link>
                ) : (
                  <span className={cn("font-medium", isLast && "text-primary")}>{item.label}</span>
                )}
                {!isLast && <span className="mx-1">/</span>}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Breadcrumbs;
