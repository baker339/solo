import React, { createContext, useState, useContext } from "react";
import { ColorSchemeName, useColorScheme } from "react-native";
import { themeStyles } from "../styles/themeStyles";

// Define the shape of the theme based on themeStyles
type Theme = typeof themeStyles.light;

type ThemeContextType = {
  theme: ColorSchemeName;
  toggleTheme: () => void;
  currentTheme: Theme;
};

const ThemeContext = createContext<ThemeContextType>({
  theme: "light", // default theme
  toggleTheme: () => {},
  currentTheme: themeStyles.light, // default to light theme
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const deviceTheme = useColorScheme(); // Use system theme
  const [theme, setTheme] = useState<ColorSchemeName>(deviceTheme);

  const currentTheme: Theme =
    theme === "dark" ? themeStyles.dark : themeStyles.light;

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, currentTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
