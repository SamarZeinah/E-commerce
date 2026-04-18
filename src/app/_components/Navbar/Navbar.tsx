"use client";

import { useState } from "react";
import {
  ShoppingCart,
  Heart,
  User,
  Search,
  Menu,
  X,
  Headphones,
  LogOut,
  Truck,
  Gift,
  Mail,
  Phone,
} from "lucide-react";
const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full border-b relative">
      {/* Top bar */}
      <div className="hidden lg:flex justify-between items-center px-6 py-2 text-sm bg-gray-50">
        {/* Left side */}
        <div className="flex gap-6 items-center">
          <div className="flex items-center  font-medium">
            <div className="w-8 h-8 flex items-center  text-green-700">
              <Truck size={18} />
            </div>
            <span>Free Shipping on Orders 500 EGP</span>
          </div>

          <div className="flex items-center  text-gray-600">
            <div className="w-8 h-8 flex items-center  text-green-700">
              <Gift size={18} />
            </div>
            <span>New Arrivals Daily</span>
          </div>
        </div>

        {/* Right side */}
        <div className="flex gap-6 items-center text-gray-600">
          <div className="flex items-center gap-2">
            <Phone size={16} />
            <span>+1 (800) 123-4567</span>
          </div>

          <div className="flex items-center gap-2">
            <Mail size={16} />
            <span>support@freshcart.com</span>
          </div>
          <div className="flex items-center gap-6">
            {/* User */}
            <div className="flex items-center gap-2 text-gray-800">
              <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 text-gray-600">
                <User size={16} />
              </div>

              <span className="font-medium">Samar Zeinah</span>
            </div>

            {/* Sign out */}
            <button className="flex items-center gap-2 text-sm text-red-500 hover:text-red-600 transition">
              <div className="w-8 h-8 flex items-center justify-center rounded-full bg-red-100 text-red-500">
                <LogOut size={16} />
              </div>

              <span className="hover:underline">Sign Out</span>
            </button>
          </div>
        </div>
      </div>
      {/* Main navbar */}
      <div className="flex items-center justify-between px-4 md:px-6 py-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="logo" className="w-8 h-8" />
          <h1 className="text-xl font-bold">FreshCart</h1>
        </div>

        {/* Desktop Search */}
        <div className="hidden md:flex w-1/3 border rounded-full overflow-hidden">
          <input
            type="text"
            placeholder="Search for products..."
            className="w-full px-4 py-2 outline-none"
          />
          <button className="bg-green-600 text-white px-4 flex items-center justify-center">
            <Search size={18} />
          </button>
        </div>

        {/* Desktop Links */}
        <nav className="hidden md:flex gap-6 text-gray-700 font-medium">
          <a href="#" className="hover:text-green-600">
            Home
          </a>
          <a href="#" className="hover:text-green-600">
            Shop
          </a>
          <a href="#" className="hover:text-green-600">
            Categories
          </a>
          <a href="#" className="hover:text-green-600">
            Brands
          </a>
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-3 md:gap-4">
          {/* Support (desktop only) */}
          <div className="hidden lg:flex items-center gap-2 border-r pr-4">
            <Headphones className="text-green-600" size={20} />
            <div className="flex flex-col leading-tight">
              <span className="text-xs text-gray-500">Support</span>
              <span className="text-sm font-medium text-gray-800">
                24/7 Help
              </span>
            </div>
          </div>
          {/* Icons - ONLY desktop + only when menu closed */}
          <div
            className={`hidden md:flex items-center gap-3 md:gap-4 ${open ? "hidden" : ""}`}
          >
            <button className="relative">
              <Heart />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 rounded-full">
                1
              </span>
            </button>

            <button>
              <ShoppingCart />
            </button>

            <button>
              <User />
            </button>
          </div>

          {/* Menu button (mobile only) */}
          <button className="md:hidden" onClick={() => setOpen(!open)}>
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/30 z-40"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Mobile menu */}
      <div
        className={`fixed top-0 right-0 h-full w-3/4 max-w-sm bg-white z-50 shadow-lg transform transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        } md:hidden`}
      >
        <div className="p-4 flex justify-between items-center border-b">
          <h2 className="font-bold text-lg">Menu</h2>
          <button onClick={() => setOpen(false)}>
            <X />
          </button>
        </div>

        <div className="p-4 flex flex-col">
          {/* Search */}
          <div className="flex border rounded-full overflow-hidden mb-4">
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-3 py-2 outline-none"
            />
            <button className="bg-green-600 text-white px-4">
              <Search size={18} />
            </button>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-3">
            <a href="#">Home</a>
            <a href="#">Shop</a>
            <a href="#">Categories</a>
            <a href="#">Brands</a>
          </div>

          <div className="border-t my-3" />

          {/* Icons inside menu */}
          <div className="flex flex-col ">
            <a
              href="/wishlist"
              className="flex items-center gap-3 py-3 px-3 rounded-lg hover:bg-gray-100 transition"
            >
              <div className="w-9 h-9 flex items-center justify-center rounded-full bg-pink-100 text-pink-600">
                <Heart size={18} />
              </div>

              <span className="text-sm font-medium text-gray-800">
                Wishlist
              </span>
            </a>

            <a
              href="/cart"
              className="flex items-center gap-3 py-3 px-3 rounded-lg hover:bg-gray-100 transition"
            >
              <div className="w-9 h-9 flex items-center justify-center rounded-full bg-blue-100 text-blue-600">
                <ShoppingCart size={18} />
              </div>

              <span className="text-sm font-medium text-gray-800">Cart</span>
            </a>
            <div className="border-t my-3" />

            <a
              href="/profile"
              className="flex items-center gap-3 py-3 px-3 rounded-lg hover:bg-gray-100 transition"
            >
              <div className="w-9 h-9 flex items-center justify-center rounded-full bg-green-100 text-green-600">
                <User size={18} />
              </div>

              <span className="text-sm font-medium text-gray-800">Profile</span>
            </a>

            <button className="flex items-center gap-3 py-3 px-3 rounded-lg hover:bg-gray-100 transition text-red-500">
              <div className="w-9 h-9 flex items-center justify-center rounded-full bg-red-100 text-red-500">
                <LogOut size={18} />
              </div>

              <span className="text-sm font-medium">Sign Out</span>
            </button>
          </div>

          {/* Support */}
          <div className="flex items-center gap-4 p-3 rounded-lg bg-gray-50 ">
            <Headphones className="text-green-600" />
            <div>
              <p className="text-sm font-medium">Support</p>
              <p className="text-xs text-gray-500">24/7 Help Center</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
