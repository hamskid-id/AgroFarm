"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { NavItem } from "@/types/navigation";
import * as React from "react";
import { useAuthStore } from "@/stores/auth-store";

interface NavMainProps {
  items: readonly NavItem[];
}

export function NavMain({ items }: NavMainProps) {
  const pathname = usePathname();
  const { user, isLoading } = useAuthStore((s) => s);
  const userRole = user?.role;

  const getActiveUrl = React.useCallback(() => {
    // Exact match first
    const exactMatch = items.find((item) => pathname === item.url);
    if (exactMatch) return exactMatch.url;

    // All matching parent routes
    const matchingItems = items.filter((item) =>
      pathname.startsWith(item.url + "/"),
    );

    // Return the longest (most specific) match
    if (matchingItems.length > 0) {
      return matchingItems.sort((a, b) => b.url.length - a.url.length)[0].url;
    }

    return null;
  }, [pathname, items]);

  const activeUrl = getActiveUrl();
  const isActive = (url: string) => url === activeUrl;

  return (
    <SidebarGroup>
      <SidebarMenu className="flex flex-col gap-3">
        {isLoading ? (
          <>
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="flex items-center gap-3 px-4 py-2 rounded-[12px] bg-primary_40/10 animate-pulse"
              >
                <div className="w-6 h-6 rounded-md bg-primary_40/30" />
                <div className="h-3 w-24 rounded bg-primary_40/20" />
              </div>
            ))}
          </>
        ) : (
          items.length > 0 &&
          items.map((item, index) => {
            const active = isActive(item.url);

            return (
              <SidebarMenuItem key={`${item.url}-${index}`}>
                <SidebarMenuButton
                  tooltip={item.title}
                  asChild
                  className={cn(
                    "transition-colors duration-200 rounded-[12px] !px-4",
                    active
                      ? "bg-primary_40 text-white"
                      : "text-[#CAEAD4] hover:text-white hover:bg-primary_40/70"
                  )}
                  data-active={active}
                >
                  <Link
                    href={item.url}
                    className="flex items-center gap-3 w-full"
                  >
                    {item.icon && (
                      <item.icon className="w-[24px] h-[24px] flex-shrink-0" />
                    )}
                    <span className="text-[14px] font-[500]">{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })
        )}
      </SidebarMenu>
    </SidebarGroup>
  );
}
