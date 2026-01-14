"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { products } from "@/components/constants/product";
import { Product } from "@/types";
import { formatPrice } from "@/lib/utils";

interface TiltedProductCardProps {
  product: Product;
  index: number;
}

const TiltedProductCard = ({ product, index }: TiltedProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const rotation = index % 2 === 0 ? -3 : 3;
  const hoverRotation = index % 2 === 0 ? -5 : 5;

  const imageUrl =
    typeof product.image === "string" ? product.image : product.image.src;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotate: rotation }}
      animate={{ opacity: 1, y: 0, rotate: rotation }}
      whileHover={{
        rotate: hoverRotation,
        y: -10,
        scale: 1.02,
        transition: { duration: 0.3 },
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative cursor-pointer flex-shrink-0 w-[150px]"
      style={{ transformOrigin: "center center" }}
    >
      <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
        <div className="relative aspect-[3/4] overflow-hidden">
          <motion.img
            src={imageUrl}
            alt={product.name}
            className="w-full h-full object-cover"
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.4 }}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="absolute bottom-4 left-4 z-10"
          >
            <div className="bg-white/95 backdrop-blur-sm px-4 py-2 rounded-lg shadow-xl">
              <div className="text-xs text-gray-600 font-medium">
                Starting at
              </div>
              <div className="text-lg font-bold text-emerald-600">
                {formatPrice(product.price)}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="absolute bottom-4 right-4 left-4 z-10 text-center"
          >
            <div className="bg-black/50 backdrop-blur-md px-4 py-2 rounded-lg">
              <h3 className="text-white font-medium text-sm line-clamp-2">
                {product.name}
              </h3>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            className="absolute inset-0 bg-emerald-600/10 pointer-events-none"
          />
        </div>
      </div>
    </motion.div>
  );
};

const CategoriesSection = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const productsScrollRef = useRef<HTMLDivElement>(null);

  const categories = [
    "All",
    "Vegetables",
    "Fruits",
    "Grains",
    "Dairy",
    "Poultry",
    "Livestock",
    "Seeds",
    "Fertilizers",
  ];

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter(
          (product) => product.category?.name === selectedCategory
        );

  const scrollProducts = (direction: "left" | "right") => {
    if (productsScrollRef.current) {
      const scrollAmount = 340;
      productsScrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="pt-8 pb-0 sm:pb-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-4"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                Recommended for You
              </h2>
              <p className="text-gray-600 text-sm md:text-base">
                Personalized picks based on your interests
              </p>
            </div>
          </div>
        </motion.div>

        <div className="relative group mb-12">
          <button
            onClick={() => scrollProducts("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-xl rounded-full p-3 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-emerald-50 -ml-6"
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-6 w-6 text-emerald-600" />
          </button>

          <div
            ref={productsScrollRef}
            className="flex gap-8 overflow-x-auto scrollbar-hide scroll-smooth py-4 px-2"
          >
            {filteredProducts.map((product, index) => (
              <TiltedProductCard
                key={product.id}
                product={product}
                index={index}
              />
            ))}
          </div>

          <button
            onClick={() => scrollProducts("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-xl rounded-full p-3 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-emerald-50 -mr-6"
            aria-label="Scroll right"
          >
            <ChevronRight className="h-6 w-6 text-emerald-600" />
          </button>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default CategoriesSection;
