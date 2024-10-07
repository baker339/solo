import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { QuizResponse, TrainingPlan } from "../../types";

const AssessmentQuiz: React.FC<{ onSubmit: (plan: TrainingPlan) => void }> = ({
  onSubmit,
}) => {
  const [responses, setResponses] = useState<QuizResponse[]>([
    { question: "What is your top bouldering grade?", answer: "" },
    { question: "What is your top sport climbing grade?", answer: "" },
    {
      question: "What’s your main focus (strength, technique, endurance)?",
      answer: "",
    },
  ]);

  const handleInputChange = (index: number, value: string) => {
    const updatedResponses = [...responses];
    updatedResponses[index].answer = value;
    setResponses(updatedResponses);
  };

  const submitQuiz = () => {
    const plan: TrainingPlan = {
      id: "1",
      name: "Custom Training Plan",
      focus: responses[2].answer as "strength" | "technique" | "endurance",
      exercises: ["Pull-ups", "Fingerboard", "Climbing drills"],
      duration: 6,
      progress: 0,
    };
    onSubmit(plan);
  };

  return (
    <View style={styles.container}>
      {responses.map((response, index) => (
        <View key={index} style={styles.questionContainer}>
          <Text>{response.question}</Text>
          <TextInput
            style={styles.input}
            placeholder="Your answer"
            value={response.answer}
            onChangeText={(text) => handleInputChange(index, text)}
          />
        </View>
      ))}
      <Button title="Submit" onPress={submitQuiz} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  questionContainer: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    borderRadius: 5,
  },
});

export default AssessmentQuiz;
