"use client";

import React, { useState } from "react";
import {
  User,
  Shield,
  Bell,
  Settings,
  Camera,
  Edit2,
  MapPin,
  Phone,
  CheckCircle,
  Clock,
  AlertCircle,
  X,
  Upload,
  TrendingUp,
  Calendar,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { mockUserProfile } from "@/lib/mockData";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { CustomTabs } from "@/components/ui/CustomTab";

export const AccountView = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const isLoading = false;
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState(mockUserProfile);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    adPerformance: true,
    priceAlerts: false,
  });

  const renderTabContent = (content: React.ReactNode) => {
    if (isLoading) {
      return <LoadingSpinner loadingText="Fetching Details" />;
    }
    return content;
  };

  // In your Reporting component, update the tabOptions to pass currentTab:

  // Profile Tab
  const ProfileTab = () => (
    <div className="space-y-6">
      {/* Profile Picture */}
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
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">
            {profileData.name}
          </h3>
          <p className="text-gray-600">{profileData.email}</p>
          <div className="flex items-center gap-2 mt-2">
            <CheckCircle className="h-4 w-4 text-blue-600" />
            <span className="text-sm text-blue-600 font-medium">
              Verified Seller
            </span>
          </div>
        </div>
      </div>

      {/* Form Fields */}
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
          <Label className="mb-2">Business Name</Label>
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
        <Label className="mb-2">Location</Label>
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
      </div>

      <div>
        <Label className="mb-2">Bio</Label>
        <Textarea
          value={profileData.bio}
          onChange={(e) =>
            setProfileData({ ...profileData, bio: e.target.value })
          }
          disabled={!isEditing}
          rows={4}
        />
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

  // Security Tab
  const SecurityTab = () => (
    <div className="space-y-6">
      {/* Change Password */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-4">Change Password</h3>
        <div className="space-y-4">
          <div>
            <Label className="mb-2">Current Password</Label>
            <Input
              type="password"
              value={passwordData.currentPassword}
              onChange={(e) =>
                setPasswordData({
                  ...passwordData,
                  currentPassword: e.target.value,
                })
              }
              placeholder="Enter current password"
            />
          </div>
          <div>
            <Label className="mb-2">New Password</Label>
            <Input
              type="password"
              value={passwordData.newPassword}
              onChange={(e) =>
                setPasswordData({
                  ...passwordData,
                  newPassword: e.target.value,
                })
              }
              placeholder="Enter new password"
            />
          </div>
          <div>
            <Label className="mb-2">Confirm New Password</Label>
            <Input
              type="password"
              value={passwordData.confirmPassword}
              onChange={(e) =>
                setPasswordData({
                  ...passwordData,
                  confirmPassword: e.target.value,
                })
              }
              placeholder="Confirm new password"
            />
          </div>
          <Button
            type="button"
            onClick={() => alert("Password updated!")}
            className="w-full bg-emerald-600 hover:bg-emerald-700"
          >
            Update Password
          </Button>
        </div>
      </div>
    </div>
  );

  // Notifications Tab
  const NotificationsTab = () => (
    <div className="space-y-4">
      <div className="mb-4">
        <h3 className="font-semibold text-gray-900 mb-1">
          Notification Preferences
        </h3>
        <p className="text-sm text-gray-600">
          Control how you receive notifications
        </p>
      </div>

      {[
        {
          key: "emailNotifications",
          icon: Bell,
          title: "Email Notifications",
          desc: "Receive notifications via email",
        },
        {
          key: "smsNotifications",
          icon: Phone,
          title: "SMS Notifications",
          desc: "Get SMS alerts for important updates",
        },
        {
          key: "pushNotifications",
          icon: Bell,
          title: "Push Notifications",
          desc: "Browser push notifications",
        },
        {
          key: "adPerformance",
          icon: TrendingUp,
          title: "Ad Performance",
          desc: "Weekly reports on your ad performance",
        },
        {
          key: "priceAlerts",
          icon: AlertCircle,
          title: "Price Alerts",
          desc: "Get notified about similar product prices",
        },
      ].map((item) => (
        <Card key={item.key} className="shadow-none border border-gray-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <item.icon className="h-4 w-4 text-gray-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{item.title}</p>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              </div>
              <Switch
                checked={notifications[item.key as keyof typeof notifications]}
                onCheckedChange={(checked) =>
                  setNotifications({
                    ...notifications,
                    [item.key]: checked,
                  })
                }
              />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  // Settings Tab
  const SettingsTab = () => (
    <div className="space-y-6">
      {/* Account Status */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-4">Account Status</h3>
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-6 w-6 text-green-600" />
              <div>
                <p className="font-medium text-green-900">Account Verified</p>
                <p className="text-sm text-green-700">
                  Your account is fully verified
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Account Stats */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-4">Account Statistics</h3>
        <div className="grid grid-cols-2 gap-4">
          <Card className="shadow-none border border-gray-200 ">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="h-4 w-4 text-gray-600" />
                <span className="text-sm text-gray-600">Member Since</span>
              </div>
              <p className="font-semibold text-gray-900">
                {mockUserProfile.joinDate}
              </p>
            </CardContent>
          </Card>
          <Card className="shadow-none border border-gray-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Star className="h-4 w-4 text-amber-400" />
                <span className="text-sm text-gray-600">Rating</span>
              </div>
              <p className="font-semibold text-gray-900">4.8 (156 reviews)</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="pt-6 border-t">
        <h3 className="font-semibold text-red-600 mb-4 flex items-center gap-2">
          <AlertCircle className="h-5 w-5" />
          Danger Zone
        </h3>
        <div className="space-y-3">
          <Button
            variant="outline"
            className="w-full border-orange-300 text-orange-600 hover:bg-orange-50"
          >
            Deactivate Account
          </Button>
          <Button
            variant="outline"
            className="w-full border-red-300 text-red-600 hover:bg-red-50"
          >
            Delete Account
          </Button>
        </div>
        <p className="text-xs text-gray-500 mt-3">
          Warning: These actions are permanent and cannot be undone.
        </p>
      </div>
    </div>
  );

  const tabOptions = [
    {
      value: "profile",
      label: "Profile",
      content: renderTabContent(
        <>
          <ProfileTab />
        </>
      ),
    },
    {
      value: "security",
      label: "Security",
      content: renderTabContent(
        <>
          <SecurityTab />
        </>
      ),
    },
    {
      value: "notifications",
      label: "Notifications",
      content: renderTabContent(
        <>
          <NotificationsTab />
        </>
      ),
    },
    {
      value: "settings",
      label: "Settings",
      content: renderTabContent(
        <>
          <SettingsTab />
        </>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Account Settings</h2>

      {/* Tabs */}
      <Card className="shadow-none border border-gray-200 p-4">
        <CustomTabs
          defaultValue="profile"
          options={tabOptions}
          onValueChange={(value) => {
            setActiveTab(value);
          }}
          className="border-none"
          triggerClassName="max-w-fit"
        />
      </Card>
    </div>
  );
};
