import React from "react";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/types";

interface CategoryCellProps {
  product: Product;
}

const CategoryCell: React.FC<CategoryCellProps> = ({ product }) => {
  return (
    <Badge variant="outline" className="bg-emerald-50">
      {product.category.name}
    </Badge>
  );
};

export default CategoryCell;
