import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { View } from "react-native";

export default function DetailsScreen() {
  const { id } = useLocalSearchParams();
  const [product, setProduct] = useState<any>(null);

  return <View style={{ padding: 16 }}></View>;
}
