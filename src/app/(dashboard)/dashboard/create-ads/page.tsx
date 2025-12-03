import { AccountView } from "@/components/dashboard/account/AccountView";
import { PostAdView } from "@/components/dashboard/post-ad/PostAdView";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "FHFL | Dashboard Overview",
  description: "View system summary",
};

export default function CreateAdsPage() {
  return <PostAdView />;
}
