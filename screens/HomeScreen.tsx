import React from "react";
import { View, Text } from "react-native";
import { useThemeStyles } from "../styles/themeStyles";

const HomeScreen: React.FC = () => {
  const styles = useThemeStyles();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Solo</Text>
      <Text style={styles.text}>
        Navigate to different sections using the tabs below.
      </Text>
    </View>
  );
};

export default HomeScreen;
