"use client";

import { ChevronRight, Filter, Grid3x3, List } from "lucide-react";
import { useState } from "react";

interface ProductToolbarProps {
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;
  categories: Array<{ id: string; name: string; count: number; icon: string }>;
  selectedCategory: string;
  onCategorySelect: (categoryId: string) => void;
}

export const ProductToolbar = ({
  viewMode,
  setViewMode,
  categories,
  selectedCategory,
  onCategorySelect,
}: ProductToolbarProps) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [tempFilters, setTempFilters] = useState({
    location: "all",
    priceRange: "all",
    verifiedSellers: "all",
    discount: "all",
  });

  const handleSaveFilters = () => {
    // Apply filters logic here
    setIsFilterOpen(false);
  };

  const handleClearFilters = () => {
    setTempFilters({
      location: "all",
      priceRange: "all",
      verifiedSellers: "all",
      discount: "all",
    });
  };

  return (
    <>
      <div className="flex items-center gap-2">
        {/* Mobile Filter Button */}
        <button
          onClick={() => setIsFilterOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-white text-gray-700 rounded border hover:bg-gray-50"
        >
          <Filter className="h-4 w-4" />
          <span>Filters</span>
        </button>

        {/* View Toggle */}
        <button
          onClick={() => setViewMode("grid")}
          className={`p-2 rounded transition-colors ${
            viewMode === "grid"
              ? "bg-yellow-500 text-white"
              : "bg-white text-gray-600 hover:bg-gray-100"
          }`}
        >
          <Grid3x3 className="h-5 w-5" />
        </button>
        <button
          onClick={() => setViewMode("list")}
          className={`p-2 rounded transition-colors ${
            viewMode === "list"
              ? "bg-yellow-500 text-white"
              : "bg-white text-gray-600 hover:bg-gray-100"
          }`}
        >
          <List className="h-5 w-5" />
        </button>
      </div>

      {/* Mobile Filter Sheet */}
      {isFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsFilterOpen(false)}
          />

          {/* Sheet */}
          <div className="absolute inset-y-0 left-0 w-full max-w-sm bg-white shadow-xl flex flex-col">
            {/* Header */}
            <div className="bg-emerald-500 text-white p-4 flex items-center justify-between">
              <h2 className="text-xl font-bold">Filters</h2>
              <button
                onClick={() => setIsFilterOpen(false)}
                className="text-white text-2xl"
              >
                ×
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto">
              {/* Categories */}
              <div className="border-b">
                <div className="bg-emerald-500 text-white px-4 py-3">
                  <h3 className="font-semibold text-lg">Categories</h3>
                </div>
                <div className="p-4 space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => {
                        onCategorySelect(category.id);
                        setIsFilterOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded transition-colors ${
                        selectedCategory === category.id
                          ? "bg-gray-100"
                          : "hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{category.icon}</span>
                        <div className="text-left">
                          <div className="font-medium text-sm text-gray-900">
                            {category.name}
                          </div>
                          <div className="text-xs text-gray-500">
                            {category.count.toLocaleString()} ads
                          </div>
                        </div>
                      </div>
                      <ChevronRight className="h-4 w-4 text-gray-400" />
                    </button>
                  ))}
                  {categories.length > 5 && (
                    <button className="text-emerald-600 text-sm font-medium">
                      Show all {categories.length}
                    </button>
                  )}
                </div>
              </div>

              {/* Location */}
              <div className="border-b p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Location</h3>
                <button className="w-full flex items-center justify-between text-left">
                  <span className="text-blue-600">All Nigeria</span>
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                </button>
              </div>

              {/* Price Range */}
              <div className="border-b p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-gray-900">Price, ₦</h3>
                  <button className="text-gray-400">—</button>
                </div>

                <div className="flex gap-2 mb-4">
                  <input
                    type="number"
                    placeholder="min"
                    className="flex-1 px-3 py-2 border rounded text-sm"
                  />
                  <span className="text-gray-400">—</span>
                  <input
                    type="number"
                    placeholder="max"
                    className="flex-1 px-3 py-2 border rounded text-sm"
                  />
                </div>

                <div className="space-y-3">
                  {[
                    { label: "Under 6.8 K", count: "35 300 ads" },
                    { label: "6.8 - 45 K", count: "141 200 ads" },
                    { label: "45 - 250 K", count: "235 334 ads" },
                    { label: "250 - 880 K", count: "147 084 ads" },
                    { label: "More than 880 K", count: "29 416 ads" },
                  ].map((range) => (
                    <label
                      key={range.label}
                      className="flex items-center gap-3 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="priceRange"
                        className="w-5 h-5 text-emerald-500"
                      />
                      <span className="text-sm text-gray-700">
                        {range.label}{" "}
                        <span className="text-gray-400">• {range.count}</span>
                      </span>
                    </label>
                  ))}
                </div>

                <div className="flex gap-3 mt-4">
                  <button
                    onClick={handleClearFilters}
                    className="text-gray-500 text-sm font-medium"
                  >
                    CLEAR
                  </button>
                  <button
                    onClick={handleSaveFilters}
                    className="ml-auto text-emerald-600 text-sm font-medium"
                  >
                    SAVE
                  </button>
                </div>
              </div>

              {/* Verified Sellers */}
              <div className="border-b p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-gray-900">
                    Verified sellers
                  </h3>
                  <button className="text-gray-400">—</button>
                </div>

                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="verified"
                      defaultChecked
                      className="w-5 h-5 text-emerald-500"
                    />
                    <span className="text-sm text-emerald-600 font-medium">
                      Show all
                    </span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="verified"
                      className="w-5 h-5 text-emerald-500"
                    />
                    <span className="text-sm text-gray-700">
                      Verified sellers{" "}
                      <span className="text-gray-400">• 407 835 ads</span>
                    </span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="verified"
                      className="w-5 h-5 text-emerald-500"
                    />
                    <span className="text-sm text-gray-700">
                      Unverified sellers{" "}
                      <span className="text-gray-400">• 180 501 ads</span>
                    </span>
                  </label>
                </div>
              </div>

              {/* Discount */}
              <div className="border-b p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-gray-900">Discount</h3>
                  <button className="text-gray-400">—</button>
                </div>

                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="discount"
                      defaultChecked
                      className="w-5 h-5 text-emerald-500"
                    />
                    <span className="text-sm text-emerald-600 font-medium">
                      Show all
                    </span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="discount"
                      className="w-5 h-5 text-emerald-500"
                    />
                    <span className="text-sm text-gray-700">
                      With discount{" "}
                      <span className="text-gray-400">• 819 ads</span>
                    </span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="discount"
                      className="w-5 h-5 text-emerald-500"
                    />
                    <span className="text-sm text-gray-700">
                      Without discount{" "}
                      <span className="text-gray-400">• 587 517 ads</span>
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};