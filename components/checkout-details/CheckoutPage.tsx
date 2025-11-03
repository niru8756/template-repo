"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ProgressSteps from "@/components/checkout-details/ProgressSteps";
import ShippingStep from "@/components/checkout-details/ShippingStep";
import PaymentMethodStep from "@/components/checkout-details/PaymentMethodStep";
import OrderReviewStep from "@/components/checkout-details/OrderReviewStep";
import OrderSummary from "@/components/checkout-details/OrderSummary";
import AddressForm from "@/components/global/AddressForm";
import OrderSuccessCard from "@/components/checkout-details/OrderSuccessCard";
import Loader from "@/components/global/Loader";
import { cartItemDuringCheckout, cartItems } from "@/lib/type/cart.type";
import { createNewOrder, newOrderProps } from "@/lib/api/order.api";
import { useCartAndCustomerId } from "@/hooks/useCartAndCustomerIds";
import { parsePincode } from "@/lib/helper";
import { initiateRazorpayPayment } from "@/lib/utils/razarpay.utils";

// Extend window object for Razorpay
declare global {
  interface Window {
    Razorpay: any;
  }
}

type CheckoutPageProps = {
  cartData?: cartItemDuringCheckout;
  setCartData?: React.Dispatch<React.SetStateAction<cartItems | null>>;
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
};

const SHIPPING_DETAILS = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
  building: "",
  city: "",
  state: "",
  pincode: "",
  country: "India",
};

const BILLING_DETAILS = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
  building: "",
  city: "",
  state: "",
  pincode: "",
  country: "India",
  isShippingSame: true,
};

// ============== MAIN COMPONENT ==============

export default function CheckoutPage({
  cartData,
  setCartData,
  activeStep,
  setActiveStep,
}: CheckoutPageProps) {
  const router = useRouter();
  const { cartId, customerId, loading } = useCartAndCustomerId();

  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [shippingMethod, setShippingMethod] = useState("standard");
  const [successOrderId, setSuccessOrderId] = useState<string | null>(null);
  const [isProcessingOrder, setIsProcessingOrder] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [orderError, setOrderError] = useState<string | null>(null);
  const [paymentError, setPaymentError] = useState<string | null>(null);

  const [orderData, setOrderData] = useState(BILLING_DETAILS);
  const [shippingData, setShippingData] = useState(SHIPPING_DETAILS);

  const handleBillingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    const updatedOrderData = {
      ...orderData,
      [name]: type === "checkbox" ? checked : value,
    };

    setOrderData(updatedOrderData);

    if (updatedOrderData.isShippingSame) {
      setShippingData((prev) => ({
        ...prev,
        ...updatedOrderData,
      }));
    } else {
      setShippingData(SHIPPING_DETAILS);
    }
  };

  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingData({ ...shippingData, [name]: value });
  };

  // Handle payment method step continue
  const handlePaymentMethodContinue = async () => {
    // If COD or CVS, proceed directly to order review
    // Payment will be processed after order is placed
    setActiveStep(4);
  };

  // Handle place order with payment
  const handleCartOrder = async () => {
    if (!cartId || !customerId) {
      setOrderError(
        "Missing cart or customer information. Please refresh the page."
      );
      return;
    }

    setIsProcessingOrder(true);
    setOrderError(null);

    try {
      const buyerInfo = {
        ...orderData,
        pincode: parsePincode(orderData.pincode),
      };

      const shippingDetail = {
        ...shippingData,
        pincode: parsePincode(shippingData.pincode),
      };

      const address = {
        name: `${orderData.firstName} ${orderData.lastName}`,
        address: orderData.address,
        building: orderData.building,
        city: orderData.city,
        pincode: parsePincode(orderData.pincode),
        state: orderData.state,
        country: orderData.country,
        email: orderData.email,
        phone: orderData.phone,
      };

      const payload: newOrderProps = {
        cartId,
        customerId,
        channelType: "DEFAULT",
        paymentMethod: paymentMethod as "COD" | "CVS",
        buyerInfo,
        shippingDetail,
        address,
        extraData: {},
      };

      // Step 1: Create order
      const response = await createNewOrder(payload);

      if (!response) {
        throw new Error("No response from server. Please try again.");
      }

      if (response.status >= 200 && response.status < 300) {
        const orderId =
          paymentMethod === "COD"
            ? response.data?.data?.id
            : response.data?.data?.razorpayOrderId;

        if (!orderId) {
          throw new Error("Order ID not received from server.");
        }

        // Step 2: If COD, show success directly
        if (paymentMethod === "COD") {
          localStorage.removeItem("cartId");
          setSuccessOrderId(orderId);
          setActiveStep(5);
          setIsProcessingOrder(false);
          return;
        }

        // Step 3: If CVS (Razorpay), initiate payment
        if (paymentMethod === "CVS") {
          setIsProcessingPayment(true);

          try {
            const totalAmount = cartData?.totalAmount || 0;

            const paymentSuccess = await initiateRazorpayPayment(
              totalAmount,
              orderId,
              orderData.email,
              orderData.phone,
              `${orderData.firstName} ${orderData.lastName}`
            );

            if (paymentSuccess) {
              localStorage.removeItem("cartId");
              setSuccessOrderId(orderId);
              setActiveStep(5);
            } else {
              setPaymentError(
                "Payment cancelled or failed. Please contact support."
              );
              setIsProcessingPayment(false);
              setIsProcessingOrder(false);
            }
          } catch (paymentErr: any) {
            console.error("Payment error:", paymentErr);
            setPaymentError(
              paymentErr.message || "Payment failed. Please try again."
            );
            setIsProcessingPayment(false);
            setIsProcessingOrder(false);
          }
        }
      }
    } catch (error: any) {
      console.error("Error creating order:", error);
      setOrderError(
        error.message || "Failed to create order. Please try again."
      );
      setIsProcessingOrder(false);
    }
  };

  if (loading || !cartData) return <Loader />;

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-8">
        <div
          className={`grid ${
            activeStep !== 5 ? "lg:grid-cols-3" : "grid-cols-1"
          } gap-8`}
        >
          {/* Main Content */}
          <div
            className={`${
              activeStep !== 5 ? "lg:col-span-2" : "lg:col-span-1"
            } space-y-6`}
          >
            <ProgressSteps activeStep={activeStep} />

            {/* Order Error Alert */}
            {orderError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                <div className="text-red-600 text-xl">⚠️</div>
                <div className="flex-1">
                  <p className="text-red-700 font-medium">Order Failed</p>
                  <p className="text-red-600 text-sm mt-1">{orderError}</p>
                </div>
                <button
                  onClick={() => setOrderError(null)}
                  className="text-red-600 hover:text-red-700"
                >
                  ✕
                </button>
              </div>
            )}

            {/* Payment Error Alert */}
            {paymentError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                <div className="text-red-600 text-xl">💳</div>
                <div className="flex-1">
                  <p className="text-red-700 font-medium">Payment Failed</p>
                  <p className="text-red-600 text-sm mt-1">{paymentError}</p>
                </div>
                <button
                  onClick={() => setPaymentError(null)}
                  className="text-red-600 hover:text-red-700"
                >
                  ✕
                </button>
              </div>
            )}

            {activeStep === 1 && (
              <AddressForm
                title="Billing Address"
                orderData={orderData}
                onChange={handleBillingChange}
                onContinue={() => setActiveStep(2)}
                buttonText="Continue to Shipping"
                showShippingCheckbox={true}
              />
            )}

            {activeStep === 2 && (
              <ShippingStep
                orderData={orderData}
                shippingData={shippingData}
                shippingMethod={shippingMethod}
                onShippingChange={handleShippingChange}
                onShippingMethodChange={setShippingMethod}
                onBack={() => setActiveStep(1)}
                onContinue={() => setActiveStep(3)}
              />
            )}

            {activeStep === 3 && (
              <PaymentMethodStep
                paymentMethod={paymentMethod}
                onPaymentMethodChange={setPaymentMethod}
                onBack={() => setActiveStep(2)}
                onContinue={handlePaymentMethodContinue}
                isLoading={false}
              />
            )}

            {activeStep === 4 && (
              <OrderReviewStep
                orderData={orderData}
                shippingMethod={shippingMethod}
                paymentMethod={paymentMethod}
                onEdit={setActiveStep}
                onPlaceOrder={handleCartOrder}
                isLoading={isProcessingOrder || isProcessingPayment}
              />
            )}

            {activeStep === 5 && successOrderId && (
              <OrderSuccessCard
                orderId={successOrderId}
                orderDate={new Date()}
                estimatedDeliveryDays={5}
                onContinueShopping={() => router.push("/products")}
              />
            )}
          </div>

          {/* Sidebar */}
          {activeStep !== 5 && (
            <div className="lg:col-span-1">
              <OrderSummary
                parsedData={cartData}
                shippingMethod={shippingMethod}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
