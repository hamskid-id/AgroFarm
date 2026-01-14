"use client";

import { motion } from "framer-motion";
import { Star, ArrowRight, Grid3X3, List } from "lucide-react";
import ProductCard from "../../../shared/ProductCard";
import { Product } from "@/types";
import { Button } from "@/components/ui/button";
import { products } from "@/components/constants/product";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface FeaturedProductsProps {
  featuredProducts?: Product[];
}

const FeaturedProducts = ({
  featuredProducts = products,
}: FeaturedProductsProps) => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const router = useRouter();
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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

  const onViewAllProducts = () => {
    router.push("/products");
  };

  return (
    <section className="py-0 pb-16 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <div className="flex item-center justify-between">
            <h2 className="text-md sm:text-xl  text-start text-gray-900">
              Treding Ads
            </h2>
            <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg p-1">
              <Button
                size="sm"
                variant={viewMode === "grid" ? "default" : "ghost"}
                className={`px-3 ${
                  viewMode === "grid"
                    ? "bg-emerald-600 hover:bg-emerald-700"
                    : "text-gray-600"
                }`}
                onClick={() => setViewMode("grid")}
              >
                <Grid3X3 className="h-4 w-4 mr-2" />
                Grid
              </Button>
              <Button
                size="sm"
                variant={viewMode === "list" ? "default" : "ghost"}
                className={`px-3 ${
                  viewMode === "list"
                    ? "bg-emerald-600 hover:bg-emerald-700"
                    : "text-gray-600"
                }`}
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4 mr-2" />
                List
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Products Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className={cn(
            "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8 mb-12",
            viewMode === "list" &&
              "md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2"
          )}
        >
          {featuredProducts.slice(0, 8).map((product, index) => (
            <motion.div
              key={product.id}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <ProductCard product={product} viewMode={viewMode} />
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Button
            size="lg"
            onClick={onViewAllProducts}
            className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white px-8 py-4 text-sm rounded-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group"
          >
            Explore All Products
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
