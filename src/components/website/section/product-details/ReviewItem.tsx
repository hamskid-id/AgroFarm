"use client";

import { useState } from "react";
import { Star, ThumbsUp, MessageCircle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Review } from "@/types";
import CustomAvatar from "@/components/ui/custom-avatar";

interface ReviewItemProps {
  review: Review;
}

export const ReviewItem = ({ review }: ReviewItemProps) => {
  const [isHelpful, setIsHelpful] = useState(false);
  const [helpfulCount, setHelpfulCount] = useState(review.helpfulCount);
  const [showReply, setShowReply] = useState(false);

  const handleHelpful = () => {
    if (!isHelpful) {
      setIsHelpful(true);
      setHelpfulCount((prev) => prev + 1);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return date.toLocaleDateString("en-NG", {
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="p-4">
      {/* Review Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex md:flex-row flex-col md:items-center items-start gap-3">
          <CustomAvatar
            name={review.userName}
            className="w-10 h-10 border-2 border-emerald-100"
          />
          <div>
            <div className="flex md:flex-row flex-col md:items-center items-start gap-2">
              <h4 className="font-semibold text-gray-900">{review.userName}</h4>
              {review.verifiedPurchase && (
                <span className="inline-flex items-center gap-1 text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded">
                  <CheckCircle className="h-3 w-3" />
                  Verified Purchase
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>{formatDate(review.date)}</span>
              <span>•</span>
              <span>Lagos, Nigeria</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${
                i < review.rating
                  ? "text-amber-400 fill-current"
                  : "text-gray-300"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Review Title & Comment */}
      <div className="mb-4">
        {review.title && (
          <h5 className="font-medium text-gray-900 mb-2">{review.title}</h5>
        )}
        <p className="text-gray-700 leading-relaxed text-sm">{review.comment}</p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          className={`gap-2 ${
            isHelpful ? "text-emerald-600" : "text-gray-600"
          }`}
          onClick={handleHelpful}
        >
          <ThumbsUp className="h-4 w-4" />
          Helpful ({helpfulCount})
        </Button>

        <Button
          variant="ghost"
          size="sm"
          className="gap-2 text-gray-600"
          onClick={() => setShowReply(!showReply)}
        >
          <MessageCircle className="h-4 w-4" />
          {review.reply ? "View Reply" : "Reply"}
        </Button>
      </div>

      {/* Seller Reply */}
      {review.reply && showReply && (
        <div className="mt-4 pl-4 border-l-2 border-emerald-200">
          <div className="bg-emerald-50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-emerald-700">S</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-emerald-900">
                    {review.reply.vendorName}
                  </span>
                  <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded">
                    Seller
                  </span>
                </div>
                <span className="text-xs text-emerald-600">
                  {formatDate(review.reply.date)}
                </span>
              </div>
            </div>
            <p className="text-gray-700">{review.reply.comment}</p>
          </div>
        </div>
      )}
    </div>
  );
};
