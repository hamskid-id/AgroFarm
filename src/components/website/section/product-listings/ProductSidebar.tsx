"use client";

import { motion } from "framer-motion";
import { ChevronRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import FilterSection from "./FilterSection";
import { productCategories, products } from "@/components/constants/product";

interface ProductSidebarProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  showVerifiedOnly: boolean;
  setShowVerifiedOnly: (value: boolean) => void;
  showDiscountOnly: boolean;
  setShowDiscountOnly: (value: boolean) => void;
  conditionFilter: string;
  setConditionFilter: (value: string) => void;
  formatPrice: (price: number) => string;
  onResetFilters: () => void;
  totalProducts: number;
}

const ProductSidebar = ({
  selectedCategory,
  setSelectedCategory,
  priceRange,
  setPriceRange,
  showVerifiedOnly,
  setShowVerifiedOnly,
  showDiscountOnly,
  setShowDiscountOnly,
  conditionFilter,
  setConditionFilter,
  formatPrice,
  onResetFilters,
  totalProducts,
}: ProductSidebarProps) => {
  // Format categories for the filter
  const categories = [
    { id: "all", name: "All Products", count: totalProducts, icon: "🛒" },
    ...productCategories.map((category) => ({
      id: category.id,
      name: category.label,
      count: products.filter(
        (p) => p.category.name.toLowerCase() === category.id
      ).length,
      icon: category.icon,
    })),
  ];

  const priceRanges = [
    { label: "Under ₦5,000", count: "25,300 ads", min: 0, max: 5000 },
    { label: "₦5,000 - ₦20,000", count: "141,200 ads", min: 5000, max: 20000 },
    {
      label: "₦20,000 - ₦100,000",
      count: "235,334 ads",
      min: 20000,
      max: 100000,
    },
    {
      label: "₦100,000 - ₦500,000",
      count: "147,084 ads",
      min: 100000,
      max: 500000,
    },
    {
      label: "More than ₦500,000",
      count: "29,416 ads",
      min: 500000,
      max: 10000000,
    },
  ];

  const verifiedOptions = [
    { label: "Show all", value: "all", count: `${totalProducts} ads` },
    { label: "Verified sellers", value: "verified", count: "407,835 ads" },
    { label: "Unverified sellers", value: "unverified", count: "180,501 ads" },
  ];

  const discountOptions = [
    { label: "Show all", value: "all", count: `${totalProducts} ads` },
    { label: "With discount", value: "with", count: "819 ads" },
    { label: "Without discount", value: "without", count: "587,517 ads" },
  ];

  const conditionOptions = [
    { label: "Show all", value: "all", count: `${totalProducts} ads` },
    { label: "Fresh Produce", value: "fresh", count: "523,412 ads" },
    { label: "Processed Goods", value: "processed", count: "64,924 ads" },
  ];

  return (
    <motion.div
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-4"
    >
      {/* Remove the mobile filter header that was here */}

      {/* Categories */}
      <FilterSection title="Categories" defaultOpen={true}>
        <div className="space-y-1">
          {categories.slice(0, 8).map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`w-full flex items-center justify-between px-3 py-3 rounded-lg transition-all duration-300 ${
                selectedCategory === category.id
                  ? "bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 text-emerald-700"
                  : "hover:bg-gray-50 text-gray-700"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{category.icon}</span>
                <div className="text-left">
                  <div className="font-medium text-sm">{category.name}</div>
                  <div className="text-xs text-gray-500">
                    {category.count.toLocaleString()} products
                  </div>
                </div>
              </div>
              <ChevronRight className="h-4 w-4 text-gray-400" />
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Price Filter */}
      <FilterSection title="Price Range">
        <div className="space-y-4">
          <div className="px-2">
            <Slider
              value={priceRange}
              onValueChange={(value) =>
                setPriceRange(value as [number, number])
              }
              max={10000000}
              min={0}
              step={1000}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-500 mt-2">
              <span>{formatPrice(priceRange[0])}</span>
              <span>{formatPrice(priceRange[1])}</span>
            </div>
          </div>

          <div className="space-y-2 pt-2">
            {priceRanges.map((range) => (
              <label
                key={range.label}
                className="flex items-start gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded"
              >
                <input
                  type="radio"
                  name="priceRange"
                  checked={
                    priceRange[0] === range.min && priceRange[1] === range.max
                  }
                  onChange={() => setPriceRange([range.min, range.max])}
                  className="w-4 h-4 text-emerald-500 mt-0.5"
                />
                <span className="text-sm text-gray-700 flex-1">
                  {range.label}
                  <span className="text-gray-400 ml-2">• {range.count}</span>
                </span>
              </label>
            ))}
          </div>
        </div>
      </FilterSection>

      {/* Verified Sellers */}
      <FilterSection title="Seller Verification">
        <div className="space-y-2">
          {verifiedOptions.map((option) => (
            <label
              key={option.value}
              className="flex items-start gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded"
            >
              <input
                type="radio"
                name="verified"
                checked={
                  (option.value === "all" && !showVerifiedOnly) ||
                  (option.value === "verified" && showVerifiedOnly)
                }
                onChange={() =>
                  setShowVerifiedOnly(option.value === "verified")
                }
                className="w-4 h-4 text-emerald-500 mt-0.5"
              />
              <span className="text-sm text-gray-700 flex-1">
                {option.label}
                <span className="text-gray-400 ml-2">• {option.count}</span>
              </span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Discount */}
      <FilterSection title="Discount">
        <div className="space-y-2">
          {discountOptions.map((option) => (
            <label
              key={option.value}
              className="flex items-start gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded"
            >
              <input
                type="radio"
                name="discount"
                checked={
                  (option.value === "all" && !showDiscountOnly) ||
                  (option.value === "with" && showDiscountOnly)
                }
                onChange={() => setShowDiscountOnly(option.value === "with")}
                className="w-4 h-4 text-emerald-500 mt-0.5"
              />
              <span className="text-sm text-gray-700 flex-1">
                {option.label}
                <span className="text-gray-400 ml-2">• {option.count}</span>
              </span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Condition */}
      <FilterSection title="Condition">
        <div className="space-y-2">
          {conditionOptions.map((option) => (
            <label
              key={option.value}
              className="flex items-start gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded"
            >
              <input
                type="radio"
                name="condition"
                checked={conditionFilter === option.value}
                onChange={() => setConditionFilter(option.value)}
                className="w-4 h-4 text-emerald-500 mt-0.5"
              />
              <span className="text-sm text-gray-700 flex-1">
                {option.label}
                <span className="text-gray-400 ml-2">• {option.count}</span>
              </span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Reset Button */}
      <Button
        onClick={onResetFilters}
        variant="outline"
        className="w-full border-emerald-200 text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700"
      >
        <X className="h-4 w-4 mr-2" />
        Reset All Filters
      </Button>
    </motion.div>
  );
};

export default ProductSidebar;
