"use client";

import { motion } from "framer-motion";
import { Star, Users, Package, Shield } from "lucide-react";
import FeatureCard from "./FeatureCard";
import { Button } from "@/components/ui/button";

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
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800 px-4 py-2 rounded-full text-sm font-semibold border border-amber-200">
          <Star className="h-4 w-4 fill-current" />
          #1 Agricultural Marketplace in Nigeria
        </div>
      </motion.div>

      {/* Main Heading */}
      <motion.div variants={itemVariants} className="space-y-4">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
          <span className="bg-gradient-to-r from-emerald-800 via-emerald-600 to-emerald-700 bg-clip-text text-transparent">
            Connect Farmers
          </span>
          <span className=" ms-2 text-gray-800">&</span>
          <br />
          <span className="bg-gradient-to-r from-amber-600 to-orange-500 bg-clip-text text-transparent">
            Buyers Directly
          </span>
        </h1>

        <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-2xl">
          Join thousands of farmers and buyers in the most trusted agricultural
          marketplace. Sell fresh produce directly or discover quality
          agricultural products with inspection guarantees.
        </p>
      </motion.div>

      {/* CTA Buttons */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col sm:flex-row gap-4"
      >
        <Button
          size="lg"
          onClick={onStartSelling}
          className="h-[45px] bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-8 py-4 text-lg rounded-xl hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          Start Selling Today
        </Button>

        <Button
          variant="outline"
          size="lg"
          onClick={onBrowseProducts}
          className="h-[45px] border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 px-8 py-4 text-lg rounded-xl transition-all duration-300 hover:scale-105"
        >
          Browse Products
        </Button>
      </motion.div>

      {/* Features Grid */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-3 gap-4 pt-6"
      >
        {features.map((feature, index) => (
          <FeatureCard key={feature.label} feature={feature} index={index} />
        ))}
      </motion.div>
    </motion.div>
  );
};

export default HeroContent;
