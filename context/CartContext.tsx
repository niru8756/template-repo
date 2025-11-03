// context/CartContext.tsx
"use client";

import { getCart } from "@/lib/api/cart.api";
import React, { createContext, useContext, useState, useEffect } from "react";

type CartContextType = {
  cartCount: number;
  setCartCount: (count: number) => void;
  incrementCart: () => void;
  decrementCart: () => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cartCount, setCartCount] = useState(0);

  // Load cart count from localStorage on mount
  useEffect(() => {
    const fetchCartCount = async () => {
      try {
        const customerId = localStorage.getItem("customerId");
        if (!customerId) return;

        const res = await getCart(customerId);
        const items = res?.data?.items || [];
        setCartCount(items.length);
      } catch (error) {
        console.error("Failed to fetch cart count:", error);
        setCartCount(0);
      }
    };

    fetchCartCount();
  }, []);

  const incrementCart = () => setCartCount((prev) => prev + 1);
  const decrementCart = () => setCartCount((prev) => (prev > 0 ? prev - 1 : 0));
  const clearCart = () => setCartCount(0);

  return (
    <CartContext.Provider
      value={{ cartCount, setCartCount, incrementCart, decrementCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
};
