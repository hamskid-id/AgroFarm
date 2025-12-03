"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import CustomInputField from "@/components/ui/custom-input-field";
import { FormFieldType } from "@/types";
import { Shield, CheckCircle, Clock } from "lucide-react";

export default function SecuritySettings() {
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const recentLogins = [
    {
      device: "Chrome on Windows",
      location: "Lagos, Nigeria",
      time: "2 hours ago",
      current: true,
    },
    {
      device: "Safari on iPhone",
      location: "Lagos, Nigeria",
      time: "1 day ago",
      current: false,
    },
    {
      device: "Chrome on Windows",
      location: "Abuja, Nigeria",
      time: "3 days ago",
      current: false,
    },
  ];

  return (
    <Card>
      <CardContent className="p-6 space-y-6">
        {/* Change Password */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-4">Change Password</h3>
          <div className="space-y-4">
            <CustomInputField
              name="currentPassword"
              label="Current Password"
              fieldType={FormFieldType.PASSWORD}
              placeholder="Enter current password"
              className="w-full"
            />
            <CustomInputField
              name="newPassword"
              label="New Password"
              fieldType={FormFieldType.PASSWORD}
              placeholder="Enter new password"
              className="w-full"
            />
            <CustomInputField
              name="confirmPassword"
              label="Confirm New Password"
              fieldType={FormFieldType.PASSWORD}
              placeholder="Confirm new password"
              className="w-full"
            />
            <Button
              onClick={() => setIsChangingPassword(!isChangingPassword)}
              className="w-full"
            >
              Update Password
            </Button>
          </div>
        </div>

        {/* Two-Factor Authentication */}
        <div className="pt-6 border-t">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Shield className="h-5 w-5 text-blue-600" />
            Two-Factor Authentication
          </h3>
          <div className="p-4 bg-gray-50 border rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">2FA Status</p>
                <p className="text-sm text-gray-600">Not enabled</p>
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700">
                Enable 2FA
              </Button>
            </div>
          </div>
        </div>

        {/* Recent Login Activity */}
        <div className="pt-6 border-t">
          <h3 className="font-semibold text-gray-900 mb-4">
            Recent Login Activity
          </h3>
          <div className="space-y-3">
            {recentLogins.map((login, index) => (
              <div
                key={index}
                className="p-4 border rounded-lg flex items-center justify-between hover:bg-gray-50"
              >
                <div>
                  <p className="font-medium text-gray-900 flex items-center gap-2">
                    {login.device}
                    {login.current && (
                      <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full flex items-center gap-1">
                        <CheckCircle className="h-3 w-3" />
                        Current
                      </span>
                    )}
                  </p>
                  <p className="text-sm text-gray-600 flex items-center gap-2">
                    <Clock className="h-3 w-3" />
                    {login.location} • {login.time}
                  </p>
                </div>
                {login.current && (
                  <Button variant="outline" size="sm">
                    Logout
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
