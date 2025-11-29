/* eslint-disable @typescript-eslint/no-explicit-any */

import axios from "axios";
import {
  getAuthToken,
  getAuthRefreshToken,
  setAuthCookies,
  clearAuthCookies,
} from "@/api/cookie-auth";
import { useAuthStore } from "@/stores/auth-store";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://66.42.92.219/api";

const apiClient = axios.create({
  baseURL: API_BASE,
  timeout: 20000,
});

let isRefreshing = false;
let refreshQueue: {
  resolve: (token?: string) => void;
  reject: (error?: any) => void;
}[] = [];

function processQueue(error: any, token: string | null = null) {
  refreshQueue.forEach((p) =>
    error ? p.reject(error) : p.resolve(token || undefined),
  );
  refreshQueue = [];
}

// --- REQUEST INTERCEPTOR ---
apiClient.interceptors.request.use(
  async (config) => {
    const token = await getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      config.headers["ngrok-skip-browser-warning"] = "true";
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// --- RESPONSE INTERCEPTOR ---
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const status = error.response?.status;

    if ((status === 403 || status === 401) && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          refreshQueue.push({ resolve, reject });
        })
          .then(() => {
            return apiClient(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      isRefreshing = true;

      try {
        const refresh_token = await getAuthRefreshToken();

        if (!refresh_token) {
          clearAuthCookies();

          return Promise.reject(error);
        }

        const refreshRes = await axios.post(`${API_BASE}/auth/refresh`, {
          refresh_token,
        });

        const newAccessToken =
          refreshRes.data?.data?.access_token ||
          refreshRes.data?.data ||
          refreshRes.data?.access_token;

        if (!newAccessToken) {
          throw new Error("Failed to refresh token - no access token received");
        }

        const meRes = await axios.get(`${API_BASE}/users/me`, {
          headers: { Authorization: `Bearer ${newAccessToken}` },
        });

        const user = meRes.data?.data;

        setAuthCookies(newAccessToken, refresh_token, user);

        const { setUser } = useAuthStore.getState();
        setUser(user);

        processQueue(null, newAccessToken);

        return apiClient(originalRequest);
      } catch (err) {
        // Refresh failed - reject all queued requests
        const { logout } = useAuthStore.getState();
        processQueue(err, null);
        logout();
        window.location.replace("/auth/sign-in");

        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

export default apiClient;
