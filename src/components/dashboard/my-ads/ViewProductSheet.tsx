import React from "react";
import { MapPin, Eye, Heart, Edit2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { SheetWrapper } from "@/components/ui/custom-sheet";
import Image from "next/image";
import { Product } from "@/types";

interface ViewProductSheetProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  product: Product | null;
  onEdit: (product: Product) => void;
}

const ViewProductSheet: React.FC<ViewProductSheetProps> = ({
  isOpen,
  setIsOpen,
  product,
  onEdit,
}) => {
  if (!product) return null;

  return (
    <SheetWrapper
      open={isOpen}
      setOpen={setIsOpen}
      title="Product Details"
      description="View detailed information about this product"
      width="w-[400px] sm:w-[500px]"
    >
      <div className="space-y-6">
        {/* Product Header */}
        <div className="flex items-center gap-4">
          <div className="relative w-16 h-16 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-lg flex items-center justify-center overflow-hidden">
            {typeof product.image === "string" ? (
              <div className="text-3xl">{product.image}</div>
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
            <h3 className="font-bold text-gray-900">{product.name}</h3>
            <div className="mt-2 flex gap-2">
              {product.inStock && (
                <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">
                  In Stock
                </Badge>
              )}
              {product.featured && (
                <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100">
                  Featured
                </Badge>
              )}
              {product.organic && (
                <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                  Organic
                </Badge>
              )}
            </div>
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-sm text-gray-600">Price</Label>
              <p className="font-bold text-emerald-600 text-lg">
                ₦{product.price.toLocaleString()}
                {product.originalPrice &&
                  product.originalPrice > product.price && (
                    <span className="ml-2 text-sm text-gray-400 line-through">
                      ₦{product.originalPrice.toLocaleString()}
                    </span>
                  )}
              </p>
            </div>
            <div>
              <Label className="text-sm text-gray-600">Category</Label>
              <p className="font-medium">{product.category.name}</p>
            </div>
            <div>
              <Label className="text-sm text-gray-600">Condition</Label>
              <p className="font-medium">{product.condition || "Fresh"}</p>
            </div>
            <div>
              <Label className="text-sm text-gray-600">Stock</Label>
              <p className="font-medium">{product.stockCount} units</p>
            </div>
          </div>

          <div>
            <Label className="text-sm text-gray-600">Location</Label>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-gray-400" />
              <p>{product.location}</p>
            </div>
          </div>

          <div>
            <Label className="text-sm ">Description</Label>
            <p className="text-gray-700 text-sm">{product.description}</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1">
                <Eye className="h-4 w-4 text-gray-500" />
                <span className="font-bold text-lg">1.2K</span>
              </div>
              <p className="text-xs text-gray-500">Views</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1">
                <Heart className="h-4 w-4 text-red-500" />
                <span className="font-bold text-lg">89</span>
              </div>
              <p className="text-xs text-gray-500">Favorites</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-6 border-t">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => setIsOpen(false)}
          >
            Close
          </Button>
          <Button
            className="flex-1 bg-emerald-600 hover:bg-emerald-700"
            onClick={() => {
              setIsOpen(false);
              onEdit(product);
            }}
          >
            <Edit2 className="h-4 w-4 mr-2" />
            Edit Product
          </Button>
        </div>
      </div>
    </SheetWrapper>
  );
};

export default ViewProductSheet;
