import ScrollViewLayout from "@/components/scroll-view-layout";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { constants } from "@/constants/constants";
import { Colors } from "@/constants/theme";
import { useProductDetailsViewModel } from "@/hooks/useProductDetailsViewModel";
import { Product } from "@/types/product";
import { Fontisto, Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect } from "react";
import { Image, TouchableOpacity } from "react-native";
import { styles } from "./productDetailsScreenStyles";

export default function ProductDetailsScreen() {
  const { product: productParam } = useLocalSearchParams();
  const product: Product = JSON.parse(productParam as string);
  const { addToCart, buyNow } = useProductDetailsViewModel(product);
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ title: product.name });
  }, [product.name]);

  const BottomComponent = () => {
    return (
      <ThemedView style={styles.actions}>
        <TouchableOpacity style={styles.button} onPress={addToCart}>
          <Ionicons name="cart" size={20} color={Colors.light.white} />
          <ThemedText type="default" style={styles.buttonText}>
            {constants?.ADD_TO_CART}
          </ThemedText>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={buyNow}>
          <Ionicons name="cash-outline" size={20} color={Colors.light.white} />
          <ThemedText type="default" style={styles.buttonText}>
            {constants?.BUY_NOW}
          </ThemedText>
        </TouchableOpacity>
      </ThemedView>
    );
  };

  return (
    <>
      <ScrollViewLayout bottomComponent={<BottomComponent />}>
        <Image
          source={{ uri: product.image }}
          style={styles.image}
          resizeMode="contain"
        />
        <ThemedView style={styles.header}>
          <ThemedText type="default" style={styles.name}>
            {product.name}
          </ThemedText>
        </ThemedView>
        <ThemedText type="default" style={styles.description}>
          {product.description}
        </ThemedText>
        <ThemedView style={styles.header}>
          <ThemedText type="default" style={styles.price}>
            ${product.price.toFixed(2)}
          </ThemedText>
          <TouchableOpacity>
            <Fontisto name="share-a" size={20} color={Colors.light.primary} />
          </TouchableOpacity>
        </ThemedView>
      </ScrollViewLayout>
    </>
  );
}
