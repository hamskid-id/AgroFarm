"use client";

import { cn } from "@/lib/utils";
import { useRouter } from "nextjs-toploader/app";
import BrandLogo from "../../../public/LOGO.svg";
import { CustomImage } from "../ui/custom-image";

interface BrandProps {
  style?: string;
}

export const Brand: React.FC<BrandProps> = ({ style }) => {
  const router = useRouter();
  const navigateToHome = () => router.push("/");
  return (
    <CustomImage
      src={BrandLogo}
      style={cn("w-[96px] h-[71px]", style)}
      clickFunc={navigateToHome}
    />
  );
};
