"use client";

import { products } from "@/components/constants/product";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ProductCard } from "@/components/website/section/featured-products";

export const MostSoldProducts = () => {
  const currentPage = 1;
  let totalPages = 2;
  const relatedProducts = products.slice(0, 3);

  if (relatedProducts.length === 0) return null;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center justify-between">
          Top Selling products
        </h2>
        <div className="ms-auto flex items-center gap-3">
          <span className="text-sm text-gray-600">Page 1 of 2</span>
          <div className="flex items-center gap-1 h-10 border rounded-[12px] px-3 bg-white text-sm text-gray-600 hover:text-gray-700 font-medium">
            <ChevronLeft
              className={`w-4 h-4 cursor-pointer ${
                currentPage === 1 ? "text-gray-400 cursor-not-allowed" : ""
              }`}
            />
            <span className="cursor-pointer">Next</span>
            <ChevronRight
              className={`w-4 h-4 cursor-pointer ${
                currentPage === totalPages
                  ? "text-gray-400 cursor-not-allowed"
                  : ""
              }`}
            />
          </div>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 grid-cosl-1 md:grid-cols-4 gap-4">
        {relatedProducts.map((product) => (
          <div key={product.id}>
            <ProductCard product={product} viewInStore />
          </div>
        ))}
      </div>
    </div>
  );
};
