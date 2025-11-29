import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { Suspense } from "react";
import QueryProvider from "@/providers/QueryProvider";
import NextTopLoader from "nextjs-toploader";
import AuthHydrator from "@/providers/AuthHydrator";

const DmSans = DM_Sans({
  subsets: ["latin-ext"],
  variable: "--dm-sans",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "FHFL IFRS9",
  description: "IFRS9 Model Execution",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` ${DmSans.className} antialiased text-bl-base`}>
        <NextTopLoader color="#AFEB2B" showSpinner={false} />
        <Suspense fallback={<div></div>}>
          <QueryProvider>
            <AuthHydrator />
            {children}

            <Toaster richColors position="top-right" closeButton />
          </QueryProvider>
        </Suspense>
      </body>
    </html>
  );
}
