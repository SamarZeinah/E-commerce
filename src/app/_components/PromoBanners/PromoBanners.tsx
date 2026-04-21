"use client";
import { ArrowRight } from "lucide-react";
const PromoBanners = () => {
  return (
    <div className="px-4 md:px-10 pt-20 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1 */}
        <div className="bg-gradient-to-r from-[#00BC7D] to-[#007A55] text-white p-6 md:p-8 rounded-2xl relative overflow-hidden hover:scale-[1.02] transition">
          <h3 className="inline-flex items-center gap-2 text-md font-semibold bg-white/20 backdrop-blur-md text-white px-3 py-2 rounded-full w-fit">
            🔥 Deal of the Day
          </h3>
          <h2 className="text-4xl md:text-3xl font-bold mt-2">
            Fresh Organic Fruits
          </h2>

          <p className="mt-2 text-md opacity-90">
            Get up to 40% off on selected organic fruits
          </p>

          <div className="mt-4 flex items-center gap-3">
            <span className="text-4xl font-bold">40% OFF</span>
            <span className="text-md">
              Use code:<span className="font-bold">ORGANIC40</span>{" "}
            </span>
          </div>
          <button className="mt-5 inline-flex items-center gap-2 bg-white text-green-600 px-5 py-2 rounded-full font-medium transition-all duration-300 hover:bg-gray-100 hover:translate-x-1">
            Shop Now
            <ArrowRight />
          </button>
        </div>

        {/* Card 2 */}
        <div className="bg-gradient-to-r from-[#FF8904] to-[#FF2056] text-white p-6 md:p-8 rounded-2xl relative overflow-hidden hover:scale-[1.02] transition">
          <h3 className="inline-flex items-center gap-2 text-md font-semibold bg-white/20 backdrop-blur-md text-white px-3 py-2 rounded-full w-fit">
            ✨ New Arrivals
          </h3>

          <h2 className="text-4xl md:text-3xl font-bold mt-2">
            Exotic Vegetables
          </h2>

          <p className="mt-2 text-md opacity-90">
            Discover our latest collection of premium vegetables
          </p>

          <div className="mt-4 flex items-center gap-3">
            <span className="text-4xl font-bold">25% OFF</span>
            <span className="text-md">
              Use code:<span className="font-bold">FRESH25</span>{" "}
            </span>
          </div>
          <button className="mt-5 inline-flex items-center gap-2 bg-white text-[#FF2056] px-5 py-2 rounded-full font-medium transition-all duration-300 hover:bg-gray-100 hover:translate-x-2">
            Explore Now
            <ArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};
export default PromoBanners;
