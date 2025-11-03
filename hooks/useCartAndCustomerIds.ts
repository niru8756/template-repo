"use client";
import { useEffect, useState } from "react";

interface CartAndCustomer {
  cartId: string;
  customerId: string;
  loading: boolean;
}

export const useCartAndCustomerId = (): CartAndCustomer => {
  const [cartId, setCartId] = useState<string>("");
  const [customerId, setCustomerId] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {

    if (typeof window !== "undefined") {
      const storedCartId = localStorage.getItem("cartId") ?? "";
      const storedCustomerId = localStorage.getItem("customerId") ?? "";

      setCartId(storedCartId);
      setCustomerId(storedCustomerId);
    }

    setLoading(false);
  }, []);

  return { cartId, customerId, loading };
};
