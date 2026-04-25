"use client";

import { useEffect, useState } from "react";
import HeaderBanner from "@/app/_components/HeaderBanner";
import { ArrowRight, Tag } from "lucide-react";
import axiosInstance from "@/lib/axios";
import { Oval } from "react-loader-spinner";
import Link from "next/link";

type Brand = {
  _id: string;
  name: string;
  slug: string;
  image: string;
};

// Loader Component
const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <Oval
        height={60}
        width={60}
        color="#7c3aed"
        secondaryColor="#c4b5fd"
        strokeWidth={3}
        ariaLabel="oval-loading"
        visible={true}
      />

      <p className="mt-4 text-sm text-gray-500">Loading brands...</p>
    </div>
  );
};

export default function BrandsPage() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getBrands = async () => {
      try {
        setLoading(true);

        const { data } = await axiosInstance.get("/brands");

        setBrands(data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getBrands();
  }, []);

  return (
    <>
      <div className="bg-gradient-to-br from-violet-600 via-violet-500 to-purple-400">
        <HeaderBanner
          title="Top Brands"
          subtitle="Shop from your favorite brands"
          icon={<Tag />}
        />
      </div>

      <div className="p-6 max-w-7xl mx-auto">
        {loading ? (
          <Loader />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
            {brands.map((brand) => (
              <div
                key={brand._id}
                className="group bg-white border border-gray-100 rounded-2xl p-4 text-center shadow-sm 
                hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer"
              >
                <div className="overflow-hidden rounded-xl">
                  <img
                    src={brand.image}
                    alt={brand.name}
                    className="w-full h-24 object-contain transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                <h3 className="mt-3 font-medium text-sm group-hover:text-violet-600 transition">
                  {brand.name}
                </h3>

                <Link
                  href={`/Store/products?brand=${brand._id}`}
                  className="mt-3 opacity-0 group-hover:opacity-100 transition-all duration-300 flex justify-center"
                >
                  <span className="text-xs text-violet-600 px-3 py-1 rounded-full hover:bg-violet-100 flex items-center gap-1 transition">
                    View Products
                    <ArrowRight
                      size={14}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </span>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
