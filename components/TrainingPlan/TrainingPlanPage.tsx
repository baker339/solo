import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import AssessmentQuiz from "./AssessmentQuiz";
import TrainingPlanDisplay from "./TrainingPlanDisplay";
import { TrainingPlan } from "../../types";

const TrainingPlanPage: React.FC = () => {
  const [trainingPlan, setTrainingPlan] = useState<TrainingPlan | null>(null);

  const handleQuizSubmit = (plan: TrainingPlan) => {
    setTrainingPlan(plan);
  };

  const handleCompleteExercise = () => {
    if (trainingPlan) {
      setTrainingPlan({
        ...trainingPlan,
        progress: trainingPlan.progress + 10,
      });
    }
  };

  return (
    <View style={styles.container}>
      {!trainingPlan ? (
        <AssessmentQuiz onSubmit={handleQuizSubmit} />
      ) : (
        <TrainingPlanDisplay
          plan={trainingPlan}
          onCompleteExercise={handleCompleteExercise}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});

export default TrainingPlanPage;
