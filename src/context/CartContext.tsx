"use client";

import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

type CartContextType = {
  cartCount: number;
  refreshCart: () => void;
  increaseCart: () => void;
};

const CartContext = createContext<CartContextType>({
  cartCount: 0,
  refreshCart: () => {},
  increaseCart: () => {},
});

export const CartProvider = ({ children }: any) => {
  const [cartCount, setCartCount] = useState(0);

  const getCart = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) return;

      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v2/cart",
        {
          headers: {
            token,
          },
        }
      );

      setCartCount(data.numOfCartItems || 0);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCart();
  }, []);

  const refreshCart = () => {
    getCart();
  };

  // 🔥 الحل الأسرع (تحديث فوري بدون API)
  const increaseCart = () => {
    setCartCount((prev) => prev + 1);
  };

  return (
    <CartContext.Provider
      value={{ cartCount, refreshCart, increaseCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);