/* eslint-disable @typescript-eslint/no-explicit-any */

import { StaticImageData } from "next/image";

export enum FormFieldType {
  INPUT = "text",
  PASSWORD = "password",
  NUMBER = "number",
  TEXTAREA = "textarea",
  PHONE_INPUT = "phoneInput",
  CHECKBOX = "checkbox",
  DATE_PICKER = "datePicker",
  DATE = "date",
  SELECT = "select",
  SKELETON = "skeleton",
  EMAIL = "email",
}

export enum UserRole {
  ADMIN = "ADMIN",
  USER = "USER",
  SUPER_USER = "SUPERUSER",
}

export enum AddAsEmailReceipient {
  YES = "YES",
  NO = "NO",
}

export enum Portfolio {
  AHF = "AHF",
  HTO = "HTO",
  RHF = "RHF",
}

export enum UserStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
}

export interface User {
  id: string;
  created_at: string;
  updated_at: string;
  email: string;
  name: string;
  role: UserRole;
  status: UserStatus;
  last_login: string;
  is_temp_password: boolean;
  is_email_recipient: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  status_code: number;
  message: string;
  detail: string;
  error: string;
  data: T;
}

export interface PaginatedResponse<T> {
  page: number;
  page_size: number;
  total: number;
  pages: number;
  data: T[];
}

export interface ApiError {
  success: boolean;
  status_code: number;
  message: string;
  detail: string;
  error: string;
  status?: number;
  data?: {
    errors?: ApiValidationError[];
  };
}
export interface ApiValidationError {
  loc: string[]; // e.g. ["body", "password"]
  msg: string; // e.g. "Value error, Password must be at least 8 characters long"
  type: string; // e.g. "value_error"
}

// Pagination parameters
export interface PaginationParams {
  page?: number;
  limit?: number;
  [key: string]: any;
}

// Full API response with pagination
export type ApiPaginatedResponse<T> = ApiResponse<PaginatedResponse<T>>;

export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  image: any; // or use StaticImageData if using Next.js Image
  rating: number;
  reviewCount: number;
  featured: boolean;
  inStock: boolean;
  stockCount: number;
  organic: boolean;
  badge: string;
  description: string;
  tags: string[];
  category: {
    id: string;
    name: string;
    icon: string;
  };
  images: StaticImageData[];
  vendor: Farmer; // Now using the full Farmer interface
}

export interface Vendor {
  name: string;
  initial: string;
  rating: number;
  reviewCount: number;
}

export interface ProductCategories {
  id: string;
  label: string;
  icon: string;
}
[];


// types/farmer.ts
export interface Farmer {
  id: number;
  name: string;
  farmName: string;
  location: string;
  rating: number;
  reviewCount: number;
  totalSales: string;
  certifications: string[];
  specialties: string[];
  avatar: string;
  isVerified: boolean;
  joinDate: string;
  responseRate: number;
  deliveryTime: string;
  // Optional additional properties you might want to add:
  description?: string;
  contactEmail?: string;
  phoneNumber?: string;
  website?: string;
  socialMedia?: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
  };
  farmingMethods?: string[];
  yearsOfExperience?: number;
  farmSize?: string;
  deliveryAreas?: string[];
  minimumOrder?: string;
  paymentMethods?: string[];
}

export interface FeaturedFarmersProps {
  farmers: Farmer[];
}

export interface FilterState {
  priceRange: [number, number];
  categories: string[];
  ratings: number[];
  inStockOnly: boolean;
  organicOnly: boolean;
}

export interface ProductListingProps {
  initialProducts?: any[]; // You can type this properly based on your Product type
}