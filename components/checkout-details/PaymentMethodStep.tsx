import { useEffect } from "react";
import Loader from "../global/Loader";

type PaymentMethodStepProps = {
  paymentMethod: string;
  onPaymentMethodChange: (method: string) => void;
  onBack: () => void;
  onContinue: () => void;
  isLoading: boolean;
};

export default function PaymentMethodStep({
  paymentMethod,
  onPaymentMethodChange,
  onBack,
  onContinue,
  isLoading
}: PaymentMethodStepProps) {
  const methods = [
    { id: "CVS", name: "Card/CVS", description: "Pay securely with your credit/debit card" },
    { id: "COD", name: "Cash on Delivery", description: "Pay when your order arrives" },
  ];

  if (isLoading) {
    return <Loader />
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Payment Method</h2>
        <button
          onClick={onBack}
          className="text-sm text-orange-600 hover:text-orange-700 font-medium"
        >
          ← Edit Shipping
        </button>
      </div>

      <div className="space-y-3">
        {methods.map((method) => (
          <div
            key={method.id}
            className={`border-2 rounded-lg p-4 cursor-pointer transition ${
              paymentMethod === method.id
                ? "border-orange-500 bg-orange-50"
                : "border-gray-200 hover:border-gray-300"
            }`}
            onClick={() => onPaymentMethodChange(method.id)}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  paymentMethod === method.id ? "border-orange-500" : "border-gray-300"
                }`}
              >
                {paymentMethod === method.id && (
                  <div className="w-3 h-3 bg-orange-500 rounded-full" />
                )}
              </div>
              <div>
                <p className="font-semibold text-gray-900">{method.name}</p>
                <p className="text-sm text-gray-600">{method.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {paymentMethod === "CVS" && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-700">
            You will be redirected to our secure payment gateway.
          </p>
        </div>
      )}

      {paymentMethod === "COD" && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-sm text-green-700">
            Please have the exact amount ready when the delivery partner arrives.
          </p>
        </div>
      )}

      <button
        onClick={onContinue}
        className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold transition cursor-pointer"
      >
        Review Order
      </button>
    </div>
  );
}