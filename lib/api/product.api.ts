import { api } from "./axios";

export default async function getAllProductList(
  limit?: number,
  page?: number,
  search?: string
) {
  try {
    const res = await api.get(
      `/product?limit=${limit ?? 10}&page=${page ?? 1}${
        search ? `&search=${search}` : ""
      }`
    );
    return res.data;
  } catch (error: any) {
    console.error(
      "Error fetching product list:",
      error?.response?.data || error
    );
    throw new Error(
      error?.response?.data?.message || "Failed to fetch product list."
    );
  }
}

export async function getProductDetails(productId: string) {
  try {
    const res = await api.get(`/product/${productId}`);
    return res.data;
  } catch (error: any) {
    console.error(
      "Error fetching product details:",
      error?.response?.data || error
    );
    throw new Error(
      error?.response?.data?.message || "Failed to fetch product details."
    );
  }
}

export async function getProductVariantDetails(
  productId: string,
  variantId: string
) {
  try {
    const res = await api.get(`/product/${productId}/variant/${variantId}`);
    return res.data;
  } catch (error: any) {
    console.error(
      "Error fetching product variant details:",
      error?.response?.data || error
    );
    throw new Error(
      error?.response?.data?.message ||
        "Failed to fetch product variant details."
    );
  }
}

export async function getProductVariant(productId: string) {
  try {
    const res = await api.get(`/product/${productId}/variant`);
    return res.data;
  } catch (error: any) {
    console.error(
      "Error fetching product variants:",
      error?.response?.data || error
    );
    throw new Error(
      error?.response?.data?.message || "Failed to fetch product variants."
    );
  }
}
