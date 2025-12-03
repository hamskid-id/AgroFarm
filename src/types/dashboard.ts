// types/dashboard.ts
export interface DashboardStats {
  totalAds: number;
  activeAds: number;
  totalViews: number;
  totalMessages: number;
  thisMonthViews: number;
  viewsChange: number;
  messagesChange: number;
  averageResponse: string;
}

export interface Product {
  id: number;
  title: string;
  category: string;
  price: number;
  originalPrice?: number;
  location: string;
  condition: string;
  status: "active" | "inactive" | "sold";
  views: number;
  favorites: number;
  messages: number;
  postedDate: string;
  image: string;
  description: string;
  quantity: string;
  featured: boolean;
}

export interface AnalyticsData {
  topPerformingAds: Array<{
    name: string;
    views: number;
    messages: number;
  }>;
  viewsByDay: Array<{
    day: string;
    views: number;
  }>;
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  businessName: string;
  location: string;
  bio: string;
  joinDate: string;
  verified: boolean;
  avatar: string | null;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}

export interface Condition {
  value: string;
  label: string;
}

export interface PostAdFormData {
  category: string;
  title: string;
  condition: string;
  price: string;
  originalPrice: string;
  quantity: string;
  unit: string;
  description: string;
  location: string;
  phoneNumber: string;
  tags: string[];
}
