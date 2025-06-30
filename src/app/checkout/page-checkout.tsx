/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";

import type { ProfileFormData } from "@/app/account/personal-information/page-personal-information";
import OrderSummary from "@/components/checkout/order-summary";
import PaymentMethod from "@/components/checkout/payment-method";
import ShippingAddress from "@/components/checkout/shipping-address";
import Breadcrumbs from "@/components/ui/breadcrumb";
import { QK } from "@/lib/query-keys";
import { useCartStore } from "@/lib/store/cart-store";
import { serverApiRequest } from "@/lib/utils-server";
import { checkoutSchema } from "@/schemas/checkout";
import CheckoutShippingFormSkeleton from "@/skeletons/checkout/shipping-address";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

export default function CheckoutPage() {
  const { getSelectedItems } = useCartStore();
  const items = getSelectedItems();

  const queryClient = useQueryClient();
  const { data: profile, isSuccess: isShippingAddressLoading } = useQuery({
    queryKey: [QK.USER],
    queryFn: () => serverApiRequest("GET", "/users/me"),
    select: (data) => data.data,
  });

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      paymentMethod: "card",
      emailSubscription: false,
      saveInformation: false,
      saveCardDetails: false,
      email: profile?.email ?? "",
      firstName: profile?.shippingAddress?.firstName ?? "",
      lastName: profile?.shippingAddress?.lastName ?? "",
      address: profile?.shippingAddress?.address ?? "",
      apartment: profile?.shippingAddress?.apartment ?? "",
      city: profile?.shippingAddress?.city ?? "",
      state: profile?.shippingAddress?.state ?? "",
      postalCode: profile?.shippingAddress?.postalCode ?? "",
      phone: profile?.shippingAddress?.phone ?? "",
    },

    mode: "onBlur",
  });

  // Remove the useEffect since we're using defaultValues

  // PROFILE UPDATE
  const { mutate: updateProfile } = useMutation({
    mutationKey: [QK.USER + "_EDIT"],
    mutationFn: (updatedData: ProfileFormData) => {
      return serverApiRequest("PATCH", `/customers/${profile?._id}`, {
        data: { customer: updatedData },
      });
    },
    onSuccess: () => {
      toast.success("Profile updated successfully");
      queryClient.invalidateQueries({ queryKey: [QK.USER] });
    },
    onError: (error) => {
      toast.error(String(error) || "Profile update failed!");
    },
  });
  useEffect(() => {
    if (profile) {
      setValue("email", profile.email ?? "");
      setValue("firstName", profile.shippingAddress?.firstName ?? "");
      setValue("lastName", profile.shippingAddress?.lastName ?? "");
      setValue("address", profile.shippingAddress?.address ?? "");
      setValue("apartment", profile.shippingAddress?.apartment ?? "");
      setValue("city", profile.shippingAddress?.city ?? "");
      setValue("state", profile.shippingAddress?.state ?? "");
      setValue("postalCode", profile.shippingAddress?.postalCode ?? "");
      setValue("phone", profile.shippingAddress?.phone ?? "");
    }
  }, [profile, setValue]);

  const onSubmit = async (data: CheckoutFormValues) => {
    const addressData = {
      firstName: data.firstName,
      lastName: data.lastName,
      address: data.address,
      apartment: data.apartment,
      city: data.city,
      state: data.state,
      postalCode: data.postalCode,
      phone: data.phone,
    };

    if (data) {
      updateProfile({
        //  @ts-ignore
        shippingAddress: addressData as ProfileFormData,
      });
    }
  };

  // CREATE ORDER
  const paymentMethod = watch("paymentMethod");
  const router = useRouter();
  const { mutate: createOrder, isPending } = useMutation({
    mutationKey: [QK.ORDER + "_CREATE"],
    mutationFn: (orderData: ProfileFormData) => {
      return serverApiRequest("POST", `/orders`, {
        data: orderData,
      });
    },
    onSuccess: (response) => {
      if (paymentMethod === "card") {
        window.location = response?.data?.redirectStripeUrl;
      } else {
        toast.success("Order created successfully");
        router.push("/order-success");
      }
      queryClient.invalidateQueries({ queryKey: [QK.ORDER] });
    },
    onError: (error) => {
      toast.error(String(error?.message) || "Order creation failed! ");
    },
  });

  const handlePayment = async () => {
    if (!profile?._id || !profile?.shippingAddress) {
      toast.error("Missing profile or shipping address information");
      return;
    }

    const orderData = {
      couponCode: "",
      paymentMethod: watch("paymentMethod"),
      items: items.map((item) => ({
        id: item.id,
        variant_id: item.variant_id,
        quantity: item.quantity,
      })),
    };

    // @ts-ignore
    createOrder(orderData);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Cart", href: "/cart" }, { label: "Checkout" }]} />
      <div className="container mx-auto max-w-6xl px-4 py-4 sm:px-16">
        <div className="flex flex-col gap-4 lg:flex-row">
          <div className="space-y-4 lg:w-2/3">
            {isShippingAddressLoading ? (
              <ShippingAddress
                control={control}
                errors={errors}
                register={register}
                setValue={setValue}
                handleSubmit={handleSubmit(onSubmit)}
              />
            ) : (
              <CheckoutShippingFormSkeleton />
            )}

            <PaymentMethod
              isPending={isPending}
              control={control}
              errors={errors}
              register={register}
              handlePayment={handlePayment}
            />
          </div>
          <OrderSummary items={items as []} />
        </div>
      </div>
    </div>
  );
}
