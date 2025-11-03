import { AttributeOptions } from "./product-variant.type";
import { ImagePosition } from "./product.type";

export type cartItems = {
  customerId: string;
  id: string;
  items: {
    brandName: string;
    description: string;
    images: ImagePosition;
    option: {
      data: AttributeOptions;
      custom: string;
    };
    price: number;
    quantity: number;
    sku: string;
    title: string;
    variantId: string;
  }[];
  storeId: string;
  totalAmount: number;
};

export type cartItemDuringCheckout = {
  id: string;
  items: {
    brandName: string;
    description: string;
    images: ImagePosition;
    price: number;
    quantity: number;
    sku: string;
    title: string;
    variantId: string;
  }[];
  totalAmount: number;
};

export interface CartItemType {
  id: string;
  title: string;
  brandName: string;
  price: number;
  quantity: number;
  sku?: string;
  images?: { url: string }[];
  option?: {
    data?: {
      color?: { displayName: string; hexCode: string };
      size?: { displayName: string; name: string };
    };
  };
  variantId: string;
}

export interface CartData {
  id: string;
  items: CartItemType[];
  totalAmount: number;
}

export interface RemoveItemFromCartPayload {
  cartId: string;
  variantId: string;
}
