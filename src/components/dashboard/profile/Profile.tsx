// components/dashboard/profile/ProfilePage.tsx
"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit2, User, Settings, Bell, Lock } from "lucide-react";
import ProfileInfo from "./ProfileInfo";
import { CustomTabs } from "@/components/ui/CustomTab";
import AccountSettings from "./AccountSettings";
import NotificationSettings from "./NotificationSettings";
import SecuritySettings from "./SecuritySettings";
import SellerStats from "./SellerStats";

export default function Profile() {
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);

  const tabOptions = [
    {
      value: "profile",
      label: "Profile Info",
      content: <ProfileInfo isEditing={isEditing} />,
    },
    {
      value: "account",
      label: "Account",
      content: <AccountSettings />,
    },
    {
      value: "notifications",
      label: "Notifications",
      content: <NotificationSettings />,
    },
    {
      value: "security",
      label: "Security",
      content: <SecuritySettings />,
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Sidebar */}
      <div className="lg:col-span-1 space-y-6">
        {/* Profile Card */}
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-white text-2xl font-bold">JD</span>
              </div>
              <h3 className="font-bold text-gray-900">John Doe</h3>
              <p className="text-sm text-gray-600 mb-2">Green Valley Farm</p>
              <div className="inline-flex items-center gap-1 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
                Verified Seller
              </div>
            </div>

            {/* Edit Button */}
            <Button
              onClick={() => setIsEditing(!isEditing)}
              className="w-full mt-4"
              variant={isEditing ? "default" : "outline"}
            >
              <Edit2 className="h-4 w-4 mr-2" />
              {isEditing ? "Save Changes" : "Edit Profile"}
            </Button>
          </CardContent>
        </Card>

        {/* Stats */}
        <SellerStats />
      </div>

      {/* Main Content */}
      <div className="lg:col-span-3">
        <CustomTabs
          defaultValue="profile"
          options={tabOptions}
          onValueChange={setActiveTab}
          className="border-none"
          triggerClassName="max-w-fit"
        />
      </div>
    </div>
  );
}
