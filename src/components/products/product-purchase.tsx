"use client";

import { Button } from "@/components/ui/button";
import { Tooltip } from "@/components/ui/tooltip";
import { useCartStore } from "@/lib/store/cart-store";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { ShoppingCart, Star } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export type TProductVariant = {
  _id: string;
  type: "weight" | "volume" | "unit" | "pack";
  value: string;
  unit: string;
  price: number;
  stock: number;
};

interface ProductPurchaseProps {
  id: string;
  imageUrl: string;
  name: string;
  subtitle?: string;
  treatmentSlug?: string;
  basePrice?: number;
  variant_id?: string;
  rating?: {
    score: number;
    count: number;
  };
  variants?: TProductVariant[];
  needConsultation: boolean;
  questionsId?: string;
}

export function ProductPurchase({
  id,
  imageUrl,
  name,
  subtitle,
  // treatmentSlug,
  rating,
  variants = [],
  needConsultation,
  basePrice,
  questionsId,
}: ProductPurchaseProps) {
  const { addItem, removeItem, isConsultationExist } = useCartStore();
  const [isAdding, setIsAdding] = useState(false);

  const [selectedVariant, setSelectedVariant] = useState<TProductVariant | undefined>(variants[0]);
  const currentPrice = selectedVariant?.price || 0;
  const currentInStock = selectedVariant ? selectedVariant.stock > 0 : false;

  function getEstimatedDeliveryRange(daysWindow = 7) {
    const today = new Date();

    const startDate = new Date(today);
    startDate.setDate(today.getDate() + 1); // Start from tomorrow

    const endDate = new Date(today);
    endDate.setDate(today.getDate() + daysWindow); // End after `daysWindow` days

    const options: Intl.DateTimeFormatOptions = { day: "numeric", month: "short" };

    const startFormatted = startDate.toLocaleDateString("en-US", options);
    const endFormatted = endDate.toLocaleDateString("en-US", options);

    return `Expected  between ${startFormatted} to ${endFormatted}`;
  }

  const handleAddToCart = async () => {
    setIsAdding(true);
    addItem({
      id,
      variant_id: selectedVariant && selectedVariant?._id,
      name,
      price: variants.length && selectedVariant ? Number(currentPrice.toFixed(2)) : Number(basePrice?.toFixed(2)),
      quantity: 1,
      image: imageUrl,
      estimatedDelivery: getEstimatedDeliveryRange(),
    });

    // Reset the animation state after a delay
    setTimeout(() => setIsAdding(false), 1000);
  };

  const handleRemoveFromCart = async () => {
    removeItem(id);
  };

  const isAddedToCart = useCartStore((state) => state.items.find((item) => item.id === id));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-medium">{name}</h1>
        {subtitle && <p className="mt-1 text-lg">{subtitle}</p>}
      </div>

      <div className="text-xl font-medium">£{currentPrice.toFixed(2)}</div>

      {rating && (
        <div className="flex items-center">
          <div className="flex">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-emerald-500 text-emerald-500" />
              ))}
          </div>
          <span className="ml-2 text-sm text-gray-600">Trustpilot ({rating.count.toLocaleString()} reviews)</span>
        </div>
      )}
      <div className="bg-secondary space-y-2 rounded-2xl p-4">
        {variants.length > 0 && (
          <div>
            <h3 className="mb-3 text-sm font-medium text-gray-900">Strength :</h3>
            <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
              {variants.map((variant) => (
                <button
                  key={`${variant.value}-${variant.unit}`}
                  onClick={() => setSelectedVariant(variant)}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-medium",
                    selectedVariant?.value === variant.value && selectedVariant?.unit === variant.unit
                      ? "bg-primary border-primary text-white"
                      : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50",
                  )}
                >
                  {`${variant.value}${variant.unit}`}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="rounded-full border border-gray-200 bg-white p-1 text-center">
          {currentInStock ? <p className="text-gray-700">In stock</p> : <p className="text-red-500">Out of stock</p>}
        </div>

        {needConsultation && !isConsultationExist(questionsId || "") ? (
          <div>
            <div className="mb-2 text-center text-sm text-gray-700">
              Complete a free online assessment to buy your <br /> preferred treatment.
            </div>

            <Link
              href={{
                pathname: `/consultations/${questionsId}`,
              }}
            >
              <Button variant="pill" className="w-full">
                Continue Consultation
              </Button>
            </Link>
            {/* <Link
              href={{
                pathname: `/consultations/${questionsId}`,
                query: {
                  productId: id,
                  variantId: selectedVariant?._id,
                  name,
                  price: currentPrice,
                  imageUrl,
                },
              }}
            >
              <Button variant="pill" className="w-full">
                Continue Consultation
              </Button>
            </Link> */}
          </div>
        ) : (
          <Tooltip
            content={
              !currentInStock
                ? "Out of stock"
                : isAddedToCart
                  ? "Remove from your shopping cart"
                  : "Add to your shopping cart"
            }
          >
            <span className="relative block w-full">
              <AnimatePresence>
                {isAdding && (
                  <motion.div
                    initial={{ scale: 1, y: 0, opacity: 1 }}
                    animate={{ scale: 0.5, y: -50, opacity: 0 }}
                    exit={{ scale: 0, y: -100, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute top-1/2 right-4 -translate-y-1/2"
                  >
                    <ShoppingCart className="text-primary h-6 w-6" />
                  </motion.div>
                )}
              </AnimatePresence>
              <Button
                variant="pill"
                className={cn(
                  "w-full rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200",
                  isAddedToCart
                    ? "border bg-red-50 text-red-600 hover:bg-red-100" // Professional red for "Remove"
                    : "bg-primary text-primary-foreground hover:bg-primary/90", // Professional green for "Add"
                  !currentInStock && "cursor-not-allowed opacity-60",
                )}
                disabled={!currentInStock}
                onClick={isAddedToCart ? handleRemoveFromCart : handleAddToCart}
              >
                {isAddedToCart ? "Remove From Cart" : "Add to Cart"}
              </Button>
            </span>
          </Tooltip>
        )}
      </div>
    </div>
  );
}
