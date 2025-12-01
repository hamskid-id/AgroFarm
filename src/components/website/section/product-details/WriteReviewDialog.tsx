"use client";

import { useState } from "react";
import { Star, X, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Product } from "@/types";
import { toast } from "sonner";
import { CustomModal } from "@/components/ui/custom-modal";

interface WriteReviewDialogProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
}

export const WriteReviewDialog = ({
  isOpen,
  onClose,
  product,
}: WriteReviewDialogProps) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [images, setImages] = useState<File[]>([]);

  const handleSubmit = async () => {
    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }

    if (!comment.trim()) {
      toast.error("Please write a review");
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Review submitted!", {
        description: "Thank you for your feedback",
      });
      onClose();
      resetForm();
    }, 1500);
  };

  const resetForm = () => {
    setRating(0);
    setHoverRating(0);
    setTitle("");
    setComment("");
    setImages([]);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validImages = files.filter(
      (file) => file.type.startsWith("image/") && file.size <= 5 * 1024 * 1024
    );

    if (validImages.length + images.length > 5) {
      toast.error("Maximum 5 images allowed");
      return;
    }

    setImages([...images, ...validImages.slice(0, 5 - images.length)]);
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <CustomModal
      open={isOpen}
      setOpen={onClose}
      title="Write a Review"
      description={`Share your experience with ${product.name}`}
      width="max-w-[600px]"
      bg="bg-white"
    >
      <div className="space-y-6">
        {/* Product Info */}
        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
          <div className="w-16 h-16 bg-white border rounded-lg overflow-hidden">
            <img
              src={
                typeof product.image === "string"
                  ? product.image
                  : product.image.src
              }
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h4 className="font-semibold text-gray-900">{product.name}</h4>
            <p className="text-sm text-gray-600">
              Vendor: {product.vendor.name}
            </p>
          </div>
        </div>

        {/* Rating */}
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-3">
            Overall Rating *
          </label>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                className="p-1"
              >
                <Star
                  className={`h-10 w-10 transition-colors ${
                    star <= (hoverRating || rating)
                      ? "text-amber-400 fill-current"
                      : "text-gray-300"
                  }`}
                />
              </button>
            ))}
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>Poor</span>
            <span>Excellent</span>
          </div>
        </div>

        {/* Review Title */}
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Review Title
          </label>
          <Input
            placeholder="Summarize your experience (optional)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Review Comment */}
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Your Review *
          </label>
          <Textarea
            placeholder="Share details of your own experience with this product..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={4}
            className="resize-none"
          />
          <p className="text-xs text-gray-500 mt-1">Minimum 20 characters</p>
        </div>

        {/* Photo Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Add Photos (Optional)
          </label>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 mb-3">
            {images.map((image, index) => (
              <div key={index} className="relative group">
                <div className="aspect-square rounded-lg overflow-hidden border">
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}

            {images.length < 5 && (
              <label className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-emerald-400 hover:bg-emerald-50 transition-colors">
                <Camera className="h-6 w-6 text-gray-400 mb-2" />
                <span className="text-xs text-gray-500">Add Photo</span>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            )}
          </div>
          <p className="text-xs text-gray-500">
            You can upload up to 5 photos. Max 5MB each.
          </p>
        </div>

        {/* Guidelines */}
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <h5 className="font-medium text-amber-900 mb-2 text-sm">
            Review Guidelines
          </h5>
          <ul className="text-xs text-amber-800 space-y-1">
            <li>• Focus on the product and your own experience</li>
            <li>• Be respectful and honest</li>
            <li>• Avoid personal information</li>
            <li>• No promotional content</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-2">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1"
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            className="flex-1 bg-emerald-600 hover:bg-emerald-700"
            disabled={
              isSubmitting || rating === 0 || comment.trim().length < 20
            }
          >
            {isSubmitting ? "Submitting..." : "Submit Review"}
          </Button>
        </div>
      </div>
    </CustomModal>
  );
};
