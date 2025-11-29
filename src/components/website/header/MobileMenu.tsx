import { MapPin, Search, Truck, Shield, Star, Phone } from "lucide-react";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import Link from "next/link";

const MobileMenu = () => {
  const quickLinks = [
    { name: "Track Order", icon: Truck, href: "/track-order" },
    { name: "Quality Promise", icon: Shield, href: "/quality" },
    { name: "Reviews", icon: Star, href: "/reviews" },
    { name: "Contact", icon: Phone, href: "/contact" },
  ];

  return (
    <div className="flex flex-col gap-6 mt-4">
      {/* Location */}
      <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl">
        <div className="p-2 bg-emerald-100 rounded-lg">
          <MapPin className="h-5 w-5 text-emerald-600" />
        </div>
        <div>
          <span className="text-sm text-gray-500">Deliver to</span>
          <div className="font-semibold text-gray-900">Lagos, Nigeria</div>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search products..."
          className="pl-10 pr-4 py-3 border-2 border-gray-200 focus:border-emerald-500 rounded-xl bg-gray-50"
        />
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-2 gap-3">
        {quickLinks.map((link) => (
          <Button
            key={link.name}
            variant="outline"
            className="justify-start h-auto py-3 px-4 border-gray-200 hover:border-emerald-300 hover:bg-emerald-50"
            asChild
          >
            <Link href={link.href}>
              <link.icon className="h-4 w-4 mr-2 text-emerald-600" />
              <span className="text-sm">{link.name}</span>
            </Link>
          </Button>
        ))}
      </div>

      {/* Vendor Section */}
      <div className="p-4 bg-orange-50 rounded-xl border border-orange-200">
        <h3 className="font-semibold text-orange-800 mb-2">Join as Vendor</h3>
        <p className="text-sm text-orange-600 mb-3">
          Sell your farm products to thousands of customers
        </p>
        <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">
          Start Selling
        </Button>
      </div>
    </div>
  );
};

export default MobileMenu;
