import { StatCard } from "@/components/shared/StatCard";
import { mockStats } from "@/lib/mockData";
import { Package, Eye, Activity, Star } from "lucide-react";
import { MyAdsView } from "../my-ads/MyAdsView";

export const OverviewView = () => (
  <div className="space-y-6">
    {/* Stats Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        icon={<Package className="h-6 w-6 text-emerald-600" />}
        label="Total Ads"
        value={mockStats.totalAds}
      />
      <StatCard
        icon={<Eye className="h-6 w-6 text-emerald-600" />}
        label="Total Views"
        value={mockStats.totalViews.toLocaleString()}
      />
      <StatCard
        icon={<Activity className="h-6 w-6 text-emerald-600" />}
        label="Active Ads"
        value={mockStats.activeAds}
      />
      <StatCard
        icon={<Star className="h-6 w-6 text-emerald-600" />}
        label="Rating"
        value="4.8"
      />
    </div>
    <MyAdsView />
  </div>
);
