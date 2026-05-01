"use client";

import axiosInstance from "@/lib/axios";
import { Check, RotateCcw, Star, Truck } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export interface ProductDetails {
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

  subcategory: {
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

type Props = {
  product: ProductDetails;
};

export default function ProductTabs({ product }: Props) {
  const [activeTab, setActiveTab] = useState("details");
  const [rating, setRating] = useState(0);
  const [name, setName] = useState("");
  const [review, setReview] = useState("");

  const [errors, setErrors] = useState({
    rating: "",
    review: "",
  });
  const [reviewsList, setReviewsList] = useState<ProductDetails["reviews"]>([]);
  const [loadingReviews, setLoadingReviews] = useState(false);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const handleSubmit = async () => {
    let newErrors = { rating: "", review: "" };

    if (rating === 0) {
      newErrors.rating = "Please select a rating";
    }

    if (!review.trim()) {
      newErrors.review = "Review is required";
    }

    setErrors(newErrors);

    if (newErrors.rating || newErrors.review) return;

    try {
      const res = await axiosInstance.post(
        `/products/${product._id}/reviews`,
        { review, rating },
        {
          headers: {
            token: localStorage.getItem("token") || "",
          },
        },
      );

      console.log("Review added:", res.data);
      toast.success("Review submitted successfully 🎉");
      handleCancel(); // reset form
      getReviews();
    } catch (error) {
      toast.error("Failed to submit review ❌");
      console.log("Error submitting review", error);
    }
  };

  const handleCancel = () => {
    setRating(0);
    setName("");
    setReview("");
    setErrors({ rating: "", review: "" });
  };
  const getReviews = async () => {
    try {
      setLoadingReviews(true);

      const res = await axiosInstance.get(`/products/${product._id}/reviews`);

      setReviewsList(res.data.data);
    } catch (err) {
      console.log(err);
      toast.error("Failed to load reviews");
    } finally {
      setLoadingReviews(false);
    }
  };
  useEffect(() => {
    if (activeTab === "reviews") {
      getReviews();
    }
  }, [activeTab]);
  useEffect(() => {
    if (reviewsList.length === 0) {
      getReviews();
    }
  }, []);
  const totalReviews = reviewsList.length;

  const averageRating =
    totalReviews === 0
      ? 0
      : reviewsList.reduce((acc, r) => acc + r.rating, 0) / totalReviews;

  const getPercent = (star: number) => {
    if (totalReviews === 0) return 0;

    const count = reviewsList.filter((r) => r.rating === star).length;

    return Math.round((count / totalReviews) * 100);
  };
  const visibleReviews = showAllReviews ? reviewsList : reviewsList.slice(0, 3);
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Tabs */}
      <div className="flex border-b overflow-x-auto whitespace-nowrap">
        <button
          onClick={() => setActiveTab("details")}
          className={`pr-6 py-3 text-sm md:text-base ${
            activeTab === "details"
              ? "border-b-2 border-green-600 text-green-600 font-bold"
              : "text-gray-500"
          }`}
        >
          Product Details
        </button>

        <button
          onClick={() => setActiveTab("reviews")}
          className={`pr-6 py-3 text-sm md:text-base ${
            activeTab === "reviews"
              ? "border-b-2 border-green-600 text-green-600 font-bold"
              : "text-gray-500"
          }`}
        >
          Reviews ({reviewsList.length})
        </button>

        <button
          onClick={() => setActiveTab("shipping")}
          className={`pr-6 py-3 text-sm md:text-base ${
            activeTab === "shipping"
              ? "border-b-2 border-green-600 text-green-600 font-bold"
              : "text-gray-500"
          }`}
        >
          Shipping & Returns
        </button>
      </div>

      {/* Content */}
      <div className="mt-6">
        {activeTab === "details" && (
          <div className="mt-6">
            <h2 className="text-lg md:text-xl font-bold mb-2">
              About this Product
            </h2>

            <p className="text-gray-600 mb-4 text-sm md:text-base">
              Material Polyester Blend • Colour Name Multicolour • Department
              Women
            </p>

            <div className="flex flex-col lg:flex-row gap-6 mt-4">
              {/* Box 1 */}
              <div className="w-full lg:w-1/2 border rounded-lg p-5 bg-gray-50">
                <h3 className="font-semibold mb-4 text-gray-800">
                  Product Information
                </h3>

                <div className="space-y-4">
                  <div className="pb-2 border-b border-gray-200 flex justify-between">
                    <span className="text-sm font-medium text-gray-700">
                      Category
                    </span>
                    <span className="text-sm text-gray-600">
                      {product.category.name}
                    </span>
                  </div>

                  <div className="pb-2 border-b border-gray-200 flex justify-between">
                    <span className="text-sm font-medium text-gray-700">
                      SubCategory
                    </span>
                    <span className="text-sm text-gray-600">
                      {product.subcategory.name}
                    </span>
                  </div>

                  <div className="pb-2 border-b border-gray-200 flex justify-between">
                    <span className="text-sm font-medium text-gray-700">
                      Brand
                    </span>
                    <span className="text-sm text-gray-600">
                      {product.brand.name}
                    </span>
                  </div>

                  <div className="pb-2 flex justify-between">
                    <span className="text-sm font-medium text-gray-700">
                      Items Sold
                    </span>
                    <span className="text-sm text-gray-600">
                      {product.sold}+ sold
                    </span>
                  </div>
                </div>
              </div>

              {/* Box 2 */}
              <div className="w-full lg:w-1/2 border rounded-lg p-5 bg-gray-50">
                <h3 className="font-semibold mb-4 text-gray-800">
                  Key Features
                </h3>

                <ul className="space-y-3 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <span className="w-5 h-5 flex items-center justify-center bg-green-500 text-white rounded-full">
                      <Check size={14} />
                    </span>
                    Premium Quality Product
                  </li>

                  <li className="flex items-center gap-2">
                    <span className="w-5 h-5 flex items-center justify-center bg-green-500 text-white rounded-full">
                      <Check size={14} />
                    </span>
                    100% Authentic Guarantee
                  </li>

                  <li className="flex items-center gap-2">
                    <span className="w-5 h-5 flex items-center justify-center bg-green-500 text-white rounded-full">
                      <Check size={14} />
                    </span>
                    Fast & Secure Packaging
                  </li>

                  <li className="flex items-center gap-2">
                    <span className="w-5 h-5 flex items-center justify-center bg-green-500 text-white rounded-full">
                      <Check size={14} />
                    </span>
                    Quality Tested
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === "reviews" && (
          <>
            <div className="mt-6  bg-white border rounded-2xl shadow-md p-6">
              <h2 className="text-lg md:text-xl font-bold mb-4">
                Write a Review
              </h2>

              {/* Rating */}
              <div className="mb-5">
                <label className="block text-sm font-medium mb-2">
                  Your Rating *
                </label>

                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="w-12 h-12 flex items-center justify-center"
                    >
                      <Star
                        size={32}
                        className={
                          rating >= star
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                        }
                      />
                    </button>
                  ))}
                </div>

                {errors.rating && (
                  <p className="text-red-500 text-sm mt-2">{errors.rating}</p>
                )}
              </div>

              {/* Name */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Your Name
                </label>

                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name (optional)"
                  className="w-full border rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              {/* Review */}
              <div className="mb-5">
                <label className="block text-sm font-medium mb-1">
                  Your Review *
                </label>

                <textarea
                  rows={4}
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  placeholder="Share your thoughts about this product..."
                  className="w-full border rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />

                {errors.review && (
                  <p className="text-red-500 text-sm mt-2">{errors.review}</p>
                )}
              </div>

              {/* Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={handleSubmit}
                  className="bg-green-600 text-white px-6 py-2 rounded-xl hover:bg-green-700 transition"
                >
                  Submit Review
                </button>

                <button
                  onClick={handleCancel}
                  className="border px-6 py-2 rounded-xl text-gray-600 hover:bg-gray-100"
                >
                  Cancel
                </button>
              </div>
            </div>
            <div className="border rounded-2xl p-5 bg-white shadow-sm mt-8">
              {/* Title */}
              <h3 className="text-lg font-bold">Customer Reviews</h3>

              {/* Average */}
              <div className="flex items-center gap-3 mt-2">
                <span className="text-3xl font-bold text-gray-900">
                  {averageRating.toFixed(1)}
                </span>

                <div className="text-sm text-gray-500">
                  Based on {totalReviews} reviews
                </div>
              </div>

              {/* Breakdown */}
              <div className="mt-4 space-y-2">
                {[5, 4, 3, 2, 1].map((star) => (
                  <div key={star} className="flex items-center gap-3 text-sm">
                    <span className="w-12">{star} star</span>

                    <div className="flex-1 bg-gray-200 h-2 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-green-500"
                        style={{ width: `${getPercent(star)}%` }}
                      />
                    </div>

                    <span className="w-10 text-right">{getPercent(star)}%</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-8">
              <h3 className="text-lg font-bold mb-4">
                Reviews ({reviewsList.length})
              </h3>

              {loadingReviews ? (
                <p className="text-gray-500">Loading reviews...</p>
              ) : reviewsList.length === 0 ? (
                <p className="text-gray-500">No reviews yet</p>
              ) : (
                <div className="space-y-4">
                  {visibleReviews.map((r) => (
                    <div
                      key={r._id}
                      className="border rounded-2xl p-5 bg-white shadow-sm hover:shadow-md transition"
                    >
                      {/* TOP: avatar + name + date */}
                      <div className="flex items-start gap-3">
                        {/* Avatar */}
                        <div className="w-11 h-11 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 text-white flex items-center justify-center font-bold">
                          {r.user.name.charAt(0).toUpperCase()}
                        </div>

                        <div className="flex-1">
                          {/* Name + date */}
                          <div className="flex justify-between items-center">
                            <p className="font-semibold text-gray-800">
                              {r.user.name}
                            </p>

                            <span className="text-xs text-gray-500">
                              {new Date(r.createdAt).toLocaleDateString()}
                            </span>
                          </div>

                          {/* Stars */}
                          <div className="flex mt-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                size={16}
                                className={
                                  r.rating >= star
                                    ? "text-yellow-400 fill-yellow-400"
                                    : "text-gray-300"
                                }
                              />
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* REVIEW TEXT */}
                      <p className="text-gray-600 text-sm mt-3 leading-relaxed line-clamp-3">
                        {r.review}
                      </p>
                    </div>
                  ))}
                </div>
              )}
              {reviewsList.length > 3 && (
                <div className="flex justify-center mt-5">
                  <button
                    onClick={() => setShowAllReviews((prev) => !prev)}
                    className="px-5 py-2 rounded-full border border-green-600 text-green-600 font-medium
                 hover:bg-green-600 hover:text-white transition-all duration-300 shadow-sm cursor-pointer"
                  >
                    {showAllReviews ? "Show less" : "Show more"}
                  </button>
                </div>
              )}
            </div>
          </>
        )}

        {activeTab === "shipping" && (
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Shipping */}
            <div className="border rounded-2xl p-6 bg-white shadow-sm hover:shadow-md transition">
              <h3 className="text-lg font-bold mb-3 text-gray-800 flex items-center gap-2">
                <span className="bg-green-100 text-green-500 p-2 rounded-full flex items-center justify-center">
                  <Truck size={18} />
                </span>
                Shipping Information
              </h3>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <span className="w-5 h-5 flex items-center justify-center bg-green-500 text-white rounded-full">
                    <Check size={14} />
                  </span>
                  Free shipping on orders over $50
                </li>

                <li className="flex items-center gap-2">
                  <span className="w-5 h-5 flex items-center justify-center bg-green-500 text-white rounded-full">
                    <Check size={14} />
                  </span>
                  Standard delivery: 3-5 business days
                </li>

                <li className="flex items-center gap-2">
                  <span className="w-5 h-5 flex items-center justify-center bg-green-500 text-white rounded-full">
                    <Check size={14} />
                  </span>
                  Express delivery available (1-2 business days)
                </li>

                <li className="flex items-center gap-2">
                  <span className="w-5 h-5 flex items-center justify-center bg-green-500 text-white rounded-full">
                    <Check size={14} />
                  </span>
                  Track your order in real-time
                </li>
              </ul>
            </div>

            {/* Returns */}
            <div className="border rounded-2xl p-6 bg-white shadow-sm hover:shadow-md transition">
              <h3 className="text-lg font-bold mb-3 text-gray-800 flex items-center gap-2">
                <span className="bg-green-100 text-green-500 p-2 rounded-full flex items-center justify-center">
                  <RotateCcw size={18} />
                </span>
                Returns & Refunds
              </h3>

              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <span className="w-5 h-5 flex items-center justify-center bg-green-500 text-white rounded-full">
                    <Check size={14} />
                  </span>
                  30-day hassle-free returns
                </li>

                <li className="flex items-center gap-2">
                  <span className="w-5 h-5 flex items-center justify-center bg-green-500 text-white rounded-full">
                    <Check size={14} />
                  </span>
                  Full refund or exchange available
                </li>

                <li className="flex items-center gap-2">
                  <span className="w-5 h-5 flex items-center justify-center bg-green-500 text-white rounded-full">
                    <Check size={14} />
                  </span>
                  Free return shipping on defective items
                </li>

                <li className="flex items-center gap-2">
                  <span className="w-5 h-5 flex items-center justify-center bg-green-500 text-white rounded-full">
                    <Check size={14} />
                  </span>
                  Quality Tested
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
