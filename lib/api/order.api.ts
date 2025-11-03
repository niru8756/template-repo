import { api } from "./axios";

export type newOrderProps = {
  cartId: string;
  customerId: string;
  channelType: string;
  buyerInfo: buyerInfoDetails;
  shippingDetail: ShippingDetails;
  address: addressDetails;
  extraData?: object;
  paymentMethod: "COD" | "CVS" | "OTHER";
};

export type buyerInfoDetails = {
  firstName: string;
  lastName: string;
  address: string;
  building: string;
  city: string;
  pincode: number;
  state: string;
  country: string;
  email: string;
  phone: string;
  isShippingSame: boolean;
};

export type ShippingDetails = Omit<buyerInfoDetails, "isShippingSame">;

export type addressDetails = Omit<ShippingDetails, "firstName" | "lastName"> & {
  name: string;
};

export async function createNewOrder(payload: newOrderProps) {
  try {
    const response = await api.post("/order", payload);
    return response;
  } catch (error: any) {
    console.error("Error creating new order:", error.response?.data || error);
    throw new Error(
      error.response?.data?.message || "Failed to create new order"
    );
  }
}

export async function getAllOrders(page?: number, limit?: number) {
  try {
    const response = await api.get(
      `/order?page=${page ?? 1}&limit=${limit ?? 10}`
    );
    return response.data;
  } catch (error: any) {
    console.error("Error fetching orders:", error.response?.data || error);
    throw new Error(error.response?.data?.message || "Failed to fetch orders");
  }
}

export async function getParticularDetails(orderId: string) {
  try {
    const response = await api.get(`/order/${orderId}`);
    return response.data;
  } catch (error: any) {
    console.error(
      `Error fetching order details for ID ${orderId}:`,
      error.response?.data || error
    );
    throw new Error(
      error.response?.data?.message || "Failed to fetch order details"
    );
  }
}
