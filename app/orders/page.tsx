"use client";

import { useState, useEffect } from "react";
import {
  ChevronRight,
  Package,
  Clock,
  CheckCircle,
  Truck,
  AlertCircle,
  ShoppingBag,
} from "lucide-react";
import { getAllOrders } from "@/lib/api/order.api";
import Link from "next/link";
import Loader from "@/components/global/Loader";
import { OrderDetails } from "@/lib/type/order.type";
import Pagination from "@/components/ui/Pagination";

export default function Page() {
  const [orders, setOrders] = useState<OrderDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filterStatus, setFilterStatus] = useState<string>("ALL");

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await getAllOrders(page, 10);

        setOrders(response?.data?.orders || []);
        const total = response?.data?.pagination?.totalPages || 1;
        setTotalPages(total);
      } catch (err: any) {
        console.error("Failed to fetch orders:", err);

        // Backend error
        if (err.response?.data?.message) {
          setError(err.response.data.message);
        }
        // Network/unexpected error
        else if (err.message) {
          setError(err.message);
        } else {
          setError("Failed to load orders. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [page]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "CONFIRMED":
        return <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />;
      case "PROCESSING":
      case "SHIPPED":
        return <Truck className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500" />;
      case "DELIVERED":
        return <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />;
      case "CANCELLED":
        return <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />;
      case "PENDING":
        return <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500" />;
      default:
        return <Package className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "CONFIRMED":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "PROCESSING":
      case "SHIPPED":
        return "bg-orange-50 text-orange-700 border-orange-200";
      case "DELIVERED":
        return "bg-green-50 text-green-700 border-green-200";
      case "CANCELLED":
        return "bg-red-50 text-red-700 border-red-200";
      case "PENDING":
        return "bg-yellow-50 text-yellow-700 border-yellow-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "CONFIRMED":
        return "Order Confirmed";
      case "PROCESSING":
        return "Processing";
      case "SHIPPED":
        return "On the Way";
      case "DELIVERED":
        return "Delivered";
      case "CANCELLED":
        return "Cancelled";
      case "PENDING":
        return "Pending";
      default:
        return status;
    }
  };

  const filteredOrders =
    filterStatus === "ALL"
      ? orders
      : orders.filter((order) => order.status === filterStatus);

  if (loading) return <Loader />;

  if (error)
    return (
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <AlertCircle className="w-10 h-10 text-red-500 mx-auto mb-3" />
          <p className="text-red-700 font-medium">{error}</p>
        </div>
      </div>
    );

  if (orders.length === 0)
    return (
      <div className="max-w-7xl mx-auto px-4 py-10 text-center">
        <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">No Orders Yet</h2>
        <p className="text-gray-600">Your recent purchases will appear here</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white pb-5">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-6 sm:py-8">
          <div className="mb-4 sm:mb-6">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-1">
              My Orders
            </h1>
            <p className="text-gray-600 text-sm sm:text-base">
              Track and manage your orders
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {["ALL", "CONFIRMED", "PROCESSING", "SHIPPED", "DELIVERED"].map(
              (status) => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-sm sm:text-base font-medium whitespace-nowrap transition ${
                    filterStatus === status
                      ? "bg-orange-500 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {status === "ALL" ? "All Orders" : getStatusLabel(status)}
                  {status !== "ALL" && (
                    <span className="ml-1 sm:ml-2 text-xs sm:text-sm">
                      ({orders.filter((o) => o.status === status).length})
                    </span>
                  )}
                </button>
              )
            )}
          </div>
        </div>
      </div>

      {/* Orders List */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-6 sm:py-8">
        {filteredOrders.length === 0 ? (
          <div className="text-center py-12">
            <Package className="w-10 h-10 sm:w-12 sm:h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-600 text-sm sm:text-base">
              No orders found in this category
            </p>
          </div>
        ) : (
          <div className="space-y-4 flex flex-col">
            {filteredOrders.map((order) => (
              <Link href={`/orders/${order.id}`} key={order.id}>
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg hover:border-orange-300 transition-all cursor-pointer group">
                  {/* Header */}
                  <div className="p-4 sm:p-6 border-b border-gray-100">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4 mb-3">
                      {/* Left */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-1.5">
                          {getStatusIcon(order.status)}
                          <h3 className="text-base sm:text-lg font-semibold text-gray-900 truncate">
                            Order #{order.id.slice(-8).toUpperCase()}
                          </h3>
                          <span
                            className={`px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm font-semibold border ${getStatusColor(
                              order.status
                            )}`}
                          >
                            {getStatusLabel(order.status)}
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-gray-600">
                          <span>
                            {new Date(order.purchaseDate).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              }
                            )}
                          </span>
                          <span className="flex items-center gap-1">
                            <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                            {order.paymentMethod === "CVS"
                              ? "Card/CVS"
                              : "Cash on Delivery"}
                          </span>
                        </div>
                      </div>

                      {/* Right */}
                      <div className="text-left sm:text-right">
                        <p className="text-lg sm:text-2xl font-bold text-orange-600">
                          ₹{order.totalAmount.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Items Preview */}
                  <div className="px-4 sm:px-6 py-3 sm:py-4 bg-gray-50">
                    <div className="space-y-3">
                      {order.orderItems.slice(0, 2).map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-2 sm:gap-3"
                        >
                          <div className="shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-orange-100 flex items-center justify-center">
                            <span className="text-[10px] sm:text-xs font-bold text-orange-600">
                              ×{item.quantity}
                            </span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm sm:text-base font-semibold text-gray-900 truncate">
                              {item.title}
                            </p>
                            <p className="text-xs text-gray-600 truncate">
                              {item.brandName}
                            </p>
                          </div>
                          <div className="text-right shrink-0">
                            <p className="text-sm font-semibold text-gray-900">
                              ₹{(item.price * item.quantity).toLocaleString()}
                            </p>
                            <p className="text-xs text-gray-500">
                              ₹{item.price} each
                            </p>
                          </div>
                        </div>
                      ))}

                      {order.orderItems.length > 2 && (
                        <div className="pt-1 pl-9 sm:pl-11 text-xs text-gray-600 font-medium">
                          +{order.orderItems.length - 2} more item
                          {order.orderItems.length - 2 !== 1 ? "s" : ""}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="px-4 sm:px-6 py-3 sm:py-4 bg-white flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-600">
                      <Package className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      <span>
                        {order.fulfillmentStatus === "PENDING"
                          ? "Processing your order"
                          : order.fulfillmentStatus === "SHIPPED"
                          ? "On its way"
                          : "Order delivered"}
                      </span>
                    </div>
                    <ChevronRight className="w-4 sm:w-5 h-4 sm:h-5 text-orange-500 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {filteredOrders.length > 0 && (
        <div className="mt-6 sm:mt-8 px-3 sm:px-4 md:px-6">
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={(newPage) => setPage(newPage)}
          />
        </div>
      )}
    </div>
  );
}
