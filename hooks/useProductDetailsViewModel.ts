import { useFavorites } from "@/context/FavoritesContext";
import { Product } from "@/types/product";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { Alert } from "react-native";
import { useApi } from "./useApi";

const CART_KEY = "CART_PRODUCTS";

export const useProductDetailsViewModel = () => {
  const { id } = useLocalSearchParams();
  const navigation = useNavigation();

  const [isInCart, setIsInCart] = useState(false);
  const { favorites, addFavorite, removeFavorite, isFavorite } = useFavorites();
  const [product, setProduct] = useState<Product | undefined>(undefined);

  const { data, loading } = useApi({
    url: "/c53fb45e-5085-487a-afac-0295f62fb86e",
    method: "GET",
  });

  const matchedProduct: Product | undefined = useMemo(() => {
    if (!id || !Array.isArray(data)) return undefined;
    return data.find((p) => String(p.id) === String(id));
  }, [data, id]);

  useEffect(() => {
    if (matchedProduct) {
      setProduct(matchedProduct);
    }
  }, [matchedProduct]);

  useEffect(() => {
    if (product) {
      navigation.setOptions({
        title: product.name,
        headerBackTitleVisible: false,
      });
    }
  }, [navigation, product]);

  useEffect(() => {
    const checkCart = async () => {
      if (!product) return;
      const stored = await AsyncStorage.getItem(CART_KEY);
      const cart: Product[] = stored ? JSON.parse(stored) : [];
      setIsInCart(cart.some((item) => item.id === product.id));
    };
    checkCart();
  }, [product?.id]);

  const addToCart = async () => {
    if (!product) return;
    const stored = await AsyncStorage.getItem(CART_KEY);
    const cart: Product[] = stored ? JSON.parse(stored) : [];

    if (cart.some((item) => item.id === product.id)) {
      Alert.alert("Already in Cart", "This product is already in your cart.");
      return;
    }

    const updated = [...cart, product];
    await AsyncStorage.setItem(CART_KEY, JSON.stringify(updated));
    setIsInCart(true);
    Alert.alert(
      "Added to Cart",
      `${product.name} has been added to your cart.`
    );
  };

  const toggleFavorite = () => {
    if (!product) return;
    isFavorite(product.id) ? removeFavorite(product.id) : addFavorite(product);
  };

  const buyNow = () => {
    Alert.alert("Purchase Initiated", `Buying ${product?.name}...`);
  };

  return {
    product,
    isInCart,
    isFavorite: product ? isFavorite(product.id) : false,
    toggleFavorite,
    addToCart,
    buyNow,
    loading,
  };
};
