import { Colors } from "@/constants/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  wrapper: { flex: 1, backgroundColor: Colors.light.white },
  container: { padding: 16, paddingBottom: 100 },
  image: { width: "100%", height: 300, borderRadius: 8 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
  },
  name: { fontSize: 20, fontWeight: "bold", color: Colors.light.text },
  price: { fontSize: 18, color: Colors.light.secondary, marginVertical: 8 },
  description: { fontSize: 16, marginTop: 10, color: Colors.light.grey },
  actions: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 16,
    backgroundColor: Colors.light.white,
    borderTopWidth: 1,
    borderColor: Colors.light.grey,
  },
  button: {
    width: "45%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.light.primary,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  buttonText: {
    color: Colors.light.white,
    fontSize: 16,
    marginLeft: 8,
  },
});
