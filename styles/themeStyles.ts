import { DefaultTheme, DarkTheme } from "@react-navigation/native";
import { StyleSheet } from "react-native";

const lightThemeColors = {
  primary: "#006d77", // Teal for outdoorsy feel
  background: "#ffffff",
  card: "#f1faee",
  text: "#1d3557", // Dark blue for legibility
  border: "#c4c4c4",
  notification: "#ffb703", // Bright color for notifications
};

const darkThemeColors = {
  primary: "#83c5be", // Lighter teal for dark mode contrast
  background: "#1d3557", // Dark blue background
  card: "#2b2d42",
  text: "#edf2f4", // Off-white for text contrast
  border: "#4a4e69",
  notification: "#ffb703",
};

export const themeStyles = {
  light: {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      ...lightThemeColors,
    },
  },
  dark: {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      ...darkThemeColors,
    },
  },
};

export const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  textInput: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#c4c4c4",
    borderRadius: 5,
    backgroundColor: "#ffffff",
  },
  textInputDark: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#4a4e69",
    borderRadius: 5,
    backgroundColor: "#2b2d42",
  },
  button: {
    backgroundColor: "#ffb703",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontWeight: "bold",
  },
});

export const themeTextInputStyles = (theme: "light" | "dark") => ({
  textInput:
    theme === "light" ? commonStyles.textInput : commonStyles.textInputDark,
});
