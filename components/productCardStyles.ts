import { Colors } from "@/constants/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  card: {
    padding: 10,
    borderRadius: 8,
    margin: 8,
    flex: 1,
  },
  image: {
    width: "100%",
    height: 120,
    borderRadius: 6,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: Colors.light.transparent,
    gap: 8,
  },
  name: {
    marginTop: 8,
  },
  description: {
    marginTop: 8,
    lineHeight: 14,
  },
  price: {
    color: Colors.light.secondary,
    marginVertical: 8,
  },
  favImage: {
    alignSelf: "center",
  },
  favView: {
    position: "absolute",
    zIndex: 1,
    right: 10,
    top: 10,
    backgroundColor: Colors.light.background,
    borderRadius: 20,
    padding: 5,
  },
  shareView: {
    position: "absolute",
    zIndex: 1,
    right: 10,
    top: 10,
    backgroundColor: Colors.light.background,
    borderRadius: 20,
    padding: 5,
  },
});
