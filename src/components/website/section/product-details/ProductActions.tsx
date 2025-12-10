"use client";

import { Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Product } from "@/types";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";

interface ProductActionsProps {
  product: Product;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onShare: () => void;
  onShowPhone: () => void;
  onSendMessage: () => void;
}

export const ProductActions = ({
  product,
  isFavorite,
  onToggleFavorite,
  onShare,
  onShowPhone,
  onSendMessage,
}: ProductActionsProps) => {
  return (
    <div className="flex gap-2">
      <Button
        size="lg"
        className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white"
        onClick={onShowPhone}
      >
        <Phone className="h-5 w-5 mr-2" />
        Show Phone
      </Button>
      <WhatsAppButton
        phone={product?.vendor?.phone}
        sellerName={product?.vendor?.name}
        productName={product?.name}
      >
        <Button
          size="lg"
          variant="outline"
          className="flex-1 border-emerald-600 text-emerald-600 hover:bg-emerald-50"
          onClick={onSendMessage}
        >
          <MessageCircle className="h-5 w-5 mr-2" />
          Chat
        </Button>
      </WhatsAppButton>
    </div>
  );
};
