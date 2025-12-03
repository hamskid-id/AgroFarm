"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, AlertTriangle } from "lucide-react";

export default function AccountSettings() {
  return (
    <Card>
      <CardContent className="p-6 space-y-6">
        {/* Account Status */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-4">Account Status</h3>
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-6 w-6 text-green-600" />
              <div>
                <p className="font-medium text-green-900">Account Verified</p>
                <p className="text-sm text-green-700">
                  Your account is fully verified
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Email Preferences */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-4">
            Email Preferences
          </h3>
          <div className="space-y-3">
            <label className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
              <div>
                <p className="font-medium text-gray-900">
                  New Message Notifications
                </p>
                <p className="text-sm text-gray-600">
                  Get notified when buyers message you
                </p>
              </div>
              <input
                type="checkbox"
                defaultChecked
                className="w-5 h-5 text-emerald-600 rounded focus:ring-emerald-500"
              />
            </label>

            <label className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
              <div>
                <p className="font-medium text-gray-900">Marketing Emails</p>
                <p className="text-sm text-gray-600">
                  Receive tips and updates from AgroFarm
                </p>
              </div>
              <input
                type="checkbox"
                defaultChecked
                className="w-5 h-5 text-emerald-600 rounded focus:ring-emerald-500"
              />
            </label>
          </div>
        </div>

        {/* Danger Zone */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2 text-red-600">
            <AlertTriangle className="h-5 w-5" />
            Danger Zone
          </h3>
          <Button
            variant="outline"
            className="w-full border-red-300 text-red-600 hover:bg-red-50 hover:border-red-400"
          >
            Deactivate Account
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
