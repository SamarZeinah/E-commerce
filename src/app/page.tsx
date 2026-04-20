import FeaturedProducts from "./_components/FeaturedProducts/FeaturedProducts";
import HeroSlider from "./_components/Hero-Slider/HeroSlider"
import CategoriesSection from "./_components/ShopByCategory/ShopByCategory";
import StoreFeatures from "./_components/StoreFeatures/StoreFeatures";

export default function Home() {
  return (
    <>
    <HeroSlider/>
    <StoreFeatures/>
    <CategoriesSection/>
    <FeaturedProducts/>  
    </>
  );
}
