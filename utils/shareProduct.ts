import { Product } from "@/types/product";
import { Platform, Share } from "react-native";

export const shareProduct = async (product: Product | undefined) => {
  if (!product) return;

  const message = `Check out this product: ${product.name}\n\nBuy now at: ibscart://product/${product.id}`;
  const url = `ibscart://product/${product.id}`;

  try {
    if (Platform.OS === "web") {
      if (navigator.share) {
        await navigator.share({
          title: product.name,
          text: message,
          url,
        });
      } else {
        alert("Web sharing is not supported in this browser.");
      }
    } else {
      await Share.share({
        message,
        title: product.name,
      });
    }
  } catch (error) {
    console.warn("Error sharing:", error);
  }
};
