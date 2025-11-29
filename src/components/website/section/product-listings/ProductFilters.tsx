"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { FilterState } from "@/types";

interface ProductFiltersProps {
  filters: FilterState;
  setFilters: (
    filters: FilterState | ((prev: FilterState) => FilterState)
  ) => void;
  categories: Array<{ id: string; name: string; count: number; icon: string }>;
  formatPrice: (price: number) => string;
  resetFilters: () => void;
}

export const ProductFilters = ({
  filters,
  setFilters,
  categories,
  formatPrice,
  resetFilters,
}: ProductFiltersProps) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-lg">Filters</h3>
        <Button variant="ghost" size="sm" onClick={resetFilters}>
          Reset All
        </Button>
      </div>

      {/* Price Range */}
      <div className="space-y-3">
        <h4 className="font-medium">Price Range</h4>
        <div className="px-2">
          <Slider
            value={filters.priceRange}
            onValueChange={(value) =>
              setFilters((prev) => ({
                ...prev,
                priceRange: value as [number, number],
              }))
            }
            max={50000}
            min={0}
            step={1000}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-gray-500 mt-2">
            <span>{formatPrice(filters.priceRange[0])}</span>
            <span>{formatPrice(filters.priceRange[1])}</span>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="space-y-3">
        <h4 className="font-medium">Categories</h4>
        <div className="space-y-2">
          {categories.slice(1).map((category) => (
            <div key={category.id} className="flex items-center space-x-2">
              <Checkbox
                id={`cat-${category.id}`}
                checked={filters.categories.includes(category.name)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setFilters((prev) => ({
                      ...prev,
                      categories: [...prev.categories, category.name],
                    }));
                  } else {
                    setFilters((prev) => ({
                      ...prev,
                      categories: prev.categories.filter(
                        (c) => c !== category.name
                      ),
                    }));
                  }
                }}
              />
              <label
                htmlFor={`cat-${category.id}`}
                className="text-sm cursor-pointer flex items-center justify-between w-full"
              >
                <span className="flex items-center gap-2">
                  <span>{category.icon}</span>
                  {category.name}
                </span>
                <span className="text-gray-500">({category.count})</span>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Rating */}
      <div className="space-y-3">
        <h4 className="font-medium">Minimum Rating</h4>
        <div className="space-y-2">
          {[4.5, 4.0, 3.5, 3.0].map((rating) => (
            <div key={rating} className="flex items-center space-x-2">
              <Checkbox
                id={`rating-${rating}`}
                checked={filters.ratings.includes(rating)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setFilters((prev) => ({
                      ...prev,
                      ratings: [...prev.ratings, rating],
                    }));
                  } else {
                    setFilters((prev) => ({
                      ...prev,
                      ratings: prev.ratings.filter((r) => r !== rating),
                    }));
                  }
                }}
              />
              <label
                htmlFor={`rating-${rating}`}
                className="text-sm cursor-pointer flex items-center gap-2"
              >
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`text-sm ${
                        i < rating ? "text-yellow-400" : "text-gray-300"
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <span>& up</span>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Special Filters */}
      <div className="space-y-3">
        <h4 className="font-medium">Special Filters</h4>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="in-stock"
              checked={filters.inStockOnly}
              onCheckedChange={(checked) =>
                setFilters((prev) => ({ ...prev, inStockOnly: !!checked }))
              }
            />
            <label htmlFor="in-stock" className="text-sm cursor-pointer">
              In Stock Only
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="organic"
              checked={filters.organicOnly}
              onCheckedChange={(checked) =>
                setFilters((prev) => ({ ...prev, organicOnly: !!checked }))
              }
            />
            <label htmlFor="organic" className="text-sm cursor-pointer">
              Organic Only
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};
