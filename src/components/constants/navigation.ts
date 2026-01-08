import { DashboardIcon, SettingsIcon } from "@/svg";
import { Package } from "lucide-react";

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


export const navLinks = [
  { label: "Why AgroFarm?", href: "/why" },
  {
    label: "Products",
    href: "/products",
    hasDropdown: true,
  },
  {
    label: "Services",
    href: "/services",
    hasDropdown: true,
  },
  { label: "Pricing", href: "/pricing" },
  { label: "Impact", href: "/impact" },
];