"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ZoomIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Product } from "@/types";
import { Badge } from "@/components/ui/badge";

interface ProductImageGalleryProps {
  product: Product;
  selectedImage: number;
  onSelectImage: (index: number) => void;
}

export const ProductImageGallery = ({
  product,
  selectedImage,
  onSelectImage,
}: ProductImageGalleryProps) => {
  const [isZoomed, setIsZoomed] = useState(false);

  // Reset zoom state when product changes
  useEffect(() => {
    setIsZoomed(false);
  }, [product.id]); // Reset when product ID changes

  const images =
    product.images && product.images.length > 0
      ? product.images
      : [product.image];

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-gray-100 group">
        <Image
          src={images[selectedImage]}
          alt={product.name}
          fill
          className={`object-cover transition-transform duration-300 ${
            isZoomed
              ? "scale-150 cursor-zoom-out"
              : "group-hover:scale-105 cursor-zoom-in"
          }`}
          onClick={() => setIsZoomed(!isZoomed)}
        />

        {/* Zoom Button */}
        <Button
          size="icon"
          variant="secondary"
          className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm hover:bg-white"
          onClick={() => setIsZoomed(!isZoomed)}
        >
          <ZoomIn className="h-4 w-4" />
        </Button>

        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {product.badge && (
            <Badge className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1">
              {product.badge}
            </Badge>
          )}
          {product.featured && (
            <Badge className="bg-yellow-500 text-black px-3 py-1">
              Featured
            </Badge>
          )}
          {product.organic && (
            <Badge className="bg-green-500 text-white px-3 py-1">Organic</Badge>
          )}
        </div>
      </div>

      {/* Thumbnail Gallery */}
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={`${product.id}-${index}`} // Add product.id to key to force re-render
              onClick={() => onSelectImage(index)}
              className={`flex-shrink-0 relative aspect-square w-20 overflow-hidden rounded-lg border-2 transition-all ${
                selectedImage === index
                  ? "border-emerald-500 ring-2 ring-emerald-200"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <Image
                src={image}
                alt={`${product.name} ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
