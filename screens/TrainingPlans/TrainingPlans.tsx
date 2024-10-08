// TrainingPlans.tsx
import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { FIRESTORE_DB } from "../../FirebaseConfig";
import { generateTrainingPlan } from "../../services/chatgptService";

interface TrainingPlansProps {
  userId: string;
}

const TrainingPlans: React.FC<TrainingPlansProps> = ({ userId }) => {
  const [trainingPlan, setTrainingPlan] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTrainingPlan = async () => {
      const docRef = doc(FIRESTORE_DB, "trainingPlans", userId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setTrainingPlan(docSnap.data()?.plan);
      } else {
        setTrainingPlan(
          "No training plan available. Please complete the assessment quiz."
        );
      }
      setLoading(false);
    };
    fetchTrainingPlan();
  }, [userId]);

  const handleRegeneratePlan = async () => {
    if (!userId) return; // Make sure userId is available

    // Fetch the user's assessment responses from Firestore
    const docRef = doc(FIRESTORE_DB, "assessments", userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const userResponses = docSnap.data(); // Get the assessment data

      // Call the ChatGPT API to generate the training plan
      const generatedPlan = await generateTrainingPlan(userResponses);

      // Update the Firestore with the new training plan
      await setDoc(doc(FIRESTORE_DB, "trainingPlans", userId), {
        plan: generatedPlan,
      });

      // Update the state to show the new plan
      setTrainingPlan(generatedPlan);
    } else {
      alert("No assessment found. Please complete the quiz first.");
    }
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Training Plan</Text>
      <Text style={styles.plan}>{trainingPlan}</Text>
      <Button title="Regenerate Training Plan" onPress={handleRegeneratePlan} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  plan: {
    marginVertical: 16,
    fontSize: 16,
  },
});

export default TrainingPlans;
