// components/UserProfile/UserProfile.tsx

import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { UserProfile } from "../../types";

const UserProfileComponent: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile>({
    username: "",
    climbingExperience: [],
    goals: [],
    physicalMetrics: {
      strength: 0,
      endurance: 0,
    },
  });

  const handleInputChange = (name: string, value: string | number) => {
    setProfile({ ...profile, [name]: value });
  };

  const saveProfile = () => {
    console.log("Profile saved:", profile);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Username:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter username"
        value={profile.username}
        onChangeText={(text) => handleInputChange("username", text)}
      />

      <Text style={styles.label}>Climbing Experience:</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g., bouldering, sport climbing"
        value={profile.climbingExperience.join(", ")}
        onChangeText={(text) =>
          handleInputChange("climbingExperience", text.split(", "))
        }
      />

      <Text style={styles.label}>Strength:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Enter strength level"
        value={profile.physicalMetrics.strength.toString()}
        onChangeText={(text) => handleInputChange("strength", parseInt(text))}
      />

      <Text style={styles.label}>Endurance:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Enter endurance level"
        value={profile.physicalMetrics.endurance.toString()}
        onChangeText={(text) => handleInputChange("endurance", parseInt(text))}
      />

      <Button title="Save Profile" onPress={saveProfile} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginVertical: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    borderRadius: 5,
  },
});

export default UserProfileComponent;
