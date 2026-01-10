"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Filter } from "lucide-react";
import ProductSidebar from "./ProductSidebar";
import ProductMainContent from "./ProductMainContent";
import { Product } from "@/types";
import { products } from "@/components/constants/product";
import { Button } from "@/components/ui/button";
import { SheetWrapper } from "@/components/ui/custom-sheet";

export default function ProductListingSection() {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000000]);
  const [showVerifiedOnly, setShowVerifiedOnly] = useState(false);
  const [showDiscountOnly, setShowDiscountOnly] = useState(false);
  const [conditionFilter, setConditionFilter] = useState<string>("all");
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  // Initialize with all products
  useEffect(() => {
    setFilteredProducts(products);
  }, []);

  // Apply all filters
  useEffect(() => {
    let filtered = products.filter((product) => {
      // Category filter
      const matchesCategory =
        selectedCategory === "all" ||
        product.category.name.toLowerCase() === selectedCategory;

      // Price filter
      const matchesPrice =
        product.price >= priceRange[0] && product.price <= priceRange[1];

      // Verified filter
      const matchesVerified = !showVerifiedOnly || product.vendor.rating >= 4.5;

      // Discount filter
      const matchesDiscount =
        !showDiscountOnly || product.originalPrice > product.price;

      // Condition filter
      const matchesCondition =
        conditionFilter === "all" ||
        (conditionFilter === "fresh" && product.organic) ||
        (conditionFilter === "processed" && !product.organic);

      return (
        matchesCategory &&
        matchesPrice &&
        matchesVerified &&
        matchesDiscount &&
        matchesCondition
      );
    });

    setFilteredProducts(filtered);
  }, [
    selectedCategory,
    priceRange,
    showVerifiedOnly,
    showDiscountOnly,
    conditionFilter,
  ]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleResetFilters = () => {
    setSelectedCategory("all");
    setPriceRange([0, 10000000]);
    setShowVerifiedOnly(false);
    setShowDiscountOnly(false);
    setConditionFilter("all");
    setIsFiltersOpen(false);
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="py-8 bg-gradient-to-b from-gray-50 to-white min-h-screen"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-0 ">
        {/* Mobile Filter Button */}
        <div className="lg:hidden mb-3">
          <Button
            onClick={() => setIsFiltersOpen(true)}
            variant="outline"
            className="w-full h-[49px] justify-start gap-2 border-emerald-200 text-emerald-600 hover:bg-emerald-50"
          >
            <Filter className="h-4 w-4" />
            Filters & Categories
            {filteredProducts.length < products.length && (
              <span className="ml-auto bg-emerald-100 text-emerald-700 text-xs px-2 py-0.5 rounded-full">
                Active filters
              </span>
            )}
          </Button>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Desktop Sidebar - Hidden on mobile */}
          <div className="hidden lg:block w-full lg:w-80 flex-shrink-0">
            <ProductSidebar
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              showVerifiedOnly={showVerifiedOnly}
              setShowVerifiedOnly={setShowVerifiedOnly}
              showDiscountOnly={showDiscountOnly}
              setShowDiscountOnly={setShowDiscountOnly}
              conditionFilter={conditionFilter}
              setConditionFilter={setConditionFilter}
              formatPrice={formatPrice}
              onResetFilters={handleResetFilters}
              totalProducts={products.length}
            />
          </div>

          {/* Mobile Filter Sheet */}
          <SheetWrapper
            open={isFiltersOpen}
            setOpen={setIsFiltersOpen}
            side="left"
            title="Filters & Categories"
          >
            <ProductSidebar
              selectedCategory={selectedCategory}
              setSelectedCategory={(category) => {
                setSelectedCategory(category);
                setIsFiltersOpen(false);
              }}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              showVerifiedOnly={showVerifiedOnly}
              setShowVerifiedOnly={setShowVerifiedOnly}
              showDiscountOnly={showDiscountOnly}
              setShowDiscountOnly={setShowDiscountOnly}
              conditionFilter={conditionFilter}
              setConditionFilter={setConditionFilter}
              formatPrice={formatPrice}
              onResetFilters={handleResetFilters}
              totalProducts={products.length}
            />
          </SheetWrapper>

          {/* Main Content */}
          <ProductMainContent
            filteredProducts={filteredProducts}
            viewMode={viewMode}
            setViewMode={setViewMode}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            formatPrice={formatPrice}
            onResetFilters={handleResetFilters}
          />
        </div>
      </div>
    </motion.section>
  );
}
