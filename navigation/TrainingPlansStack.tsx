// TrainingPlansStack.tsx
import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { doc, getDoc } from "firebase/firestore";
import { FIRESTORE_DB } from "../FirebaseConfig";
import AssessmentQuiz from "../screens/TrainingPlans/AssessmentQuiz";
import ProgressTracking from "../screens/TrainingPlans/ProgressTracking";
import TrainingPlans from "../screens/TrainingPlans/TrainingPlans";

const Stack = createStackNavigator();

interface TrainingPlansStackProps {
  userId: string;
}

const TrainingPlansStack: React.FC<TrainingPlansStackProps> = ({ userId }) => {
  const [quizTaken, setQuizTaken] = useState<boolean>(false);

  useEffect(() => {
    const checkQuizStatus = async () => {
      const docRef = doc(FIRESTORE_DB, "userQuizzes", userId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setQuizTaken(true);
      }
    };
    checkQuizStatus();
  }, [userId]);

  return (
    <Stack.Navigator>
      {quizTaken ? (
        <Stack.Screen name="Training Plans">
          {() => <TrainingPlans userId={userId} />}
        </Stack.Screen>
      ) : (
        <Stack.Screen name="Assessment Quiz">
          {() => <AssessmentQuiz userId={userId} />}
        </Stack.Screen>
      )}
      <Stack.Screen name="Progress Tracking" component={ProgressTracking} />
    </Stack.Navigator>
  );
};

export default TrainingPlansStack;
