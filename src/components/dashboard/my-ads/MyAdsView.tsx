"use client";

import React, { useState, useMemo } from "react";
import {
  Search,
  Package,
  Eye,
  Heart,
  MapPin,
  Edit2,
  Trash2,
  MoreVertical,
  CheckCircle,
  Clock,
  MessageSquare,
  TrendingUp,
  DollarSign,
  Tag,
  Filter,
  Plus,
  Star,
  X,
  ChevronDown,
  Image as ImageIcon,
} from "lucide-react";
import { Product, FormFieldType } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import CustomTable, { TableColumn } from "@/components/ui/custom-table";
import { CustomModal } from "@/components/ui/custom-modal";
import CustomDropdown, { DropdownItem } from "@/components/ui/custom-dropdown";
import CustomFormField from "@/components/ui/custom-input-field";
import { Switch } from "@/components/ui/switch";
import Image from "next/image";
import {
  CATEGORIES,
  CONDITIONS,
  products,
} from "@/components/constants/product";
import { SheetWrapper } from "@/components/ui/custom-sheet";
import { CustomTabs } from "@/components/ui/CustomTab";

interface MyAdsViewProps {
  onNavigate: (view: string) => void;
}

// Define table columns
const productTableColumns: TableColumn[] = [
  {
    key: "product",
    label: "Product",
    width: "30%",
  },
  {
    key: "category",
    label: "Category",
    align: "center",
  },
  {
    key: "price",
    label: "Price",
    align: "center",
  },
  {
    key: "status",
    label: "Status",
    align: "center",
  },
  {
    key: "rating",
    label: "Rating",
    align: "center",
  },
  {
    key: "stock",
    label: "Stock",
    align: "center",
  },
  {
    key: "postedDate",
    label: "Posted",
    align: "center",
  },
  {
    key: "actions",
    label: "Actions",
    align: "center",
  },
];

// Helper function to get status badge
const getStatusBadge = (status: string) => {
  switch (status) {
    case "active":
      return (
        <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">
          Active
        </Badge>
      );
    case "inactive":
      return (
        <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-100">
          Inactive
        </Badge>
      );
    case "sold":
      return (
        <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
          Sold
        </Badge>
      );
    default:
      return <Badge variant="outline">Active</Badge>;
  }
};

// Helper function to get product condition
const getConditionBadge = (condition: string) => {
  switch (condition) {
    case "Fresh":
      return (
        <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
          Fresh
        </Badge>
      );
    case "Brand New":
      return (
        <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
          New
        </Badge>
      );
    case "Used":
      return (
        <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-100">
          Used
        </Badge>
      );
    default:
      return <Badge variant="outline">{condition}</Badge>;
  }
};

// Fix: Update DropdownItem type to allow separator without label
type FixedDropdownItem = {
  label?: string; // Make label optional
  onClick?: () => void;
  icon?: React.ReactNode;
  disabled?: boolean;
  separator?: boolean;
  subItems?: FixedDropdownItem[];
};

// Format categories for CustomFormField
const categoryOptions = CATEGORIES.map((cat) => ({
  label: `${cat.icon} ${cat.name}`,
  value: cat.id,
}));

// Format conditions for CustomFormField
const conditionOptions = CONDITIONS.map((condition) => ({
  label: condition.label,
  value: condition.value,
}));

export const MyAdsView = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isViewSheetOpen, setIsViewSheetOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  // Edit form state
  const [editForm, setEditForm] = useState({
    name: "",
    description: "",
    price: "",
    stockCount: "0",
    status: "active",
    featured: false,
    condition: "fresh",
    inStock: true,
    category: "vegetables",
    location: "",
    tags: "",
  });

  const filteredAds = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesFilter =
      filterStatus === "all" ||
      (filterStatus === "active" && product.inStock) ||
      (filterStatus === "inactive" && !product.inStock) ||
      (filterStatus === "featured" && product.featured);
    return matchesSearch && matchesFilter;
  });

  // Generate dropdown items for each product - FIXED TYPE
  const getDropdownItems = (product: Product): FixedDropdownItem[] => [
    {
      label: "View Details",
      icon: <Eye className="h-4 w-4" />,
      onClick: () => handleViewDetails(product),
    },
    {
      label: "Edit",
      icon: <Edit2 className="h-4 w-4" />,
      onClick: () => handleEdit(product),
    },
    { separator: true },
    ...(product.inStock
      ? [
          {
            label: "Mark as Sold Out",
            icon: <CheckCircle className="h-4 w-4" />,
            onClick: () => handleToggleStock(product),
          },
          {
            label: "Deactivate",
            icon: <Clock className="h-4 w-4" />,
            onClick: () => handleToggleStatus(product),
          },
        ]
      : [
          {
            label: "Restock",
            icon: <CheckCircle className="h-4 w-4" />,
            onClick: () => handleToggleStock(product),
          },
        ]),
    { separator: true },
    {
      label: "Delete",
      icon: <Trash2 className="h-4 w-4" />,
      onClick: () => handleDelete(product),
    },
  ];

  // Handle actions
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

  const handleAddNew = () => {
    setIsEditMode(false);
    setSelectedProduct(null);
    setEditForm({
      name: "",
      description: "",
      price: "",
      stockCount: "0",
      status: "active",
      featured: false,
      condition: "fresh",
      inStock: true,
      category: "vegetables",
      location: "",
      tags: "",
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

  // Handle form submissions
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

  // Format table rows
  const rows = useMemo(() => {
    return filteredAds.map((product) => ({
      product: (
        <div className="flex items-center gap-3">
          <div className="relative w-12 h-12 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-lg flex items-center justify-center overflow-hidden">
            {typeof product.image === "string" ? (
              <div className="text-2xl">{product.image}</div>
            ) : (
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
              />
            )}
          </div>
          <div>
            <div className="font-medium text-gray-900 line-clamp-1">
              {product.name}
            </div>
            <div className="text-sm text-gray-500 flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {product.location}
            </div>
          </div>
        </div>
      ),
      category: (
        <Badge variant="outline" className="bg-emerald-50">
          {product.category.name}
        </Badge>
      ),
      price: (
        <div className="font-bold text-emerald-600">
          ₦{product.price.toLocaleString()}
          {product.originalPrice && product.originalPrice > product.price && (
            <div className="text-xs text-gray-400 line-through">
              ₦{product.originalPrice.toLocaleString()}
            </div>
          )}
        </div>
      ),
      status: (
        <div className="flex flex-col items-center gap-1">
          {product.inStock ? (
            <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">
              In Stock
            </Badge>
          ) : (
            <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-100">
              Sold Out
            </Badge>
          )}
          {getConditionBadge(product.condition || "Fresh")}
        </div>
      ),
      rating: (
        <div className="flex items-center justify-center gap-1">
          <Star className="h-4 w-4 text-amber-500 fill-current" />
          <span className="font-medium">{product.rating}</span>
          <span className="text-sm text-gray-500">({product.reviewCount})</span>
        </div>
      ),
      stock: (
        <div className="text-center">
          <div className="font-medium text-gray-900">{product.stockCount}</div>
          <div className="text-xs text-gray-500">in stock</div>
        </div>
      ),
      postedDate: (
        <div className="text-sm text-gray-600">
          {product.postedDate || "Recently"}
        </div>
      ),
      actions: (
        <CustomDropdown
          trigger={
            <button className="p-2 hover:bg-gray-100 rounded-md">
              <MoreVertical size={18} className="text-[#444846]" />
            </button>
          }
          items={getDropdownItems(product) as DropdownItem[]}
        />
      ),
    }));
  }, [filteredAds]);

  // Handle form input changes
  const handleInputChange =
    (field: keyof typeof editForm) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setEditForm({ ...editForm, [field]: e.target.value });
    };

  // CustomTabs options for edit modal - USING CustomFormField
  const editTabsOptions = [
    {
      value: "basic",
      label: "Basic Info",
      content: (
        <div className="space-y-4 pt-4">
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            name="name"
            label="Product Name"
            placeholder="Enter product name"
            value={editForm.name}
            onChange={handleInputChange("name")}
          />

          <div className="grid grid-cols-2 gap-4">
            <CustomFormField
              fieldType={FormFieldType.SELECT}
              name="category"
              label="Category"
              placeholder="Select category"
              options={categoryOptions}
              value={editForm.category}
              onChange={(e) =>
                setEditForm({ ...editForm, category: e.target.value })
              }
            />

            <CustomFormField
              fieldType={FormFieldType.SELECT}
              name="condition"
              label="Condition"
              placeholder="Select condition"
              options={conditionOptions}
              value={editForm.condition}
              onChange={(e) =>
                setEditForm({ ...editForm, condition: e.target.value })
              }
            />
          </div>

          <CustomFormField
            fieldType={FormFieldType.NUMBER}
            name="stockCount"
            label="Stock Count"
            placeholder="Enter stock quantity"
            value={editForm.stockCount}
            onChange={handleInputChange("stockCount")}
            min={0}
          />

          <CustomFormField
            fieldType={FormFieldType.INPUT}
            name="location"
            label="Location"
            placeholder="e.g., Jos, Plateau"
            value={editForm.location}
            onChange={handleInputChange("location")}
          />
        </div>
      ),
    },
    {
      value: "pricing",
      label: "Pricing",
      content: (
        <div className="space-y-4 pt-4">
          <CustomFormField
            fieldType={FormFieldType.NUMBER}
            name="price"
            label="Price (₦)"
            placeholder="Enter price"
            value={editForm.price}
            onChange={handleInputChange("price")}
            min={0}
            step={100}
          />

          <div className="grid grid-cols-2 gap-4">
            <CustomFormField
              fieldType={FormFieldType.SELECT}
              name="status"
              label="Status"
              options={[
                { label: "Active", value: "active" },
                { label: "Inactive", value: "inactive" },
                { label: "Sold Out", value: "sold" },
              ]}
              value={editForm.status}
              onChange={(e) =>
                setEditForm({ ...editForm, status: e.target.value })
              }
            />

            <CustomFormField
              fieldType={FormFieldType.SELECT}
              name="inStock"
              label="Stock Status"
              options={[
                { label: "In Stock", value: "true" },
                { label: "Out of Stock", value: "false" },
              ]}
              value={editForm.inStock.toString()}
              onChange={(e) =>
                setEditForm({ ...editForm, inStock: e.target.value === "true" })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="featured">Featured Product</Label>
            <Switch
              id="featured"
              checked={editForm.featured}
              onCheckedChange={(checked) =>
                setEditForm({ ...editForm, featured: checked })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="organic">Organic Product</Label>
            <Switch
              id="organic"
              checked={selectedProduct?.organic || false}
              onCheckedChange={(checked) => {
                // Update the selected product if needed
              }}
            />
          </div>
        </div>
      ),
    },
    {
      value: "details",
      label: "Details",
      content: (
        <div className="space-y-4 pt-4">
          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            name="description"
            label="Description"
            placeholder="Describe your product..."
            value={editForm.description}
            onChange={handleInputChange("description")}
          />

          <CustomFormField
            fieldType={FormFieldType.INPUT}
            name="tags"
            label="Tags (comma separated)"
            placeholder="e.g., potatoes, starchy, versatile"
            value={editForm.tags}
            onChange={handleInputChange("tags")}
          />

          <div className="space-y-2">
            <Label>Product Images</Label>
            <div className="flex gap-3">
              {selectedProduct?.images?.map((img, idx) => (
                <div
                  key={idx}
                  className="relative w-16 h-16 rounded-lg overflow-hidden"
                >
                  <Image
                    src={img}
                    alt={`Product image ${idx + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
              <button className="w-16 h-16 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center hover:border-emerald-400">
                <Plus className="h-6 w-6 text-gray-400" />
              </button>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6 flex-wrap gap-3">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">My Products</h2>
          <p className="text-gray-600 mt-1">
            Manage your listed products and track performance
          </p>
        </div>

        <div className="flex items-center gap-4 flex-wrap ms-auto">
          <Button
            // onClick={() => onNavigate("post-ad")}
            className="bg-emerald-600 hover:bg-emerald-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Post New Product
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <CustomFormField
                fieldType={FormFieldType.INPUT}
                name="search"
                placeholder="Search your products..."
                icon={<Search className="h-5 w-5 text-gray-400" />}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-3">
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">In Stock</SelectItem>
                  <SelectItem value="inactive">Out of Stock</SelectItem>
                  <SelectItem value="featured">Featured</SelectItem>
                </SelectContent>
              </Select>
              <CustomDropdown
                trigger={
                  <Button variant="outline" className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    More Filters
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                }
                items={
                  [
                    {
                      label: "Organic Products",
                      icon: <Star className="h-4 w-4" />,
                      onClick: () => setFilterStatus("organic"),
                    },
                    {
                      label: "By Category",
                      icon: <Tag className="h-4 w-4" />,
                      subItems: CATEGORIES.map((cat) => ({
                        label: `${cat.icon} ${cat.name}`,
                        onClick: () => {},
                      })),
                    },
                    { separator: true },
                    {
                      label: "Clear Filters",
                      icon: <X className="h-4 w-4" />,
                      onClick: () => {
                        setSearchQuery("");
                        setFilterStatus("all");
                      },
                    },
                  ] as DropdownItem[]
                }
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Products</p>
                <h3 className="text-2xl font-bold text-gray-900">
                  {filteredAds.length}
                </h3>
              </div>
              <Package className="h-8 w-8 text-emerald-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">In Stock</p>
                <h3 className="text-2xl font-bold text-gray-900">
                  {filteredAds.filter((a) => a.inStock).length}
                </h3>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Featured</p>
                <h3 className="text-2xl font-bold text-gray-900">
                  {filteredAds.filter((a) => a.featured).length}
                </h3>
              </div>
              <Star className="h-8 w-8 text-amber-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Value</p>
                <h3 className="text-2xl font-bold text-gray-900">
                  ₦
                  {filteredAds
                    .reduce((sum, ad) => sum + ad.price, 0)
                    .toLocaleString()}
                </h3>
              </div>
              <DollarSign className="h-8 w-8 text-emerald-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Products Table */}
      <div>
        <CustomTable
          columns={productTableColumns}
          rows={rows}
          className="border-0"
          tableHeaderClassName="bg-emerald-50"
        />
      </div>

      {/* View Product Sheet */}
      <SheetWrapper
        open={isViewSheetOpen}
        setOpen={setIsViewSheetOpen}
        title="Product Details"
        description="View detailed information about this product"
        width="w-[400px] sm:w-[500px]"
      >
        {selectedProduct && (
          <div className="space-y-6">
            {/* Product Header */}
            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-lg flex items-center justify-center overflow-hidden">
                {typeof selectedProduct.image === "string" ? (
                  <div className="text-3xl">{selectedProduct.image}</div>
                ) : (
                  <Image
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    fill
                    className="object-cover"
                  />
                )}
              </div>
              <div>
                <h3 className="font-bold text-gray-900">
                  {selectedProduct.name}
                </h3>
                <div className="mt-2 flex gap-2">
                  {selectedProduct.inStock ? (
                    <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">
                      In Stock
                    </Badge>
                  ) : (
                    <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-100">
                      Sold Out
                    </Badge>
                  )}
                  {selectedProduct.featured && (
                    <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100">
                      Featured
                    </Badge>
                  )}
                  {selectedProduct.organic && (
                    <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                      Organic
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm text-gray-600">Price</Label>
                  <p className="font-bold text-emerald-600 text-lg">
                    ₦{selectedProduct.price.toLocaleString()}
                    {selectedProduct.originalPrice &&
                      selectedProduct.originalPrice > selectedProduct.price && (
                        <span className="ml-2 text-sm text-gray-400 line-through">
                          ₦{selectedProduct.originalPrice.toLocaleString()}
                        </span>
                      )}
                  </p>
                </div>
                <div>
                  <Label className="text-sm text-gray-600">Category</Label>
                  <p className="font-medium">{selectedProduct.category.name}</p>
                </div>
                <div>
                  <Label className="text-sm text-gray-600">Condition</Label>
                  <p className="font-medium">
                    {selectedProduct.condition || "Fresh"}
                  </p>
                </div>
                <div>
                  <Label className="text-sm text-gray-600">Stock</Label>
                  <p className="font-medium">
                    {selectedProduct.stockCount} units
                  </p>
                </div>
              </div>

              <div>
                <Label className="text-sm text-gray-600">Location</Label>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <p>{selectedProduct.location}</p>
                </div>
              </div>

              <div>
                <Label className="text-sm text-gray-600">Description</Label>
                <p className="text-gray-700">{selectedProduct.description}</p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1">
                    <Eye className="h-4 w-4 text-gray-500" />
                    <span className="font-bold text-lg">1.2K</span>
                  </div>
                  <p className="text-xs text-gray-500">Views</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1">
                    <Heart className="h-4 w-4 text-red-500" />
                    <span className="font-bold text-lg">89</span>
                  </div>
                  <p className="text-xs text-gray-500">Favorites</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1">
                    <MessageSquare className="h-4 w-4 text-blue-500" />
                    <span className="font-bold text-lg">24</span>
                  </div>
                  <p className="text-xs text-gray-500">Messages</p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-6 border-t">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setIsViewSheetOpen(false)}
              >
                Close
              </Button>
              <Button
                className="flex-1 bg-emerald-600 hover:bg-emerald-700"
                onClick={() => {
                  setIsViewSheetOpen(false);
                  handleEdit(selectedProduct);
                }}
              >
                <Edit2 className="h-4 w-4 mr-2" />
                Edit Product
              </Button>
            </div>
          </div>
        )}
      </SheetWrapper>

      {/* Edit/Add Product Modal */}
      <CustomModal
        open={isEditModalOpen}
        setOpen={setIsEditModalOpen}
        title={isEditMode ? "Edit Product" : "Add New Product"}
        description={
          isEditMode ? "Update product details" : "Create a new product listing"
        }
        width="sm:max-w-[600px]"
      >
        <div className="space-y-6">
          <CustomTabs
            defaultValue="basic"
            options={editTabsOptions}
            className="w-full"
          />

          <div className="flex gap-3 pt-6 border-t">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => setIsEditModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              className="flex-1 bg-emerald-600 hover:bg-emerald-700"
              onClick={handleEditSubmit}
            >
              {isEditMode ? "Save Changes" : "Create Product"}
            </Button>
          </div>
        </div>
      </CustomModal>

      {/* Delete Confirmation Modal */}
      <CustomModal
        open={isDeleteModalOpen}
        setOpen={setIsDeleteModalOpen}
        title="Delete Product"
        description="Are you sure you want to delete this product? This action cannot be undone."
        isAlert={true}
        width="sm:max-w-[400px]"
      >
        <div className="space-y-6">
          {selectedProduct && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <div className="relative w-12 h-12 bg-gradient-to-br from-red-100 to-red-200 rounded-lg flex items-center justify-center overflow-hidden">
                  {typeof selectedProduct.image === "string" ? (
                    <div className="text-2xl">{selectedProduct.image}</div>
                  ) : (
                    <Image
                      src={selectedProduct.image}
                      alt={selectedProduct.name}
                      fill
                      className="object-cover"
                    />
                  )}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">
                    {selectedProduct.name}
                  </h4>
                  <p className="text-sm text-gray-600">
                    ₦{selectedProduct.price.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => setIsDeleteModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              className="flex-1"
              onClick={handleDeleteSubmit}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Product
            </Button>
          </div>
        </div>
      </CustomModal>
    </div>
  );
};
