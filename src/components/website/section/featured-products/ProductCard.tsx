"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Heart, MapPin, Star, ChevronRight, Award, Eye } from "lucide-react";
import { Product } from "@/types";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { useFavoritesStore } from "@/stores/favorites-store";

interface ProductCardProps {
  product: Product;
  viewMode?: "grid" | "list";
  viewInStore?: boolean;
  onClick?: () => void;
}

const ProductCard = ({
  product,
  viewMode = "grid",
  viewInStore,
  onClick,
}: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();

  // Get store methods
  const { toggleFavorite, isInFavorites } = useFavoritesStore();
  const isFavorite = isInFavorites(product.id);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleCardClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onClick) {
      onClick?.();
    } else {
      router.push(`/products/${product.id}`);
    }
  };

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    toggleFavorite(product);

    // Show toast notification
    if (!isFavorite) {
      toast.success("Added to favorites", {
        description: `${product.name} has been added to your favorites`,
      });
    } else {
      toast.info("Removed from favorites", {
        description: `${product.name} has been removed from your favorites`,
      });
    }
  };

  // Get years on platform
  const getYearsOnPlatform = () => {
    if (product?.sellerYears) {
      return product?.sellerYears;
    }

    if (product.vendor?.rating >= 4.5) {
      return "5+ YEARS";
    } else if (product.vendor?.rating >= 4.0) {
      return "3+ YEARS";
    } else {
      return "1+ YEAR";
    }
  };

  // LIST VIEW - Jiji Style
  if (viewMode === "list") {
    return (
      <motion.div
        whileHover={{ x: 2 }}
        transition={{ duration: 0.2 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleCardClick}
        className="bg-white rounded-lg overflow-hidden border border-gray-300 hover:border-emerald-400 hover:shadow-sm transition-all cursor-pointer group"
      >
        <div className="flex p-3">
          {/* Image Section */}
          <div className="w-32 h-24 flex-shrink-0 relative mr-4 overflow-hidden rounded">
            <motion.div
              animate={{ scale: isHovered ? 1.05 : 1 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full"
            >
              <img
                src={
                  typeof product.image === "string"
                    ? product.image
                    : product.image.src
                }
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />

              {/* Quick View Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                <Eye className="h-5 w-5 text-white" />
              </div>
            </motion.div>

            {/* Favorite Button */}
            <button
              onClick={handleFavorite}
              className="absolute top-1 right-1 bg-white/80 p-1 rounded-full hover:bg-white transition-colors shadow-sm z-10"
            >
              <Heart
                className={`h-3 w-3 ${
                  isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"
                }`}
              />
            </button>

            {/* Price Overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent text-white px-2 py-1">
              <span className="font-bold text-sm">
                {formatPrice(product.price)}
              </span>
            </div>
          </div>

          {/* Content Section */}
          <div className="flex-1 min-w-0">
            {/* Title */}
            <h3 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-1 group-hover:text-emerald-600 transition-colors">
              {product.name}
            </h3>
            {/* Description */}
            <p className="text-gray-600 text-xs mb-2 line-clamp-1">
              {product.description || "Quality agricultural product"}
            </p>
            {/* Location & Time */}
            {!viewInStore && (
              <div className="flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  <span>{product.location || "Lagos"}</span>
                </div>
                <span className="text-gray-400">
                  {product.postedDate || "Today"}
                </span>
              </div>
            )}
            {/* Seller Info */}
            {!viewInStore && (
              <div className="flex items-center gap-2 mt-2 flex-wrap">
                <div className="flex items-center gap-1 text-xs text-gray-700">
                  <Star className="h-3 w-3 text-amber-400 fill-current" />
                  <span>{product.rating || "N/A"}</span>
                  <span className="text-gray-400">
                    ({product.reviewCount || 0})
                  </span>
                </div>
                <span className="text-gray-400 text-xs">•</span>
                <span className="text-xs text-gray-700 truncate">
                  {product.vendor?.name || "Unknown Seller"}
                </span>
                {/* Years on Platform Badge */}
                <Badge className="bg-amber-100 text-amber-700 text-[10px] px-1.5 py-0.5">
                  <Award className="h-2 w-2 mr-1" />
                  {getYearsOnPlatform()}
                </Badge>
              </div>
            )}
          </div>

          {/* Arrow Indicator */}
          <div className="flex items-center px-2">
            <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-emerald-600 transition-colors" />
          </div>
        </div>

        {/* Quick Actions on Hover */}
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{
            height: isHovered ? "auto" : 0,
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.2 }}
          className="overflow-hidden"
        >
          <div className="px-3 py-2 border-t border-gray-100 flex gap-2">
            <button
              onClick={handleCardClick}
              className="flex-1 py-2 text-sm font-medium bg-emerald-50 text-emerald-600 hover:bg-emerald-100 rounded border border-emerald-200 transition-colors"
            >
              View Details
            </button>
            <button
              onClick={handleFavorite}
              className={`py-2 px-4 text-sm font-medium rounded border transition-colors ${
                isFavorite
                  ? "bg-red-50 text-red-600 hover:bg-red-100 border-red-200"
                  : "bg-gray-50 text-gray-600 hover:bg-gray-100 border-gray-200"
              }`}
            >
              <Heart
                className={`h-3.5 w-3.5 ${isFavorite ? "fill-current" : ""}`}
              />
            </button>
          </div>
        </motion.div>
      </motion.div>
    );
  }

  // DEFAULT GRID VIEW
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
      className="bg-white rounded-lg overflow-hidden border border-gray-300 hover:border-emerald-400 hover:shadow-md transition-all cursor-pointer group relative"
    >
      {/* Image Section */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <motion.div
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.4 }}
          className="w-full h-full"
        >
          <img
            src={
              typeof product.image === "string"
                ? product.image
                : product.image.src
            }
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />

          {/* Quick View Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
            <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2">
              <Eye className="h-4 w-4 text-emerald-600" />
              <span className="text-sm font-medium text-emerald-700">
                Quick View
              </span>
            </div>
          </div>
        </motion.div>

        {/* Favorite Button */}
        <button
          onClick={handleFavorite}
          className="absolute top-2 right-2 bg-white/90 p-1.5 rounded-full hover:bg-white transition-colors shadow-sm z-10"
        >
          <Heart
            className={`h-3.5 w-3.5 ${
              isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"
            }`}
          />
        </button>

        {/* Price Tag */}
        <div className="absolute bottom-2 left-2 bg-emerald-600 text-white text-sm px-3 py-1.5 rounded font-bold shadow-lg">
          {formatPrice(product.price)}
        </div>

        {/* Discount Badge */}
        {product.originalPrice > product.price && (
          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded font-semibold shadow-lg">
            SAVE {formatPrice(product.originalPrice - product.price)}
          </div>
        )}

        {/* Product Badges */}
        <div className="absolute top-10 left-2 flex flex-col gap-1">
          {product.badge && (
            <Badge className="bg-emerald-500 hover:bg-emerald-600 text-white text-[10px] px-2 py-0.5">
              {product.badge}
            </Badge>
          )}
          {/* {product.organic && (
            <Badge className="bg-green-500 hover:bg-green-600 text-white text-[10px] px-2 py-0.5">
              Organic
            </Badge>
          )} */}
          {product.featured && (
            <Badge className="bg-amber-500 hover:bg-amber-600 text-white text-[10px] px-2 py-0.5">
              Featured
            </Badge>
          )}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-3">
        {/* Title */}
        <h3 className="font-medium text-gray-900 text-sm mb-1 line-clamp-2 group-hover:text-emerald-600 transition-colors">
          {product.name}
        </h3>

        {/* Location & Time */}
        <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
          <div className="flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            <span>{product.location || "Lagos"}</span>
          </div>
          <span className="text-gray-400">{product.postedDate || "Today"}</span>
        </div>

        {/* Seller Info */}
        {!viewInStore && (
          <div className="flex items-center gap-2">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1 text-xs text-gray-600">
                <Star className="h-3 w-3 text-amber-400 fill-current" />
                <span>{product.rating || "N/A"}</span>
                <span className="text-gray-400">
                  ({product.reviewCount || 0})
                </span>
              </div>
              <div className="flex items-center gap-1 mt-1 flex-wrap">
                <span className="text-xs font-medium text-gray-700 truncate">
                  {product.vendor?.name || "Unknown Seller"}
                </span>
                {/* Years on Platform Badge */}
                <Badge className="bg-amber-100 text-amber-700 text-[10px] px-1.5 py-0.5">
                  <Award className="h-2 w-2 mr-1" />
                  {getYearsOnPlatform()}
                </Badge>
              </div>
            </div>
          </div>
        )}

        {/* Stock Status */}
        <div className="mt-2 flex items-center justify-between text-xs">
          <span
            className={`font-medium ${
              product.inStock ? "text-emerald-600" : "text-red-600"
            }`}
          >
            {product.inStock ? "In Stock" : "Out of Stock"}
            {product.inStock &&
              product.stockCount &&
              ` (${product.stockCount})`}
          </span>
          <span className="text-gray-500">ID: #{product.id}</span>
        </div>

        {/* Quick Actions on Hover */}
        <motion.div
          initial={{ height: 0, opacity: 0, y: 10 }}
          animate={{
            height: isHovered ? "auto" : 0,
            opacity: isHovered ? 1 : 0,
            y: isHovered ? 0 : 10,
          }}
          transition={{ duration: 0.2 }}
          className="overflow-hidden mt-2"
        >
          <div className="flex gap-2">
            <button
              onClick={handleCardClick}
              className="flex-1 py-2 text-sm font-medium bg-emerald-600 text-white hover:bg-emerald-700 rounded transition-colors"
            >
              View Product
            </button>
            <button
              onClick={handleFavorite}
              className={`py-2 px-4 text-sm font-medium rounded border transition-colors ${
                isFavorite
                  ? "bg-red-50 text-red-600 hover:bg-red-100 border-red-200"
                  : "bg-gray-50 text-gray-600 hover:bg-gray-100 border-gray-200"
              }`}
            >
              <Heart
                className={`h-4 w-4 ${isFavorite ? "fill-current" : ""}`}
              />
            </button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
