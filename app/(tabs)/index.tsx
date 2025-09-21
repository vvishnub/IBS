import { Image } from "expo-image";
import {
  FlatList,
  ListRenderItemInfo,
  useWindowDimensions,
} from "react-native";

import { EmptyState } from "@/components/EmptyState";
import { Loader } from "@/components/loader";
import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ProductCard } from "@/components/ProductCard";
import { TextInputComponent } from "@/components/TextInputComponent";
import { constants } from "@/constants/constants";
import { Colors } from "@/constants/theme";
import { useProductViewModel } from "@/hooks/useProductViewModel";
import { Product } from "@/types/product";
import { useRouter } from "expo-router";
import { useCallback, useMemo } from "react";
import { styles } from "./homeStyles";

export default function HomeScreen() {
  const { products, loading, refetch, search, toggleFavorite } =
    useProductViewModel();
  const router = useRouter();
  const { width } = useWindowDimensions();

  const keyExtractor = useCallback((item: Product) => item.id, []);
  const handlePress = (product: Product) => {
    router.push(`/product/${product.id}`);
  };
  const memoizedData = useMemo(() => products, [products]);

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
      refreshing={loading}
      onRefresh={refetch}
      data={[]}
      renderItem={function (
        info: ListRenderItemInfo<unknown>
      ): React.ReactElement | null {
        throw new Error("Function not implemented.");
      }}
    >
      <TextInputComponent type="search" onSearch={search} />

      {loading ? (
        <Loader />
      ) : products.length === 0 ? (
        <EmptyState message={constants?.NO_PRODUCT_FOUND} />
      ) : (
        <FlatList
          data={memoizedData}
          key={width > 600 ? "2col" : "1col"}
          numColumns={width > 600 ? 2 : 1}
          renderItem={({ item }) => (
            <ProductCard
              product={item}
              onPress={() => handlePress(item)}
              onToggleFavorite={toggleFavorite}
            />
          )}
          keyExtractor={keyExtractor}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          windowSize={5}
          contentContainerStyle={{ paddingBottom: 24 }}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          removeClippedSubviews={false}
        />
      )}
    </ParallaxScrollView>
  );
}
