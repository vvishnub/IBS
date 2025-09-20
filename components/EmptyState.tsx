import { constants } from "@/constants/constants";
import React from "react";
import { Text, View } from "react-native";
import { styles } from "./EmptyStateStyles";

export const EmptyState = () => (
  <View style={styles.container}>
    <Text style={styles.text}>{constants?.NO_PRODUCT_FOUND}</Text>
  </View>
);
