import React from "react";
import { View, Text } from "react-native";
import { useTheme } from "../context/ThemeContext"; // Update this import

const HomeScreen: React.FC = () => {
  const { currentTheme } = useTheme(); // Get currentTheme from context

  return (
    <View style={currentTheme.container}>
      <Text style={currentTheme.text}>Welcome to Solo</Text>
      <Text style={currentTheme.text}>
        Navigate to different sections using the tabs below.
      </Text>
    </View>
  );
};

export default HomeScreen;
