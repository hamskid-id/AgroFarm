import type { Metadata } from "next";
import { DM_Sans, PT_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { Suspense } from "react";
import QueryProvider from "@/providers/QueryProvider";
import NextTopLoader from "nextjs-toploader";
import AuthHydrator from "@/providers/AuthHydrator";

const pt_sans = PT_Sans({
  subsets: ["latin"],
  display: "block",
  weight: "400",
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
      <body className={` ${pt_sans.className} antialiased text-bl-base`}>
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
