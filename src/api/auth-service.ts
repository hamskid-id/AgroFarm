import apiClient from "./client";
import { AxiosResponse } from "axios";
import { LoginCredentials, LoginResponse } from "@/types/auth";
import { ApiResponse } from "@/types";

export const authService = {
  login: async (
    credentials: LoginCredentials,
  ): Promise<AxiosResponse<ApiResponse<LoginResponse>>> => {
    return apiClient.post<ApiResponse<LoginResponse>>(
      "/auth/login",
      credentials,
    );
  },

  resetPassword: async (
    newPassword: string,
    token: string,
  ): Promise<AxiosResponse<ApiResponse<null>>> => {
    const payload = {
      password: newPassword,
      token: token,
    };

    return apiClient.post("/auth/password-setup", payload);
  },
};
