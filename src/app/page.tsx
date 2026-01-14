import Footer from "@/components/website/footer/Footer";
import Header from "@/components/website/header/Header";
import PageBackgroundWrapper from "@/components/website/section";
import CategoriesSection from "@/components/website/section/Categories";
import { FeaturedProducts } from "@/components/website/section/featured-products";
import { HeroSection } from "@/components/website/section/hero";

export default function Home() {
  return (
    <PageBackgroundWrapper>
      <div className="sm:pt-28 pt-14">
        <Header />
        <HeroSection />
        <CategoriesSection />
        <FeaturedProducts />
        <Footer />
      </div>
    </PageBackgroundWrapper>
  );
}
