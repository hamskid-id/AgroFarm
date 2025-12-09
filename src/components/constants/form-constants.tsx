import { Step } from "@/types/dashboard";
import { Package, ImageIcon, FileText, MapPinIcon } from "lucide-react";


export const CATEGORIES = [
  { id: "vegetables", name: "Vegetables", icon: "🥬" },
  { id: "fruits", name: "Fruits", icon: "🍎" },
  { id: "grains", name: "Grains", icon: "🌾" },
  { id: "dairy", name: "Dairy", icon: "🥛" },
  { id: "meat", name: "Meat", icon: "🥩" },
  { id: "poultry", name: "Poultry", icon: "🐔" },
] as const;

export const CONDITIONS = [
  { value: "fresh", label: "Fresh" },
  { value: "good", label: "Good" },
  { value: "fair", label: "Fair" },
] as const;

export type FormData = {
  productName: string;
  category: string;
  quantity: string;
  unit: string;
  price: string;
  originalPrice: string;
  condition: string;
  location: string;
  phoneNumber: string;
  description: string;
};