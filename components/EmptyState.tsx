import React from "react";
import { Text, View } from "react-native";
import { styles } from "./EmptyStateStyles";

type EmptyStateProps = {
  message?: string;
};

export const EmptyState = ({ message = "" }: EmptyStateProps) => (
  <View style={styles.container}>
    <Text style={styles.text}>{message}</Text>
  </View>
);
