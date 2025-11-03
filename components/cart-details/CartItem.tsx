"use client";

import { Plus, Minus, Trash2 } from "lucide-react";
import Image from "next/image";
import { CartItemType } from "@/lib/type/cart.type";
import { useCart } from "@/context/CartContext";

type Props = {
  item: CartItemType;
  itemIndex: number;
  onQuantityChange: (index: number, quantity: number) => void;
  onRemove: (index: number) => Promise<void>;
  isRemoving: boolean;
};

export default function CartItem({
  item,
  itemIndex,
  onQuantityChange,
  onRemove,
  isRemoving,
}: Props) {
  const { decrementCart } = useCart();

  const handleDecrement = (itemIndex: number) => {
  decrementCart();
  onRemove(itemIndex);
};

  return (
    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 pb-6 border-b border-gray-200 last:border-0 last:pb-0">
      {/* Product Image */}
      {item.images && (
        <div className="relative w-full sm:w-24 h-48 sm:h-24 bg-gray-100 rounded-lg overflow-hidden shrink-0">
          <Image
            src={item.images?.[0]?.url}
            alt={item.title || "Product image"}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 96px"
            priority={false}
          />
        </div>
      )}

      {/* Product Details & Actions */}
      <div className="flex flex-col sm:flex-1 sm:flex-row sm:items-start sm:justify-between gap-4">
        {/* Left: Product Details */}
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 text-base sm:text-lg">
            {item.title}
          </h3>
          <p className="text-sm text-gray-600 mt-1">{item.brandName}</p>
          <p className="text-xs text-gray-500 mt-1 font-mono">
            SKU: {item.sku}
          </p>

          {/* Variant Options */}
          <div className="flex flex-wrap gap-2 mt-2">
            {item.option?.data?.color && (
              <div className="flex items-center gap-1.5">
                <span
                  className="w-4 h-4 rounded-full border border-gray-300"
                  style={{
                    backgroundColor: item.option.data.color.hexCode,
                  }}
                />
                <span className="text-xs text-gray-600">
                  {item.option.data.color.displayName}
                </span>
              </div>
            )}
            {item.option?.data?.size && (
              <span className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">
                Size:{" "}
                {item.option.data.size.displayName ||
                  item.option.data.size.name}
              </span>
            )}
          </div>
        </div>

        {/* Right: Price & Actions */}
        <div className="flex sm:flex-col items-end sm:items-stretch justify-between sm:justify-between gap-3 w-full sm:w-auto">
          {/* Price */}
          <div className="text-right sm:text-left">
            <p className="text-lg sm:text-xl font-bold text-gray-900">
              ₹{(item.price * item.quantity).toLocaleString()}
            </p>
            <p className="text-sm text-gray-600">
              ₹{item.price.toLocaleString()} each
            </p>
          </div>

          {/* Quantity & Remove */}
          <div className="flex items-center justify-end sm:justify-start gap-3 sm:mt-2">
            {/* Quantity Selector */}
            <div className="flex items-center border border-gray-300 rounded-lg bg-white">
              <button
                onClick={() => onQuantityChange(itemIndex, item.quantity - 1)}
                disabled={item.quantity <= 1}
                className="px-2 py-1 text-gray-600 hover:bg-gray-100 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Minus size={16} />
              </button>
              <span className="px-3 py-1 text-gray-900 font-bold">
                {item.quantity}
              </span>
              <button
                onClick={() => onQuantityChange(itemIndex, item.quantity + 1)}
                className="px-2 py-1 text-gray-600 hover:bg-gray-100 font-semibold"
              >
                <Plus size={16} />
              </button>
            </div>

            {/* Remove Button */}
            <button
              onClick={() => handleDecrement(itemIndex)}
              disabled={isRemoving}
              className="cursor-pointer px-3 py-1 text-red-600 hover:bg-red-50 rounded-lg transition disabled:opacity-50"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
