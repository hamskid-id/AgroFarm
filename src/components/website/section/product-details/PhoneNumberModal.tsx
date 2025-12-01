"use client";

import { Phone, ShieldCheck, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CustomModal } from "@/components/ui/custom-modal";

interface PhoneNumberModalProps {
  isOpen: boolean;
  onClose: () => void;
  phoneNumber: string;
  vendorName: string;
}

export const PhoneNumberModal = ({
  isOpen,
  onClose,
  phoneNumber,
  vendorName,
}: PhoneNumberModalProps) => {
  const handleCopyNumber = () => {
    navigator.clipboard.writeText(phoneNumber);
    // You can add a toast notification here
    alert("Phone number copied to clipboard!");
  };

  const handleCallNow = () => {
    window.location.href = `tel:${phoneNumber}`;
  };

  return (
    <CustomModal
      open={isOpen}
      setOpen={onClose}
      title="Contact Seller"
      bg="bg-white"
      width="max-w-[400px]"
    >
      <div className="space-y-6">
        {/* Vendor Info */}
        <div className="text-center">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <Phone className="h-8 w-8 text-emerald-600" />
          </div>
          <h3 className="font-semibold text-gray-900 text-lg">{vendorName}</h3>
          <p className="text-sm text-gray-600 mt-1">AgroFarm Seller</p>
        </div>

        {/* Phone Number Display */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 text-center">
          <div className="text-3xl font-bold text-emerald-700 tracking-wider">
            {phoneNumber}
          </div>
          <p className="text-sm text-emerald-600 mt-2">Tap to call</p>
        </div>

        {/* Safety Tips */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <div className="flex items-start gap-2 mb-3">
            <AlertCircle className="h-4 w-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-amber-900 text-sm mb-1">
                Safety First
              </p>
              <ul className="text-xs text-amber-800 space-y-1">
                <li>• Meet in public places</li>
                <li>• Inspect product before payment</li>
                <li>• Avoid advance payments</li>
              </ul>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-blue-500" />
            <p className="text-xs text-blue-700">
              This seller is verified on AgroFarm
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            onClick={handleCallNow}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3"
            size="lg"
          >
            <Phone className="h-5 w-5 mr-2" />
            Call Now
          </Button>
          <Button
            onClick={handleCopyNumber}
            variant="outline"
            className="w-full border-emerald-600 text-emerald-600 hover:bg-emerald-50"
          >
            Copy Phone Number
          </Button>
          <Button
            onClick={onClose}
            variant="ghost"
            className="w-full text-gray-600 hover:text-gray-900"
          >
            Cancel
          </Button>
        </div>
      </div>
    </CustomModal>
  );
};
