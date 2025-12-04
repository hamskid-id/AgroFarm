import React from "react";
import { MapPin } from "lucide-react";
import Image from "next/image";
import { Product } from "@/types";

interface ProductCellProps {
  product: Product;
}

const ProductCell: React.FC<ProductCellProps> = ({ product }) => {
  return (
    <div className="flex items-center gap-3">
      <div className="relative w-12 h-12 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-lg flex items-center justify-center overflow-hidden">
        {typeof product.image === "string" ? (
          <div className="text-2xl">{product.image}</div>
        ) : (
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
          />
        )}
      </div>
      <div>
        <div className="font-medium text-gray-900 line-clamp-1">
          {product.name}
        </div>
        <div className="text-sm text-gray-500 flex items-center gap-1">
          <MapPin className="h-3 w-3" />
          {product.location}
        </div>
      </div>
    </div>
  );
};

export default ProductCell;
