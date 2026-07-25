export type DifficultyLevel = "Easy" | "Medium" | "Hard" | "Beginner" | "Intermediate" | "Advanced" | "Expert";

export interface StudySubject {
  id: string;
  name: string;
  category: "Computer Science" | "Software Engineering" | "Frontend & Web" | "Backend & Systems" | "AI & Data Science";
  iconName: string;
  progress: number; // 0-100
  difficulty: DifficultyLevel;
  estimatedTimeHours: number;
  completedTimeHours: number;
  isFavorite: boolean;
  lastStudied: string;
  description: string;
  topicsCount: number;
  lessonsCount: number;
  practiceCount: number;
  quizCount: number;
}

export interface LessonItem {
  id: string;
  title: string;
  durationMinutes: number;
  isCompleted: boolean;
  type: "reading" | "video" | "interactive";
}

export interface TopicDetailItem {
  id: string;
  subjectId: string;
  subjectName: string;
  title: string;
  overview: string;
  estimatedMinutes: number;
  difficulty: DifficultyLevel;
  progress: number; // 0-100
  keyConcepts: string[];
  prerequisites: string[];
  learningObjectives: string[];
  resourcesCount: number;
  lessons: LessonItem[];
}

export interface LearningMilestone {
  id: string;
  subjectId: string;
  subjectName: string;
  title: string;
  description: string;
  status: "Completed" | "Current" | "Upcoming";
  estimatedCompletion: string;
  progressPercentage: number;
  lessonsCount: number;
  practiceCount: number;
  quizCount: number;
  resourcesCount: number;
  lessonsList: { id: string; title: string; completed: boolean }[];
  practiceItemsList: { id: string; title: string; difficulty: DifficultyLevel }[];
  quizItemsList: { id: string; title: string; totalQuestions: number }[];
  resourcesList: { id: string; title: string; type: string }[];
}

export interface StudyFlashcardItem {
  id: string;
  subjectName: string;
  topicName: string;
  question: string;
  answer: string;
  keyTakeaway: string;
  difficulty: "Easy" | "Medium" | "Hard";
  isBookmarked: boolean;
  isFavorite: boolean;
}

export interface PracticeQuestionItem {
  id: string;
  subjectName: string;
  topicName: string;
  question: string;
  codeSnippet?: string;
  difficulty: DifficultyLevel;
  hints: string[];
  explanation: string;
  sampleAnswer: string;
}

export interface QuizQuestionItem {
  id: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
  topic: string;
  difficulty: DifficultyLevel;
}

export interface QuizResultData {
  id: string;
  date: string;
  subjectName: string;
  topicName: string;
  overallScore: number;
  correctAnswers: number;
  wrongAnswers: number;
  accuracy: number; // 0-100%
  avgTimeSeconds: number;
  topicPerformance: { topic: string; score: number }[];
  improvementSuggestions: string[];
}

export interface WeakTopicItem {
  id: string;
  topicName: string;
  subjectName: string;
  skillGap: string;
  priority: "High" | "Medium" | "Low";
  currentMastery: number; // 0-100
  estimatedImprovementHours: number;
  suggestedOrder: number;
  practiceRecommendations: string[];
}

export interface StudyResourceItem {
  id: string;
  title: string;
  type: "video" | "article" | "book" | "practice_website" | "official_doc";
  authorOrPlatform: string;
  url: string;
  durationOrPages: string;
  difficulty: DifficultyLevel;
  isSaved: boolean;
  isBookmarked: boolean;
  subjectName: string;
}

export interface LearningHistoryRecord {
  id: string;
  date: string;
  timestamp: string;
  title: string;
  type: "lesson" | "quiz" | "practice" | "achievement";
  subjectName: string;
  durationOrScore: string;
  details: string;
}

export interface DailyGoalData {
  targetMinutes: number;
  completedMinutes: number;
  targetLessons: number;
  completedLessons: number;
  isStreakActive: boolean;
  currentStreakDays: number;
}

export interface WeeklyActivityData {
  day: string;
  hours: number;
  percentage: number;
}

export interface MotivationalQuoteData {
  quote: string;
  author: string;
  role: string;
}

export interface AchievementBadgeData {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: string;
  isUnlocked: boolean;
  progress: number; // 0-100
}
