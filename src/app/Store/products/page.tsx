"use client";

import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";
import { useSearchParams } from "next/navigation";
import HeaderBanner from "@/app/_components/HeaderBanner";
import { Tag } from "lucide-react";

type Product = {
  _id: string;
  title: string;
  imageCover: string;
  price: number;
};

type Brand = {
  _id: string;
  name: string;
  image: string;
};

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const brandId = searchParams.get("brand");

  const [products, setProducts] = useState<Product[]>([]);
  const [brand, setBrand] = useState<Brand | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const productsRes = await axiosInstance.get(
          brandId ? `/products?brand=${brandId}` : `/products`
        );

        setProducts(productsRes.data.data);

        if (brandId) {
          const brandRes = await axiosInstance.get(`/brands/${brandId}`);
          setBrand(brandRes.data.data);
        } else {
          setBrand(null);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [brandId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96 text-gray-500">
        Loading products...
      </div>
    );
  }

  return (
    <>
      {/* HEADER */}
      <div className="bg-gradient-to-r from-[#7c3aed] to-[#a78bfa]">
        <HeaderBanner
         title="Products"
  subtitle={`Shop ${brand?.name || "All"} Products`}
  icon={brand?.image ? <img src={brand.image} className="w-10 h-10" /> : <Tag />}
  brandName={brand?.name}
          
        />
        
      </div>

      {/* PRODUCTS */}
      <div className="p-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {products.map((p) => (
            <div key={p._id} className="border p-4 rounded-lg">
              <img src={p.imageCover} className="h-32 mx-auto" />
              <h3 className="mt-2 text-sm">{p.title}</h3>
              <p className="text-violet-600">{p.price} EGP</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}