

import HeaderBanner from "@/app/_components/HeaderBanner";
import { Layers } from "lucide-react";

export default function CategoriesPage() {
  return (
    <>
    <div className="bg-red-500 text-white">
  
        <HeaderBanner
        title="All Categories"
        
        subtitle="Browse our wide range of product categories"
        icon={<Layers />}
        
      />
    </div>
     

      {/* باقي الصفحة */}
      <div>
        <h2>Categories</h2>
       
      </div>
    </>
  );
}