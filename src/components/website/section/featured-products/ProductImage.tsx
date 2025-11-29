"use client";

import { motion } from "framer-motion";
import { Product } from "@/types";
import { CustomImage } from "@/components/ui/custom-image";

interface ProductImageProps {
  product: Product;
  isHovered: boolean;
}

const ProductImage = ({ product, isHovered }: ProductImageProps) => {
  return (
    <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
      <motion.div
        animate={{ scale: isHovered ? 1.05 : 1 }}
        transition={{ duration: 0.5 }}
        className="w-full h-full"
      >
        <CustomImage
          src={product.image}
          alt={product.name}
          style="w-full h-full"
          imgStyle="object-cover"
          loading="lazy"
        />
      </motion.div>

      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  );
};

export default ProductImage;
