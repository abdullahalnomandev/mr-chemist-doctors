/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import { Label } from "@radix-ui/react-label";
import { HelpCircle } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Control, Controller, FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";

interface ShippingAddressProps {
  control: Control<any>;
  errors: FieldErrors<any>;
  register: UseFormRegister<any>;
  setValue?: UseFormSetValue<any>;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const ShippingAddress = ({ control, register, errors, handleSubmit }: ShippingAddressProps) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // or a loading state
  }

  return (
    <form onSubmit={handleSubmit}>
      {" "}
      {/* Contact */}
      <div className="rounded-3xl bg-white p-4 shadow-xs">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-medium">Contact</h2>
          <div className="text-sm">
            Already have an account?{" "}
            <Link href="/login" className="text-primary font-medium">
              Log in
            </Link>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              className={errors.email ? "border-red-500" : "mt-2"}
              disabled
              {...register("email")}
            />
            {errors.email?.message && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
          </div>

          <div className="flex items-center space-x-2">
            <Controller
              name="emailSubscription"
              control={control}
              render={({ field }) => (
                <Checkbox id="emailSubscription" checked={field.value} onCheckedChange={field.onChange} />
              )}
            />
            <Label htmlFor="emailSubscription">Email me with news and offers.</Label>
          </div>
        </div>
      </div>
      {/* Shipping */}
      <div className="mt-6 rounded-3xl bg-white p-4 shadow-xs">
        <h2 className="mb-6 text-xl font-medium">Shipping Address</h2>

        <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <Label htmlFor="firstName">First name</Label>
            <Input id="firstName" className={errors.firstName ? "border-red-500" : "mt-2"} {...register("firstName")} />
            {errors.firstName?.message && <p className="mt-1 text-sm text-red-500">{errors.firstName.message}</p>}
          </div>

          <div>
            <Label htmlFor="lastName">Last name</Label>
            <Input id="lastName" className={errors.lastName ? "border-red-500" : "mt-2"} {...register("lastName")} />
            {(errors.lastName as any)?.message && (
              <p className="mt-1 text-sm text-red-500">{errors.lastName.message}</p>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="address">Address</Label>
            <Input id="address" className={errors.address ? "border-red-500" : "mt-2"} {...register("address")} />
            {errors.address?.message && <p className="mt-1 text-sm text-red-500">{errors.address.message}</p>}
          </div>

          <div>
            <Label htmlFor="apartment">Apartment, suite, etc. (optional)</Label>
            <Input id="apartment" {...register("apartment")} className="mt-2" />
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            <div>
              <Label htmlFor="city">City</Label>
              <Input id="city" className={errors.city ? "border-red-500" : "mt-2"} {...register("city")} />
              {errors.city?.message && <p className="mt-1 text-sm text-red-500">{errors.city.message}</p>}
            </div>

            <div>
              <Label htmlFor="state">State</Label>
              <Input id="state" className={errors.state ? "border-red-500" : "mt-2"} {...register("state")} />
              {errors.state?.message && <p className="mt-1 text-sm text-red-500">{errors.state.message}</p>}
            </div>

            <div>
              <Label htmlFor="postalCode">Postal code</Label>
              <Input
                id="postalCode"
                className={errors.postalCode ? "border-red-500" : "mt-2"}
                {...register("postalCode")}
              />
              {errors.postalCode?.message && <p className="mt-1 text-sm text-red-500">{errors.postalCode.message}</p>}
            </div>
          </div>

          <div className="relative">
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" className={errors.phone ? "border-red-500" : "mt-2"} {...register("phone")} />
            <div className="absolute top-9 right-3">
              <HelpCircle size={16} className="text-gray-400" />
            </div>
            {errors.phone?.message && <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>}
          </div>
        </div>

        <div className="mt-6 flex items-center space-x-2">
          <Controller
            name="saveInformation"
            control={control}
            render={({ field }) => (
              <Checkbox id="saveInformation" checked={field.value} onCheckedChange={field.onChange} />
            )}
          />
          <Label htmlFor="saveInformation">Save this information for next time</Label>
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <Button
            variant="outline"
            onClick={() => {
              /* Optional cancel/reset logic */
            }}
          >
            Cancel
          </Button>
          <Button type="submit">Save</Button>
        </div>
      </div>
    </form>
  );
};

export default ShippingAddress;
