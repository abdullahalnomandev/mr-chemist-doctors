import { Button } from "@/components/ui/button";
import { TProduct } from "@/lib/types";
import { ChevronRight } from "lucide-react"; // ✅ Correct import
import Image from "next/image";
import Link from "next/link";

export type ProductCardProps = Pick<TProduct, "_id" | "name" | "slug" | "basePrice" | "imageUrls" | "keyPoints">;

export const ProductCard = ({ name, slug, imageUrls, basePrice, keyPoints }: ProductCardProps) => (
  <div className="flex h-full flex-col justify-between rounded-lg border bg-white p-4 shadow-md">
    <div className="mb-4">
      {/* Product Image */}
      <div className="mx-auto mb-4 flex h-36 w-full items-center justify-center rounded-md bg-white">
        <Image
          src={imageUrls[0] || "/no-image-placeholder.svg"}
          alt={name}
          className="h-full w-auto object-contain"
          width={120}
          height={120}
          priority
        />
      </div>

      {/* Product Name */}
      <h3 className="text-primary mb-3 text-base leading-tight font-bold">{name}</h3>

      {/* Key Points */}
      <ul className="text-muted-foreground mb-4 space-y-1 text-sm">
        {keyPoints?.map((feature, index) => (
          <li key={index} className="flex items-start gap-2">
            <ChevronRight className="text-primary mt-0.5 h-4 w-4" />
            <span className="text-primary">{feature}</span>
          </li>
        ))}
      </ul>
    </div>

    {/* Price and Button */}
    <div className="mt-auto">
      <p className="text-primary mb-3 text-right text-sm font-bold">
        From <span className="font-bold">£{basePrice?.toFixed(2)}</span>
      </p>
      <Link href={`/products/${slug}`}>
        <Button className="w-full rounded-full text-sm font-medium">View Details</Button>
      </Link>
    </div>
  </div>
);
