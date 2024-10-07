import { StyleSheet } from "react-native";
import { useColorScheme } from "react-native";

export const useThemeStyles = () => {
  const scheme = useColorScheme();

  return StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: scheme === "dark" ? "#1a1a1a" : "#f0f4f8",
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      color: scheme === "dark" ? "#ffffff" : "#333",
      marginBottom: 10,
    },
    text: {
      fontSize: 16,
      color: scheme === "dark" ? "#cccccc" : "#666",
    },
  });
};
