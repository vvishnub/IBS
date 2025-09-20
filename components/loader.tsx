import { Colors } from "@/constants/theme";
import React from "react";
import { ActivityIndicator, View } from "react-native";
import { styles } from "./loaderStyles";

export const Loader = () => (
  <View style={styles.container}>
    <ActivityIndicator size="large" color={Colors.light.primary} />
  </View>
);
