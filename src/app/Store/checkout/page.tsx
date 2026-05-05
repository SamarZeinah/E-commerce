"use client";

import HeaderBanner from "@/app/_components/HeaderBanner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/context/CartContext";
import axiosInstance from "@/lib/axios";
import { useFormik } from "formik";
import {
  Banknote,
  Bookmark,
  Check,
  CreditCard,
  Home,
  Info,
  Lock,
  MapPin,
  Phone,
  Plus,
  Receipt,
} from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";

export type Address = {
  _id: string;
  name: string;
  details: string;
  phone: string;
  city: string;
};

export type AddressResponse = {
  results: number;
  status: string;
  data: Address[];
};
type CartProduct = {
  _id: string;
  count: number;
  price: number;
  product: {
    title: string;
    imageCover: string;
  };
};
type CartData = {
  data: {
    _id: string;
    products: CartProduct[];
    totalCartPrice: number;
  };
};
const Page = () => {
  const { resetCart } = useCart();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [payment, setPayment] = useState<"cash" | "online">("online");
  const [cart, setCart] = useState<CartData | null>(null);
  const [cartLoading, setCartLoading] = useState(true);
  const Address_Skeleton = () => {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="border rounded-xl p-4 flex gap-3 animate-pulse"
          >
            {/* icon skeleton */}
            <div className="w-9 h-9 rounded-md bg-gray-200" />

            {/* text skeleton */}
            <div className="space-y-2 w-full">
              <div className="h-3 w-1/3 bg-gray-200 rounded" />
              <div className="h-3 w-2/3 bg-gray-200 rounded" />
              <div className="h-3 w-1/2 bg-gray-200 rounded" />
            </div>
          </div>
        ))}
      </div>
    );
  };
  useEffect(() => {
    const getAddresses = async () => {
      try {
        const { data } = await axiosInstance.get<AddressResponse>("/addresses");

        setAddresses(data.data);
      } catch (error) {
        console.log("Error fetching addresses:", error);
      } finally {
        setLoading(false);
      }
    };

    getAddresses();
  }, []);
  useEffect(() => {
    const getCart = async () => {
      try {
        const { data } = await axiosInstance.get("/cart");
        setCart(data);
      } catch (error) {
        console.log("Cart error:", error);
      } finally {
        setCartLoading(false);
      }
    };

    getCart();
  }, []);
  const validationSchema = Yup.object({
    city: Yup.string().required("City is required"),
    street: Yup.string().required("Street is required"),
    phone: Yup.string()
      .required("Phone is required")
      .matches(/^01[0-9]{9}$/, "Invalid Egyptian phone number"),
  });
  const formik = useFormik({
    initialValues: {
      city: "",
      street: "",
      phone: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });
  const handleSelectAddress = (address: Address) => {
    setSelected(address._id);

    formik.setValues({
      city: address.city,
      street: address.details,
      phone: address.phone,
    });
  };

  const handleCheckout = async () => {
    const loadingToast = toast.loading("Placing your order...");

    try {
      const shippingAddress = {
        details: formik.values.street,
        phone: formik.values.phone,
        city: formik.values.city,
        postalCode: "12345",
      };

      await axiosInstance.post(`/orders/${cart?.data?._id}`, {
        shippingAddress,
      });

      toast.success("Order placed successfully 🎉", {
        id: loadingToast,
      });

      resetCart(); // 👈 يمسح الرقم من الأيقونة
    } catch (error) {
      toast.error("Failed to place order ❌", {
        id: loadingToast,
      });

      console.log(error);
    }
  };
  return (
    <>
      <div className="bg-gradient-to-br from-green-600 via-green-500 to-green-400">
        <HeaderBanner
          title="Complete Your Order"
          subtitle="Review your items and complete your purchase"
          icon={<Receipt />}
          basePath={{ label: "Cart", href: "/Store/cart" }}
          cartName="Checkout"
        />
      </div>
      <div className="max-w-7xl mx-auto pt-6 pb-10 px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[3fr_1.2fr] gap-6 items-start">
          {/* LEFT SIDE */}
          <div className="space-y-6">
            <div className="border rounded-2xl shadow-sm overflow-hidden bg-white">
              {/* HEADER */}
              <div className="bg-green-600 text-white px-6 py-4 space-y-1">
                <h2 className="text-lg font-bold flex items-center gap-2">
                  <img
                    src="/home.svg"
                    alt="home"
                    className="h-5 w-auto object-contain"
                  />
                  Shipping Address
                </h2>
                <p className="text-sm opacity-90">
                  Where should we deliver your order?
                </p>
              </div>

              {/* CONTENT */}
              <div className="space-y-5 p-6">
                {/* Saved Addresses */}
                <div className="space-y-3">
                  <p className="font-semibold text-gray-700 flex items-center gap-2">
                    <Bookmark size={20} className="text-green-600" />
                    Saved Addresses
                  </p>{" "}
                  <p className="text-sm opacity-90">
                    Select a saved address or enter a new one below
                  </p>
                  <div className="space-y-3">
                    {loading ? (
                      <Address_Skeleton />
                    ) : (
                      addresses.map((address) => (
                        <div
                          key={address._id}
                          onClick={() => handleSelectAddress(address)}
                          className={`border rounded-xl p-4 cursor-pointer transition flex gap-3
            ${
              selected === address._id
                ? "border-green-500 bg-green-50"
                : "border-gray-200 hover:border-green-500 hover:bg-gray-50"
            }
          `}
                        >
                          {/* icon */}
                          <div
                            className={`p-2 rounded-md flex items-center justify-center h-fit transition 
              ${
                selected === address._id
                  ? "bg-green-500 text-white"
                  : "bg-gray-100 text-gray-500"
              }
            `}
                          >
                            {selected === address._id ? (
                              <Check size={20} />
                            ) : (
                              <MapPin size={20} />
                            )}
                          </div>

                          {/* content */}
                          <div>
                            <p className="font-semibold">{address.name}</p>
                            <p className="text-sm text-gray-500">
                              {address.details}
                            </p>
                            <p className="text-sm text-gray-500">
                              {address.phone} - {address.city}
                            </p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Add New Address */}
                <div
                  onClick={() => {
                    setSelected("new");
                    formik.resetForm();
                  }}
                  className={`border-2 border-dashed rounded-xl p-4 cursor-pointer transition flex gap-3 items-start
    ${
      selected === "new"
        ? "border-green-500 text-green-600 bg-green-50"
        : "border-gray-300 text-gray-500 hover:border-green-400 "
    }
  `}
                >
                  {/* icon box */}
                  <div
                    className={`p-2 rounded-md flex items-center justify-center mt-1
      ${
        selected === "new"
          ? "bg-green-500 text-white"
          : "bg-gray-100 text-gray-500"
      }
    `}
                  >
                    <Plus size={18} />
                  </div>

                  {/* text */}
                  <div>
                    <h2 className="font-bold text-base flex items-center gap-2">
                      Use a different address
                    </h2>

                    <p className="text-sm opacity-90">
                      Enter a new shipping address manually
                    </p>
                  </div>
                </div>

                {/* Info */}
                <div className="bg-blue-50 text-blue-600 p-3 rounded-xl text-sm flex gap-3 items-start">
                  {/* icon */}
                  <div className="bg-blue-100 text-blue-600 p-2 rounded-full flex items-center justify-center">
                    <Info size={16} />
                  </div>

                  {/* text */}
                  <div>
                    <h2 className="font-semibold">Delivery Information</h2>
                    <p>
                      Using your saved address. You can edit the details below
                      if needed.
                    </p>
                  </div>
                </div>

                {/* Form */}
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-600">
                    City
                  </label>

                  <div className="flex items-center gap-2 border rounded-xl px-3 py-3 focus-within:border-green-500">
                    <div className="bg-gray-200 p-2 rounded-md flex items-center justify-center">
                      <MapPin size={18} className="text-gray-600" />
                    </div>
                    <Input
                      name="city"
                      value={formik.values.city}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder="e.g. Cairo, Alexandria"
                      className="border-0 focus-visible:ring-0 text-base"
                    />
                  </div>

                  {formik.touched.city && formik.errors.city && (
                    <p className="text-red-500 text-xs">{formik.errors.city}</p>
                  )}
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-600">
                    Street Address
                  </label>

                  <div className="flex items-center gap-2 border rounded-xl px-3 py-3 focus-within:border-green-500">
                    <div className="bg-gray-200 p-2 rounded-md flex items-center justify-center">
                      <Home size={18} className="text-gray-600" />
                    </div>
                    <Input
                      name="street"
                      value={formik.values.street}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder="Street name, building number..."
                      className="border-0 focus-visible:ring-0 text-base"
                    />
                  </div>

                  {formik.touched.street && formik.errors.street && (
                    <p className="text-red-500 text-xs">
                      {formik.errors.street}
                    </p>
                  )}
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">
                    Phone Number
                  </label>

                  <div className="flex items-center justify-between border rounded-xl px-3 py-3 focus-within:border-green-500 focus-within:ring-2 focus-within:ring-green-100 transition">
                    <div className="flex items-center gap-2 w-full">
                      <Phone size={18} className="text-gray-500" />

                      <Input
                        name="phone"
                        value={formik.values.phone}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="010xxxxxxxxx"
                        className="border-0 focus-visible:ring-0 text-base w-full"
                      />
                    </div>

                    {/* right hint */}
                    <span className="text-xs text-gray-400 whitespace-nowrap">
                      Egyptian numbers only
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="border rounded-2xl overflow-hidden bg-white">
              {/* HEADER */}
              <div className="bg-green-600 text-white px-6 py-4">
                <h2 className="text-lg font-bold flex items-center gap-2">
                  <img
                    src="/payment.svg"
                    alt="Visa"
                    className="h-6 w-auto object-contain"
                  />{" "}
                  Payment Method
                </h2>
                <p className="text-sm opacity-90">
                  Choose how you'd like to pay
                </p>
              </div>

              {/* CONTENT */}
              <div className="p-6 space-y-4">
                {/* Cash on Delivery */}

                <div
                  onClick={() => setPayment("cash")}
                  className={`border rounded-xl p-4 flex items-center justify-between cursor-pointer transition-all duration-200
    ${
      payment === "cash"
        ? "border-green-500 bg-green-50 shadow-sm"
        : "border-gray-200 hover:border-green-400"
    }
  `}
                >
                  <div className="flex items-center gap-3">
                    {/* icon */}
                    <div
                      className={`p-3 rounded-xl transition
        ${
          payment === "cash"
            ? "bg-green-500 text-white"
            : "bg-gray-100 text-gray-500"
        }
      `}
                    >
                      <Banknote size={20} />
                    </div>

                    <div>
                      <h3
                        className={`font-semibold transition
          ${payment === "cash" ? "text-green-700" : "text-gray-800"}
        `}
                      >
                        Cash on Delivery
                      </h3>

                      <p className="text-sm text-gray-500">
                        Pay when your order arrives at your doorstep
                      </p>
                    </div>
                  </div>

                  {/* radio */}
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center
    ${payment === "cash" ? "border-green-500" : "border-gray-300"}
  `}
                  >
                    {payment === "cash" && (
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    )}
                  </div>
                </div>
                {/* Online Payment */}

                <div
                  onClick={() => setPayment("online")}
                  className={`border rounded-xl p-4 flex items-center justify-between cursor-pointer transition-all duration-200
    ${
      payment === "online"
        ? "border-green-500 bg-green-50 shadow-sm"
        : "border-gray-200 hover:border-green-400"
    }
  `}
                >
                  <div className="flex items-center gap-3">
                    {/* icon */}
                    <div
                      className={`p-3 rounded-xl transition
        ${
          payment === "online"
            ? "bg-gradient-to-br from-green-500 to-blue-500 text-white"
            : "bg-gray-100 text-gray-500"
        }
      `}
                    >
                      <CreditCard size={20} />
                    </div>

                    <div>
                      <h3
                        className={`font-semibold transition
          ${payment === "online" ? "text-green-700" : "text-gray-800"}
        `}
                      >
                        Pay Online
                      </h3>

                      <p className="text-sm text-gray-500">
                        Secure payment with Credit/Debit Card via Stripe
                      </p>

                      <div className="flex gap-2 mt-2">
                        <img
                          src="/Visa.svg"
                          alt="Visa"
                          className="h-6 w-auto object-contain"
                        />

                        <img
                          src="/mastercard.svg"
                          alt="MasterCard"
                          className="h-6 w-auto object-contain"
                        />

                        <img
                          src="/amex.svg"
                          alt="American Express"
                          className="h-6 w-auto object-contain"
                        />
                      </div>
                    </div>
                  </div>

                  {/* radio */}
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center
    ${payment === "online" ? "border-green-500" : "border-gray-300"}
  `}
                  >
                    {payment === "online" && (
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    )}
                  </div>
                </div>
                {/* Security box */}

                <div className="bg-green-50 text-green-700 p-4 rounded-xl text-sm flex gap-3 items-center">
                  {/* Icon */}
                  <div className="bg-green-100 text-green-700 p-2 rounded-full flex items-center justify-center shrink-0">
                    <Lock className="text-green-500" size={18} />
                  </div>

                  {/* Text */}
                  <div>
                    <div className="font-semibold leading-tight">
                      Secure & Encrypted
                    </div>

                    <p className="text-xs text-green-600 mt-1 leading-relaxed">
                      Your payment info is protected with 256-bit SSL encryption
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="sticky top-16 self-start">
            <div className="border rounded-2xl shadow-sm overflow-hidden bg-white">
              {/* HEADER */}
              <div className="bg-green-600 text-white px-6 py-4 space-y-1">
                <h2 className="text-lg font-bold">Order Summary</h2>

                <p className="text-sm opacity-90">
                  {cart?.data?.products?.length ?? 0} items
                </p>
              </div>

              {/* CONTENT */}
              <div className="space-y-5 p-6">
                {/* ITEMS */}
                <div className="space-y-3 max-h-[250px] overflow-y-auto pr-1">
                  {cartLoading ? (
                    <p className="text-sm text-gray-400">Loading cart...</p>
                  ) : (
                    <div className="space-y-3 max-h-[240px] overflow-y-auto pr-1">
                      {cart?.data?.products?.map((item) => (
                        <div
                          key={item._id}
                          className="flex items-center justify-between text-sm"
                        >
                          {/* LEFT SIDE */}
                          <div className="flex items-center gap-3">
                            {/* Image */}
                            <img
                              src={item.product.imageCover}
                              alt={item.product.title}
                              className="w-12 h-12 object-cover rounded-lg border"
                            />

                            {/* Text */}
                            <div className="flex flex-col">
                              <span className="font-medium text-gray-800 line-clamp-1">
                                {item.product.title}
                              </span>

                              <span className="text-xs text-gray-500">
                                {item.count} × {item.price} EGP
                              </span>
                            </div>
                          </div>

                          {/* RIGHT SIDE (total per item) */}
                          <div className="font-semibold text-gray-800">
                            {item.price * item.count}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* PRICING */}
                <div className="border-t pt-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-lg">Subtotal</span>
                    <span className="text-lg">
                      {cart?.data?.totalCartPrice ?? 0} EGP
                    </span>
                  </div>

                  <div className="flex justify-between text-green-600">
                    <span className="text-lg">Shipping</span>
                    <span className="text-lg">FREE</span>
                  </div>

                  <div className="flex justify-between font-bold text-xl pt-2 border-t">
                    <span>Total</span>
                    <span className="text-green-600">
                      {cart?.data?.totalCartPrice ?? 0} EGP
                    </span>
                  </div>
                </div>

                {/* BUTTON */}
                <Button
                  onClick={handleCheckout}
                  className="w-full bg-green-600 hover:bg-green-700 text-white text-lg py-6 rounded-xl cursor-pointer"
                >
                  Proceed to Payment
                </Button>

                {/* FEATURES */}
                <div className="flex justify-between text-xs text-gray-500 pt-2">
                  <div className="flex items-center gap-1">
                    <img src="/secure.svg" alt="Secure" className="w-4 h-4" />
                    <span>Secure</span>
                  </div>

                  <div className="flex items-center gap-1">
                    <img
                      src="/fastdelivery.svg"
                      alt="Fast Delivery"
                      className="w-4 h-4"
                    />
                    <span>Fast Delivery</span>
                  </div>

                  <div className="flex items-center gap-1">
                    <img
                      src="/deiveryreturn.svg"
                      alt="Easy Returns"
                      className="w-4 h-4"
                    />
                    <span>Easy Returns</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;