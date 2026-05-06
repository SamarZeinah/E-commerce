"use client";

import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import axios from "axios";
import { Heart, Trash2, ShoppingCart, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function WishlistPage() {
  const { wishlist, removeFromWishlist, loading , initialized} = useWishlist();
  const { refreshCart } = useCart();
  const router = useRouter();

  const [addedId, setAddedId] = useState<string | null>(null);

  // ===== ADD TO CART =====
  const addToCart = async (productId: string) => {
    try {
      await axios.post(
        "https://ecommerce.routemisr.com/api/v2/cart",
        { productId },
        {
          headers: {
            token: localStorage.getItem("token") || "",
          },
        }
      );

      toast.success("Added to cart 🛒");

      setAddedId(productId);

      setTimeout(() => {
        setAddedId("view-" + productId);
      }, 1000);

      refreshCart();
    } catch (error) {
      toast.error("Failed to add ❌");
    }
  };

  // ===== SKELETON =====
  const WishlistSkeleton = () => (
    <div className="hidden md:block border rounded-xl overflow-hidden animate-pulse">
      <div className="grid grid-cols-12 px-6 py-3 bg-gray-100 border-b">
        <div className="col-span-6 h-4 bg-gray-200 rounded w-1/2"></div>
        <div className="col-span-2 h-4 bg-gray-200 rounded w-10 mx-auto"></div>
        <div className="col-span-2 h-4 bg-gray-200 rounded w-12 mx-auto"></div>
        <div className="col-span-2 h-4 bg-gray-200 rounded w-14 mx-auto"></div>
      </div>

      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="grid grid-cols-12 px-6 py-4 border-b">
          <div className="col-span-6 flex gap-4">
            <div className="w-16 h-16 bg-gray-200 rounded-lg" />
            <div className="space-y-2 w-full">
              <div className="h-3 bg-gray-200 rounded w-3/4" />
              <div className="h-3 bg-gray-200 rounded w-1/2" />
            </div>
          </div>

          <div className="col-span-2 flex justify-center">
            <div className="h-4 w-12 bg-gray-200 rounded" />
          </div>

          <div className="col-span-2 flex justify-center">
            <div className="h-4 w-16 bg-gray-200 rounded" />
          </div>

          <div className="col-span-2 flex justify-center gap-2">
            <div className="h-8 w-20 bg-gray-200 rounded" />
            <div className="h-8 w-8 bg-gray-200 rounded" />
          </div>
        </div>
      ))}
    </div>
  );

  const MobileSkeleton = () => (
    <div className="md:hidden space-y-4 animate-pulse">
      {[1, 2, 3].map((i) => (
        <div key={i} className="border rounded-xl p-4 flex gap-4">
          <div className="w-20 h-20 bg-gray-200 rounded-lg" />
          <div className="flex-1 space-y-2">
            <div className="h-3 bg-gray-200 rounded w-3/4" />
            <div className="h-3 bg-gray-200 rounded w-1/2" />

            <div className="flex justify-between mt-3">
              <div className="h-3 w-12 bg-gray-200 rounded" />
              <div className="h-3 w-16 bg-gray-200 rounded" />
            </div>

            <div className="flex gap-2 mt-3">
              <div className="h-8 flex-1 bg-gray-200 rounded" />
              <div className="h-8 w-8 bg-gray-200 rounded" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  // ===== LOADING STATE (IMPORTANT) =====
  if (loading || !initialized) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <WishlistSkeleton />
      <MobileSkeleton />
    </div>
  );
}



  // ===== EMPTY STATE =====
  if ( wishlist.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-40 gap-4">
        <Heart size={40} className="text-red-300" />
        <h2 className="text-gray-500 text-lg">Your wishlist is empty</h2>
        <button
          onClick={() => router.push("/Store/products")}
          className="bg-green-600 text-white px-6 py-2 rounded-full"
        >
          Browse Products
        </button>
      </div>
    );
  }

  // ===== MAIN UI =====
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">

      {/* HEADER */}
      <div className="flex items-center gap-3 mb-8">
        <Heart className="text-red-500" />
        <div>
          <h2 className="text-2xl font-bold">My Wishlist</h2>
          <p className="text-gray-400 text-sm">
            {wishlist.length} item{wishlist.length > 1 ? "s" : ""} saved
          </p>
        </div>
      </div>

      {/* ===== DESKTOP ===== */}
      <div className="hidden md:block border rounded-xl overflow-hidden">
        <div className="grid grid-cols-12 px-6 py-3 bg-gray-50 text-sm text-gray-500 border-b">
          <div className="col-span-6">Product</div>
          <div className="col-span-2 text-center">Price</div>
          <div className="col-span-2 text-center">Status</div>
          <div className="col-span-2 text-center">Actions</div>
        </div>

        {wishlist.map((product) => {
          const isAdded = addedId === product._id;
          const isView = addedId === "view-" + product._id;

          return (
            <div
              key={product._id}
              className="grid grid-cols-12 px-6 py-4 border-b items-center"
            >
              {/* product */}
              <div className="col-span-6 flex gap-4 items-center">
                <img
                  src={product.imageCover}
                  className="w-16 h-16 object-contain border rounded"
                />
                <div>
                  <h3 className="text-sm font-medium">{product.title}</h3>
                  <p className="text-xs text-gray-400">
                    {product.category?.name}
                  </p>
                </div>
              </div>

              {/* price */}
              <div className="col-span-2 text-center font-bold">
                {product.price} EGP
              </div>

              {/* status */}
              <div className="col-span-2 text-center text-green-600 text-sm">
                ● In Stock
              </div>

              {/* actions */}
              <div className="col-span-2 flex justify-center gap-2">
                <button
                  onClick={() =>
                    isView
                      ? router.push("/Store/cart")
                      : addToCart(product._id)
                  }
                  className={`px-3 py-2 rounded text-white text-xs flex items-center gap-1 ${
                    isView
                      ? "bg-blue-600"
                      : isAdded
                      ? "bg-green-500"
                      : "bg-green-600"
                  }`}
                >
                  <ShoppingCart size={14} />
                  {isView ? "View Cart" : isAdded ? "Added" : "Add"}
                </button>

                <button
                  onClick={() => removeFromWishlist(product._id)}
                  className="border p-2 rounded"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* ===== MOBILE ===== */}
      <div className="md:hidden space-y-4">
        {wishlist.map((product) => {
          const isAdded = addedId === product._id;
          const isView = addedId === "view-" + product._id;

          return (
            <div key={product._id} className="border rounded-xl p-4 flex gap-4">
              <img
                src={product.imageCover}
                className="w-20 h-20 object-contain"
              />

              <div className="flex-1">
                <h3 className="text-sm font-medium">{product.title}</h3>
                <p className="text-xs text-gray-400">
                  {product.category?.name}
                </p>

                <div className="flex justify-between mt-2">
                  <span className="font-bold text-sm">
                    {product.price} EGP
                  </span>
                  <span className="text-green-600 text-xs">In Stock</span>
                </div>

                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() =>
                      isView
                        ? router.push("/Store/cart")
                        : addToCart(product._id)
                    }
                    className="flex-1 bg-green-600 text-white text-xs py-2 rounded"
                  >
                    {isView ? "View Cart" : isAdded ? "Added" : "Add"}
                  </button>

                  <button
                    onClick={() => removeFromWishlist(product._id)}
                    className="border p-2 rounded"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* continue */}
      <button
        onClick={() => router.push("/Store/products")}
        className="mt-6 flex items-center gap-2 text-gray-500"
      >
        <ArrowLeft size={16} />
        Continue Shopping
      </button>
    </div>
  );
}