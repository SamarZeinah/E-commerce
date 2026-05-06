// /context/WishlistContext.tsx
"use client";
import { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";
import toast from "react-hot-toast";

type WishlistItem = {
  _id: string;
  title: string;
  imageCover: string;
  price: number;
  ratingsAverage: number;
  category: {       
    name: string;
  };
};

type WishlistContextType = {
  wishlist: WishlistItem[];
  wishlistIds: string[];
  addToWishlist: (productId: string) => Promise<void>;
  removeFromWishlist: (productId: string) => Promise<void>;
  isInWishlist: (productId: string) => boolean;
  loading: boolean;
    initialized: boolean;
};

const WishlistContext = createContext<WishlistContextType | null>(null);

export const WishlistProvider = ({ children }: { children: React.ReactNode }) => {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
const [initialized, setInitialized] = useState(false);
  
 

//   const getWishlist = async () => {
//   setLoading(true);
//   try {
//     const res = await axiosInstance.get("/wishlist");
//     setWishlist(res.data.data);
//     setWishlistIds(res.data.data.map((item: WishlistItem) => item._id));
//   } catch (err) {
//     console.log(err);
//   } finally {
//     setLoading(false);
//   }
// };

const getWishlist = async () => {
  setLoading(true);

  try {
    const res = await axiosInstance.get("/wishlist");
    setWishlist(res.data.data);
    setWishlistIds(res.data.data.map((item: WishlistItem) => item._id));
    setInitialized(true); // 👈 مهم
  } catch (err) {
    console.log(err);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    getWishlist();
  }, []);



  const addToWishlist = async (productId: string) => {
  const toastId = toast.loading("Adding to wishlist...");

  try {
    await axiosInstance.post("/wishlist", { productId });

    setWishlistIds(prev => [...prev, productId]);
    await getWishlist();

    toast.success("Added to wishlist ❤️", { id: toastId });
  } catch (err) {
    console.log(err);
    toast.error("Failed to add ❌", { id: toastId });
  }
};

  // const removeFromWishlist = async (productId: string) => {
  //   try {
  //     await axiosInstance.delete(`/wishlist/${productId}`);
  //     setWishlistIds(prev => prev.filter(id => id !== productId));
  //     setWishlist(prev => prev.filter(item => item._id !== productId));
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const removeFromWishlist = async (productId: string) => {
  const toastId = toast.loading("Removing...");

  try {
    await axiosInstance.delete(`/wishlist/${productId}`);

    setWishlistIds(prev => prev.filter(id => id !== productId));
    setWishlist(prev => prev.filter(item => item._id !== productId));

    toast.success("Removed from wishlist 🗑️", { id: toastId });
  } catch (err) {
    console.log(err);
    toast.error("Failed to remove ❌", { id: toastId });
  }
};

  const isInWishlist = (productId: string) => wishlistIds.includes(productId);

  return (
    <WishlistContext.Provider value={{
      wishlist, wishlistIds, addToWishlist, removeFromWishlist, isInWishlist, loading ,initialized,
    }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used inside WishlistProvider");
  return ctx;
};