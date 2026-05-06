
"use client";

import { useEffect, useState } from "react";
import HeaderBanner from "@/app/_components/HeaderBanner";
import { SquareRoundCorner, MapPin, Package, ChevronDown, ChevronUp, ShoppingBag } from "lucide-react";
import axiosInstance from "@/lib/axios";
import { Oval } from "react-loader-spinner";
import { jwtDecode } from "jwt-decode";

//  Types 
type OrderProduct = {
  count: number;
  _id: string;
  product: {
    _id: string;
    title: string;
    imageCover: string;
    category: { name: string };
  };
  price: number;
};

type Order = {
  _id: string;
  id: number;
  cartItems: OrderProduct[];
  shippingAddress: {
    city: string;
    details: string;
    phone: string;
  };
  paymentMethodType: string;
  isPaid: boolean;
  isDelivered: boolean;
  createdAt: string;
  totalOrderPrice: number;
  shippingPrice: number;
  taxPrice: number;
};

type DecodedToken = { id: string };

//  Status Badge 
function StatusBadge({ isDelivered, isPaid }: { isDelivered: boolean; isPaid: boolean }) {
  if (isDelivered)
    return (
      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 border border-green-200">
        Delivered
      </span>
    );
  if (isPaid)
    return (
      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 border border-blue-200">
        On the way
      </span>
    );
  return (
    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-orange-100 text-orange-700 border border-orange-200">
      Processing
    </span>
  );
}

//  Order Card 
function OrderCard({ order }: { order: Order }) {
  const [open, setOpen] = useState(false);

  const formattedDate = new Date(order.createdAt).toLocaleDateString("en-GB", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="bg-white  w-full rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
      {/*  Card Header  */}
      <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Left: image + info */}
        <div className="flex items-center gap-4">
          <div className="relative w-16 h-16 flex-shrink-0">
            <img
              src={order.cartItems[0]?.product?.imageCover}
              alt={order.cartItems[0]?.product?.title}
              className="w-16 h-16 object-cover rounded-xl"
            />
            {order.cartItems.length > 1 && (
              <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                +{order.cartItems.length - 1}
              </span>
            )}
          </div>

          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <StatusBadge isDelivered={order.isDelivered} isPaid={order.isPaid} />
            </div>
            <p className="text-gray-800 font-semibold mt-1">
              # {order.id}
            </p>
            <p className="text-gray-400 text-xs mt-0.5 flex items-center gap-1">
              <span>{formattedDate}</span>
              <span>·</span>
              <Package size={12} />
              <span>{order.cartItems.length} {order.cartItems.length === 1 ? "item" : "items"}</span>
              <span>·</span>
              <MapPin size={12} />
              <span>{order.shippingAddress?.city}</span>
            </p>
          </div>
        </div>

        {/* Right: price + toggle */}
        <div className="flex items-center gap-4 sm:ml-auto">
          <p className="text-gray-800 font-bold text-lg">
            {order.totalOrderPrice.toLocaleString()} <span className="text-sm font-medium text-gray-400">EGP</span>
          </p>
          <button
            onClick={() => setOpen(!open)}
            className="text-sm text-green-600 border border-green-200 px-3 py-1.5 rounded-lg hover:bg-green-50 transition flex items-center gap-1 font-medium"
          >
            {open ? (
              <>Hide <ChevronUp size={14} /></>
            ) : (
              <>Details <ChevronDown size={14} /></>
            )}
          </button>
        </div>
      </div>

      {/*  Expanded Details  */}
      {open && (
        <div className="border-t border-gray-100 px-5 pb-5 pt-4 grid md:grid-cols-2 gap-6">
          {/* Order Items */}
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-1">
              <ShoppingBag size={14} /> Order Items
            </h3>
            <div className="space-y-3">
              {order.cartItems.map((item) => (
                <div key={item._id} className="flex items-center gap-3">
                  <img
                    src={item.product?.imageCover}
                    alt={item.product?.title}
                    className="w-12 h-12 object-cover rounded-lg flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate">
                      {item.product?.title}
                    </p>
                    <p className="text-xs text-gray-400">
                      {item.count} × {item.price} EGP
                    </p>
                  </div>
                  <p className="text-sm font-semibold text-gray-700 flex-shrink-0">
                    {item.count * item.price} EGP
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right column */}
          <div className="flex flex-col gap-4">
            {/* Delivery Address */}
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-1">
                <MapPin size={14} /> Delivery Address
              </h3>
              <div className="bg-gray-50 rounded-xl p-3 text-sm text-gray-700 space-y-0.5">
                <p className="font-medium">{order.shippingAddress?.city}</p>
                <p className="text-gray-500">{order.shippingAddress?.details}</p>
                <p className="text-gray-500">{order.shippingAddress?.phone}</p>
              </div>
            </div>

            {/* Order Summary */}
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
                Order Summary
              </h3>
              <div className="bg-amber-50 rounded-xl p-3 text-sm space-y-1.5">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>{(order.totalOrderPrice - order.shippingPrice - order.taxPrice).toLocaleString()} EGP</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>{order.shippingPrice === 0 ? "Free" : `${order.shippingPrice} EGP`}</span>
                </div>
                {order.taxPrice > 0 && (
                  <div className="flex justify-between text-gray-600">
                    <span>Tax</span>
                    <span>{order.taxPrice} EGP</span>
                  </div>
                )}
                <div className="flex justify-between font-bold text-gray-800 border-t border-amber-200 pt-1.5 mt-1">
                  <span>Total</span>
                  <span>{order.totalOrderPrice.toLocaleString()} EGP</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
// Loading 
const Loader = () => (
  <div className="flex flex-col items-center justify-center py-20">
    <Oval
      height={60}
      width={60}
      color="#16A34A"
      secondaryColor="#86efac"
      strokeWidth={3}
      ariaLabel="loading"
      visible={true}
    />
    <p className="mt-4 text-sm text-gray-400">Loading your orders...</p>
  </div>
);

//  Empty State 
const EmptyState = () => (
  <div className="flex flex-col items-center justify-center py-24 text-center">
    <div className="bg-green-50 p-6 rounded-full mb-4">
      <ShoppingBag size={40} className="text-green-400" />
    </div>
    <h3 className="text-lg font-semibold text-gray-700">No orders yet</h3>
    <p className="text-gray-400 text-sm mt-1">Start shopping and your orders will appear here.</p>
  </div>
);

//  Main Page 
export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const decoded = jwtDecode<DecodedToken>(token);
        const userId = decoded.id;

        const { data } = await axiosInstance.get(`/orders/user/${userId}`);
        setOrders(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <>
      <div className="bg-gradient-to-br from-green-600 via-green-500 to-green-400">
        <HeaderBanner
          title="My Orders"
          subtitle={
            loading
              ? "Loading your orders..."
              : `Track and manage your ${orders.length} ${orders.length === 1 ? "order" : "orders"}`
          }
          icon={<SquareRoundCorner />}
          basePath={{ label: "My Orders", href: "/Store/orders" }}
        />
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        {loading ? (
          <Loader />
        ) : orders.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <OrderCard key={order._id} order={order} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}