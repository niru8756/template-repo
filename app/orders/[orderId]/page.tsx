"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, AlertCircle, MessageSquare } from "lucide-react";
import { getParticularDetails } from "@/lib/api/order.api";
import { Order } from "@/lib/type/order.type";
import OrderHeader from "@/components/order-details/OrderHeader";
import ProductGallery from "@/components/order-details/ProductGallery";
import OrderSummary from "@/components/order-details/OrderSummary";
import PaymentDetails from "@/components/order-details/PaymentDetails";
import Loader from "@/components/global/Loader";
import AddressCard from "@/components/order-details/AddressCard";

export default function OrderDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const orderId = params.orderId as string;

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await getParticularDetails(orderId);
        setOrder(response?.data);
      } catch (err: any) {
        console.error("Failed to fetch order details:", err);

        // Backend error
        if (err.response?.data?.message) {
          setError(err.response.data.message);
        }
        // Network/unexpected error
        else if (err.message) {
          setError(err.message);
        } else {
          setError("Failed to load order details. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    };

    if (orderId) {
      fetchOrderDetails();
    }
  }, [orderId]);

  if (loading) {
    return <Loader />;
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-orange-600 hover:text-orange-700 font-medium mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Orders
          </button>
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <AlertCircle className="w-10 h-10 text-red-500 mx-auto mb-3" />
            <p className="text-red-700 font-medium">
              {error || "Order not found"}
            </p>
          </div>
        </div>
      </div>
    );
  }

  const currentItem = order.orderItems[0];

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-orange-600 hover:text-orange-700 font-medium mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Orders
        </button>

        {/* Header */}
        <OrderHeader order={order} />

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {currentItem && <ProductGallery item={currentItem} />}
            <AddressCard
              title="Shipping Address"
              address={order.shippingDetail}
            />
            <AddressCard title="Billing Address" address={order.buyerInfo} />
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            <OrderSummary order={order} currentItem={currentItem} />
            <PaymentDetails order={order} />
            <div className="space-y-3">
              <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition font-medium">
                <MessageSquare className="w-4 h-4" />
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
