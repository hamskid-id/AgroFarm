import { OverviewView } from "@/components/dashboard/overview/Overview";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "FHFL | Dashboard Overview",
  description: "View system summary",
};

export default function DashboardPage() {
  return <OverviewView />;
}
