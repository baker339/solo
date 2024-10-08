import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  Button,
  StyleSheet,
} from "react-native";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { FIRESTORE_DB } from "../../FirebaseConfig";

interface Workout {
  id: string;
  date: string;
  activity: string;
  duration: number;
  notes: string;
}

const ProgressTracking: React.FC = () => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [activity, setActivity] = useState("");
  const [duration, setDuration] = useState("");
  const [notes, setNotes] = useState("");

  // Fetch workouts from Firestore
  const fetchWorkouts = async () => {
    const workoutsCollection = collection(FIRESTORE_DB, "workouts");
    const workoutsSnapshot = await getDocs(workoutsCollection);
    const workoutsList: Workout[] = workoutsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Workout[];
    setWorkouts(workoutsList);
  };

  useEffect(() => {
    fetchWorkouts();
  }, []);

  // Add new workout
  const addWorkout = async () => {
    if (activity && duration) {
      const newWorkout: Workout = {
        id: "",
        date: new Date().toISOString(),
        activity,
        duration: Number(duration),
        notes,
      };

      await addDoc(collection(FIRESTORE_DB, "workouts"), newWorkout);
      setWorkouts([...workouts, newWorkout]);
      setActivity("");
      setDuration("");
      setNotes("");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Progress Tracking</Text>

      <FlatList
        data={workouts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.workoutItem}>
            <Text>{item.date}</Text>
            <Text>Activity: {item.activity}</Text>
            <Text>Duration: {item.duration} minutes</Text>
            <Text>Notes: {item.notes}</Text>
          </View>
        )}
      />

      <TextInput
        placeholder="Activity"
        value={activity}
        onChangeText={setActivity}
        style={styles.input}
      />
      <TextInput
        placeholder="Duration (minutes)"
        value={duration}
        onChangeText={setDuration}
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        placeholder="Notes"
        value={notes}
        onChangeText={setNotes}
        style={styles.input}
      />
      <Button title="Add Workout" onPress={addWorkout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  workoutItem: {
    marginBottom: 10,
    padding: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    padding: 10,
  },
});

export default ProgressTracking;
