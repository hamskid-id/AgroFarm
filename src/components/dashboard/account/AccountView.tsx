"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { CustomTabs } from "@/components/ui/CustomTab";
import { ProfileTab } from "./ProfileTab";
import { SecurityTab } from "./SecurityTab";
import { NotificationsTab } from "./NotificationsTab";
import { SettingsTab } from "./SettingsTab";
import { VerificationTab } from "./VerificationTab";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";

export const AccountView = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const isLoading = false;

  const renderTabContent = (content: React.ReactNode) => {
    if (isLoading) {
      return <LoadingSpinner loadingText="Fetching Details" />;
    }
    return content;
  };

  const tabOptions = [
    {
      value: "profile",
      label: "Profile",
      content: renderTabContent(<ProfileTab />),
    },
    {
      value: "verification",
      label: "Verification",
      content: renderTabContent(<VerificationTab />),
    },
    {
      value: "security",
      label: "Security",
      content: renderTabContent(<SecurityTab />),
    },
    {
      value: "notifications",
      label: "Notifications",
      content: renderTabContent(<NotificationsTab />),
    },
    {
      value: "settings",
      label: "Settings",
      content: renderTabContent(<SettingsTab />),
    },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-md font-bold text-gray-900">Account Settings</h2>

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
