import React, { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { UserProfile } from "../../types";
import { TabTransition } from "../motion";
import { 
  initialStudySubjects, 
  initialMilestones, 
  sampleTopicDetail, 
  initialStudyFlashcards, 
  initialPracticeQuestions, 
  initialQuizQuestions, 
  sampleQuizResult, 
  initialWeakTopics, 
  initialStudyResources, 
  initialLearningHistory, 
  initialDailyGoal, 
  initialWeeklyActivity, 
  motivationalQuotes, 
  initialAchievementBadges 
} from "../../data/studyData";

import { 
  StudySubject, 
  LearningMilestone, 
  TopicDetailItem, 
  StudyFlashcardItem, 
  PracticeQuestionItem, 
  QuizQuestionItem, 
  QuizResultData, 
  WeakTopicItem, 
  StudyResourceItem, 
  LearningHistoryRecord, 
  DailyGoalData, 
  WeeklyActivityData, 
  MotivationalQuoteData, 
  AchievementBadgeData 
} from "../../types/studyTypes";

import { StudyHomeSubView } from "../study/views/StudyHomeSubView";
import { SubjectLibrarySubView } from "../study/views/SubjectLibrarySubView";
import { LearningRoadmapSubView } from "../study/views/LearningRoadmapSubView";
import { TopicDetailSubView } from "../study/views/TopicDetailSubView";
import { FlashcardsSubView } from "../study/views/FlashcardsSubView";
import { PracticeSessionSubView } from "../study/views/PracticeSessionSubView";
import { QuizScreenSubView } from "../study/views/QuizScreenSubView";
import { ResultsScreenSubView } from "../study/views/ResultsScreenSubView";
import { WeakTopicsSubView } from "../study/views/WeakTopicsSubView";
import { RecommendedResourcesSubView } from "../study/views/RecommendedResourcesSubView";
import { LearningHistorySubView } from "../study/views/LearningHistorySubView";

import { 
  BookOpen, 
  Workflow, 
  RotateCcw, 
  Zap, 
  Award, 
  AlertTriangle, 
  Bookmark, 
  History, 
  Home, 
  Compass 
} from "lucide-react";

interface StudyCoachViewProps {
  userProfile: UserProfile;
}

export type StudySubTab = 
  | "home"
  | "library"
  | "roadmap"
  | "topic-detail"
  | "flashcards"
  | "practice"
  | "quiz"
  | "results"
  | "weak-topics"
  | "resources"
  | "history";

export const StudyCoachView: React.FC<StudyCoachViewProps> = ({ userProfile }) => {
  const [activeSubTab, setActiveSubTab] = useState<StudySubTab>("home");
  
  // State Entities
  const [subjects, setSubjects] = useState<StudySubject[]>(initialStudySubjects);
  const [milestones, setMilestones] = useState<LearningMilestone[]>(initialMilestones);
  const [activeTopic, setActiveTopic] = useState<TopicDetailItem>(sampleTopicDetail);
  const [flashcards, setFlashcards] = useState<StudyFlashcardItem[]>(initialStudyFlashcards);
  const [practiceQuestions, setPracticeQuestions] = useState<PracticeQuestionItem[]>(initialPracticeQuestions);
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestionItem[]>(initialQuizQuestions);
  const [quizResult, setQuizResult] = useState<QuizResultData>(sampleQuizResult);
  const [weakTopics, setWeakTopics] = useState<WeakTopicItem[]>(initialWeakTopics);
  const [resources, setResources] = useState<StudyResourceItem[]>(initialStudyResources);
  const [history, setHistory] = useState<LearningHistoryRecord[]>(initialLearningHistory);
  const [dailyGoal, setDailyGoal] = useState<DailyGoalData>(initialDailyGoal);
  const [weeklyActivity, setWeeklyActivity] = useState<WeeklyActivityData[]>(initialWeeklyActivity);
  const [quote] = useState<MotivationalQuoteData>(motivationalQuotes[0]);
  const [badges] = useState<AchievementBadgeData[]>(initialAchievementBadges);

  // Sub-navigation handlers
  const handleNavigateToSubView = (subTab: string, payload?: any) => {
    if (subTab === "topic-detail" && payload) {
      setActiveTopic({
        ...sampleTopicDetail,
        subjectName: payload.name || sampleTopicDetail.subjectName,
        title: `${payload.name} Core Architecture & Concurrent State`,
      });
    }
    setActiveSubTab(subTab as StudySubTab);
  };

  const handleToggleFavoriteSubject = (id: string) => {
    setSubjects((prev) =>
      prev.map((s) => (s.id === id ? { ...s, isFavorite: !s.isFavorite } : s))
    );
  };

  const handleToggleSaveResource = (id: string) => {
    setResources((prev) =>
      prev.map((r) => (r.id === id ? { ...r, isSaved: !r.isSaved } : r))
    );
  };

  const handleToggleBookmarkResource = (id: string) => {
    setResources((prev) =>
      prev.map((r) => (r.id === id ? { ...r, isBookmarked: !r.isBookmarked } : r))
    );
  };

  const handleFinishQuiz = (score: number, correct: number, total: number, answers: number[]) => {
    const newResult: QuizResultData = {
      id: `qr-${Date.now()}`,
      date: "Just now",
      subjectName: activeTopic.subjectName,
      topicName: activeTopic.title,
      overallScore: score,
      correctAnswers: correct,
      wrongAnswers: total - correct,
      accuracy: score,
      avgTimeSeconds: 38,
      topicPerformance: [
        { topic: "Core Architecture Concepts", score },
        { topic: "State Synchronization", score: Math.max(70, score - 5) },
      ],
      improvementSuggestions: [
        "Review vector clock garbage collection mechanics.",
        "Practice asynchronous error handling in custom state hooks.",
      ],
    };
    setQuizResult(newResult);
    setActiveSubTab("results");
  };

  // Sub-navigation bar tabs
  const subNavItems = [
    { id: "home", label: "Study Home", icon: <Home className="w-3.5 h-3.5" /> },
    { id: "library", label: "Subjects", icon: <BookOpen className="w-3.5 h-3.5" /> },
    { id: "roadmap", label: "Roadmap", icon: <Workflow className="w-3.5 h-3.5" /> },
    { id: "flashcards", label: "Flashcards", icon: <RotateCcw className="w-3.5 h-3.5" /> },
    { id: "practice", label: "Practice", icon: <Zap className="w-3.5 h-3.5" /> },
    { id: "quiz", label: "Quiz", icon: <Award className="w-3.5 h-3.5" /> },
    { id: "weak-topics", label: "Weak Topics", icon: <AlertTriangle className="w-3.5 h-3.5" /> },
    { id: "resources", label: "Resources", icon: <Bookmark className="w-3.5 h-3.5" /> },
    { id: "history", label: "History", icon: <History className="w-3.5 h-3.5" /> },
  ];

  return (
    <div className="space-y-6">
      
      {/* Secondary Study Module Navigation Bar */}
      <div className="p-2 bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-2xl shadow-craft overflow-x-auto">
        <div className="relative flex items-center space-x-1 min-w-max">
          {subNavItems.map((item) => {
            const isActive = activeSubTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveSubTab(item.id as StudySubTab)}
                className={`relative px-3 py-2 rounded-xl text-xs font-mono font-medium transition-colors flex items-center space-x-2 z-10 ${
                  isActive
                    ? "text-[var(--bg-app)] font-bold"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)]"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="studyActiveTabIndicator"
                    className="absolute inset-0 bg-[var(--accent)] rounded-xl -z-10 shadow-xs"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Render Active Subview with Tab Transitions */}
      <AnimatePresence mode="wait">
        {activeSubTab === "home" && (
          <TabTransition activeKey="home">
            <StudyHomeSubView
              userProfile={userProfile}
              subjects={subjects}
              dailyGoal={dailyGoal}
              weeklyActivity={weeklyActivity}
              quote={quote}
              upcomingMilestone={milestones[1] || milestones[0]}
              onNavigateToSubView={handleNavigateToSubView}
              onToggleFavoriteSubject={handleToggleFavoriteSubject}
            />
          </TabTransition>
        )}

        {activeSubTab === "library" && (
          <TabTransition activeKey="library">
            <SubjectLibrarySubView
              subjects={subjects}
              onSelectSubject={(subj) => handleNavigateToSubView("topic-detail", subj)}
              onToggleFavoriteSubject={handleToggleFavoriteSubject}
            />
          </TabTransition>
        )}

        {activeSubTab === "roadmap" && (
          <TabTransition activeKey="roadmap">
            <LearningRoadmapSubView
              milestones={milestones}
              onStartPractice={() => handleNavigateToSubView("practice")}
              onStartQuiz={() => handleNavigateToSubView("quiz")}
            />
          </TabTransition>
        )}

        {activeSubTab === "topic-detail" && (
          <TabTransition activeKey="topic-detail">
            <TopicDetailSubView
              topic={activeTopic}
              onStartPractice={() => handleNavigateToSubView("practice")}
              onStartQuiz={() => handleNavigateToSubView("quiz")}
              onBackToLibrary={() => handleNavigateToSubView("library")}
            />
          </TabTransition>
        )}

        {activeSubTab === "flashcards" && (
          <TabTransition activeKey="flashcards">
            <FlashcardsSubView
              cards={flashcards}
              onCompleteSession={() => handleNavigateToSubView("home")}
            />
          </TabTransition>
        )}

        {activeSubTab === "practice" && (
          <TabTransition activeKey="practice">
            <PracticeSessionSubView
              questions={practiceQuestions}
              onCompletePractice={() => handleNavigateToSubView("home")}
            />
          </TabTransition>
        )}

        {activeSubTab === "quiz" && (
          <TabTransition activeKey="quiz">
            <QuizScreenSubView
              questions={quizQuestions}
              subjectName={activeTopic.subjectName}
              topicName={activeTopic.title}
              onFinishQuiz={handleFinishQuiz}
            />
          </TabTransition>
        )}

        {activeSubTab === "results" && (
          <TabTransition activeKey="results">
            <ResultsScreenSubView
              result={quizResult}
              onRetry={() => handleNavigateToSubView("quiz")}
              onContinue={() => handleNavigateToSubView("home")}
            />
          </TabTransition>
        )}

        {activeSubTab === "weak-topics" && (
          <TabTransition activeKey="weak-topics">
            <WeakTopicsSubView
              weakTopics={weakTopics}
              onStartPractice={() => handleNavigateToSubView("practice")}
            />
          </TabTransition>
        )}

        {activeSubTab === "resources" && (
          <TabTransition activeKey="resources">
            <RecommendedResourcesSubView
              resources={resources}
              onToggleSaveResource={handleToggleSaveResource}
              onToggleBookmarkResource={handleToggleBookmarkResource}
            />
          </TabTransition>
        )}

        {activeSubTab === "history" && (
          <TabTransition activeKey="history">
            <LearningHistorySubView
              history={history}
              badges={badges}
            />
          </TabTransition>
        )}
      </AnimatePresence>

    </div>
  );
};
