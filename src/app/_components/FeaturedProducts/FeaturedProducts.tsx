"use client";
import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";
import { Heart, RefreshCw, Eye, Plus, Star } from "lucide-react";

type Product = {
  _id: string;
  title: string;
  imageCover: string;
  price: number;
  ratingsAverage: number;
  ratingsQuantity: number;
  priceAfterDiscount: number;
  category: {
    name: string;
  };
};

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  //   getProducts
  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axiosInstance.get("/products");
        setProducts(res.data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  //   Skelton
  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-5 gap-6 px-4 md:px-10 py-10  max-w-7xl mx-auto pt-20">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="h-80 bg-gray-200 rounded-xl animate-pulse"
          ></div>
        ))}
      </div>
    );
  }
  //   renderStars
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
    <div className="px-4 md:px-10 py-10 max-w-7xl mx-auto pt-20">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-[5px] h-8 bg-[#009966] rounded"></div>
        <h2 className="text-3xl font-bold">
          Featured <span className="text-green-600">Products</span>
        </h2>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white border rounded-xl p-3 relative group transition-all duration-300 hover:-translate-y-2 hover:shadow-xl relative"
          >
            {/* Icons */}
            <div className="absolute top-3 right-3 flex flex-col gap-2 transition-all duration-300">
              <button
                className="w-8 h-8 bg-white rounded-full shadow flex items-center justify-center
                hover:text-red-600 hover:bg-white hover:scale-110 transition cursor-pointer"
              >
                <Heart size={16} />
              </button>

              <button
                className="w-8 h-8 bg-white rounded-full shadow flex items-center justify-center
                hover:text-green-600 hover:bg-white hover:scale-110 transition cursor-pointer"
              >
                <RefreshCw size={16} />
              </button>

              <button
                className="w-8 h-8 bg-white rounded-full shadow flex items-center justify-center
                hover:text-green-600 hover:bg-white hover:scale-110 transition cursor-pointer"
              >
                <Eye size={16} />
              </button>
            </div>
            {/*  Image */}
            {product.priceAfterDiscount && (
              <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md shadow">
                -
                {Math.round(
                  ((product.price - product.priceAfterDiscount) /
                    product.price) *
                    100,
                )}
                %
              </div>
            )}
            <img
              src={product.imageCover}
              className="w-full h-52 object-contain mb-3 "
            />

            {/*  Category */}
            <p className="text-gray-500 text-sm">{product.category.name}</p>

            {/*  Title */}
            <h3 className="font-medium line-clamp-2 cursor-pointer">
              {product.title}
            </h3>

            {/*  Rating */}
            <div className="flex items-center gap-2 mt-1 text-sm">
              <div className="flex">{renderStars(product.ratingsAverage)}</div>
              <span className="text-gray-500 text-sm">
                {product.ratingsAverage}
              </span>
              <span className="text-gray-500">({product.ratingsQuantity})</span>
            </div>

            {/*  Price + Add */}
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
  );
}
