import ScrollViewLayout from "@/components/scroll-view-layout";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { constants } from "@/constants/constants";
import { Colors } from "@/constants/theme";
import { useProductDetailsViewModel } from "@/hooks/useProductDetailsViewModel";
import { shareProduct } from "@/utils/shareProduct";
import { Fontisto, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import { useEffect } from "react";
import {
  ActivityIndicator,
  Image,
  ListRenderItemInfo,
  TouchableOpacity,
} from "react-native";
import { styles } from "./productDetailsScreenStyles";

export default function ProductDetailsScreen() {
  const navigation = useNavigation();

  const {
    isInCart,
    isFavorite,
    addToCart,
    toggleFavorite,
    buyNow,
    product,
    loading,
  } = useProductDetailsViewModel();

  useEffect(() => {
    if (product) {
      navigation.setOptions({
        title: product.name,
        headerBackTitleVisible: false,
      });
    }
  }, [navigation, product]);

  if (loading || !product) {
    if (!product) {
      return (
        <ThemedView style={styles.center}>
          {loading ? (
            <ActivityIndicator size="small" />
          ) : (
            <ThemedText type="default">{constants.NO_PRODUCT_FOUND}</ThemedText>
          )}
        </ThemedView>
      );
    }
  }

  const BottomComponent = () => {
    return (
      <ThemedView style={styles.actions}>
        <TouchableOpacity style={styles.button} onPress={addToCart}>
          <Ionicons name="cart" size={20} color={Colors.light.white} />
          <ThemedText type="default" style={styles.buttonText}>
            {isInCart ? constants?.ITEM_IN_CART : constants.ADD_TO_CART}
          </ThemedText>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={buyNow}>
          <Ionicons name="cash-outline" size={20} color={Colors.light.white} />
          <ThemedText type="default" style={styles.buttonText}>
            {constants?.BUY_NOW}
          </ThemedText>
        </TouchableOpacity>
      </ThemedView>
    );
  };

  return (
    <>
      <ScrollViewLayout
        bottomComponent={<BottomComponent />}
        data={[]}
        renderItem={function (
          info: ListRenderItemInfo<unknown>
        ): React.ReactElement | null {
          throw new Error("Function not implemented.");
        }}
      >
        <TouchableOpacity
          style={styles?.favView}
          accessible
          accessibilityLabel={`Product: ${product?.name} ${
            isFavorite ? "remove from" : "add to"
          } favourites`}
          onPress={toggleFavorite}
        >
          <Ionicons
            name={isFavorite ? "heart" : "heart-outline"}
            size={30}
            color={isFavorite ? Colors?.light?.error : Colors?.light?.primary}
            style={styles.favImage}
          />
        </TouchableOpacity>
        <Image
          source={{ uri: product?.image }}
          style={styles.image}
          resizeMode="contain"
        />
        <ThemedView style={styles.header}>
          <ThemedText type="default" style={styles.name}>
            {product?.name}
          </ThemedText>
        </ThemedView>
        <ThemedText type="default" style={styles.description}>
          {product?.description}
        </ThemedText>
        <ThemedView style={styles.header}>
          <ThemedText type="default" style={styles.price}>
            ${product?.price?.toFixed(2)}
          </ThemedText>
          <TouchableOpacity
            onPress={() => {
              shareProduct(product);
            }}
          >
            <Fontisto name="share-a" size={20} color={Colors.light.primary} />
          </TouchableOpacity>
        </ThemedView>
      </ScrollViewLayout>
    </>
  );
}
