import React, { useEffect, useState } from "react";
import { View, Text, Button, TextInput, Image } from "react-native";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import * as ImagePicker from "expo-image-picker";
import { useAuth } from "../../context/AuthContext";
import { FIRESTORE_DB } from "../../FirebaseConfig";
import { useTheme } from "../../context/ThemeContext";

const ProfilePage = () => {
  const { user } = useAuth(); // Assuming you have a user context
  const [name, setName] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const storage = getStorage();
  const { currentTheme } = useTheme();

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        const userDoc = doc(FIRESTORE_DB, "users", user.uid);
        const userData = await getDoc(userDoc);
        if (userData.exists()) {
          setName(userData.data().name);
          setProfilePicture(userData.data().profilePicture || "");
        }
      }
    };

    fetchUserData();
  }, [user]);

  const handleImagePicker = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const response = await fetch(result.assets[0].uri);
      const blob = await response.blob();
      const storageRef = ref(storage, `profilePictures/${user.uid}`);

      // Upload the image to Firebase Storage
      await uploadBytes(storageRef, blob);

      // Get the download URL
      const downloadURL = await getDownloadURL(storageRef);
      setProfilePicture(downloadURL);

      // Update Firestore with new profile picture URL
      const userDoc = doc(FIRESTORE_DB, "users", user.uid);
      await updateDoc(userDoc, { profilePicture: downloadURL });
    }
  };

  const handleSave = async () => {
    if (user) {
      const userDoc = doc(FIRESTORE_DB, "users", user.uid);
      await updateDoc(userDoc, { name });
    }
  };

  return (
    <View style={currentTheme.container}>
      <Image
        source={{ uri: profilePicture }}
        style={currentTheme.profilePicture}
      />
      <Button title="Change Profile Picture" onPress={handleImagePicker} />
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Enter your name"
        style={currentTheme.input}
      />
      <Button title="Save" onPress={handleSave} />
    </View>
  );
};

export default ProfilePage;
