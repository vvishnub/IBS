import { useApi } from "@/hooks/useApi";
import { Product } from "@/types/product";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "expo-router";
import { useCallback, useMemo, useState } from "react";

const FAVORITES_KEY = "FAVORITE_PRODUCTS";

export const useProductViewModel = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filtered, setFiltered] = useState<Product[]>([]);
  const [favorites, setFavorites] = useState<Product[]>([]);

  const { data, loading, error, refetch } = useApi({
    url: "/c53fb45e-5085-487a-afac-0295f62fb86e",
    method: "GET",
  });

  // Load favorites from AsyncStorage
  const loadFavorites = useCallback(async () => {
    try {
      const stored = await AsyncStorage.getItem(FAVORITES_KEY);
      const favs: Product[] = stored ? JSON.parse(stored) : [];
      setFavorites(favs);
    } catch (error) {
      console.warn("Failed to load favorites:", error);
      setFavorites([]);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadFavorites();
    }, [loadFavorites])
  );

  // Update products with isFavorite flag
  const products: Product[] = useMemo(() => {
    return (data ?? []).map((product: Product) => ({
      ...product,
      isFavorite: favorites.some((fav) => fav.id === product.id),
    }));
  }, [data, favorites]);

  const search = (query: string) => {
    const lower = query.toLowerCase().trim();
    setSearchQuery(query);
    setFiltered(
      lower ? products.filter((p) => p.name.toLowerCase().includes(lower)) : []
    );
  };

  const toggleFavorite = async (product: Product) => {
    try {
      const stored = await AsyncStorage.getItem(FAVORITES_KEY);
      const current: Product[] = stored ? JSON.parse(stored) : [];

      const isFav = current.some((fav) => fav.id === product.id);
      let updated: Product[];

      if (isFav) {
        updated = current.filter((fav) => fav.id !== product.id);
      } else {
        const newFavorite = { ...product, isFavorite: true };
        updated = [...current, newFavorite];
      }

      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
      setFavorites(updated);
    } catch (error) {
      console.warn("Failed to toggle favorite:", error);
    }
  };

  const hasSearch = searchQuery.trim().length > 0;
  const noResults = hasSearch && filtered.length === 0;

  return {
    products: hasSearch ? filtered : products,
    loading,
    error,
    refetch,
    search,
    toggleFavorite,
    favorites,
    noResults,
    hasSearch,
  };
};
