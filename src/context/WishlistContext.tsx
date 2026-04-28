// /context/WishlistContext.tsx
"use client";
import { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";

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
};

const WishlistContext = createContext<WishlistContextType | null>(null);

export const WishlistProvider = ({ children }: { children: React.ReactNode }) => {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

 
  const getWishlist = async () => {
    try {
      const res = await axiosInstance.get("/wishlist");
      setWishlist(res.data.data);
      setWishlistIds(res.data.data.map((item: WishlistItem) => item._id));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getWishlist();
  }, []);

  const addToWishlist = async (productId: string) => {
    try {
      await axiosInstance.post("/wishlist", { productId });
      setWishlistIds(prev => [...prev, productId]);
      await getWishlist();
    } catch (err) {
      console.log(err);
    }
  };

  const removeFromWishlist = async (productId: string) => {
    try {
      await axiosInstance.delete(`/wishlist/${productId}`);
      setWishlistIds(prev => prev.filter(id => id !== productId));
      setWishlist(prev => prev.filter(item => item._id !== productId));
    } catch (err) {
      console.log(err);
    }
  };

  const isInWishlist = (productId: string) => wishlistIds.includes(productId);

  return (
    <WishlistContext.Provider value={{
      wishlist, wishlistIds, addToWishlist, removeFromWishlist, isInWishlist, loading
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