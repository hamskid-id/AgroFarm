import React from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { CustomModal } from "@/components/ui/custom-modal";
import { CustomTabs } from "@/components/ui/CustomTab";
import CustomFormField from "@/components/ui/custom-input-field";
import { FormFieldType } from "@/types";
import { Product } from "@/types";
import { Plus, Image as ImageIcon } from "lucide-react";
import Image from "next/image";
import { EditFormState } from "@/types/dashboard";
import { categoryOptions, conditionOptions } from "@/lib/form-options";

interface EditProductModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  isEditMode: boolean;
  product: Product | null;
  formData: EditFormState;
  onFormChange: (field: keyof EditFormState, value: any) => void;
  onSubmit: () => void;
}

const EditProductModal: React.FC<EditProductModalProps> = ({
  isOpen,
  setIsOpen,
  isEditMode,
  product,
  formData,
  onFormChange,
  onSubmit,
}) => {
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
            value={formData.name}
            onChange={(e) => onFormChange("name", e.target.value)}
          />

          <div className="grid grid-cols-2 gap-4">
            <CustomFormField
              fieldType={FormFieldType.SELECT}
              name="category"
              label="Category"
              placeholder="Select category"
              options={categoryOptions}
              value={formData.category}
              onChange={(e) => onFormChange("category", e.target.value)}
            />

            <CustomFormField
              fieldType={FormFieldType.SELECT}
              name="condition"
              label="Condition"
              placeholder="Select condition"
              options={conditionOptions}
              value={formData.condition}
              onChange={(e) => onFormChange("condition", e.target.value)}
            />
          </div>

          <CustomFormField
            fieldType={FormFieldType.NUMBER}
            name="stockCount"
            label="Stock Count"
            placeholder="Enter stock quantity"
            value={formData.stockCount}
            onChange={(e) => onFormChange("stockCount", e.target.value)}
            min={0}
          />

          <CustomFormField
            fieldType={FormFieldType.INPUT}
            name="location"
            label="Location"
            placeholder="e.g., Jos, Plateau"
            value={formData.location}
            onChange={(e) => onFormChange("location", e.target.value)}
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
            value={formData.price}
            onChange={(e) => onFormChange("price", e.target.value)}
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
              value={formData.status}
              onChange={(e) => onFormChange("status", e.target.value)}
            />

            <CustomFormField
              fieldType={FormFieldType.SELECT}
              name="inStock"
              label="Stock Status"
              options={[
                { label: "In Stock", value: "true" },
                { label: "Out of Stock", value: "false" },
              ]}
              value={formData.inStock.toString()}
              onChange={(e) =>
                onFormChange("inStock", e.target.value === "true")
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="featured">Featured Product</Label>
            <Switch
              id="featured"
              checked={formData.featured}
              onCheckedChange={(checked) => onFormChange("featured", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="organic">Organic Product</Label>
            <Switch
              id="organic"
              checked={product?.organic || false}
              onCheckedChange={(checked) => {
                // Update logic here
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
            value={formData.description}
            onChange={(e) => onFormChange("description", e.target.value)}
          />

          <CustomFormField
            fieldType={FormFieldType.INPUT}
            name="tags"
            label="Tags (comma separated)"
            placeholder="e.g., potatoes, starchy, versatile"
            value={formData.tags}
            onChange={(e) => onFormChange("tags", e.target.value)}
          />

          <div className="space-y-2">
            <Label>Product Images</Label>
            <div className="flex gap-3">
              {product?.images?.map((img, idx) => (
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
    <CustomModal
      open={isOpen}
      setOpen={setIsOpen}
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
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </Button>
          <Button
            className="flex-1 bg-emerald-600 hover:bg-emerald-700"
            onClick={onSubmit}
          >
            {isEditMode ? "Save Changes" : "Create Product"}
          </Button>
        </div>
      </div>
    </CustomModal>
  );
};

export default EditProductModal;
