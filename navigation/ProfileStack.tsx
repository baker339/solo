import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ProfilePage from "../screens/ProfilePage";
import SettingsPage from "../screens/SettingsPage";

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
    </Stack.Navigator>
  );
};

export default ProfileStack;
