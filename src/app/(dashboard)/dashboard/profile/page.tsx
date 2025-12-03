import { AccountView } from "@/components/dashboard/account/AccountView";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "FHFL | Dashboard Overview",
  description: "View system summary",
};

export default function ProfilePage() {
  return <AccountView />;
}
