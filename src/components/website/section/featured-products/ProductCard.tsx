"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Star, Heart, Shield, MapPin, Eye } from "lucide-react";

import ProductImage from "./ProductImage";
import { Product } from "@/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import CustomAvatar from "@/components/ui/custom-avatar";
import { useRouter } from "next/navigation";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const router = useRouter();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  const handleCardClick = () => {
    router.push(`/products/${product.id}`);
  };

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="h-full"
    >
      <Card
        onClick={handleCardClick}
        className="p-0 shadow-none group bg-white border border-gray-200/80 hover:border-emerald-200/80 hover:shadow-2xl transition-all duration-500 overflow-hidden h-full flex flex-col"
      >
        <CardContent className="p-0 flex flex-col h-full">
          {/* Image Section */}
          <div className="relative overflow-hidden flex-shrink-0">
            <ProductImage product={product} isHovered={isHovered} />

            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-2">
              {product.featured && (
                <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs px-2 py-1 border-0">
                  <Star className="h-3 w-3 fill-current mr-1" />
                  Featured
                </Badge>
              )}
              {!product.inStock && (
                <Badge className="bg-red-500 text-white text-xs px-2 py-1 border-0">
                  Out of Stock
                </Badge>
              )}
            </div>

            {/* Favorite Button */}
            <Button
              size="icon"
              variant="ghost"
              onClick={handleFavorite}
              className="absolute top-3 right-3 bg-white/90 hover:bg-white backdrop-blur-sm transition-all duration-300 h-8 w-8 rounded-full shadow-sm"
            >
              <Heart
                className={`h-4 w-4 transition-colors ${
                  isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"
                }`}
              />
            </Button>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
              transition={{ duration: 0.3 }}
              className="absolute bottom-3 left-3 right-3 flex gap-2"
            >
              <Button
                size="sm"
                className={`flex-1 text-white text-xs py-2 ${
                  product.inStock
                    ? "bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800"
                    : "bg-gray-400 cursor-not-allowed"
                } shadow-lg`}
                disabled={!product.inStock}
              >
                <Heart className="h-3 w-3 mr-1" />
                {product.inStock ? "Add to Favorite" : "Out of Stock"}
              </Button>

              <Button
                size="icon"
                variant="secondary"
                className="bg-white/90 hover:bg-white backdrop-blur-sm shadow-lg h-8 w-8 rounded-lg"
              >
                <Eye className="h-3 w-3" />
              </Button>
            </motion.div>
          </div>

          {/* Content Section */}
          <div className="p-4 flex-1 flex flex-col">
            {/* Vendor Info */}
            <div className="flex items-center gap-2 mb-2">
              <CustomAvatar name={product.vendor.name || "NA"} size={36} />
              <span className="text-xs text-gray-600 font-medium">
                {product.vendor.name}
              </span>
              <div className="flex items-center gap-1 ml-auto">
                <MapPin className="h-3 w-3 text-gray-400" />
                <span className="text-xs text-gray-500">Lagos</span>
              </div>
            </div>

            {/* Product Name */}
            <h3 className="font-semibold text-gray-900 text-sm leading-tight line-clamp-2 mb-2 group-hover:text-emerald-700 transition-colors">
              {product.name}
            </h3>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center gap-1">
                <Star className="h-3 w-3 text-amber-400 fill-current" />
                <span className="text-xs font-medium text-gray-700">
                  {product.rating}
                </span>
              </div>
              <span className="text-xs text-gray-400">
                ({product.reviewCount})
              </span>
              <div className="flex items-center gap-1 ml-auto">
                <Shield className="h-3 w-3 text-emerald-500" />
                <span className="text-xs text-emerald-600 font-medium">
                  Verified
                </span>
              </div>
            </div>

            {/* Price Section */}
            <div className="mt-auto pt-3 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-baseline gap-2">
                  <span className="text-lg font-bold text-emerald-600">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice > product.price && (
                    <span className="text-xs text-gray-500 line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>

                {product.inStock && (
                  <div className="text-xs text-emerald-600 font-medium bg-emerald-50 px-2 py-1 rounded-full">
                    In Stock
                  </div>
                )}
              </div>

              {product.originalPrice > product.price && (
                <div className="text-xs text-green-600 font-medium mt-1">
                  Save {formatPrice(product.originalPrice - product.price)}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProductCard;
