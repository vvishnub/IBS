import { Product } from "@/types/product";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useState } from "react";

const FAVORITES_KEY = "FAVORITE_PRODUCTS";

export const useFavoritesViewModel = () => {
  const [favorites, setFavorites] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const loadFavorites = useCallback(async () => {
    setLoading(true);
    try {
      const stored = await AsyncStorage.getItem(FAVORITES_KEY);
      const products: Product[] = stored ? JSON.parse(stored) : [];
      setFavorites(products);
    } catch (error) {
      console.warn("Failed to load favorites:", error);
      setFavorites([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadFavorites();
  }, [loadFavorites]);

  const removeFavorite = async (id: string) => {
    try {
      const stored = await AsyncStorage.getItem(FAVORITES_KEY);
      const current: Product[] = stored ? JSON.parse(stored) : [];

      const updated = current.filter((p) => p.id !== id);
      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
      setFavorites(updated);
    } catch (error) {
      console.warn("Failed to remove favorite:", error);
    }
  };

  return {
    favorites,
    loading,
    removeFavorite,
    refreshFavorites: loadFavorites,
  };
};
