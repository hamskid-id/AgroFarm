"use client";

import { products } from "@/components/constants/product";
import { ProductCard } from "../featured-products";
import { Product } from "@/types";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

interface RelatedProductsProps {
  currentProduct: Product;
}

export const RelatedProducts = ({ currentProduct }: RelatedProductsProps) => {
  const relatedProducts = products
    .filter(
      (product) =>
        product.id !== currentProduct.id &&
        (product.category.name === currentProduct.category.name ||
          product.location === currentProduct.location)
    )
    .slice(0, 3);

  if (relatedProducts.length === 0) return null;

  return (
    <div className="bg-white rounded-xl p-4 border ">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900">
          Similar Listings
        </h2>
        <p className="text-sm text-gray-600 mt-1">You might also like</p>
      </div>

      <div className="space-y-4">
        {relatedProducts.map((product) => (
          <div
            key={product.id}
            className="border-b last:border-b-0 pb-4 last:pb-0"
          >
            <ProductCard product={product} viewMode="list" />
          </div>
        ))}
      </div>

      <Button
        variant="link"
        className="w-full mt-4 text-emerald-600 hover:text-emerald-700"
        onClick={() =>
          (window.location.href = `/products?category=${currentProduct.category.name.toLowerCase()}`)
        }
      >
        View more in {currentProduct.category.name} <ChevronRight/>
      </Button>
    </div>
  );
};
