import React from "react";
import { View, Text, Dimensions, StyleSheet } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { ProgressAnalytics } from "../../types";

const screenWidth = Dimensions.get("window").width;

const ProgressAnalyticsComponent: React.FC<{ data: ProgressAnalytics }> = ({
  data,
}) => {
  const formatChartData = (
    progressData: ProgressAnalytics["physicalMetrics"]["strength"]
  ) => {
    return {
      labels: progressData.map((point) => point.date),
      datasets: [
        {
          data: progressData.map((point) => point.value),
        },
      ],
    };
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Progress Analytics</Text>

      <Text>Strength Progress</Text>
      <LineChart
        data={formatChartData(data.physicalMetrics.strength)}
        width={screenWidth - 40} // Set the width based on the screen size
        height={220}
        chartConfig={{
          backgroundColor: "#e26a00",
          backgroundGradientFrom: "#fb8c00",
          backgroundGradientTo: "#ffa726",
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#ffa726",
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />

      <Text>Endurance Progress</Text>
      <LineChart
        data={formatChartData(data.physicalMetrics.endurance)}
        width={screenWidth - 40}
        height={220}
        chartConfig={{
          backgroundColor: "#022b3a",
          backgroundGradientFrom: "#1c3f52",
          backgroundGradientTo: "#328fa8",
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#328fa8",
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />

      <Text>Climbing Grade Progress</Text>
      <LineChart
        data={formatChartData(data.climbingGrades)}
        width={screenWidth - 40}
        height={220}
        chartConfig={{
          backgroundColor: "#005f73",
          backgroundGradientFrom: "#0a9396",
          backgroundGradientTo: "#94d2bd",
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#94d2bd",
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});

export default ProgressAnalyticsComponent;
