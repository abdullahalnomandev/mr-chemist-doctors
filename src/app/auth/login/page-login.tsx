"use client";

import { AuthForm } from "@/components/auth/auth-form";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const isTokenExpired = searchParams.get("tokenExpired") === "true";
    if (isTokenExpired) {
      toast.error("Session expired", {
        description: "Your session has expired. Please login again.",
      });
    }
  }, [searchParams]);

  const onSubmit = async (data: { email: string; password: string }) => {
    setIsLoading(true);
    try {
      const callbackUrl = searchParams.get("callbackUrl") || "/";
      const result = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
        callbackUrl,
      });

      if (result?.error) {
        toast.error("Error", {
          description: result.error || "Invalid email or password",
        });
        return;
      }

      if (result?.ok) {
        router.push(callbackUrl);
        toast.success("Login Success", {
          description: "You have successfully logged in",
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Error", {
        description: "Something went wrong. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // 🔐 TEMPORARY TEST LOGIN — REMOVE LATER
  const handleTestLogin = async () => {
    setIsLoading(true);
    const email = "abdullahalnoman1512@gmail.com";
    const password = "Abdullahalnoman1512@";
    const callbackUrl = searchParams.get("callbackUrl") || "/";

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
      callbackUrl,
    });

    if (result?.error) {
      toast.error("Test Login Failed", {
        description: result.error,
      });
    } else {
      router.push(callbackUrl);
      toast.success("Logged in as Test User");
    }

    setIsLoading(false);
  };

  // 🔐 TEMPORARY ADMIN LOGIN — REMOVE LATER
  const handleAdminLogin = () => {
    window.open("https://vercel.com/abdullahalnomanfbs-projects/portfolio", "_blank");
  };

  return (
    <div>
      {/* Breadcrumb */}
      <div className="bg-secondary py-4">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-sm">
            <Link href="/" className="hover:text-primary text-gray-500">
              Home
            </Link>
            / <span className="text-primary font-medium">Login</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center px-4 py-4 pt-1 sm:px-16">
        <div className="w-full max-w-md space-y-8">
          <div className="mt-4 rounded-lg bg-white p-8 shadow-sm">
            <div className="pb-2">
              <h1 className="text-3xl font-bold">Log in to your account</h1>
              <p className="py-1 pb-3 text-sm text-gray-600">
                Don&apos;t have an account?{" "}
                <Link href="/auth/register" className="text-primary hover:underline">
                  Sign up
                </Link>
              </p>
            </div>

            <AuthForm
              type="login"
              onSubmit={(
                data:
                  | { email: string; password: string }
                  | { name: string; email: string; password: string; confirmPassword: string }
                  | { email: string }
                  | { password: string; confirmPassword: string },
              ) => {
                if ("email" in data && "password" in data) {
                  return onSubmit({ email: data.email, password: data.password });
                }
                return Promise.reject(new Error("Invalid form data"));
              }}
              isLoading={isLoading}
            />
            {/* 🔐 TEMPORARY TEST LOGIN BUTTONS – REMOVE LATER */}
            <div className="mt-4 space-y-4 border-t border-t-gray-300 pt-6">
              <div className="text-center text-sm text-gray-600">
                <span className="text-2xl font-medium text-yellow-600">Development Testing Access</span>
              </div>

              <button
                onClick={handleTestLogin}
                disabled={isLoading}
                className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                Login with Test User
                {isLoading && <span className="ml-2 animate-spin">⌛</span>}
              </button>

              <button
                onClick={handleAdminLogin}
                className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-gray-800 px-4 py-2 font-medium text-white transition hover:bg-gray-900"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="3" y1="9" x2="21" y2="9"></line>
                  <line x1="9" y1="21" x2="9" y2="9"></line>
                </svg>
                Login with Admin
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
