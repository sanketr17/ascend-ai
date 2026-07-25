import { 
  ExtendedUserProfile, 
  AppearanceSettings, 
  NotificationSettings, 
  SecuritySettings, 
  LearningAndInterviewSettings, 
  LanguageAndAccessibilitySettings, 
  FAQItem, 
  SystemAboutInfo 
} from "../types/settingsTypes";

export const defaultExtendedUserProfile: ExtendedUserProfile = {
  name: "Alex Rivera",
  username: "alex_rivera_dev",
  email: "alex.rivera@ascend.ai",
  role: "Senior/Staff Frontend Engineer",
  bio: "Senior Frontend Engineer with 8+ years building high-throughput web applications, micro-frontends, and distributed canvas systems. Prepping for L6/L7 Staff loops at Google, Apple, and Stripe.",
  location: "San Francisco, CA (Hybrid)",
  occupation: "Senior Frontend Architect @ Scale Tech",
  experienceLevel: "Senior Engineer (5-8 YOE)",
  skills: [
    "React 19 & Next.js",
    "TypeScript & Type Systems",
    "Distributed Web Architecture",
    "Web Performance & Core Web Vitals",
    "System Design & Micro-frontends",
    "State Machines & XState",
    "Web Workers & OffscreenCanvas",
    "GraphQL & gRPC Web"
  ],
  learningInterests: [
    "GenAI Agent System Design",
    "Rust for WebAssembly High Performance",
    "WebGPU Shader Pipelines",
    "Consensus Protocols & CRDTs",
    "Staff Level Behavioral Leadership"
  ],
  targetRole: "Senior/Staff Frontend Engineer",
  companyTier: "Tier 1 Big Tech (Apple, Stripe, Google)",
  targetDate: "2026-09-15",
  readinessScore: 84,
  completionPercentage: 88,
  memberSince: "January 2025",
  verificationBadge: "Verified Staff Candidate"
};

export const defaultAppearanceSettings: AppearanceSettings = {
  theme: "dark",
  fontSize: "medium",
  density: "comfortable",
  animationsEnabled: true,
  highContrast: false,
};

export const defaultNotificationSettings: NotificationSettings = {
  emailNotifications: true,
  interviewReminders: true,
  interviewReminderTime: "30m",
  dailyLearningReminder: true,
  dailyReminderTime: "09:00",
  weeklyReport: true,
  achievementNotifications: true,
  marketingEmails: false,
};

export const defaultSecuritySettings: SecuritySettings = {
  twoFactorEnabled: true,
  twoFactorMethod: "Authenticator App (TOTP)",
  passwordLastChanged: "14 days ago",
  connectedDevices: [
    {
      id: "dev-1",
      name: "MacBook Pro M3 Max (16-inch)",
      deviceType: "MacBook",
      location: "San Francisco, CA, USA",
      ipAddress: "192.168.1.104 (Current Session)",
      lastActive: "Active Now",
      isCurrent: true,
    },
    {
      id: "dev-2",
      name: "iPad Pro 12.9 (M2)",
      deviceType: "iPad",
      location: "San Francisco, CA, USA",
      ipAddress: "172.56.21.98",
      lastActive: "2 hours ago",
      isCurrent: false,
    },
    {
      id: "dev-3",
      name: "iPhone 15 Pro Max",
      deviceType: "iPhone",
      location: "San Francisco, CA, USA",
      ipAddress: "172.56.21.102",
      lastActive: "Yesterday at 18:42",
      isCurrent: false,
    },
  ],
};

export const defaultLearningSettings: LearningAndInterviewSettings = {
  aiModelDepth: "Balanced Evaluation",
  difficultyCurve: "Adaptive ML Engine",
  voiceFeedback: false,
  sessionDurationDefault: "30 mins",
  editorKeybindings: "Standard VSCode",
};

export const defaultLanguageSettings: LanguageAndAccessibilitySettings = {
  language: "English (US)",
  screenReaderOptimization: false,
  keyboardShortcutsEnabled: true,
  subtitlesEnabled: true,
};

export const initialFAQList: FAQItem[] = [
  {
    id: "faq-1",
    category: "AI Evaluation",
    question: "How does ASCEND AI compute my Readiness Score?",
    answer: "ASCEND AI analyzes your mock interview rubric scores across System Design, Coding Algorithms, STAR Behavioral answers, and Spaced Memory deck retention. Algorithms weigh recent performances heavily while factoring in skill decay rates."
  },
  {
    id: "faq-2",
    category: "Interview Prep",
    question: "Can I customize the target company tier benchmark?",
    answer: "Yes! In your Profile or Settings, choose between Tier 1 Big Tech (Google, Apple, Stripe), AI Frontier (OpenAI, Anthropic), Fintech & Quant (Jane Street, Citadel), or High-Growth Scaleups. Questions and rubric expectations calibrate automatically."
  },
  {
    id: "faq-3",
    category: "Account & Billing",
    question: "Is my mock interview response data private and encrypted?",
    answer: "All candidate code submissions, audio transcripts, and resume uploads are encrypted at rest and in transit. Your practice recordings are strictly private to your account."
  },
  {
    id: "faq-4",
    category: "General",
    question: "How does the Spaced Memory Deck interval work?",
    answer: "The deck uses a SuperMemo SM-2 derivative algorithm tailored for technical architecture key takeaways. Cards marked 'Easy' delay review intervals up to 21 days, while 'Hard' cards reappear within 24 hours."
  },
  {
    id: "faq-5",
    category: "Interview Prep",
    question: "How do I trigger an AI Study Coach review session?",
    answer: "Navigate to the 'AI Study Coach' tab or use command palette (⌘K) to start a target weakness review or daily drill."
  }
];

export const systemAboutData: SystemAboutInfo = {
  version: "v2.4.0-release",
  buildNumber: "8f2a9c14",
  releaseDate: "July 2026",
  engineName: "ASCEND Neural Evaluation Kernel v4",
  team: [
    {
      name: "Dr. Elena Vance",
      role: "Lead AI Architect & Machine Learning Research",
      bio: "Former Principal Research Scientist at DeepMind specializing in adaptive learning curves.",
      avatarInitials: "EV"
    },
    {
      name: "Marcus Sterling",
      role: "VP of Product Engineering & Systems",
      bio: "Ex-Staff Architect at Stripe & Apple Infrastructure leads.",
      avatarInitials: "MS"
    },
    {
      name: "Maya Chen",
      role: "Head of UX Architecture & Design Systems",
      bio: "Pioneer in developer productivity interfaces, formerly Linear & Notion UX lead.",
      avatarInitials: "MC"
    }
  ],
  licenses: [
    "MIT License (Core Design System Components)",
    "Apache 2.0 (Vector Math & Spaced Repetition Algorithms)",
    "Creative Commons BY 4.0 (Question Datasets & System Rubrics)"
  ]
};
