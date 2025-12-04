"use client";

import { Product, Review, ReviewStats } from "@/types";
import { Package, Truck, FileText, Star } from "lucide-react";
import { ReviewsSection } from "./ReviewsSection";
import { CustomTabs } from "@/components/ui/CustomTab";

interface ProductTabsProps {
  product: Product;
  activeTab: string;
  onTabChange: (tab: string) => void;
  reviews: Review[];
  reviewStats: ReviewStats;
}

// Tab content components
const SpecificationsTab = ({ product }: { product: Product }) => (
  <div className="space-y-6">
    <h3 className="text-lg font-semibold text-gray-900">
      Product Specifications
    </h3>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-4">
        <div className="flex justify-between py-2 border-b">
          <span className="text-gray-600">Category</span>
          <span className="font-medium">{product.category.name}</span>
        </div>
        <div className="flex justify-between py-2 border-b">
          <span className="text-gray-600">Condition</span>
          <span className="font-medium">{product.condition}</span>
        </div>
        <div className="flex justify-between py-2 border-b">
          <span className="text-gray-600">Organic</span>
          <span className="font-medium">{product.organic ? "Yes" : "No"}</span>
        </div>
        <div className="flex justify-between py-2 border-b">
          <span className="text-gray-600">Stock</span>
          <span
            className={`font-medium ${
              product.inStock ? "text-emerald-600" : "text-red-600"
            }`}
          >
            {product.inStock
              ? `Available (${product.stockCount})`
              : "Out of Stock"}
          </span>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between py-2 border-b">
          <span className="text-gray-600">Posted Date</span>
          <span className="font-medium">{product.postedDate}</span>
        </div>
        <div className="flex justify-between py-2 border-b">
          <span className="text-gray-600">Location</span>
          <span className="font-medium">{product.location}</span>
        </div>
        <div className="flex justify-between py-2 border-b">
          <span className="text-gray-600">Ad ID</span>
          <span className="font-medium">#{product.id}</span>
        </div>
        <div className="flex justify-between py-2 border-b">
          <span className="text-gray-600">Featured</span>
          <span className="font-medium">{product.featured ? "Yes" : "No"}</span>
        </div>
      </div>
    </div>

    {/* Tags */}
    {product.tags && product.tags.length > 0 && (
      <div className="pt-6">
        <h4 className="font-semibold text-gray-900 text-lg mb-4">
          Product Tags
        </h4>
        <div className="flex flex-wrap gap-2">
          {product.tags.map((tag, index) => (
            <span
              key={index}
              className="bg-gray-100 text-gray-700 px-3 py-2 rounded-full text-sm font-medium"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    )}
  </div>
);

const ShippingTab = () => (
  <div className="space-y-6">
    <h3 className="text-lg font-semibold text-gray-900">Delivery Options</h3>

    <div className="space-y-4">
      <div className="border rounded-lg p-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
          <h4 className="font-semibold text-gray-900">Seller Delivery</h4>
        </div>
        <p className="text-sm text-gray-600">
          Seller offers delivery within the state. Contact seller for delivery
          options and pricing.
        </p>
        <div className="mt-3 text-xs text-gray-500">
          <p>• Delivery fee varies by location</p>
          <p>• Usually delivered within 1-3 business days</p>
          <p>• Contact seller for exact pricing</p>
        </div>
      </div>

      <div className="border rounded-lg p-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          <h4 className="font-semibold text-gray-900">Pickup</h4>
        </div>
        <p className="text-sm text-gray-600">
          You can arrange to pick up the product from the seller's location.
        </p>
        <div className="mt-3 text-xs text-gray-500">
          <p>• Meet at seller's location or agreed public place</p>
          <p>• Inspect product before payment</p>
          <p>• Bring exact cash amount</p>
        </div>
      </div>
    </div>

    <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
      <h4 className="font-semibold text-amber-900 mb-2">
        Safety Tips for Meeting
      </h4>
      <ul className="text-sm text-amber-800 space-y-1">
        <li>• Meet in public, well-lit areas</li>
        <li>• Bring a friend or family member</li>
        <li>• Inspect the product thoroughly before paying</li>
        <li>• Avoid paying in advance</li>
        <li>• Trust your instincts</li>
      </ul>
    </div>
  </div>
);

const DescriptionTab = ({ product }: { product: Product }) => (
  <div className="space-y-6">
    <h3 className="text-lg font-semibold text-gray-900">
      Full Product Description
    </h3>

    <div className="prose max-w-none">
      <p className="text-gray-700 leading-relaxed">{product.description}</p>
    </div>

    <div>
      <h4 className="font-semibold text-gray-900 mb-3">Key Features</h4>
      <ul className="space-y-3">
        <li className="flex items-start gap-3">
          <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
          <span className="text-gray-700">
            Farm fresh quality, harvested at peak ripeness
          </span>
        </li>
        <li className="flex items-start gap-3">
          <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
          <span className="text-gray-700">
            Properly stored and handled to maintain freshness
          </span>
        </li>
        <li className="flex items-start gap-3">
          <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
          <span className="text-gray-700">
            Quality checked before posting to ensure standards
          </span>
        </li>
        <li className="flex items-start gap-3">
          <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
          <span className="text-gray-700">
            Perfect for various recipes and cooking methods
          </span>
        </li>
      </ul>
    </div>

    {/* Storage Tips */}
    <div className="pt-6 border-t">
      <h4 className="font-semibold text-gray-900 mb-3">Storage Tips</h4>
      <ul className="space-y-3 text-gray-700">
        <li className="flex items-start gap-3">
          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
          <span>Store in a cool, dry place away from direct sunlight</span>
        </li>
        <li className="flex items-start gap-3">
          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
          <span>Refrigerate after opening to maintain freshness</span>
        </li>
        <li className="flex items-start gap-3">
          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
          <span>Consume within recommended period for best quality</span>
        </li>
      </ul>
    </div>
  </div>
);

export const ProductTabs = ({
  product,
  activeTab,
  onTabChange,
  reviews,
  reviewStats,
}: ProductTabsProps) => {
  const tabOptions = [
    {
      value: "description",
      label: "Description",
      content: <DescriptionTab product={product} />,
    },
    {
      value: "specifications",
      label: "Specifications",
      content: <SpecificationsTab product={product} />,
    },
    {
      value: "reviews",
      label: "Reviews",
      content: (
        <ReviewsSection
          product={product}
          reviews={reviews}
          reviewStats={reviewStats}
        />
      ),
    },
    {
      value: "shipping",
      label: "Shipping",
      content: <ShippingTab />,
    },
  ];

  return (
    <div className="bg-white rounded-xl border">
      <CustomTabs
        tabsListClassName="p-0"
        triggerClassName="m-2"
        defaultValue={activeTab}
        options={tabOptions}
        onValueChange={onTabChange}
        contentClassName="px-4 pb-4"
      />
    </div>
  );
};
