import { cartItemDuringCheckout, cartItems } from "@/lib/type/cart.type";
import { ImagePosition } from "@/lib/type/product.type";
import Image from "next/image";

type OrderSummaryProps = {
  shippingMethod: string;
  parsedData: cartItemDuringCheckout;
};

export default function OrderSummary({
  shippingMethod,
  parsedData,
}: OrderSummaryProps) {
  const subtotal = parsedData.totalAmount;
  const tax = Math.round(subtotal * 0.1);
  const shippingFee =
    shippingMethod === "express"
      ? 99
      : shippingMethod === "overnight"
      ? 299
      : 0;
  const total = subtotal + tax + shippingFee;

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h3>

        <div className="space-y-4 mb-6">
          {parsedData?.items.map((item) => {
            const imageUrl = item.images?.[0]?.url;

            return (
              <div
                key={item.variantId}
                className="flex gap-3 pb-4 border-b last:border-0"
              >
                {imageUrl && (
                  <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden shrink-0">
                    <Image
                      src={imageUrl}
                      alt={item.title}
                      width={100}
                      height={100}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="flex-1 text-sm">
                  <p className="font-semibold text-gray-900">{item.title}</p>
                  <p className="text-gray-600">{item.brandName}</p>
                  <p className="text-gray-600">Qty: {item.quantity}</p>
                </div>
                <p className="font-semibold text-gray-900">
                  ₹{(item.price * item.quantity).toLocaleString()}
                </p>
              </div>
            );
          })}
        </div>

        <div className="space-y-3 pb-4 border-t pt-4">
          <div className="flex justify-between text-gray-600">
            <span>Subtotal</span>
            <span>₹{subtotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Tax (10%)</span>
            <span>₹{tax.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Shipping</span>
            <span
              className={shippingFee === 0 ? "text-green-600 font-medium" : ""}
            >
              {shippingFee === 0 ? "Free" : `₹${shippingFee}`}
            </span>
          </div>
        </div>

        <div className="flex justify-between items-center pt-4 border-t">
          <span className="font-semibold text-gray-900">Total</span>
          <span className="text-2xl font-bold text-orange-600">
            ₹{total.toLocaleString()}
          </span>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-xs text-blue-700 font-medium">🔒 Secure Checkout</p>
        <p className="text-xs text-blue-600 mt-1">
          Your payment information is encrypted and secure.
        </p>
      </div>
    </div>
  );
}
