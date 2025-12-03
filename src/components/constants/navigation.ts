import { DashboardIcon, SettingsIcon } from "@/svg";
import { MessageSquare, Package, User } from "lucide-react";

export const navItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: DashboardIcon,
  },
  {
    title: "My Ads",
    url: "/dashboard/my-ads",
    icon: Package,
  },
  {
    title: "Messages",
    url: "/dashboard/messages",
    icon: MessageSquare,
  },
  {
    title: "Profile",
    url: "/dashboard/profile",
    icon: User,
  },
  {
    title: "Settings",
    url: "/dashboard/settings",
    icon: SettingsIcon,
  },
];
