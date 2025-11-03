"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  addItemToCart,
  AddItemToCartProps,
  createNewCart,
} from "@/lib/api/cart.api";
import { TRUST_BADGE } from "@/lib/constant";
import { Heart, AlertCircle } from "lucide-react";
import { useCart } from "@/context/CartContext";

type ProductHeaderProps = {
  brandName: string;
  title: string;
};

type ProductDescriptionProps = {
  description: string;
};

type ProductActionsProps = {
  quantity: number;
  setQuantity: (qty: number) => void;
  liked: boolean;
  setLiked: (liked: boolean) => void;
  variant: {
    price: number;
    id: string;
  };
  onCheckout: () => void;
};

export type ProductDetailsCardProps = {
  product: ProductHeaderProps & ProductDescriptionProps;
} & ProductActionsProps & {
    variant: {
      price: number;
      id: string;
    };
    onCheckout: () => void;
  };

function ProductHeader({ brandName, title }: ProductHeaderProps) {
  return (
    <div className="flex flex-col text-center sm:text-left">
      <p className="text-orange-600 font-semibold text-sm sm:text-base mb-1">
        {brandName}
      </p>
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 leading-snug">
        {title}
      </h1>
    </div>
  );
}

function ProductDescription({ description }: ProductDescriptionProps) {
  return (
    <div className="mb-6 pb-6 border-b">
      <p className="text-gray-700 text-sm sm:text-base leading-relaxed whitespace-pre-line">
        {description}
      </p>
    </div>
  );
}

function ProductActions({
  quantity,
  setQuantity,
  liked,
  setLiked,
  variant,
  onCheckout,
}: ProductActionsProps) {
  const router = useRouter();
  const [addToCartLoading, setAddToCartLoading] = useState(false);
  const [buyNowLoading, setBuyNowLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { incrementCart } = useCart();

  const cartId = localStorage.getItem("cartId") as string;
  const customerId = localStorage.getItem("customerId") as string;
  const { price, id } = variant;

  const handleAddItemToCart = async () => {
    if (!customerId) {
      setError("Please login to add items to cart.");
      return;
    }

    let currentCartId = cartId;

    if (!currentCartId) {
      try {
        const newCart = await createNewCart(customerId);
        currentCartId = newCart?.data?.id || newCart?.data?.data?.id;

        if (!currentCartId) {
          setError("Failed to create cart. Please try again.");
          return;
        }

        localStorage.setItem("cartId", currentCartId);
      } catch (err) {
        console.error("Failed to create cart:", err);
        setError("Failed to create cart. Please try again.");
        return;
      }
    }

    setAddToCartLoading(true);
    setError(null);

    try {
      const payload = {
        quantity,
        variantId: id,
        price,
        cartId: currentCartId,
      } as AddItemToCartProps;

      await addItemToCart(payload);
      incrementCart();
      alert("✓ Added to cart successfully!");
    } catch (err) {
      console.error("Failed to add item to cart:", err);
      setError("Failed to add item to cart. Please try again.");
    } finally {
      setAddToCartLoading(false);
    }
  };

  const handleBuyNow = async () => {
    if (!customerId) {
      setError("Please login to proceed with purchase.");
      return;
    }

    let currentCartId = cartId;

    if (!currentCartId) {
      try {
        const newCart = await createNewCart(customerId);
        currentCartId = newCart?.data?.id || newCart?.data?.data?.id;

        if (!currentCartId) {
          setError("Failed to create cart. Please try again.");
          return;
        }

        localStorage.setItem("cartId", currentCartId);
      } catch (err) {
        console.error("Failed to create cart:", err);
        setError("Failed to create cart. Please try again.");
        return;
      }
    }

    setBuyNowLoading(true);
    setError(null);

    try {
      // If someone wants to add items to cart on buy now button of a particular products
      // Add item to cart first
      const payload = {
        quantity,
        variantId: id,
        price,
        cartId: currentCartId,
      } as AddItemToCartProps;

      await addItemToCart(payload);

      // Then proceed to checkout
      onCheckout();
    } catch (err) {
      console.error("Failed to process buy now:", err);
      setError("Failed to process your request. Please try again.");
    } finally {
      setBuyNowLoading(false);
    }
  };

  const isQuantityDisabled = addToCartLoading || buyNowLoading;

  return (
    <div className="space-y-4">
      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      {/* Action Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex flex-row items-center gap-4 w-full sm:w-auto">
          {/* Quantity Selector */}
          <div className="flex items-center border border-gray-300 rounded-lg w-full sm:w-auto justify-between">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={isQuantityDisabled}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 font-semibold disabled:opacity-50"
              aria-label="Decrease quantity"
            >
              −
            </button>
            <span className="px-4 py-2 text-gray-900 font-bold">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              disabled={isQuantityDisabled}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 font-semibold disabled:opacity-50"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-row gap-3 w-full sm:w-auto">
          <button
            onClick={handleAddItemToCart}
            disabled={addToCartLoading}
            className="bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 text-white px-4 sm:px-6 py-2 rounded-lg font-semibold transition transform hover:scale-105 active:scale-95 cursor-pointer disabled:cursor-not-allowed w-full sm:w-auto"
          >
            {addToCartLoading ? "Processing..." : "Add to Cart"}
          </button>
          {/* <button
            onClick={handleBuyNow}
            disabled={buyNowLoading}
            className="bg-orange-600 hover:bg-orange-700 disabled:bg-gray-400 text-white px-6 py-2 rounded-lg font-semibold transition transform hover:scale-105 active:scale-95 cursor-pointer disabled:cursor-not-allowed w-full sm:w-auto"
          >
            {buyNowLoading ? "Processing..." : "Buy Now"}
          </button> */}
        </div>
      </div>
    </div>
  );
}

function TrustBadges() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
      {TRUST_BADGE.map((badge, index) => {
        const Icon = badge.icon;
        return (
          <div
            key={index}
            className="text-center p-4 bg-gray-50 rounded-lg flex flex-col items-center justify-center"
          >
            <Icon className="mb-2 text-orange-500" size={24} />
            <p className="text-sm sm:text-base font-medium text-gray-900">
              {badge.title}
            </p>
            <p className="text-xs text-gray-600">{badge.subtitle}</p>
          </div>
        );
      })}
    </div>
  );
}

const ProductDetailsCard = ({
  product,
  quantity,
  setQuantity,
  liked,
  setLiked,
  variant,
  onCheckout,
}: ProductDetailsCardProps) => {
  return (
    <div className="space-y-6 px-4 sm:px-6 md:px-0 max-w-2xl mx-auto">
      <ProductHeader brandName={product.brandName} title={product.title} />
      <ProductDescription description={product.description} />
      <ProductActions
        quantity={quantity}
        setQuantity={setQuantity}
        liked={liked}
        setLiked={setLiked}
        variant={variant}
        onCheckout={onCheckout}
      />
      <TrustBadges />
    </div>
  );
};

export default ProductDetailsCard;
