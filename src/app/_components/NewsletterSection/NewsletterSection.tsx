"use client";

import {
  Mail,
  Leaf,
  Truck,
  Gift,
  Smartphone,
  Star,
  ArrowRight,
  Apple,
  Play,
} from "lucide-react";
import { useState } from "react";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  return (
    <div className="px-4 md:px-10 py-16 max-w-7xl mx-auto">
      <div className="grid md:grid-cols-2 gap-10 bg-green-50 rounded-3xl p-8 md:p-12 items-center">
        {/* LEFT */}
        <div>
          {/* Badge */}
          <div className="flex items-start gap-3">
            {/* Icon box */}
            <div className="w-13 h-13 bg-gradient-to-r from-[#00BC7D] to-[#00BBA7] rounded-xl flex items-center justify-center">
              <Mail size={25} className="text-white" />
            </div>

            {/* Text */}
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
          <div className="flex flex-wrap gap-3 mt-5">
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
          {/* <div className="flex mt-6 gap-3">
            <input
              type="email"
              placeholder="you@example.com"
              className="flex-1 px-4 py-3 rounded-lg border outline-none"
            />

            <button className="bg-gradient-to-r from-[#00BC7D] to-[#00BBA7] text-white px-6 py-3 rounded-lg flex items-center gap-2 transition group">
              Subscribe
              <ArrowRight className="group-hover:translate-x-1 transition" />
            </button>
          </div> */}
<div className="flex mt-6 gap-3">
  <input
    type="email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    placeholder="you@example.com"
    className="flex-1 px-4 py-3 rounded-lg border outline-none"
  />

  <button
    onClick={() => {
      if (!email) return;

      setSubscribed(true);

      // toast
      alert("Subscribed successfully 🎉"); 
      // لو عندك react-hot-toast بدّليها بـ toast.success

      setTimeout(() => {
        setSubscribed(false);
        setEmail("");
      }, 2000);
    }}
    className="bg-gradient-to-r from-[#00BC7D] to-[#00BBA7] text-white px-6 py-3 rounded-lg flex items-center gap-2 transition group"
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
        <div className="bg-[#0f172a] text-white rounded-3xl p-6 md:p-8">
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6 text-white"
              >
                <path d="M16.365 1.43c0 1.14-.465 2.19-1.223 2.93-.81.79-2.14 1.4-3.32 1.31-.15-1.12.44-2.3 1.17-3.04.81-.83 2.22-1.44 3.37-1.2zm4.64 16.4c-.47 1.08-.69 1.56-1.29 2.56-.84 1.4-2.02 3.15-3.48 3.16-1.3.01-1.64-.84-3.41-.83-1.77.01-2.15.85-3.45.84-1.46-.01-2.58-1.57-3.42-2.97-2.35-3.9-2.6-8.48-1.15-10.7 1.03-1.57 2.65-2.49 4.17-2.49 1.55 0 2.52.85 3.8.85 1.24 0 2-.85 3.8-.85 1.35 0 2.78.74 3.8 2.02-3.35 1.84-2.8 6.63.63 7.41z" />
              </svg>

              <div className="flex flex-col">
                <span className="text-xs text-gray-300">Download on</span>
                <span className="text-sm font-semibold text-white">
                  App Store
                </span>
              </div>
            </div>

            <div className="bg-gray-700 p-3 rounded-xl flex items-center gap-3">
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6 text-white"
              >
                <path d="M7 4.5c-.8-.5-1.8.1-1.8 1v13c0 .9 1 1.5 1.8 1l10.5-6.5c.7-.4.7-1.4 0-1.8L7 4.5z" />
              </svg>

              <div className="flex flex-col">
                <span className="text-xs text-gray-300">Get it on</span>
                <span className="text-sm font-semibold text-white">
                  Google Play
                </span>
              </div>
            </div>
          </div>

          {/* Rating */}
          <div className="mt-5 text-sm text-gray-400 flex items-center gap-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className="fill-yellow-400 text-yellow-400"
                />
              ))}
            </div>{" "}
            4.9 • 100K+ downloads
          </div>
        </div>
      </div>
    </div>
  );
};
export default NewsletterSection;
