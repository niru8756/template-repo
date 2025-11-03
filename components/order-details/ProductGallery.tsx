"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { OrderItem } from "@/lib/type/order.type";

type ProductGalleryProps = {
  item: OrderItem;
};

export default function ProductGallery({ item }: ProductGalleryProps) {
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const images = item?.images || [];

  const handlePrevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h2 className="text-lg font-bold text-gray-900 mb-4">Product</h2>

      {/* Main Image */}
      <div className="relative bg-gray-100 rounded-lg overflow-hidden mb-4 flex justify-center group">
        <div className="relative w-60">
          <img
            src={images[activeImageIndex]?.url}
            alt={item.title}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={handlePrevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-2 rounded-full transition shadow-lg"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={handleNextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-2 rounded-full transition shadow-lg"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}

        {/* Image Counter */}
        <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium">
          {activeImageIndex + 1}/{images.length}
        </div>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2 mb-6">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveImageIndex(idx)}
              className={`relative shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition ${
                activeImageIndex === idx
                  ? "border-orange-500 ring-2 ring-orange-300"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <img
                src={img.url}
                alt={`${item.title}-${idx}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Product Info */}
      <div className="space-y-3">
        <div>
          <h3 className="font-semibold text-gray-900">{item.title}</h3>
          <p className="text-sm text-gray-600 mt-1">{item.brandName}</p>
        </div>
        <div className="flex justify-between items-end">
          <div>
            <p className="text-xs text-gray-600 mb-1">SKU</p>
            <p className="font-mono text-sm text-gray-900">{item.sku}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-600 mb-1">Quantity</p>
            <p className="font-bold text-lg text-gray-900">{item.quantity}</p>
          </div>
        </div>
        <p className="text-sm text-gray-600 leading-relaxed">
          {item.description}
        </p>
      </div>
    </div>
  );
}
