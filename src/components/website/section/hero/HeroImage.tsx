"use client";

import { CustomImage } from "@/components/ui/custom-image";
import { motion } from "framer-motion";
import { Star, Zap } from "lucide-react";
import HeroPulicImage from '../../../../../public/images/hero-vegetables.jpeg';

interface HeroImageProps {
  featuredProductsCount: number;
}

const HeroImage = ({ featuredProductsCount }: HeroImageProps) => {
  return (
    <motion.div
      initial={{ x: 50, opacity: 0, rotate: 3 }}
      animate={{ x: 0, opacity: 1, rotate: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="relative"
    >
      {/* Main Image Container */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
        className="relative rounded-3xl overflow-hidden shadow-2xl"
      >
        <CustomImage
          src={HeroPulicImage}
          alt="Fresh farm produce connecting farmers and buyers"
          style="aspect-square"
          imgStyle="object-cover"
          priority={true}
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
      </motion.div>

      {/* Rating Badge */}
      <motion.div
        animate={{ y: [-8, 8, -8] }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -top-4 -left-4 bg-white rounded-2xl p-4 shadow-xl border border-gray-100"
      >
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center">
            <Star className="h-6 w-6 text-green-600 fill-current" />
          </div>
          <div>
            <div className="font-bold text-lg text-gray-900">4.9/5</div>
            <div className="text-sm text-gray-500">Trust Score</div>
          </div>
        </div>
      </motion.div>

      {/* Products Badge */}
      <motion.div
        animate={{ y: [-8, 8, -8] }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
        className="absolute -bottom-4 -right-4 bg-white rounded-2xl p-4 shadow-xl border border-gray-100"
      >
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-amber-100 to-orange-100 rounded-full flex items-center justify-center">
            <Zap className="h-6 w-6 text-amber-600" />
          </div>
          <div>
            <div className="font-bold text-lg text-gray-900">
              {featuredProductsCount}+
            </div>
            <div className="text-sm text-gray-500">Live Products</div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default HeroImage;
