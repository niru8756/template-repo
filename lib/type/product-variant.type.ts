import {
  ImagePosition,
  manufacturingInfo,
  ProductMeasurement,
} from "./product.type";

export type AttributeOptions = {
  color: {
    displayName: string;
    hexCode: string;
    value: string;
  };
  size: {
    brand: string;
    displayName: string;
    gender: string;
    name: string;
    value: {
      displayName: string;
      id: string;
      numericCM: string;
      numericEU: string;
      numericUK: string;
      width: string;
    }[];
  };
};

export type ProductVariantProps = {
  allocated: number;
  attributes: AttributeOptions;
  id: string;
  images: ImagePosition;
  mrp: number;
  onHand: number;
  price: number;
  sku: string;
};

export type ParticularProductVariantProps = Omit<ProductVariantProps, "id"> & {
  brandName: string;
  categoryName: string;
  description: string;
  manufacturingInfo: manufacturingInfo;
  originCountry: string;
  productId: string;
  productMeasurement: ProductMeasurement;
  slug: string;
  subCategoryName: string;
  title: string;
  variantId: string;
  storeId: string;
};
