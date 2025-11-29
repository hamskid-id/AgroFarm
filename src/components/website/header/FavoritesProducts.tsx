import { Heart, Star, ShoppingCart, X, HeartCrack } from "lucide-react";
import { Button } from "../../ui/button";
import { Product } from "@/types";
import Image from "next/image";

interface FavoritesProductsProps {
  favoritesList?: Product[];
}

const FavoritesProducts = ({ favoritesList = [] }: FavoritesProductsProps) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(price);
  };

  return (
    <div >
      {favoritesList?.length === 0 ? (
        <div className="text-center py-12">
          <Heart className="h-16 w-16 mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500 font-medium mb-2">
            Your wishlist is empty
          </p>
          <p className="text-sm text-gray-400">
            Start adding products you love!
          </p>
        </div>
      ) : (
        <div className="space-y-3 max-h-[80vh] overflow-y-auto">
          {favoritesList?.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-200 hover:shadow-md transition-all group"
            >
              {/* Product Image */}
              <div className="relative w-16 h-16 bg-white rounded-lg overflow-hidden border border-gray-200 flex-shrink-0">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
                {item.featured && (
                  <div className="absolute top-1 left-1">
                    <div className="bg-amber-500 text-white text-xs px-1.5 py-0.5 rounded">
                      Featured
                    </div>
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-gray-900 text-sm line-clamp-1">
                  {item.name}
                </h4>

                <div className="flex items-center gap-2 mt-1">
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 text-amber-400 fill-current" />
                    <span className="text-xs text-gray-600">{item.rating}</span>
                    <span className="text-xs text-gray-400">
                      ({item.reviewCount})
                    </span>
                  </div>
                  <span className="text-gray-300">•</span>
                  <span className="text-xs text-emerald-600 font-medium">
                    {item.vendor.name}
                  </span>
                </div>

                <div className="flex gap-2 items-center justify-between mt-2">
                  <span className="text-lg font-bold text-emerald-600">
                    {formatPrice(item.price)}
                  </span>
                  <Button
                    size="sm"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs px-3"
                  >
                    <HeartCrack className="h-3 w-3 mr-1" />
                    Remove
                  </Button>
                </div>
              </div>

              {/* Remove Button */}
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 text-gray-400 hover:text-red-500 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-all"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesProducts;
