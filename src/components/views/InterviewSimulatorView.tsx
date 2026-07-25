import React, { useState } from "react";
import { UserProfile, InterviewSession } from "../../types";
import { PageTransition } from "../DesignSystem";

import { MockSessionRecord, initialInterviewHistory, sampleQuestionsPool } from "../../data/interviewData";
import { InterviewHomeSubView } from "../interview/views/InterviewHomeSubView";
import { InterviewSetupSubView, SetupConfig } from "../interview/views/InterviewSetupSubView";
import { VoiceInterviewScreenSubView } from "../interview/views/VoiceInterviewScreenSubView";
import { QuestionEvaluationSubView } from "../interview/views/QuestionEvaluationSubView";
import { InterviewSummarySubView } from "../interview/views/InterviewSummarySubView";
import { InterviewHistorySubView } from "../interview/views/InterviewHistorySubView";

import { Home, Sliders, Mic, Award, History, LayoutDashboard } from "lucide-react";

interface InterviewSimulatorViewProps {
  userProfile: UserProfile;
  onSaveSession: (session: InterviewSession) => void;
}

export type InterviewSubViewMode = 
  | "home" 
  | "setup" 
  | "voice" 
  | "evaluation" 
  | "summary" 
  | "history";

export const InterviewSimulatorView: React.FC<InterviewSimulatorViewProps> = ({
  userProfile,
  onSaveSession,
}) => {
  const [currentMode, setCurrentMode] = useState<InterviewSubViewMode>("home");
  const [presetType, setPresetType] = useState<string>("Technical");

  // State for history records
  const [interviewHistory, setInterviewHistory] = useState<MockSessionRecord[]>(initialInterviewHistory);

  // Active Session Config
  const [activeConfig, setActiveConfig] = useState<SetupConfig>({
    type: "Technical",
    difficulty: "Adaptive",
    durationMinutes: 30,
    jobRole: userProfile.targetRole,
    selectedSkills: ["System Design & Scale", "STAR Behavioral Leadership"],
    experienceLevel: "Senior",
  });

  // Current session results & evaluation
  const [activeSessionRecord, setActiveSessionRecord] = useState<MockSessionRecord>(initialInterviewHistory[0]);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);

  // Current Evaluation State
  const [lastEvaluation, setLastEvaluation] = useState({
    overallScore: 92,
    technicalAccuracy: 94,
    communicationScore: 90,
    confidenceScore: 92,
    explanationQuality: 91,
    missingConcepts: ["CRDT Vector Clocks", "Selective Hydration Boundary"],
    aiSuggestions: [
      "Quantify STAR outcomes with concrete metrics (e.g. reduced p99 latency by 35%).",
      "Mention RocksDB Leveled Compaction under write surges.",
    ],
    betterSampleAnswer: "In designing an offline-first real-time sync engine, I would decouple persistent storage via IndexedDB and maintain an in-memory Zustand queue. Mutations write locally with UUID idempotency keys and sync asynchronously over WebSockets with vector clock conflict resolution...",
    strengths: [
      "Outstanding system decomposition and offline storage queue design",
      "Deep understanding of React 18 concurrent scheduling and lane prioritization",
    ],
    weaknesses: [
      "Elaborate more on CRDTs (Conflict-free Replicated Data Types)",
      "Ensure Chrome DevTools memory profiling tools are explicitly cited",
    ],
    nextDifficultyRecommendation: "Escalating to Hard: Distributed Consensus & Raft",
  });

  // Handlers
  const handleStartSetup = (preset?: string) => {
    if (preset) setPresetType(preset);
    setCurrentMode("setup");
  };

  const handleStartSession = (config: SetupConfig) => {
    setActiveConfig(config);
    setCurrentQuestionIdx(0);
    setCurrentMode("voice");
  };

  const handleCompleteQuestion = (transcript: string, timeSpentSeconds: number) => {
    // Generate evaluation based on performance
    const score = Math.floor(Math.random() * 15) + 84; // 84-98
    setLastEvaluation((prev) => ({
      ...prev,
      overallScore: score,
      technicalAccuracy: score + 1 > 100 ? 98 : score + 1,
    }));
    setCurrentMode("evaluation");
  };

  const handleNextQuestionOrSummary = () => {
    if (currentQuestionIdx < 2) {
      setCurrentQuestionIdx((prev) => prev + 1);
      setCurrentMode("voice");
    } else {
      // Build final session summary record
      const finalRecord: MockSessionRecord = {
        id: "session-" + Date.now(),
        date: new Date().toISOString().split("T")[0],
        role: activeConfig.jobRole,
        companyTier: userProfile.companyTier,
        type: activeConfig.type,
        difficulty: activeConfig.difficulty,
        durationMinutes: activeConfig.durationMinutes,
        totalQuestions: 3,
        answeredQuestions: 3,
        skippedQuestions: 0,
        avgResponseTimeSeconds: 145,
        overallScore: 91,
        readinessVerdict: "Strong Hire",
        categoryScores: {
          systemArchitecture: 94,
          codingAlgorithms: 88,
          behavioralSTAR: 90,
          communication: 92,
          problemDecomposition: 91,
        },
        questionsList: sampleQuestionsPool.map((q) => ({
          id: q.id,
          question: q.question,
          category: q.category,
          score: Math.floor(Math.random() * 10) + 88,
          responseTimeSeconds: 140,
          skipped: false,
          userAnswer: q.defaultTranscriptSample,
          feedback: "Solid structure and clear architectural trade-off analysis.",
        })),
        strengths: [
          "Crisp articulation of distributed systems trade-offs",
          "Strong STAR format leadership examples",
        ],
        weaknesses: [
          "Elaborate more on memory profiling tools under high load",
        ],
        recommendedLearningPath: [
          "Master Conflict-free Replicated Data Types (CRDTs)",
          "Review RocksDB write-ahead log durability guarantees",
        ],
      };

      setActiveSessionRecord(finalRecord);
      setInterviewHistory((prev) => [finalRecord, ...prev]);

      // Notify parent app
      const legacySession: InterviewSession = {
        id: finalRecord.id,
        date: finalRecord.date,
        role: finalRecord.role,
        companyTier: finalRecord.companyTier,
        mode: "System Architecture",
        question: sampleQuestionsPool[0].question,
        userAnswer: sampleQuestionsPool[0].defaultTranscriptSample,
        overallScore: finalRecord.overallScore,
        breakdown: {
          clarityAndStructure: 92,
          technicalDepth: 94,
          problemDecomposition: 90,
          edgeCaseCoverage: 88,
        },
        strengths: finalRecord.strengths,
        gaps: finalRecord.weaknesses,
        suggestedUpgrade: lastEvaluation.betterSampleAnswer,
        durationSeconds: finalRecord.durationMinutes * 60,
      };
      onSaveSession(legacySession);

      setCurrentMode("summary");
    }
  };

  const handleViewReport = (session: MockSessionRecord) => {
    setActiveSessionRecord(session);
    setCurrentMode("summary");
  };

  const handleRetakeSession = (session: MockSessionRecord) => {
    setActiveConfig({
      type: session.type,
      difficulty: session.difficulty,
      durationMinutes: session.durationMinutes,
      jobRole: session.role,
      selectedSkills: ["System Design", "Algorithms"],
      experienceLevel: "Senior",
    });
    setCurrentMode("setup");
  };

  return (
    <PageTransition className="space-y-6">
      
      {/* Secondary Top Sub-Navigation Bar for Interview Module */}
      <div className="flex items-center justify-between p-2 bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-2xl shadow-craft overflow-x-auto">
        <div className="flex items-center space-x-1">
          <button
            onClick={() => setCurrentMode("home")}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-mono font-medium transition-colors ${
              currentMode === "home"
                ? "bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] border border-[var(--border-color)] shadow-xs"
                : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
          >
            <Home className="w-3.5 h-3.5 text-[var(--accent)]" />
            <span>Interview Home</span>
          </button>

          <button
            onClick={() => setCurrentMode("setup")}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-mono font-medium transition-colors ${
              currentMode === "setup"
                ? "bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] border border-[var(--border-color)] shadow-xs"
                : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
          >
            <Sliders className="w-3.5 h-3.5 text-[var(--accent)]" />
            <span>Setup Loop</span>
          </button>

          <button
            onClick={() => setCurrentMode("voice")}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-mono font-medium transition-colors ${
              currentMode === "voice"
                ? "bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] border border-[var(--border-color)] shadow-xs"
                : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
          >
            <Mic className="w-3.5 h-3.5 text-[var(--error)]" />
            <span>Voice Stage</span>
          </button>

          <button
            onClick={() => setCurrentMode("evaluation")}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-mono font-medium transition-colors ${
              currentMode === "evaluation"
                ? "bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] border border-[var(--border-color)] shadow-xs"
                : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
          >
            <Award className="w-3.5 h-3.5 text-[var(--secondary-accent)]" />
            <span>Evaluation</span>
          </button>

          <button
            onClick={() => setCurrentMode("summary")}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-mono font-medium transition-colors ${
              currentMode === "summary"
                ? "bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] border border-[var(--border-color)] shadow-xs"
                : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5 text-[var(--success)]" />
            <span>Summary</span>
          </button>

          <button
            onClick={() => setCurrentMode("history")}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-mono font-medium transition-colors ${
              currentMode === "history"
                ? "bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] border border-[var(--border-color)] shadow-xs"
                : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
          >
            <History className="w-3.5 h-3.5 text-[var(--accent)]" />
            <span>Archives</span>
          </button>
        </div>
      </div>

      {/* View Switcher */}
      {currentMode === "home" && (
        <InterviewHomeSubView
          userProfile={userProfile}
          interviewHistory={interviewHistory}
          onStartSetup={handleStartSetup}
          onViewReport={handleViewReport}
          onRetakeSession={handleRetakeSession}
        />
      )}

      {currentMode === "setup" && (
        <InterviewSetupSubView
          userProfile={userProfile}
          initialPresetType={presetType}
          onCancel={() => setCurrentMode("home")}
          onStartSession={handleStartSession}
        />
      )}

      {currentMode === "voice" && (
        <VoiceInterviewScreenSubView
          config={activeConfig}
          onCompleteQuestion={handleCompleteQuestion}
          onEndInterviewEarly={() => setCurrentMode("home")}
        />
      )}

      {currentMode === "evaluation" && (
        <QuestionEvaluationSubView
          evaluation={lastEvaluation}
          onNextQuestion={handleNextQuestionOrSummary}
          onRetryQuestion={() => setCurrentMode("voice")}
          isLastQuestion={currentQuestionIdx >= 2}
        />
      )}

      {currentMode === "summary" && (
        <InterviewSummarySubView
          session={activeSessionRecord}
          onRetryInterview={() => handleRetakeSession(activeSessionRecord)}
          onDone={() => setCurrentMode("home")}
        />
      )}

      {currentMode === "history" && (
        <InterviewHistorySubView
          interviewHistory={interviewHistory}
          onViewReport={handleViewReport}
          onRetakeSession={handleRetakeSession}
        />
      )}

    </PageTransition>
  );
};
