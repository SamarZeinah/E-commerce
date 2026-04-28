"use client";

import { useState, useEffect } from "react";
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
  UserPlus,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

const Navbar = () => {
  const { user, logout, isLoading } = useAuth();
  const [open, setOpen] = useState(false);
  const [hideTopBar, setHideTopBar] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setHideTopBar(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    router.push("/Authentication/login");
  };

  return (
    <header className="w-full sticky top-0 z-50 bg-white border-b">
      {/* TOP BAR*/}
      <div
        className={`hidden lg:block bg-gray-50 transition-all duration-300 overflow-hidden ${
          hideTopBar ? "max-h-0 opacity-0" : "max-h-20 opacity-100"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center py-2 text-sm">
          {/* Left */}
          <div className="flex gap-6 items-center">
            <div className="flex items-center font-medium gap-2">
              <Truck size={18} className="text-green-700" />
              <span>Free Shipping on Orders 500 EGP</span>
            </div>

            <div className="flex items-center text-gray-600 gap-2">
              <Gift size={18} className="text-green-700" />
              <span>New Arrivals Daily</span>
            </div>
          </div>

          {/* Right */}
          <div className="flex gap-6 items-center text-gray-600">
            <a
              href="tel:+18001234567"
              className="flex items-center gap-2 cursor-pointer hover:text-green-600 transition"
            >
              <Phone size={16} />
              <span>+1 (800) 123-4567</span>
            </a>

            <a
              href="mailto:support@freshcart.com"
              className="flex items-center gap-2 cursor-pointer hover:text-green-600 transition"
            >
              <Mail size={16} />
              <span>support@freshcart.com</span>
            </a>

            <div className="flex items-center gap-6">
              {user ? (
                <div className="flex items-center gap-2 text-gray-800 cursor-pointer hover:text-green-600 transition group">
                  <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 text-gray-600 group-hover:bg-green-100 group-hover:text-green-600 transition">
                    <User size={16} />
                  </div>

                  <span className="font-medium group-hover:text-green-600 transition">
                    {user.name}
                  </span>
                </div>
              ) : (
                <button
                  onClick={() => router.push("/Authentication/login")}
                  className="flex items-center gap-2 text-gray-800 hover:text-green-700 transition cursor-pointer group"
                >
                  <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 text-gray-600 group-hover:bg-green-100 group-hover:text-green-600 transition">
                    <User size={16} />
                  </div>

                  <span className="text-sm">Sign In</span>
                </button>
              )}
              {/* <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-red-500 hover:text-red-600"
              >
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-red-100 text-red-500">
                  <LogOut size={16} />
                </div>
                <span>Sign Out</span>
              </button> */}
              {user ? (
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-red-500 hover:text-red-600  cursor-pointer"
                >
                  <div className="w-8 h-8 flex items-center justify-center rounded-full bg-red-100 text-red-500">
                    <LogOut size={16} />
                  </div>

                  <span>Sign Out</span>
                </button>
              ) : (
                <button
                  onClick={() => router.push("/Authentication/register")}
                  className="flex items-center gap-2 text-green-600 hover:text-green-700 cursor-pointer"
                >
                  <div className="w-8 h-8 flex items-center justify-center rounded-full bg-green-100 text-green-600">
                    <UserPlus size={16} />
                  </div>

                  <span>Sign Up</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* MAIN NAVBAR*/}
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between py-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="logo" className="w-8 h-8" />
          <h1 className="text-xl font-bold">FreshCart</h1>
        </div>

        {/* Search */}
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

        {/* Links */}
        <nav className="hidden md:flex gap-6 text-gray-700 font-medium ">
          <Link  href="/" className="hover:text-[#00C950]">Home</Link>
          <Link  href="/Store/products" className="hover:text-[#00C950]">Shop</Link>
          <Link  href="/Store/categories" className="hover:text-[#00C950]">Categories</Link>
          <Link  href="/Store/brands" className="hover:text-[#00C950]">Brands</Link>
        </nav>

        {/* Right */}
        <div className="flex items-center gap-3 md:gap-4">
          <div className="hidden lg:flex items-center gap-2 border-r pr-4">
            <Headphones className="text-green-600" size={20} />
            <div className="flex flex-col leading-tight">
              <span className="text-xs text-gray-500">Support</span>
              <span className="text-sm font-medium text-gray-800">
                24/7 Help
              </span>
            </div>
          </div>

          <button>
            <Heart className="text-gray-700 hover:text-red-600 cursor-pointer"/>
          </button>

          <button>
            <ShoppingCart className="text-gray-700 hover:text-blue-600 cursor-pointer" />
          </button>

          {user ? (
            <button
              onClick={() => router.push("/profile")}
              className="flex items-center justify-center w-9 h-9 rounded-full  transition"
            >
              <User className="text-gray-700 hover:text-green-600 cursor-pointer" />
            </button>
          ) : (
            <button
              onClick={() => router.push("/Authentication/login")}
              className="bg-green-600 text-white px-4 py-1.5 rounded-full text-sm hover:bg-green-700 transition  cursor-pointer"
            >
              Sign In
            </button>
          )}
          <button className="md:hidden" onClick={() => setOpen(!open)}>
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* OVERLAY */}
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
          
          <Link  href="/" className="hover:text-[#00C950]">Home</Link>
          <Link  href="/Store/products" className="hover:text-[#00C950]">Shop</Link>
          <Link  href="/Store/categories" className="hover:text-[#00C950]">Categories</Link>
          <Link  href="/Store/brands" className="hover:text-[#00C950]">Brands</Link>
     
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

            {/* <a
              href="/profile"
              className="flex items-center gap-3 py-3 px-3 rounded-lg hover:bg-gray-100 transition"
            >
              <div className="w-9 h-9 flex items-center justify-center rounded-full bg-green-100 text-green-600">
                <User size={18} />
              </div>

              <span className="text-sm font-medium text-gray-800">Profile</span>
            </a>

            <button
              className="flex items-center gap-3 py-3 px-3 rounded-lg hover:bg-gray-100 transition text-red-500 cursor-pointer"
              onClick={handleLogout}
            >
              <div className="w-9 h-9 flex items-center justify-center rounded-full bg-red-100 text-red-500">
                <LogOut size={18} />
              </div>

              <span className="text-sm font-medium">Sign Out</span>
            </button> */}
            {user ? (
              <>
                {/* Profile */}
                <a
                  href="/profile"
                  className="flex items-center gap-3 py-3 px-3 rounded-lg hover:bg-gray-100 transition"
                >
                  <div className="w-9 h-9 flex items-center justify-center rounded-full bg-green-100 text-green-600">
                    <User size={18} />
                  </div>

                  <span className="text-sm font-medium text-gray-800">
                    Profile
                  </span>
                </a>

                {/* Sign Out */}
                <button
                  className="flex items-center gap-3 py-3 px-3 rounded-lg hover:bg-gray-100 transition text-red-500 cursor-pointer"
                  onClick={() => {
                    logout();
                    setOpen(false);
                  }}
                >
                  <div className="w-9 h-9 flex items-center justify-center rounded-full bg-red-100 text-red-500">
                    <LogOut size={18} />
                  </div>

                  <span className="text-sm font-medium">Sign Out</span>
                </button>
              </>
            ) : (
              <>
                {/* Sign In */}
                <button
                  onClick={() => {
                    router.push("/Authentication/login");
                    setOpen(false);
                  }}
                  className="flex items-center gap-3 py-3 px-3 rounded-lg hover:bg-gray-100 transition text-green-600"
                >
                  <div className="w-9 h-9 flex items-center justify-center rounded-full bg-green-100 text-green-600">
                    <User size={18} />
                  </div>

                  <span className="text-sm font-medium">Sign In</span>
                </button>

                {/* Sign Up */}
                <button
                  onClick={() => {
                    router.push("/Authentication/register");
                    setOpen(false);
                  }}
                  className="flex items-center gap-3 py-3 px-3 rounded-lg hover:bg-gray-100 transition text-green-600"
                >
                  <div className="w-9 h-9 flex items-center justify-center rounded-full bg-green-100 text-green-600">
                    <UserPlus size={18} />
                  </div>

                  <span className="text-sm font-medium">Sign Up</span>
                </button>
              </>
            )}
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
