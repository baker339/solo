import { StackNavigationProp } from "@react-navigation/stack";
import React, { useState } from "react";
import { View, Text, Button, TextInput, StyleSheet } from "react-native";
import { FIRESTORE_DB } from "../FirebaseConfig";
import { doc, updateDoc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";

type QuizScreenProps = {
  navigation: StackNavigationProp<any>;
};

const QuizScreen: React.FC<QuizScreenProps> = ({ navigation }) => {
  const [experience, setExperience] = useState("");
  const [goals, setGoals] = useState("");
  const { user } = useAuth();

  const submitQuiz = async () => {
    try {
      console.log(user);
      const userDocRef = doc(FIRESTORE_DB, "users", user.uid);
      console.log({ userDocRef });

      await updateDoc(userDocRef, {
        hasTakenQuiz: true,
        quizResponses: { experience, goals },
      });

      console.log("User quiz responses updated successfully!");
    } catch (error) {
      console.error("Error updating quiz responses: ", error);
    }
    // Save data and navigate to the next screen
    console.log({ experience, goals });
    // navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Climbing Experience:</Text>
      <TextInput
        style={styles.input}
        placeholder="E.g., Bouldering, Sport climbing"
        value={experience}
        onChangeText={setExperience}
      />
      <Text style={styles.label}>Your Goals:</Text>
      <TextInput
        style={styles.input}
        placeholder="E.g., Climb a 5.12, build endurance"
        value={goals}
        onChangeText={setGoals}
      />
      <Button title="Submit" onPress={submitQuiz} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
});

export default QuizScreen;
