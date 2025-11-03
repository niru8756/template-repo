"use client";

import { AlertCircle } from "lucide-react";

export default function ErrorAlert({ message }: { message: string }) {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <AlertCircle className="w-10 h-10 text-red-500 mx-auto mb-3" />
        <p className="text-red-700 font-medium">{message}</p>
      </div>
    </div>
  );
}
