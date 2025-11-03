import { ProductVariantProps } from "./product-variant.type";

export type ImagePosition = {
  position: number;
  url: string;
}[];

export type ProductMeasurement = {
  width: {
    unit: string;
    value: number;
  };
  height: {
    unit: string;
    value: number;
  };
  length: {
    unit: string;
    value: number;
  };
  weight: {
    unit: string;
    value: number;
  };
};

export type manufacturingInfo = {
  manufacturerOrPackerName: string;
  manufacturerOrPackerAddress: string;
  monthOfManufactureOrPacking: string;
};

export type ProductDetailsProps = {
  storeId: string;
  id: string;
  title: string;
  slug: string;
  hsnCode: string;
  categoryName: string;
  subCategoryName: string;
  brandName: string;
  originCountry: string;
  images: ImagePosition;
};

export type SpecificProductDetailsProps = ProductDetailsProps & {
  description: string;
  productMeasurement: ProductMeasurement;
  manufacturingInfo: manufacturingInfo;
  variants: ProductVariantProps;
};
