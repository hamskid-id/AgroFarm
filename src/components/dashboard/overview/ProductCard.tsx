"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Heart, ChevronRight, Eye } from "lucide-react";
import { Product } from "@/types";
import { toast } from "sonner";
import { useFavoritesStore } from "@/stores/favorites-store";
import ActionsCell from "../my-ads/table-cells/ActionsCell";
import { EditFormState } from "@/types/dashboard";
import ViewProductSheet from "../my-ads/ViewProductSheet";
import EditProductModal from "../my-ads/EditProductModal";
import DeleteProductModal from "../my-ads/DeleteProductModal";
import { initialEditFormState } from "@/components/constants/table-config";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
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
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();

  // Get store methods
  const { toggleFavorite, isInFavorites } = useFavoritesStore();
  const isFavorite = isInFavorites(product.id);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    toggleFavorite(product);

    // Show toast notification
    if (!isFavorite) {
      toast.success("Added to favorites", {
        description: `${product.name} has been added to your favorites`,
      });
    } else {
      toast.info("Removed from favorites", {
        description: `${product.name} has been removed from your favorites`,
      });
    }
  };

  const handleEditSubmit = () => {
    if (selectedProduct) {
      alert(`Product "${selectedProduct.name}" updated!`);
      setIsEditModalOpen(false);
      setSelectedProduct(null);
    }
  };

  const handleDeleteSubmit = () => {
    if (selectedProduct) {
      alert(`Product "${selectedProduct.name}" deleted!`);
      setIsDeleteModalOpen(false);
      setSelectedProduct(null);
    }
  };

  const handleFormChange = (field: keyof EditFormState, value: any) => {
    setEditForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <>
      <motion.div
        whileHover={{ x: 2 }}
        transition={{ duration: 0.2 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:border-emerald-400 hover:shadow-sm transition-all cursor-pointer group"
      >
        <div className="flex p-3">
          {/* Image Section */}
          <div className="w-32 h-24 flex-shrink-0 relative mr-4 overflow-hidden rounded">
            <motion.div
              animate={{ scale: isHovered ? 1.05 : 1 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full"
            >
              <img
                src={
                  typeof product.image === "string"
                    ? product.image
                    : product.image.src
                }
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />

              {/* Quick View Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                <Eye className="h-5 w-5 text-white" />
              </div>
            </motion.div>

            {/* Favorite Button */}
            <button
              onClick={handleFavorite}
              className="absolute top-1 right-1 bg-white/80 p-1 rounded-full hover:bg-white transition-colors shadow-sm z-10"
            >
              <Heart
                className={`h-3 w-3 ${
                  isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"
                }`}
              />
            </button>

            {/* Price Overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent text-white px-2 py-1">
              <span className="font-bold text-sm">
                {formatPrice(product.price)}
              </span>
            </div>
          </div>

          {/* Content Section */}
          <div className="flex-1 min-w-0">
            {/* Title */}
            <h3 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-1 group-hover:text-emerald-600 transition-colors">
              {product.name}
            </h3>
            {/* Description */}
            <p className="text-gray-600 text-xs mb-2 line-clamp-3">
              {product.description || "Quality agricultural product"}
            </p>
          </div>

          {/* Arrow Indicator */}
          <div className="flex items-center px-2">
            <ActionsCell
              product={product}
              onView={handleViewDetails}
              onEdit={handleEdit}
              onToggleStock={handleToggleStock}
              onToggleStatus={handleToggleStatus}
              onDelete={handleDelete}
              trigger={
                <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-emerald-600 transition-colors" />
              }
            />
          </div>
        </div>
      </motion.div>
      <ViewProductSheet
        isOpen={isViewSheetOpen}
        setIsOpen={setIsViewSheetOpen}
        product={selectedProduct}
        onEdit={handleEdit}
      />

      <EditProductModal
        isOpen={isEditModalOpen}
        setIsOpen={setIsEditModalOpen}
        isEditMode={isEditMode}
        product={selectedProduct}
        formData={editForm}
        onFormChange={handleFormChange}
        onSubmit={handleEditSubmit}
      />

      <DeleteProductModal
        isOpen={isDeleteModalOpen}
        setIsOpen={setIsDeleteModalOpen}
        product={selectedProduct}
        onSubmit={handleDeleteSubmit}
      />
    </>
  );
};

export default ProductCard;
