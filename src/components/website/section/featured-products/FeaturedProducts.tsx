"use client";

import { motion } from "framer-motion";
import { Star, ArrowRight } from "lucide-react";
import ProductCard from "./ProductCard";
import { Product } from "@/types";
import { Button } from "@/components/ui/button";
import { products } from "@/components/constants/product";
import { useRouter } from "next/navigation";

interface FeaturedProductsProps {
  featuredProducts?: Product[];
}

const FeaturedProducts = ({
  featuredProducts = products,
}: FeaturedProductsProps) => {
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
    <section className="py-16 bg-gradient-to-b from-white to-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800 px-4 py-2 rounded-full text-sm font-semibold mb-4 border border-amber-200">
            <Star className="h-4 w-4 fill-current" />
            Fresh From Farms
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-gray-900 mb-4">
            Fresh Agricultural Products
          </h2>
          <p className="sm:text-lg text-[14px] text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover fresh, quality agricultural products directly from verified
            farmers with inspection options. Every product comes with quality
            assurance from our trusted farm partners.
          </p>
        </motion.div>

        {/* Products Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8 mb-12"
        >
          {featuredProducts.slice(0, 8).map((product, index) => (
            <motion.div
              key={product.id}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <ProductCard product={product} />
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
