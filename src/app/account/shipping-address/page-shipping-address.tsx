"use client";

import { Breadcrumb } from "@/components/account/breadcrumb";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { QK } from "@/lib/query-keys";
import { serverApiRequest } from "@/lib/utils-server";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2, PenLine, Plus, Save } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

// Define the address type based on the schema
export type TShippingAddress = {
  id: string;
  firstName: string;
  lastName: string;
  address: string;
  apartment?: string;
  city: string;
  state: string;
  postalCode: string;
  phone: string;
};

// Define the address schema with Zod
const addressSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  address: z.string().min(1, { message: "Address is required" }),
  apartment: z.string().optional(),
  city: z.string().min(1, { message: "City is required" }),
  state: z.string().min(1, { message: "State is required" }),
  postalCode: z.string().min(1, { message: "Postal code is required" }),
  phone: z.string().min(1, { message: "Phone number is required" }),
});

type AddressFormData = z.infer<typeof addressSchema>;

export default function ShippingAddressPage() {
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);

  // Fetch shipping address
  const {
    data: userData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [QK.ADDRESS + "_SHIPPING"],
    queryFn: () => serverApiRequest("GET", "/users/me"),
    select: (data) => data?.data || {},
  });

  const hasAddress = userData?.shippingAddress;

  // Initialize form with react-hook-form
  const form = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      address: "",
      apartment: "",
      city: "",
      state: "",
      postalCode: "",
      phone: "",
    },
  });

  // Set form values when address data is loaded
  useEffect(() => {
    if (userData?.shippingAddress) {
      const currentAddress = userData.shippingAddress;
      form.reset({
        firstName: currentAddress.firstName || "",
        lastName: currentAddress.lastName || "",
        address: currentAddress.address || "",
        apartment: currentAddress.apartment || "",
        city: currentAddress.city || "",
        state: currentAddress.state || "",
        postalCode: currentAddress.postalCode || "",
        phone: currentAddress.phone || "",
      });
    }
  }, [form, userData?.shippingAddress]);

  // Update shipping address mutation
  const { mutate: updateAddress, isPending: isUpdating } = useMutation({
    mutationKey: [QK.ADDRESS + "_UPDATE_SHIPPING"],
    mutationFn: (updatedData: AddressFormData) =>
      serverApiRequest("PATCH", `/customers/${userData._id}`, {
        data: { customer: { shippingAddress: updatedData } },
      }),
    onSuccess: () => {
      toast.success("Shipping address updated successfully");
      queryClient.invalidateQueries({ queryKey: [QK.ADDRESS + "_SHIPPING"] });
      setIsEditing(false);
    },
    onError: () => {
      toast.error("Failed to update shipping address. Please try again.");
    },
  });

  const breadcrumbItems = [{ label: "Shipping Address", href: "/account/shipping-address" }];

  const handleAddNewAddress = () => {
    form.reset({
      firstName: "",
      lastName: "",
      address: "",
      apartment: "",
      city: "",
      state: "",
      postalCode: "",
      phone: "",
    });
    setIsEditing(true);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    form.reset();
    setIsEditing(false);
  };

  const onSubmit = (data: AddressFormData) => {
    updateAddress(data);
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Loader2 className="text-primary h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-48 items-center justify-center">
        <p className="text-red-500">Error loading shipping address. Please try again.</p>
      </div>
    );
  }

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />

      <div className="rounded-lg bg-white p-4 shadow-xs">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-xl font-medium">Shipping Address</h1>
          {!isEditing ? (
            hasAddress ? (
              <Button variant="outline" size="sm" className="border-blue-600 text-blue-600" onClick={handleEdit}>
                <PenLine className="mr-2 h-4 w-4" />
                Edit
              </Button>
            ) : (
              <Button onClick={handleAddNewAddress} className="bg-blue-600 hover:bg-blue-700">
                <Plus className="mr-2 h-4 w-4" />
                Add New Address
              </Button>
            )
          ) : (
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleCancel}>
                Cancel
              </Button>
              <Button variant="default" size="sm" onClick={form.handleSubmit(onSubmit)} disabled={isUpdating}>
                {isUpdating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save
                  </>
                )}
              </Button>
            </div>
          )}
        </div>

        {!isEditing ? (
          hasAddress ? (
            <div className="space-y-6">
              <div className="rounded-lg bg-gray-50 p-6">
                <div className="mb-4">
                  <h2 className="text-lg font-semibold">
                    {userData.shippingAddress.firstName} {userData.shippingAddress.lastName}
                  </h2>
                </div>

                <div className="grid grid-cols-1 gap-x-12 gap-y-2 md:grid-cols-2">
                  <div>
                    <h3 className="mb-1 text-sm font-medium text-gray-500">Address</h3>
                    <p className="text-gray-900">{userData.shippingAddress.address}</p>
                    {userData.shippingAddress.apartment && (
                      <p className="text-gray-900">{userData.shippingAddress.apartment}</p>
                    )}
                  </div>

                  <div>
                    <h3 className="mb-1 text-sm font-medium text-gray-500">City</h3>
                    <p className="text-gray-900">{userData.shippingAddress.city}</p>
                  </div>

                  <div>
                    <h3 className="mb-1 text-sm font-medium text-gray-500">State</h3>
                    <p className="text-gray-900">{userData.shippingAddress.state}</p>
                  </div>

                  <div>
                    <h3 className="mb-1 text-sm font-medium text-gray-500">Postal Code</h3>
                    <p className="text-gray-900">{userData.shippingAddress.postalCode}</p>
                  </div>

                  <div>
                    <h3 className="mb-1 text-sm font-medium text-gray-500">Phone</h3>
                    <p className="text-gray-900">{userData.shippingAddress.phone}</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-lg bg-gray-50 py-8 text-center">
              <p className="mb-4 text-gray-500">You don't have any saved address yet.</p>
              <Button onClick={handleAddNewAddress}>Add New Address</Button>
            </div>
          )
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 gap-x-6 gap-y-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="First Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Last Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem className="col-span-1 md:col-span-2">
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input placeholder="Address" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="apartment"
                  render={({ field }) => (
                    <FormItem className="col-span-1 md:col-span-2">
                      <FormLabel>Apartment, suite, etc. (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Apartment, suite, etc." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input placeholder="City" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>State</FormLabel>
                      <FormControl>
                        <Input placeholder="State" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="postalCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Postal Code</FormLabel>
                      <FormControl>
                        <Input placeholder="Postal Code" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input placeholder="Phone" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </form>
          </Form>
        )}
      </div>
    </>
  );
}
