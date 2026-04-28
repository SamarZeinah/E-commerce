
"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, FolderOpen, Tag } from "lucide-react";
import axiosInstance from "@/lib/axios";
import Link from "next/link";
import HeaderBanner from "@/app/_components/HeaderBanner";

type Subcategory = {
  _id: string;
  name: string;
  category: string;
};

type Category = {
  _id: string;
  name: string;
  image: string;
};

export default function SubcategoriesPage() {
  const { id } = useParams();
  const router = useRouter();
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        // جيب بيانات الكاتيجوري نفسها
        const catRes = await axiosInstance.get(`/categories/${id}`);
        setCategory(catRes.data.data);

        // جيب الـ subcategories
        const subRes = await axiosInstance.get(`/categories/${id}/subcategories`);
        setSubcategories(subRes.data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [id]);

  if (loading) return (
    <div className="flex items-center justify-center h-40">
      <div className="w-8 h-8 border-4 border-[#009966] border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <>
      {/* Header Banner */}
   

      <div className="bg-gradient-to-br from-[#16A34A] via-[#22C55E] to-[#4ADE80] text-white">
  <HeaderBanner
    title={category?.name ?? ""}
    subtitle="Choose a subcategory to browse products"
    icon={
      category?.image ? (
        <img src={category.image} alt={category.name} className="w-10 h-10 object-cover rounded-lg" />
      ) : (
        <Tag size={28} />
      )
    }
    basePath={{ label: "Categories", href: "/Store/categories" }}
    categoryName={category?.name}
  />
</div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Back Button */}
        <button
          onClick={() => router.push("/Store/categories")}
          className="flex items-center gap-2 text-gray-600 hover:text-[#009966] transition mb-6"
        >
          <ArrowLeft size={18} />
          <span>Back to Categories</span>
        </button>

        {/* Subcategories */}
        {subcategories.length === 0 ? (
          // Empty State
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center">
              <FolderOpen size={36} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-700">No Subcategories Found</h3>
            <p className="text-gray-400 text-sm">This category doesn't have any subcategories yet.</p>
            <button
              onClick={() => router.push("/Store/products")}
              className="mt-2 bg-[#009966] text-white px-6 py-2.5 rounded-full text-sm hover:bg-[#007a52] transition"
            >
              View All Products in {category?.name}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {subcategories.map((sub) => (
              <div
                key={sub._id}
                className="bg-white rounded-xl shadow hover:shadow-lg transition p-4 text-center cursor-pointer hover:text-[#009966] border border-transparent hover:border-[#009966]/20"
              >
                <h3 className="text-sm font-medium">{sub.name}</h3>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}