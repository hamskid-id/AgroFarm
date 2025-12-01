"use client";

import { useState } from "react";
import { Product } from "@/types";
import { Package, Truck, FileText } from "lucide-react";

interface ProductTabsProps {
  product: Product;
}

export const ProductTabs = ({ product }: ProductTabsProps) => {
  const [activeTab, setActiveTab] = useState("specifications");

  const tabs = [
    {
      id: "specifications",
      label: "Specifications",
      icon: <Package className="h-4 w-4" />,
    },
    { id: "shipping", label: "Shipping", icon: <Truck className="h-4 w-4" /> },
    {
      id: "description",
      label: "Full Details",
      icon: <FileText className="h-4 w-4" />,
    },
  ];

  return (
    <div className="border-b">
      {/* Tab Headers */}
      <div className="flex border-b">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center gap-2 py-4 text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? "text-emerald-600 border-b-2 border-emerald-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {activeTab === "specifications" && (
          <SpecificationsTab product={product} />
        )}
        {activeTab === "shipping" && <ShippingTab />}
        {activeTab === "description" && <DescriptionTab product={product} />}
      </div>
    </div>
  );
};

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
      </div>

      <div className="border rounded-lg p-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          <h4 className="font-semibold text-gray-900">Pickup</h4>
        </div>
        <p className="text-sm text-gray-600">
          You can arrange to pick up the product from the seller's location.
        </p>
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
      <ul className="space-y-2">
        <li className="flex items-start gap-3">
          <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2"></div>
          <span className="text-gray-700">Farm fresh quality</span>
        </li>
        <li className="flex items-start gap-3">
          <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2"></div>
          <span className="text-gray-700">Properly stored and handled</span>
        </li>
        <li className="flex items-start gap-3">
          <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2"></div>
          <span className="text-gray-700">Quality checked before posting</span>
        </li>
      </ul>
    </div>
  </div>
);
