import { FormData } from "@/components/constants/form-constants";
import { CustomImage } from "@/components/ui/custom-image";

interface PreviewSidebarProps {
  formData: FormData;
  thumbnailImage: File | null;
  onCancel: () => void;
  onPost: () => void;
}

const PreviewSidebar = ({
  formData,
  thumbnailImage,
  onCancel,
  onPost,
}: PreviewSidebarProps) => {
  const formatPrice = (price: string) => {
    if (!price) return "25,000";
    return parseInt(price || "0").toLocaleString();
  };

  const getImageUrl = () => {
    if (thumbnailImage) {
      return URL.createObjectURL(thumbnailImage);
    }
    return null;
  };

  return (
    <div className="bg-white rounded-lg p-6 sticky top-6">
      {/* Product Image Preview */}
      <div className="mb-6">
        <div className="w-full aspect-square rounded-lg overflow-hidden mb-4">
          <CustomImage
            src={getImageUrl()}
            alt={formData.productName || "Product Image"}
            style="w-full h-full"
            imgStyle="rounded-lg"
          />
        </div>

        <h3 className="text-lg font-bold text-gray-900 mb-1">
          {formData.productName || "Fresh Farm Tomatoes"}
        </h3>
        <p className="text-sm text-gray-500 mb-3 line-clamp-2">
          {formData.description ||
            "Premium quality tomatoes, freshly harvested from local farms..."}
        </p>

        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl font-bold text-gray-900">
            ₦{formatPrice(formData.price)}
          </span>
          {formData.originalPrice && (
            <span className="text-lg text-gray-400 line-through">
              ₦{formatPrice(formData.originalPrice)}
            </span>
          )}
        </div>

        {/* Quantity & Condition */}
        <div className="mb-4 pb-4 border-b">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Quantity:</span>
            <span className="text-sm text-gray-900 font-semibold">
              {formData.quantity || "10"} {formData.unit}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-700">
              Condition:
            </span>
            <span className="text-sm text-emerald-600 font-semibold capitalize">
              {formData.condition}
            </span>
          </div>
        </div>

        {/* Location & Contact */}
        <div className="mb-4 space-y-2">
          <div className="flex items-start gap-2">
            <span className="text-gray-500">📍</span>
            <span className="text-sm text-gray-700">
              {formData.location || "Lagos, Nigeria"}
            </span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-gray-500">📞</span>
            <span className="text-sm text-gray-700">
              {formData.phoneNumber || "+234 XXX XXX XXXX"}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4 border-t">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={onPost}
            className="flex-1 px-4 py-2 bg-emerald-500 text-white rounded-lg font-medium hover:bg-emerald-600"
          >
            Post Ad
          </button>
        </div>
      </div>
    </div>
  );
};

export default PreviewSidebar;
