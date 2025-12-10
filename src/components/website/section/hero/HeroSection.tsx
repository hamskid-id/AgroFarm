"use client";

import { motion } from "framer-motion";
import HeroContent from "./HeroContent";
import HeroImage from "./HeroImage";
import { products } from "@/components/constants/product";

const HeroSection = () => {
  const onBrowseProducts = () => {
    // Implement navigation to browse products page
    console.log("Navigating to browse products...");
  };

  const onStartSelling = () => {
    // Implement navigation to start selling page
    console.log("Navigating to start selling...");
  };
  return (
    <section className="relative bg-white py-14  overflow-hidden">
     
   
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center"
        >
          {/* Content Section */}
          <div className="lg:col-span-7">
            <HeroContent
              onBrowseProducts={onBrowseProducts}
              onStartSelling={onStartSelling}
            />
          </div>

          {/* Image Section */}
          <div className="lg:col-span-5">
            <HeroImage featuredProductsCount={products?.length} />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
