import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ProfilePage from "../screens/Profile/ProfilePage";
import SettingsPage from "../screens/Profile/SettingsPage";
import QuizScreen from "../screens/QuizScreen";

const Stack = createStackNavigator();

const ProfileStack: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Profile"
        component={ProfilePage}
        options={{ headerShown: false }} // Hide the header for Profile
      />
      <Stack.Screen
        name="Settings"
        component={SettingsPage}
        options={{ title: "Settings" }} // Show header for Settings
      />
      <Stack.Screen name="Quiz" component={QuizScreen} />
    </Stack.Navigator>
  );
};

export default ProfileStack;
