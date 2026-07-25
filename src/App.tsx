import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { UserProfile, SkillNode, Flashcard, InterviewSession } from "./types";
import { 
  initialUserProfile, 
  initialSkillNodes, 
  initialFlashcards, 
  initialInterviewSessions 
} from "./data/initialData";
import { DEMO_USER_PROFILE } from "./data/demoUser";

import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { NavigationHeader } from "./components/NavigationHeader";
import { CommandPalette } from "./components/CommandPalette";
import { ProfileModal } from "./components/ProfileModal";
import { AuthContainer } from "./components/auth/AuthContainer";

import { DashboardView } from "./components/views/DashboardView";
import { InterviewSimulatorView } from "./components/views/InterviewSimulatorView";
import { SkillGraphView } from "./components/views/SkillGraphView";
import { SpacedMemoryView } from "./components/views/SpacedMemoryView";
import { ResumeOptimizerView } from "./components/views/ResumeOptimizerView";
import { AnalyticsView } from "./components/views/AnalyticsView";
import { StudyCoachView } from "./components/views/StudyCoachView";
import { ProfileAndSettingsContainer } from "./components/profile/ProfileAndSettingsContainer";
import { PageTransition } from "./components/motion";

import { 
  LayoutDashboard, 
  BrainCircuit, 
  Zap, 
  RotateCcw, 
  FileText, 
  BarChart3,
  GraduationCap,
  Settings,
  Sparkles,
  X,
  UserPlus,
  LogIn
} from "lucide-react";

function WorkspaceApp() {
  const {
    user,
    isAuthenticated,
    isDemoMode,
    bannerDismissed,
    dismissBanner,
    exitDemoMode,
    logout,
  } = useAuth();

  const [activeTab, setActiveTab] = useState<string>("dashboard");

  // Determine user profile based on Demo Mode vs Logged In user
  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    if (isDemoMode) {
      return {
        ...initialUserProfile,
        id: DEMO_USER_PROFILE.id,
        name: DEMO_USER_PROFILE.name,
        role: DEMO_USER_PROFILE.role,
        avatar: DEMO_USER_PROFILE.avatar,
        readinessScore: DEMO_USER_PROFILE.careerReadiness,
        streakDays: DEMO_USER_PROFILE.currentStreak,
        xpPoints: DEMO_USER_PROFILE.xp,
        completedHoursThisWeek: DEMO_USER_PROFILE.studyHours,
      };
    }
    const saved = localStorage.getItem("ascend_profile");
    if (saved) {
      const parsed = JSON.parse(saved);
      return user?.name ? { ...parsed, name: user.name } : parsed;
    }
    return user?.name ? { ...initialUserProfile, name: user.name } : initialUserProfile;
  });

  // Keep profile synchronized if user or demo mode changes
  useEffect(() => {
    if (isDemoMode) {
      setUserProfile((prev) => ({
        ...prev,
        id: DEMO_USER_PROFILE.id,
        name: DEMO_USER_PROFILE.name,
        role: DEMO_USER_PROFILE.role,
        avatar: DEMO_USER_PROFILE.avatar,
        readinessScore: DEMO_USER_PROFILE.careerReadiness,
        streakDays: DEMO_USER_PROFILE.currentStreak,
        xpPoints: DEMO_USER_PROFILE.xp,
        completedHoursThisWeek: DEMO_USER_PROFILE.studyHours,
      }));
    } else if (user?.name) {
      setUserProfile((prev) => ({
        ...prev,
        name: user.name || prev.name,
      }));
    }
  }, [isDemoMode, user]);

  const [skillNodes, setSkillNodes] = useState<SkillNode[]>(() => {
    const saved = localStorage.getItem("ascend_skills");
    return saved ? JSON.parse(saved) : initialSkillNodes;
  });

  const [flashcards, setFlashcards] = useState<Flashcard[]>(() => {
    const saved = localStorage.getItem("ascend_cards");
    return saved ? JSON.parse(saved) : initialFlashcards;
  });

  const [interviewSessions, setInterviewSessions] = useState<InterviewSession[]>(() => {
    const saved = localStorage.getItem("ascend_sessions");
    return saved ? JSON.parse(saved) : initialInterviewSessions;
  });

  // Modals
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isGeneratingMoreCards, setIsGeneratingMoreCards] = useState(false);

  // Sync state to local storage
  useEffect(() => {
    if (!isDemoMode) {
      localStorage.setItem("ascend_profile", JSON.stringify(userProfile));
    }
  }, [userProfile, isDemoMode]);

  useEffect(() => {
    localStorage.setItem("ascend_skills", JSON.stringify(skillNodes));
  }, [skillNodes]);

  useEffect(() => {
    localStorage.setItem("ascend_cards", JSON.stringify(flashcards));
  }, [flashcards]);

  useEffect(() => {
    localStorage.setItem("ascend_sessions", JSON.stringify(interviewSessions));
  }, [interviewSessions]);

  // If user is not authenticated AND not in demo mode, render Protected Auth Router
  if (!isAuthenticated && !isDemoMode) {
    return <AuthContainer />;
  }

  // Handlers
  const handleSaveInterviewSession = (newSession: InterviewSession) => {
    setInterviewSessions((prev) => [newSession, ...prev]);
    setUserProfile((prev) => ({
      ...prev,
      readinessScore: Math.min(98, prev.readinessScore + 1),
      completedHoursThisWeek: Number((prev.completedHoursThisWeek + 0.5).toFixed(1)),
    }));
  };

  const handleUpdateSkillNode = (updatedNode: SkillNode) => {
    setSkillNodes((prev) =>
      prev.map((s) => (s.id === updatedNode.id ? updatedNode : s))
    );
  };

  const handleUpdateFlashcard = (updatedCard: Flashcard) => {
    setFlashcards((prev) =>
      prev.map((f) => (f.id === updatedCard.id ? updatedCard : f))
    );
  };

  const handleGenerateMoreCards = async (topic: string) => {
    setIsGeneratingMoreCards(true);
    try {
      const res = await fetch("/api/flashcards/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, count: 2 }),
      });
      const data = await res.json();
      if (data.cards && data.cards.length > 0) {
        const newCardsFormatted: Flashcard[] = data.cards.map((c: any, i: number) => ({
          id: "fc-gen-" + Date.now() + "-" + i,
          topic: c.topic || topic,
          question: c.question,
          answer: c.answer,
          keyTakeaway: c.keyTakeaway || "Focus on fundamental memory and architectural trade-offs.",
          difficulty: c.difficulty || "Medium",
          intervalDays: 1,
          nextReviewDate: new Date().toISOString().split("T")[0],
          history: [],
        }));
        setFlashcards((prev) => [...newCardsFormatted, ...prev]);
      }
    } catch (err) {
      console.error("Failed to generate cards:", err);
    } finally {
      setIsGeneratingMoreCards(false);
    }
  };

  const navTabs = [
    { id: "dashboard", label: "Dashboard & Readiness", icon: LayoutDashboard },
    { id: "study", label: "AI Study Coach", icon: GraduationCap },
    { id: "interview", label: "Mock Simulator", icon: BrainCircuit },
    { id: "skillgraph", label: "Skill Graph", icon: Zap },
    { id: "flashcards", label: "Memory Deck", icon: RotateCcw },
    { id: "resume", label: "Resume Optimizer", icon: FileText },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "profile", label: "Profile & Settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[var(--bg-app)] text-[var(--text-primary)] font-sans antialiased transition-colors duration-200">
      
      {/* Demo Mode Floating Top Banner */}
      {isDemoMode && !bannerDismissed && (
        <div className="bg-gradient-to-r from-[var(--accent)]/15 via-[var(--bg-surface)] to-[var(--accent)]/15 border-b border-[var(--accent)]/30 py-2.5 px-4 text-xs font-mono flex items-center justify-between shadow-xs transition-all">
          <div className="flex items-center space-x-2 my-0.5">
            <Sparkles className="w-4 h-4 text-[var(--accent)] animate-pulse shrink-0" />
            <span className="text-[var(--text-primary)]">
              ✨ <strong className="font-bold">Demo Mode:</strong> You're exploring a sample workspace with pre-populated career stats.
            </span>
          </div>

          <div className="flex items-center space-x-2 shrink-0">
            <button
              onClick={exitDemoMode}
              className="flex items-center space-x-1 px-2.5 py-1 text-[11px] font-mono font-bold text-[var(--bg-app)] bg-[var(--accent)] hover:opacity-90 rounded-lg transition-opacity"
            >
              <UserPlus className="w-3 h-3" />
              <span>Create Account / Sign In</span>
            </button>

            <button
              onClick={dismissBanner}
              className="p-1 text-[var(--text-secondary)] hover:text-[var(--text-primary)] rounded-lg transition-colors"
              title="Dismiss banner"
              aria-label="Dismiss banner"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Top Bar Navigation */}
      <NavigationHeader
        userProfile={userProfile}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        onOpenProfileModal={() => setIsProfileModalOpen(true)}
      />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Tab Navigation Menu */}
        <div className="relative flex items-center space-x-1 border-b border-[var(--border-color)] overflow-x-auto pb-px">
          {navTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex items-center space-x-2 py-3 px-4 text-xs font-medium rounded-t-xl transition-colors whitespace-nowrap ${
                  isActive
                    ? "text-[var(--text-primary)] font-semibold bg-[var(--bg-surface)]"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)]"
                }`}
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-[var(--accent)]" : "text-[var(--text-secondary)]"}`} />
                </motion.div>
                <span>{tab.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="mainNavActiveTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--text-primary)] rounded-full"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* View Router with Global Page Transitions */}
        <AnimatePresence mode="wait">
          {activeTab === "dashboard" && (
            <PageTransition key="dashboard">
              <DashboardView
                userProfile={userProfile}
                skillNodes={skillNodes}
                interviewSessions={interviewSessions}
                flashcards={flashcards}
                onNavigateTab={setActiveTab}
                onStartInterview={() => setActiveTab("interview")}
              />
            </PageTransition>
          )}

          {activeTab === "study" && (
            <PageTransition key="study">
              <StudyCoachView userProfile={userProfile} />
            </PageTransition>
          )}

          {activeTab === "interview" && (
            <PageTransition key="interview">
              <InterviewSimulatorView
                userProfile={userProfile}
                onSaveSession={handleSaveInterviewSession}
              />
            </PageTransition>
          )}

          {activeTab === "skillgraph" && (
            <PageTransition key="skillgraph">
              <SkillGraphView
                skillNodes={skillNodes}
                onUpdateSkillNode={handleUpdateSkillNode}
              />
            </PageTransition>
          )}

          {activeTab === "flashcards" && (
            <PageTransition key="flashcards">
              <SpacedMemoryView
                flashcards={flashcards}
                onUpdateFlashcard={handleUpdateFlashcard}
                onGenerateMoreCards={handleGenerateMoreCards}
                isGeneratingCards={isGeneratingMoreCards}
              />
            </PageTransition>
          )}

          {activeTab === "resume" && (
            <PageTransition key="resume">
              <ResumeOptimizerView userProfile={userProfile} />
            </PageTransition>
          )}

          {activeTab === "analytics" && (
            <PageTransition key="analytics">
              <AnalyticsView
                userProfile={userProfile}
                skillNodes={skillNodes}
                interviewSessions={interviewSessions}
              />
            </PageTransition>
          )}

          {activeTab === "profile" && (
            <PageTransition key="profile">
              <ProfileAndSettingsContainer
                onUpdateGlobalProfile={(updated) => setUserProfile((prev) => ({ ...prev, ...updated }))}
                onSignOut={isDemoMode ? exitDemoMode : logout}
              />
            </PageTransition>
          )}
        </AnimatePresence>

      </main>

      {/* Global Modals */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onSelectAction={setActiveTab}
        onOpenProfileModal={() => setIsProfileModalOpen(false)}
      />

      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        userProfile={userProfile}
        onUpdateProfile={setUserProfile}
      />

    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <WorkspaceApp />
      </AuthProvider>
    </ThemeProvider>
  );
}
