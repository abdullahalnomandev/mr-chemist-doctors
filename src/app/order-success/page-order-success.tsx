"use client";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/store/cart-store";
import { CheckCircle } from "lucide-react"; // Optional: for a success icon
import Link from "next/link";
import { useEffect } from "react";

const OrderSuccessPage = () => {
  const { clearCart } = useCartStore();

  useEffect(() => {
    clearCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-blue-50 px-4">
      <CheckCircle className="mb-4 h-20 w-20 text-green-600" />
      <h1 className="text-blu-700 text-3xl font-bold">Order Placed Successfully!</h1>
      <p className="my-2 max-w-md text-center text-gray-700">
        Thank you for your purchase. We’ve received your order and will send you a confirmation email shortly.
      </p>
      <Button asChild>
        <Link href="/account/orders">View My Orders</Link>
      </Button>
    </div>
  );
};

export default OrderSuccessPage;
