"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { AppSidebarData } from "@/types/navigation";
import { SideBarCollapseTrigger } from "@/svg";
import { NavMain } from "./AppSidebarMain";
import { LogOut } from "lucide-react";
import AlertModal from "@/components/shared/AlertModal";
import { useAuthStore } from "@/stores/auth-store";
import { usePost } from "@/hooks/use-queries";
import { ApiResponse } from "@/types";
import CustomAvatar from "@/components/ui/custom-avatar";

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  data: AppSidebarData;
}

export function AppSidebar({ data, ...props }: AppSidebarProps) {
  const { toggleSidebar, state } = useSidebar();
  const { navMain, logoIcon: LogoComponent } = data;
  const router = useRouter();

  const [isLogoutModalOpen, setIsLogoutModalOpen] = React.useState(false);

  const isCollapsed = state === "collapsed";

  const logout = useAuthStore((s) => s.logout);
  const logoutApi = usePost<ApiResponse<string>, null>("/auth/logout");

  const handleLogout = async () => {
    try {
      await logoutApi.mutateAsync(null);
    } catch (err) {
      console.error("Logout API failed:", err);
    } finally {
      logout();
      await router.push("/auth/sign-in");
    }
  };

  return (
    <Sidebar
      collapsible="icon"
      {...props}
      className=" border border-gray-200 rounded-lg"
    >
      {/* Header */}
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="mb-[2rem] h-[71px] data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground !px-1"
            >
              {LogoComponent && !isCollapsed && (
                <LogoComponent style="w-[120px] h-[100px]" />
              )}
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        {/* <div
          onClick={toggleSidebar}
          className="cursor-pointer mr-[-3rem] w-fit absolute top-[6rem] right-[1rem]"
        >
          <SideBarCollapseTrigger />
        </div> */}
      </SidebarHeader>

      {/* Content */}
      <SidebarContent className="px-3">
        <div className="mb-4 flex flex-col items-center gap-2">
          <CustomAvatar
            className="w-[70px] h-[70px] border-2 border-green-200"
            name="Hamzat"
          />
          <h1 className="text-gray-500 font-400 text-[14px]">Welcome back,</h1>
          <p className="font-400 text-[16px]">Fabian More</p>
        </div>
        <NavMain items={navMain} />
      </SidebarContent>

      {/* Footer with Logout */}
      <SidebarFooter className="px-1 mt-auto">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              className="flex items-center gap-2 text-sm font-medium"
              onClick={() => setIsLogoutModalOpen(true)}
            >
              <LogOut className="h-4 w-4 text-gray-500" />
              {!isCollapsed && <span className="text-gray-500 font-[500]">Sign Out</span>}
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      {/* Logout Confirmation Modal */}
      <AlertModal
        isOpen={isLogoutModalOpen}
        setIsOpen={setIsLogoutModalOpen}
        description="Are you sure you want to logout?"
        leftAction={{
          label: "Cancel",
          onClick: () => setIsLogoutModalOpen(false),
          className: "border-[#E5E7EB]",
        }}
        rightAction={{
          label: "Logout",
          isLoading: logoutApi.isPending,
          disabled: logoutApi.isPending,
          onClick: async () => await handleLogout(),
          className: "bg-[#FF5C5C] hover:bg-[#E04B4B] text-white",
        }}
      />
    </Sidebar>
  );
}
