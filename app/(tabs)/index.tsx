import { Image } from "expo-image";
import { FlatList, useWindowDimensions } from "react-native";

import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ProductCard } from "@/components/ProductCard";
import { products as list } from "@/constants/dummyData";
import { Colors } from "@/constants/theme";
import { Product } from "@/types/product";
import { useRouter } from "expo-router";
import { useState } from "react";
import { styles } from "./homeStyles";

export default function HomeScreen() {
  const [products, setProducts] = useState<Product[]>(list);
  const router = useRouter();
  const { width } = useWindowDimensions();
  return (
    <ParallaxScrollView
      headerBackgroundColor={{
        light: Colors.light.background,
        dark: Colors.dark.background,
      }}
      headerImage={
        <Image
          source={require("@/assets/images/icon.png")}
          style={styles.logo}
        />
      }
      hearderText="Welcome to IBS Cart"
    >
      <FlatList
        data={products}
        key={width > 600 ? "2col" : "1col"}
        numColumns={width > 600 ? 2 : 1}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            onPress={() => router.push(`/details/${item.id}`)}
          />
        )}
      />
    </ParallaxScrollView>
  );
}
