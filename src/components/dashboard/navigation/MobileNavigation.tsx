"use client";

import React, { useState, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { NavItem } from "@/types/navigation";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/stores/auth-store";

interface MobileNavProps {
  items: readonly NavItem[];
}

export const MobileNav: React.FC<MobileNavProps> = ({ items }) => {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  const { user, isLoading } = useAuthStore((s) => s);

  const getActiveUrl = useCallback(() => {
    // Exact match first
    const exactMatch = items.find((item) => pathname === item.url);
    if (exactMatch) return exactMatch.url;

    // Find all matching parent routes
    const matchingItems = items.filter((item) =>
      pathname.startsWith(item.url + "/")
    );

    // Return the longest (most specific) match
    if (matchingItems.length > 0) {
      return matchingItems.sort((a, b) => b.url.length - a.url.length)[0].url;
    }

    return null;
  }, [pathname, items]);

  const activeUrl = getActiveUrl();
  const isActive = (url: string) => url === activeUrl;

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="block md:hidden">
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-neutral-200 safe-area-inset-bottom">
        <div className="flex items-center justify-around px-2 py-1">
          {isLoading
            ? [...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center justify-center gap-1 py-2 px-3 w-full animate-pulse"
                >
                  <div className="h-6 w-6 rounded-full bg-gray-300/40" />
                  <div className="h-2 w-12 rounded bg-gray-300/30 mt-1" />
                </div>
              ))
            : items.map((item, index) => {
                const active = isActive(item.url);

                return (
                  <Link
                    key={`${item.url || "item"}-${index}`}
                    href={item.url}
                    className="flex-1 min-w-0"
                  >
                    <motion.div
                      whileTap={{ scale: 0.95 }}
                      className={cn(
                        "flex flex-col items-center justify-center gap-1 py-2 px-1 rounded-lg transition-colors",
                        active
                          ? "text-primary_40"
                          : "text-neutral-400 hover:text-neutral-700"
                      )}
                    >
                      <motion.div
                        animate={{
                          scale: active ? 1.1 : 1,
                          y: active ? -2 : 0,
                        }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <item.icon className="h-6 w-6" />
                      </motion.div>

                      <span
                        className={cn(
                          "text-[10px] font-medium truncate w-full text-center",
                          active ? "text-[#CAEAD4]" : ""
                        )}
                      >
                        {item.title}
                      </span>

                      {active && (
                        <motion.div
                          layoutId="activeIndicator"
                          className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-12 bg-primary_40 rounded-full"
                          transition={{
                            type: "spring",
                            stiffness: 380,
                            damping: 30,
                          }}
                        />
                      )}
                    </motion.div>
                  </Link>
                );
              })}
        </div>
      </nav>
    </div>
  );
};
