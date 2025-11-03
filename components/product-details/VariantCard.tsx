import { ProductVariantProps } from "@/lib/type/product-variant.type";

type VariantCardProps = {
  variant: ProductVariantProps;
  isSelected: boolean;
  onSelect: () => void;
};

export default function VariantCard({
  variant,
  isSelected,
  onSelect,
}: VariantCardProps) {
  
  const isOutOfStock = (variant.onHand || 0) <= 0;
  const discount =
    variant.mrp && variant.price && variant.mrp > variant.price
      ? Math.round(((variant.mrp - variant.price) / variant.mrp) * 100)
      : null;

  return (
    <button
      onClick={() => !isOutOfStock && onSelect()}
      disabled={isOutOfStock}
      className={`
        relative w-full rounded-xl border-2 p-3 sm:p-4 text-left transition-all duration-200
        ${
          isSelected
            ? "border-orange-500 bg-linear-to-br from-orange-50 to-orange-100 shadow-md ring-2 ring-orange-200"
            : "border-gray-200 bg-white hover:border-orange-300 hover:shadow-sm"
        }
        ${
          isOutOfStock
            ? "opacity-60 cursor-not-allowed"
            : "cursor-pointer hover:scale-[1.02]"
        }
      `}
    >
      {/* Color Display */}
      {variant.attributes?.color && (
        <div className="flex items-center gap-2 mb-2 sm:mb-3">
          {variant.attributes.color.hexCode && (
            <span
              className="w-6 h-6 sm:w-7 sm:h-7 rounded-full border-2 border-white shadow-md ring-2 ring-gray-200"
              style={{ backgroundColor: variant.attributes.color.hexCode }}
            />
          )}
          <span className="text-sm sm:text-base font-semibold text-gray-900">
            {variant.attributes.color.displayName ||
              variant.attributes.color.value}
          </span>
        </div>
      )}

      {/* Size Display */}
      {variant.attributes?.size && (
        <div className="text-xs sm:text-sm text-gray-600 mb-1.5 sm:mb-2">
          <span className="font-medium">Size:</span>{" "}
          {variant.attributes.size.displayName || variant.attributes.size.name}
        </div>
      )}

      {/* Price */}
      <div className="flex flex-wrap items-baseline gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
        <span className="text-base sm:text-lg font-bold text-gray-900">
          ₹{variant.price?.toLocaleString()}
        </span>
        {variant.mrp && variant.mrp > variant.price && (
          <>
            <span className="text-xs sm:text-sm text-gray-400 line-through">
              ₹{variant.mrp.toLocaleString()}
            </span>
            {discount && (
              <span className="text-xs sm:text-sm font-semibold text-green-600">
                {discount}% off
              </span>
            )}
          </>
        )}
      </div>

      {/* Stock Status */}
      <div
        className={`text-xs sm:text-sm font-medium ${
          isOutOfStock ? "text-red-500" : "text-green-600"
        }`}
      >
        {isOutOfStock ? "• Out of Stock" : `• ${variant.onHand} in stock`}
      </div>

      {/* SKU */}
      {variant.sku && (
        <div className="text-[10px] sm:text-xs text-gray-400 mt-1">
          SKU: {variant.sku}
        </div>
      )}

      {/* Out of Stock Badge */}
      {isOutOfStock && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/70 backdrop-blur-sm rounded-xl">
          <span className="text-[10px] sm:text-xs font-bold text-red-600 bg-white px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full shadow-sm border border-red-200">
            Sold Out
          </span>
        </div>
      )}
    </button>
  );
}
