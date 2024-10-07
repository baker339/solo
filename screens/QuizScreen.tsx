import { StackNavigationProp } from "@react-navigation/stack";
import React, { useState } from "react";
import { View, Text, Button, TextInput, StyleSheet } from "react-native";

type QuizScreenProps = {
  navigation: StackNavigationProp<any>;
};

const QuizScreen: React.FC<QuizScreenProps> = ({ navigation }) => {
  const [experience, setExperience] = useState("");
  const [goals, setGoals] = useState("");

  const submitQuiz = () => {
    // Save data and navigate to the next screen
    console.log({ experience, goals });
    navigation.navigate("Home");
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
