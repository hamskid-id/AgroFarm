"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Heart,
  Share2,
  Phone,
  MessageCircle,
  ShieldCheck,
  Clock,
  MapPin,
  ChevronLeft,
  Eye,
  Flag,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ProductImageGallery } from "./ProductImageGallery";
import { ProductInfo } from "./ProductInfo";
import { RelatedProducts } from "./RelatedProducts";
import { VendorInfo } from "./VendorInfo";
import { ProductTabs } from "./ProductTabs";
import { ReportDialog } from "./ReportDialog";
import { PhoneNumberModal } from "./PhoneNumberModal";
import { products } from "@/components/constants/product";
import { Product } from "@/types";

export default function ProductDetails() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [isPhoneModalOpen, setIsPhoneModalOpen] = useState(false);
  const [showPhone, setShowPhone] = useState(false);

  useEffect(() => {
    if (params.id) {
      const foundProduct = products.find(
        (p) => p.id === parseInt(params.id as string)
      );
      setProduct(foundProduct || null);
    }
  }, [params.id]);

  const handleShowPhone = () => {
    setShowPhone(true);
    setIsPhoneModalOpen(true);
  };

  const handleSendMessage = () => {
    // Navigate to chat with seller
    console.log("Navigate to chat with seller:", product?.vendor.id);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product?.name || "Agricultural Product",
          text: `Check out this ${product?.name} on AgroFarm`,
          url: window.location.href,
        });
      } catch (err) {
        console.log("Error sharing:", err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    // Add API call to save favorite
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Product Not Found
          </h2>
          <p className="text-gray-600 mb-4">
            The product you're looking for doesn't exist.
          </p>
          <Button onClick={() => router.push("/products")}>
            Browse Products
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <div className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-gray-700 hover:text-gray-900"
            >
              <ChevronLeft className="h-5 w-5" />
              <span className="font-medium">Back</span>
            </button>

            <div className="flex items-center gap-2">
              <Button
                size="icon"
                variant="ghost"
                className="h-9 w-9 text-gray-600"
                onClick={() => setIsReportOpen(true)}
              >
                <Flag className="h-4 w-4" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="h-9 w-9 text-gray-600"
                onClick={handleShare}
              >
                <Share2 className="h-4 w-4" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className={`h-9 w-9 ${
                  isFavorite ? "text-red-500" : "text-gray-600"
                }`}
                onClick={toggleFavorite}
              >
                <Heart
                  className={`h-4 w-4 ${isFavorite ? "fill-current" : ""}`}
                />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Product Images */}
            <div className=" rounded-xl">
              <ProductImageGallery
                product={product}
                selectedImage={selectedImage}
                onSelectImage={setSelectedImage}
              />
            </div>

            {/* Product Info & Actions */}
            <div className="bg-white rounded-xl p-6  border">
              <ProductInfo product={product} />

              <Separator className="my-6" />

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                {!showPhone ? (
                  <Button
                    size="lg"
                    className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white"
                    onClick={handleShowPhone}
                  >
                    <Phone className="h-5 w-5 mr-2" />
                    Show Phone Number
                  </Button>
                ) : (
                  <div className="flex-1 text-center p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                    <div className="text-2xl font-bold text-emerald-700">
                      {product.vendor.phone || "0803 XXX XXXX"}
                    </div>
                    <p className="text-sm text-emerald-600 mt-1">Tap to call</p>
                  </div>
                )}

                <Button
                  size="lg"
                  variant="outline"
                  className="flex-1 border-emerald-600 text-emerald-600 hover:bg-emerald-50"
                  onClick={handleSendMessage}
                >
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Send Message
                </Button>
              </div>

              {/* Safety Tips */}
              <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium text-amber-900 mb-1">
                      Safety Tips
                    </p>
                    <ul className="text-amber-800 space-y-1">
                      <li>• Meet in public places</li>
                      <li>• Inspect the product before paying</li>
                      <li>• Never pay with gift cards</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Tabs */}
            <div className="bg-white rounded-xl  border overflow-hidden">
              <ProductTabs product={product} />
            </div>

            {/* Viewed Counter */}
            <div className="flex items-center justify-between text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Eye className="h-4 w-4" />
                <span>{Math.floor(Math.random() * 500) + 100} views</span>
              </div>
              <span>Ad ID: {product.id}</span>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <VendorInfo vendor={product.vendor} />
            <RelatedProducts currentProduct={product} />
          </div>
        </div>
      </div>

      {/* Fixed Bottom Action Bar - Mobile */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t p-4 shadow-lg">
        <div className="flex gap-3">
          <Button
            size="lg"
            className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white"
            onClick={handleShowPhone}
          >
            <Phone className="h-5 w-5 mr-2" />
            {showPhone ? "Call Now" : "Show Phone"}
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="flex-1 border-emerald-600 text-emerald-600"
            onClick={handleSendMessage}
          >
            <MessageCircle className="h-5 w-5 mr-2" />
            Chat
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className={`h-12 w-12 ${
              isFavorite ? "text-red-500" : "text-gray-600"
            }`}
            onClick={toggleFavorite}
          >
            <Heart className={`h-5 w-5 ${isFavorite ? "fill-current" : ""}`} />
          </Button>
        </div>
      </div>

      {/* Modals */}
      <ReportDialog
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        productId={product.id}
        productName={product.name}
      />

      <PhoneNumberModal
        isOpen={isPhoneModalOpen}
        onClose={() => setIsPhoneModalOpen(false)}
        phoneNumber={product.vendor.phone || "0803 123 4567"}
        vendorName={product.vendor.name}
      />
    </div>
  );
}
