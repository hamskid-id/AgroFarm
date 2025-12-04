"use client";

import { useState } from "react";
import {
  Star,
  Filter,
  ThumbsUp,
  MessageCircle,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Review, ReviewStats } from "@/types";
import { Product } from "@/types";
import { ReviewStatsCard } from "./ReviewStatsCard";
import { ReviewItem } from "./ReviewItem";
import { WriteReviewDialog } from "./WriteReviewDialog";

interface ReviewsSectionProps {
  product: Product;
  reviews: Review[];
  reviewStats: ReviewStats;
}

export const ReviewsSection = ({
  product,
  reviews,
  reviewStats,
}: ReviewsSectionProps) => {
  const [sortBy, setSortBy] = useState<
    "recent" | "helpful" | "highest" | "lowest"
  >("recent");
  const [filterRating, setFilterRating] = useState<number | null>(null);
  const [isWriteReviewOpen, setIsWriteReviewOpen] = useState(false);

  // Filter reviews based on rating
  const filteredReviews = reviews.filter((review) =>
    filterRating ? review.rating === filterRating : true
  );

  // Sort reviews
  const sortedReviews = [...filteredReviews].sort((a, b) => {
    switch (sortBy) {
      case "recent":
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      case "helpful":
        return b.helpfulCount - a.helpfulCount;
      case "highest":
        return b.rating - a.rating;
      case "lowest":
        return a.rating - b.rating;
      default:
        return 0;
    }
  });

  const sortOptions = [
    { value: "recent", label: "Most Recent" },
    { value: "helpful", label: "Most Helpful" },
    { value: "highest", label: "Highest Rated" },
    { value: "lowest", label: "Lowest Rated" },
  ];

  const ratingFilters = [
    { stars: 5, label: "5 stars" },
    { stars: 4, label: "4 stars & above" },
    { stars: 3, label: "3 stars & above" },
    { stars: 2, label: "2 stars & above" },
    { stars: 1, label: "1 star & above" },
  ];

  return (
    <div className="bg-white rounded-xl border ">
      {/* Header */}
      <div className="p-6 border-b">
        <div className="flex items-center flex-wrap gap-3 justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Customer Reviews
            </h2>
           
          </div>

          <Button
            onClick={() => setIsWriteReviewOpen(true)}
            className="bg-emerald-600 hover:bg-emerald-700"
          >
            Write a Review
          </Button>
        </div>

        {/* Stats */}
        <ReviewStatsCard stats={reviewStats} />
      </div>

      {/* Filters & Sort */}
      <div className="p-6 border-b bg-gray-50">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="md:flex hidden items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">
                Filter by:
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {ratingFilters.map((filter) => (
                <button
                  key={filter.stars}
                  onClick={() =>
                    setFilterRating(
                      filter.stars === filterRating ? null : filter.stars
                    )
                  }
                  className={`px-3 py-1.5 text-sm rounded-full transition-colors ${
                    filterRating === filter.stars
                      ? "bg-emerald-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-1.5 text-sm border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Active Filters */}
        {(filterRating || sortBy !== "recent") && (
          <div className="flex items-center gap-2 mt-4">
            <span className="text-sm text-gray-600">Active:</span>
            {filterRating && (
              <span className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-emerald-100 text-emerald-700 rounded">
                {filterRating} stars
                <button
                  onClick={() => setFilterRating(null)}
                  className="hover:text-emerald-900"
                >
                  ×
                </button>
              </span>
            )}
            {sortBy !== "recent" && (
              <span className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded">
                {sortOptions.find((o) => o.value === sortBy)?.label}
                <button
                  onClick={() => setSortBy("recent")}
                  className="hover:text-blue-900"
                >
                  ×
                </button>
              </span>
            )}
          </div>
        )}
      </div>

      {/* Reviews List */}
      <div className="divide-y">
        {sortedReviews.length > 0 ? (
          sortedReviews.map((review) => (
            <ReviewItem key={review.id} review={review} />
          ))
        ) : (
          <div className="p-8 text-center">
            <MessageCircle className="h-12 w-12 mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              No reviews found
            </h3>
            <p className="text-gray-500 mb-6">
              {filterRating
                ? `No ${filterRating} star reviews for this product`
                : "Be the first to review this product!"}
            </p>
            {filterRating && (
              <Button
                variant="outline"
                onClick={() => setFilterRating(null)}
                className="border-emerald-600 text-emerald-600 hover:bg-emerald-50"
              >
                Clear Filter
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Load More */}
      {sortedReviews.length > 0 && (
        <div className="p-6 border-t text-center">
          <Button variant="outline" className="px-8">
            Load More Reviews
          </Button>
        </div>
      )}

      {/* Write Review Dialog */}
      <WriteReviewDialog
        isOpen={isWriteReviewOpen}
        onClose={() => setIsWriteReviewOpen(false)}
        product={product}
      />
    </div>
  );
};
