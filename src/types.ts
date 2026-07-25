export type RoleCategory = 
  | "Software Engineer (Fullstack/Backend)"
  | "Senior/Staff Frontend Engineer"
  | "Systems Architecture & Infra Lead"
  | "AI / Machine Learning Engineer"
  | "Lead Product Manager"
  | "Quantitative Analyst / Trader"
  | "Engineering Manager";

export type TargetCompanyTier = 
  | "Tier 1 Big Tech (Apple, Stripe, Google)"
  | "AI Frontier (OpenAI, Anthropic)"
  | "Fintech & Quant (Jane Street, Citadel, Stripe)"
  | "High-Growth Scaleup"
  | "Top Tier Management Consulting";

export interface UserProfile {
  name: string;
  targetRole: RoleCategory;
  companyTier: TargetCompanyTier;
  targetDate: string;
  readinessScore: number; // 0-100
  weeklyGoalHours: number;
  completedHoursThisWeek: number;
  currentStreakDays: number;
  targetMetrics: {
    systemDesign: number;
    codingAlgorithms: number;
    behavioralSTAR: number;
    domainArchitecture: number;
    communicationClarity: number;
  };
}

export interface SkillNode {
  id: string;
  title: string;
  category: "System Design" | "Algorithms" | "Behavioral Leadership" | "Domain Architecture" | "Frontend/Performance";
  masteryLevel: number; // 0-100
  status: "Mastered" | "In Progress" | "Needs Review" | "Decay Risk";
  lastReviewedDaysAgo: number;
  estMinutesToReview: number;
  description: string;
  keyTakeaways: string[];
  codeOrStructureSnippet?: string;
  sampleQuestion: string;
}

export interface InterviewSession {
  id: string;
  date: string;
  role: string;
  companyTier: string;
  mode: "Technical Deep-Dive" | "System Architecture" | "Behavioral STAR" | "Speed Drill";
  question: string;
  userAnswer: string;
  overallScore: number;
  breakdown: {
    clarityAndStructure: number;
    technicalDepth: number;
    problemDecomposition: number;
    edgeCaseCoverage: number;
  };
  strengths: string[];
  gaps: string[];
  suggestedUpgrade: string;
  followUpQuestion?: string;
  durationSeconds: number;
}

export interface Flashcard {
  id: string;
  topic: string;
  question: string;
  answer: string;
  keyTakeaway: string;
  difficulty: "Easy" | "Medium" | "Hard";
  intervalDays: number;
  nextReviewDate: string;
  history: { date: string; rating: "Again" | "Hard" | "Good" | "Easy" }[];
}

export interface ResumeAnalysisResult {
  matchScore: number;
  marketReadinessTier: string;
  matchingKeywords: string[];
  missingCriticalSkills: string[];
  bulletPointImprovements: {
    original: string;
    improved: string;
    impactReasoning: string;
  }[];
  tailoredInterviewPrepStrategy: string;
}
