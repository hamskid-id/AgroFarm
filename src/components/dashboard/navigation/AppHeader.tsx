"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import CustomAvatar from "@/components/ui/custom-avatar";
import { useRouter } from "nextjs-toploader/app";
import { ChevronLeft, Search, X } from "lucide-react";
import Link from "next/link";
import { useAuthStore } from "@/stores/auth-store";
import { navItems } from "@/components/constants/navigation";
import { NotificationIcon } from "@/svg";

const AppHeader: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const activeItem = navItems.find((item) => pathname === item.url);
  const { user } = useAuthStore((s) => s);

  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const searchInputRef = React.useRef<HTMLInputElement>(null);

  // Focus input when search opens
  React.useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  const handleSearchSubmit = () => {
    // Handle search logic here
    console.log("Search query:", searchQuery);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearchSubmit();
    }
  };

  return (
    <header className="w-full h-16 md:h-18 bg-white border border-gray-200 flex items-center justify-between px-4 md:px-10 rounded-lg relative">
      {/* Mobile Search Overlay */}
      <div
        className={`
          absolute inset-0 bg-white z-50 rounded-lg flex items-center px-4
          md:hidden
          transition-all duration-300 ease-in-out
          ${isSearchOpen ? "opacity-100 visible" : "opacity-0 invisible"}
        `}
      >
        <div className="flex-1 flex items-center gap-2">
          <Search className="w-5 h-5 text-gray-400 flex-shrink-0" />
          <input
            ref={searchInputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Search..."
            className="flex-1 outline-none text-sm text-gray-800 bg-transparent"
          />
          <button
            onClick={() => {
              setIsSearchOpen(false);
              setSearchQuery("");
            }}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Title or Back Button */}
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

      <div className="flex items-center gap-4 md:gap-6 ml-auto">
        {/* Desktop Search Bar */}
        <div className="hidden md:flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2 w-64 border border-gray-200 focus-within:border-gray-300 transition-colors">
          <Search className="w-4 h-4 text-gray-400 flex-shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Search..."
            className="flex-1 outline-none text-sm text-gray-800 bg-transparent placeholder:text-gray-400"
          />
        </div>

        {/* Mobile Search Icon */}
        <button
          onClick={() => setIsSearchOpen(true)}
          className="md:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <Search className="w-5 h-5 text-gray-600" />
        </button>

        {/* Notification Icon */}
        <div className="relative cursor-pointer">
          <NotificationIcon />
          <span className="absolute -top-2 -right-2 bg-[#E6F5EA] text-primary_40 text-xs font-semibold rounded-full px-1.5 py-0.5">
            3
          </span>
        </div>

        {/* User Profile */}
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
