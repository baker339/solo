import { NavigationProp, useNavigation } from "@react-navigation/native";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Alert, Button, StyleSheet, View } from "react-native";
import { FIRESTORE_DB } from "../../FirebaseConfig";
import InputField from "../../components/Common/InputField";
import ProfilePicture from "../../components/UserProfile/ProfilePicture";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import { RootStackParamList } from "../../types/navigation"; // Ensure this points to your types

const ProfilePage: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { user } = useAuth();
  const { currentTheme } = useTheme();
  const [userData, setUserData] = useState<any>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        const userDocRef = doc(FIRESTORE_DB, "users", user.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          setUserData(userDoc.data());
          setName(userDoc.data()?.name);
          setEmail(userDoc.data()?.email);
        }
      }
    };

    fetchUserData();
  }, [user]);

  const handleSave = async () => {
    if (user) {
      const userDocRef = doc(FIRESTORE_DB, "users", user.uid);
      await updateDoc(userDocRef, { name, email });
      Alert.alert("Profile updated successfully!");
    }
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: currentTheme.colors.background },
      ]}
    >
      <ProfilePicture
        uri={userData?.profilePictureUrl || "default_image_url"}
      />
      <InputField value={name} onChangeText={setName} placeholder="Name" />
      <InputField
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        keyboardType="email-address"
      />
      <Button
        title="Save"
        onPress={handleSave}
        color={currentTheme.colors.primary}
      />
      <Button
        title="Go to Settings"
        onPress={() => navigation.navigate("Settings" as never)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: "center",
  },
});

export default ProfilePage;
