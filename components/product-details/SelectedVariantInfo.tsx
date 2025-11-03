import { ProductVariantProps } from "@/lib/type/product-variant.type";

type SelectedVariantInfoProps = {
  variant: ProductVariantProps;
};

export default function SelectedVariantInfo({
  variant,
}: SelectedVariantInfoProps) {
  return (
    <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-linear-to-r from-gray-50 to-gray-100 rounded-lg border border-gray-200">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-0">
        {/* Left Section */}
        <div>
          <div className="text-[11px] sm:text-xs text-gray-500 mb-0.5 sm:mb-1 font-medium">
            Currently Selected:
          </div>
          <div className="font-semibold text-gray-900 text-sm sm:text-base leading-snug">
            {variant.attributes?.color?.displayName ||
              variant.attributes?.color?.value}
            {variant.attributes?.size &&
              ` • ${
                variant.attributes.size.displayName ||
                variant.attributes.size.name
              }`}
          </div>
          {variant.sku && (
            <div className="text-[10px] sm:text-xs text-gray-500 mt-0.5 sm:mt-1 break-all">
              SKU: {variant.sku}
            </div>
          )}
        </div>

        {/* Right Section */}
        <div className="text-left sm:text-right">
          <div className="text-lg sm:text-xl font-bold text-orange-600">
            ₹{variant.price?.toLocaleString()}
          </div>
          {variant.onHand !== undefined && (
            <div
              className={`text-[11px] sm:text-xs font-medium mt-0.5 sm:mt-1 ${
                variant.onHand > 0 ? "text-green-600" : "text-red-500"
              }`}
            >
              {variant.onHand > 0
                ? `${variant.onHand} available`
                : "Out of stock"}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
