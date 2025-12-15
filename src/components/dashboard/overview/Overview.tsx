"use client";

import { StatCard } from "@/components/shared/StatCard";
import { mockStats } from "@/lib/mockData";
import { Package, Eye, Activity, Star, Plus } from "lucide-react";
import { DashboardAds } from "./Products";
import ChartDetailsCard from "./ChartDetails";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export const OverviewView = () => {
  const router = useRouter();
  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={<Package className="h-4 w-4 text-emerald-600" />}
          label="Total Ads"
          value={mockStats.totalAds}
        />

        <StatCard
          icon={<Activity className="h-4 w-4 text-emerald-600" />}
          label="Active Ads"
          value={mockStats.activeAds}
        />
        <StatCard
          icon={<Eye className="h-4 w-4 text-emerald-600" />}
          label="SuccessFul Deals"
          value={mockStats.totalViews.toLocaleString()}
        />
        <StatCard
          icon={<Star className="h-4 w-4 text-emerald-600" />}
          label="Rating"
          value="4.8"
        />
      </div>
      <div className="flex md:flex-row flex-col gap-6">
        <div className="flex-1">
          <DashboardAds />
        </div>
        <div className="flex flex-col md:w-auto w-full">
          <Button
            onClick={() => router.push("/dashboard/create-ads")}
            className="bg-emerald-600 hover:bg-emerald-700 w-fit ms-auto mb-5"
          >
            <Plus className="h-4 w-4 mr-2" />
            Post New Product
          </Button>
          <div className="flex-1">
            <ChartDetailsCard
              chartData={[55, 30, 15]}
              labels={["Fruits", "Vegetables", "Grains"]}
              colors={["#10B981", "#3B82F6", "#F59E0B"]}
              legendItems={[
                { label: "Fruits", value: "55", color: "#10B981" },
                { label: "Vegetables", value: "30", color: "#3B82F6" },
                { label: "Grains", value: "15", color: "#F59E0B" },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
