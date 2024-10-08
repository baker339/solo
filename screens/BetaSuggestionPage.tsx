import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";
import {
  checkIfClimbingRelated,
  getClimbingBeta,
} from "../services/chatgptService";
import { useTheme } from "../context/ThemeContext";

const BetaSuggestionPage = () => {
  const [description, setDescription] = useState<string>("");
  const [beta, setBeta] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { currentTheme } = useTheme();

  const handleSubmit = async () => {
    if (description.trim() === "") {
      Alert.alert("Input Error", "Please describe the bouldering problem.");
      return;
    }

    setIsLoading(true);

    try {
      const isClimbingQuestion = await checkIfClimbingRelated(description);

      if (isClimbingQuestion.toLowerCase().includes("yes")) {
        const betaResponse = await getClimbingBeta(description);
        setBeta(betaResponse);
      } else {
        Alert.alert(
          "Invalid Input",
          "This question is not related to climbing or bouldering."
        );
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={currentTheme.container}>
      <Text style={currentTheme.title}>Describe the Bouldering Problem</Text>
      <TextInput
        style={currentTheme.input}
        placeholder="Type a description here..."
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <Button title="Submit" onPress={handleSubmit} disabled={isLoading} />
      {isLoading && <Text>Loading...</Text>}
      {beta && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultTitle}>Beta Suggestions:</Text>
          <Text style={styles.betaText}>{beta}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    height: 100,
  },
  resultContainer: {
    marginTop: 20,
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  betaText: {
    marginTop: 10,
    fontSize: 14,
  },
});

export default BetaSuggestionPage;
