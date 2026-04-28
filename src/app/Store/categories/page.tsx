

import HeaderBanner from "@/app/_components/HeaderBanner";
import CategoriesSection from "@/app/_components/ShopByCategory/ShopByCategory";
import { Layers } from "lucide-react";

export default function CategoriesPage() {
  return (
    <>
    <div className="bg-gradient-to-br from-[#16A34A] via-[#22C55E] to-[#4ADE80] text-white">
  
        <HeaderBanner
       title="All Categories"
  subtitle="Browse our wide range of product categories"
  icon={<Layers />}
  basePath={{ label: "Categories", href: "/Store/categories" }}
        
      />
    </div>
     

      
      <div>
       
    <CategoriesSection/>

       
      </div>
    </>
  );
}