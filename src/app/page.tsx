import Footer from "@/components/website/footer/Footer";
import Header from "@/components/website/header/Header";
import { BecomeSeller } from "@/components/website/section/become-seller";
import { FeaturedFarmers } from "@/components/website/section/featured-farmers";
import { FeaturedProducts } from "@/components/website/section/featured-products";
import { HeroSection } from "@/components/website/section/hero";

export default function Home() {
  return (
    <>
      <Header />
      <HeroSection />
      <FeaturedProducts/>
      {/* <FeaturedFarmers/> */}
      <BecomeSeller/>
      <Footer/>
    </>
  );
}
