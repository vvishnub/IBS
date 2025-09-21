import { Product } from "@/types/product";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react";

const FAVORITES_KEY = "FAVORITE_PRODUCTS";

type FavoritesContextType = {
  favorites: Product[];
  addFavorite: (product: Product) => void;
  removeFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  refreshFavorites: () => void;
};

const FavoritesContext = createContext<FavoritesContextType>({
  favorites: [],
  addFavorite: () => {},
  removeFavorite: () => {},
  isFavorite: () => false,
  refreshFavorites: () => {},
});

export const FavoritesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [favorites, setFavorites] = useState<Product[]>([]);

  const loadFavorites = useCallback(async () => {
    try {
      const stored = await AsyncStorage.getItem(FAVORITES_KEY);
      const products: Product[] = stored ? JSON.parse(stored) : [];
      setFavorites(products);
    } catch (error) {
      console.warn("Failed to load favorites:", error);
      setFavorites([]);
    }
  }, []);

  useEffect(() => {
    loadFavorites();
  }, [loadFavorites]);

  const addFavorite = async (product: Product) => {
    try {
      const stored = await AsyncStorage.getItem(FAVORITES_KEY);
      const current: Product[] = stored ? JSON.parse(stored) : [];

      const exists = current.some((p) => p.id === product.id);
      if (!exists) {
        const updatedProduct = { ...product, isFavorite: true };
        const updated = [...current, updatedProduct];
        await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
        setFavorites(updated);
      }
    } catch (error) {
      console.warn("Failed to add favorite:", error);
    }
  };

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

  const isFavorite = (id: string) => favorites.some((p) => p.id === id);

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite,
        refreshFavorites: loadFavorites,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);
