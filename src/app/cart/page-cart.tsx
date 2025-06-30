"use client";

import { useCartStore } from "@/lib/store/cart-store";
import { formatCurrency } from "@/lib/utils";
import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import americanExpressLogo from "../../components/assets/images/american-express.png";
import icoLogo from "../../components/assets/images/ico.png";
import mastercardLogo from "../../components/assets/images/master-card.png";
import npaLogo from "../../components/assets/images/npa.png";
import paypalLogo from "../../components/assets/images/paypal.png";
import registeredPharmacyLogo from "../../components/assets/images/registered-pharmacy.png";
import visaLogo from "../../components/assets/images/visa.png";

export default function CartPage() {
  const [isClient, setIsClient] = useState(false);

  // const { cardItems } = useCartStore(useShallow((state) => ({ cardItems: state.items })));
  // console.log("getState", cardItems);

  const {
    items,
    promoCode,
    // getSelectedItems,
    selectedItems,
    setPromoCode,
    applyPromoCode,
    updateQuantity,
    removeItem,
    getSelectedSubTotal,
    getSelectedTotal,
    toggleSelectItem,
    selectAll,
    removeSelectedItems,
  } = useCartStore();

  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const isAllSelected = items.length > 0 && selectedItems.length === items.length;
  // Replace subTotal and total with selected items calculations
  const selectedSubTotal = getSelectedSubTotal();
  const selectedTotal = getSelectedTotal();

  const handleCheckout = () => {
    if (items.length === 0) return;

    // You can add validation here if needed
    if (selectedItems.length === 0) {
      alert("Please select at least one item to checkout");
      return;
    }

    router.push("/checkout");
  };

  // Modify the render section for checkboxes and dynamic content
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-secondary py-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-sm">
            <Link href="/" className="hover:text-primary text-gray-500">
              Home
            </Link>
            / <span className="text-primary font-medium">Cart</span>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto max-w-6xl px-4 py-4 sm:px-16">
        <div className="flex flex-col gap-4 lg:flex-row">
          <div className="space-y-4 lg:w-2/3">
            <div className="rounded-3xl bg-white p-4 shadow-xs">
              <h1 className="text-xl font-medium">Shopping Cart</h1>
              {isClient && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="select-all"
                      checked={isAllSelected}
                      onCheckedChange={(checked) => selectAll(!!checked)}
                    />
                    <label htmlFor="select-all" className="text-sm">
                      Select all
                    </label>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-500 hover:bg-red-50 hover:text-red-600"
                    onClick={removeSelectedItems}
                    disabled={selectedItems.length === 0}
                  >
                    <Trash2 className="mr-1 h-4 w-4" />
                    Delete all
                  </Button>
                </div>
              )}
            </div>

            {/* Cart items */}
            <div className="rounded-3xl bg-white p-4 shadow-xs">
              {!isClient ? (
                <div className="py-4 text-center">Loading...</div>
              ) : items.length === 0 ? (
                <div className="py-4 text-center">
                  <p className="mb-4 text-gray-500">Your cart is empty</p>
                  <Link href="/treatments">
                    <Button>Browse Treatments</Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="">
                      <div className="items-center sm:flex">
                        {isClient && (
                          <div className="mr-4">
                            <Checkbox
                              checked={selectedItems.includes(item.id)}
                              onCheckedChange={(checked) => {
                                toggleSelectItem(item.id, !!checked);
                              }}
                            />
                          </div>
                        )}
                        <div className="mr-4 h-20 w-24 flex-shrink-0 overflow-hidden rounded-2xl bg-gray-100">
                          <Image
                            src={item.image || "https://picsum.photos/1000/1000"}
                            alt={item.name}
                            width={100}
                            height={100}
                            className="h-full w-full object-contain"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <h3 className="font-bold text-gray-900">{item.name}</h3>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-gray-400 hover:text-red-500"
                              onClick={() => removeItem(item.id)}
                            >
                              <Trash2 className="h-5 w-5" />
                            </Button>
                          </div>
                          <p className="text-sm text-gray-500">Delivery: {item.estimatedDelivery}</p>
                          <div className="mt-4 flex items-center justify-between">
                            <div className="flex items-center">
                              <span className="text-lg font-bold">${item.price.toFixed(2)}</span>
                              <span className="ml-2 text-sm text-gray-400 line-through">
                                ${(item.price + 10).toFixed(2)}
                              </span>
                            </div>
                            <div className="flex items-center rounded-md border">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 rounded-none"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="w-10 text-center">{item.quantity}</span>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 rounded-none"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Order summary */}
          <div className="lg:w-1/3">
            <div className="rounded-3xl bg-white p-4 shadow-xs">
              <h2 className="mb-6 text-xl font-bold">Order Summary</h2>

              {/* Promo code */}
              <div className="mb-6">
                <p className="mb-2 text-sm">Have a promo code? Apply it here</p>
                <div className="flex space-x-2">
                  <Input
                    placeholder="Enter Promo Code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                  />
                  <Button variant="secondary" onClick={applyPromoCode}>
                    Apply
                  </Button>
                </div>
              </div>

              {/* Order totals */}
              <div className="mb-4 space-y-3 border-b pb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Item Total:</span>
                  <span>{isClient ? formatCurrency(selectedSubTotal) : "$0.00"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Sub Total:</span>
                  <span>{isClient ? formatCurrency(selectedSubTotal) : "$0.00"}</span>
                </div>
              </div>

              <div className="mb-6 flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>{isClient ? formatCurrency(selectedTotal) : "$0.00"}</span>
              </div>

              <Button
                onClick={handleCheckout}
                variant="default"
                className="w-full rounded-full"
                size="lg"
                disabled={selectedItems.length === 0}
              >
                Checkout
                {/* Checkout ({selectedItems.length} items) */}
              </Button>

              {/* Payment methods */}
              <div className="mt-8">
                <h3 className="mb-4 text-sm font-medium">We Accept</h3>
                <div className="grid grid-cols-4 gap-4">
                  <div className="flex items-center justify-center rounded bg-gray-100 p-2">
                    <Image src={visaLogo || "/placeholder.svg"} alt="Visa" width={40} height={30} />
                  </div>
                  <div className="flex items-center justify-center rounded bg-gray-100 p-2">
                    <Image src={mastercardLogo || "/placeholder.svg"} alt="Mastercard" width={40} height={30} />
                  </div>
                  <div className="flex items-center justify-center rounded bg-gray-100 p-2">
                    <Image
                      src={americanExpressLogo || "/placeholder.svg"}
                      alt="American Express"
                      width={40}
                      height={30}
                    />
                  </div>
                  <div className="flex items-center justify-center rounded bg-gray-100 p-2">
                    <Image src={paypalLogo || "/placeholder.svg"} alt="PayPal" width={40} height={30} />
                  </div>
                  <div className="flex items-center justify-center rounded bg-gray-100 p-2">
                    <Image
                      src={registeredPharmacyLogo || "/placeholder.svg"}
                      alt="Registered Pharmacy"
                      width={40}
                      height={30}
                    />
                  </div>
                  <div className="flex items-center justify-center rounded bg-gray-100 p-2">
                    <Image src={icoLogo || "/placeholder.svg"} alt="ICO" width={40} height={30} />
                  </div>
                  <div className="flex items-center justify-center rounded bg-gray-100 p-2">
                    <Image src={npaLogo || "/placeholder.svg"} alt="NPA" width={40} height={30} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
