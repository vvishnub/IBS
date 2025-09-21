import type { PropsWithChildren } from "react";
import { RefreshControl, StyleSheet } from "react-native";
import Animated, { useAnimatedRef } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

import { useThemeColor } from "@/hooks/use-theme-color";

type Props = PropsWithChildren<{
  bottomComponent?: React.ReactNode;
  edges?: string[];
  refreshing?: boolean;
  onRefresh?: () => void;
}>;

export default function ScrollViewLayout({
  children,
  bottomComponent,
  edges,
  refreshing = false,
  onRefresh,
}: Props) {
  const backgroundColor = useThemeColor({}, "background");
  const scrollRef = useAnimatedRef<Animated.ScrollView>();

  return (
    <SafeAreaView
      style={styles.container}
      edges={["top", "left", "right", "bottom"]}
    >
      <Animated.ScrollView
        ref={scrollRef}
        style={[styles?.scrollStyle, { backgroundColor }]}
        scrollEventThrottle={16}
        removeClippedSubviews={false}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {children}
      </Animated.ScrollView>
      {bottomComponent}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollStyle: { flex: 1, padding: 20 },
});
