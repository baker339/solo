import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ClimbingJournal from "../screens/ClimbingJournal/ClimbingJournal";
import ClimbingAnalytics from "../screens/ClimbingJournal/ClimbingAnalytics";
const Stack = createStackNavigator();

const ClimbingStack: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ClimbingJournal"
        component={ClimbingJournal}
        options={{ headerShown: false }} // Hide the header for Profile
      />
      <Stack.Screen
        name="ClimbingAnalytics"
        component={ClimbingAnalytics}
        options={{ title: "Settings" }} // Show header for Settings
      />
    </Stack.Navigator>
  );
};

export default ClimbingStack;
