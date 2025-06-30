import { formatCurrency } from "@/lib/utils";

interface CartItem {
  id: string;
  variant_id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  estimatedDelivery: string;
}

interface OrderSummaryProps {
  items: CartItem[];
}

const OrderSummary = ({ items }: OrderSummaryProps) => {
  const calculateTotals = () => {
    const subTotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const tax = subTotal * 0.01; // 1% VAT
    const total = subTotal + tax;

    return {
      itemTotal: items.length,
      subTotal,
      tax,
      total,
    };
  };

  const { subTotal, tax, total } = calculateTotals();

  return (
    <div className="lg:w-1/3">
      <div className="sticky top-4 rounded-3xl bg-white p-4 shadow-xs">
        <h2 className="mb-6 text-xl font-bold">Order Summary</h2>

        <div className="mb-4 space-y-4 border-b pb-4">
          <div className="flex justify-between">
            <span className="text-gray-600">Item Total:</span>
            <span className="font-medium">{items.length}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-600">Sub Total:</span>
            <span className="font-medium">{formatCurrency(subTotal)}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-600">Tax (1%):</span>
            <span className="font-medium">{formatCurrency(tax)}</span>
          </div>
        </div>

        <div className="flex justify-between text-lg font-bold">
          <span>Total</span>
          <span>{formatCurrency(total)}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
