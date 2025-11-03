"use client";

import { MapPin } from "lucide-react";
import { BuyerInfo, ShippingDetail } from "@/lib/type/order.type";

type CommonAddress = Omit<BuyerInfo, "isShippingSame">;

type AddressCardProps = {
  title: string;
  address?: CommonAddress | ShippingDetail;
}

export default function AddressCard({ title, address }: AddressCardProps) {
  if (!address) return null;

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
        <MapPin className="w-5 h-5 text-orange-500" />
        {title}
      </h2>
      <div className="bg-gray-50 p-4 rounded-lg">
        <p className="font-semibold text-gray-900">
          {address.firstName} {address.lastName}
        </p>
        <p className="text-gray-600 text-sm mt-2">
          {address.building && `${address.building}, `}
          {address.address}
        </p>
        <p className="text-gray-600 text-sm">
          {address.city}, {address.state} {address.pincode}
        </p>
        <p className="text-gray-600 text-sm capitalize">{address.country}</p>

        <div className="flex flex-col sm:flex-row gap-4 mt-3 pt-3 border-t border-gray-200">
          <div>
            <p className="text-xs text-gray-600 mb-1">Phone</p>
            <p className="font-medium text-gray-900">{address.phone}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-1">Email</p>
            <p className="font-medium text-gray-900 wrap-break-words">
              {address.email}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
