"use client";

import { motion } from "framer-motion";
import { Grid3X3, List, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductGrid from "./ProductGrid";
import { Product } from "@/types";

interface ProductMainContentProps {
  filteredProducts: Product[];
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  formatPrice: (price: number) => string;
  onResetFilters: () => void;
}

const ProductMainContent = ({
  filteredProducts,
  viewMode,
  setViewMode,
  selectedCategory,
  setSelectedCategory,
  formatPrice,
  onResetFilters,
}: ProductMainContentProps) => {
  return (
    <main className="flex flex-col gap-4">
      {/* Header Section */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-gradient-to-r from-white to-emerald-50 rounded-xl p-4 border border-gray-100">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 text-sm text-emerald-600 mb-1">
                <ChevronRight className="h-4 w-4" />
                <span>Fresh From Farms</span>
              </div>
              <h1 className="sm:text-3xl text-2xl font-bold text-gray-900 mb-2">
                Fresh Agricultural Products
              </h1>
              <p className="text-gray-600 text-[14px]">
                Discover quality products directly from verified farmers with
                inspection options
              </p>
            </div>

            {/* View Toggle */}
            <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg p-1">
              <Button
                size="sm"
                variant={viewMode === "grid" ? "default" : "ghost"}
                className={`px-3 ${
                  viewMode === "grid"
                    ? "bg-emerald-600 hover:bg-emerald-700"
                    : "text-gray-600"
                }`}
                onClick={() => setViewMode("grid")}
              >
                <Grid3X3 className="h-4 w-4 mr-2" />
                Grid
              </Button>
              <Button
                size="sm"
                variant={viewMode === "list" ? "default" : "ghost"}
                className={`px-3 ${
                  viewMode === "list"
                    ? "bg-emerald-600 hover:bg-emerald-700"
                    : "text-gray-600"
                }`}
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4 mr-2" />
                List
              </Button>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between text-sm gap-2">
            <div className="flex items-center gap-4">
              <span className="font-medium text-gray-900">
                {filteredProducts.length} products found
              </span>
              {selectedCategory !== "all" && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedCategory("all")}
                  className="text-emerald-600 hover:text-emerald-700"
                >
                  View All Categories
                </Button>
              )}
            </div>
            <div className="text-gray-500">
              Sorted by:{" "}
              <span className="text-emerald-600 font-medium">Featured</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Products Grid */}
      <ProductGrid
        products={filteredProducts}
        viewMode={viewMode}
        formatPrice={formatPrice}
        onResetFilters={onResetFilters}
      />
    </main>
  );
};

export default ProductMainContent;
