import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { Suspense } from "react";
import QueryProvider from "@/providers/QueryProvider";
import NextTopLoader from "nextjs-toploader";
import AuthHydrator from "@/providers/AuthHydrator";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

export const metadata: Metadata = {
  title: "AgroCommerce",
  description: "Agricultural Produce market place",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} antialiased text-bl-base`}
      >
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
