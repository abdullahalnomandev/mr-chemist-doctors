import "./globals.css";

import { Footer } from "@/components/layout/footer";
import { MainHeader } from "@/components/layout/header-main";
import { TopHeader } from "@/components/layout/header-top";
import { ClientProviders } from "@/components/providers/client-providers";
import { QueryProvider } from "@/components/providers/query-providers";
import { Metadata } from "next";
import { Urbanist } from "next/font/google";
import { PropsWithChildren } from "react";

const urbanist = Urbanist({ variable: "--font-urbanist", subsets: ["latin"] });
export const metadata: Metadata = { title: "Mr Chemist", description: "Health and Fitness Solutions" };

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body className={`${urbanist.style} font-medium antialiased`} suppressHydrationWarning>
        <QueryProvider>
          <ClientProviders>
            <div className="hidden sm:block">
              <TopHeader />
            </div>
            <MainHeader />
            {children}
            <Footer />
          </ClientProviders>
        </QueryProvider>
      </body>
    </html>
  );
}
