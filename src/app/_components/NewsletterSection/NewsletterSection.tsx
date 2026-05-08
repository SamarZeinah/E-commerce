"use client";

import {
  Mail,
  Leaf,
  Truck,
  Gift,
  Star,
  ArrowRight,
} from "lucide-react";
import { useState } from "react";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  return (
    <div className="px-4 sm:px-6 md:px-10 py-12 md:py-16 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 bg-green-50 rounded-3xl p-5 sm:p-6 md:p-12 items-center">

        {/* LEFT */}
        <div>
          {/* Badge */}
          <div className="flex items-start gap-3 flex-wrap">
            <div className="w-13 h-13 bg-gradient-to-r from-[#00BC7D] to-[#00BBA7] rounded-xl flex items-center justify-center">
              <Mail size={25} className="text-white" />
            </div>

            <div className="flex flex-col">
              <span className="text-[#00BBA7] font-medium">NEWSLETTER</span>
              <span className="text-gray-500 text-sm">50,000+ subscribers</span>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-3xl md:text-4xl font-bold mt-4">
            Get the Freshest Updates <br />
            <span className="text-[#00BBA7]">Delivered Free</span>
          </h2>

          <p className="text-gray-600 mt-3">
            Weekly recipes, seasonal offers & exclusive member perks.
          </p>

          {/* Pills */}
          <div className="flex flex-wrap gap-2 sm:gap-3 mt-5">
            <span className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm text-sm font-medium">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#D0FAE5]">
                <Leaf size={14} className="text-[#009966]" />
              </span>
              Fresh Picks Weekly
            </span>

            <span className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm text-sm font-medium">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#D0FAE5]">
                <Truck size={14} className="text-[#009966]" />
              </span>
              Free Delivery Codes
            </span>

            <span className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm text-sm font-medium">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#D0FAE5]">
                <Gift size={14} className="text-[#009966]" />
              </span>
              Members-Only Deals
            </span>
          </div>

          {/* Input */}
          <div className="flex flex-col sm:flex-row mt-6 gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full flex-1 px-4 py-3 rounded-lg border outline-none"
            />

            <button
              onClick={() => {
                if (!email) return;

                setSubscribed(true);
                alert("Subscribed successfully 🎉");

                setTimeout(() => {
                  setSubscribed(false);
                  setEmail("");
                }, 2000);
              }}
              className="w-full sm:w-auto bg-gradient-to-r from-[#00BC7D] to-[#00BBA7] text-white px-6 py-3 rounded-lg flex items-center justify-center gap-2 transition group"
            >
              {subscribed ? "Subscribed ✓" : "Subscribe"}
              <ArrowRight className="group-hover:translate-x-1 transition" />
            </button>
          </div>

          <p className="text-xs text-gray-500 mt-2">
            ✨ Unsubscribe anytime. No spam, ever.
          </p>
        </div>

        {/* RIGHT */}
        <div className="bg-[#0f172a] text-white rounded-3xl p-5 sm:p-6 md:p-8 mt-6 md:mt-0">
          <span className="bg-[#00BC7D4D] px-3 py-2 rounded-full text-xs flex items-center gap-2 w-fit text-[#00D492]">
            📱 MOBILE APP
          </span>

          <h3 className="text-2xl font-bold mt-4">Shop Faster on Our App</h3>

          <p className="text-[#99A1AF] text-sm mt-2">
            Get app-exclusive deals & 15% off your first order.
          </p>

          {/* Store buttons */}
          <div className="mt-6 space-y-3">
            <div className="bg-gray-700 p-3 rounded-xl flex items-center gap-3">
              <div className="flex flex-col">
                <span className="text-xs text-gray-300">Download on</span>
                <span className="text-sm font-semibold text-white">
                  App Store
                </span>
              </div>
            </div>

            <div className="bg-gray-700 p-3 rounded-xl flex items-center gap-3">
              <div className="flex flex-col">
                <span className="text-xs text-gray-300">Get it on</span>
                <span className="text-sm font-semibold text-white">
                  Google Play
                </span>
              </div>
            </div>
          </div>

          {/* Rating */}
          <div className="mt-5 text-sm text-gray-400 flex items-center gap-2 flex-wrap">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className="fill-yellow-400 text-yellow-400"
                />
              ))}
            </div>
            4.9 • 100K+ downloads
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsletterSection;