import { RotateCcw, Shield, Truck } from "lucide-react";
import { cartItems } from "./type/cart.type";

export const ACCESS_TOKEN = "access_token";
export const REFRESH_TOKEN = "refesh_token";
export const BASE_URL = "https://dev-sfapi.unisouk.com";

export const PUBLIC_ROUTES = ["/auth/login", "/auth/signup"];

export const TRUST_BADGE = [
  {
    icon: Truck,
    title: "Free Shipping",
    subtitle: "On orders above ₹500",
  },
  {
    icon: Shield,
    title: "2 Year Warranty",
    subtitle: "Manufacturer warranty",
  },
  {
    icon: RotateCcw,
    title: "Easy Returns",
    subtitle: "30-day return policy",
  },
];

export const INITIAL_CART_ITEMS: cartItems = {
  customerId: "",
  id: "",
  storeId: "",
  totalAmount: 0,
  items: [
    {
      brandName: "",
      description: "",
      images: [
        {
          position: 1,
          url: "",
        },
      ],
      option: {
        data: {
          color: {
            displayName: "",
            hexCode: "#FFFFFF",
            value: "",
          },
          size: {
            brand: "",
            displayName: "",
            gender: "",
            name: "",
            value: [
              {
                displayName: "",
                id: "",
                numericCM: "",
                numericEU: "",
                numericUK: "",
                width: "",
              },
            ],
          },
        },
        custom: "",
      },
      price: 0,
      quantity: 0,
      sku: "",
      title: "",
      variantId: "",
    },
  ],
};

export const storeId = process.env.NEXT_PUBLIC_STORE_ID || "";
