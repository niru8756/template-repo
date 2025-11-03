"use client";

import { X } from "lucide-react";
import CheckoutPage from "../checkout-details/CheckoutPage";
import { cartItemDuringCheckout, cartItems } from "@/lib/type/cart.type";

type CheckoutModalProps = {
  isOpen: boolean;
  onClose: () => void;
  cartData?: cartItemDuringCheckout;
  setCartData?: React.Dispatch<React.SetStateAction<cartItems | null>>;
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
};

export default function CheckoutModal({
  isOpen,
  onClose,
  cartData,
  setCartData,
  activeStep,
  setActiveStep,
}: CheckoutModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-white overflow-y-auto w-full">
      {/* Header Section */}
      <div className="sticky top-0 flex items-center justify-between bg-white border-b border-gray-200 px-4 py-3 shadow-sm z-50 md:px-32">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Checkout
        </h1>
        <button
          onClick={onClose}
          className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg transition-colors duration-200"
          title="Close Checkout"
        >
          <X size={22} />
        </button>
      </div>

      {/* Checkout Page */}
      <div className="p-4 sm:p-6">
        <CheckoutPage
          cartData={cartData}
          setCartData={setCartData}
          activeStep={activeStep}
          setActiveStep={setActiveStep}
        />
      </div>
    </div>
  );
}
