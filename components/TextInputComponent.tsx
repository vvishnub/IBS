import { TextInput, type TextProps } from "react-native";

import { constants } from "@/constants/constants";
import { Colors } from "@/constants/theme";
import { useThemeColor } from "@/hooks/use-theme-color";
import { styles } from "./TextInputComponentStyles";

export type InputTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  onSearch: (text: string) => void;
  type?: "default" | "search";
  style?: object;
};

export function TextInputComponent({
  style,
  lightColor,
  darkColor,
  type = "default",
  onSearch,
  ...rest
}: InputTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  return (
    <TextInput
      style={[
        { color: color },
        style,
        type === "default" ? styles.default : undefined,
        type === "search" ? styles.search : undefined,
      ]}
      placeholder={constants?.SEARCH_PRODUCTS}
      onChangeText={onSearch}
      accessibilityLabel="Search products"
      placeholderTextColor={Colors.light.grey}
    />
  );
}
