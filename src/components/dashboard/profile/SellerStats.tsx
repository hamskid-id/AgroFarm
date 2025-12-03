"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Eye, Package, Star, MessageSquare } from "lucide-react";

export default function SellerStats() {
  const SELLER_STATS = {
    totalAds: 24,
    activeAds: 18,
    totalViews: 1247,
    joinDate: "January 2023",
    rating: 4.8,
    reviews: 156,
    responseRate: 95,
  } as const;

  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Seller Stats</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-gray-600">
              <Calendar className="h-4 w-4" />
              <span className="text-sm">Member Since</span>
            </div>
            <span className="font-medium text-gray-900">
              {SELLER_STATS.joinDate}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-gray-600">
              <Package className="h-4 w-4" />
              <span className="text-sm">Total Ads</span>
            </div>
            <span className="font-medium text-gray-900">
              {SELLER_STATS.totalAds}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-gray-600">
              <Eye className="h-4 w-4" />
              <span className="text-sm">Total Views</span>
            </div>
            <span className="font-medium text-gray-900">
              {SELLER_STATS.totalViews.toLocaleString()}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-gray-600">
              <Star className="h-4 w-4 text-amber-400 fill-current" />
              <span className="text-sm">Rating</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="font-medium text-gray-900">
                {SELLER_STATS.rating}
              </span>
              <span className="text-sm text-gray-500">
                ({SELLER_STATS.reviews} reviews)
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-gray-600">
              <MessageSquare className="h-4 w-4" />
              <span className="text-sm">Response Rate</span>
            </div>
            <span className="font-medium text-emerald-600">
              {SELLER_STATS.responseRate}%
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
