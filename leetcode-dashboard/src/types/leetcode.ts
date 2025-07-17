export interface Problem {
  id: number;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  topic: string;
  subtopic: string;
  dateSolved: string;
  timeSpent: number; // in minutes
  attempts: number;
  url: string;
  notes?: string;
}

export interface Subtopic {
  name: string;
  completed: number;
  total: number;
}

export interface Topic {
  name: string;
  totalProblems: number;
  completedProblems: number;
  priority: 'high' | 'medium' | 'low';
  subtopics: Subtopic[];
}

export interface Profile {
  username: string;
  startDate: string;
  goal: {
    problemsPerDay: number;
    totalProblems: number;
  };
}

export interface LeetCodeConfig {
  profile: Profile;
  problems: Problem[];
  topics: Topic[];
}

export interface DailyStats {
  date: string;
  problemsSolved: number;
  timeSpent: number;
  difficulty: {
    easy: number;
    medium: number;
    hard: number;
  };
}

export interface Stats {
  totalProblems: number;
  problemsByDifficulty: {
    easy: number;
    medium: number;
    hard: number;
  };
  currentStreak: number;
  longestStreak: number;
  averageProblemsPerDay: number;
  averageTimePerProblem: number;
  momentum: number; // 0-100 score
  completionRate: number; // percentage of goal
}