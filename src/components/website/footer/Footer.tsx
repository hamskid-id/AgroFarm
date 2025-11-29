"use client";

import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  Truck,
  Shield,
  Star,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  ArrowRight,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

interface FooterProps {
  categories?: any[];
  handleCategoryClick?: (category: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  categories = [],
  handleCategoryClick = () => {},
}) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl font-bold mb-2">
                Stay Updated with Farm Fresh Deals
              </h3>
              <p className="text-emerald-100">
                Get the latest offers and agricultural insights delivered to
                your inbox
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex gap-3 items-center"
            >
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-emerald-200 focus:outline-none focus:ring-2 focus:ring-white/30"
              />
              <Button className="bg-[#D89C06] h-full text-white hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold transition-all duration-300">
                Subscribe
              </Button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="md:py-16 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
            {/* Brand & Contact */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-xl">AF</span>
                </div>
                <div>
                  <span className="text-2xl font-bold">AgroFarm</span>
                  <div className="text-sm text-gray-400">
                    Connecting Farmers & Buyers
                  </div>
                </div>
              </div>

              <p className="text-gray-300 leading-relaxed max-w-md">
                Nigeria's trusted agricultural marketplace. We connect farmers
                directly with buyers, ensuring fresh, quality produce with
                transparency and fair pricing.
              </p>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors">
                  <Phone className="h-4 w-4 text-emerald-400" />
                  <span>+234 901 234 5678</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors">
                  <Mail className="h-4 w-4 text-emerald-400" />
                  <span>support@agrofarm.ng</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors">
                  <MapPin className="h-4 w-4 text-emerald-400" />
                  <span>Lagos, Nigeria</span>
                </div>
              </div>
            </div>

            {/* For Farmers */}
            <div>
              <h3 className="font-semibold text-lg mb-4 text-white">
                For Farmers
              </h3>
              <ul className="space-y-3 text-gray-300">
                {[
                  "Start Selling",
                  "Farmer Dashboard",
                  "Quality Guidelines",
                  "Success Stories",
                ].map((link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="hover:text-emerald-400 transition-colors hover:translate-x-1 transform duration-300 inline-block"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* For Buyers */}
            <div>
              <h3 className="font-semibold text-lg mb-4 text-white">
                For Buyers
              </h3>
              <ul className="space-y-3 text-gray-300">
                {[
                  "Browse Products",
                  "Quality Assurance",
                  "FAQ",
                  "Contact Support",
                ].map((link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="hover:text-emerald-400 transition-colors hover:translate-x-1 transform duration-300 inline-block"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="font-semibold text-lg mb-4 text-white">Company</h3>
              <ul className="space-y-3 text-gray-300">
                {["About Us", "Our Mission", "Contact Us"].map((link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="hover:text-emerald-400 transition-colors hover:translate-x-1 transform duration-300 inline-block"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <Separator className="bg-gray-700 my-8" />

          {/* Bottom Section - ONLY copyright placement changed */}
          <div className="flex flex-col gap-4 md:flex-row justify-between items-center">
            {/* Social Links - Left side */}
            <div className="flex items-center gap-6">
              <span className="text-gray-400 text-sm">Follow us:</span>
              <div className="flex gap-4">
                {[
                  { icon: Facebook, name: "Facebook" },
                  { icon: Twitter, name: "Twitter" },
                  { icon: Instagram, name: "Instagram" },
                  { icon: Youtube, name: "YouTube" },
                ].map((social) => (
                  <motion.a
                    key={social.name}
                    href="#"
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="w-10 h-10 bg-gray-700 hover:bg-emerald-600 rounded-lg flex items-center justify-center transition-all duration-300"
                  >
                    <social.icon className="h-5 w-5" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Legal Links - Right side */}
            <div className="flex gap-4 text-xs text-gray-500">
              <Link
                href="#"
                className="hover:text-emerald-400 transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                className="hover:text-emerald-400 transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                href="#"
                className="hover:text-emerald-400 transition-colors"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
          {/* Copyright - Centered */}
          <div className="text-center mt-4 md:mt-0">
            <p className="text-gray-400 text-sm">
              &copy; {currentYear} AgroFarm Marketplace. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
