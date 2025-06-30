"use client";

import { useMutation } from "@tanstack/react-query";
import { Loader2, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { Breadcrumb } from "@/components/account/breadcrumb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { serverApiRequest } from "@/lib/utils-server";

export default function ForgotPasswordPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
  });

  const [isEmailSent, setIsEmailSent] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      return serverApiRequest("POST", `/auth/forget-password`, {
        data: {
          email: formData.email,
        },
      });
    },
    onSuccess: () => {
      setIsEmailSent(true);
      toast.success("Reset Link Sent", {
        description: `We've sent a password reset link to ${formData.email}`,
      });
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : "Something went wrong.");
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate();
  };

  const breadcrumbItems = [{ label: "Forgot Password", href: "/auth/forgot-password" }];

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />

      <div className="flex min-h-screen items-center justify-center px-4 py-8">
        <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-6 shadow-sm">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Forgot your password?</h1>
            <p className="mt-2 text-sm text-gray-600">
              {isEmailSent
                ? "Check your email for the reset link."
                : "Enter your email and we'll send you a reset link to reset your password."}
            </p>
          </div>

          {isEmailSent ? (
            <div className="text-center">
              <p className="mb-4 text-gray-700">
                We've sent a reset password link to <strong>{formData.email}</strong>. Please check your inbox.
              </p>
              <Button variant="link" onClick={() => router.push("/auth/login")}>
                Back to login
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email address</Label>
                <div className="relative">
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    required
                  />
                  <Mail className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400" size={18} />
                </div>
              </div>

              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isPending}>
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Send Reset Link"
                )}
              </Button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
