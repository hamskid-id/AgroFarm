"use client";

import { Heart, Share2, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Product } from "@/types";

interface ProductActionsProps {
  product: Product;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onShare: () => void;
}

export const ProductActions = ({
  product,
  isFavorite,
  onToggleFavorite,
  onShare,
}: ProductActionsProps) => {
  return (
    <div className="space-y-4">
      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button
          size="lg"
          className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3"
          onClick={() => {
            // Add to cart functionality will be implemented later
            console.log("Add to cart:", product);
          }}
        >
          <ShoppingCart className="h-5 w-5 mr-2" />
          Add to Cart
        </Button>

        <Button
          size="icon"
          variant="outline"
          className={`h-12 w-12 border-2 ${
            isFavorite
              ? "border-red-500 text-red-500 bg-red-50"
              : "border-gray-300 text-gray-600"
          }`}
          onClick={onToggleFavorite}
        >
          <Heart className={`h-5 w-5 ${isFavorite ? "fill-current" : ""}`} />
        </Button>

        <Button
          size="icon"
          variant="outline"
          className="h-12 w-12 border-2 border-gray-300 text-gray-600"
          onClick={onShare}
        >
          <Share2 className="h-5 w-5" />
        </Button>
      </div>

      {/* Quick Features */}
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className="flex items-center gap-2 text-gray-600">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span>100% Fresh</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          <span>Quality Checked</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
          <span>Farm to Table</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
          <span>Easy Returns</span>
        </div>
      </div>
    </div>
  );
};
