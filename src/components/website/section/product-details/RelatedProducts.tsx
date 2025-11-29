"use client";

import {  products } from "@/components/constants/product";
import { ProductCard } from "../featured-products";
import { Product } from "@/types";

interface RelatedProductsProps {
  currentProduct: Product;
}

export const RelatedProducts = ({ currentProduct }: RelatedProductsProps) => {
  // Find related products (same category, excluding current product)
  const relatedProducts = products
    .filter(
      (product) =>
        product.id !== currentProduct.id &&
        product.category.name === currentProduct.category.name
    )
    .slice(0, 4);

  if (relatedProducts.length === 0) return null;

  return (
    <div className="border-t pt-16">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Related Products
        </h2>
        <p className="text-gray-600">
          Discover more amazing products in the same category
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {relatedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
