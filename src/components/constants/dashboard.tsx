import {
  BarChart3,
  Bell,
  CheckCircle,
  Clock,
  DollarSign,
  MessageSquare,
  Package,
  Settings,
  User,
  XCircle,
} from "lucide-react";

export const adStatuses = {
  active: {
    label: "Active",
    color: "bg-green-100 text-green-700",
    icon: CheckCircle,
  },
  pending: {
    label: "Pending",
    color: "bg-yellow-100 text-yellow-700",
    icon: Clock,
  },
  expired: {
    label: "Expired",
    color: "bg-red-100 text-red-700",
    icon: XCircle,
  },
  sold: { label: "Sold", color: "bg-blue-100 text-blue-700", icon: DollarSign },
};

export const dashboardTabs = [
  { id: "overview", label: "Overview", icon: BarChart3 },
  { id: "my-ads", label: "My Ads", icon: Package },
  { id: "messages", label: "Messages", icon: MessageSquare },
  { id: "profile", label: "Profile", icon: User },
  { id: "settings", label: "Settings", icon: Settings },
];

export const profileTabs = [
  { id: "profile", label: "Profile Info", icon: User },
  { id: "account", label: "Account", icon: Settings },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Lock },
];
