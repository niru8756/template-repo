"use client";

import { useRouter } from "next/navigation";
import {
  CheckCircle,
  Clock,
  Package,
  Truck,
} from "lucide-react";

type OrderSuccessCardProps = {
  orderId: string;
  orderDate?: Date;
  estimatedDeliveryDays?: number;
  onContinueShopping?: () => void;
  onTrackOrder?: () => void;
}

export default function OrderSuccessCard({
  orderId,
  orderDate = new Date(),
  estimatedDeliveryDays = 5,
  onContinueShopping,
  onTrackOrder,
}: OrderSuccessCardProps) {
  const router = useRouter();

  const formattedOrderDate = orderDate.toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const estimatedDelivery = new Date(
    Date.now() + estimatedDeliveryDays * 24 * 60 * 60 * 1000
  ).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handleContinueShopping = () => {
    if (onContinueShopping) onContinueShopping();
    else router.push("/products");
  };

  const handleTrackOrder = () => {
    if (onTrackOrder) onTrackOrder();
    else router.push(`/orders/${orderId}`);
  };

  return (
    <div className="bg-linear-to-br from-green-50 to-blue-50 rounded-xl border border-green-200 p-5 sm:p-8 shadow-lg w-full max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-6">
        <div className="relative">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircle size={28} className="text-green-600" />
          </div>
          <div className="absolute inset-0 bg-green-200 rounded-full animate-ping opacity-20"></div>
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
            Order Confirmed!
          </h2>
          <p className="text-sm sm:text-base text-gray-600">
            Your order has been placed successfully.
          </p>
        </div>
      </div>

      {/* Order Details */}
      <div className="bg-white rounded-lg p-4 sm:p-6 mb-4 border border-gray-100">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-gray-600 uppercase tracking-wide">
              Order ID
            </p>
            <p className="text-base sm:text-lg font-bold text-gray-900 mt-1 break-all">
              {orderId}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-600 uppercase tracking-wide">
              Order Date
            </p>
            <p className="text-sm sm:text-base font-semibold text-gray-900 mt-1">
              {formattedOrderDate}
            </p>
          </div>
        </div>
      </div>

      {/* Quick Status */}
      <div className="bg-white rounded-lg p-4 sm:p-6 mb-4 border border-gray-100">
        <p className="text-sm sm:text-base font-semibold text-gray-900 mb-3">
          Status Update
        </p>
        <div className="space-y-4">
          {/* Step 1 */}
          <div className="flex items-start sm:items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center shrink-0">
              <CheckCircle size={18} className="text-green-600" />
            </div>
            <div>
              <p className="text-sm sm:text-base font-semibold text-gray-900">
                Order Confirmed
              </p>
              <p className="text-xs text-gray-600">Today</p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex items-start sm:items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
              <Package size={18} className="text-blue-600 animate-pulse" />
            </div>
            <div>
              <p className="text-sm sm:text-base font-semibold text-gray-900">
                Processing
              </p>
              <p className="text-xs text-gray-600">
                We're preparing your items
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex items-start sm:items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
              <Truck size={18} className="text-gray-400" />
            </div>
            <div>
              <p className="text-sm sm:text-base font-semibold text-gray-900">
                On the way
              </p>
              <p className="text-xs text-gray-600">
                Est. {estimatedDelivery}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Info Alert */}
      <div className="bg-blue-50 rounded-lg p-3 sm:p-4 mb-5 border border-blue-200 flex gap-2 sm:gap-3 items-start">
        <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 shrink-0 mt-0.5" />
        <p className="text-xs sm:text-sm text-blue-700">
          Confirmation email has been sent to your registered address.
        </p>
      </div>
    </div>
  );
}
