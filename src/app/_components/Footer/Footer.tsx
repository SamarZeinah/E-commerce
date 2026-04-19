"use client";
import React from "react";
import {
  Phone,
  Mail,
  MapPin,
  Truck,
  RefreshCcw,
  ShieldCheck,
  Headset,
} from "lucide-react";

const Footer = () => {
  const features = [
    {
      title: "Free Shipping",
      desc: "On orders over 500 EGP",
      icon: Truck,
    },
    {
      title: "Easy Returns",
      desc: "14-day return policy",
      icon: RefreshCcw,
    },
    {
      title: "Secure Payment",
      desc: "100% secure checkout",
      icon: ShieldCheck,
    },
    {
      title: "24/7 Support",
      desc: "Contact us anytime",
      icon: Headset,
    },
  ];

  const socialIcons = [
    { img: "/facebook.png", link: "#" },
    { img: "/twiter.png", link: "#" },
    { img: "/youtube.png", link: "#" },
    { img: "/insta.png", link: "#" },
  ];
  return (
    <>
      <div className="bg-green-50">
        <div className="max-w-7xl mx-auto py-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i} className="flex items-center gap-3 p-3">
                <div className="w-11 h-11 flex items-center justify-center bg-green-100 rounded-full shrink-0">
                  <Icon className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="font-semibold text-green-700">{item.title}</p>
                  <p className="text-xs text-gray-500">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <footer className="bg-[#0B1B2B] text-gray-300 pt-12">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {/* Logo + Info */}
          <div className="col-span-2">
            <img src="/logo-white.png" alt="logo" className="w-40 mb-4" />

            <p className="text-sm mb-4">
              FreshCart is your one-stop destination for quality products. From
              fashion to electronics, we bring you the best brands at
              competitive prices with a seamless shopping experience
            </p>

            {/* Contact */}
            <div className="space-y-3 text-sm">
              <a
                href="tel:+18001234567"
                className="flex items-center gap-2 group"
              >
                <Phone className="text-[#16A34A]  transition" size={16} />
                <span className="group-hover:text-[#16A34A] transition">
                  +1 (800) 123-4567
                </span>
              </a>

              <a
                href="mailto:support@freshcart.com"
                className="flex items-center gap-2 group"
              >
                <Mail className="text-[#16A34A]  transition" size={16} />
                <span className="group-hover:text-[#16A34A] transition">
                  support@freshcart.com
                </span>
              </a>

              <a href="#" className="flex items-center gap-2 group">
                <MapPin className="text-[#16A34A]  transition" size={16} />
                <span className="group-hover:text-[#16A34A] transition">
                  123 Commerce Street, NY
                </span>
              </a>
              {/* Social Icons */}
              <div className="flex gap-3">
                {socialIcons.map((item, i) => (
                  <a
                    key={i}
                    href={item.link}
                    className="w-10 h-10 flex items-center justify-center rounded-full
transition duration-300 transform hover:scale-110 hover:-translate-y-1"
                  >
                    <img src={item.img} alt="social" className="w-8 h-8" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-white font-semibold mb-3">Shop</h3>
            <ul className="space-y-2 text-sm">
              {[
                "All Products",
                "Categories",
                "Brands",
                "Electronics",
                "Men's Fashion",
                "Women's Fashion",
              ].map((item, i) => (
                <li
                  key={i}
                  className="hover:text-[#16A34A] cursor-pointer transition"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Account */}
          <div>
            <h3 className="text-white font-semibold mb-3">Account</h3>
            <ul className="space-y-2 text-sm">
              {[
                "My Account",
                "Order History",
                "Wishlist",
                "Shopping Cart",
                "Sign In",
                "Create Account",
              ].map((item, i) => (
                <li
                  key={i}
                  className="hover:text-[#16A34A] cursor-pointer transition"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold mb-3">Support</h3>
            <ul className="space-y-2 text-sm">
              {[
                "Contact Us",
                "Help Center",
                "Shipping Info",
                "Returns & Refunds",
                "Track Order",
              ].map((item, i) => (
                <li
                  key={i}
                  className="hover:text-[#16A34A] cursor-pointer transition"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-semibold mb-3">Legal</h3>
            <ul className="space-y-2 text-sm">
              {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(
                (item, i) => (
                  <li
                    key={i}
                    className="hover:text-[#16A34A] cursor-pointer transition"
                  >
                    {item}
                  </li>
                ),
              )}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-700 mt-10 py-4 text-center text-sm">
          © 2026 FreshCart. All rights reserved.
        </div>
      </footer>
    </>
  );
};

export default Footer;
