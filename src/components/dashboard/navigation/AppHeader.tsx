"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import CustomAvatar from "@/components/ui/custom-avatar";
// import { NotificationIcon } from "@/svg";
import { useRouter } from "nextjs-toploader/app";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useAuthStore } from "@/stores/auth-store";
import { navItems } from "@/components/constants/navigation";

const AppHeader: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const activeItem = navItems.find((item) => pathname === item.url);
  const { user } = useAuthStore((s) => s);

  return (
    <header className="w-full h-16 md:h-18 bg-white border-b border-gray-200 flex items-center px-4 md:px-10">
      {activeItem ? (
        <h1 className="text-md md:text-lg font-[700] text-gray-800">
          {activeItem.title}
        </h1>
      ) : (
        <Link
          href="#"
          onClick={() => router.back()}
          className="me-auto flex items-center justify-center text-sm text-[#667085]"
        >
          <ChevronLeft className="mr-[0.25rem] inline w-4 h-4" />
          Back
        </Link>
      )}

      <div className="flex items-center gap-6 ml-auto">
        {/* <div className="relative cursor-pointer">
          <NotificationIcon />
          <span className="absolute -top-2 -right-2 bg-[#E6F5EA] text-primary_40 text-xs font-semibold rounded-full px-1.5 py-0.5">
            3
          </span>
        </div> */}

        <div
          onClick={() => router.push("/dashboard/profile")}
          className="flex items-center gap-3 cursor-pointer"
        >
          <CustomAvatar name={user?.name || "NA"} size={36} />
          <div className="hidden sm:flex flex-col">
            <span className="text-sm font-semibold text-gray-800">
              {user?.name || "Test Name"}
            </span>
            <span className="text-xs text-[#5B5F5E] font-normal">
              {user?.email || "Test@gmail.com"}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
