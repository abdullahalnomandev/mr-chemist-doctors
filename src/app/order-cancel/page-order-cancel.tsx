import { Button } from "@/components/ui/button";
import { XCircle } from "lucide-react";
import Link from "next/link";

const OrderCancelPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-red-50 px-4">
      <XCircle className="mb-4 h-20 w-20 text-red-600" />
      <h1 className="text-3xl font-bold text-red-700">Order Cancelled</h1>
      <p className="my-2 max-w-md text-center text-gray-700">
        It looks like your payment was not completed or was canceled. If this was a mistake, you can try again.
      </p>
      <Button asChild variant="outline">
        <Link href="/">Go Back to Home</Link>
      </Button>
    </div>
  );
};

export default OrderCancelPage;
