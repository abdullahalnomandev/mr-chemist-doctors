"use client";

import { AuthForm } from "@/components/auth/auth-form";
import { serverApiRequest } from "@/lib/utils-server";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function ResetPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  // Redirect if token is missing
  useEffect(() => {
    if (!token) {
      toast.error("Invalid or Expired Link", {
        description: "The password reset link is invalid or has expired.",
      });
      router.replace("/auth/forgot-password");
    }
  }, [token, router]);

  const { mutateAsync: resetPassword } = useMutation({
    mutationFn: async ({ token, password }: { token: string; password: string }) => {
      const response = await serverApiRequest("POST", "/auth/reset-password", {
        data: { token, password },
      });

      if (!response.success) {
        throw new Error(response.message || "Failed to reset password.");
      }

      return response;
    },
    onError: (error: any) => {
      toast.error("Reset Failed", {
        description:
          error?.message === "User not found"
            ? "User not found. Please request a new reset link."
            : error?.message || "Something went wrong. Please try again.",
      });
    },
  });

  const handleSubmit = async (data: { password: string; confirmPassword: string }) => {
    if (!token) return;

    setIsLoading(true);
    try {
      await resetPassword({ token, password: data.password });

      toast.success("Password Reset Successful", {
        description: "You can now log in with your new password.",
      });

      router.push("/auth/login");
    } finally {
      setIsLoading(false);
    }
  };

  if (!token) return null;

  return (
    <div>
      {/* Breadcrumb */}
      <div className="bg-secondary py-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-sm">
            <Link href="/" className="hover:text-primary text-gray-500">
              Home
            </Link>{" "}
            / <span className="text-primary font-medium">Reset Password</span>
          </div>
        </div>
      </div>

      <div className="flex min-h-screen items-center justify-center px-4 py-4 sm:px-16">
        <div className="w-full max-w-md space-y-8">
          <div className="mt-8 rounded-lg bg-white p-8 shadow-sm">
            <div className="pb-2">
              <h1 className="text-3xl font-bold">Reset Password</h1>
              <p className="py-1 pb-3 text-sm text-gray-600">Please enter your new password below.</p>
            </div>
            <AuthForm type="resetPassword" onSubmit={handleSubmit} isLoading={isLoading} />
          </div>
        </div>
      </div>
    </div>
  );
}
