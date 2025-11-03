import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { BASE_URL, storeId } from "../constant";

// ------------------ ACCESS TOKEN HANDLING ------------------
let accessToken: string | null = null;

export const setAccessToken = (token: string | null) => {
  accessToken = token;
};

// ------------------ REFRESH TOKEN (Singleton) ------------------
let refreshTokenPromise: Promise<string> | null = null;

const refreshTokenSingleton = async (): Promise<string> => {
  if (refreshTokenPromise) return refreshTokenPromise;

  refreshTokenPromise = axios
    .get(`${BASE_URL}/auth/refresh/${storeId}`, {
      headers: {
        "Content-Type": "application/json",
        "x-store-id": storeId,
      },
      withCredentials: true,
    })
    .then((response) => {
      const newAccessToken = response.data?.data?.accessToken;
      if (!newAccessToken) throw new Error("Access token missing");
      setAccessToken(newAccessToken);
      return newAccessToken;
    })
    .finally(() => {
      refreshTokenPromise = null;
    });

  return refreshTokenPromise;
};

// ------------------ AXIOS INSTANCE ------------------
export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// ------------------ REQUEST INTERCEPTOR ------------------
const requestConfig = (config: InternalAxiosRequestConfig<any>) => {
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  if (storeId) {
    config.headers["x-store-id"] = storeId;
  }
  return config;
};

const requestError = (error: any) => Promise.reject(error);

// ------------------ RESPONSE INTERCEPTOR ------------------
const responseConfig = (response: AxiosResponse) => response;

const responseError = async (error: AxiosError) => {
  const originalRequest = error.config as InternalAxiosRequestConfig & {
    _retry?: boolean;
  };

  if (error.response?.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;

    try {
      const newAccessToken = await refreshTokenSingleton();
      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
      return api(originalRequest); // Retry with new token
    } catch (refreshError) {
      console.error("🔴 Refresh token failed:", refreshError);

      const pathname = window.location.pathname;
      if (!pathname.startsWith("/auth/")) {
        // removeAllCookies();
        window.location.href = "/auth/login";
      }

      return Promise.reject(refreshError);
    }
  }

  return Promise.reject(error);
};

// ------------------ REGISTER INTERCEPTORS ------------------
api.interceptors.request.use(requestConfig, requestError);
api.interceptors.response.use(responseConfig, responseError);

// ------------------ OPTIONAL: PRE-LOAD TOKEN ------------------
(async () => {
  if (!accessToken) {
    try {
      await refreshTokenSingleton();
    } catch {
      // silent fail — token may not exist on first load
    }
  }
})();
