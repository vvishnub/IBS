import { useThemeColor } from "@/hooks/use-theme-color";
import type { PropsWithChildren } from "react";
import { ListRenderItem, RefreshControl, StyleSheet } from "react-native";
import Animated, { useAnimatedRef } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

type Props<T> = PropsWithChildren<{
  data: T[];
  renderItem: ListRenderItem<T>;
  bottomComponent?: React.ReactNode;
  edges?: string[];
  refreshing?: boolean;
  onRefresh?: () => void;
}>;

export default function FlatListLayout<T>({
  data,
  renderItem,
  bottomComponent,
  children,
  edges,
  refreshing = false,
  onRefresh,
}: Props<T>) {
  const backgroundColor = useThemeColor({}, "background");
  const listRef = useAnimatedRef<Animated.FlatList<T>>();

  return (
    <SafeAreaView
      style={styles.container}
      edges={["top", "left", "right", "bottom"]}
    >
      <Animated.FlatList
        ref={listRef}
        data={data}
        renderItem={renderItem}
        keyExtractor={(_, idx) => idx.toString()}
        ListHeaderComponent={children ? () => <>{children}</> : undefined}
        contentContainerStyle={styles.scrollStyle}
        style={{ backgroundColor }}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews={false}
        scrollEventThrottle={16}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
      {bottomComponent}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollStyle: {
    padding: 20,
  },
});
