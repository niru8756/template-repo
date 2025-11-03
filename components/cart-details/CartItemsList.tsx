"use client";

import CartItem from "./CartItem";

type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
};

export default function CartItemsList({
  items,
  onQuantityChange,
  onRemoveItem,
  isRemoving,
  cartId,
}: {
  items: any[];
  onQuantityChange: (index: number, quantity: number) => void;
  onRemoveItem: (index: number) => Promise<void>;
  isRemoving: boolean;
  cartId: string;
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      {/* Cart Header */}
      <div className="p-6 border-b border-gray-200 bg-gray-50">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="font-semibold text-gray-900">
              Cart #{cartId.slice(-8).toUpperCase()}
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              {items.length} item{items.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>
      </div>

      {/* Cart Items */}
      <div className="p-6 space-y-6">
        {items.map((item, itemIndex) => (
          <CartItem
            key={itemIndex}
            item={item}
            itemIndex={itemIndex}
            onQuantityChange={onQuantityChange}
            onRemove={onRemoveItem}
            isRemoving={isRemoving}
          />
        ))}
      </div>
    </div>
  );
}