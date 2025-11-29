"use client";

import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { FarmerCard } from "./FarmerCard";

import "swiper/css";
import "swiper/css/pagination";
import { farmers } from "@/components/constants/product";

export const FeaturedFarmers = () => {
  return (
    <section className="relative py-16 bg-gradient-to-r from-emerald-800 via-emerald-700 to-emerald-800  overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            Trusted Partners
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Featured Farmers
          </h2>
          <p className="text-lg text-white max-w-2xl mx-auto leading-relaxed">
            Meet our top-rated farmers who consistently deliver fresh, quality
            agricultural products with excellent service.
          </p>
        </motion.div>

        {/* Farmers Swiper */}
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={24}
          slidesPerView={1}
          pagination={{
            clickable: true,
            bulletClass: "swiper-pagination-bullet !bg-gray-300",
            bulletActiveClass:
              "swiper-pagination-bullet-active !bg-emerald-600",
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 24,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 24,
            },
            1280: {
              slidesPerView: 4,
              spaceBetween: 24,
            },
          }}
          className="featured-farmers-swiper pb-12"
        >
          {farmers?.map((farmer) => (
            <SwiperSlide key={farmer.id} className="pb-10">
              <FarmerCard farmer={farmer} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default FeaturedFarmers;
