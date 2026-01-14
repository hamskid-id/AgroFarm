"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Heart,
  Star,
  ShoppingCart,
  X,
  HeartCrack,
  Trash2,
  Eye,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "../../ui/button";
import { Product } from "@/types";
import { useFavoritesStore } from "@/stores/favorites-store";
import { formatPrice } from "@/lib/utils";

interface FavoritesProductsProps {
  favoritesList?: Product[];
  showHeader?: boolean;
  maxHeight?: string;
}

interface ProductBadgesProps {
  featured?: boolean;
  organic?: boolean;
}

interface ProductCardProps {
  item: Product;
  isRemoving: boolean;
  onRemove: (item: Product) => void;
  onView: (productId: number) => void;
}

const handleShare = async (product: Product) => {
  const productUrl = `${window.location.origin}/products/${product.id}`;

  if (navigator.share) {
    try {
      await navigator.share({
        title: product.name,
        text: `Check out ${product.name} on AgroFarm`,
        url: productUrl,
      });
    } catch (err) {
      console.log("Error sharing:", err);
    }
  } else {
    navigator.clipboard.writeText(productUrl);
    toast.info("Link copied", {
      description: "Product link copied to clipboard",
    });
  }
};

const ProductBadges = ({ featured, organic }: ProductBadgesProps) => (
  <>
    {featured && (
      <div className="absolute top-1 left-1">
        <div className="bg-amber-500 text-white text-xs px-1.5 py-0.5 rounded font-medium">
          Featured
        </div>
      </div>
    )}
    {organic && (
      <div className="absolute top-1 right-1">
        <div className="bg-green-500 text-white text-xs px-1.5 py-0.5 rounded font-medium">
          Organic
        </div>
      </div>
    )}
  </>
);

const ProductImage = ({
  item,
  onView,
}: {
  item: Product;
  onView: (id: number) => void;
}) => (
  <div
    className="relative w-20 h-20 bg-white rounded-lg overflow-hidden border border-gray-200 flex-shrink-0 cursor-pointer group/image"
    onClick={() => onView(item.id)}
  >
    <Image
      src={item.image}
      alt={item.name}
      fill
      className="object-cover hover:scale-105 transition-transform duration-300"
      sizes="80px"
    />
    <ProductBadges featured={item.featured} organic={item.organic} />

    <div className="absolute inset-0 bg-black/0 group-hover/image:bg-black/10 transition-all duration-300 flex items-center justify-center opacity-0 group-hover/image:opacity-100">
      <Eye className="h-5 w-5 text-white" />
    </div>
  </div>
);

const ProductInfo = ({
  item,
  onView,
}: {
  item: Product;
  onView: (id: number) => void;
}) => (
  <div className="flex-1 min-w-0">
    {/* Title & Date */}
    <div className="flex items-start justify-between gap-2">
      <h4
        className="font-semibold text-gray-900 text-sm line-clamp-1 hover:text-emerald-600 cursor-pointer"
        onClick={() => onView(item.id)}
      >
        {item.name}
      </h4>
      <span className="text-xs text-gray-500 flex-shrink-0">
        {item.postedDate || "Today"}
      </span>
    </div>

    {/* Vendor & Rating */}
    <div className="flex items-center gap-2 mt-1 mb-2">
      <div className="flex items-center gap-1">
        <Star className="h-3 w-3 text-amber-400 fill-current" />
        <span className="text-xs text-gray-700 font-medium">{item.rating}</span>
        <span className="text-xs text-gray-400">({item.reviewCount})</span>
      </div>
      <span className="text-gray-300">•</span>
      <span className="text-xs text-emerald-600 font-medium truncate">
        {item.vendor.name}
      </span>
    </div>

    {/* Price */}
    <div className="flex flex-col mb-2">
      <span className="text-lg font-bold text-emerald-600">
        {formatPrice(item.price)}
      </span>
      {item.originalPrice > item.price && (
        <span className="text-sm text-gray-500 line-through">
          {formatPrice(item.originalPrice)}
        </span>
      )}
    </div>
  </div>
);

const ProductActions = ({
  item,
  isRemoving,
  onView,
  onRemove,
}: {
  item: Product;
  isRemoving: boolean;
  onView: (id: number) => void;
  onRemove: (item: Product) => void;
}) => (
  <div className="flex items-center flex-wrap gap-2">
    <Button
      size="sm"
      variant="outline"
      className="text-xs px-3 border-emerald-200 text-emerald-600 hover:bg-emerald-50"
      onClick={() => onView(item.id)}
    >
      <ShoppingCart className="h-3 w-3 mr-1" />
      View
    </Button>
    <Button
      size="sm"
      variant="outline"
      className={`text-xs px-3 border-red-200 text-red-600 hover:bg-red-50 ${
        isRemoving ? "opacity-50 cursor-not-allowed" : ""
      }`}
      onClick={() => onRemove(item)}
      disabled={isRemoving}
    >
      {isRemoving ? (
        <>
          <div className="h-3 w-3 border-2 border-red-600 border-t-transparent rounded-full animate-spin mr-1" />
          Removing...
        </>
      ) : (
        <>
          <HeartCrack className="h-3 w-3 mr-1" />
          Remove
        </>
      )}
    </Button>
  </div>
);

const ProductCard = ({
  item,
  isRemoving,
  onRemove,
  onView,
}: ProductCardProps) => (
  <div className="cursor-pointer flex items-start gap-4 transition-all group">
    <ProductImage item={item} onView={onView} />

    <ProductInfo item={item} onView={onView} />

    <ProductActions
      item={item}
      isRemoving={isRemoving}
      onView={onView}
      onRemove={onRemove}
    />

    {/* Quick Remove Button */}
    <Button
      size="icon"
      variant="ghost"
      className={`h-8 w-8 text-gray-400 hover:text-red-500 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-all ${
        isRemoving ? "opacity-0 cursor-not-allowed" : ""
      }`}
      onClick={() => onRemove(item)}
      disabled={isRemoving}
    >
      {isRemoving ? (
        <div className="h-4 w-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
      ) : (
        <X className="h-4 w-4" />
      )}
    </Button>
  </div>
);

const EmptyState = ({ onExplore }: { onExplore: () => void }) => (
  <div className="bg-white rounded-xl shadow-sm border p-8">
    <div className="text-center py-8">
      <Heart className="h-20 w-20 mx-auto text-gray-200 mb-6" />
      <h3 className="text-xl font-semibold text-gray-700 mb-3">
        Your favorites list is empty
      </h3>
      <p className="text-gray-500 max-w-md mx-auto mb-8">
        Start adding products you love! Click the heart icon on any product to
        save it here.
      </p>
      <Button
        onClick={onExplore}
        className="bg-emerald-600 hover:bg-emerald-700 px-8"
        size="lg"
      >
        Explore Products
      </Button>
    </div>
  </div>
);

const FavoritesHeader = ({
  count,
  onClearAll,
}: {
  count: number;
  onClearAll: () => void;
}) => (
  <div className="p-4 border-b bg-gradient-to-r from-gray-50 to-white">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-red-50 rounded-lg">
          <Heart className="h-6 w-6 text-red-500" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">My Favorites</h2>
          <p className="text-sm text-gray-500">
            {count} {count === 1 ? "item" : "items"} saved
          </p>
        </div>
      </div>

      <Button
        variant="outline"
        size="sm"
        onClick={onClearAll}
        className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
        disabled={count === 0}
      >
        <Trash2 className="h-4 w-4 mr-2" />
        Clear All
      </Button>
    </div>
  </div>
);

const FavoritesFooter = ({
  favorites,
  onContinueShopping,
  onAddAllToCart,
}: {
  favorites: Product[];
  onContinueShopping: () => void;
  onAddAllToCart: () => void;
}) => {
  const organicCount = favorites.filter((p) => p.organic).length;
  const totalPrice = favorites.reduce((total, item) => total + item.price, 0);

  return (
    <div className="p-4 border-t bg-gray-50">
      <div className="flex items-center justify-between text-sm">
        <div className="text-gray-600">
          <span className="font-medium">{favorites.length}</span> products •
          <span className="ml-2">{organicCount} organic</span>
        </div>
        <div className="text-gray-900 font-medium">
          Total: {formatPrice(totalPrice)}
        </div>
      </div>

      {/* Actions Footer */}
      <div className="flex items-center justify-between mt-3 pt-3 border-t">
        <Button
          variant="ghost"
          size="sm"
          className="text-gray-600 hover:text-gray-900"
          onClick={onContinueShopping}
        >
          Continue Shopping
        </Button>
        <Button
          size="sm"
          className="bg-emerald-600 hover:bg-emerald-700"
          onClick={onAddAllToCart}
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          Add All to Cart
        </Button>
      </div>
    </div>
  );
};

const FavoritesProducts = ({
  favoritesList: externalFavorites,
  showHeader = true,
  maxHeight = "max-h-[80vh]",
}: FavoritesProductsProps) => {
  const router = useRouter();
  const [isRemoving, setIsRemoving] = useState<number | null>(null);

  const {
    favorites: storeFavorites,
    removeFromFavorites,
    clearFavorites,
    getFavoritesCount,
    loadFavorites,
  } = useFavoritesStore();

  const favorites = externalFavorites || storeFavorites;
  const favoritesCount = getFavoritesCount();

  useEffect(() => {
    loadFavorites();
  }, [loadFavorites]);

  const handleRemove = async (item: Product) => {
    if (isRemoving === item.id) return;

    setIsRemoving(item.id);
    try {
      removeFromFavorites(item.id);
      toast.success("Removed from favorites", {
        description: `${item.name} has been removed`,
      });
    } catch (error) {
      toast.error("Failed to remove", {
        description: "Please try again",
      });
    } finally {
      setIsRemoving(null);
    }
  };

  const handleClearAll = () => {
    if (favorites.length === 0) return;

    if (confirm(`Remove all ${favorites.length} items from favorites?`)) {
      clearFavorites();
      toast.info("Favorites cleared", {
        description: "All items have been removed",
      });
    }
  };

  const handleViewProduct = (productId: number) => {
    router.push(`/products/${productId}`);
  };

  const handleExploreProducts = () => {
    router.push("/products");
  };

  const handleAddAllToCart = () => {
    toast.info("Feature coming soon!", {
      description: "Add all to cart feature is in development",
    });
  };

  if (favorites.length === 0) {
    return <EmptyState onExplore={handleExploreProducts} />;
  }

  return (
    <div className="bg-white rounded-xl border overflow-hidden">
      {/* Header */}
      {showHeader && (
        <FavoritesHeader count={favoritesCount} onClearAll={handleClearAll} />
      )}

      {/* Products List */}
      <div className={`p-4 ${maxHeight} overflow-y-auto`}>
        <div className="space-y-5">
          {favorites.map((item) => (
            <ProductCard
              key={item.id}
              item={item}
              isRemoving={isRemoving === item.id}
              onRemove={handleRemove}
              onView={handleViewProduct}
            />
          ))}
        </div>
      </div>

      {/* Footer Stats */}
      {showHeader && favorites.length > 0 && (
        <FavoritesFooter
          favorites={favorites}
          onContinueShopping={handleExploreProducts}
          onAddAllToCart={handleAddAllToCart}
        />
      )}
    </div>
  );
};

export default FavoritesProducts;
