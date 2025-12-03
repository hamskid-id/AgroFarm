import { StatCard } from "@/components/shared/StatCard";
import { mockAnalytics, mockStats } from "@/lib/mockData";
import {
  Package,
  Eye,
  Activity,
  Star,
  Clock,
  TrendingUp,
  CheckCircle,
} from "lucide-react";

interface OverviewViewProps {
  onNavigate: (view: string) => void;
}

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
        change={mockStats.viewsChange}
        trend="up"
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

    {/* Quick Actions */}
    <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl p-6 text-white">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold mb-2">Ready to sell more?</h3>
          <p className="text-emerald-100 mb-4">
            Post a new ad and reach thousands of buyers
          </p>
          <button
            // onClick={() => onNavigate("postad")}
            className="px-6 py-2 bg-white text-emerald-600 rounded-lg font-semibold hover:bg-emerald-50 transition-colors"
          >
            Post New Ad
          </button>
        </div>
        <div className="hidden md:block text-6xl">📦</div>
      </div>
    </div>

    {/* Recent Activity */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Quick Stats */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900">Quick Stats</h3>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-blue-600" />
              <span className="text-sm font-medium text-gray-900">
                Avg Response Time
              </span>
            </div>
            <span className="font-bold text-blue-600">
              {mockStats.averageResponse}
            </span>
          </div>
          <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg">
            <div className="flex items-center gap-3">
              <TrendingUp className="h-5 w-5 text-emerald-600" />
              <span className="text-sm font-medium text-gray-900">
                This Month Views
              </span>
            </div>
            <span className="font-bold text-emerald-600">
              {mockStats.thisMonthViews}
            </span>
          </div>
          <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-purple-600" />
              <span className="text-sm font-medium text-gray-900">
                Account Status
              </span>
            </div>
            <span className="text-sm font-semibold text-purple-600">
              Verified
            </span>
          </div>
        </div>
      </div>

      {/* Performance Chart */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">
          Views This Week
        </h3>
        <div className="space-y-3">
          {mockAnalytics.viewsByDay.map((day, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-600 w-12">
                {day.day}
              </span>
              <div className="flex-1 bg-gray-100 rounded-full h-8 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-full rounded-full flex items-center justify-end pr-2"
                  style={{ width: `${(day.views / 80) * 100}%` }}
                >
                  <span className="text-xs font-semibold text-white">
                    {day.views}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);
