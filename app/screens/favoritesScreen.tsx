import { FlatList, useWindowDimensions } from "react-native";

import { EmptyState } from "@/components/EmptyState";
import { Loader } from "@/components/loader";
import { ProductCard } from "@/components/ProductCard";
import ScrollViewLayout from "@/components/scroll-view-layout";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { constants } from "@/constants/constants";
import { useFavoritesViewModel } from "@/hooks/useFavoritesViewModel";
import { Product } from "@/types/product";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useMemo } from "react";

export default function FavoritesScreen() {
  const { favorites, loading, removeFavorite, refreshFavorites } =
    useFavoritesViewModel();

  const router = useRouter();
  const { width } = useWindowDimensions();

  // Refresh favorites when tab is focused
  useFocusEffect(
    useCallback(() => {
      refreshFavorites();
    }, [refreshFavorites])
  );

  const handlePress = (product: Product) => {
    router.push({
      pathname: "/screens/ProductDetailsScreen",
      params: { product: JSON.stringify(product) },
    });
  };

  const handleToggleFavorite = useCallback(
    (product: Product) => {
      removeFavorite(product.id);
    },
    [removeFavorite]
  );

  const keyExtractor = useCallback((item: Product) => item.id, []);

  const memoizedData = useMemo(() => favorites, [favorites]);
  const numColumns = width > 600 ? 2 : 1;

  return (
    <ScrollViewLayout refreshing={loading} onRefresh={refreshFavorites}>
      <ThemedView>
        <ThemedText type="subtitle">{constants?.FAVOURITES}</ThemedText>
      </ThemedView>
      {loading && favorites.length === 0 ? (
        <Loader />
      ) : favorites.length === 0 ? (
        <EmptyState message={constants?.NO_FAVOURITES_YET} />
      ) : (
        <FlatList
          data={memoizedData}
          key={numColumns === 2 ? "2col" : "1col"}
          numColumns={numColumns}
          renderItem={({ item }) => (
            <ProductCard
              product={item}
              onPress={() => handlePress(item)}
              onToggleFavorite={handleToggleFavorite}
            />
          )}
          keyExtractor={keyExtractor}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          windowSize={5}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          removeClippedSubviews={false}
        />
      )}
    </ScrollViewLayout>
  );
}
