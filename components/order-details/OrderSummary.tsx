"use client";

import { Order, OrderItem } from "@/lib/type/order.type";

type OrderSummaryProps = {
  order: Order;
  currentItem: OrderItem;
};

export default function OrderSummary({
  order,
  currentItem,
}: OrderSummaryProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h2 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h2>
      <div className="space-y-3 pb-4 border-b border-gray-200">
        <div className="flex justify-between text-gray-600">
          <span>Product Price</span>
          <span>
            ₹{(currentItem?.price * currentItem?.quantity).toLocaleString()}
          </span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Shipping</span>
          <span>₹0</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Tax</span>
          <span>₹0</span>
        </div>
      </div>
      <div className="flex justify-between items-center pt-4">
        <span className="font-semibold text-gray-900">Total</span>
        <span className="text-2xl font-bold text-orange-600">
          ₹{order.totalAmount.toLocaleString()}
        </span>
      </div>
    </div>
  );
}
