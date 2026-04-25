
import HeaderBanner from "@/app/_components/HeaderBanner";
import { Tag } from "lucide-react";

export default function BrandsPage() {
  return (
    <>
    <div className="bg-red-500">
 <HeaderBanner
        title="Top Brands"
        subtitle="Shop from your favorite brands"
        icon={<Tag />}
       
      />
    </div>
     

      {/* باقي الصفحة */}
        <div>
        <h2>Brands</h2>
       
      </div>
    </>
  );
}


