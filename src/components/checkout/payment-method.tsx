"use client";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CreditCard } from "lucide-react";
import { Control, Controller } from "react-hook-form";
import { Button } from "../ui/button";

type PaymentMethodProps = {
  control: Control<any>;
  errors: any;
  register: any;
  paymentMethod?: string;
  handlePayment: () => void;
  isPending: boolean;
};

const PaymentMethod = ({ control, handlePayment, isPending }: PaymentMethodProps) => {
  return (
    <div className="rounded-3xl bg-white p-4 shadow-xs">
      <div className="mb-6 flex items-center">
        <CreditCard className="mr-2 h-5 w-5" />
        <h2 className="text-xl font-medium">Payment Method</h2>
      </div>

      <Controller
        name="paymentMethod"
        control={control}
        render={({ field }) => (
          <>
            <RadioGroup
              onValueChange={field.onChange}
              value={field.value}
              className="mb-6 flex flex-col gap-4 md:flex-row"
            >
              <div
                className={`flex items-center rounded-md border p-4 ${
                  field.value === "card" ? "border-primary" : "border-gray-200"
                }`}
              >
                <RadioGroupItem value="card" id="card" className="mr-2" />
                <Label htmlFor="card" className="flex cursor-pointer items-center">
                  <CreditCard className="text-primary mr-2 h-5 w-5" />
                  Credit / Debit Card
                </Label>
              </div>

              <div
                className={`flex items-center rounded-md border p-4 ${
                  field.value === "cash" ? "border-primary" : "border-gray-200"
                }`}
              >
                <RadioGroupItem value="cash" id="cash" className="mr-2" />
                <Label htmlFor="cash" className="cursor-pointer">
                  Cash on Delivery
                </Label>
              </div>

              {/* <div
                className={`flex items-center rounded-md border p-4 ${
                  field.value === "payoneer" ? "border-primary" : "border-gray-200"
                }`}
              >
                <RadioGroupItem value="payoneer" id="payoneer" className="mr-2" />
                <Label htmlFor="payoneer" className="cursor-pointer">
                  Payoneer
                </Label>
              </div> */}
            </RadioGroup>

            {/* {field.value === "card" && (
              <div className="rounded-md bg-gray-50 p-4">
                <div className="mb-6 flex space-x-4">
                  <div className="flex h-8 w-12 items-center justify-center rounded border">
                    <Image src="/no-image-placeholder.svg?height=20&width=30" alt="Visa" width={30} height={20} />
                  </div>
                  <div className="flex h-8 w-12 items-center justify-center rounded border">
                    <Image src="/no-image-placeholder.svg?height=20&width=30" alt="Mastercard" width={30} height={20} />
                  </div>
                  <div className="flex h-8 w-12 items-center justify-center rounded border">
                    <Image src="/no-image-placeholder.svg?height=20&width=30" alt="Union Pay" width={30} height={20} />
                  </div>
                  <div className="flex h-8 w-12 items-center justify-center rounded border">
                    <Image src="/no-image-placeholder.svg?height=20&width=30" alt="Stripe" width={30} height={20} />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="cardHolderName">Card holder name</Label>
                    <Input
                      id="cardHolderName"
                      className={`h-14 bg-white ${errors.cardHolderName ? "border-red-500" : "mt-2"}`}
                      {...register("cardHolderName")}
                    />
                    {errors.cardHolderName && (
                      <p className="mt-1 text-sm text-red-500">{errors.cardHolderName.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="cardNumber">Card number</Label>
                    <Input
                      id="cardNumber"
                      className={`h-14 bg-white ${errors.cardNumber ? "border-red-500" : "mt-2"}`}
                      {...register("cardNumber")}
                    />
                    {errors.cardNumber && <p className="mt-1 text-sm text-red-500">{errors.cardNumber.message}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiryDate">Expiry date</Label>
                      <Input
                        id="expiryDate"
                        placeholder="MM/YY"
                        className={`h-14 bg-white ${errors.expiryDate ? "border-red-500" : "mt-2"}`}
                        {...register("expiryDate")}
                      />
                      {errors.expiryDate && <p className="mt-1 text-sm text-red-500">{errors.expiryDate.message}</p>}
                    </div>

                    <div>
                      <Label htmlFor="cvc">CVC</Label>
                      <Input
                        id="cvc"
                        className={`h-14 bg-white ${errors.cvc ? "border-red-500" : "mt-2"}`}
                        {...register("cvc")}
                      />
                      {errors.cvc && <p className="mt-1 text-sm text-red-500">{errors.cvc.message}</p>}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Controller
                      name="saveCardDetails"
                      control={control}
                      render={({ field: saveField }) => (
                        <Checkbox id="saveCardDetails" checked={saveField.value} onCheckedChange={saveField.onChange} />
                      )}
                    />
                    <Label htmlFor="saveCardDetails">Save card details for future purchases</Label>
                  </div>
                </div>
              </div>
            )} */}

            <Button type="button" disabled={isPending} className="mt-6 w-full" onClick={handlePayment}>
              {isPending ? "Processing..." : "Order Now"}
            </Button>
          </>
        )}
      />
    </div>
  );
};

export default PaymentMethod;
