import AppLayout from "@/components/dashboard/navigation/AppLayout";
import { PT_Sans } from "next/font/google";

const pt_sans = PT_Sans({
  subsets: ["latin"],
  display: "block",
  weight: "400",
});

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={` ${pt_sans.className} antialiased text-bl-base`}>
      <AppLayout>{children}</AppLayout>
    </div>
  );
}
