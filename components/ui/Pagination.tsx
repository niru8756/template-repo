"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const generatePages = () => {
    const pages: (number | string)[] = [];
    const delta = 2;

    if (totalPages <= 1) return [1];

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - delta && i <= currentPage + delta)
      ) {
        pages.push(i);
      } else if (pages[pages.length - 1] !== "...") {
        pages.push("...");
      }
    }
    return pages;
  };

  const pages = generatePages();

  return (
    <div className="flex items-center justify-center mt-6 gap-2 select-none">
      {/* Prev */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center justify-center px-3 py-1.5 border rounded-lg text-sm font-medium
          disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition"
      >
        <ChevronLeft className="w-4 h-4 mr-1" />
        Prev
      </button>

      {/* Page Numbers */}
      {pages.map((page, index) =>
        page === "..." ? (
          <span key={index} className="px-3 py-1.5 text-gray-500">
            ...
          </span>
        ) : (
          <button
            key={index}
            onClick={() => onPageChange(Number(page))}
            className={`px-3 py-1.5 rounded-lg border text-sm font-medium transition
              ${
                currentPage === page
                  ? "bg-orange-500 text-white border-orange-500"
                  : "hover:bg-gray-100"
              }`}
          >
            {page}
          </button>
        )
      )}

      {/* Next */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center justify-center px-3 py-1.5 border rounded-lg text-sm font-medium
          disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition"
      >
        Next
        <ChevronRight className="w-4 h-4 ml-1" />
      </button>
    </div>
  );
};

export default Pagination;
