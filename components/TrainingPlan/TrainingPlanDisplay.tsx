import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { TrainingPlan } from "../../types";

interface TrainingPlanDisplayProps {
  plan: TrainingPlan;
  onCompleteExercise: () => void;
}

const TrainingPlanDisplay: React.FC<TrainingPlanDisplayProps> = ({
  plan,
  onCompleteExercise,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{plan.name}</Text>
      <Text>Focus: {plan.focus}</Text>
      <Text>Duration: {plan.duration} weeks</Text>
      <Text>Progress: {plan.progress}%</Text>

      <Text style={styles.subheading}>Exercises:</Text>
      {plan.exercises.map((exercise, index) => (
        <Text key={index}>{exercise}</Text>
      ))}

      <Button title="Mark Exercise as Complete" onPress={onCompleteExercise} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subheading: {
    fontSize: 16,
    marginTop: 10,
  },
});

export default TrainingPlanDisplay;
