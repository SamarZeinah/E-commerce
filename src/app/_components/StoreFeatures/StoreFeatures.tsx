"use client";
import { Headset, RefreshCcw, ShieldCheck, Truck } from "lucide-react";
const StoreFeatures = () => {
  const features = [
    {
      title: "Free Shipping",
      desc: "On orders over 500 EGP",
      icon: Truck,
      color: "text-blue-500 bg-blue-100",
    },
    {
      title: "Easy Returns",
      desc: "14-day return policy",
      icon: RefreshCcw,
      color: "text-green-600 bg-green-100",
    },
    {
      title: "Secure Payment",
      desc: "100% secure checkout",
      icon: ShieldCheck,
      color: "text-orange-500 bg-orange-100",
    },
    {
      title: "24/7 Support",
      desc: "Contact us anytime",
      icon: Headset,
      color: "text-purple-600 bg-purple-100",
    },
  ];
  return (
    <div className="bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-4">
        {features.map((item, i) => {
          const Icon = item.icon;

          return (
            <div
              key={i}
              className="bg-white rounded-xl p-5 flex items-center gap-4 shadow-sm hover:shadow-md transition"
            >
              {/* icon */}
              <div
                className={`w-12 h-12 flex items-center justify-center rounded-lg ${item.color}`}
              >
                <Icon className="w-6 h-6" />
              </div>

              {/* text */}
              <div>
                <p className="font-semibold text-gray-800">{item.title}</p>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StoreFeatures;
