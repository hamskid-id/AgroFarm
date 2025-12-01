"use client";

import { Star, MapPin, Clock, Shield, Tag } from "lucide-react";
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
    }).format(price);
  };

  const getConditionIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case "fresh":
        return "🌿";
      case "organic":
        return "🌱";
      case "processed":
        return "🏭";
      default:
        return "📦";
    }
  };

  return (
    <div className="space-y-4">
      {/* Price & Title */}
      <div>
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
          <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200">
            {product.condition}
          </Badge>
        </div>

        <div className="mt-2">
          <span className="text-3xl font-bold text-emerald-600">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice > product.price && (
            <div className="flex items-center gap-2 mt-1">
              <span className="text-lg text-gray-500 line-through">
                {formatPrice(product.originalPrice)}
              </span>
              <Badge className="bg-red-500 text-white text-xs">
                Save {formatPrice(product.originalPrice - product.price)}
              </Badge>
            </div>
          )}
        </div>
      </div>

      {/* Location & Date */}
      <div className="flex items-center gap-4 text-sm text-gray-600">
        <div className="flex items-center gap-1">
          <MapPin className="h-4 w-4" />
          <span>{product.location || "Location not specified"}</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="h-4 w-4" />
          <span>{product.postedDate || "Today"}</span>
        </div>
      </div>

      {/* Seller Years */}
      {product.sellerYears && (
        <div className="flex items-center gap-2 text-sm">
          <Shield className="h-4 w-4 text-blue-500" />
          <span className="font-medium">{product.sellerYears}</span>
          <span className="text-gray-500">on AgroFarm</span>
        </div>
      )}

      {/* Condition & Category */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">
            {getConditionIcon(product.condition||'Fresh')}
          </span>
          <span className="text-sm text-gray-700">{product.condition}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-2xl">{product.category.icon}</span>
          <span className="text-sm text-gray-700">{product.category.name}</span>
        </div>
      </div>

      {/* Description */}
      <div className="mt-4">
        <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
        <p className="text-gray-700 leading-relaxed">{product.description}</p>
      </div>

      {/* Tags */}
      <div className="pt-4 border-t">
        <div className="flex items-center gap-2 mb-2">
          <Tag className="h-4 w-4 text-gray-500" />
          <span className="text-sm text-gray-600">Tags:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {product.tags.map((tag, index) => (
            <Badge key={index} variant="secondary" className="text-gray-600">
              #{tag}
            </Badge>
          ))}
        </div>
      </div>

      {/* Stock Status */}
      <div className="pt-4 border-t">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Availability:</span>
          <span
            className={`font-medium ${
              product.inStock ? "text-emerald-600" : "text-red-600"
            }`}
          >
            {product.inStock ? "In Stock" : "Out of Stock"}
            {product.inStock &&
              product.stockCount &&
              ` (${product.stockCount} units)`}
          </span>
        </div>
      </div>
    </div>
  );
};
