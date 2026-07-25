import React from "react";
import { UserProfile } from "../../../types";
import { MockSessionRecord, sampleQuestionsPool } from "../../../data/interviewData";
import { Card, Button, Badge } from "../../DesignSystem";
import { InterviewCard } from "../InterviewCard";
import { RecommendationCard } from "../RecommendationCard";
import { InterviewResultCard } from "../InterviewResultCard";
import { 
  FileText, 
  BrainCircuit, 
  Target, 
  Zap, 
  Sparkles, 
  Clock, 
  TrendingUp, 
  ArrowRight, 
  Flame,
  Award
} from "lucide-react";

interface InterviewHomeSubViewProps {
  userProfile: UserProfile;
  interviewHistory: MockSessionRecord[];
  onStartSetup: (presetType?: string) => void;
  onViewReport: (session: MockSessionRecord) => void;
  onRetakeSession: (session: MockSessionRecord) => void;
}

export const InterviewHomeSubView: React.FC<InterviewHomeSubViewProps> = ({
  userProfile,
  interviewHistory,
  onStartSetup,
  onViewReport,
  onRetakeSession,
}) => {
  const lastSession = interviewHistory[0];

  const presetCards = [
    {
      title: "Resume & JD Tailored Interview",
      description: "Generates custom system design and behavioral questions based on your parsed work history and target JD.",
      type: "Resume" as const,
      durationMinutes: 30,
      difficulty: "Adaptive" as const,
      icon: <FileText className="w-5 h-5" />,
      action: () => onStartSetup("Resume"),
    },
    {
      title: "Topic Deep-Dive Drill",
      description: "Target specific weak domains like Distributed Rate Limiters, React 18 Concurrent Hooks, or Consensus Protocols.",
      type: "Topic" as const,
      durationMinutes: 20,
      difficulty: "Hard" as const,
      icon: <Zap className="w-5 h-5" />,
      action: () => onStartSetup("Topic"),
    },
    {
      title: "Target Job Role Simulation",
      description: "Standardized interview battery modeled on Stripe, OpenAI, or Google hiring loops for your role.",
      type: "Job Role" as const,
      durationMinutes: 45,
      difficulty: "Adaptive" as const,
      icon: <Target className="w-5 h-5" />,
      action: () => onStartSetup("Job Role"),
    },
    {
      title: "Full Committee Mock Interview",
      description: "Multi-stage simulated hiring loop featuring 4 questions covering Architecture, Coding, and STAR Behavioral.",
      type: "Mock" as const,
      durationMinutes: 45,
      difficulty: "Hard" as const,
      icon: <BrainCircuit className="w-5 h-5" />,
      action: () => onStartSetup("Mock"),
    },
    {
      title: "10-Min Speed Practice Drill",
      description: "Rapid-fire 2 question scenario designed to build crisp verbal articulation under strict clock pressure.",
      type: "Practice" as const,
      durationMinutes: 10,
      difficulty: "Medium" as const,
      icon: <Flame className="w-5 h-5" />,
      action: () => onStartSetup("Practice"),
    },
  ];

  return (
    <div className="space-y-8">
      
      {/* Welcome & Streak Banner */}
      <Card className="bg-gradient-to-r from-[var(--bg-surface)] to-[var(--bg-app)] border border-[var(--border-color)]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--success)] animate-pulse" />
              <span className="text-xs font-mono font-bold text-[var(--text-secondary)] uppercase tracking-wider">
                ASCEND AI Interview Suite
              </span>
              <Badge variant="accent">Tier 1 Calibrated</Badge>
            </div>
            <h1 className="text-2xl font-extrabold font-heading text-[var(--text-primary)] tracking-tight">
              Welcome back, {userProfile.name.split(" ")[0] || "Candidate"}
            </h1>
            <p className="text-xs font-body text-[var(--text-secondary)] leading-relaxed">
              Targeting <span className="font-bold text-[var(--text-primary)]">{userProfile.targetRole}</span> standards for <span className="font-bold text-[var(--text-primary)]">{userProfile.companyTier.split("(")[0]}</span>. Practice one question at a time in a calm, distraction-free environment.
            </p>
          </div>

          <div className="flex items-center space-x-4 shrink-0 pt-4 md:pt-0 border-t md:border-t-0 border-[var(--border-color)]">
            <div className="text-right">
              <div className="text-3xl font-extrabold font-numbers text-[var(--text-primary)]">
                {userProfile.readinessScore}%
              </div>
              <div className="text-[10px] text-[var(--text-secondary)] font-mono uppercase tracking-wider">Interview Readiness</div>
            </div>

            <Button
              onClick={() => onStartSetup()}
              variant="accent"
              size="lg"
              icon={<BrainCircuit className="w-4 h-4" />}
            >
              Configure New Session
            </Button>
          </div>
        </div>
      </Card>

      {/* Continue Last Session Banner */}
      {lastSession && (
        <div className="p-5 bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-2xl shadow-craft flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2 text-xs">
              <Badge variant="secondary">In Progress / Continue</Badge>
              <span className="text-xs text-[var(--text-secondary)] font-mono">Last session: {lastSession.date}</span>
            </div>
            <h3 className="text-sm font-bold font-heading text-[var(--text-primary)]">
              {lastSession.role} • {lastSession.type} Drill
            </h3>
            <p className="text-xs text-[var(--text-secondary)]">
              Last score: <span className="font-bold text-[var(--text-primary)]">{lastSession.overallScore}/100</span> ({lastSession.readinessVerdict})
            </p>
          </div>

          <Button
            onClick={() => onViewReport(lastSession)}
            variant="outline"
            size="sm"
            icon={<ArrowRight className="w-3.5 h-3.5" />}
          >
            Review Last Report
          </Button>
        </div>
      )}

      {/* Interview Types Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold font-heading text-[var(--text-primary)] flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-[var(--accent)]" />
            <span>Select Interview Practice Mode</span>
          </h2>
          <span className="text-xs font-mono text-[var(--text-secondary)]">5 Specialized Engines</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {presetCards.map((card, idx) => (
            <InterviewCard
              key={idx}
              title={card.title}
              description={card.description}
              type={card.type}
              durationMinutes={card.durationMinutes}
              difficulty={card.difficulty}
              icon={card.icon}
              onLaunch={card.action}
            />
          ))}
        </div>
      </div>

      {/* Recent Scores & AI Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Recent Scores List (2 Cols) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold font-heading text-[var(--text-primary)] flex items-center space-x-2">
              <Award className="w-4 h-4 text-[var(--accent)]" />
              <span>Previous Interview Sessions</span>
            </h2>
            <span className="text-xs font-mono text-[var(--text-secondary)]">
              {interviewHistory.length} Recorded
            </span>
          </div>

          <div className="space-y-3">
            {interviewHistory.slice(0, 3).map((session) => (
              <InterviewResultCard
                key={session.id}
                session={session}
                onViewReport={onViewReport}
                onRetake={onRetakeSession}
              />
            ))}
          </div>
        </div>

        {/* AI Recommendations Column (1 Col) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold font-heading text-[var(--text-primary)] flex items-center space-x-2">
              <Zap className="w-4 h-4 text-[var(--secondary-accent)]" />
              <span>AI Recommendations</span>
            </h2>
          </div>

          <div className="space-y-3">
            <RecommendationCard
              title="Practice Conflict-Free Replicated Data Types (CRDTs)"
              description="Your offline architecture score increased, but adding state synchronization logic will boost your overall score to 95%+."
              impactScore="+4% Readiness"
              category="Architecture Upgrade"
              onAction={() => onStartSetup("Topic")}
            />

            <RecommendationCard
              title="Refine STAR Quantified Outcomes"
              description="In behavioral questions, always end with concrete metrics (e.g. 'reduced p99 latency by 35%')."
              impactScore="+5% Communication"
              category="Behavioral Polish"
              onAction={() => onStartSetup("Behavioral")}
            />
          </div>
        </div>

      </div>

    </div>
  );
};
