// utils/mockData.ts
import {
  DashboardStats,
  Product,
  AnalyticsData,
  UserProfile,
} from "@/types/dashboard";

export const mockStats: DashboardStats = {
  totalAds: 24,
  activeAds: 18,
  totalViews: 1247,
  totalMessages: 89,
  thisMonthViews: 324,
  viewsChange: 12.5,
  messagesChange: -3.2,
  averageResponse: "2.5 hrs",
};

export const mockAnalytics: AnalyticsData = {
  topPerformingAds: [
    { name: "Fresh Potatoes", views: 445, messages: 24 },
    { name: "Organic Apples", views: 234, messages: 15 },
    { name: "Cherry Tomatoes", views: 156, messages: 8 },
  ],
  viewsByDay: [
    { day: "Mon", views: 45 },
    { day: "Tue", views: 52 },
    { day: "Wed", views: 38 },
    { day: "Thu", views: 65 },
    { day: "Fri", views: 48 },
    { day: "Sat", views: 71 },
    { day: "Sun", views: 55 },
  ],
};

export const mockUserProfile: UserProfile = {
  name: "John Doe",
  email: "john.doe@agrofarm.com",
  phone: "+234 803 123 4567",
  businessName: "Green Valley Farm",
  location: "Jos, Plateau State",
  bio: "Passionate farmer with over 10 years of experience in organic farming.",
  joinDate: "January 2023",
  verified: true,
  avatar: null,
};
