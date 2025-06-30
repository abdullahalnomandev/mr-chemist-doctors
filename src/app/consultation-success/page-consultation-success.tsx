"use client";

import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/store/cart-store";
import { CheckCircle } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

const ConsultationSuccessPage = () => {
  const searchParams = useSearchParams();
  const addItem = useCartStore((state) => state.addItem);
  useEffect(() => {
    const productId = searchParams.get("productId");
    const variantId = searchParams.get("variantId");
    const name = searchParams.get("name");
    const price = parseFloat(searchParams.get("price") || "0");
    const imageUrl = searchParams.get("imageUrl");

    if (productId && name && imageUrl && !isNaN(price)) {
      addItem({
        id: productId,
        variant_id: variantId || undefined,
        name,
        price,
        quantity: 1,
        image: imageUrl,
        estimatedDelivery: getEstimatedDeliveryRange(),
      });
    }
  }, [addItem, searchParams]);
  function getEstimatedDeliveryRange(daysWindow = 7) {
    const today = new Date();
    const start = new Date(today);
    const end = new Date(today);
    start.setDate(today.getDate() + 1);
    end.setDate(today.getDate() + daysWindow);

    const options: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "short",
    };
    return `Expected delivery between ${start.toLocaleDateString("en-GB", options)} and ${end.toLocaleDateString("en-GB", options)}`;
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-green-50 px-4 text-center">
      <CheckCircle className="mb-6 h-20 w-20 text-green-600" />
      <h1 className="text-3xl font-semibold text-green-800">Consultation Completed</h1>
      <p className="mt-3 max-w-md text-lg text-gray-800">
        Thank you for completing your consultation. We’ve added the recommended treatment to your cart. You can now
        proceed to checkout or continue shopping.
      </p>
      <Button asChild className="mt-6">
        <Link href="/cart">Go to Cart</Link>
      </Button>
    </div>
  );
};

export default ConsultationSuccessPage;
