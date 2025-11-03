"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ImagePosition } from "@/lib/type/product.type";

type ProductGalleryProps = {
  images: ImagePosition;
  title: string;
  activeImage: number;
  setActiveImage: (index: number | ((prev: number) => number)) => void;
};

export default function ProductGallery({
  images,
  title,
  activeImage,
  setActiveImage,
}: ProductGalleryProps) {
  
  if (!images?.length) {
    return (
      <div className="flex justify-center items-center aspect-square bg-gray-100 rounded-2xl">
        <p className="text-gray-500">No images available</p>
      </div>
    );
  }

  const total = images.length;

  const nextImage = () => setActiveImage((prev) => (prev + 1) % total);
  const prevImage = () => setActiveImage((prev) => (prev - 1 + total) % total);

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image */}
      <div className="relative rounded-2xl overflow-hidden bg-gray-100 group">
        <div className="relative aspect-square">
          <Image
            src={images[activeImage].url}
            alt={title}
            fill
            priority
            className="object-contain transition-transform duration-300"
          />
        </div>

        {/* Image Counter */}
        <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur">
          {activeImage + 1}/{total}
        </div>

        {/* Navigation */}
        {total > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition"
              aria-label="Previous image"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition"
              aria-label="Next image"
            >
              <ChevronRight size={24} />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {total > 1 && (
        <div className="flex overflow-x-auto gap-3 pb-2 pt-2 pl-2">
          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => setActiveImage(index)}
              className={`relative shrink-0 rounded-lg overflow-hidden border-2 transition ${
                activeImage === index
                  ? "border-orange-500 ring-2 ring-orange-300"
                  : "border-gray-200 hover:border-gray-300"
              }`}
              aria-label={`View image ${index + 1}`}
            >
              <Image
                src={img.url}
                alt={`${title}-${index}`}
                width={90}
                height={90}
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
