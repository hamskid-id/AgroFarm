import CustomInputField from "@/components/ui/custom-input-field";
import { FormData } from "@/components/constants/form-constants";
import ThumbnailUpload from "./ThumbnailUpload";
import { FormFieldType } from "@/types";
import { CATEGORIES, UNITS } from "@/components/constants/product";
import ConditionSelector from "./ConditionSelector";

interface ProductFormProps {
  formData: FormData;
  onFormChange: (field: keyof FormData, value: string) => void;
  onThumbnailUpload: (file: File) => void;
}

const ProductForm = ({
  formData,
  onFormChange,
  onThumbnailUpload,
}: ProductFormProps) => {
  const handleInputChange =
    (field: keyof FormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      onFormChange(field, e.target.value);
    };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      <ThumbnailUpload onUpload={onThumbnailUpload} />

      {/* Product Information */}
      <div className="mb-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">
          Product Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <CustomInputField
            fieldType={FormFieldType.INPUT}
            name="productName"
            label="Product Name"
            placeholder="e.g., Fresh Farm Tomatoes"
            value={formData.productName}
            onChange={handleInputChange("productName")}
            className="h-12"
          />

          <CustomInputField
            fieldType={FormFieldType.SELECT}
            name="category"
            label="Product Categories"
            options={CATEGORIES.map((cat) => ({
              label: `${cat.icon} ${cat.name}`,
              value: cat.id,
            }))}
            value={formData.category}
            onChange={handleInputChange("category")}
            className="h-12"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <CustomInputField
            fieldType={FormFieldType.NUMBER}
            name="quantity"
            label="Quantity"
            placeholder="10"
            value={formData.quantity}
            onChange={handleInputChange("quantity")}
            min={1}
            className="h-12"
          />

          <CustomInputField
            fieldType={FormFieldType.SELECT}
            name="unit"
            label="Unit"
            options={UNITS}
            value={formData.unit}
            onChange={handleInputChange("unit")}
            className="h-12"
          />

          <CustomInputField
            fieldType={FormFieldType.NUMBER}
            name="price"
            label="Price (₦)"
            placeholder="25,000"
            value={formData.price}
            onChange={handleInputChange("price")}
            min={0}
            className="h-12"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <CustomInputField
            fieldType={FormFieldType.NUMBER}
            name="originalPrice"
            label={
              <>
                Original Price
                <span className="text-xs font-normal text-gray-500 ml-2">
                  (Optional)
                </span>
              </>
            }
            placeholder="30,000"
            value={formData.originalPrice}
            onChange={handleInputChange("originalPrice")}
            min={0}
            className="h-12"
          />

          <CustomInputField
            fieldType={FormFieldType.INPUT}
            name="location"
            label="Location"
            placeholder="City, State (e.g., Lagos, Ikeja)"
            value={formData.location}
            onChange={handleInputChange("location")}
            className="h-12"
          />
        </div>

        <div className="mb-4">
          <CustomInputField
            fieldType={FormFieldType.PHONE_INPUT}
            name="phoneNumber"
            label="Phone Number"
            placeholder="+234 XXX XXX XXXX"
            value={formData.phoneNumber}
            onChange={handleInputChange("phoneNumber")}
            className="h-12"
          />
        </div>

        <ConditionSelector
          selectedCondition={formData.condition}
          onSelect={(condition) => onFormChange("condition", condition)}
        />

        <div>
          <CustomInputField
            fieldType={FormFieldType.TEXTAREA}
            name="description"
            label="Description"
            placeholder="Short description about the product"
            value={formData.description}
            onChange={handleInputChange("description")}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductForm;
