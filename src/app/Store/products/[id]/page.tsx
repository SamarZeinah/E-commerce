// "use client";

// import axiosInstance from "@/lib/axios";
// import { useState, useEffect } from "react";
// import { useParams } from "next/navigation";
// import { Car, Heart, RotateCcw, ShieldCheck, ShoppingCart, Star, Truck } from "lucide-react";

// interface ProductDetails {
//   sold: number;
//   images: string[];
//   ratingsQuantity: number;
//   _id: string;
//   id: string;
//   title: string;
//   slug: string;
//   description: string;
//   quantity: number;
//   price: number;
//   imageCover: string;

//   category: {
//     _id: string;
//     name: string;
//     slug: string;
//     image: string;
//   };

//   brand: {
//     _id: string;
//     name: string;
//     slug: string;
//     image: string;
//   };

//   ratingsAverage: number;
//   createdAt: string;
//   updatedAt: string;
//   __v: number;

//   reviews: {
//     _id: string;
//     review: string;
//     rating: number;
//     product: string;
//     user: {
//       _id: string;
//       name: string;
//     };
//     createdAt: string;
//     updatedAt: string;
//     __v: number;
//   }[];
// }

// interface ProductDetailsResponse {
//   data: ProductDetails;
// }

// /* ================= COMPONENT ================= */

// export default function ProductDetailsPage() {
//   const { id } = useParams<{ id: string }>();

//   const [product, setProduct] = useState<ProductDetails | null>(null);
//   const [selectedImage, setSelectedImage] = useState<string | null>(null);
//   const renderStars = (rating: number) => {
//     return [...Array(5)].map((_, i) => {
//       const fillPercent = Math.max(0, Math.min(1, rating - i));

//       return (
//         <div key={i} className="relative">
//           <Star className="text-gray-300" />
//           <div
//             className="absolute top-0 left-0 overflow-hidden"
//             style={{ width: `${fillPercent * 100}%` }}
//           >
//             <Star className="text-yellow-400 fill-yellow-400" />
//           </div>
//         </div>
//       );
//     });
//   };

//   useEffect(() => {
//     const getProduct = async () => {
//       try {
//         const res = await axiosInstance.get<ProductDetailsResponse>(
//           `/products/${id}`,
//         );

//         setProduct(res.data.data);
//         setSelectedImage(res.data.data.imageCover);
//       } catch (err) {
//         console.log(err);
//       }
//     };

//     if (id) getProduct();
//   }, [id]);

//   /* loading */
//   if (!product || !selectedImage) {
//     return <div className="text-center py-20">Loading product...</div>;
//   }

//   const images = product.images?.length ? product.images : [product.imageCover];

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-10">
//       <div className="flex flex-col lg:flex-row gap-10">
//         {/* LEFT */}
//         <div className="lg:w-1/4">
//           <img
//             src={selectedImage}
//             className="w-full h-[350px] object-contain rounded-xl border"
//           />

//           <div className="flex gap-3 mt-4 overflow-x-auto no-scrollbar">
//             {images.map((img, i) => (
//               <img
//                 key={i}
//                 src={img}
//                 onClick={() => setSelectedImage(img)}
//                 className={`w-20 h-20 object-cover rounded-lg border cursor-pointer transition
//                   ${
//                     selectedImage === img
//                       ? "border-violet-600 scale-105"
//                       : "border-gray-200"
//                   }
//                 `}
//               />
//             ))}
//           </div>
//         </div>

//         {/* RIGHT */}
//         <div className="lg:w-3/4">
//           <div className="flex items-center gap-3 mt-3">
//             {/* Category */}
//             <div className="flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1 rounded-full">
//               <span className="text-sm font-medium">
//                 {product.category.name}
//               </span>
//             </div>

//             {/* Brand */}
//             <div className="flex items-center gap-2 bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
//               <span className="text-sm font-medium">{product.brand.name}</span>
//             </div>
//           </div>
//           <h1 className="text-3xl font-bold py-4">{product.title}</h1>

//           <div className="flex items-center gap-2 mt-1 text-sm">
//             <div className="flex">{renderStars(product.ratingsAverage)}</div>

//             <span className="text-gray-500 text-sm">
//               {product.ratingsAverage}
//             </span>

//             <span className="text-gray-500">
//               ({product.ratingsQuantity} reviews)
//             </span>
//           </div>

//           <p className="text-2xl font-bold mt-5 text-black">
//             {product.price} EGP
//           </p>
//           <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1 rounded-full border border-green-100">
//             <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>

//             <span className="text-sm font-medium">In Stock</span>
//           </div>
//           <hr className="border-t border-gray-200 my-4" />
//           <p className="mt-5 text-gray-600">{product.description}</p>
//           <div className="mt-6">
//             {/* Title */}
//             <p className="text-gray-700 font-medium mb-2">Quantity</p>

//             {/* Counter */}
//             <div className="flex items-center gap-3">
//               <button className="w-8 h-8 flex items-center justify-center border rounded-md hover:bg-gray-100">
//                 -
//               </button>

//               <span className="w-10 text-center font-medium">1</span>

//               <button className="w-8 h-8 flex items-center justify-center border rounded-md hover:bg-gray-100">
//                 +
//               </button>
//             </div>

//             {/* Stock */}
//             <p className="text-sm text-gray-500 mt-2">{product.quantity} available</p>
//           </div>
//           <div className="mt-6 p-4 border rounded-lg bg-gray-50 flex justify-between items-center">
//             <p className="text-gray-700 text-lg">Total Price</p>

//             <p className="text-2xl font-bold text-green-600">{product.price} EGP</p>
//           </div>
//           <div className="mt-8 flex gap-4 w-full">
//             {/* Add to Cart */}
//             <button className="flex-1 flex items-center justify-center gap-2 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition">
//               <span>
//                 <ShoppingCart />
//               </span>
//               <span>Add to Cart</span>
//             </button>

//             {/* Buy Now */}
//             <button className="flex-1 flex items-center justify-center gap-2 bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition">
//               <span>Buy Now</span>
//             </button>
//           </div>
//         <button className="mt-4 w-full flex items-center justify-center gap-2 border border-gray-300 text-gray-600 px-6 py-3 rounded-lg hover:border-green-500 hover:text-green-500 hover:bg-green-50 transition cursor-pointer">
//   <Heart size={18} />
//   Add to Wishlist
// </button>

// <div className="flex justify-between gap-4 mt-6">

//   <div className="flex items-center gap-3 w-full">
//     <div className="bg-green-100 p-3 rounded-full">
//       <Truck size={20} className="text-green-600" />
//     </div>
//     <div>
//       <p className="font-semibold">Free Delivery</p>
//       <span className="text-sm text-gray-500">Orders over $50</span>
//     </div>
//   </div>

//   <div className="flex items-center gap-3 w-full">
//     <div className="bg-green-100 p-3 rounded-full">
//       <RotateCcw size={20} className="text-green-600" />
//     </div>
//     <div>
//       <p className="font-semibold">30 Days Return</p>
//       <span className="text-sm text-gray-500">Money back</span>
//     </div>
//   </div>

//   <div className="flex items-center gap-3 w-full">
//     <div className="bg-green-100 p-3 rounded-full">
//       <ShieldCheck size={20} className="text-green-600" />
//     </div>
//     <div>
//       <p className="font-semibold">Secure Payment</p>
//       <span className="text-sm text-gray-500">100% Protected</span>
//     </div>
//   </div>

// </div>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import axiosInstance from "@/lib/axios";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useParams, useRouter } from "next/navigation";
import ProductTabs from "../../../_components/ProductTabs/ProductTabs";
import {
  Eye,
  Heart,
  Plus,
  RefreshCw,
  RotateCcw,
  ShieldCheck,
  ShoppingCart,
  Star,
  Truck,
} from "lucide-react";
type Product = {
  _id: string;
  title: string;
  imageCover: string;
  price: number;
  quantity: number;
  ratingsAverage: number;
  ratingsQuantity: number;
  category: {
    _id: string;
    name: string;
    slug: string;
    image: string;
  };
};
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

interface ProductDetailsResponse {
  data: ProductDetails;
}

export default function ProductDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const router = useRouter();

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
  useEffect(() => {
    const getRelated = async () => {
      if (!product?.category?._id) return;

      try {
        const res = await axiosInstance.get<{ data: Product[] }>(
          `/products?category=${product.category._id}`,
        );

        const filtered = res.data.data.filter((p) => p._id !== product._id);

        setRelatedProducts(filtered);
      } catch (err) {
        console.log(err);
      }
    };

    getRelated();
  }, [product]);
  /* loading */
  if (!product || !selectedImage) {
    return <div className="text-center py-20">Loading product...</div>;
  }

  const images = product.images?.length ? product.images : [product.imageCover];

  return (
    <>
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
          <div className="lg:w-3/4 border rounded-xl p-6 shadow-sm bg-white">
            {/* Category + Brand */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1 rounded-full">
                <span className="text-sm font-medium">
                  {product.category.name}
                </span>
              </div>

              <div className="flex items-center gap-2 bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                <span className="text-sm font-medium">
                  {product.brand.name}
                </span>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-3xl font-bold mt-3">{product.title}</h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mt-2 text-sm">
              <div className="flex">{renderStars(product.ratingsAverage)}</div>

              <span className="text-gray-500">{product.ratingsAverage}</span>

              <span className="text-gray-500">
                ({product.ratingsQuantity} reviews)
              </span>
            </div>

            {/* Price + Stock */}
            <div className="flex items-center justify-between mt-4">
              <p className="text-2xl font-bold text-black">
                {product.price} EGP
              </p>

              <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1 rounded-full border border-green-100">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">In Stock</span>
              </div>
            </div>

            <hr className="border-t border-gray-200 my-4" />

            {/* Description */}
            <p className="mt-4 text-gray-600 leading-relaxed">
              {product.description}
            </p>

            {/* Quantity */}
            <div className="mt-6">
              <p className="text-gray-700 font-medium mb-2">Quantity</p>

              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                  className="w-10 h-10 flex items-center justify-center border rounded-md text-lg font-semibold hover:bg-gray-100 transition"
                >
                  -
                </button>

                <span className="w-12 text-center text-lg font-medium">
                  {quantity}
                </span>

                <button
                  onClick={() =>
                    setQuantity((prev) => Math.min(product.quantity, prev + 1))
                  }
                  className="w-10 h-10 flex items-center justify-center border rounded-md text-lg font-semibold hover:bg-gray-100 transition"
                >
                  +
                </button>

                <p className="text-xs text-green-700 bg-green-50 px-2 py-1 rounded-md ml-2">
                  {product.quantity} available
                </p>
              </div>
            </div>

            {/* Total Price */}
            <div className="mt-6 p-4 border rounded-lg bg-gray-50 flex justify-between items-center">
              <p className="text-gray-700 text-lg">Total Price</p>
              <p className="text-2xl font-bold text-green-600">
                {product.price * quantity} EGP
              </p>
            </div>

            {/* Buttons */}
            <div className="mt-8 flex gap-4 w-full">
              <button className="flex-1 flex items-center justify-center gap-2 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition">
                <ShoppingCart />
                Add to Cart
              </button>

              <button className="flex-1 flex items-center justify-center gap-2 bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition">
                Buy Now
              </button>
            </div>

            {/* Wishlist */}
            <button className="mt-4 w-full flex items-center justify-center gap-2 border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:border-green-500 hover:text-green-600 hover:bg-green-50 transition">
              <Heart size={18} />
              Add to Wishlist
            </button>

            {/* Features */}
            <div className="mt-6 border rounded-xl p-4 bg-gray-50 flex flex-col md:flex-row gap-4">
              <div className="flex items-center gap-3 w-full">
                <div className="bg-green-100 p-2.5 rounded-full">
                  <Truck size={18} className="text-green-600" />
                </div>
                <div>
                  <p className="font-semibold text-sm">Free Delivery</p>
                  <span className="text-xs text-gray-500">Orders over $50</span>
                </div>
              </div>

              <div className="flex items-center gap-3 w-full">
                <div className="bg-green-100 p-2.5 rounded-full">
                  <RotateCcw size={18} className="text-green-600" />
                </div>
                <div>
                  <p className="font-semibold text-sm">30 Days Return</p>
                  <span className="text-xs text-gray-500">Money back</span>
                </div>
              </div>

              <div className="flex items-center gap-3 w-full">
                <div className="bg-green-100 p-2.5 rounded-full">
                  <ShieldCheck size={18} className="text-green-600" />
                </div>
                <div>
                  <p className="font-semibold text-sm">Secure Payment</p>
                  <span className="text-xs text-gray-500">100% Protected</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ProductTabs product={product} />

      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-[5px] h-8 bg-[#009966] rounded"></div>
          <h2 className="text-2xl md:text-3xl font-bold">
            You May Also <span className="text-[#009966]"> Like</span>
          </h2>
        </div>

        <Swiper
          modules={[Navigation]}
          navigation
          spaceBetween={20}
          breakpoints={{
            0: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
            1280: { slidesPerView: 5 },
          }}
        >
          {relatedProducts.map((product) => (
            <SwiperSlide key={product._id}>
              <div
                onClick={() => router.push(`/Store/products/${product._id}`)}
                className="bg-white border rounded-xl p-3 relative group transition-all duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer"
              >
                <div className="absolute top-3 right-3 flex flex-col gap-2 transition-all duration-300">
                  <button className="w-8 h-8 bg-white rounded-full shadow flex items-center justify-center hover:text-red-600 hover:scale-110 transition">
                    <Heart size={16} />
                  </button>

                  <button className="w-8 h-8 bg-white rounded-full shadow flex items-center justify-center hover:text-green-600 hover:scale-110 transition">
                    <RefreshCw size={16} />
                  </button>

                  <button
                    onClick={() =>
                      router.push(`/Store/products/${product._id}`)
                    }
                    className="w-8 h-8 bg-white rounded-full shadow flex items-center justify-center hover:text-green-600 hover:scale-110 transition"
                  >
                    <Eye size={16} />
                  </button>
                </div>

                {/* Image */}
                <img
                  src={product.imageCover}
                  className="w-full h-52 object-contain mb-3"
                />

                {/* Category */}
                <p className="text-gray-500 text-sm">{product.category.name}</p>

                {/* Title */}
                <h3 className="font-medium line-clamp-1 cursor-pointer">
                  {product.title}
                </h3>

                {/* Rating*/}
                <div className="flex items-center gap-2 mt-1 text-sm">
                  <div className="flex">
                    {renderStars(product.ratingsAverage)}
                  </div>

                  <span className="text-gray-500 text-sm">
                    {product.ratingsAverage}
                  </span>

                  <span className="text-gray-500">
                    ({product.ratingsQuantity})
                  </span>
                </div>

                {/* Price + Add */}
                <div className="flex justify-between items-center mt-3">
                  <span className="font-bold">{product.price} EGP</span>

                  <button className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center hover:scale-110 transition">
                    <Plus />
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}
