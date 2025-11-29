"use client";

import { useState, useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import { ProductCard } from "../featured-products";
import { FilterState, Product } from "@/types";
import { products, productCategories } from "@/components/constants/product";

import { ProductFilters } from "./ProductFilters";
import { ProductToolbar } from "./ProductToolbar";
import { ProductCategorySwiper } from "./ProductCategorySwiper";
import { Button } from "@/components/ui/button";

export default function ProductListingSection() {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const [filters, setFilters] = useState<FilterState>({
    priceRange: [0, 50000],
    categories: [],
    ratings: [],
    inStockOnly: false,
    organicOnly: false,
  });

  // Initialize with your products data
  useEffect(() => {
    setFilteredProducts(products);
  }, []);

  // Format categories for the filter
  const categories = [
    { id: "all", name: "All Products", count: products.length, icon: "🛒" },
    ...productCategories.map((category) => ({
      id: category.id,
      name: category.label,
      count: products.filter(
        (p) => p.category.name.toLowerCase() === category.id
      ).length,
      icon: category.icon,
    })),
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(price / 100);
  };

  // Apply filters and search
  useEffect(() => {
    let filtered = products.filter((product) => {
      const matchesSearch =
        searchQuery === "" ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === "all" ||
        product.category.name.toLowerCase() === selectedCategory;

      const matchesPrice =
        product.price >= filters.priceRange[0] &&
        product.price <= filters.priceRange[1];

      const matchesRating =
        filters.ratings.length === 0 ||
        filters.ratings.some((rating) => product.rating >= rating);

      const matchesStock = !filters.inStockOnly || product.inStock;
      const matchesOrganic = !filters.organicOnly || product.organic;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesPrice &&
        matchesRating &&
        matchesStock &&
        matchesOrganic
      );
    });

    // Sort products
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "featured":
      default:
        filtered.sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return b.rating - a.rating;
        });
        break;
    }

    setFilteredProducts(filtered);
  }, [searchQuery, selectedCategory, sortBy, filters]);

  const resetFilters = () => {
    setFilters({
      priceRange: [0, 50000],
      categories: [],
      ratings: [],
      inStockOnly: false,
      organicOnly: false,
    });
  };

  const filterSidebar = (
    <ProductFilters
      filters={filters}
      setFilters={setFilters}
      categories={categories}
      formatPrice={formatPrice}
      resetFilters={resetFilters}
    />
  );

  return (
    <section className="py-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            All Products
          </h1>
          <p className="text-gray-600">
            Discover our selection of farm-fresh products
          </p>
        </div>

        {/* Controls Bar */}
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <ProductCategorySwiper
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryClick={setSelectedCategory}
            onAllClick={() => setSelectedCategory("all")}
          />
        </div>

        {/* Toolbar */}
        <ProductToolbar
          isFilterOpen={isFilterOpen}
          setIsFilterOpen={setIsFilterOpen}
          viewMode={viewMode}
          setViewMode={setViewMode}
          sortBy={sortBy}
          setSortBy={setSortBy}
          filteredProductsCount={filteredProducts.length}
          filters={filters}
          setFilters={setFilters}
          categories={categories}
          formatPrice={formatPrice}
          resetFilters={resetFilters}
          filterSidebar={filterSidebar}
        />

        <Separator className="mb-6" />

        {/* Products Grid */}
        <div
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              : "grid grid-cols-1 gap-6"
          }
        >
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No products found
            </h3>
            <p className="text-gray-500 mb-4">
              Try adjusting your search or filter criteria
            </p>
            <Button onClick={resetFilters} variant="outline">
              Reset Filters
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
