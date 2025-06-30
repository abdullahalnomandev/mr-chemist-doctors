"use client";

import { useMutation } from "@tanstack/react-query";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { Breadcrumb } from "@/components/account/breadcrumb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { QK } from "@/lib/query-keys";
import { serverApiRequest } from "@/lib/utils-server";

export default function ChangePasswordPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showOldPassword, setShowOldPassword] = useState(true);
  const [showNewPassword, setShowNewPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);

  const { mutate, isPending } = useMutation({
    mutationKey: [QK.USER + "_CHANGE_PASSWORD"],
    mutationFn: async () => {
      if (formData.newPassword !== formData.confirmPassword) {
        throw new Error("New passwords do not match");
      }

      return serverApiRequest("POST", `/auth/change-password`, {
        data: {
          oldPassword: formData.oldPassword,
          newPassword: formData.newPassword,
        },
      });
    },
    onSuccess: () => {
      toast.success("Your password has been changed successfully.");
      router.push("/account/personal-information");
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : "Failed to change password.");
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

  const breadcrumbItems = [{ label: "Change Password", href: "/account/change-password" }];

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />

      <div className="rounded-lg bg-white p-4 shadow-xs">
        <h1 className="mb-6 text-xl font-medium">Change Password</h1>
        <p className="mb-6 text-gray-600">
          Your password must be at least 6 characters and should include a combination of numbers, letters and special
          characters (S@&!).
        </p>

        <form onSubmit={handleSubmit} className="max-w-md space-y-6">
          {/* Old Password */}
          <div className="space-y-2">
            <Label htmlFor="oldPassword">Current password</Label>
            <div className="relative">
              <Input
                id="oldPassword"
                name="oldPassword"
                type={showOldPassword ? "text" : "password"}
                value={formData.oldPassword}
                onChange={handleChange}
                placeholder={showOldPassword ? "Current password" : ""}
                required
              />
              <button
                type="button"
                className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500"
                onClick={() => setShowOldPassword(!showOldPassword)}
              >
                {showOldPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div className="space-y-2">
            <Label htmlFor="newPassword">New password</Label>
            <div className="relative">
              <Input
                id="newPassword"
                name="newPassword"
                type={showNewPassword ? "text" : "password"}
                value={formData.newPassword}
                onChange={handleChange}
                placeholder={showNewPassword ? "New password" : ""}
                required
              />
              <button
                type="button"
                className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500"
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Re-type new password</Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder={showConfirmPassword ? "Re-type new password" : ""}
                required
              />
              <button
                type="button"
                className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700" disabled={isPending}>
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Save Now"
            )}
          </Button>
        </form>
      </div>
    </>
  );
}
