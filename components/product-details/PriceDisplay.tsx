type PriceDisplayProps = {
  price: number;
  mrp: number;
};

export default function PriceDisplay({ price, mrp }: PriceDisplayProps) {
  const discount =
    mrp && price && mrp > price
      ? Math.round(((mrp - price) / mrp) * 100)
      : null;

  return (
    <div className="mb-6 pb-6 border-b border-gray-200">
      <div className="flex items-baseline gap-3 mb-2">
        <span className="text-3xl font-bold bg-linear-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
          ₹{price?.toLocaleString()}
        </span>
        {mrp && mrp > price && (
          <>
            <span className="text-lg text-gray-400 line-through">
              ₹{mrp.toLocaleString()}
            </span>
            {discount && (
              <span className="text-sm font-semibold text-green-600 bg-green-50 px-2 py-1 rounded">
                {discount}% OFF
              </span>
            )}
          </>
        )}
      </div>
      <p className="text-xs text-gray-500">Inclusive of all taxes</p>
    </div>
  );
}
