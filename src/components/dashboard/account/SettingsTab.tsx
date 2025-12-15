"use client";

import {
  CheckCircle,
  Star,
  AlertCircle,
  Shield,
  MessageSquare,
  Package,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const SettingsTab = () => {
  const sellerStats = {
    verificationLevel: "basic",
    nextLevel: "verified",
    trustScore: 50,
    totalProducts: 8,
    activeListings: 5,
    totalSales: 23,
    positiveReviews: 12,
    responseRate: "85%",
  };

  const getLevelInfo = (level: string) => {
    switch (level) {
      case "premium":
        return {
          color: "bg-purple-100 text-purple-600",
          label: "Trusted Seller",
        };
      case "verified":
        return {
          color: "bg-emerald-100 text-emerald-600",
          label: "Verified Seller",
        };
      case "basic":
        return { color: "bg-blue-100 text-blue-600", label: "Basic Verified" };
      default:
        return { color: "bg-gray-100 text-gray-600", label: "Unverified" };
    }
  };

  const levelInfo = getLevelInfo(sellerStats.verificationLevel);

  return (
    <div className="space-y-6">
      {/* Account Status Card */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-4">Account Status</h3>
        <Card className="border-emerald-100 bg-emerald-50 shadow-none">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full ${levelInfo.color}`}>
                    <Shield className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-bold text-emerald-900 text-sm">
                      {levelInfo.label}
                    </p>
                    <p className="text-emerald-700 text-sm">
                      Trust Score:{" "}
                      <span className="font-bold">
                        {sellerStats.trustScore}/100
                      </span>
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Package className="h-4 w-4 text-gray-500" />
                    <span className="text-xs">
                      {sellerStats.activeListings} Active Listings
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-gray-500" />
                    <span className="text-xs">
                      {sellerStats.totalSales} Total Sales
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-gray-500" />
                    <span className="text-xs">
                      {sellerStats.responseRate} Response Rate
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-amber-400" />
                    <span className="text-xs">
                      {sellerStats.positiveReviews} Reviews
                    </span>
                  </div>
                </div>
              </div>

              <div className="lg:text-right">
                <p className="text-sm text-gray-600 mb-2">
                  {sellerStats.nextLevel === "verified"
                    ? "20 points to Verified Seller"
                    : "40 points to Trusted Seller"}
                </p>
                <Button
                  className="bg-emerald-600 hover:bg-emerald-700"
                  onClick={() => (window.location.hash = "#verification")}
                >
                  <Shield className="h-4 w-4 mr-2" />
                  Improve Trust Score
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Next Level Requirements */}
      <Card className="shadow-none">
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-emerald-600" />
              <h3 className="font-semibold text-gray-900">
                Next Level: Verified Seller
              </h3>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <div>
                  <p className="font-medium text-gray-900 text-sm">
                    Requirements
                  </p>
                  <p className="text-sm text-gray-600">
                    Complete these to reach Verified status
                  </p>
                </div>
                <div className="text-emerald-600 font-medium">
                  70/100 points
                </div>
              </div>

              <div className="space-y-2">
                {[
                  { label: "Upload ID Document", completed: false, points: 20 },
                  { label: "Verify Location", completed: false, points: 15 },
                  {
                    label: "Get 10+ Positive Reviews",
                    completed: sellerStats.positiveReviews >= 10,
                    points: 20,
                  },
                  {
                    label: "Maintain 80%+ Response Rate",
                    completed: sellerStats.responseRate >= "80%",
                    points: 15,
                  },
                ].map((req, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
                  >
                    <div className="flex items-center gap-3">
                      {req.completed ? (
                        <CheckCircle className="h-5 w-5 text-emerald-500" />
                      ) : (
                        <div className="h-5 w-5 rounded-full border-2 border-gray-300"></div>
                      )}
                      <span
                        className={`text-sm ${
                          req.completed ? "text-emerald-600" : "text-gray-700"
                        }`}
                      >
                        {req.label}
                      </span>
                    </div>
                    <span className="text-sm text-gray-500">
                      {req.points} pts
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <div className="pt-6 border-t">
        <h3 className="font-semibold text-red-600 mb-4 flex items-center gap-2 text-sm">
          <AlertCircle className="h-5 w-5" />
          Account Actions
        </h3>
        <div className="gap-4 grid grid-cols-2">
          <Button
            variant="outline"
            className="text-sm w-full border-orange-300 text-orange-600 hover:bg-orange-50"
          >
           Deactivate
          </Button>
          <Button
            variant="outline"
            className="text-sm w-full border-red-300 text-red-600 hover:bg-red-50"
          >
            Delete Account
          </Button>
        </div>
        <p className="text-xs text-gray-500 mt-3">
          Note: Deleting your account will remove all your listings and data
          permanently.
        </p>
      </div>
    </div>
  );
};
