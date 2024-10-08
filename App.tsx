import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { onAuthStateChanged, User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import "react-native-get-random-values";
import Icon from "react-native-vector-icons/Ionicons";
import ProgressAnalyticsPage from "./components/ProgressAnalytics/ProgressAnalyticsPage";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import { FIREBASE_AUTH, FIRESTORE_DB } from "./FirebaseConfig";
import ProfileStack from "./navigation/ProfileStack";
import TrainingPlansStack from "./navigation/TrainingPlansStack";
import ClimbingJournalPage from "./screens/ClimbingJournalPage";
import HomeScreen from "./screens/HomeScreen";
import LoginPage from "./screens/NewUsers/LoginPage";
import QuizScreen from "./screens/QuizScreen";
import RegisterPage from "./screens/NewUsers/RegisterPage";
import SplashScreen from "./screens/NewUsers/SplashScreen";

// Polyfill for setImmediate
if (typeof setImmediate === "undefined") {
  (global as any).setImmediate = (fn: () => void) => setTimeout(fn, 0);
}

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

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
  const [hasTakenQuiz, setHasTakenQuiz] = useState<boolean | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, async (user) => {
      setUser(user);

      if (user) {
        const userDoc = doc(FIRESTORE_DB, "users", user.uid);
        const docSnap = await getDoc(userDoc);

        if (docSnap.exists()) {
          const userData = docSnap.data();
          setHasTakenQuiz(userData.hasTakenQuiz); // Set the state based on user data
        } else {
          console.log("No such document!");
        }
      } else {
        setHasTakenQuiz(null); // Reset if not logged in
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthProvider>
      <NavigationContainer theme={theme === "dark" ? DarkTheme : DefaultTheme}>
        {user && hasTakenQuiz ? (
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
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Training Plans">
              {() => <TrainingPlansStack userId={user.uid} />}
            </Tab.Screen>
            <Tab.Screen name="Progress" component={ProgressAnalyticsPage} />
            <Tab.Screen name="Journal" component={ClimbingJournalPage} />
            <Tab.Screen name="Profile" component={ProfileStack} />
          </Tab.Navigator>
        ) : (
          <Stack.Navigator>
            <Stack.Screen
              name="Splash"
              component={SplashScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="Login" component={LoginPage} />
            <Stack.Screen name="Register" component={RegisterPage} />
            <Stack.Screen name="Quiz" component={QuizScreen} />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;
