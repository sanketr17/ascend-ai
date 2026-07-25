export interface DemoUserProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
  careerReadiness: number;
  currentStreak: number;
  xp: number;
  completedInterviews: number;
  studyHours: number;
  targetCompanyTier: string;
  targetRole: string;
  readinessBreakdown: {
    dataStructures: number;
    algorithms: number;
    systemDesign: number;
    behavioral: number;
    communication: number;
  };
  recentInterviews: Array<{
    id: string;
    title: string;
    category: string;
    date: string;
    score: number;
    feedback: string;
    status: "completed" | "in_progress" | "scheduled";
  }>;
  upcomingRoadmap: Array<{
    id: string;
    title: string;
    topic: string;
    type: string;
    estimatedTime: string;
    completed: boolean;
  }>;
  achievements: Array<{
    id: string;
    title: string;
    description: string;
    unlockedAt: string;
    icon: string;
  }>;
}

export const DEMO_USER_PROFILE: DemoUserProfile = {
  id: "demo-user-alex-johnson",
  name: "Alex Johnson",
  email: "alex.johnson@stanford.edu",
  role: "Software Engineering Student",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  careerReadiness: 84,
  currentStreak: 12,
  xp: 4250,
  completedInterviews: 18,
  studyHours: 67,
  targetCompanyTier: "Tier 1 Big Tech (FAANG+)",
  targetRole: "Full Stack / Distributed Systems Engineer",
  readinessBreakdown: {
    dataStructures: 88,
    algorithms: 82,
    systemDesign: 78,
    behavioral: 90,
    communication: 85,
  },
  recentInterviews: [
    {
      id: "int-101",
      title: "System Design: Distributed Cache & Rate Limiter",
      category: "System Design",
      date: "Yesterday at 4:30 PM",
      score: 88,
      feedback: "Strong architectural trade-off analysis. Highlighted redis persistence vs memory constraints effectively.",
      status: "completed",
    },
    {
      id: "int-102",
      title: "Algorithms: Sliding Window & Graph Traversal",
      category: "Data Structures & Algorithms",
      date: "3 days ago",
      score: 82,
      feedback: "Solid time complexity explanations. Minor hesitation when edge-cases around graph cycles arose.",
      status: "completed",
    },
    {
      id: "int-103",
      title: "Behavioral: STAR Method & Conflict Resolution",
      category: "Behavioral & Leadership",
      date: "5 days ago",
      score: 91,
      feedback: "Excellent structure and clarity. Quantified results and team impact clearly.",
      status: "completed",
    },
  ],
  upcomingRoadmap: [
    {
      id: "road-1",
      title: "Deep Dive: Consistent Hashing & Sharding",
      topic: "System Design",
      type: "Interactive Workshop",
      estimatedTime: "45 mins",
      completed: false,
    },
    {
      id: "road-2",
      title: "Dynamic Programming: Knapsack Variants",
      topic: "Algorithms",
      type: "AI Speech Practice",
      estimatedTime: "30 mins",
      completed: false,
    },
    {
      id: "road-3",
      title: "FAANG Mock Interview Simulation #19",
      topic: "Live Simulation",
      type: "Full Voice Mock",
      estimatedTime: "60 mins",
      completed: false,
    },
  ],
  achievements: [
    {
      id: "ach-1",
      title: "10-Day Flame Streak",
      description: "Maintained a continuous 10+ day practice streak",
      unlockedAt: "3 days ago",
      icon: "🔥",
    },
    {
      id: "ach-2",
      title: "System Architect",
      description: "Scored over 85% in 5 System Design interviews",
      unlockedAt: "1 week ago",
      icon: "🏗️",
    },
    {
      id: "ach-3",
      title: "Voice Master",
      description: "Completed 15 AI voice speech simulations",
      unlockedAt: "2 weeks ago",
      icon: "🎙️",
    },
  ],
};
