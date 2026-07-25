import { RoleCategory, TargetCompanyTier } from "../types";

export type ExperienceLevel = 
  | "Entry Level (0-2 YOE)"
  | "Mid Level (3-5 YOE)"
  | "Senior Engineer (5-8 YOE)"
  | "Staff / Lead Architect (8+ YOE)"
  | "Principal / Director (12+ YOE)";

export interface ExtendedUserProfile {
  name: string;
  username: string;
  email: string;
  role: string;
  bio: string;
  location: string;
  occupation: string;
  experienceLevel: ExperienceLevel;
  skills: string[];
  learningInterests: string[];
  targetRole: RoleCategory;
  companyTier: TargetCompanyTier;
  targetDate: string;
  readinessScore: number;
  completionPercentage: number;
  memberSince: string;
  verificationBadge: "Verified Staff Candidate" | "Pro Member" | "Standard Candidate";
}

export type ThemeOption = "light" | "dark" | "system";
export type FontSizeOption = "small" | "medium" | "large";
export type DensityOption = "compact" | "comfortable";

export interface AppearanceSettings {
  theme: ThemeOption;
  fontSize: FontSizeOption;
  density: DensityOption;
  animationsEnabled: boolean;
  highContrast: boolean;
}

export interface NotificationSettings {
  emailNotifications: boolean;
  interviewReminders: boolean;
  interviewReminderTime: "15m" | "30m" | "1h" | "1d";
  dailyLearningReminder: boolean;
  dailyReminderTime: string;
  weeklyReport: boolean;
  achievementNotifications: boolean;
  marketingEmails: boolean;
}

export interface ConnectedDevice {
  id: string;
  name: string;
  deviceType: "MacBook" | "iPad" | "iPhone" | "Linux Workstation" | "Windows PC";
  location: string;
  ipAddress: string;
  lastActive: string;
  isCurrent: boolean;
}

export interface SecuritySettings {
  twoFactorEnabled: boolean;
  twoFactorMethod: "Authenticator App (TOTP)" | "SMS Security Code" | "Hardware Key";
  passwordLastChanged: string;
  connectedDevices: ConnectedDevice[];
}

export interface LearningAndInterviewSettings {
  aiModelDepth: "Fast & Precise" | "Balanced Evaluation" | "Ultra Deep Architecture";
  difficultyCurve: "Adaptive ML Engine" | "Fixed High Target" | "Gradual Ladder";
  voiceFeedback: boolean;
  sessionDurationDefault: "15 mins" | "30 mins" | "45 mins" | "60 mins";
  editorKeybindings: "Standard VSCode" | "Vim Motion" | "Emacs";
}

export interface LanguageAndAccessibilitySettings {
  language: string;
  screenReaderOptimization: boolean;
  keyboardShortcutsEnabled: boolean;
  subtitlesEnabled: boolean;
}

export interface FAQItem {
  id: string;
  category: "General" | "Interview Prep" | "AI Evaluation" | "Account & Billing";
  question: string;
  answer: string;
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  avatarInitials: string;
}

export interface SystemAboutInfo {
  version: string;
  buildNumber: string;
  releaseDate: string;
  engineName: string;
  team: TeamMember[];
  licenses: string[];
}
