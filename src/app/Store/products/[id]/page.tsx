"use client";

import axiosInstance from "@/lib/axios";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Car, ShoppingCart, Star } from "lucide-react";

interface ProductDetails {
  sold: number;
  images: string[];
  ratingsQuantity: number;
  _id: string;
  id: string;
  title: string;
  slug: string;
  description: string;
  quantity: number;
  price: number;
  imageCover: string;

  category: {
    _id: string;
    name: string;
    slug: string;
    image: string;
  };

  brand: {
    _id: string;
    name: string;
    slug: string;
    image: string;
  };

  ratingsAverage: number;
  createdAt: string;
  updatedAt: string;
  __v: number;

  reviews: {
    _id: string;
    review: string;
    rating: number;
    product: string;
    user: {
      _id: string;
      name: string;
    };
    createdAt: string;
    updatedAt: string;
    __v: number;
  }[];
}

interface ProductDetailsResponse {
  data: ProductDetails;
}

/* ================= COMPONENT ================= */

export default function ProductDetailsPage() {
  const { id } = useParams<{ id: string }>();

  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
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

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await axiosInstance.get<ProductDetailsResponse>(
          `/products/${id}`,
        );

        setProduct(res.data.data);
        setSelectedImage(res.data.data.imageCover);
      } catch (err) {
        console.log(err);
      }
    };

    if (id) getProduct();
  }, [id]);

  /* loading */
  if (!product || !selectedImage) {
    return <div className="text-center py-20">Loading product...</div>;
  }

  const images = product.images?.length ? product.images : [product.imageCover];

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex flex-col lg:flex-row gap-10">
        {/* LEFT */}
        <div className="lg:w-1/4">
          <img
            src={selectedImage}
            className="w-full h-[350px] object-contain rounded-xl border"
          />

          <div className="flex gap-3 mt-4 overflow-x-auto no-scrollbar">
            {images.map((img, i) => (
              <img
                key={i}
                src={img}
                onClick={() => setSelectedImage(img)}
                className={`w-20 h-20 object-cover rounded-lg border cursor-pointer transition
                  ${
                    selectedImage === img
                      ? "border-violet-600 scale-105"
                      : "border-gray-200"
                  }
                `}
              />
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <div className="lg:w-3/4">
          <div className="flex items-center gap-3 mt-3">
            {/* Category */}
            <div className="flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1 rounded-full">
              <span className="text-sm font-medium">
                {product.category.name}
              </span>
            </div>

            {/* Brand */}
            <div className="flex items-center gap-2 bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
              <span className="text-sm font-medium">{product.brand.name}</span>
            </div>
          </div>
          <h1 className="text-3xl font-bold py-4">{product.title}</h1>

          <div className="flex items-center gap-2 mt-1 text-sm">
            <div className="flex">{renderStars(product.ratingsAverage)}</div>

            <span className="text-gray-500 text-sm">
              {product.ratingsAverage}
            </span>

            <span className="text-gray-500">
              ({product.ratingsQuantity} reviews)
            </span>
          </div>

          <p className="text-2xl font-bold mt-5 text-black">
            {product.price} EGP
          </p>
          <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1 rounded-full border border-green-100">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>

            <span className="text-sm font-medium">In Stock</span>
          </div>
          <hr className="border-t border-gray-200 my-4" />
          <p className="mt-5 text-gray-600">{product.description}</p>
          <div className="mt-6">
            {/* Title */}
            <p className="text-gray-700 font-medium mb-2">Quantity</p>

            {/* Counter */}
            <div className="flex items-center gap-3">
              <button className="w-8 h-8 flex items-center justify-center border rounded-md hover:bg-gray-100">
                -
              </button>

              <span className="w-10 text-center font-medium">1</span>

              <button className="w-8 h-8 flex items-center justify-center border rounded-md hover:bg-gray-100">
                +
              </button>
            </div>

            {/* Stock */}
            <p className="text-sm text-gray-500 mt-2">173 available</p>
          </div>
          <div className="mt-6 p-4 border rounded-lg bg-gray-50 flex justify-between items-center">
            <p className="text-gray-700 text-lg">Total Price</p>

            <p className="text-2xl font-bold text-green-600">2999.00 EGP</p>
          </div>
          <div className="mt-8 flex gap-4 w-full">
            {/* Add to Cart */}
            <button className="flex-1 flex items-center justify-center gap-2 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition">
              <span>
                <ShoppingCart />
              </span>
              <span>Add to Cart</span>
            </button>

            {/* Buy Now */}
            <button className="flex-1 flex items-center justify-center gap-2 bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition">
              <span>Buy Now</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
