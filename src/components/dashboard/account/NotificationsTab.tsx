"use client";

import React, { useState } from "react";
import { Bell, Phone, TrendingUp, AlertCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { notificationItems } from "@/components/constants/account";

export const NotificationsTab = () => {
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    adPerformance: true,
    priceAlerts: false,
  });

  return (
    <div className="space-y-4">
      <div className="mb-4">
        <h3 className="text-md font-semibold text-gray-900 mb-1">
          Notification Preferences
        </h3>
        <p className="text-sm text-gray-600">
          Control how you receive notifications
        </p>
      </div>

      {notificationItems.map((item) => (
        <Card key={item.key} className="shadow-none border border-gray-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <item.icon className="h-4 w-4 text-gray-600" />
                </div>
                <div>
                  <p className="font-medium text-sm text-gray-900">{item.title}</p>
                  <p className="text-[13px] text-gray-600">{item.desc}</p>
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
};
