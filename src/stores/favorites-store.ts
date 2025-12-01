import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { FavoritesStore, FAVORITES_STORAGE_KEY } from "@/types/favorites";
import { Product } from "@/types";

// Create the store with persistence
export const useFavoritesStore = create<FavoritesStore>()(
  persist(
    (set, get) => ({
      // Initial state
      favorites: [],
      isLoading: false,

      // Add a product to favorites
      addToFavorites: (product: Product) => {
        set((state) => {
          // Check if product is already in favorites
          const isAlreadyFavorite = state.favorites.some(
            (item) => item.id === product.id
          );

          if (isAlreadyFavorite) {
            console.log("Product is already in favorites:", product.name);
            return state;
          }

          console.log("Adding to favorites:", product.name);
          return {
            favorites: [...state.favorites, product],
          };
        });
      },

      // Remove a product from favorites
      removeFromFavorites: (productId: number) => {
        set((state) => ({
          favorites: state.favorites.filter((item) => item.id !== productId),
        }));
        console.log("Removed from favorites:", productId);
      },

      // Toggle favorite status
      toggleFavorite: (product: Product) => {
        const { favorites, isInFavorites } = get();

        if (isInFavorites(product.id)) {
          get().removeFromFavorites(product.id);
        } else {
          get().addToFavorites(product);
        }
      },

      // Clear all favorites
      clearFavorites: () => {
        set({ favorites: [] });
        console.log("Favorites cleared");
      },

      // Check if product is in favorites
      isInFavorites: (productId: number) => {
        const { favorites } = get();
        return favorites.some((item) => item.id === productId);
      },

      // Get favorites count
      getFavoritesCount: () => {
        const { favorites } = get();
        return favorites.length;
      },

      // Load favorites from localStorage (for manual control)
      loadFavorites: () => {
        set({ isLoading: true });
        try {
          const storedFavorites = localStorage.getItem(FAVORITES_STORAGE_KEY);
          if (storedFavorites) {
            const parsed = JSON.parse(storedFavorites);
            set({ favorites: parsed.state.favorites, isLoading: false });
          }
        } catch (error) {
          console.error("Error loading favorites:", error);
          set({ isLoading: false });
        }
      },

      // Save favorites to localStorage (for manual control)
      saveFavorites: () => {
        const { favorites } = get();
        try {
          localStorage.setItem(
            FAVORITES_STORAGE_KEY,
            JSON.stringify({ state: { favorites } })
          );
        } catch (error) {
          console.error("Error saving favorites:", error);
        }
      },
    }),
    {
      name: FAVORITES_STORAGE_KEY, // unique name for localStorage key
      storage: createJSONStorage(() => localStorage), // use localStorage
      partialize: (state) => ({ favorites: state.favorites }), // only persist favorites
      onRehydrateStorage: () => (state) => {
        console.log(
          "Favorites store rehydrated:",
          state?.favorites?.length || 0,
          "items"
        );
      },
    }
  )
);

// Selector hooks for optimized re-renders
export const useFavorites = () => useFavoritesStore((state) => state.favorites);
export const useFavoritesCount = () =>
  useFavoritesStore((state) => state.getFavoritesCount());
export const useIsInFavorites = (productId: number) =>
  useFavoritesStore((state) => state.isInFavorites(productId));
export const useIsLoading = () => useFavoritesStore((state) => state.isLoading);
export const useFavoritesActions = () =>
  useFavoritesStore((state) => ({
    addToFavorites: state.addToFavorites,
    removeFromFavorites: state.removeFromFavorites,
    toggleFavorite: state.toggleFavorite,
    clearFavorites: state.clearFavorites,
  }));
