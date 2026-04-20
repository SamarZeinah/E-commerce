"use client";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import axiosInstance from "@/lib/axios";

type Category = {
  _id: string;
  name: string;
  image: string;
};

//  Skeleton Component
const CategoriesSkeleton = () => {
  return (
    <div className="px-4 md:px-10 py-10 max-w-7xl mx-auto p-4">
      {/* Header skeleton */}
      <div className="flex justify-between items-center mb-6">
        <div className="h-6 w-40 bg-gray-300 rounded animate-pulse"></div>
        <div className="h-4 w-32 bg-gray-300 rounded animate-pulse"></div>
      </div>

      {/* Grid skeleton */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="flex flex-col items-center">
            <div className="flex flex-col items-center">
              <div className="w-40 h-40 bg-gray-200 rounded-xl flex flex-col items-center justify-center animate-pulse">
                <div className="w-20 h-20 rounded-full bg-gray-300"></div>
                <div className="h-3 w-20 bg-gray-300 rounded mt-3"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const CategoriesSection = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await axiosInstance.get("/categories");
        setCategories(res.data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getCategories();
  }, []);

  if (loading) return <CategoriesSkeleton />;

  return (
    <div className="px-4 md:px-10 pt-20 max-w-7xl mx-auto p-4">
      {/*  Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-[5px] h-8 bg-[#009966] rounded"></div>

          <h2 className="text-2xl md:text-3xl font-bold">
            Shop By <span className="text-[#009966]">Category</span>
          </h2>
        </div>

        <button className="group flex items-center gap-2 text-[#009966] font-medium transition-transform duration-300 hover:translate-x-2">
          View All Categories
          <ArrowRight />
        </button>
      </div>

      {/*  Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 ">
        {categories.map((cat) => (
          <div
            key={cat._id}
            className="bg-white rounded-xl shadow hover:shadow-lg transition p-4 text-center cursor-pointer flex flex-col items-center"
          >
            <img
              src={cat.image}
              alt={cat.name}
              className="w-24 h-24 object-cover rounded-full mb-3"
            />
            <h3 className="text-sm font-medium">{cat.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesSection;
