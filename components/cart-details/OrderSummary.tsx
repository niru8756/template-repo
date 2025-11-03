"use client";

import { ArrowRight } from "lucide-react";

type OrderSummaryProps = {
  totalItems: number;
  totalAmount: number;
  onCheckout: () => void;
  onContinueShopping: () => void;
};

export default function OrderSummary({
  totalItems,
  totalAmount,
  onCheckout,
  onContinueShopping,
}: OrderSummaryProps) {
  return (
    <div className="space-y-6">
      {/* Summary Card */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 lg:sticky lg:top-8">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h2>

        {/* Breakdown */}
        <div className="space-y-3 pb-4 border-b border-gray-200">
          <div className="flex justify-between text-gray-600">
            <span>Subtotal ({totalItems} items)</span>
            <span>₹{(totalAmount * 0.9).toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Shipping</span>
            <span className="text-green-600 font-medium">Free</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Tax</span>
            <span>₹{Math.ceil(totalAmount * 0.1).toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Discount</span>
            <span className="text-green-600 font-medium">-₹0</span>
          </div>
        </div>

        {/* Total */}
        <div className="flex justify-between items-center pt-4 mb-6">
          <span className="font-semibold text-gray-900">Total</span>
          <span className="text-3xl font-bold text-orange-600">
            ₹{totalAmount.toLocaleString()}
          </span>
        </div>

        {/* Checkout Button */}
        <button
          onClick={onCheckout}
          className="cursor-pointer w-full bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold text-lg transition transform flex items-center justify-center gap-2 shadow-lg"
        >
          Proceed to Checkout
          <ArrowRight size={20} />
        </button>

        {/* Continue Shopping */}
        <button
          onClick={onContinueShopping}
          className="cursor-pointer w-full mt-3 border-2 border-orange-500 text-orange-600 hover:bg-orange-50 px-6 py-3 rounded-lg font-semibold transition"
        >
          Continue Shopping
        </button>
      </div>

      {/* Info Cards */}
      <div className="space-y-3">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-700">
            <span className="font-semibold">Free Shipping</span> on orders above
            ₹500
          </p>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-sm text-green-700">
            <span className="font-semibold">Easy Returns</span> within 30 days
          </p>
        </div>
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <p className="text-sm text-purple-700">
            <span className="font-semibold">Secure Payment</span> SSL encrypted
            checkout
          </p>
        </div>
      </div>
    </div>
  );
}
