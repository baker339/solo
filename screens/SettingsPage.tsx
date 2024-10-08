import React from "react";
import { View, Text, Switch, StyleSheet } from "react-native";
import { useTheme } from "../context/ThemeContext"; // Assuming useTheme hook is already in place
import { themeTextInputStyles, commonStyles } from "../styles/themeStyles"; // Import new theme styles

const SettingsPage: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <View style={[commonStyles.container, themeStyles(theme).container]}>
      <Text style={themeStyles(theme).text}>Settings</Text>

      <View style={styles.settingItem}>
        <Text style={themeStyles(theme).text}>Dark Mode</Text>
        <Switch
          value={darkMode}
          onValueChange={(value) => {
            setDarkMode(value);
            toggleTheme(); // Toggling theme
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
});

export default SettingsPage;
