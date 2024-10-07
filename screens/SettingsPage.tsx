import React from "react";
import { View, Text, Switch } from "react-native";
import { useThemeStyles } from "../styles/themeStyles";
import { useTheme } from "../context/ThemeContext";

const SettingsPage: React.FC = () => {
  const styles = useThemeStyles();
  const { theme, toggleTheme } = useTheme();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      <View
        style={{ flexDirection: "row", alignItems: "center", marginTop: 20 }}
      >
        <Text style={styles.text}>Dark Mode</Text>
        <Switch value={theme === "dark"} onValueChange={toggleTheme} />
      </View>
    </View>
  );
};

export default SettingsPage;
