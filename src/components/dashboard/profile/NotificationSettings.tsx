"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Bell,
  Mail,
  MessageSquare,
  TrendingUp,
  AlertCircle,
  Smartphone,
} from "lucide-react";

export default function NotificationSettings() {
  const notificationOptions = [
    {
      title: "Email Notifications",
      description: "Receive notifications via email",
      icon: Mail,
    },
    {
      title: "SMS Notifications",
      description: "Get SMS alerts for important updates",
      icon: Smartphone,
    },
    {
      title: "Push Notifications",
      description: "Browser push notifications",
      icon: Bell,
    },
    {
      title: "Ad Performance",
      description: "Weekly reports on your ad performance",
      icon: TrendingUp,
    },
    {
      title: "New Messages",
      description: "Instant alerts for new buyer messages",
      icon: MessageSquare,
    },
    {
      title: "Price Alerts",
      description: "Get notified about similar product prices",
      icon: AlertCircle,
    },
  ];

  return (
    <Card>
      <CardContent className="p-6 space-y-4">
        <div className="mb-4">
          <h3 className="font-semibold text-gray-900 mb-1">
            Notification Settings
          </h3>
          <p className="text-sm text-gray-600">
            Control how you receive notifications
          </p>
        </div>

        {notificationOptions.map((item, index) => (
          <label
            key={index}
            className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-100 rounded-lg">
                <item.icon className="h-4 w-4 text-gray-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">{item.title}</p>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            </div>
            <input
              type="checkbox"
              defaultChecked
              className="w-5 h-5 text-emerald-600 rounded focus:ring-emerald-500"
            />
          </label>
        ))}
      </CardContent>
    </Card>
  );
}
