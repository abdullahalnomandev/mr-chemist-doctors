"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FileText, HelpCircle, Lock, Package, Star, Truck, Upload, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import { toast } from "sonner";

import { QK } from "@/lib/query-keys";
import { cn } from "@/lib/utils";
import { serverApiRequest } from "@/lib/utils-server";
import { Skeleton } from "../ui/skeleton";

import type { ProfileFormData } from "@/app/account/personal-information/page-personal-information";

const navigationItems = [
  { title: "Personal Information", href: "/account/personal-information", icon: FileText },
  { title: "My Orders", href: "/account/orders", icon: Package },
  { title: "My Reviews", href: "/account/reviews", icon: Star },
  { title: "Shipping Address", href: "/account/shipping-address", icon: Truck },
  { title: "Change Password", href: "/account/change-password", icon: Lock },
  { title: "Need help? and Question", href: "/account/help", icon: HelpCircle },
];

export function AccountSidebar() {
  const pathname = usePathname();
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { data: profile, isLoading } = useQuery({
    queryKey: [QK.USER],
    queryFn: () => serverApiRequest("GET", "/users/me"),
    select: (res) => res.data,
  });

  const { mutateAsync: uploadFile } = useMutation({
    mutationFn: async (file: File) => {
      const buffer = Array.from(new Uint8Array(await file.arrayBuffer()));
      const res = await fetch("/api/cloudinary/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ buffer, filename: file.name }),
      });
      if (!res.ok) throw new Error("Upload failed");
      return (await res.json()).url;
    },
  });

  const { mutate: updateProfile, isPending: isUpdating } = useMutation({
    mutationKey: [QK.USER + "_EDIT"],
    mutationFn: (updatedData: ProfileFormData) =>
      serverApiRequest("PATCH", `/customers/${profile._id}`, {
        data: { customer: updatedData },
      }),
    onSuccess: () => {
      toast.success("Profile updated successfully");
      queryClient.invalidateQueries({ queryKey: [QK.USER] });
    },
    onError: (error) => {
      toast.error("Profile update failed");
      console.error(error);
    },
  });

  const handleProfileImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const uploadedUrl = await uploadFile(file);
      updateProfile({
        ...profile,
        profileImg: uploadedUrl,
      });
    } catch (err) {
      toast.error("Image upload failed: " + (err as Error).message);
    }
  };

  return (
    <div>
      <div className="mb-3 text-xl font-medium">My Account</div>

      <div className="rounded-2xl bg-white shadow-xs">
        <div className="flex items-center space-x-3 border-b p-4">
          <div className="group relative h-16 w-16 overflow-hidden rounded-full border shadow-sm">
            <Image
              src={profile?.profileImg || "/no-image-placeholder.svg"}
              alt="User avatar"
              width={64}
              height={64}
              className={cn(
                "h-full w-full rounded-full object-cover transition-all duration-200",
                isUpdating && "opacity-50",
              )}
              priority
            />

            {/* Upload overlay spinner */}
            {isUpdating && (
              <div className="absolute inset-0 z-10 flex items-center justify-center rounded-full bg-white/70">
                <svg className="text-primary h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                </svg>
              </div>
            )}

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUpdating}
              className={cn(
                "absolute right-0 bottom-0 flex h-6 w-6 items-center justify-center rounded-full text-white shadow-md transition",
                isUpdating ? "cursor-not-allowed bg-gray-400" : "hover:bg-primary bg-gray-800",
              )}
              title="Change picture"
            >
              <Upload className="h-4 w-4" />
            </button>

            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleProfileImageChange}
              className="hidden"
            />
          </div>

          <div>
            {isLoading ? (
              <div className="flex flex-col space-y-1">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-32" />
              </div>
            ) : (
              <div className="text-primary flex items-center text-sm font-medium">
                <User className="mr-1 h-3 w-3" />
                <span className="max-w-[200px] truncate">
                  {[profile?.name?.firstName || "", profile?.name?.middleName || "", profile?.name?.lastName || ""]
                    .filter(Boolean)
                    .join(" ")}
                </span>
              </div>
            )}
          </div>
        </div>

        <nav className="divide-y divide-gray-100">
          {navigationItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center space-x-3 px-4 py-3 text-sm font-medium transition-all",
                  isActive ? "text-primary border-primary border-l-2 bg-blue-50" : "text-gray-700 hover:bg-gray-50",
                )}
              >
                <item.icon className={cn("h-5 w-5", isActive ? "text-primary" : "text-gray-400")} />
                <span>{item.title}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
