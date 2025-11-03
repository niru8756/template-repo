type ShippingMethodSelectorProps = {
  selectedMethod: string;
  onMethodChange: (method: string) => void;
};

export default function ShippingMethodSelector({
  selectedMethod,
  onMethodChange,
}: ShippingMethodSelectorProps) {
  const methods = [
    { id: "standard", name: "Standard Delivery", time: "5-7 business days", price: 0 },
    { id: "express", name: "Express Delivery", time: "2-3 business days", price: 99 },
    { id: "overnight", name: "Overnight Delivery", time: "Next day delivery", price: 299 },
  ];

  const getDeliveryDate = (method: string) => {
    if (method === "overnight") return "Tomorrow";
    if (method === "express") return "Nov 2 - Nov 4, 2025";
    return "Nov 6 - Nov 13, 2025";
  };

  return (
    <div className="space-y-3">
      <h3 className="font-semibold text-gray-900">Shipping Method</h3>

      {methods.map((method) => (
        <div
          key={method.id}
          className={`border-2 rounded-lg p-4 cursor-pointer transition ${
            selectedMethod === method.id
              ? "border-orange-500 bg-orange-50"
              : "border-gray-200 hover:border-gray-300"
          }`}
          onClick={() => onMethodChange(method.id)}
        >
          <div className="flex items-center gap-3">
            <div
              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                selectedMethod === method.id ? "border-orange-500" : "border-gray-300"
              }`}
            >
              {selectedMethod === method.id && (
                <div className="w-3 h-3 bg-orange-500 rounded-full" />
              )}
            </div>
            <div className="flex-1">
              <p className="font-semibold text-gray-900">{method.name}</p>
              <p className="text-sm text-gray-600">{method.time}</p>
            </div>
            <div className="text-right">
              <p className={`font-semibold ${method.price === 0 ? "text-green-600" : "text-gray-900"}`}>
                {method.price === 0 ? "FREE" : `₹${method.price}`}
              </p>
            </div>
          </div>
        </div>
      ))}

      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <p className="text-sm text-gray-600 mb-1">Expected Delivery</p>
        <p className="text-2xl font-bold text-green-700">{getDeliveryDate(selectedMethod)}</p>
        <p className="text-xs text-green-600 mt-1">✓ Will be delivered by end of day</p>
      </div>
    </div>
  );
}