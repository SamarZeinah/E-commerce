"use client";

import { useState, useEffect } from "react";
import { useWishlist } from "@/context/WishlistContext";
import { ChevronDown, MapPin, Settings } from "lucide-react";
import { useCart } from "@/context/CartContext";
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
import axiosInstance from "@/lib/axios";

const Navbar = () => {
  const FEATURED_CATEGORY_IDS = [
    "6439d2d167d9aa4ca970649f", // Electronics
    "6439d58a0049ad0b52b9003f", // Women's Fashion
    "6439d5b90049ad0b52b90048", // Men's Fashion
    "6439d30b67d9aa4ca97064b1", // Beauty & Health
  ];
  const { user, logout, isLoading } = useAuth();
  const [open, setOpen] = useState(false);
  const [hideTopBar, setHideTopBar] = useState(false);
  const { wishlist } = useWishlist();

  const router = useRouter();
  const [catOpen, setCatOpen] = useState(false);
  const { cartCount } = useCart();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  useEffect(() => {
    const handleClickOutside = () => setUserMenuOpen(false);
    if (userMenuOpen) {
      window.addEventListener("click", handleClickOutside);
    }

    return () => window.removeEventListener("click", handleClickOutside);
  }, [userMenuOpen]);
  // useEffect(() => {
  //   const handleScroll = () => {
  //     setHideTopBar(window.scrollY > 10);
  //   };

  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);

  useEffect(() => {
  let ticking = false;

  const handleScroll = () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        setHideTopBar(window.scrollY > 10);
        ticking = false;
      });
      ticking = true;
    }
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  return () => window.removeEventListener("scroll", handleScroll);
}, []);

  const handleLogout = () => {
    logout();
    router.push("/Authentication/Login");
  };
  const [categories, setCategories] = useState<{ _id: string; name: string }[]>(
    [],
  );

  useEffect(() => {
    axiosInstance.get("/categories").then((res) => {
      const all = res.data.data;

      const filtered = all.filter((cat: { _id: string; name: string }) =>
        FEATURED_CATEGORY_IDS.includes(cat._id),
      );
      setCategories(filtered);
    });
  }, []);

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
                  onClick={() => router.push("/Authentication/Login")}
                  className="flex items-center gap-2 text-gray-800 hover:text-green-700 transition cursor-pointer group"
                >
                  <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 text-gray-600 group-hover:bg-green-100 group-hover:text-green-600 transition">
                    <User size={16} />
                  </div>

                  <span className="text-sm">Sign In</span>
                </button>
              )}
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
          <Link href="/" className="hover:text-[#00C950]">
            Home
          </Link>
          <Link href="/Store/products" className="hover:text-[#00C950]">
            Shop
          </Link>
          <div
            className="relative"
            onMouseEnter={() => setCatOpen(true)}
            onMouseLeave={() => setCatOpen(false)}
          >
            <button className="flex items-center gap-1 hover:text-[#00C950] transition-colors">
              Categories
              <ChevronDown
                size={16}
                className="transition-transform duration-300"
                style={{
                  transform: catOpen ? "rotate(180deg)" : "rotate(0deg)",
                }}
              />
            </button>

            <div
              className={`absolute top-full left-0 w-52 bg-white border rounded-xl shadow-lg z-50 overflow-hidden transition-all duration-200 ${
                catOpen ? "opacity-100 visible" : "opacity-0 invisible"
              }`}
            >
              <div className="pt-2">
                {/* All Categories  */}
                <Link
                  href="/Store/categories"
                  className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#00C950]"
                >
                  All Categories
                </Link>

                {categories.map((cat) => (
                  <Link
                    key={cat._id}
                    href={`/Store/products?category=${cat._id}`}
                    className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#00C950] transition-colors"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>{" "}
          <Link href="/Store/brands" className="hover:text-[#00C950]">
            Brands
          </Link>
        </nav>

        {/* Right */}
        <div className=" flex items-center gap-3 md:gap-4">
          <div
            onClick={() => router.push("/Store/contact")}
            className=" cursor-pointer hidden lg:flex items-center gap-2 border-r pr-4"
          >
            <Headphones className="text-green-600" size={20} />
            <div className="flex flex-col leading-tight">
              <span className="text-xs text-gray-500">Support</span>
              <span className="text-sm font-medium text-gray-800">
                24/7 Help
              </span>
            </div>
          </div>

          <Link href="/Store/wishlist">
             <div className="relative cursor-pointer">
  <Heart  />

  {wishlist.length > 0 && (
    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full">
      {wishlist.length}
    </span>
  )}
</div>

          </Link>
       
        
          <button
            className="relative"
            onClick={() => router.push("/Store/cart")}
          >
            <ShoppingCart className="text-gray-700 hover:text-blue-600 cursor-pointer" />

            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </button>
          {user ? (
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setUserMenuOpen((prev) => !prev);
                }}
                className="flex items-center justify-center w-9 h-9 rounded-full"
              >
                <User className="text-gray-700 hover:text-green-600 cursor-pointer" />
              </button>

              {/* DROPDOWN */}
              {userMenuOpen && (
                <div className="absolute right-0 mt-3 w-64 bg-white border rounded-2xl shadow-lg z-50 overflow-hidden animate-fadeIn">
                  <div className="p-4 border-b flex items-center gap-3">
                    {/* GREEN ICON CIRCLE */}
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                      <User className="text-green-600" size={18} />
                    </div>

                    {/* NAME */}
                    <div>
                      <p className="font-semibold text-gray-800">{user.name}</p>
                    </div>
                  </div>

                  <div className="flex flex-col text-sm text-gray-700">
                    <button
                      onClick={() => router.push("/Store/Profile")}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 hover:text-green-600 cursor-pointer"
                    >
                      <User size={16} /> My Profile
                    </button>

                    <button
                      onClick={() => router.push("/Store/orders")}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 hover:text-green-600 cursor-pointer"
                    >
                      <Truck size={16} /> My Orders
                    </button>

                    <button
                      onClick={() => router.push("/Store/wishlist")}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 hover:text-green-600 cursor-pointer"
                    >
                      <Heart size={16} /> My Wishlist
                    </button>

                    <button
                      onClick={() =>
                        router.push("/Store/Profile?tab=addresses")
                      }
                      className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 hover:text-green-600 cursor-pointer"
                    >
                      <MapPin size={16} /> Addresses
                    </button>

                    <button
                      onClick={() => router.push("/Store/Profile?tab=settings")}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 hover:text-green-600 cursor-pointer"
                    >
                      <Settings size={16} /> Settings
                    </button>
                  </div>

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 border-t cursor-pointer"
                  >
                    <LogOut size={16} /> Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
           
            <button
              onClick={() => router.push("/Authentication/Login")}
              className= "cursor-pointer bg-green-600 text-white px-4 py-1.5 rounded-full text-sm hover:bg-green-700 transition"
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
            <Link href="/" className="hover:text-[#00C950]">
              Home
            </Link>
            <Link href="/Store/products" className="hover:text-[#00C950]">
              Shop
            </Link>
            {/* <Link href="/Store/categories" className="hover:text-[#00C950]">
              Categories
            </Link> */}

            <div className="flex flex-col">
  <button
    onClick={() => setCatOpen((prev) => !prev)}
    className="flex items-center justify-between hover:text-[#00C950] py-1"
  >
    <span>Categories</span>
    <ChevronDown
      size={16}
      className="transition-transform duration-300"
      style={{ transform: catOpen ? "rotate(180deg)" : "rotate(0deg)" }}
    />
  </button>

  {catOpen && (
    <div className="flex flex-col pl-4 mt-1 gap-1 border-l border-gray-200">
      <Link
        href="/Store/categories"
        onClick={() => setOpen(false)}
        className="text-sm text-gray-700 py-1.5 hover:text-[#00C950]"
      >
        All Categories
      </Link>

      {categories.map((cat) => (
        <Link
          key={cat._id}
          href={`/Store/products?category=${cat._id}`}
          onClick={() => setOpen(false)}
          className="text-sm text-gray-700 py-1.5 hover:text-[#00C950]"
        >
          {cat.name}
        </Link>
      ))}
    </div>
  )}
</div>
            <Link href="/Store/brands" className="hover:text-[#00C950]">
              Brands
            </Link>
          </div>

          <div className="border-t my-3" />

          {/* Icons inside menu */}
          <div className="flex flex-col ">
            <a
              href="Store/wishlist"
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
              href="/Store/cart"
              className="flex items-center gap-3 py-3 px-3 rounded-lg hover:bg-gray-100 transition"
            >
              {/* Icon container */}
              <div className="relative w-9 h-9 flex items-center justify-center rounded-full bg-blue-100 text-blue-600">
                <ShoppingCart size={18} />

                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                    {cartCount}
                  </span>
                )}
              </div>

              <span className="text-sm font-medium text-gray-800">Cart</span>
            </a>
            <div className="border-t my-3" />

            {user ? (
              <>
                {/* Profile */}
                <a
                  href="/Store/Profile"
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
                    router.push("/Authentication/Login");
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
          <div
            onClick={() => router.push("/Store/contact")}
            className="cursor-pointer flex items-center gap-4 p-3 rounded-lg bg-gray-50 "
          >
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
