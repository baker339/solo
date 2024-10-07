// types/index.ts

export interface UserProfile {
  username: string;
  climbingExperience: string[]; // e.g., ['bouldering', 'sport climbing']
  goals: string[];
  physicalMetrics: {
    strength: number;
    endurance: number;
  };
}

export interface TrainingPlan {
  id: string;
  name: string;
  focus: string; // e.g., 'strength', 'technique', 'endurance'
  exercises: string[];
  progress: number; // 0-100% completion
}

export interface ClimbingJournalEntry {
  date: string;
  climbType: string; // e.g., 'boulder', 'lead', 'top-rope'
  grade: string;
  holdsUsed: string[];
  reflection: string;
}

export interface MentalTechnique {
  title: string;
  description: string;
}

export interface QuizResponse {
  question: string;
  answer: string;
}

export interface TrainingPlan {
  id: string;
  name: string;
  focus: "strength" | "technique" | "endurance";
  exercises: string[];
  duration: number; // in weeks
  progress: number; // 0-100% completion
}

export interface ProgressDataPoint {
  date: string;
  value: number; // This can represent various metrics, such as strength, endurance, or grade improvement.
}

export interface ProgressAnalytics {
  physicalMetrics: {
    strength: ProgressDataPoint[];
    endurance: ProgressDataPoint[];
  };
  climbingGrades: ProgressDataPoint[];
}
