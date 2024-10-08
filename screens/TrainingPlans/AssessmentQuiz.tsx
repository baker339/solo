// AssessmentQuiz.tsx
import React, { useState, useEffect } from "react";
import { View, Text, Button, TextInput } from "react-native";
import Slider from "@react-native-community/slider"; // Import Slider from the community package
import { doc, setDoc, getDoc } from "firebase/firestore";
import { FIRESTORE_DB } from "../../FirebaseConfig";
import Checkbox from "../../components/Common/Checkbox";
import { useTheme } from "../../context/ThemeContext";

interface AssessmentQuizProps {
  userId: string;
}

interface Responses {
  [key: string]: any;
}

const AssessmentQuiz: React.FC<AssessmentQuizProps> = ({ userId }) => {
  const [responses, setResponses] = useState<Responses>({});
  const [quizTaken, setQuizTaken] = useState<boolean>(false);
  const [otherSport, setOtherSport] = useState<string>("");
  const [sportsSelected, setSportsSelected] = useState<Record<string, boolean>>(
    {
      sportClimbing: false,
      bouldering: false,
      running: false,
      weightTraining: false,
      calisthenics: false,
      other: false,
    }
  );
  const { currentTheme } = useTheme();

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

  const handleResponse = (question: string, answer: any) => {
    setResponses((prev) => ({ ...prev, [question]: answer }));
  };

  const handleSportSelection = (sport: string) => {
    setSportsSelected((prev) => ({
      ...prev,
      [sport]: !prev[sport],
    }));
  };

  const handleSubmit = async () => {
    const selectedSports = Object.keys(sportsSelected).filter(
      (sport) => sportsSelected[sport]
    );
    await setDoc(doc(FIRESTORE_DB, "userQuizzes", userId), {
      ...responses,
      sports: selectedSports,
      otherSport: sportsSelected.other ? otherSport : "",
      quizTaken: true,
    });
    // Navigate to custom plans screen
  };

  if (quizTaken) {
    return <Text>You have already completed the quiz.</Text>;
  }

  return (
    <View style={currentTheme.container}>
      {/* Question 1: Climbing experience */}
      <Text>1. How long have you been climbing?</Text>
      <Slider
        minimumValue={0}
        maximumValue={20}
        step={1}
        value={responses.yearsClimbing || 0}
        onValueChange={(value) => handleResponse("yearsClimbing", value)}
      />
      <Text>{responses.yearsClimbing} years</Text>

      {/* Question 2: Overall fitness */}
      <Text>2. How would you rate your overall fitness?</Text>
      <Slider
        minimumValue={1}
        maximumValue={10}
        step={1}
        value={responses.fitnessLevel || 1}
        onValueChange={(value) => handleResponse("fitnessLevel", value)}
      />
      <Text>{responses.fitnessLevel}/10</Text>

      {/* Question 3: Goals */}
      <Text>3. What are your main climbing goals?</Text>
      <TextInput
        placeholder="e.g., Improve strength, climb harder grades"
        onChangeText={(text) => handleResponse("goals", text)}
      />

      {/* Question 4: Training commitment */}
      <Text>4. How many hours per week can you commit to training?</Text>
      <Slider
        minimumValue={1}
        maximumValue={20}
        step={1}
        value={responses.trainingHours || 1}
        onValueChange={(value) => handleResponse("trainingHours", value)}
      />
      <Text>{responses.trainingHours} hours/week</Text>

      {/* Question 5: Which sports do you want to incorporate into your training? */}
      <Text>
        5. Which sports do you want to incorporate into your training?
      </Text>
      {Object.keys(sportsSelected).map((sport) => (
        <Checkbox
          key={sport}
          label={sport.replace(/([A-Z])/g, " $1")}
          selected={sportsSelected[sport]}
          onToggle={() => handleSportSelection(sport)}
        />
      ))}
      {sportsSelected.other && (
        <TextInput
          placeholder="Please specify other sports"
          onChangeText={(text) => setOtherSport(text)}
        />
      )}

      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

export default AssessmentQuiz;
