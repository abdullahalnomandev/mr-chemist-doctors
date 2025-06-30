"use client";

import { AuthForm, FormSchema, RegisterFormData } from "@/components/auth/auth-form";
import { serverApiRequest } from "@/lib/utils-server";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface RegisterData {
  password: string;
  customer: {
    name: {
      firstName: string;
      lastName: string;
    };
    email: string;
  };
}

export default function RegisterPage() {
  const router = useRouter();

  const { mutateAsync: registerUser, isPending } = useMutation({
    mutationFn: async (data: RegisterData) => {
      const result = await serverApiRequest("POST", "/users/create-customer", {
        data,
      });
      if (!result.success) {
        throw new Error("Registration failed");
      }
      return result;
    },
    onSuccess: () => {
      toast.success("Account Created", {
        description: "Your account has been created successfully",
      });
      router.push("/auth/login?message=Account created successfully. Please log in.");
    },
    onError: (error) => {
      console.error("Registration error:", error);
      toast.error(error?.message || "Somthing went wrong...");
    },
  });

  const onSubmit = async (data: FormSchema) => {
    // We know this is a register form, so we can safely cast to RegisterFormData
    const formData = data as RegisterFormData & { type: "register" };
    const formattedData: RegisterData = {
      password: formData.password,
      customer: {
        name: {
          firstName: formData.firstName,
          lastName: formData.lastName,
        },
        email: formData.email,
      },
    };
    await registerUser(formattedData);
  };

  return (
    <div>
      {/* Breadcrumb */}
      <div className="bg-secondary py-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-sm">
            <Link href="/" className="hover:text-primary text-gray-500">
              Home
            </Link>
            / <span className="text-primary font-medium">Register</span>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center px-4 py-4 sm:px-16">
        <div className="w-full max-w-md">
          <div className="mt-8 rounded-lg bg-white p-8 shadow-md">
            <div className="pb-2">
              <h1 className="text-3xl font-bold">Create an account</h1>

              <p className="py-1 pb-3 text-sm text-gray-600">
                Already have an account?{" "}
                <Link href="/auth/login" className="text-primary hover:underline">
                  Log in
                </Link>
              </p>
            </div>
            <AuthForm type="register" onSubmit={onSubmit} isLoading={isPending} />
          </div>
        </div>
      </div>
    </div>
  );
}
