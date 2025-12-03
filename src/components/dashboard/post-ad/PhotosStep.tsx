"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Camera, X, AlertCircle } from "lucide-react";

interface PhotosStepProps {
  images: File[];
  setImages: (images: File[]) => void;
}

export default function PhotosStep({ images, setImages }: PhotosStepProps) {
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validImages = files.filter(
      (file) => file.type.startsWith("image/") && file.size <= 5 * 1024 * 1024 // 5MB
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

  return (
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
            <Card className="overflow-hidden aspect-square">
              <CardContent className="p-0">
                <img
                  src={URL.createObjectURL(image)}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </CardContent>
            </Card>
            <Button
              type="button"
              size="icon"
              variant="destructive"
              className="absolute -top-2 -right-2 h-6 w-6"
              onClick={() => removeImage(index)}
            >
              <X className="h-3 w-3" />
            </Button>
            {index === 0 && (
              <div className="absolute bottom-0 left-0 right-0 bg-emerald-600 text-white text-xs py-1 px-2 text-center">
                Cover Photo
              </div>
            )}
          </div>
        ))}

        {/* Upload Button */}
        {images.length < 5 && (
          <Card className="aspect-square border-2 border-dashed border-gray-300 hover:border-emerald-400 hover:bg-emerald-50 transition-colors">
            <CardContent className="h-full flex flex-col items-center justify-center p-0">
              <label className="cursor-pointer w-full h-full flex flex-col items-center justify-center">
                <Camera className="h-8 w-8 text-gray-400 mb-2" />
                <span className="text-sm text-gray-500 font-medium">
                  Add Photo
                </span>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Tips */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <h5 className="font-medium text-blue-900 mb-2">Photo Tips</h5>
              <ul className="text-blue-800 space-y-1">
                <li>• Use natural lighting for best results</li>
                <li>• Show product from different angles</li>
                <li>• Keep background clean and simple</li>
                <li>• First photo will be the cover image</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
