"use client";

import { motion } from "framer-motion";
import { Star, Users, Package, Shield } from "lucide-react";
import FeatureCard from "./FeatureCard";

interface HeroContentProps {
  onBrowseProducts: () => void;
  onStartSelling: () => void;
}

const HeroContent = ({
  onBrowseProducts,
  onStartSelling,
}: HeroContentProps) => {
  // Properly typed features array with specific color values
  const features = [
    {
      icon: Users,
      value: "10K+",
      label: "Active Users",
      description: "Farmers & buyers",
      color: "blue" as const,
    },
    {
      icon: Package,
      value: "5K+",
      label: "Farm Products",
      description: "Fresh listings",
      color: "emerald" as const,
    },
    {
      icon: Shield,
      value: "100%",
      label: "Quality Assured",
      description: "Verified products",
      color: "amber" as const,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* Badge */}
      <motion.div variants={itemVariants}>
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800 px-4 py-2 rounded-full text-xs font-semibold border border-amber-200">
          <Star className="h-4 w-4 fill-current" />
          #1 Agricultural Marketplace in Nigeria
        </div>
      </motion.div>

      {/* Main Heading */}
      <motion.div variants={itemVariants} className="space-y-4">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
          <span className="bg-gradient-to-r from-emerald-800 via-emerald-600 to-emerald-700 bg-clip-text text-transparent">
            Buy & Sell
          </span>
          <br />
          <span className="bg-gradient-to-r from-amber-600 to-orange-500 bg-clip-text text-transparent">
            Farm Products
          </span>
          <span className="ms-2 text-gray-800">Directly</span>
        </h1>

        <p className="text-[14px] sm:text-xl text-gray-600 leading-relaxed max-w-2xl">
          Nigeria's trusted platform connecting farmers and buyers. List your
          products for free, or browse thousands of fresh agricultural products
          and connect directly with sellers.
        </p>
      </motion.div>

      {/* Features Grid */}
      <motion.div
        variants={itemVariants}
        className="grid sm:grid-cols-3 grid-cols-2 gap-4 pt-6"
      >
        {features.map((feature, index) => (
          <FeatureCard key={feature.label} feature={feature} index={index} />
        ))}
      </motion.div>
    </motion.div>
  );
};

export default HeroContent;
