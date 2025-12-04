import React from "react";
import { Product } from "@/types";

interface StockCellProps {
  product: Product;
}

const StockCell: React.FC<StockCellProps> = ({ product }) => {
  return (
    <div className="text-center">
      <div className="font-medium text-gray-900">{product.stockCount}</div>
      <div className="text-xs text-gray-500">in stock</div>
    </div>
  );
};

export default StockCell;
