import React from "react";
import { ScrollView } from "react-native";
import ProgressAnalyticsComponent from "./ProgressAnalytics";
import { ProgressAnalytics } from "../../types";

const mockProgressData: ProgressAnalytics = {
  physicalMetrics: {
    strength: [
      { date: "2023-09-01", value: 40 },
      { date: "2023-09-15", value: 45 },
      { date: "2023-10-01", value: 50 },
      { date: "2023-10-15", value: 55 },
    ],
    endurance: [
      { date: "2023-09-01", value: 60 },
      { date: "2023-09-15", value: 62 },
      { date: "2023-10-01", value: 64 },
      { date: "2023-10-15", value: 68 },
    ],
  },
  climbingGrades: [
    { date: "2023-09-01", value: 6 },
    { date: "2023-09-15", value: 6.2 },
    { date: "2023-10-01", value: 6.5 },
    { date: "2023-10-15", value: 7 },
  ],
};

const ProgressAnalyticsPage: React.FC = () => {
  return (
    <ScrollView>
      <ProgressAnalyticsComponent data={mockProgressData} />
    </ScrollView>
  );
};

export default ProgressAnalyticsPage;
