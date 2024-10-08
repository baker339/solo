import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import {
  collection,
  addDoc,
  DocumentReference,
  DocumentData,
} from "firebase/firestore";
import { FIRESTORE_DB } from "../../FirebaseConfig";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../types/navigation";
import { useTheme } from "../../context/ThemeContext";

const ClimbingJournal = () => {
  const [climbType, setClimbType] = useState("");
  const [grade, setGrade] = useState("");
  const [holds, setHolds] = useState("");
  const [notes, setNotes] = useState("");
  const [showReflection, setShowReflection] = useState(false);
  const [reflectionAnswers, setReflectionAnswers] = useState({
    whatWentWell: "",
    whatWasChallenging: "",
    whatWouldChange: "",
  });
  const [climbDocRef, setClimbDocRef] = useState<DocumentReference<
    DocumentData,
    DocumentData
  > | null>(null); // Store climb doc reference

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { currentTheme } = useTheme();

  // Handle climb submission
  const logClimb = async () => {
    try {
      const climbData = {
        climbType,
        grade,
        holds,
        notes,
        timestamp: new Date().toISOString(),
      };

      // Add the climb log to Firestore
      const docRef = await addDoc(
        collection(FIRESTORE_DB, "climbLogs"),
        climbData
      );
      setClimbDocRef(docRef); // Store the document reference for later use

      console.log("Climb log added with ID: ", docRef.id);
      setShowReflection(true); // Show reflective prompts after submission
    } catch (error) {
      console.error("Error logging climb: ", error);
    }
  };

  // Handle reflection answers submission
  const submitReflection = async () => {
    if (!climbDocRef) return; // Ensure climbDocRef exists before proceeding

    try {
      const reflectionData = {
        climbId: climbDocRef.id, // reference the climb log
        ...reflectionAnswers,
        timestamp: new Date().toISOString(),
      };

      // Add the reflection to Firestore
      await addDoc(collection(FIRESTORE_DB, "reflections"), reflectionData);

      console.log("Reflection added to Firestore");
      setShowReflection(false);
      resetForm();
    } catch (error) {
      console.error("Error submitting reflection: ", error);
    }
  };

  // Reset form after submission
  const resetForm = () => {
    setClimbType("");
    setGrade("");
    setHolds("");
    setNotes("");
    setReflectionAnswers({
      whatWentWell: "",
      whatWasChallenging: "",
      whatWouldChange: "",
    });
    setClimbDocRef(null); // Reset document reference
  };

  return (
    <View style={currentTheme.container}>
      {!showReflection ? (
        <>
          <Text>Log Climb</Text>
          <TextInput
            placeholder="Problem/Route"
            value={climbType}
            onChangeText={setClimbType}
            style={currentTheme.input}
          />
          <TextInput
            placeholder="Grade"
            value={grade}
            onChangeText={setGrade}
            style={currentTheme.input}
          />
          <TextInput
            placeholder="Holds Used"
            value={holds}
            onChangeText={setHolds}
            style={currentTheme.input}
          />
          <TextInput
            placeholder="Feelings/Notes"
            value={notes}
            onChangeText={setNotes}
            style={currentTheme.input}
          />
          <Button title="Log Climb" onPress={logClimb} />
        </>
      ) : (
        <>
          <Text>Reflect on Your Climb</Text>
          <Text>1. What went well?</Text>
          <TextInput
            placeholder="Answer..."
            value={reflectionAnswers.whatWentWell}
            onChangeText={(text) =>
              setReflectionAnswers({ ...reflectionAnswers, whatWentWell: text })
            }
            style={currentTheme.input}
          />
          <Text>2. What was challenging?</Text>
          <TextInput
            placeholder="Answer..."
            value={reflectionAnswers.whatWasChallenging}
            onChangeText={(text) =>
              setReflectionAnswers({
                ...reflectionAnswers,
                whatWasChallenging: text,
              })
            }
            style={currentTheme.input}
          />
          <Text>3. What would you change next time?</Text>
          <TextInput
            placeholder="Answer..."
            value={reflectionAnswers.whatWouldChange}
            onChangeText={(text) =>
              setReflectionAnswers({
                ...reflectionAnswers,
                whatWouldChange: text,
              })
            }
            style={currentTheme.input}
          />
          <Button title="Submit Reflection" onPress={submitReflection} />
        </>
      )}
      <Button
        title="View Climbing Analytics"
        onPress={() => navigation.navigate("ClimbingAnalytics" as never)}
      />
    </View>
  );
};

export default ClimbingJournal;
