import { Product } from ".";

export interface FavoritesStore {
  // State
  favorites: Product[];
  isLoading: boolean;

  // Actions
  addToFavorites: (product: Product) => void;
  removeFromFavorites: (productId: number) => void;
  toggleFavorite: (product: Product) => void;
  clearFavorites: () => void;
  isInFavorites: (productId: number) => boolean;
  getFavoritesCount: () => number;
  loadFavorites: () => void;
  saveFavorites: () => void;
}

// Persistence key for localStorage
export const FAVORITES_STORAGE_KEY = "agrofarm_favorites";
