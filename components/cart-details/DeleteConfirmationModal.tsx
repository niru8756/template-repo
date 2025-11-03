"use client";

import { AlertCircle } from "lucide-react";

type DeleteConfirmationModalProps = {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading: boolean;
}

export default function DeleteConfirmationModal({
  isOpen,
  onConfirm,
  onCancel,
  isLoading,
}: DeleteConfirmationModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl p-6 max-w-sm w-full shadow-xl">
        <div className="flex items-center gap-3 mb-4">
          <AlertCircle className="w-6 h-6 text-red-600" />
          <h3 className="text-lg font-bold text-gray-900">Clear Cart?</h3>
        </div>
        <p className="text-gray-600 mb-6">
          Are you sure you want to remove all items from your cart? This action
          cannot be undone.
        </p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            disabled={isLoading}
            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition disabled:opacity-50"
          >
            {isLoading ? "Clearing..." : "Clear Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}