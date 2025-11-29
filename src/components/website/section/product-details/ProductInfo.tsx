"use client";

import { Star, Check, Truck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/types";

interface ProductInfoProps {
  product: Product;
}

export const ProductInfo = ({ product }: ProductInfoProps) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(price / 100);
  };

  const discount = product.originalPrice - product.price;
  const discountPercentage = Math.round(
    (discount / product.originalPrice) * 100
  );

  return (
    <div className="space-y-4">
      {/* Category */}
      <div className="flex items-center gap-2">
        <span className="text-2xl">{product.category.icon}</span>
        <Badge variant="outline" className="text-gray-600">
          {product.category.name}
        </Badge>
      </div>

      {/* Title */}
      <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
        {product.name}
      </h1>

      {/* Rating */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-5 w-5 ${
                  i < Math.floor(product.rating)
                    ? "text-yellow-400 fill-current"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-lg font-semibold text-gray-900">
            {product.rating}
          </span>
        </div>
        <span className="text-gray-500">({product.reviewCount} reviews)</span>
      </div>

      {/* Price */}
      <div className="flex items-center gap-3">
        <span className="text-3xl font-bold text-emerald-600">
          {formatPrice(product.price)}
        </span>
        {product.originalPrice > product.price && (
          <>
            <span className="text-xl text-gray-500 line-through">
              {formatPrice(product.originalPrice)}
            </span>
            <Badge className="bg-red-500 text-white px-2 py-1">
              Save {discountPercentage}%
            </Badge>
          </>
        )}
      </div>

      {/* Description */}
      <p className="text-lg text-gray-700 leading-relaxed">
        {product.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {product.tags.map((tag, index) => (
          <Badge key={index} variant="secondary" className="text-gray-600">
            #{tag}
          </Badge>
        ))}
      </div>

      {/* Stock Status */}
      <div className="flex items-center gap-2 text-sm">
        {product.inStock ? (
          <>
            <Check className="h-4 w-4 text-green-500" />
            <span className="text-green-600 font-medium">
              In Stock ({product.stockCount} available)
            </span>
          </>
        ) : (
          <>
            <div className="h-2 w-2 bg-red-500 rounded-full" />
            <span className="text-red-600 font-medium">Out of Stock</span>
          </>
        )}
      </div>

      {/* Delivery Info */}
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex items-center gap-3">
          <Truck className="h-5 w-5 text-emerald-600" />
          <div>
            <p className="font-medium text-gray-900">Free delivery</p>
            <p className="text-sm text-gray-600">
              Order today, delivered within 24-48 hours
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
