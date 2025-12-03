'use client'

import React, { useState } from "react";
import {
  Camera,
  MapPin,
  Phone,
  AlertCircle,
  CheckCircle,
  X,
  Upload,
} from "lucide-react";
import { PostAdFormData } from "@/types/dashboard";
import { StepProgress } from "@/components/shared/StepProgress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
import { CATEGORIES, CONDITIONS } from "@/components/constants/product";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface PostAdViewProps {
  onNavigate: (view: string) => void;
}

export const PostAdView = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<PostAdFormData>({
    category: "",
    title: "",
    condition: "fresh",
    price: "",
    originalPrice: "",
    quantity: "",
    unit: "kg",
    description: "",
    location: "",
    phoneNumber: "",
    tags: [],
  });
  const [images, setImages] = useState<File[]>([]);
  const [tagInput, setTagInput] = useState("");

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validImages = files.filter(
      (file) => file.type.startsWith("image/") && file.size <= 5 * 1024 * 1024
    );

    if (validImages.length + images.length > 5) {
      alert("Maximum 5 images allowed");
      return;
    }

    setImages([...images, ...validImages.slice(0, 5 - images.length)]);
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const addTag = () => {
    if (tagInput.trim() && formData.tags.length < 5) {
      setFormData({ ...formData, tags: [...formData.tags, tagInput.trim()] });
      setTagInput("");
    }
  };

  const removeTag = (index: number) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((_, i) => i !== index),
    });
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.category && formData.title && formData.condition;
      case 2:
        return images.length > 0;
      case 3:
        return formData.price && formData.description && formData.quantity;
      case 4:
        return formData.location && formData.phoneNumber;
      default:
        return false;
    }
  };

  const handleSubmit = () => {
    alert("Ad posted successfully!");
    // onNavigate("my-ads");
  };

  // Step 1: Basic Info
  const BasicInfoStep = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Basic Information
        </h2>
        <p className="text-gray-600">
          Let's start with the basics about your product
        </p>
      </div>

      {/* Category Selection */}
      <div>
        <Label className="mb-3">
          Category <span className="text-red-500">*</span>
        </Label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setFormData({ ...formData, category: cat.id })}
              className={`p-4 border-2 rounded-xl transition-all hover:border-emerald-400 ${
                formData.category === cat.id
                  ? "border-emerald-500 bg-emerald-50"
                  : "border-gray-200"
              }`}
            >
              <div className="text-3xl mb-2">{cat.icon}</div>
              <div className="font-medium text-gray-900">{cat.name}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Product Title */}
      <div>
        <Label className="mb-2">
          Product Title <span className="text-red-500">*</span>
        </Label>
        <Input
          type="text"
          placeholder="e.g., Farm Fresh Tomatoes - Premium Quality (10kg)"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
      </div>

      {/* Condition Selection */}
      <div>
        <Label className="mb-3">
          Condition <span className="text-red-500">*</span>
        </Label>
        <div className="grid grid-cols-3 gap-3">
          {CONDITIONS.map((condition) => (
            <button
              key={condition.value}
              type="button"
              onClick={() =>
                setFormData({ ...formData, condition: condition.value })
              }
              className={`p-4 border-2 rounded-lg transition-all text-center ${
                formData.condition === condition.value
                  ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                  : "border-gray-200 text-gray-700 hover:border-gray-300"
              }`}
            >
              <div className="font-medium">{condition.label}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  // Step 2: Photos
  const PhotosStep = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Add Photos</h2>
        <p className="text-gray-600">
          Upload clear photos of your product (Maximum 5)
        </p>
      </div>

      {/* Image Grid */}
      <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
        {/* Uploaded Images */}
        {images.map((image, index) => (
          <div key={index} className="relative group">
            <div className="aspect-square border-2 border-gray-200 rounded-lg overflow-hidden">
              <img
                src={URL.createObjectURL(image)}
                alt={`Preview ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
            <button
              type="button"
              onClick={() => removeImage(index)}
              className="absolute -top-2 -right-2 h-6 w-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
            >
              <X className="h-3 w-3" />
            </button>
            {index === 0 && (
              <div className="absolute bottom-0 left-0 right-0 bg-emerald-600 text-white text-xs py-1 px-2 text-center">
                Cover Photo
              </div>
            )}
          </div>
        ))}

        {/* Upload Button */}
        {images.length < 5 && (
          <Label className="aspect-square border-2 border-dashed border-gray-300 rounded-lg hover:border-emerald-400 hover:bg-emerald-50 transition-colors cursor-pointer flex flex-col items-center justify-center">
            <Camera className="h-8 w-8 text-gray-400 mb-2" />
            <span className="text-sm text-gray-500 font-medium">Add Photo</span>
            <Input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className="hidden"
            />
          </Label>
        )}
      </div>

      {/* Tips */}
      <Alert>
        <AlertCircle className="h-5 w-5" />
        <AlertDescription>
          <h5 className="font-medium mb-2">Photo Tips</h5>
          <ul className="space-y-1">
            <li>• Use natural lighting for best results</li>
            <li>• Show product from different angles</li>
            <li>• Keep background clean and simple</li>
            <li>• First photo will be the cover image</li>
          </ul>
        </AlertDescription>
      </Alert>
    </div>
  );

  // Step 3: Details & Pricing
  const DetailsStep = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Product Details
        </h2>
        <p className="text-gray-600">
          Provide detailed information about your product
        </p>
      </div>

      {/* Quantity & Unit */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label className="mb-2">
            Quantity <span className="text-red-500">*</span>
          </Label>
          <Input
            type="number"
            placeholder="10"
            value={formData.quantity}
            onChange={(e) =>
              setFormData({ ...formData, quantity: e.target.value })
            }
          />
        </div>
        <div>
          <Label className="mb-2">
            Unit <span className="text-red-500">*</span>
          </Label>
          <Select
            value={formData.unit}
            onValueChange={(value) => setFormData({ ...formData, unit: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select unit" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="kg">Kilogram (kg)</SelectItem>
              <SelectItem value="g">Gram (g)</SelectItem>
              <SelectItem value="ton">Ton</SelectItem>
              <SelectItem value="piece">Piece</SelectItem>
              <SelectItem value="bunch">Bunch</SelectItem>
              <SelectItem value="bag">Bag</SelectItem>
              <SelectItem value="crate">Crate</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Price */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label className="mb-2">
            Price (₦) <span className="text-red-500">*</span>
          </Label>
          <Input
            type="number"
            placeholder="25000"
            value={formData.price}
            onChange={(e) =>
              setFormData({ ...formData, price: e.target.value })
            }
          />
        </div>
        <div>
          <Label className="mb-2">Original Price (Optional)</Label>
          <Input
            type="number"
            placeholder="30000"
            value={formData.originalPrice}
            onChange={(e) =>
              setFormData({ ...formData, originalPrice: e.target.value })
            }
          />
          <p className="text-xs text-gray-500 mt-1">Show discount badge</p>
        </div>
      </div>

      {/* Description */}
      <div>
        <Label className="mb-2">
          Description <span className="text-red-500">*</span>
        </Label>
        <Textarea
          placeholder="Describe your product in detail. Include quality, storage conditions, etc."
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          rows={5}
        />
      </div>

      {/* Tags */}
      <div>
        <Label className="mb-2">Tags (Optional)</Label>
        <div className="flex gap-2 mb-3">
          <Input
            type="text"
            placeholder="Add a tag"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyPress={(e) =>
              e.key === "Enter" && (e.preventDefault(), addTag())
            }
            maxLength={20}
          />
          <Button
            type="button"
            onClick={addTag}
            disabled={formData.tags.length >= 5}
            className="bg-emerald-600 hover:bg-emerald-700"
          >
            Add
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {formData.tags.map((tag, index) => (
            <Badge key={index} variant="secondary" className="gap-2">
              #{tag}
              <button
                type="button"
                onClick={() => removeTag(index)}
                className="hover:text-red-600"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
        <p className="text-xs text-gray-500 mt-2">Maximum 5 tags</p>
      </div>
    </div>
  );

  // Step 4: Location & Contact
  const LocationStep = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Location & Contact
        </h2>
        <p className="text-gray-600">Where buyers can find or contact you</p>
      </div>

      {/* Location */}
      <div>
        <Label className="mb-2">
          Location <span className="text-red-500">*</span>
        </Label>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            type="text"
            placeholder="City, State (e.g., Lagos, Ikeja)"
            value={formData.location}
            onChange={(e) =>
              setFormData({ ...formData, location: e.target.value })
            }
            className="pl-10"
          />
        </div>
      </div>

      {/* Phone Number */}
      <div>
        <Label className="mb-2">
          Phone Number <span className="text-red-500">*</span>
        </Label>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            type="tel"
            placeholder="+234 XXX XXX XXXX"
            value={formData.phoneNumber}
            onChange={(e) =>
              setFormData({ ...formData, phoneNumber: e.target.value })
            }
            className="pl-10"
          />
        </div>
      </div>

      {/* Safety Notice */}
      <Alert variant="destructive">
        <AlertCircle className="h-5 w-5" />
        <AlertDescription>
          <h5 className="font-medium mb-2">Safety Tips</h5>
          <ul className="space-y-1">
            <li>• Meet buyers in safe, public places</li>
            <li>• Don't share sensitive personal information</li>
            <li>• Get full payment before delivery</li>
            <li>• Be wary of suspicious requests</li>
          </ul>
        </AlertDescription>
      </Alert>

      {/* Preview Summary */}
      <Card>
        <CardContent className="p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Ad Preview</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Title:</span>
              <span className="font-medium text-gray-900">
                {formData.title || "Not set"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Category:</span>
              <span className="font-medium text-gray-900">
                {CATEGORIES.find((c) => c.id === formData.category)?.name ||
                  "Not set"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Quantity:</span>
              <span className="font-medium text-gray-900">
                {formData.quantity
                  ? `${formData.quantity} ${formData.unit}`
                  : "Not set"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Price:</span>
              <span className="font-medium text-emerald-600">
                ₦
                {formData.price
                  ? parseInt(formData.price).toLocaleString()
                  : "0"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Location:</span>
              <span className="font-medium text-gray-900">
                {formData.location || "Not set"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Photos:</span>
              <span className="font-medium text-gray-900">
                {images.length} uploaded
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const steps = [
    { number: 1, label: "Basic Info" },
    { number: 2, label: "Photos" },
    { number: 3, label: "Details" },
    { number: 4, label: "Location" },
  ];

  return (
    <div className="space-y-6">
      <StepProgress
        steps={steps}
        currentStep={currentStep}
        // onBack={() => onNavigate("overview")}
      />

      {/* Form Content */}
      <Card>
        <CardContent className="p-6">
          {currentStep === 1 && <BasicInfoStep />}
          {currentStep === 2 && <PhotosStep />}
          {currentStep === 3 && <DetailsStep />}
          {currentStep === 4 && <LocationStep />}

          {/* Navigation Buttons */}
          <div className="flex gap-3 pt-6 mt-6 border-t">
            {currentStep > 1 && (
              <Button
                type="button"
                onClick={() => setCurrentStep(currentStep - 1)}
                variant="outline"
              >
                Previous
              </Button>
            )}

            {currentStep < 4 ? (
              <Button
                type="button"
                onClick={() => setCurrentStep(currentStep + 1)}
                disabled={!canProceed()}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700"
              >
                Next Step
              </Button>
            ) : (
              <Button
                type="button"
                onClick={handleSubmit}
                disabled={!canProceed()}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700"
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Post Ad
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
