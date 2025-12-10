"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { CustomModal } from "../ui/custom-modal";

interface WhatsAppButtonProps {
  phone: string;
  message?: string;
  children: React.ReactNode;
  sellerName?: string;
  productName?: string;
  predefinedMessages?: Array<{
    label: string;
    message: string;
  }>;
}

export const WhatsAppButton = ({
  phone,
  message = "",
  children,
  sellerName = "",
  productName = "",
  predefinedMessages = [],
}: WhatsAppButtonProps) => {
  // Default predefined messages
  const defaultMessages = [
    {
      label: "Ask about product",
      message: `Hello ${sellerName}, I saw your "${productName}" listing. Could you tell me more about availability, price, and quality?`,
    },
    {
      label: "General inquiry",
      message: `Hello ${sellerName}, I found you on AgroCommerce. Could you share what products you currently have available?`,
    },
    {
      label: "Arrange meeting",
      message: `Hello ${sellerName}, I'd like to arrange a meeting. What's a good time and place?`,
    },
    {
      label: "Negotiate price",
      message: `Hello ${sellerName}, I'm interested in your product. Is the price negotiable? What's your best price?`,
    },
  ];

  // Filter out product-related message if no product name
  const messagesToUse =
    predefinedMessages.length > 0
      ? predefinedMessages
      : defaultMessages.filter(
          (msg) => !(productName === "" && msg.label.includes("product"))
        );

  const openWhatsApp = (selectedMessage?: string) => {
    const cleanPhone = phone.replace(/\D/g, "");
    const finalMessage = selectedMessage || message;
    const text = finalMessage
      ? `?text=${encodeURIComponent(finalMessage)}`
      : "";
    window.open(
      `https://wa.me/${cleanPhone}${text}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const handleDirectClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (message) {
      openWhatsApp(); // Use provided message directly
    }
  };

  // If there's a specific message, just open WhatsApp directly
  if (message) {
    return (
      <div onClick={handleDirectClick} className="cursor-pointer">
        {children}
      </div>
    );
  }

  // If no message provided, show modal with options
  return (
    <CustomModal
      trigger={<div className="cursor-pointer">{children}</div>}
      title={`Chat with ${sellerName || "Seller"}`}
      description="Choose a message to start the conversation"

    >
      <div className="space-y-3 py-2 w-full">
        {messagesToUse.map((option, index) => (
          <Button
            key={index}
            variant="outline"
            className="w-full justify-start h-auto py-4 text-left hover:border-green-500 hover:bg-green-50"
            onClick={() => openWhatsApp(option.message)}
          >
            <div className="flex flex-col items-start">
              <span className="font-medium">{option.label}</span>
              <span className="text-[13px] text-gray-500 mt-1 line-clamp-2 text-wrap">
                {option.message}
              </span>
            </div>
          </Button>
        ))}
      </div>

      <div className="pt-4 mt-4 border-t">
        <p className="text-xs text-gray-500">
          💡 You can also type your own message directly on WhatsApp
        </p>
      </div>
    </CustomModal>
  );
};
