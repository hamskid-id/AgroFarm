"use client";

import { products } from "@/components/constants/product";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Product } from "@/types";
import { EditFormState } from "@/types/dashboard";
import { initialEditFormState } from "@/components/constants/table-config";
import ProductCard from "./ProductCard";

export const DashboardAds = () => {
  const currentPage = 1;
  let totalPages = 2;
  const relatedProducts = products.slice(0, 3);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isViewSheetOpen, setIsViewSheetOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editForm, setEditForm] = useState<EditFormState>(initialEditFormState);

  // Handler functions
  const handleViewDetails = (product: Product) => {
    setSelectedProduct(product);
    setIsViewSheetOpen(true);
  };

  const handleEdit = (product: Product) => {
    setIsEditMode(true);
    setSelectedProduct(product);
    setEditForm({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      stockCount: product.stockCount.toString(),
      status: product.inStock ? "active" : "inactive",
      featured: product.featured,
      condition: product.condition?.toLowerCase() || "fresh",
      inStock: product.inStock,
      category: product.category.id,
      location: product.location,
      tags: product.tags?.join(", ") || "",
    });
    setIsEditModalOpen(true);
  };

  const handleToggleStock = (product: Product) => {
    const action = product.inStock ? "Mark as sold out" : "Restock";
    if (confirm(`${action} "${product.name}"?`)) {
      alert(`Product "${product.name}" ${action.toLowerCase()}d!`);
    }
  };

  const handleToggleStatus = (product: Product) => {
    const action = product.inStock ? "Deactivate" : "Activate";
    if (confirm(`${action} "${product.name}"?`)) {
      alert(`Product "${product.name}" ${action.toLowerCase()}d!`);
    }
  };

  const handleDelete = (product: Product) => {
    setSelectedProduct(product);
    setIsDeleteModalOpen(true);
  };

  if (relatedProducts.length === 0) return null;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center justify-between">
          Listed Ads
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

      <div className="space-y-4">
        {relatedProducts.map((product) => (
          <div key={product.id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};
