import { api } from "./axios";

export type RemoveItemFromCart = {
  cartId: string;
  variantId: string;
};

export type AddItemToCartProps = RemoveItemFromCart & {
  quantity: number;
  price: number;
};

export async function createNewCart(customerId: string) {
  try {
    const response = await api.post("/cart", { customerId });
    return response;
  } catch (error) {
    console.error("Error creating new cart:", error);
    throw error;
  }
}

export async function getCart(customerId: string) {
  try {
    const response = await api.get(`/cart/customer/${customerId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching cart:", error);
    throw error;
  }
}

export async function addItemToCart(payload: AddItemToCartProps) {
  try {
    const response = await api.post("/cart/item", payload);
    return response.data;
  } catch (error) {
    console.error("Error adding item to cart:", error);
    throw error;
  }
}

export async function removeItemFromCart(payload: RemoveItemFromCart) {
  try {
    const response = await api.delete("/cart/item", { data: payload });
    return response.data;
  } catch (error) {
    console.error("Error removing item from cart:", error);
    throw error;
  }
}

export async function deleteAllCart(cartId: string) {
  try {
    const response = await api.delete(`/cart/${cartId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting cart:", error);
    throw error;
  }
}
