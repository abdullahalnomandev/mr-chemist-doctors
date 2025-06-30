import { AccountSidebar } from "@/components/account/account-sidebar";
import type React from "react";

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-gray-50 py-4">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <div className="md:col-span-1">
            <AccountSidebar />
          </div>
          <div className="md:col-span-3">{children}</div>
        </div>
      </div>
    </div>
  );
}
