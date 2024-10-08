import React from "react";
import { View, Text, Switch } from "react-native";
import { useTheme } from "../../context/ThemeContext";

const SettingsPage: React.FC = () => {
  const { currentTheme, toggleTheme, theme } = useTheme();
  return (
    <View style={currentTheme.container}>
      <Text style={currentTheme.text}>Dark Mode</Text>
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={currentTheme.colors.primary}
        onValueChange={toggleTheme}
        value={theme === "dark"}
      />
    </View>
  );
};

export default SettingsPage;
