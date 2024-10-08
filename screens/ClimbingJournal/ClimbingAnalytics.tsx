import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { collection, DocumentData, getDocs } from "firebase/firestore";
import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import { FIRESTORE_DB } from "../../FirebaseConfig";

const ClimbingAnalytics = () => {
  const [climbLogs, setClimbLogs] = useState<DocumentData[]>([]);

  useEffect(() => {
    const fetchClimbLogs = async () => {
      const querySnapshot = await getDocs(
        collection(FIRESTORE_DB, "climbLogs")
      );
      const logs = querySnapshot.docs.map((doc) => doc.data());
      setClimbLogs(logs);
    };

    fetchClimbLogs();
  }, []);

  const screenWidth = Dimensions.get("window").width;

  const data = {
    labels: climbLogs.map((log, index) => `Climb ${index + 1}`),
    datasets: [
      {
        data: climbLogs.map((log) => parseInt(log.grade, 10) || 0),
        strokeWidth: 2, // optional
      },
    ],
  };

  return (
    <View>
      <Text>Climbing Progress Analytics</Text>
      {climbLogs.length > 0 ? (
        <LineChart
          data={data}
          width={screenWidth}
          height={220}
          chartConfig={{
            backgroundColor: "#e26a00",
            backgroundGradientFrom: "#fb8c00",
            backgroundGradientTo: "#ffa726",
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            strokeWidth: 2, // optional, default 3
          }}
        />
      ) : (
        <Text>No climbing data available</Text>
      )}
    </View>
  );
};

export default ClimbingAnalytics;
