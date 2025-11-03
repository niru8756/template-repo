export interface OrderResponse {
  data: Order;
}

export interface Order {
  id: string;
  storeId: string;
  customerId: string;
  channelType: string;
  status: string;
  fulfillmentStatus: string;
  purchaseDate: string;
  paymentMethod: string;
  paymentDetail: Record<string, unknown>;
  packageMeasurement: Record<string, unknown>;
  buyerInfo: BuyerInfo;
  shippingDetail: ShippingDetail;
  address: Address;
  totalAmount: number;
  externalOrderId: string;
  externalOrderStatus: string;
  extraData: Record<string, unknown>;
  orderItems: OrderItem[];
}

export interface BuyerInfo {
  city: string;
  email: string;
  phone: string;
  state: string;
  address: string;
  country: string;
  pincode: number;
  building: string;
  lastName: string;
  firstName: string;
  isShippingSame: boolean;
}

export interface ShippingDetail {
  city: string;
  email: string;
  phone: string;
  state: string;
  address: string;
  country: string;
  pincode: number;
  building: string;
  lastName: string;
  firstName: string;
}

export interface Address {
  city: string;
  name: string;
  email: string;
  phone: string;
  state: string;
  address: string;
  country: string;
  pincode: number;
  building: string;
}

export interface OrderItem {
  variantId: string;
  productId: string;
  title: string;
  description: string;
  brandName: string;
  sku: string;
  quantity: number;
  price: number;
  images: ProductImage[];
}

export interface ProductImage {
  position: number;
  url: string;
}

export type OrderDetails = {
  id: string;
  storeId: string;
  customerId: string;
  status: string;
  fulfillmentStatus: string;
  purchaseDate: string;
  paymentMethod: string;
  totalAmount: number;
  orderItems: {
    variantId: string;
    title: string;
    description: string;
    brandName: string;
    quantity: number;
    price: number;
  }[];
};

export type Pagination = {
  totalItems: number;
  currentPage: number;
  totalPages: number;
  pageSize: number;
};
