import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  logo: {
    height: "50%",
    width: "30%",
    bottom: 50,
    left: 0,
    resizeMode: "contain",
    position: "absolute",
  },
});
