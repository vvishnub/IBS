import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import { Product } from "@/types/product";
import React from "react";
import { Image, TouchableOpacity } from "react-native";
import { styles } from "./productCardStyles";

export const ProductCard = ({
  product,
  onPress,
}: {
  product: Product;
  onPress: () => void;
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
      accessibilityLabel={`Product: ${product?.name} added to favourites`}
      onPress={() => {}}
    >
      <IconSymbol
        size={30}
        color={Colors?.light?.primary}
        name="heart"
        style={styles?.favImage}
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
        <IconSymbol
          size={20}
          color={Colors?.light?.primary}
          name="arrow.uturn.right"
          style={styles?.favImage}
        />
      </TouchableOpacity>
    </ThemedView>
  </TouchableOpacity>
);
