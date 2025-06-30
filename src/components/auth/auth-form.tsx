"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { Input } from "../ui/input";

// Login schema
const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

// Register schema
const registerSchema = z
  .object({
    firstName: z.string().min(1, { message: "First name is required" }),
    middleName: z.string().optional(),
    lastName: z.string().min(1, { message: "Last name is required" }),
    email: z.string().email({ message: "Please enter a valid email address" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z.string().min(6, { message: "Password must be at least 6 characters" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

// Forgot password schema
const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
});

// Reset password schema
const resetPasswordSchema = z
  .object({
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z.string().min(6, { message: "Password must be at least 6 characters" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

// Create a union type for all possible form schemas
// Define separate types for each form
export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

// Create a discriminated union type for all form schemas
export type FormSchema =
  | (LoginFormData & { type: "login" })
  | (RegisterFormData & { type: "register" })
  | (ForgotPasswordFormData & { type: "forgotPassword" })
  | (ResetPasswordFormData & { type: "resetPassword" });

interface AuthFormProps {
  type: "login" | "register" | "forgotPassword" | "resetPassword";
  onSubmit: (data: any) => Promise<void>;
  isLoading?: boolean;
}

export function AuthForm({ type, onSubmit, isLoading = false }: AuthFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Select the appropriate schema based on form type
  const schema =
    type === "login"
      ? loginSchema
      : type === "register"
        ? registerSchema
        : type === "forgotPassword"
          ? forgotPasswordSchema
          : resetPasswordSchema;

  // Initialize form with shadcn Form
  const form = useForm<FormSchema>({
    resolver: zodResolver(schema as unknown as z.ZodType<FormSchema>),
    defaultValues: {
      firstName: "",
      middleName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  console.log("Errors:", form.formState.errors);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {type === "register" && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  {/* <FormLabel>First Name</FormLabel> */}
                  <FormControl>
                    <Input placeholder="First name" {...field} />
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
                  {/* <FormLabel>Last Name</FormLabel> */}
                  <FormControl>
                    <Input placeholder="Last name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )}

        {type !== "resetPassword" && (
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                {/* <FormLabel>Email address</FormLabel> */}
                <FormControl>
                  <Input type="email" placeholder="Email address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {type !== "forgotPassword" && (
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                {/* <FormLabel>Enter a password</FormLabel> */}
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter a password"
                      className="pr-10"
                      {...field}
                    />
                    <button
                      type="button"
                      className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        {type === "login" && (
          <div className="-mt-1 flex justify-start">
            <Link href="/auth/forgot-password" className="text-primary text-sm hover:underline">
              Forgot Password
            </Link>
          </div>
        )}

        {(type === "register" || type === "resetPassword") && (
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                {/* <FormLabel>Re-enter password</FormLabel> */}
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Re-enter password"
                      className="pr-10"
                      {...field}
                    />
                    <button
                      type="button"
                      className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {type === "register" && (
          <div className="flex items-start space-x-2">
            <input type="checkbox" id="terms" required className="mt-1" />
            <label htmlFor="terms" className="text-sm text-gray-600">
              By creating an account, you agree to our{" "}
              <Link href="#" className="text-primary underline">
                Terms of use
              </Link>{" "}
              and{" "}
              <Link href="#" className="text-primary underline">
                Privacy Policy
              </Link>
              .
            </label>
          </div>
        )}

        <Button type="submit" className="w-full rounded-full" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {type === "register"
                ? "Creating account..."
                : type === "forgotPassword"
                  ? "Sending reset link..."
                  : type === "resetPassword"
                    ? "Resetting password..."
                    : "Submitting..."}
            </>
          ) : (
            <>
              {type === "register"
                ? "Create Account"
                : type === "forgotPassword"
                  ? "Send reset password link"
                  : type === "resetPassword"
                    ? "Reset password"
                    : "Log In"}
            </>
          )}
        </Button>
      </form>
    </Form>
  );
}
