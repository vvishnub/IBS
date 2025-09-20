import { Colors } from "@/constants/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  headerImage: {
    color: Colors.light.primary,
    alignSelf: "center",
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
});
