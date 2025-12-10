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
import { Input } from "@/components/ui/input";
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
          <div className="flex items-center gap-6">
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
              <h3 className="text-xl font-bold text-gray-900">
                {profileData.name}
              </h3>
              <p className="text-gray-600">{profileData.email}</p>
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

        {/* Right Column - Stats */}
        <div className="lg:w-64">
          <Card className="shadow-none">
            <CardContent className="p-4">
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-700">
                      Trust Score
                    </span>
                    <span className="text-sm font-bold text-emerald-600">
                      {sellerStats.trustScore}/100
                    </span>
                  </div>
                  <Progress value={sellerStats.trustScore} className="h-2" />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <MessageSquare className="h-4 w-4 text-blue-500" />
                      <span className="text-sm font-medium">
                        {sellerStats.responseRate}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">Response Rate</p>
                  </div>

                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Clock className="h-4 w-4 text-green-500" />
                      <span className="text-sm font-medium">
                        {sellerStats.avgResponseTime}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">Avg. Response</p>
                  </div>
                </div>

                <Button
                  size="sm"
                  className="w-full bg-emerald-600 hover:bg-emerald-700"
                  onClick={() => (window.location.hash = "#verification")}
                >
                  <Shield className="h-4 w-4 mr-2" />
                  Boost Trust Score
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Profile Form - Unchanged */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label className="mb-2">Full Name</Label>
          <Input
            type="text"
            value={profileData.name}
            onChange={(e) =>
              setProfileData({ ...profileData, name: e.target.value })
            }
            disabled={!isEditing}
          />
        </div>

        <div>
          <Label className="mb-2">Business/Trade Name</Label>
          <Input
            type="text"
            value={profileData.businessName}
            onChange={(e) =>
              setProfileData({ ...profileData, businessName: e.target.value })
            }
            disabled={!isEditing}
          />
        </div>

        <div>
          <Label className="mb-2">Email Address</Label>
          <Input
            type="email"
            value={profileData.email}
            onChange={(e) =>
              setProfileData({ ...profileData, email: e.target.value })
            }
            disabled={!isEditing}
          />
        </div>

        <div>
          <Label className="mb-2">Phone Number</Label>
          <Input
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
        <Label className="mb-2">Location (City/Area)</Label>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            type="text"
            value={profileData.location}
            onChange={(e) =>
              setProfileData({ ...profileData, location: e.target.value })
            }
            disabled={!isEditing}
            className="pl-10"
          />
        </div>
        <p className="text-xs text-gray-500 mt-1">
          Buyers will see this to arrange meetups
        </p>
      </div>

      <div>
        <Label className="mb-2">About Your Business</Label>
        <Textarea
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
        <Label className="mb-2">Preferred Meeting Spots (Optional)</Label>
        <Textarea
          placeholder="Example: City Market parking, Sarit Centre food court, or near my shop in Industrial Area"
          disabled={!isEditing}
          rows={2}
          className="text-sm"
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
