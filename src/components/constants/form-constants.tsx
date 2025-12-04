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

export const UNITS = [
  { value: "kg", label: "Kilogram (kg)" },
  { value: "g", label: "Gram (g)" },
  { value: "ton", label: "Ton" },
  { value: "piece", label: "Piece" },
  { value: "bunch", label: "Bunch" },
  { value: "bag", label: "Bag" },
  { value: "crate", label: "Crate" },
] as const;

export const FORM_STEPS: Step[] = [
  { number: 1, label: "Basic Info", icon: <Package className="w-6 h-6" /> },
  { number: 2, label: "Photos", icon: <ImageIcon className="w-6 h-6" /> },
  { number: 3, label: "Details", icon: <FileText className="w-6 h-6" /> },
  { number: 4, label: "Location", icon: <MapPinIcon className="w-6 h-6" /> },
];

export const PHOTO_TIPS = [
  "Use natural lighting for best results",
  "Show product from multiple angles",
  "Keep background clean and simple",
];

export const SAFETY_TIPS = [
  "Meet buyers in safe, public places",
  "Don't share sensitive personal information",
  "Get full payment before delivery",
];
