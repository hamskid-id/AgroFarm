import React from "react";
import { Product } from "@/types";

interface PriceCellProps {
  product: Product;
}

const PriceCell: React.FC<PriceCellProps> = ({ product }) => {
  return (
    <div className="font-bold text-emerald-600">
      ₦{product.price.toLocaleString()}
      {product.originalPrice && product.originalPrice > product.price && (
        <div className="text-xs text-gray-400 line-through">
          ₦{product.originalPrice.toLocaleString()}
        </div>
      )}
    </div>
  );
};

export default PriceCell;
