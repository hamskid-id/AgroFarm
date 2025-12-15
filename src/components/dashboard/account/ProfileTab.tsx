"use client";

import React, { useState } from "react";
import {
  Camera,
  Edit2,
  MapPin,
  CheckCircle,
  Shield,
  MessageSquare,
  Star,
  Clock,
  Package,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input} from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { mockUserProfile } from "@/lib/mockData";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export const ProfileTab = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState(mockUserProfile);

  const sellerStats = {
    verificationLevel: "basic",
    trustScore: 50,
    totalProducts: 8,
    responseRate: "85%",
    avgResponseTime: "2 hours",
    memberSince: "2023",
    positiveReviews: 12,
  };

  return (
    <div className="space-y-6">
      {/* Profile Header with Trust Indicators */}
      <div className="flex flex-col lg:flex-row lg:items-start gap-6">
        {/* Left Column - Profile */}
        <div className="flex-1">
          <div className="flex items-center gap-6 flex-wrap">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                {profileData.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              {isEditing && (
                <button className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-lg border-2 border-emerald-600 hover:bg-emerald-50">
                  <Camera className="h-4 w-4 text-emerald-600" />
                </button>
              )}
              {/* Verification Badge */}
              <div className="absolute -top-2 -right-2">
                <div className="inline-flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-medium">
                  <Shield className="h-3 w-3" />
                  Basic Verified
                </div>
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-md font-bold text-gray-900">
                {profileData.name}
              </h3>
              <p className="text-gray-600 text-[13px]">{profileData.email}</p>
              <div className="flex flex-wrap items-center gap-2 mt-2">
                <div className="flex items-center gap-1">
                  <CheckCircle className="h-4 w-4 text-blue-600" />
                  <span className="text-sm text-blue-600">Phone Verified</span>
                </div>
                <div className="flex items-center gap-1">
                  <Package className="h-4 w-4 text-emerald-600" />
                  <span className="text-sm text-emerald-600">
                    {sellerStats.totalProducts} Products
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-amber-400" />
                  <span className="text-sm text-gray-600">
                    4.2★ ({sellerStats.positiveReviews})
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Form - Unchanged */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label className="mb-2 text-sm">Full Name</Label>
          <Input
          className="text-xs"
            type="text"
            value={profileData.name}
            onChange={(e) =>
              setProfileData({ ...profileData, name: e.target.value })
            }
            disabled={!isEditing}
          />
        </div>

        <div>
          <Label className="mb-2 text-sm">Business/Trade Name</Label>
          <Input
          className="text-xs"
            type="text"
            value={profileData.businessName}
            onChange={(e) =>
              setProfileData({ ...profileData, businessName: e.target.value })
            }
            disabled={!isEditing}
          />
        </div>

        <div>
          <Label className="mb-2 text-sm">Email Address</Label>
          <Input
          className="text-xs"
            type="email"
            value={profileData.email}
            onChange={(e) =>
              setProfileData({ ...profileData, email: e.target.value })
            }
            disabled={!isEditing}
          />
        </div>

        <div>
          <Label className="mb-2 text-sm">Phone Number</Label>
          <Input
          className="text-xs"
            type="tel"
            value={profileData.phone}
            onChange={(e) =>
              setProfileData({ ...profileData, phone: e.target.value })
            }
            disabled={!isEditing}
          />
        </div>
      </div>

      <div>
        <Label className="mb-2 text-sm">Location (City/Area)</Label>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            type="text"
            value={profileData.location}
            onChange={(e) =>
              setProfileData({ ...profileData, location: e.target.value })
            }
            disabled={!isEditing}
            className="pl-10 text-xs"
          />
        </div>
        <p className="text-xs text-gray-500 mt-1">
          Buyers will see this to arrange meetups
        </p>
      </div>

      <div>
        <Label className="mb-2 text-sm">About Your Business</Label>
        <Textarea
        className="text-xs"
          value={profileData.bio}
          onChange={(e) =>
            setProfileData({ ...profileData, bio: e.target.value })
          }
          disabled={!isEditing}
          rows={4}
          placeholder="Example: I specialize in fresh vegetables from local farms. I sell tomatoes, onions, and potatoes. Available for meetups in Nairobi CBD."
        />
        <p className="text-xs text-gray-500 mt-1">
          Help buyers understand what you sell and your expertise
        </p>
      </div>

      {/* Preferred Meeting Spots */}
      <div>
        <Label className="mb-2 text-sm">Preferred Meeting Spots (Optional)</Label>
        <Textarea
          placeholder="Example: City Market parking, Sarit Centre food court, or near my shop in Industrial Area"
          disabled={!isEditing}
          rows={2}
          className="text-xs"
        />
        <p className="text-xs text-gray-500 mt-1">
          Suggest safe, public locations for transactions
        </p>
      </div>

      {/* Save/Edit Button */}
      <div className="flex gap-3">
        {isEditing ? (
          <>
            <Button
              type="button"
              onClick={() => setIsEditing(false)}
              variant="outline"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={() => {
                alert("Profile updated!");
                setIsEditing(false);
              }}
              className="flex-1 bg-emerald-600 hover:bg-emerald-700"
            >
              Save Changes
            </Button>
          </>
        ) : (
          <Button
            type="button"
            onClick={() => setIsEditing(true)}
            className="bg-emerald-600 hover:bg-emerald-700"
          >
            <Edit2 className="h-4 w-4 mr-2" />
            Edit Profile
          </Button>
        )}
      </div>
    </div>
  );
};
