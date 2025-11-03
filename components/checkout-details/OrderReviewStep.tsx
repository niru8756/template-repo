import Loader from "../global/Loader";

type OrderReviewStepProps = {
  orderData: any;
  shippingMethod: string;
  paymentMethod: string;
  onEdit: (step: number) => void;
  onPlaceOrder: () => void;
  isLoading: boolean;
};

export default function OrderReviewStep({
  orderData,
  shippingMethod,
  paymentMethod,
  onEdit,
  onPlaceOrder,
  isLoading
}: OrderReviewStepProps) {

  if (isLoading) return <Loader />
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Review Your Order</h2>

      <div className="space-y-4">
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <p className="font-semibold text-gray-900">Billing Address</p>
            <button
              onClick={() => onEdit(1)}
              className="text-xs text-orange-600 hover:text-orange-700 font-medium"
            >
              Edit
            </button>
          </div>
          <p className="text-sm text-gray-600">
            {orderData.firstName} {orderData.lastName}
          </p>
          <p className="text-sm text-gray-600">{orderData.address}</p>
          <p className="text-sm text-gray-600">
            {orderData.city}, {orderData.state} {orderData.pincode}
          </p>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <p className="font-semibold text-gray-900">Shipping Details</p>
            <button
              onClick={() => onEdit(2)}
              className="text-xs text-orange-600 hover:text-orange-700 font-medium"
            >
              Edit
            </button>
          </div>
          <p className="text-sm text-gray-600">
            {shippingMethod === "standard" && "Standard Delivery - 5-7 days"}
            {shippingMethod === "express" && "Express Delivery - 2-3 days"}
            {shippingMethod === "overnight" && "Overnight Delivery - Next day"}
          </p>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <p className="font-semibold text-gray-900">Payment Method</p>
            <button
              onClick={() => onEdit(3)}
              className="text-xs text-orange-600 hover:text-orange-700 font-medium"
            >
              Edit
            </button>
          </div>
          <p className="text-sm text-gray-600">
            {paymentMethod === "CVS" ? "Card/CVS" : "Cash on Delivery"}
          </p>
        </div>
      </div>

      <button
        onClick={onPlaceOrder}
        className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-semibold text-lg transition cursor-pointer"
      >
        Place Order
      </button>
    </div>
  );
}