import AddressForm from "../global/AddressForm";
import ShippingMethodSelector from "./ShippingMethodSelector";

type ShippingStepProps = {
  orderData: any;
  shippingData: any;
  shippingMethod: string;
  onShippingChange: (e: any) => void;
  onShippingMethodChange: (method: string) => void;
  onBack: () => void;
  onContinue: () => void;
};

export default function ShippingStep({
  orderData,
  shippingData,
  shippingMethod,
  onShippingChange,
  onShippingMethodChange,
  onBack,
  onContinue,
}: ShippingStepProps) {
  return (
    <div className="space-y-6">
      {/* Shipping Address Form (only if different from billing) */}
      {!orderData.isShippingSame && (
        <div className="w-full">
          <AddressForm
            title="Shipping Address"
            orderData={shippingData}
            onChange={onShippingChange}
            onContinue={() => {}}
            buttonText="Confirm Shipping Address"
            showShippingCheckbox={false}
          />
        </div>
      )}

      {/* Shipping Method Section */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 md:p-8 space-y-6 shadow-sm">
        <ShippingMethodSelector
          selectedMethod={shippingMethod}
          onMethodChange={onShippingMethodChange}
        />

        {/* Special Instructions */}
        <div className="space-y-2">
          <label
            htmlFor="specialInstructions"
            className="block text-sm sm:text-base font-medium text-gray-700"
          >
            Special Instructions (Optional)
          </label>
          <textarea
            id="specialInstructions"
            placeholder="e.g., Leave at door, Call before delivery"
            className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg text-sm sm:text-base focus:ring-2 focus:ring-orange-500 focus:outline-none resize-none"
            rows={3}
          />
        </div>

        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <button
            onClick={onBack}
            className="w-full sm:flex-1 border-2 border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition"
          >
            Back to Billing
          </button>
          <button
            onClick={onContinue}
            className="w-full sm:flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold transition"
          >
            Continue to Payment
          </button>
        </div>
      </div>
    </div>
  );
}
