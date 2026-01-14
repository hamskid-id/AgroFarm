"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle,
  XCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

// Simple Product Type
interface SimpleProduct {
  id: string;
  image: string;
  name: string;
  available: boolean;
  price: number;
//   category: string;
}

// Tilted Product Card Component
const TiltedProductCard = ({
  product,
  index,
}: {
  product: SimpleProduct;
  index: number;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Alternate rotation: even = left, odd = right
  const rotation = index % 2 === 0 ? -3 : 3;
  const hoverRotation = index % 2 === 0 ? -5 : 5;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(price);
  };

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
      className="relative cursor-pointer"
      style={{
        transformOrigin: "center center",
      }}
    >
      {/* Card Container */}
      <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 border-4 border-white">
        {/* Image Container */}
        <div className="relative aspect-[3/4] overflow-hidden">
          <motion.img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
            animate={{
              scale: isHovered ? 1.1 : 1,
            }}
            transition={{ duration: 0.4 }}
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Availability Badge - Top Right */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="absolute top-4 right-4 z-10"
          >
            <div
              className={`
              flex items-center gap-1.5 px-3 py-1.5 rounded-full font-bold text-xs shadow-lg backdrop-blur-sm
              ${
                product.available
                  ? "bg-emerald-500/90 text-white"
                  : "bg-red-500/90 text-white"
              }
            `}
            >
              {product.available ? (
                <>
                  <CheckCircle className="h-3.5 w-3.5" />
                  <span>Available</span>
                </>
              ) : (
                <>
                  <XCircle className="h-3.5 w-3.5" />
                  <span>Sold Out</span>
                </>
              )}
            </div>
          </motion.div>

          {/* Price Tag - Bottom Left */}
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

          {/* Product Name - Bottom Center */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="absolute bottom-4 right-4 left-4 z-10 text-center"
          >
            <div className="bg-black/50 backdrop-blur-md px-4 py-2 rounded-lg">
              <h3 className="text-white font-bold text-sm line-clamp-2">
                {product.name}
              </h3>
            </div>
          </motion.div>

          {/* Hover Overlay Effect */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            className="absolute inset-0 bg-emerald-600/10 pointer-events-none"
          />
        </div>
      </div>

      {/* Decorative Corner - Alternating */}
      <div
        className={`
        absolute w-8 h-8 bg-emerald-400 rounded-full -z-10 blur-xl
        ${index % 2 === 0 ? "-top-2 -left-2" : "-top-2 -right-2"}
      `}
      />
    </motion.div>
  );
};

// Main Tilted Products Section
const TiltedProductsSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Sample products data
  const sampleProducts: SimpleProduct[] = [
    {
      id: "1",
      image:
        "https://images.unsplash.com/photo-1560493676-04071c5f467b?w=500&q=80",
      name: "Fresh Organic Tomatoes",
      available: true,
      price: 2500,
    },
    {
      id: "2",
      image:
        "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?w=500&q=80",
      name: "Premium Rice Bags",
      available: false,
      price: 15000,
    },
    {
      id: "3",
      image:
        "https://images.unsplash.com/photo-1589927986089-35812378d4f6?w=500&q=80",
      name: "Sweet Yellow Corn",
      available: true,
      price: 1800,
    },
    {
      id: "4",
      image:
        "https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?w=500&q=80",
      name: "Fresh Carrots Bundle",
      available: true,
      price: 2200,
    },
    {
      id: "5",
      image:
        "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=500&q=80",
      name: "Green Bell Peppers",
      available: true,
      price: 3000,
    },
    {
      id: "6",
      image:
        "https://images.unsplash.com/photo-1561136594-7f68413baa99?w=500&q=80",
      name: "Fresh Strawberries",
      available: false,
      price: 4500,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-amber-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-block mb-4"
          >
            <span className="bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-bold">
              ✨ Handpicked Selection
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Trending This Week
          </h2>

          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover our most popular agricultural products, carefully selected
            for quality and freshness
          </p>
        </motion.div>

        {/* Products Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 mb-12"
        >
          {sampleProducts.map((product, index) => (
            <TiltedProductCard
              key={product.id}
              product={product}
              index={index}
            />
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center"
        >
          <button className="group inline-flex items-center gap-3 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            Explore All Products
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-emerald-200 rounded-full blur-3xl opacity-20 -z-10" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-amber-200 rounded-full blur-3xl opacity-20 -z-10" />
      </div>
    </div>
  );
};

export default TiltedProductsSection;
