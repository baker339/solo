import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { onAuthStateChanged, User } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import "react-native-get-random-values";
import Icon from "react-native-vector-icons/Ionicons";
import ProgressAnalyticsPage from "./components/ProgressAnalytics/ProgressAnalyticsPage";
import TrainingPlanPage from "./components/TrainingPlan/TrainingPlanPage";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import { FIREBASE_AUTH } from "./FirebaseConfig";
import ProfileStack from "./navigation/ProfileStack";
import ClimbingJournalPage from "./screens/ClimbingJournalPage";
import HomeScreen from "./screens/HomeScreen";

// Polyfill for setImmediate
if (typeof setImmediate === "undefined") {
  (global as any).setImmediate = (fn: () => void) => setTimeout(fn, 0);
}

const Tab = createBottomTabNavigator();

const iconNames: { [key: string]: string } = {
  Home: "home-outline",
  "Training Plans": "barbell-outline",
  Progress: "analytics-outline",
  Journal: "book-outline",
  Profile: "person-outline",
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <MainApp />
      </SafeAreaView>
    </ThemeProvider>
  );
};

const MainApp: React.FC = () => {
  const { theme } = useTheme();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      console.log({ user });
      setUser(user);
    });
  }, []);

  return (
    <AuthProvider>
      <NavigationContainer theme={theme === "dark" ? DarkTheme : DefaultTheme}>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              const iconName = iconNames[route.name] || "help-outline";
              return <Icon name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: theme === "dark" ? "#ffffff" : "#2d6a4f",
            tabBarInactiveTintColor: theme === "dark" ? "#999999" : "#ccc",
          })}
        >
          {/* <Tab.Screen name="Login" component={LoginPage} />
          <Tab.Screen name="Register" component={RegisterPage} /> */}
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Training Plans" component={TrainingPlanPage} />
          <Tab.Screen name="Progress" component={ProgressAnalyticsPage} />
          <Tab.Screen name="Journal" component={ClimbingJournalPage} />
          <Tab.Screen name="Profile" component={ProfileStack} />
        </Tab.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;
