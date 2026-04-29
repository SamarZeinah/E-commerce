"use client";
import { useWishlist } from "@/context/WishlistContext";
import { Heart, Trash2, ShoppingCart, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function WishlistPage() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const router = useRouter();

  if (wishlist.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-40 gap-4">
        <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center">
          <Heart size={36} className="text-red-300" />
        </div>
        <h2 className="text-xl font-semibold text-gray-500">Your wishlist is empty</h2>
        <button
          onClick={() => router.push("/Store/products")}
          className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition"
        >
          Browse Products
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">

      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center">
          <Heart size={22} className="fill-red-500 text-red-500" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">My Wishlist</h2>
          <p className="text-gray-400 text-sm">
            {wishlist.length} item{wishlist.length > 1 ? "s" : ""} saved
          </p>
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block border rounded-xl overflow-hidden">
        {/* Table Header */}
        <div className="grid grid-cols-12 px-6 py-3 bg-gray-50 text-sm text-gray-500 font-medium border-b">
          <div className="col-span-6">Product</div>
          <div className="col-span-2 text-center">Price</div>
          <div className="col-span-2 text-center">Status</div>
          <div className="col-span-2 text-center">Actions</div>
        </div>

        {/* Table Rows */}
        {wishlist.map((product, index) => (
          <div
            key={product._id}
            className={`grid grid-cols-12 px-6 py-4 items-center ${
              index !== wishlist.length - 1 ? "border-b" : ""
            }`}
          >
            {/* Product */}
            <div className="col-span-6 flex items-center gap-4">
              <div className="w-16 h-16 border rounded-lg overflow-hidden flex-shrink-0">
                <img
                  src={product.imageCover}
                  alt={product.title}
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h3 className="font-medium text-sm line-clamp-2">{product.title}</h3>
                <p className="text-gray-400 text-xs mt-1">{product.category?.name}</p>
              </div>
            </div>

            {/* Price */}
            <div className="col-span-2 text-center font-bold text-sm">
              {product.price} EGP
            </div>

            {/* Status */}
            <div className="col-span-2 flex justify-center">
              <span className="flex items-center gap-1.5 text-green-600 text-sm font-medium">
                <span className="w-2 h-2 rounded-full bg-green-500 inline-block"></span>
                In Stock
              </span>
            </div>

            {/* Actions */}
            <div className="col-span-2 flex items-center justify-center gap-2">
              <button className="flex items-center gap-2 bg-green-600 text-white text-xs px-3 py-2 rounded-lg hover:bg-green-700 transition">
                <ShoppingCart size={14} />
                Add to Cart
              </button>
              <button
                onClick={() => removeFromWishlist(product._id)}
                className="w-8 h-8 flex items-center justify-center border rounded-lg text-gray-400 hover:text-red-500 hover:border-red-300 transition cursor-pointer"
              >
                <Trash2 size={15} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile Cards */}
      <div className="flex flex-col gap-4 md:hidden">
        {wishlist.map((product) => (
          <div key={product._id} className="border rounded-xl p-4 flex gap-4 items-start">
            {/* Image */}
            <div className="w-20 h-20 border rounded-lg overflow-hidden flex-shrink-0">
              <img
                src={product.imageCover}
                alt={product.title}
                className="w-full h-full object-contain"
              />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-sm line-clamp-2">{product.title}</h3>
              <p className="text-gray-400 text-xs mt-1">{product.category?.name}</p>

              <div className="flex items-center justify-between mt-3">
                <span className="font-bold text-sm">{product.price} EGP</span>
                <span className="flex items-center gap-1 text-green-600 text-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block"></span>
                  In Stock
                </span>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 mt-3">
                <button className="flex-1 flex items-center justify-center gap-2 bg-green-600 text-white text-xs px-3 py-2 rounded-lg hover:bg-green-700 transition">
                  <ShoppingCart size={13} />
                  Add to Cart
                </button>
                <button
                  onClick={() => removeFromWishlist(product._id)}
                  className="w-8 h-8 flex items-center justify-center border rounded-lg text-gray-400 hover:text-red-500 hover:border-red-300 transition cursor-pointer"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Continue Shopping */}
      <button
        onClick={() => router.push("/Store/products")}
        className="flex items-center gap-2 text-gray-500 hover:text-green-600 transition mt-6"
      >
        <ArrowLeft size={16} />
        Continue Shopping
      </button>
    </div>
  );
}