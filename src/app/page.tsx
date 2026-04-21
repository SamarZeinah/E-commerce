import FeaturedProducts from "./_components/FeaturedProducts/FeaturedProducts";
import HeroSlider from "./_components/Hero-Slider/HeroSlider"
import NewsletterSection from "./_components/NewsletterSection/NewsletterSection";
import PromoBanners from "./_components/PromoBanners/PromoBanners";
import CategoriesSection from "./_components/ShopByCategory/ShopByCategory";
import StoreFeatures from "./_components/StoreFeatures/StoreFeatures";

export default function Home() {
  return (
    <>
    <HeroSlider/>
    <StoreFeatures/>
    <CategoriesSection/>
        <PromoBanners/>
    <FeaturedProducts/>  
    <NewsletterSection/>
    </>
  );
}
