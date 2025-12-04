import React from "react";
import { Product } from "@/types";

interface PostedDateCellProps {
  product: Product;
}

const PostedDateCell: React.FC<PostedDateCellProps> = ({ product }) => {
  return (
    <div className="text-sm text-gray-600">
      {product.postedDate || "Recently"}
    </div>
  );
};

export default PostedDateCell;
