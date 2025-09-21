import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Colors } from "@/constants/theme";
import { Product } from "@/types/product";
import { Fontisto, Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, TouchableOpacity } from "react-native";
import { styles } from "./productCardStyles";

export const ProductCard = ({
  product,
  onPress,
  onToggleFavorite,
}: {
  product: Product;
  onPress?: () => void;
  onToggleFavorite: (product: Product) => void;
}) => (
  <TouchableOpacity
    style={styles?.card}
    accessible
    accessibilityLabel={`Product: ${product?.name}`}
    onPress={onPress}
  >
    <TouchableOpacity
      style={styles?.favView}
      accessible
      accessibilityLabel={`Product: ${product.name} ${
        product.isFavorite ? "remove from" : "add to"
      } favourites`}
      onPress={() => onToggleFavorite(product)}
    >
      <Ionicons
        name={product.isFavorite ? "heart" : "heart-outline"}
        size={30}
        color={product.isFavorite ? Colors.light.error : Colors.light.primary}
        style={styles.favImage}
      />
    </TouchableOpacity>

    <Image source={{ uri: product?.image }} style={styles?.image} />
    <ThemedText type="default" style={styles?.name}>
      {product?.name}
    </ThemedText>
    <ThemedText type="description" style={styles?.description}>
      {product?.description}
    </ThemedText>
    <ThemedView style={styles?.titleContainer}>
      <ThemedText type="default" style={styles?.price}>
        ${product?.price?.toFixed(2)}
      </ThemedText>

      <TouchableOpacity
        style={styles?.favView}
        accessible
        accessibilityLabel={`Product: ${product?.name} shared`}
        onPress={() => {}}
      >
        <Fontisto name="share-a" size={14} color={Colors.light.primary} />
      </TouchableOpacity>
    </ThemedView>
  </TouchableOpacity>
);
