"use client";

import HeaderBanner from "@/app/_components/HeaderBanner";
import axios from "axios";
import { Check, Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Oval } from "react-loader-spinner";

export interface CartApiResponse {
  status: string;
  message: string;
  numOfCartItems: number;
  cartId: string;
  data: CartData;
}

export interface CartData {
  _id: string;
  cartOwner: string;
  products: CartProductItem[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  totalCartPrice: number;
}

export interface CartProductItem {
  _id: string;
  count: number;
  price: number;
  product: Product;
}

export interface Product {
  _id: string;
  title: string;
  slug: string;
  quantity: number;
  imageCover: string;
  ratingsAverage: number;

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

  subcategory: SubCategory[];
}

export interface SubCategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
}

export default function CartPage() {
  const router = useRouter();
  const [cart, setCart] = useState<CartApiResponse | null>(null);
  const [loading, setLoading] = useState(true);

  /* GET CART */
  const getCart = async () => {
    try {
      setLoading(true);

      const { data } = await axios.get<CartApiResponse>(
        "https://ecommerce.routemisr.com/api/v2/cart",
        {
          headers: {
            token: localStorage.getItem("token") || "",
          },
        },
      );

      setCart(data);
    } catch (error) {
      console.log("ERROR:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCart();
  }, []);

  /* UPDATE COUNT */
  const updateCount = async (productId: string, count: number) => {
    if (count < 1) return;

    try {
      const { data } = await axios.put(
        `https://ecommerce.routemisr.com/api/v2/cart/${productId}`,
        { count },
        {
          headers: {
            token: localStorage.getItem("token") || "",
          },
        },
      );

      setCart(data);
    } catch (error) {
      console.log(error);
    }
  };
  // removeItem
  const removeItem = async (productId: string) => {
    try {
      const { data } = await axios.delete(
        `https://ecommerce.routemisr.com/api/v2/cart/${productId}`,
        {
          headers: {
            token: localStorage.getItem("token") || "",
          },
        },
      );

      setCart(data);
      toast.success("Product removed successfully 🗑️");
    } catch (error) {
      console.log(error);
    }
  };
  // clearCart
  const clearCart = async () => {
    try {
      const { data } = await axios.delete(
        "https://ecommerce.routemisr.com/api/v2/cart",
        {
          headers: {
            token: localStorage.getItem("token") || "",
          },
        },
      );

      setCart(null);

      toast.success("Cart cleared 🧹");
    } catch (error) {
      console.log(error);
      toast.error("Failed to clear cart ❌");
    }
  };
  // Loader Component
  const Loader = () => {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Oval
          height={60}
          width={60}
          color="#16A34A"
          secondaryColor="#4ADE80"
          strokeWidth={3}
          ariaLabel="oval-loading"
          visible={true}
        />

        <p className="mt-4 text-sm text-gray-500">Loading Your Cart...</p>
      </div>
    );
  };
  return (
    <div>
      {loading ? (
        <div className="flex items-center justify-center min-h-[300px]">
          <Loader />
        </div>
      ) : (
        <>
          {/* HEADER */}
          <div className="bg-gradient-to-br from-green-600 via-green-500 to-green-400">
            <HeaderBanner
              title="Shopping Cart"
              subtitle="Review your items"
              icon={<ShoppingCart />}
              cartName="Cart"
            />
          </div>

          {/* PAGE */}
          {/* <div className=" max-w-7xl mx-auto py-16 px-8"> */}
          <div className="max-w-7xl mx-auto py-16 px-8 overflow-visible">
            {cart?.data?.products?.length === 0 ? (
              // EMPTY CART
              <div className="min-h-[70vh] flex items-center justify-center px-4">
                <div className="flex flex-col items-center justify-center bg-white rounded-2xl shadow-lg p-10 text-center max-w-xl w-full">
                  {/* ICON */}
                  <div className="bg-green-100 text-green-600 p-6 rounded-full mb-4 flex items-center justify-center">
                    <ShoppingCart size={45} />
                  </div>

                  {/* TITLE */}
                  <h2 className="text-3xl font-bold mb-2 text-gray-800">
                    Your cart is empty
                  </h2>

                  {/* DESC */}
                  <p className="text-gray-500 mb-6 leading-relaxed">
                    Looks like you haven't added anything to your cart yet.{" "}
                    <br />
                    Start exploring our products!
                  </p>

                  {/* BUTTON */}
                  <button
                    onClick={() => router.push("/Store/products")}
                    className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition w-full cursor-pointer"
                  >
                    Start Shopping
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-[3fr_1.2fr] gap-6 items-start">
                {/* LEFT SIDE */}
                {/* <div className="space-y-4"> */}
                <div className="space-y-4 max-h-[75vh] overflow-y-auto pr-2 no-scrollbar">
                  <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">
                      Cart ({cart?.numOfCartItems ?? 0} items)
                    </h1>

                    <button
                      className="text-red-500 flex items-center gap-2 cursor-pointer"
                      onClick={clearCart}
                    >
                      <Trash2 size={18} />
                      Clear all items
                    </button>
                  </div>

                  {/* ITEMS */}
                  {cart?.data?.products?.map((item) => (
                    <div
                      key={item._id}
                      className="bg-white p-5 rounded-xl shadow-sm flex items-center justify-between"
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={item.product.imageCover}
                          className="w-25 h-25 object-cover rounded-lg"
                        />

                        <div>
                          <h2 className="font-semibold mb-3">
                            {item.product.title}
                          </h2>

                          <p className="inline-flex items-center text-xs font-medium text-green-700 bg-green-100 px-3 py-1 rounded-full">
                            {item.product.category.name}
                          </p>

                          <p className="text-green-600 font-bold mt-3">
                            {item.price} EGP
                          </p>

                          <div className="flex items-center justify-between w-full mt-3">
                            {/* QTY */}
                            <div className="flex items-center border rounded-lg overflow-hidden">
                              <button
                                onClick={() =>
                                  updateCount(item.product._id, item.count - 1)
                                }
                                className="px-3 py-2 border-r hover:bg-red-50 text-red-500 cursor-pointer"
                              >
                                <Minus size={20} />
                              </button>

                              <span className="px-4 font-medium">
                                {item.count}
                              </span>

                              <button
                                onClick={() =>
                                  updateCount(item.product._id, item.count + 1)
                                }
                                className="px-3 py-2 border-l hover:bg-green-50 text-green-600 cursor-pointer"
                              >
                                <Plus size={20} />
                              </button>
                            </div>

                            {/* TOTAL */}
                            <div className="text-gray-500 ml-4">
                              Total:{" "}
                              <span className="text-green-600 font-semibold">
                                {item.price * item.count} EGP
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <button
                        className="text-red-500 bg-red-100 p-2 rounded-lg border border-red-200 hover:bg-red-200 transition cursor-pointer"
                        onClick={() => removeItem(item.product._id)}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))}
                </div>
                {/* RIGHT SIDE */}
                <div>
                  <div className="bg-white p-6 rounded-2xl shadow-sm border sticky top-6">
                    <h2 className="text-lg font-bold mb-4">Order Summary</h2>

                    <p className="text-gray-500 mb-4 text-sm">
                      {cart?.numOfCartItems ?? 0} items in your cart
                    </p>

                    <div className="bg-green-50 text-green-700 p-3 rounded-xl mb-5 text-sm flex items-center gap-2">
                      <Check size={18} />
                      You qualify for free delivery!
                    </div>

                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>{cart?.data?.totalCartPrice ?? 0} EGP</span>
                      </div>

                      <div className="flex justify-between">
                        <span>Shipping</span>
                        <span className="text-green-600">FREE</span>
                      </div>
                    </div>

                    <div className="border-t mt-5 pt-5 flex justify-between font-bold">
                      <span>Total</span>
                      <span className="text-green-600">
                        {cart?.data?.totalCartPrice ?? 0} EGP
                      </span>
                    </div>

                    <button className="w-full mt-6 bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 transition font-medium cursor-pointer">
                      Secure Checkout
                    </button>

                    <button
                      className="w-full mt-3 border rounded-xl py-3 hover:bg-gray-50 transition cursor-pointer"
                      onClick={() => router.push("/Store/products")}
                    >
                      Continue Shopping
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
