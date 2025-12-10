"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const SecurityTab = () => {
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  return (
    <div className="space-y-6">
      {/* Change Password */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-4">Change Password</h3>
        <div className="grid grid-cols-2 gap-4">
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
        </div>
        <div className="flex justify-end items-center">
          <Button
            type="button"
            onClick={() => alert("Password updated!")}
            className="text-center mt-4 w-[300px] ms-auto bg-emerald-600 hover:bg-emerald-700"
          >
            Update Password
          </Button>
        </div>
      </div>
    </div>
  );
};
