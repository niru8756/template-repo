"use client";

import {
  Calendar,
  Clock,
  Truck,
  CheckCircle,
  AlertCircle,
  Package,
} from "lucide-react";
import { Order } from "@/lib/type/order.type";

type OrderHeaderProps = {
  order: Order;
};

function getStatusIcon(status: string) {
  switch (status) {
    case "CONFIRMED":
      return <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500" />;
    case "PROCESSING":
    case "SHIPPED":
      return <Truck className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500" />;
    case "DELIVERED":
      return <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-500" />;
    case "CANCELLED":
      return <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 text-red-500" />;
    case "PENDING":
      return <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500" />;
    default:
      return <Package className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500" />;
  }
}

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

export default function OrderHeader({ order }: OrderHeaderProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
      {/* Parent Layout */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 sm:gap-6">
        {/* Left Section */}
        <div className="flex-1">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1 sm:mb-2 wrap-break-word">
            Order #{order.id.slice(-8).toUpperCase()}
          </h1>
          <p className="text-gray-600 flex items-center gap-2 text-sm sm:text-base flex-wrap">
            <Calendar className="w-4 h-4" />
            {new Date(order.purchaseDate).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>

        {/* Right Section */}
        <div className="flex flex-col items-start sm:items-end text-left sm:text-right">
          <div className="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2 flex-wrap">
            {getStatusIcon(order.status)}
            <span className="text-lg sm:text-xl font-semibold text-gray-900">
              {getStatusLabel(order.status)}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-gray-600">
            {order.fulfillmentStatus}
          </p>
        </div>
      </div>
    </div>
  );
}
