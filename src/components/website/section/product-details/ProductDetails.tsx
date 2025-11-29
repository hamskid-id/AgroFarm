"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Heart,
  Share2,
  Star,
  Truck,
  Shield,
  Clock,
  Check,
  ArrowLeft,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ProductImageGallery } from "./ProductImageGallery";
import { ProductInfo } from "./ProductInfo";
import { ProductActions } from "./ProductActions";
import { ProductTabs } from "./ProductTabs";
import { RelatedProducts } from "./RelatedProducts";
import { VendorInfo } from "./VendorInfo";
import { products } from "@/components/constants/product";
import { Product } from "@/types";

export default function ProductDetails() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState("description");

  useEffect(() => {
    if (params.id) {
      const foundProduct = products.find(
        (p) => p.id === parseInt(params.id as string)
      );
      setProduct(foundProduct || null);
    }
  }, [params.id]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
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

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.description,
          url: window.location.href,
        });
      } catch (err) {
        console.log("Error sharing:", err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      // You can add a toast notification here
      alert("Link copied to clipboard!");
    }
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    // Add your favorite logic here
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Products
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Images */}
          <div className="space-y-6">
            <ProductImageGallery
              product={product}
              selectedImage={selectedImage}
              onSelectImage={setSelectedImage}
            />
          </div>

          {/* Right Column - Product Info */}
          <div className="space-y-6">
            <ProductInfo product={product} />

            <Separator />

            <VendorInfo vendor={product.vendor} />

            <Separator />

            <ProductActions
              product={product}
              isFavorite={isFavorite}
              onToggleFavorite={toggleFavorite}
              onShare={handleShare}
            />

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-4">
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Truck className="h-6 w-6 text-green-600" />
                </div>
                <p className="text-xs text-gray-600">Free Delivery</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Shield className="h-6 w-6 text-blue-600" />
                </div>
                <p className="text-xs text-gray-600">Quality Guarantee</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Clock className="h-6 w-6 text-purple-600" />
                </div>
                <p className="text-xs text-gray-600">Fresh Daily</p>
              </div>
            </div>
          </div>
        </div>

        {/* Product Tabs Section */}
        <div className="mt-16">
          <ProductTabs
            product={product}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <RelatedProducts currentProduct={product} />
        </div>
      </div>
    </div>
  );
}
