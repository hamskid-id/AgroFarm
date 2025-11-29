"use client";

import { Filter, Grid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProductFilters } from "./ProductFilters";
import { SheetWrapper } from "@/components/ui/custom-sheet";

interface ProductToolbarProps {
  isFilterOpen: boolean;
  setIsFilterOpen: (open: boolean) => void;
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  filteredProductsCount: number;
  filters: any;
  setFilters: (filters: any) => void;
  categories: any[];
  formatPrice: (price: number) => string;
  resetFilters: () => void;
  filterSidebar: React.ReactNode;
}

export const ProductToolbar = ({
  isFilterOpen,
  setIsFilterOpen,
  viewMode,
  setViewMode,
  sortBy,
  setSortBy,
  filteredProductsCount,
  filters,
  setFilters,
  categories,
  formatPrice,
  resetFilters,
  filterSidebar,
}: ProductToolbarProps) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-4">
        <SheetWrapper
          open={isFilterOpen}
          setOpen={setIsFilterOpen}
          title="Filter Products"
          side="left"
          trigger={
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              Filters
            </Button>
          }
        >
          {filterSidebar}
        </SheetWrapper>

        <div className="text-sm text-gray-600">
          {filteredProductsCount} products found
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* View Toggle */}
        <div className="flex border rounded-lg p-1">
          <Button
            variant={viewMode === "grid" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode("grid")}
            className="h-8 w-8 p-0"
          >
            <Grid className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode("list")}
            className="h-8 w-8 p-0"
          >
            <List className="h-4 w-4" />
          </Button>
        </div>

        {/* Sort */}
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="featured">Featured</SelectItem>
            <SelectItem value="price-low">Price: Low to High</SelectItem>
            <SelectItem value="price-high">Price: High to Low</SelectItem>
            <SelectItem value="rating">Top Rated</SelectItem>
            <SelectItem value="name">Name A-Z</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
