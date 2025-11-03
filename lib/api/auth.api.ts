import { api } from "./axios";

type VerifyEmailProps = {
  email: string;
  password: string;
  otp: string;
};

export async function login(email: string, password: string, storeId: string) {
  try {
    const res = await api.post("/auth/login", { email, password, storeId });
    return res.data;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
}

export async function signupUser(email: string, password: string) {
  try {
    const res = await api.post("/auth/register", { email, password });
    return res;
  } catch (error) {
    console.error("Error during signup:", error);
    throw error;
  }
}

export async function refreshToken(storeId: string) {
  try {
    const res = await api.get(`/auth/refresh/${storeId}`);
    return res.data;
  } catch (error) {
    console.error("Error refreshing token:", error);
    throw error;
  }
}

export async function logout() {
  try {
    const res = await api.get("/auth/logout");
    return res.data;
  } catch (error) {
    console.error("Error during logout:", error);
    throw error;
  }
}

export async function verifyUserEmail(payload: VerifyEmailProps) {
  try {
    const response = await api.post("/auth/email/verify", payload);
    return response.data;
  } catch (error) {
    console.error("Error verifying user email:", error);
    throw error;
  }
}
