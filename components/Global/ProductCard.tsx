"use client";

import React from "react";

type ProductCardProps = {
  id: string;
  title?: string;
  imageUrl?: string;
  brandName?: string;
  subCategoryName?: string;
  originCountry?: string;
  sku?: string;
  price?: number;
  mrp?: number;
  colorName?: string;
  colorHex?: string;
  sizeName?: string;
  onHand?: number;
  onClick?: (id: string) => void;
  buttonLabel?: string;
  showButton?: boolean;
};

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  title,
  imageUrl,
  brandName,
  subCategoryName,
  originCountry,
  price,
  mrp,
  colorName,
  colorHex,
  sizeName,
  onHand,
  onClick,
  buttonLabel = "View Details",
  showButton = false,
}) => {
  const discount =
    mrp && price && mrp > price
      ? Math.round(((mrp - price) / mrp) * 100)
      : null;

  const handleClick = () => {
    if (onClick) onClick(id);
  };

  return (
    <div
      onClick={handleClick}
      className="group cursor-pointer relative rounded-lg overflow-hidden bg-white shadow-md hover:shadow-2xl transition-all duration-500 
                 w-full sm:w-[300px] md:w-[350px] lg:w-[380px] border border-gray-100"
    >
      {/* Discount Badge */}
      {discount && (
        <div className="absolute top-3 right-3 z-10 bg-linear-to-r from-orange-600 to-orange-500 text-white px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-bold shadow-md">
          {discount}% OFF
        </div>
      )}

      {/* Stock Badge */}
      {onHand !== undefined && (
        <div
          className={`absolute top-3 left-3 z-10 px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-semibold shadow-md backdrop-blur-sm ${
            onHand > 0
              ? "bg-orange-600 text-white"
              : "bg-gray-800/90 text-white"
          }`}
        >
          {onHand > 0 ? `${onHand} in stock` : "Out of stock"}
        </div>
      )}

      {/* Product Image */}
      <div className="relative h-52 sm:h-64 md:h-72 lg:h-80 bg-linear-to-br from-gray-50 to-gray-100 overflow-hidden">
        <img
          src={
            imageUrl ||
            "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80"
          }
          alt={title || "Product"}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5 md:p-6 space-y-2 sm:space-y-3">
        {/* Brand and Category */}
        <div className="flex flex-wrap justify-between gap-2">
          {(brandName || subCategoryName) && (
            <div className="flex flex-wrap items-center gap-1 text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">
              {brandName && <span>{brandName}</span>}
              {brandName && subCategoryName && <span>•</span>}
              {subCategoryName && <span>{subCategoryName}</span>}
            </div>
          )}
          {originCountry && (
            <span className="text-[10px] sm:text-xs text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full whitespace-nowrap">
              Made in {originCountry}
            </span>
          )}
        </div>

        {/* Product Title */}
        <h2 className="font-bold text-base sm:text-lg md:text-xl text-gray-900 leading-snug line-clamp-2">
          {title ||
            `${sizeName ?? ""} ${colorName ?? ""}`.trim() ||
            "Untitled Product"}
        </h2>

        {/* Price Section */}
        <div className="flex flex-wrap justify-between items-center">
          {(price || mrp) && (
            <div className="flex items-baseline gap-2 sm:gap-3 pt-1 sm:pt-2">
              {price && (
                <p className="font-bold text-lg sm:text-xl md:text-2xl bg-linear-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                  ₹{price.toLocaleString()}
                </p>
              )}
              {mrp && mrp > (price ?? 0) && (
                <span className="text-xs sm:text-sm text-gray-400 line-through">
                  ₹{mrp.toLocaleString()}
                </span>
              )}
            </div>
          )}

          {colorHex && (
            <div className="flex items-center gap-1 sm:gap-2">
              <span className="text-[10px] sm:text-xs text-gray-500 font-medium">
                Color:
              </span>
              <div
                className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border border-gray-200 shadow-sm transition-transform group-hover:scale-110"
                style={{ backgroundColor: colorHex }}
                title={colorName}
              ></div>
              {colorName && (
                <span className="text-[10px] sm:text-xs text-gray-600">
                  {colorName}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Action Button */}
        {showButton && onClick && (
          <button
            className="w-full mt-3 sm:mt-4 py-2.5 sm:py-3 text-xs sm:text-sm rounded-lg sm:rounded-xl font-semibold bg-linear-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 active:scale-95 transition-all duration-200 shadow-md hover:shadow-lg max-md:hidden"
            onClick={() => onClick(id)}
          >
            {buttonLabel}
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
