import { Image } from "expo-image";
import { FlatList, useWindowDimensions } from "react-native";

import { EmptyState } from "@/components/EmptyState";
import { Loader } from "@/components/loader";
import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ProductCard } from "@/components/ProductCard";
import { TextInputComponent } from "@/components/TextInputComponent";
import { Colors } from "@/constants/theme";
import { useProductViewModel } from "@/hooks/useProductViewModel";
import { useRouter } from "expo-router";
import { styles } from "./homeStyles";

export default function HomeScreen() {
  const { products, loading, error, refetch, search, toggleFavorite } = useProductViewModel();
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
      <TextInputComponent type="search" onSearch={search} />

      {loading ? (
        <Loader />
      ) : products.length === 0 ? (
        <EmptyState />
      ) : (
        <FlatList
          data={products}
          key={width > 600 ? "2col" : "1col"}
          numColumns={width > 600 ? 2 : 1}
          renderItem={({ item }) => (
            <ProductCard
              product={item}
              onPress={() => router.push(`/details/${item.id}`)}
              onToggleFavorite={toggleFavorite}
            />
          )}
        />
      )}
    </ParallaxScrollView>
  );
}
