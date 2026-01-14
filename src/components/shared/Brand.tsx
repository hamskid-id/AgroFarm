"use client";

import { cn } from "@/lib/utils";
import { useRouter } from "nextjs-toploader/app";
import BrandLogo from "../../../public/agroFarmLogo.webp";
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
      style={cn("w-[96px] h-[51px]", style)}
      imgStyle="object-contain"
      clickFunc={navigateToHome}
    />
  );
};
