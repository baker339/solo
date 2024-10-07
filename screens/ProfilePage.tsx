import React, { useEffect, useState } from "react";
import { View, Text, Button } from "react-native";
import { useThemeStyles } from "../styles/themeStyles";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../types/navigation";
import { useAuth } from "../context/AuthContext";

const ProfilePage: React.FC = () => {
  const styles = useThemeStyles();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { user, logout } = useAuth();
  const [userData, setUserData] = useState<any>(null);

  //   useEffect(() => {
  //     if (user) {
  //       const fetchUserData = async () => {
  //         const userDoc = await firestore()
  //           .collection("users")
  //           .doc(user.uid)
  //           .get();
  //         setUserData(userDoc.data());
  //       };

  //       fetchUserData();
  //     }
  //   }, [user]);

  const handleLogout = async () => {
    try {
      await logout();
      navigation.navigate("Login"); // Navigate to your Login screen
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      {user ? (
        <>
          <Text style={styles.text}>Name: {user.name ?? ""}</Text>
          <Text style={styles.text}>Email: {user.email ?? ""}</Text>
          {/* <Text style={styles.text}>Goals: {user.goals.join(", ") ?? ""}</Text> */}
          <Button title="Logout" onPress={handleLogout} />
        </>
      ) : (
        <Text style={styles.text}>Loading user data...</Text>
      )}

      <Button
        title="Go to Settings"
        onPress={() => navigation.navigate("Settings")} // Navigate to Settings screen
      />
    </View>
  );
};

export default ProfilePage;
