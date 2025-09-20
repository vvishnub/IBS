import { Product } from "@/types/product";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Alert } from "react-native";

const CART_KEY = "CART_PRODUCTS";

export const useProductDetailsViewModel = (product: Product) => {
  const [isInCart, setIsInCart] = useState(false);

  useEffect(() => {
    const checkCart = async () => {
      const stored = await AsyncStorage.getItem(CART_KEY);
      const cart: Product[] = stored ? JSON.parse(stored) : [];
      setIsInCart(cart.some((item) => item.id === product.id));
    };
    checkCart();
  }, [product.id]);

  const addToCart = async () => {
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

  const buyNow = () => {
    Alert.alert("Purchase Initiated", `Buying ${product.name}...`);
    // You can navigate to a checkout screen or trigger payment flow here
  };

  return { isInCart, addToCart, buyNow };
};
