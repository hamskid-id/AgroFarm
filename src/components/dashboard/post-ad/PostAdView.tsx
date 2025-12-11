"use client";

import { useState } from "react";
import PreviewSidebar from "./PreviewSidebar";
import ProductForm from "./ProductForm";
import { FormData } from "@/components/constants/form-constants";

const PostAdView = () => {
  const [thumbnailImage, setThumbnailImage] = useState<File | null>(null);
  const [formData, setFormData] = useState<FormData>({
    productName: "",
    category: "",
    quantity: "",
    unit: "kg",
    price: "",
    originalPrice: "",
    condition: "fresh",
    location: "",
    phoneNumber: "",
    description: "",
  });

  const handleThumbnailUpload = (file: File) => {
    setThumbnailImage(file);
  };

  const handleFormChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCancel = () => {
    // Implement cancel logic
    console.log("Cancelled");
  };

  const handlePost = () => {
    // Implement post logic
    console.log("Posting ad", { formData, thumbnailImage });
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Side - Preview */}
          <div className="lg:col-span-1">
            <PreviewSidebar
              formData={formData}
              thumbnailImage={thumbnailImage}
              onCancel={handleCancel}
              onPost={handlePost}
            />
          </div>

          {/* Right Side - Form */}
          <div className="lg:col-span-2">
            <ProductForm
              formData={formData}
              onFormChange={handleFormChange}
              onThumbnailUpload={handleThumbnailUpload}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostAdView;
