import React from "react";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/types";

interface StatusCellProps {
  product: Product;
  getConditionBadge: (condition: string) => React.ReactNode;
}

const StatusCell: React.FC<StatusCellProps> = ({
  product,
  getConditionBadge,
}) => {
  return (
    <div className="flex flex-col items-center gap-1">
      {product.inStock ? (
        <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">
          In Stock
        </Badge>
      ) : (
        <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-100">
          Sold Out
        </Badge>
      )}
      {getConditionBadge(product.condition || "Fresh")}
    </div>
  );
};

export default StatusCell;
