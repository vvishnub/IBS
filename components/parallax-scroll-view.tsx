import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useThemeColor } from "@/hooks/use-theme-color";
import type { PropsWithChildren, ReactElement } from "react";
import { ListRenderItem, RefreshControl, StyleSheet, useWindowDimensions } from "react-native";
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollOffset,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

const HEADER_HEIGHT = 120;

type Props<T> = PropsWithChildren<{
  data: T[];
  renderItem: ListRenderItem<T>;
  headerImage: ReactElement;
  headerBackgroundColor: { dark: string; light: string };
  hearderText?: string;
  refreshing?: boolean;
  onRefresh?: () => void;
}>;

export default function ParallaxFlatListView<T>({
  data,
  renderItem,
  headerImage,
  headerBackgroundColor,
  hearderText,
  refreshing = false,
  onRefresh,
  children
}: Props<T>) {
  const backgroundColor = useThemeColor({}, "background");
  const colorScheme = useColorScheme() ?? "light";
  const listRef = useAnimatedRef<Animated.FlatList<T>>();
  const scrollOffset = useScrollOffset(listRef);
  const { width } = useWindowDimensions();

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
            [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75]
          ),
        },
        {
          scale: interpolate(
            scrollOffset.value,
            [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
            [2, 1, 1]
          ),
        },
      ],
    };
  });

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <Animated.FlatList
        ref={listRef}
        data={data}
        renderItem={renderItem}
        keyExtractor={(_, idx) => idx.toString()}
        ListHeaderComponent={
          <Animated.View
            style={[
              styles.header,
              { backgroundColor: headerBackgroundColor[colorScheme] },
              headerAnimatedStyle,
            ]}
          >
            {headerImage}
            <ThemedText
              type="title"
              style={[styles.headerText, { left: width > 600 ? "8%" : "10%" }]}
            >
              {hearderText}
            </ThemedText>
          </Animated.View>
        }
        ListFooterComponent={<ThemedView style={styles.content}>{children}</ThemedView>}
        contentContainerStyle={styles.content}
        style={{ backgroundColor, flex: 1 }}
        scrollEventThrottle={16}
        removeClippedSubviews={false}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: HEADER_HEIGHT,
    overflow: "hidden",
  },
  content: {
    padding: 12,
    gap: 16,
    overflow: "hidden",
  },
  headerText: {
    position: "absolute",
    bottom: 16,
    fontSize: 24,
  },
});
