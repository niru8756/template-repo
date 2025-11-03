"use client";

import { CreditCard } from "lucide-react";
import { Order } from "@/lib/type/order.type";

type PaymentDetailsProps = {
  order: Order;
};

function getStatusLabel(status: string) {
  const labels: { [key: string]: string } = {
    CONFIRMED: "Order Confirmed",
    PROCESSING: "Processing",
    SHIPPED: "On the Way",
    DELIVERED: "Delivered",
    CANCELLED: "Cancelled",
    PENDING: "Pending",
  };
  return labels[status] || status;
}

export default function PaymentDetails({ order }: PaymentDetailsProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
        <CreditCard className="w-5 h-5" />
        Payment Details
      </h2>
      <div className="space-y-2">
        <div>
          <p className="text-sm text-gray-600">Payment Method</p>
          <p className="font-semibold text-gray-900">{order.paymentMethod}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Order Status</p>
          <p className="font-semibold text-gray-900">
            {getStatusLabel(order.status)}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Fulfillment</p>
          <p className="font-semibold text-gray-900">
            {order.fulfillmentStatus}
          </p>
        </div>
      </div>
    </div>
  );
}
