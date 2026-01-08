import Footer from "@/components/website/footer/Footer";
import Header from "@/components/website/header/Header";
import ProductListingSection from "@/components/website/section/product-listings/ProductListingSection";

export default function ProductList() {
  return (
    <div className="pt-28 bg-neutral-50 ">
      <Header />
      <ProductListingSection />
      <Footer />
    </div>
  );
}
