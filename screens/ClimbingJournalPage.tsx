import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ClimbingJournalPage: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Climbing Journal</Text>
      <Text>
        This will be the journal page where users can log their climbs.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
});

export default ClimbingJournalPage;
