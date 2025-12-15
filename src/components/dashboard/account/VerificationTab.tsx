"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  CheckCircle,
  AlertCircle,
  Shield,
  BadgeCheck,
  MapPin,
  FileText,
  MessageSquare,
  Package,
} from "lucide-react";
import {
  verificationLevels,
  verificationSteps,
} from "@/components/constants/account";
import { handleAction } from "@/lib/account-utils";

export const VerificationTab = () => {
  const [verificationStatus, setVerificationStatus] = useState({
    level: "basic", // 'unverified', 'basic', 'verified', 'premium'
    score: 50, // out of 100
    completedSteps: 5,
    totalSteps: 8,
  });

  return (
    <div className="space-y-6">
      {/* Verification Header */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div>
          <h3 className="text-md font-semibold text-gray-900">
            Seller Verification
          </h3>
          <p className="text-sm text-gray-600">
            Build trust with buyers through verification
          </p>
        </div>
      </div>

      {/* Verification Steps */}
      <div className="space-y-4">
        <h4 className="font-medium text-gray-900">Complete These Steps</h4>
        <div className="grid gap-3">
          {verificationSteps.map((step) => (
            <Card key={step.id} className="shadow-none border">
              <CardContent className="p-4">
                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-lg ${
                        step.completed ? "bg-emerald-100" : "bg-gray-100"
                      }`}
                    >
                      <step.icon
                        className={`h-5 w-5 ${
                          step.completed ? "text-emerald-600" : "text-gray-400"
                        }`}
                      />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{step.title}</p>
                      <p className="text-sm text-gray-600">
                        {step.description}
                      </p>
                      <span className="text-xs text-gray-500">
                        {step.points} trust points
                      </span>
                    </div>
                  </div>
                  <div className="ms-auto">
                    {step.completed ? (
                      <div className="flex items-center gap-1 text-emerald-600">
                        <CheckCircle className="h-5 w-5" />
                        <span className="text-sm">Done</span>
                      </div>
                    ) : step.action ? (
                      <Button
                        size="sm"
                        onClick={() => handleAction(step.action!)}
                        className="bg-emerald-600 hover:bg-emerald-700"
                      >
                        Start
                      </Button>
                    ) : (
                      <span className="text-sm text-gray-500">Pending</span>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Verification Benefits */}
      <div className="space-y-4">
        <h4 className="font-medium text-gray-900">Verification Benefits</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {verificationLevels.map((level) => (
            <Card
              key={level.level}
              className={`border shadow-none ${
                verificationStatus.level === level.level
                  ? "border-emerald-300 ring-1 ring-emerald-200"
                  : "border-gray-200"
              }`}
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className={`p-1.5 rounded-full ${level.badgeColor}`}>
                    <BadgeCheck className="h-4 w-4" />
                  </div>
                  <span className="font-medium">{level.label}</span>
                </div>
                <ul className="space-y-2">
                  {level.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-600">{benefit}</span>
                    </li>
                  ))}
                </ul>
                {verificationStatus.level === level.level && (
                  <div className="mt-4 pt-3 border-t">
                    <p className="text-xs text-emerald-600 font-medium">
                      Current Level
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="shadow-none">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FileText className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="font-medium">ID Verification</p>
                <p className="text-sm text-gray-600 mb-2">
                  Builds buyer confidence
                </p>
                <Button
                  size="sm"
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  onClick={() => handleAction("upload_id")}
                >
                  Upload ID
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-none">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <MapPin className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="font-medium">Location Verification</p>
                <p className="text-sm text-gray-600 mb-2">
                  Show buyers your area
                </p>
                <Button
                  size="sm"
                  className="w-full bg-green-600 hover:bg-green-700"
                  onClick={() => handleAction("verify_location")}
                >
                  Verify Location
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-none">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Package className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="font-medium">List Products</p>
                <p className="text-sm text-gray-600 mb-2">
                  Start selling today
                </p>
                <Button
                  size="sm"
                  className="w-full bg-purple-600 hover:bg-purple-700"
                  onClick={() => handleAction("list_product")}
                >
                  Add Product
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Safety Notice */}
      <Card className="border-amber-100 bg-amber-50 shadow-none">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5" />
            <div>
              <p className="font-medium text-amber-900 mb-1">Safety First!</p>
              <p className="text-sm text-amber-700">
                Always meet in safe, public locations for transactions. Never
                share personal banking details through the platform. All
                payments and final negotiations happen in person.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
