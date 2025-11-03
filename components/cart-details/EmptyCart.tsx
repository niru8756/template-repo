"use client";

import { ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";

export default function EmptyCart() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white flex items-center justify-center">
      <div className="text-center">
        <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Your Cart is Empty
        </h2>
        <p className="text-gray-600 mb-6">
          Add items to your cart to get started
        </p>
        <button
          onClick={() => router.push("/products")}
          className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition"
        >
          Start Shopping
        </button>
      </div>
    </div>
  );
}
