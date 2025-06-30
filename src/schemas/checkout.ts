import { z } from "zod";

export const checkoutSchema = z.object({
    email: z.string().email({ message: "Please enter a valid email address" }),
    emailSubscription: z.boolean().optional(),
  
    firstName: z.string().min(1, { message: "First name is required" }),
    lastName: z.string().min(1, { message: "Last name is required" }),
    address: z.string().min(1, { message: "Address is required" }),
    apartment: z.string().optional(),
    city: z.string().min(1, { message: "City is required" }),
    state: z.string().min(1, { message: "State is required" }),
    postalCode: z.string().min(1, { message: "Postal code is required" }),
    phone: z.string().min(1, { message: "Phone number is required" }),
    saveInformation: z.boolean().optional(),
  
    paymentMethod: z.enum(["card", "cash", "payoneer"]).optional(),
    cardHolderName: z.string().optional(),
    cardNumber: z.string().optional(),
    cvc: z.string().optional(),
    expiryDate: z.string().optional(),
    saveCardDetails: z.boolean().optional(),
    shippingAddress: z.any().optional(),
    billingAddress: z.any().optional(),
  });