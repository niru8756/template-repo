"use client";

import CartItemsList from "@/components/cart-details/CartItemsList";
import CheckoutModal from "@/components/cart-details/CheckoutModal";
import DeleteConfirmationModal from "@/components/cart-details/DeleteConfirmationModal";
import EmptyCart from "@/components/cart-details/EmptyCart";
import ErrorAlert from "@/components/cart-details/ErrorAlert";
import OrderSummary from "@/components/cart-details/OrderSummary";
import Loader from "@/components/global/Loader";
import { useCart } from "@/context/CartContext";
import { useCartAndCustomerId } from "@/hooks/useCartAndCustomerIds";
import {
  createNewCart,
  deleteAllCart,
  getCart,
  RemoveItemFromCart,
  removeItemFromCart,
} from "@/lib/api/cart.api";
import { cartItems } from "@/lib/type/cart.type";
import { AlertCircle, Trash, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CartPage() {
  const [cartData, setCartData] = useState<cartItems | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [openCheckoutPage, setOpenCheckoutPage] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const [isClearingCart, setIsClearingCart] = useState(false);
  const [activeStep, setActiveStep] = useState(1);
  const router = useRouter();
  const { cartId, customerId, loading: isCartLoader } = useCartAndCustomerId();
  const { clearCart } = useCart();

  useEffect(() => {
    const initCart = async () => {
      if (isCartLoader) {
        return <Loader />;
      }
      if (!customerId) {
        setError("Customer ID not found. Please login again.");
        setLoading(false);
        return;
      }

      try {
        let currentCartId = cartId;

        // Create a new cart if not found
        if (!currentCartId) {
          try {
            const cartData = await createNewCart(customerId);
            currentCartId = cartData?.data?.data?.id;

            if (currentCartId) {
              localStorage.setItem("cartId", currentCartId);
            }
          } catch (createErr: any) {
            console.error("Failed to create cart:", createErr);
            setError("Failed to create a new cart. Please try again.");
            return;
          }
        }

        // Fetch cart details
        try {
          const cartResponse = await getCart(customerId);
          setCartData(cartResponse?.data);
        } catch (getErr: any) {
          console.error("Failed to fetch cart:", getErr);
          setError("Failed to fetch cart. Please try again.");
        }
      } catch (err: any) {
        console.error("Unexpected error:", err);
        setError(err.message || "Something went wrong. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    initCart();
  }, [cartId, customerId]);

  // Handle quantity change
  const handleQuantityChange = (itemIndex: number, newQuantity: number) => {
    if (newQuantity < 1 || !cartData) return;

    const updatedItems = cartData.items.map((item, idx) =>
      idx === itemIndex ? { ...item, quantity: newQuantity } : item
    );

    const newTotalAmount = updatedItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    setCartData({
      ...cartData,
      items: updatedItems,
      totalAmount: newTotalAmount,
    });
  };

  // Handle remove item
  const handleRemoveItem = async (itemIndex: number) => {
    if (!cartData) return;

    try {
      setIsRemoving(true);
      const itemToRemove = cartData.items[itemIndex];

      const payload: RemoveItemFromCart = {
        cartId,
        variantId: itemToRemove.variantId,
      };

      await removeItemFromCart(payload);

      // Update local state
      const updatedItems = cartData.items.filter((_, idx) => idx !== itemIndex);
      const newTotalAmount = updatedItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      if (updatedItems.length === 0) {
        setCartData(null);
      } else {
        setCartData({
          ...cartData,
          items: updatedItems,
          totalAmount: newTotalAmount,
        });
      }
    } catch (err: any) {
      console.error("Failed to remove item:", err);

      // Handle backend error
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else if (err.message) {
        // Network or unexpected error
        setError(err.message);
      } else {
        setError("Failed to remove item. Please try again.");
      }
    } finally {
      setIsRemoving(false);
    }
  };

  const handleClose = () => {
    if (activeStep === 5) {
      localStorage.removeItem("cartId");
      setCartData?.(null);
    }
    setOpenCheckoutPage(false);
  };

  // Handle clear cart
  const handleClearCart = async () => {
    try {
      setIsClearingCart(true);

      // Delete all items in cart
      await deleteAllCart(cartId);
      clearCart();

      // Create a new empty cart
      const newCart = await createNewCart(customerId);
      const newCartId = newCart?.data?.id || newCart?.data?.data?.id;

      if (newCartId) {
        localStorage.setItem("cartId", newCartId);
      }

      setCartData(null);
      setShowDeleteConfirm(false);
    } catch (err: any) {
      console.error("Failed to clear cart:", err);

      // Backend error
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      }
      // Network/unexpected error
      else if (err.message) {
        setError(err.message);
      }
      // Fallback
      else {
        setError("Failed to clear cart. Please try again.");
      }

      setShowDeleteConfirm(false);
    } finally {
      setIsClearingCart(false);
    }
  };

  // Render states
  if (loading) {
    return <Loader />;
  }

  if (error && (!cartData || cartData.items.length === 0)) {
    return <ErrorAlert message={error} />;
  }

  if (!cartData || cartData.items.length === 0) {
    return <EmptyCart />;
  }

  const totalItems = cartData.items.length;
  const totalCartAmount = cartData.totalAmount;

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 sm:gap-6">
            {/* Left section — Title & Subtitle */}
            <div className="sm:text-left">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-1 sm:mb-2">
                Shopping Cart
              </h1>
              <p className="text-gray-600 text-sm sm:text-base">
                {totalItems} item{totalItems !== 1 ? "s" : ""} in your cart
              </p>
            </div>

            {/* Right section — Clear Cart Button */}
            <div className="flex justify-center sm:justify-end">
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="flex items-center justify-center gap-2 px-4 py-2 text-sm sm:text-base text-red-600 hover:bg-red-50 rounded-lg border border-red-200 transition font-medium w-full sm:w-auto"
              >
                <Trash size={18} />
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
            <p className="text-sm text-red-700">{error}</p>
            <button
              onClick={() => setError(null)}
              className="ml-auto text-red-600 hover:text-red-700"
            >
              <X size={18} />
            </button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={showDeleteConfirm}
        onConfirm={handleClearCart}
        onCancel={() => setShowDeleteConfirm(false)}
        isLoading={isClearingCart}
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            <CartItemsList
              items={cartData.items}
              onQuantityChange={handleQuantityChange}
              onRemoveItem={handleRemoveItem}
              isRemoving={isRemoving}
              cartId={cartData.id}
            />
          </div>

          {/* Cart Summary */}
          <div>
            <OrderSummary
              totalItems={totalItems}
              totalAmount={totalCartAmount}
              onCheckout={() => setOpenCheckoutPage(true)}
              onContinueShopping={() => router.push("/products")}
            />
          </div>
        </div>
      </div>

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={openCheckoutPage}
        onClose={handleClose}
        cartData={cartData}
        setCartData={setCartData}
        activeStep={activeStep}
        setActiveStep={setActiveStep}
      />
    </div>
  );
}
