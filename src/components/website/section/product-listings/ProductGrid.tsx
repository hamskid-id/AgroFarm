"use client";

import { motion } from "framer-motion";
import { Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "../featured-products";
import { Product } from "@/types";
import { cn } from "@/lib/utils";

interface ProductGridProps {
  products: Product[];
  viewMode: "grid" | "list";
  formatPrice: (price: number) => string;
  onResetFilters: () => void;
}

const ProductGrid = ({
  products,
  viewMode,
  formatPrice,
  onResetFilters,
}: ProductGridProps) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  // Empty State
  if (!products || products.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-100"
      >
        <div className="w-24 h-24 bg-gradient-to-br from-emerald-100 to-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Package className="h-12 w-12 text-emerald-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-3">
          No products found
        </h3>
        <p className="text-gray-600 max-w-md mx-auto mb-6">
          Try adjusting your filters or browse our full catalog
        </p>
        <div className="flex gap-4 justify-center">
          <Button
            onClick={onResetFilters}
            className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800"
          >
            Reset All Filters
          </Button>
          <Button
            variant="outline"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            Browse Top Products
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={cn(
        "grid grid-cols-1 gap-4 w-full",
        viewMode === "grid" &&
          "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
      )}
    >
      {products.map((product, index) => {
        return (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            whileHover={{ y: -4 }}
            className="transition-transform duration-200"
          >
            <ProductCard product={product} viewMode={viewMode} />
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default ProductGrid;
