"use client";

import { cn } from "../../lib/utils";
import Image, { StaticImageData } from "next/image";
import { useState } from "react";

interface ICustomImagePropType {
  src: StaticImageData | string | null | undefined;
  alt?: string;
  fallbackSrc?: StaticImageData | string;
  imgStyle?: string;
  priority?: boolean;
  loading?: "lazy" | "eager";
  clickFunc?: () => void;
  style: string;
}

export const CustomImage: React.FC<ICustomImagePropType> = ({
  src,
  alt = "object not found",
  fallbackSrc,
  imgStyle,
  priority = false,
  loading,
  clickFunc,
  style,
}) => {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  // Handle image error
  const handleError = () => {
    if (!hasError && fallbackSrc && currentSrc !== fallbackSrc) {
      // Try fallback if provided
      setCurrentSrc(fallbackSrc);
      setHasError(true);
    } else {
      // Mark as error if no fallback or fallback also failed
      setCurrentSrc(null);
      setHasError(true);
    }
  };

  // If no source or error, show a simple placeholder
  if (!currentSrc || currentSrc === "" || hasError) {
    return (
      <div
        className={cn(
          "relative bg-gray-100 flex items-center justify-center",
          style,
          clickFunc && "cursor-pointer"
        )}
        onClick={clickFunc}
      >
        <div className="text-gray-400 text-sm text-center p-4">
          {alt || "No Image"}
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn("relative", style, clickFunc && "cursor-pointer")}
      onClick={clickFunc}
    >
      <Image
        src={currentSrc}
        alt={alt}
        className={cn("w-full h-full object-cover", imgStyle)}
        fill={true}
        priority={priority}
        loading={loading}
        onError={handleError}
      />
    </div>
  );
};
