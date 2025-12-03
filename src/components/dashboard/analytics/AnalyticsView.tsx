import { mockAnalytics, mockStats } from "@/lib/mockData";
import { TrendingUp, Eye, Star, ArrowUp } from "lucide-react";

export const AnalyticsView = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-gray-900">
      Analytics & Performance
    </h2>

    {/* Key Metrics */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-blue-100 rounded-lg">
            <TrendingUp className="h-5 w-5 text-blue-600" />
          </div>
          <h3 className="font-semibold text-gray-900">Avg Response Time</h3>
        </div>
        <p className="text-3xl font-bold text-gray-900">
          {mockStats.averageResponse}
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Keep it under 4 hours for best results
        </p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-emerald-100 rounded-lg">
            <Eye className="h-5 w-5 text-emerald-600" />
          </div>
          <h3 className="font-semibold text-gray-900">Views This Month</h3>
        </div>
        <p className="text-3xl font-bold text-gray-900">
          {mockStats.thisMonthViews}
        </p>
        <div className="flex items-center gap-1 mt-2">
          <ArrowUp className="h-4 w-4 text-emerald-600" />
          <span className="text-sm font-medium text-emerald-600">
            12.5% increase
          </span>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-purple-100 rounded-lg">
            <Star className="h-5 w-5 text-purple-600" />
          </div>
          <h3 className="font-semibold text-gray-900">Average Rating</h3>
        </div>
        <p className="text-3xl font-bold text-gray-900">4.8</p>
        <p className="text-sm text-gray-500 mt-2">Based on 156 reviews</p>
      </div>
    </div>

    {/* Top Performing Ads */}
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4">
        Top Performing Ads
      </h3>
      <div className="space-y-4">
        {mockAnalytics.topPerformingAds.map((ad, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                {idx + 1}
              </div>
              <span className="font-medium text-gray-900">{ad.name}</span>
            </div>
            <div className="flex items-center gap-6 text-sm">
              <span className="flex items-center gap-1 text-gray-600">
                <Eye className="h-4 w-4" />
                {ad.views} views
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Category Performance */}
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4">
        Performance by Category
      </h3>
      <div className="space-y-3">
        {[
          { category: "Vegetables", ads: 12, percentage: 60 },
          { category: "Fruits", ads: 6, percentage: 30 },
          { category: "Grains", ads: 4, percentage: 20 },
          { category: "Seeds", ads: 2, percentage: 10 },
        ].map((item, idx) => (
          <div key={idx}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium text-gray-900">
                {item.category}
              </span>
              <span className="text-sm text-gray-600">{item.ads} ads</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2">
              <div
                className="bg-emerald-600 h-2 rounded-full"
                style={{ width: `${item.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);
