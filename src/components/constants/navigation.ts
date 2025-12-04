import { DashboardIcon, SettingsIcon } from "@/svg";
import { MessageSquare, Package, User } from "lucide-react";

export const navItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: DashboardIcon,
  },
  {
    title: "Create Ads",
    url: "/dashboard/create-ads",
    icon: Package,
  },
  {
    title: "Settings",
    url: "/dashboard/profile",
    icon: SettingsIcon,
  },
];
