
"use client";

import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";
import HeaderBanner from "@/app/_components/HeaderBanner";
import { Tag, Heart, RefreshCw, Eye, Plus, Star, Filter } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Oval } from "react-loader-spinner";
import { useWishlist } from "@/context/WishlistContext";

type Product = {
  _id: string;
  title: string;
  imageCover: string;
  price: number;
  ratingsAverage: number;
  ratingsQuantity: number;
  priceAfterDiscount: number;
  category: { name: string };
};

type Brand = {
  _id: string;
  name: string;
  image: string;
};

type Category = {
  _id: string;
  name: string;
  image: string;
};

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const brandId = searchParams.get("brand");
  const categoryId = searchParams.get("category");

  const [products, setProducts] = useState<Product[]>([]);
  const [brand, setBrand] = useState<Brand | null>(null);
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  

const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();


  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);

        let url = "/products";
        if (brandId) url = `/products?brand=${brandId}`;
        if (categoryId) url = `/products?category[in]=${categoryId}`;

        const res = await axiosInstance.get(url);
        setProducts(res.data.data);

        if (brandId) {
          const brandRes = await axiosInstance.get(`/brands/${brandId}`);
          setBrand(brandRes.data.data);
        } else {
          setBrand(null);
        }

        if (categoryId) {
          const catRes = await axiosInstance.get(`/categories/${categoryId}`);
          setCategory(catRes.data.data);
        } else {
          setCategory(null);
        }

      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [brandId, categoryId]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-40">
        <Oval
          height={70}
          width={70}
          color={categoryId ? "#16A34A" : "#7c3aed"}
          secondaryColor={categoryId ? "#4ADE80" : "#a78bfa"}
          strokeWidth={3}
          ariaLabel="loading-products"
          visible={true}
        />
        <p className="mt-4 text-gray-500 text-sm">Loading products...</p>
      </div>
    );
  }

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => {
      const fillPercent = Math.max(0, Math.min(1, rating - i));
      return (
        <div key={i} className="relative">
          <Star className="text-gray-300" />
          <div
            className="absolute top-0 left-0 overflow-hidden"
            style={{ width: `${fillPercent * 100}%` }}
          >
            <Star className="text-yellow-400 fill-yellow-400" />
          </div>
        </div>
      );
    });
  };

  return (
    <>
      
      <div  className={`${
  categoryId
    ? "bg-gradient-to-br from-[#16A34A] via-[#22C55E] to-[#4ADE80]"
    : brandId
    ? "bg-gradient-to-r from-[#7c3aed] to-[#a78bfa]"
    : "bg-gradient-to-br from-[#16A34A] via-[#22C55E] to-[#4ADE80]" // ← Shop العادية أخضر
}`}>
        <HeaderBanner
          title={
            category?.name ?? brand?.name ?? "All Products"
          }
          subtitle={
            category
              ? `Browse products in ${category.name}`
              : brand
              ? `Shop ${brand.name} Products`
              : "Explore our complete product collection"
          }
          icon={
            category?.image ? (
              <img src={category.image} alt={category.name} className="w-10 h-10 object-cover rounded-lg" />
            ) : brand?.image ? (
              <img src={brand.image} alt={brand.name} className="w-10 h-10" />
            ) : (
              <Tag />
            )
          }
          // Breadcrumb
          basePath={
      categoryId
        ? { label: "Categories", href: "/Store/categories" }
        : brandId
        ? { label: "Brands", href: "/Store/brands" }
        : { label: "Shop", href: "/Store/products" } 
    }
          brandName={brand?.name}
          categoryName={category?.name}
        />
      </div>

      <div className="px-4 md:px-10 py-10 max-w-7xl mx-auto pt-10">
        <div className="flex flex-col gap-2">
          <div className="flex items-center flex-wrap gap-3">

            {/* Active Filters */}
            {(brandId || categoryId) && (
              <div className="flex items-center gap-2 font-medium">
                <Filter size={16} />
                <span>Active Filters:</span>
              </div>
            )}

            {/* Brand chip */}
            {brandId && (
              <div className="flex items-center gap-2 bg-violet-100 text-violet-700 px-3 py-1 rounded-full cursor-pointer hover:bg-violet-200 transition-all duration-200">
                <span className="font-medium">{brand?.name || "Brand"}</span>
                <button
                  onClick={() => router.push("/Store/brands")}
                  className="ml-1 text-violet-500 font-bold"
                >
                  ✕
                </button>
              </div>
            )}

            {/* Category chip */}
            {categoryId && (
              <div className="flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full cursor-pointer hover:bg-green-200 transition-all duration-200">
                <span className="font-medium">{category?.name || "Category"}</span>
                <button
                  onClick={() => router.push("/Store/categories")}
                  className="ml-1 text-green-500 font-bold"
                >
                  ✕
                </button>
              </div>
            )}

            {/* Clear all */}
            {(brandId || categoryId) && (
              <button
                onClick={() => router.push(brandId ? "/Store/brands" : "/Store/categories")}
                className="text-red-500 hover:underline cursor-pointer"
              >
                Clear all
              </button>
            )}
          </div>

          <div className="text-gray-500 text-sm py-5">
            Showing {products.length} products
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white border rounded-xl p-3 relative group transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="absolute top-3 right-3 flex flex-col gap-2">
                {/* <button className="w-8 h-8 bg-white rounded-full shadow flex items-center justify-center hover:text-red-600 hover:scale-110 transition cursor-pointer">
                  <Heart size={16} />
                </button> */}
               <button
  onClick={() =>
    isInWishlist(product._id)
      ? removeFromWishlist(product._id)
      : addToWishlist(product._id)
  }
  className="w-8 h-8 bg-white rounded-full shadow flex items-center justify-center hover:scale-110 transition cursor-pointer"
>
  <Heart
    size={16}
    className={
      isInWishlist(product._id)
        ? "fill-red-500 text-red-500"  
        : "text-gray-400"              
    }
  />
</button>
                <button className="w-8 h-8 bg-white rounded-full shadow flex items-center justify-center hover:text-green-600 hover:scale-110 transition cursor-pointer">
                  <RefreshCw size={16} />
                </button>
                <button className="w-8 h-8 bg-white rounded-full shadow flex items-center justify-center hover:text-green-600 hover:scale-110 transition cursor-pointer">
                  <Eye size={16} />
                </button>
              </div>

              {product.priceAfterDiscount && product.priceAfterDiscount < product.price ? (
                <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md shadow">
                  -{Math.round(((product.price - product.priceAfterDiscount) / product.price) * 100)}%
                </div>
              ) : null}

              <img src={product.imageCover} className="w-full h-52 object-contain mb-3" />
              <p className="text-gray-500 text-sm">{product.category.name}</p>
              <h3 className="font-medium line-clamp-2 cursor-pointer">{product.title}</h3>

              <div className="flex items-center gap-2 mt-1 text-sm">
                <div className="flex">{renderStars(product.ratingsAverage)}</div>
                <span className="text-gray-500 text-sm">{product.ratingsAverage}</span>
                <span className="text-gray-500">({product.ratingsQuantity})</span>
              </div>

              <div className="flex justify-between items-center mt-3">
                <span className="font-bold">{product.price} EGP</span>
                <button className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center hover:scale-110 transition cursor-pointer">
                  <Plus />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}