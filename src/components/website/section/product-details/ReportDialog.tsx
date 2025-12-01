"use client";

import { useState } from "react";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CustomModal } from "@/components/ui/custom-modal";

interface ReportDialogProps {
  isOpen: boolean;
  onClose: () => void;
  productId: number;
  productName: string;
}

const reportReasons = [
  "Prohibited item",
  "Suspected fraud",
  "Incorrect category",
  "Duplicate listing",
  "Wrong information",
  "Expired listing",
  "Other reason",
];

export const ReportDialog = ({
  isOpen,
  onClose,
  productId,
  productName,
}: ReportDialogProps) => {
  const [selectedReason, setSelectedReason] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!selectedReason) return;

    setIsSubmitting(true);
    // Submit report to backend
    console.log("Report submitted:", {
      productId,
      productName,
      reason: selectedReason,
      description,
    });

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      alert("Thank you for your report. We'll review it shortly.");
      onClose();
      // Reset form
      setSelectedReason("");
      setDescription("");
    }, 1000);
  };

  return (
    <CustomModal
      open={isOpen}
      setOpen={onClose}
      title="Report Listing"
      description="Report this listing for violating our policies"
      bg="bg-white"
      isAlert={false}
      width="max-w-[500px]"
    >
      <div className="space-y-6">
        {/* Product Info */}
        <div className="p-3 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">You're reporting:</p>
          <p className="font-medium text-gray-900 truncate">{productName}</p>
        </div>

        {/* Reason Selection */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3 text-sm">
            Select a reason *
          </h4>
          <div className="space-y-2">
            {reportReasons.map((reason) => (
              <label
                key={reason}
                className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-colors ${
                  selectedReason === reason
                    ? "bg-emerald-50 border-emerald-200"
                    : "hover:bg-gray-50"
                }`}
              >
                <input
                  type="radio"
                  name="reportReason"
                  checked={selectedReason === reason}
                  onChange={() => setSelectedReason(reason)}
                  className="h-4 w-4 text-emerald-600"
                />
                <span className="text-sm flex-1">{reason}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Additional Details */}
        <div>
          <h4 className="font-medium text-gray-900 mb-2 text-sm">
            Additional details (optional)
          </h4>
          <Textarea
            placeholder="Please provide more details about why you're reporting this listing..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="min-h-[100px] text-sm"
            rows={4}
          />
        </div>

        {/* Warning Note */}
        <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
          <div className="flex items-start gap-2">
            <AlertTriangle className="h-4 w-4 text-amber-500 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-amber-800">
              Reports are anonymous. False reporting may lead to account
              suspension.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-2">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1"
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white"
            disabled={!selectedReason || isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Report"}
          </Button>
        </div>
      </div>
    </CustomModal>
  );
};
