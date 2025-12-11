// "use client";

// import { useState, useMemo } from "react";
// import { useRouter } from "next/navigation";
// import { Product } from "@/types";
// import { products } from "@/components/constants/product";
// import { EditFormState } from "@/types/dashboard";
// import {
//   initialEditFormState,
//   productTableColumns,
// } from "@/components/constants/table-config";
// import { getConditionBadge } from "@/lib/badge-utils";
// import PriceCell from "./table-cells/PriceCell";
// import ProductCell from "./table-cells/ProductCell";
// import StatusCell from "./table-cells/StatusCell";
// import RatingCell from "./table-cells/RatingCell";
// import StockCell from "./table-cells/StockCell";
// import PostedDateCell from "./table-cells/PostedDateCell";
// import ActionsCell from "./table-cells/ActionsCell";
// import HeaderSection from "./HeaderSection";
// import FilterSection from "./FilterSection";
// import ProductsTable from "./ProductsTable";
// import CategoryCell from "./table-cells/CategoryCell";

// export const MyAdsView = () => {
//   const router = useRouter();
//   const [searchQuery, setSearchQuery] = useState("");
//   const [filterStatus, setFilterStatus] = useState("all");
//   const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
//   const [isViewSheetOpen, setIsViewSheetOpen] = useState(false);
//   const [isEditMode, setIsEditMode] = useState(false);
//   const [editForm, setEditForm] = useState<EditFormState>(initialEditFormState);

//   const filteredAds = useMemo(() => {
//     return products.filter((product) => {
//       const matchesSearch = product.name
//         .toLowerCase()
//         .includes(searchQuery.toLowerCase());
//       const matchesFilter =
//         filterStatus === "all" ||
//         (filterStatus === "active" && product.inStock) ||
//         (filterStatus === "inactive" && !product.inStock) ||
//         (filterStatus === "featured" && product.featured);
//       return matchesSearch && matchesFilter;
//     });
//   }, [searchQuery, filterStatus]);

//   // Handler functions
//   const handleViewDetails = (product: Product) => {
//     setSelectedProduct(product);
//     setIsViewSheetOpen(true);
//   };

//   const handleEdit = (product: Product) => {
//     setIsEditMode(true);
//     setSelectedProduct(product);
//     setEditForm({
//       name: product.name,
//       description: product.description,
//       price: product.price.toString(),
//       stockCount: product.stockCount.toString(),
//       status: product.inStock ? "active" : "inactive",
//       featured: product.featured,
//       condition: product.condition?.toLowerCase() || "fresh",
//       inStock: product.inStock,
//       category: product.category.id,
//       location: product.location,
//       tags: product.tags?.join(", ") || "",
//     });
//     setIsEditModalOpen(true);
//   };

//   const handleAddNew = () => {
//     setIsEditMode(false);
//     setSelectedProduct(null);
//     setEditForm(initialEditFormState);
//     setIsEditModalOpen(true);
//   };

//   const handleToggleStock = (product: Product) => {
//     const action = product.inStock ? "Mark as sold out" : "Restock";
//     if (confirm(`${action} "${product.name}"?`)) {
//       alert(`Product "${product.name}" ${action.toLowerCase()}d!`);
//     }
//   };

//   const handleToggleStatus = (product: Product) => {
//     const action = product.inStock ? "Deactivate" : "Activate";
//     if (confirm(`${action} "${product.name}"?`)) {
//       alert(`Product "${product.name}" ${action.toLowerCase()}d!`);
//     }
//   };

//   const handleDelete = (product: Product) => {
//     setSelectedProduct(product);
//     setIsDeleteModalOpen(true);
//   };

//   const handleEditSubmit = () => {
//     if (selectedProduct) {
//       alert(`Product "${selectedProduct.name}" updated!`);
//       setIsEditModalOpen(false);
//       setSelectedProduct(null);
//     }
//   };

//   const handleDeleteSubmit = () => {
//     if (selectedProduct) {
//       alert(`Product "${selectedProduct.name}" deleted!`);
//       setIsDeleteModalOpen(false);
//       setSelectedProduct(null);
//     }
//   };

//   const handleFormChange = (field: keyof EditFormState, value: any) => {
//     setEditForm((prev) => ({ ...prev, [field]: value }));
//   };

//   const rows = useMemo(() => {
//     return filteredAds.map((product) => ({
//       product: <ProductCell product={product} />,
//       category: <CategoryCell product={product} />,
//       price: <PriceCell product={product} />,
//       status: (
//         <StatusCell product={product} getConditionBadge={getConditionBadge} />
//       ),
//       rating: <RatingCell product={product} />,
//       stock: <StockCell product={product} />,
//       postedDate: <PostedDateCell product={product} />,
//       actions: (
//         <ActionsCell
//           product={product}
//           onView={handleViewDetails}
//           onEdit={handleEdit}
//           onToggleStock={handleToggleStock}
//           onToggleStatus={handleToggleStatus}
//           onDelete={handleDelete}
//         />
//       ),
//     }));
//   }, [filteredAds]);

//   return (
//     <div>
//       <HeaderSection
//         onAddNew={() => router.push("/dashboard/create-ads")}
//         onAddNewModal={handleAddNew}
//       />

//       <FilterSection
//         searchQuery={searchQuery}
//         setSearchQuery={setSearchQuery}
//         filterStatus={filterStatus}
//         setFilterStatus={setFilterStatus}
//       />

//       <ProductsTable columns={productTableColumns} rows={rows} />

//       {/* <ViewProductSheet
//         isOpen={isViewSheetOpen}
//         setIsOpen={setIsViewSheetOpen}
//         product={selectedProduct}
//         onEdit={handleEdit}
//       />

//       <EditProductModal
//         isOpen={isEditModalOpen}
//         setIsOpen={setIsEditModalOpen}
//         isEditMode={isEditMode}
//         product={selectedProduct}
//         formData={editForm}
//         onFormChange={handleFormChange}
//         onSubmit={handleEditSubmit}
//       />

//       <DeleteProductModal
//         isOpen={isDeleteModalOpen}
//         setIsOpen={setIsDeleteModalOpen}
//         product={selectedProduct}
//         onSubmit={handleDeleteSubmit}
//       /> */}
//     </div>
//   );
// };
