import { ProductVariantProps } from "@/lib/type/product-variant.type";
import VariantCard from "./VariantCard";

type VariantSelectorProps = {
  variants: ProductVariantProps[];
  selectedVariant: ProductVariantProps | null;
  onVariantSelect: (variant: ProductVariantProps) => void;
};

export default function VariantSelector({
  variants,
  selectedVariant,
  onVariantSelect,
}: VariantSelectorProps) {
  return (
    <div className="mb-6 pb-6 border-b border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
          Select Variant
        </h3>
        <span className="text-xs text-gray-500">
          {variants.length} option{variants.length > 1 ? "s" : ""} available
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {variants.map((variant) => (
          <VariantCard
            key={variant.id}
            variant={variant}
            isSelected={selectedVariant?.id === variant.id}
            onSelect={() => onVariantSelect(variant)}
          />
        ))}
      </div>
    </div>
  );
}
