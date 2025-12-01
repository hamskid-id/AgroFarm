"use client";

import { Star } from "lucide-react";
import { ReviewStats } from "@/types";

interface ReviewStatsCardProps {
  stats: ReviewStats;
}

export const ReviewStatsCard = ({ stats }: ReviewStatsCardProps) => {
  const totalReviews = stats.totalReviews;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Average Rating */}
      <div className="text-center md:text-left">
        <div className="text-5xl font-bold text-gray-900 mb-2">
          {stats.averageRating.toFixed(1)}
        </div>
        <div className="flex items-center justify-center md:justify-start gap-1 mb-2">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-6 w-6 ${
                i < Math.floor(stats.averageRating)
                  ? "text-amber-400 fill-current"
                  : "text-gray-300"
              }`}
            />
          ))}
        </div>
        <p className="text-gray-600">
          Based on {totalReviews} {totalReviews === 1 ? "review" : "reviews"}
        </p>
      </div>

      {/* Rating Distribution */}
      <div className="space-y-2">
        {[5, 4, 3, 2, 1].map((stars) => {
          const count =
            stats.ratingCounts[stars as keyof typeof stats.ratingCounts];
          const percentage =
            totalReviews > 0 ? (count / totalReviews) * 100 : 0;

          return (
            <div key={stars} className="flex items-center gap-3">
              <div className="flex items-center gap-1 w-16">
                <span className="text-sm text-gray-600 w-4">{stars}</span>
                <Star className="h-4 w-4 text-amber-400 fill-current" />
              </div>
              <div className="flex-1">
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-400"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
              <span className="text-sm text-gray-600 w-12 text-right">
                {count} ({percentage.toFixed(0)}%)
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
