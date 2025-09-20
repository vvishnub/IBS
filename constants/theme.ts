/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from "react-native";

export const Colors = {
  light: {
    primary: "#007AFF",
    secondary: "#5856D6",
    black: "#000000",
    transparent: "transparent",
    grey: "#888888",
    white: "#FFFFFF",
    text: "#000000", // Text color for light mode
    background: "#F2F2F7", // Light background color
    tint: "#007AFF", // Primary color (iOS Blue)
    icon: "#5856D6", // Secondary color
    tabIconDefault: "#5856D6", // Secondary color for tab icon default
    tabIconSelected: "#007AFF", // Primary color for selected tab icon
    success: "#34C759", // Success color
    error: "#FF3B30", // Error color
  },
  dark: {
    primary: "#007AFF",
    secondary: "#5856D6",
    transparent: "transparent",
    grey: "#888888",
    white: "#FFFFFF",
    text: "#FFFFFF", // Text color for dark mode
    background: "#151718", // Dark background color
    tint: "#007AFF", // Primary color (iOS Blue) for dark mode
    icon: "#5856D6", // Secondary color for dark mode
    tabIconDefault: "#9BA1A6", // Default icon color (gray-ish for dark mode)
    tabIconSelected: "#007AFF", // Primary color for selected tab icon in dark mode
    success: "#34C759", // Success color
    error: "#FF3B30", // Error color
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: "system-ui",
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: "ui-serif",
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: "ui-rounded",
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: "ui-monospace",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded:
      "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
