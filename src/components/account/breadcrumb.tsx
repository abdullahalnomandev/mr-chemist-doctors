import { CircleChevronRight } from "lucide-react";
import Link from "next/link";

interface BreadcrumbProps {
  items: {
    label: string;
    href: string;
  }[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="bg-secondary-50 w-full py-3">
      <div className="flex items-center space-x-2 text-sm text-gray-600">
        <Link href="/" className="hover:text-primary">
          Home
        </Link>
        {items.map((item, index) => (
          <div key={item.href} className="flex items-center space-x-2">
            <CircleChevronRight className="h-4 w-4" />
            {index === items.length - 1 ? (
              <span className="text-primary">{item.label}</span>
            ) : (
              <Link href={item.href} className="hover:text-primary">
                {item.label}
              </Link>
            )}
          </div>
        ))}
      </div>
    </nav>
  );
}
