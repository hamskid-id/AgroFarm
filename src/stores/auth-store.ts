import { create } from "zustand";
import { getAuthUser, clearAuthCookies } from "@/api/cookie-auth";
import { User } from "@/types";

interface AuthState {
  user: User | null;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  loadUser: () => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true,

  setUser: (user) => set({ user }),

  loadUser: () => {
    const storedUser = getAuthUser();
    set({
      user: storedUser || null,
      isLoading: false,
    });
  },

  logout: () => {
    clearAuthCookies();
    set({ user: null });
  },
}));
