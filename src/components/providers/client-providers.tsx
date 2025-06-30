"use client";

import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";
import { TooltipProvider } from "../ui/tooltip";

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <TooltipProvider delayDuration={0} disableHoverableContent>{children}</TooltipProvider>
      
      <Toaster />
    </SessionProvider>
  );
}
