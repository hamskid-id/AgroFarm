/* eslint-disable @typescript-eslint/no-explicit-any */

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import axios from "axios";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const extractErrorMessage = (
  err: unknown,
  defaultMessage = "Something went wrong"
): string => {
  if (axios.isAxiosError(err)) {
    const errorResponse = err.response?.data as
      | { detail?: string; message?: string; error?: string }
      | undefined;

    return (
      errorResponse?.detail ||
      errorResponse?.message ||
      errorResponse?.error ||
      err.message ||
      defaultMessage
    );
  }

  // For non-Axios errors
  if (err instanceof Error) {
    return err.message || defaultMessage;
  }

  return defaultMessage;
};

export const extractSuccessMessage = (
  response: any,
  defaultMessage = "Operation successful"
): string => {
  if (!response) return defaultMessage;

  const data = response.data || response;
  return (
    data.message ||
    data.detail ||
    data.status_message ||
    data.status_text ||
    defaultMessage
  );
};

export function formatDate(dateString?: string | null): string {
  if (!dateString) return "Never";

  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "Invalid date";

  // Use a specific timezone to ensure consistency
  // This will display the date in Nigeria/West Africa Time (WAT)
  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: "Africa/Lagos", // Force WAT timezone
  });
}

export function formatDateOnly(dateString?: string | null): string {
  if (!dateString) return "Never";

  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "Invalid date";

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "Africa/Lagos",
  });
}

export function isValidDate(date: Date | undefined) {
  if (!date) {
    return false;
  }
  return !isNaN(date.getTime());
}

// Function to format currency values in Naira
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

// Function to format percentage values
export const formatPercentage = (value: number): string => {
  return `${(value * 100).toFixed(2)}%`;
};

export const formatFileSize = (bytes: number) =>
  `${Math.round(bytes / 1024)} KB`;
