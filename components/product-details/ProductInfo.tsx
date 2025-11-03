"use client";

import { SpecificProductDetailsProps } from "@/lib/type/product.type";

type ProductInfoProps = {
  product: SpecificProductDetailsProps;
};

type ManufacturingDetailsProps = {
  manufacturingInfo: SpecificProductDetailsProps["manufacturingInfo"];
};

type DimensionsWeightProps = {
  measurement: SpecificProductDetailsProps["productMeasurement"];
};

function ManufacturingDetails({
  manufacturingInfo,
}: ManufacturingDetailsProps) {
  const details = [
    {
      label: "Manufacturer",
      value: manufacturingInfo.manufacturerOrPackerName,
    },
    {
      label: "Address",
      value: manufacturingInfo.manufacturerOrPackerAddress,
    },
    {
      label: "Manufactured",
      value: manufacturingInfo.monthOfManufactureOrPacking,
    },
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
      <h4 className="font-semibold text-gray-900 mb-3 text-base sm:text-lg">
        Manufacturing Details
      </h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm bg-gray-50 p-4 rounded-lg">
        {details.map((detail, index) => (
          <div key={index}>
            <p className="text-gray-600">{detail.label}</p>
            <p className="font-medium text-gray-900">{detail.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function DimensionsWeight({ measurement }: DimensionsWeightProps) {
  const dimensions = [
    {
      label: "Length",
      value: measurement.length.value,
      unit: measurement.length.unit,
    },
    {
      label: "Width",
      value: measurement.width.value,
      unit: measurement.width.unit,
    },
    {
      label: "Height",
      value: measurement.height.value,
      unit: measurement.height.unit,
    },
    {
      label: "Weight",
      value: measurement.weight.value,
      unit: measurement.weight.unit,
    },
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
      <h4 className="font-semibold text-gray-900 mb-3 text-base sm:text-lg">
        Dimensions & Weight
      </h4>
      <div className="grid grid-cols-2 gap-3 text-sm bg-gray-50 p-4 rounded-lg">
        {dimensions.map((dim, index) => (
          <div key={index}>
            <p className="text-gray-600">{dim.label}</p>
            <p className="font-medium text-gray-900">
              {dim.value} {dim.unit}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ProductInfo({ product }: ProductInfoProps) {
  return (
    <div>
      <h3 className="text-lg font-bold text-gray-900 mb-4">
        Product Information
      </h3>

      <div className="space-y-4">
        <ManufacturingDetails manufacturingInfo={product.manufacturingInfo} />
        <DimensionsWeight measurement={product.productMeasurement} />
      </div>
    </div>
  );
}
