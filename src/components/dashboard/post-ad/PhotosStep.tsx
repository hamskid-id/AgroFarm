import React from "react";
import { Camera, X, ImageIcon, AlertCircle } from "lucide-react";
import { PhotosStepProps } from "@/types/dashboard";
import { PHOTO_TIPS } from "../../constants/form-constants";

const PhotosStep: React.FC<PhotosStepProps> = ({ images, setImages }) => {
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

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-2xl mb-4">
          <ImageIcon className="w-8 h-8 text-blue-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Add Photos</h2>
        <p className="text-gray-600">
          Great photos help sell faster (up to 5 images)
        </p>
      </div>

      {/* Image Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {/* Uploaded Images */}
        {images.map((image, index) => (
          <div key={index} className="relative group animate-scaleIn">
            <div className="aspect-square border-2 border-gray-200 rounded-2xl overflow-hidden bg-gray-50">
              <img
                src={URL.createObjectURL(image)}
                alt={`Preview ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
            <button
              type="button"
              onClick={() => removeImage(index)}
              className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-all hover:scale-110 shadow-lg"
            >
              <X className="w-4 h-4" />
            </button>
            {index === 0 && (
              <div className="absolute bottom-2 left-2 right-2 bg-emerald-600 text-white text-xs font-semibold py-2 px-3 rounded-lg text-center">
                📸 Cover Photo
              </div>
            )}
          </div>
        ))}

        {/* Upload Button */}
        {images.length < 5 && (
          <label className="aspect-square border-3 border-dashed border-gray-300 rounded-2xl hover:border-emerald-400 hover:bg-emerald-50 transition-all cursor-pointer flex flex-col items-center justify-center group">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3 group-hover:bg-emerald-100 transition-colors">
              <Camera className="w-6 h-6 text-gray-400 group-hover:text-emerald-500" />
            </div>
            <span className="text-sm text-gray-600 font-medium">Add Photo</span>
            <span className="text-xs text-gray-400 mt-1">
              {images.length}/5
            </span>
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

      {/* Tips */}
      <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6">
        <div className="flex gap-3">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-white" />
            </div>
          </div>
          <div>
            <h5 className="font-semibold text-gray-900 mb-2">Photo Tips</h5>
            <ul className="space-y-1.5 text-sm text-gray-700">
              {PHOTO_TIPS.map((tip, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-blue-500 mt-0.5">✓</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotosStep;
