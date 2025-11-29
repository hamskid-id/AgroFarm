"use client";

import { CustomTabs } from "@/components/ui/CustomTab";
import { Product } from "@/types";

interface ProductTabsProps {
  product: Product;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const ProductTabs = ({ product, onTabChange }: ProductTabsProps) => {
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
      value: "shipping",
      label: "Shipping Info",
      content: <ShippingTab />,
    },
  ];

  return (
    <div className="border rounded-2xl overflow-hidden bg-white">
      <CustomTabs
        defaultValue="description"
        options={tabOptions}
        onValueChange={onTabChange}
        className="p-6"
        tabsListClassName="bg-gray-50 p-2 rounded-xl"
        triggerClassName="data-[state=active]:bg-white data-[state=active]:text-emerald-600 data-[state=active]:shadow-sm"
        contentClassName="pt-6"
      />
    </div>
  );
};

// Description Tab Component
const DescriptionTab = ({ product }: { product: Product }) => (
  <div className="space-y-6">
    <h3 className="text-xl font-semibold text-gray-900">Product Description</h3>
    <p className="text-gray-700 leading-relaxed text-lg">
      {product.description}
    </p>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
      <div className="space-y-4">
        <h4 className="font-semibold text-gray-900 text-lg">Key Features</h4>
        <ul className="space-y-3 text-gray-700">
          <li className="flex items-start gap-3">
            <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
            <span>Farm fresh and carefully selected from local farms</span>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
            <span>Rich in essential nutrients and natural flavor</span>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
            <span>Perfect for various recipes and cooking methods</span>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
            <span>Quality checked and guaranteed fresh</span>
          </li>
        </ul>
      </div>

      <div className="space-y-4">
        <h4 className="font-semibold text-gray-900 text-lg">Storage Tips</h4>
        <ul className="space-y-3 text-gray-700">
          <li className="flex items-start gap-3">
            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
            <span>Store in a cool, dry place away from direct sunlight</span>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
            <span>Refrigerate after opening to maintain freshness</span>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
            <span>Consume within recommended period for best quality</span>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
            <span>Keep in original packaging or airtight containers</span>
          </li>
        </ul>
      </div>
    </div>

    {/* Nutritional Benefits */}
    <div className="mt-8 p-6 bg-emerald-50 rounded-xl">
      <h4 className="font-semibold text-emerald-900 text-lg mb-4">
        Nutritional Benefits
      </h4>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="text-2xl mb-2">🌿</div>
          <p className="text-sm font-medium text-gray-700">Rich in Vitamins</p>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="text-2xl mb-2">💪</div>
          <p className="text-sm font-medium text-gray-700">High in Fiber</p>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="text-2xl mb-2">🛡️</div>
          <p className="text-sm font-medium text-gray-700">Antioxidants</p>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="text-2xl mb-2">❤️</div>
          <p className="text-sm font-medium text-gray-700">Heart Healthy</p>
        </div>
      </div>
    </div>
  </div>
);

// Specifications Tab Component
const SpecificationsTab = ({ product }: { product: Product }) => (
  <div className="space-y-6">
    <h3 className="text-xl font-semibold text-gray-900">
      Product Specifications
    </h3>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-4">
        <h4 className="font-semibold text-gray-900 text-lg">
          Basic Information
        </h4>
        <div className="space-y-3">
          <div className="flex justify-between py-3 border-b">
            <span className="text-gray-600 font-medium">Product Name</span>
            <span className="font-semibold text-gray-900">{product.name}</span>
          </div>
          <div className="flex justify-between py-3 border-b">
            <span className="text-gray-600 font-medium">Category</span>
            <span className="font-semibold text-gray-900 flex items-center gap-2">
              <span>{product.category.icon}</span>
              {product.category.name}
            </span>
          </div>
          <div className="flex justify-between py-3 border-b">
            <span className="text-gray-600 font-medium">Organic</span>
            <span
              className={`font-semibold ${
                product.organic ? "text-green-600" : "text-gray-600"
              }`}
            >
              {product.organic ? "Yes ✅" : "No"}
            </span>
          </div>
          <div className="flex justify-between py-3 border-b">
            <span className="text-gray-600 font-medium">Stock Status</span>
            <span
              className={`font-semibold ${
                product.inStock ? "text-green-600" : "text-red-600"
              }`}
            >
              {product.inStock
                ? `In Stock (${product.stockCount})`
                : "Out of Stock"}
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="font-semibold text-gray-900 text-lg">
          Quality Information
        </h4>
        <div className="space-y-3">
          <div className="flex justify-between py-3 border-b">
            <span className="text-gray-600 font-medium">Quality Rating</span>
            <span className="font-semibold text-gray-900 flex items-center gap-1">
              {product.rating}/5 ⭐
            </span>
          </div>
          <div className="flex justify-between py-3 border-b">
            <span className="text-gray-600 font-medium">Customer Reviews</span>
            <span className="font-semibold text-gray-900">
              {product.reviewCount}
            </span>
          </div>
          <div className="flex justify-between py-3 border-b">
            <span className="text-gray-600 font-medium">Featured Product</span>
            <span className="font-semibold text-gray-900">
              {product.featured ? "Yes 🌟" : "No"}
            </span>
          </div>
          <div className="flex justify-between py-3 border-b">
            <span className="text-gray-600 font-medium">Product Badge</span>
            <span className="font-semibold text-gray-900">
              {product.badge || "Standard"}
            </span>
          </div>
        </div>
      </div>
    </div>

    {/* Tags */}
    <div className="mt-6">
      <h4 className="font-semibold text-gray-900 text-lg mb-4">Product Tags</h4>
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
  </div>
);
// Shipping Tab Component
const ShippingTab = () => (
  <div className="space-y-6">
    <h3 className="text-xl font-semibold text-gray-900">
      Shipping & Delivery Information
    </h3>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="space-y-6">
        <div>
          <h4 className="font-semibold text-gray-900 text-lg mb-4">
            Delivery Options
          </h4>
          <div className="space-y-4">
            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="font-semibold text-green-900">
                  Standard Delivery
                </span>
              </div>
              <p className="text-green-800 text-sm">
                2-3 business days • FREE on orders over ₦25,000
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="font-semibold text-blue-900">
                  Express Delivery
                </span>
              </div>
              <p className="text-blue-800 text-sm">
                1 business day • ₦2,500 delivery fee
              </p>
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                <span className="font-semibold text-purple-900">
                  Same Day Delivery
                </span>
              </div>
              <p className="text-purple-800 text-sm">
                Order before 12 PM • ₦3,500 delivery fee
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <h4 className="font-semibold text-gray-900 text-lg mb-4">
            Return Policy
          </h4>
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="font-medium text-orange-900">
                    30-Day Freshness Guarantee
                  </p>
                  <p className="text-orange-800 text-sm mt-1">
                    Return if not satisfied with product freshness
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="font-medium text-orange-900">
                    Quality Assurance
                  </p>
                  <p className="text-orange-800 text-sm mt-1">
                    Full refund for quality issues
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="font-medium text-orange-900">Easy Returns</p>
                  <p className="text-orange-800 text-sm mt-1">
                    Simple return process within 7 days
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-gray-900 text-lg mb-4">
            Delivery Areas
          </h4>
          <div className="bg-gray-50 rounded-xl p-4">
            <p className="text-gray-700 text-sm">
              We deliver to all major cities in Nigeria including Lagos, Abuja,
              Port Harcourt, Kano, Ibadan, Benin City, and more. Delivery times
              may vary based on location.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);
