import React from "react";
import { Star } from "lucide-react";
import { Product } from "@/types";

interface RatingCellProps {
  product: Product;
}

const RatingCell: React.FC<RatingCellProps> = ({ product }) => {
  return (
    <div className="flex items-center justify-center gap-1">
      <Star className="h-4 w-4 text-amber-500 fill-current" />
      <span className="font-medium">{product.rating}</span>
      <span className="text-sm text-gray-500">({product.reviewCount})</span>
    </div>
  );
};

export default RatingCell;
