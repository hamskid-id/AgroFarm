"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  CheckCircle,
  AlertCircle,
  Shield,
  BadgeCheck,
  Camera,
  MapPin,
  FileText,
  MessageSquare,
  Star,
  Truck,
  Package,
  Phone,
} from "lucide-react";

export const VerificationTab = () => {
  const [verificationStatus, setVerificationStatus] = useState({
    level: "basic", // 'unverified', 'basic', 'verified', 'premium'
    score: 50, // out of 100
    completedSteps: 5,
    totalSteps: 8,
  });

  const verificationSteps = [
    {
      id: 1,
      title: "Verify Email",
      description: "Confirm your email address",
      icon: CheckCircle,
      completed: true,
      points: 10,
      action: null,
    },
    {
      id: 2,
      title: "Verify Phone",
      description: "Confirm your mobile number",
      icon: Phone,
      completed: true,
      points: 15,
      action: null,
    },
    {
      id: 3,
      title: "Complete Profile",
      description: "Add profile photo & bio",
      icon: CheckCircle,
      completed: true,
      points: 10,
      action: null,
    },
    {
      id: 4,
      title: "Add Business Info",
      description: "Business name & location",
      icon: CheckCircle,
      completed: true,
      points: 10,
      action: null,
    },
    {
      id: 5,
      title: "List First Product",
      description: "Add your first product for sale",
      icon: Package,
      completed: true,
      points: 15,
      action: "list_product",
    },
    {
      id: 6,
      title: "Verify Identity",
      description: "Upload government ID for security",
      icon: FileText,
      completed: false,
      points: 20,
      action: "upload_id",
    },
    {
      id: 7,
      title: "Verify Location",
      description: "Confirm your business/shop location",
      icon: MapPin,
      completed: false,
      points: 15,
      action: "verify_location",
    },
    {
      id: 8,
      title: "Build Reputation",
      description: "Get positive reviews from buyers",
      icon: Star,
      completed: false,
      points: 15,
      action: "build_reputation",
    },
  ];

  const verificationLevels = [
    {
      level: "unverified",
      label: "Unverified",
      minScore: 0,
      badgeColor: "bg-gray-100 text-gray-600",
      benefits: ["List up to 3 products", "Basic messaging"],
    },
    {
      level: "basic",
      label: "Basic Verified",
      minScore: 40,
      badgeColor: "bg-blue-50 text-blue-600",
      benefits: [
        "Basic badge",
        "List up to 20 products",
        "Phone verified badge",
        "Priority in search",
      ],
    },
    {
      level: "verified",
      label: "Verified Seller",
      minScore: 70,
      badgeColor: "bg-emerald-50 text-emerald-600",
      benefits: [
        "Verified badge",
        "Unlimited products",
        "Featured in category",
        "Fast-track support",
        "Negotiation insights",
      ],
    },
    {
      level: "premium",
      label: "Trusted Seller",
      minScore: 90,
      badgeColor: "bg-purple-50 text-purple-600",
      benefits: [
        "Trusted badge",
        "Top search results",
        "Profile highlighting",
        "Verified badge on ads",
        "Premium support",
      ],
    },
  ];

  const handleAction = (action: string) => {
    switch (action) {
      case "upload_id":
        // Open document upload modal
        alert("Open ID document upload");
        break;
      case "verify_location":
        // Open location verification
        alert("Open location verification map");
        break;
      case "list_product":
        // Redirect to product listing page
        alert("Redirect to create product page");
        break;
      case "build_reputation":
        // Show tips for getting reviews
        alert("Tips for getting buyer reviews");
        break;
      default:
        break;
    }
  };

  return (
    <div className="space-y-6">
      {/* Verification Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Seller Verification
          </h3>
          <p className="text-sm text-gray-600">
            Build trust with buyers through verification
          </p>
        </div>
        <div
          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${
            verificationLevels.find((l) => l.level === verificationStatus.level)
              ?.badgeColor
          }`}
        >
          <Shield className="h-4 w-4" />
          <span className="text-sm font-medium">
            {
              verificationLevels.find(
                (l) => l.level === verificationStatus.level
              )?.label
            }
          </span>
        </div>
      </div>

      {/* Progress Section */}
      <Card className="shadow-none border-emerald-100 bg-emerald-50">
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium text-emerald-900">Trust Score</p>
                <p className="text-sm text-emerald-700">
                  Higher score = More buyer confidence
                </p>
              </div>
              <span className="font-bold text-emerald-900">
                {verificationStatus.score}/100
              </span>
            </div>
            <Progress value={verificationStatus.score} className="h-2" />
            <div className="flex justify-between text-xs text-emerald-600">
              <span>Basic: 40</span>
              <span>Verified: 70</span>
              <span>Trusted: 90</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Trust Building Tips */}
      <Card className="border-blue-100 bg-blue-50 shadow-none">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <MessageSquare className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <p className="font-medium text-blue-900 mb-1">
                Tips for Building Trust
              </p>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Use clear, high-quality product photos</li>
                <li>• Be responsive to buyer messages</li>
                <li>• Meet in safe, public locations for transactions</li>
                <li>• Provide accurate product descriptions</li>
                <li>• Ask buyers to leave reviews after successful deals</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Verification Steps */}
      <div className="space-y-4">
        <h4 className="font-medium text-gray-900">Complete These Steps</h4>
        <div className="grid gap-3">
          {verificationSteps.map((step) => (
            <Card key={step.id} className="shadow-none border">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
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
                  <div>
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
