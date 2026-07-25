import React, { useState } from "react";
import { UserProfile, SkillNode, InterviewSession, Flashcard } from "../../types";
import { Card, Button, Badge, SectionHeader, AnimatedProgressBar } from "../DesignSystem";
import { 
  StaggerContainer, 
  StaggerItem, 
  FadeInSection, 
  FloatingElement, 
  MotionCard,
  CountUpNumber 
} from "../motion";
import { Tooltip } from "../Tooltip";
import { DashboardSkeleton } from "./DashboardSkeleton";
import { 
  TrendingUp, 
  BrainCircuit, 
  Zap, 
  Clock, 
  Flame, 
  ChevronRight,
  Sparkles,
  CheckCircle2,
  Award,
  AlertCircle,
  BarChart3,
  RotateCcw
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface DashboardViewProps {
  userProfile: UserProfile;
  skillNodes: SkillNode[];
  interviewSessions: InterviewSession[];
  flashcards: Flashcard[];
  onNavigateTab: (tabName: string) => void;
  onStartInterview: () => void;
  isLoading?: boolean;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  userProfile,
  interviewSessions,
  flashcards,
  onNavigateTab,
  onStartInterview,
  isLoading = false,
}) => {
  if (isLoading) {
    return <DashboardSkeleton />;
  }

  const dueFlashcards = flashcards.filter(f => f.intervalDays <= 4);

  // Today's agenda completed state tracking
  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>({});

  const toggleTask = (taskId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setCompletedTasks((prev) => ({
      ...prev,
      [taskId]: !prev[taskId],
    }));
  };

  const metrics = [
    { label: "System Design", score: userProfile.targetMetrics.systemDesign, tooltip: "Based on distributed architecture & tradeoff evaluations" },
    { label: "Algorithms & Logic", score: userProfile.targetMetrics.codingAlgorithms, tooltip: "Time & space complexity precision score" },
    { label: "Behavioral STAR", score: userProfile.targetMetrics.behavioralSTAR, tooltip: "Structure, impact quantification & leadership signal" },
    { label: "Domain Architecture", score: userProfile.targetMetrics.domainArchitecture, tooltip: "Specialized knowledge in target role requirements" },
    { label: "Communication Clarity", score: userProfile.targetMetrics.communicationClarity, tooltip: "Conciseness and articulation during live simulations" },
  ];

  return (
    <div className="space-y-8">
      
      {/* Hero Overview Header - Staggered progressive entry */}
      <StaggerContainer className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Readiness Gauge Card */}
        <StaggerItem className="lg:col-span-2">
          <Card className="h-full flex flex-col justify-between relative overflow-hidden group">
            {/* Ambient subtle glow background */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--accent)]/5 rounded-full blur-3xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-[var(--success)] animate-pulse" />
                  <Tooltip content="Live candidate evaluation score relative to target tier standards">
                    <span className="text-xs font-mono font-medium text-[var(--text-secondary)] uppercase tracking-wider cursor-help">
                      Real-Time Readiness Benchmark
                    </span>
                  </Tooltip>
                </div>
                <Badge variant="accent">
                  Target: {userProfile.companyTier.split("(")[0]}
                </Badge>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-baseline space-y-2 sm:space-y-0 sm:space-x-6 mb-8">
                <div className="text-6xl font-extrabold font-numbers text-[var(--text-primary)] tracking-tight">
                  <CountUpNumber value={userProfile.readinessScore} suffix="%" />
                </div>
                <div className="flex flex-col space-y-0.5">
                  <span className="text-xs font-mono font-bold text-[var(--success)] flex items-center">
                    <TrendingUp className="w-3.5 h-3.5 mr-1" />
                    +4.2% vs last week
                  </span>
                  <span className="text-xs text-[var(--text-secondary)]">
                    Top 12% percentile among candidates for {userProfile.targetRole}
                  </span>
                </div>
              </div>

              {/* Metric Bars with AnimatedProgressBar */}
              <div className="space-y-3.5">
                {metrics.map((m) => (
                  <div key={m.label} className="space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <Tooltip content={m.tooltip} position="top">
                        <span className="text-[var(--text-primary)] font-medium cursor-help hover:text-[var(--accent)] transition-colors">
                          {m.label}
                        </span>
                      </Tooltip>
                      <span className="font-numbers font-semibold text-[var(--text-primary)]">
                        <CountUpNumber value={m.score} suffix="%" />
                      </span>
                    </div>
                    <AnimatedProgressBar
                      value={m.score}
                      height="h-2"
                      barColor={
                        m.score >= 85
                          ? "bg-[var(--success)]"
                          : m.score >= 70
                          ? "bg-[var(--accent)]"
                          : "bg-[var(--error)]"
                      }
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-[var(--border-color)]/60 flex items-center justify-between text-xs text-[var(--text-secondary)]">
              <div className="flex items-center space-x-1.5">
                <FloatingElement yOffset={3} duration={4}>
                  <Sparkles className="w-3.5 h-3.5 text-[var(--accent)]" />
                </FloatingElement>
                <span>Adaptive AI recalibrates daily based on evaluation signals</span>
              </div>
              <motion.button 
                whileHover={{ x: 3 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => onNavigateTab("analytics")}
                className="text-[var(--text-primary)] font-mono hover:text-[var(--accent)] transition-colors flex items-center font-medium cursor-pointer"
              >
                Analytics <ChevronRight className="w-3 h-3 ml-0.5" />
              </motion.button>
            </div>
          </Card>
        </StaggerItem>

        {/* Weekly Goal & Practice Velocity Card */}
        <StaggerItem>
          <Card className="h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono font-medium text-[var(--text-secondary)] uppercase tracking-wider">
                  Practice Velocity
                </span>
                <Tooltip content={`${userProfile.currentStreakDays} days active streak!`}>
                  <Badge variant="accent" icon={
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                    >
                      <Flame className="w-3 h-3 fill-[var(--accent)] text-[var(--accent)]" />
                    </motion.div>
                  }>
                    <CountUpNumber value={userProfile.currentStreakDays} suffix="d Streak" />
                  </Badge>
                </Tooltip>
              </div>

              <div className="space-y-5">
                <div>
                  <div className="flex items-baseline justify-between mb-1.5">
                    <span className="text-3xl font-extrabold font-numbers text-[var(--text-primary)]">
                      <CountUpNumber value={userProfile.completedHoursThisWeek} decimals={1} suffix=" hrs" />
                    </span>
                    <span className="text-xs text-[var(--text-secondary)] font-mono">
                      of {userProfile.weeklyGoalHours} hrs goal
                    </span>
                  </div>
                  <AnimatedProgressBar
                    value={Math.min(100, Math.round((userProfile.completedHoursThisWeek / userProfile.weeklyGoalHours) * 100))}
                    height="h-2.5"
                  />
                </div>

                <div className="p-4 bg-[var(--bg-app)] rounded-xl border border-[var(--border-color)] space-y-2 text-xs">
                  <div className="flex items-center justify-between text-[var(--text-primary)] font-medium">
                    <span>Days Until Target Interview</span>
                    <span className="font-numbers font-bold text-[var(--text-primary)]">52 Days</span>
                  </div>
                  <div className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
                    Recommended pace: ~1.5 hours/day to achieve 92%+ readiness target.
                  </div>
                </div>
              </div>
            </div>

            <Button
              onClick={onStartInterview}
              variant="primary"
              size="lg"
              className="w-full mt-6"
              icon={<BrainCircuit className="w-4 h-4" />}
            >
              Launch Mock Interview
            </Button>
          </Card>
        </StaggerItem>
      </StaggerContainer>

      {/* Recommended Adaptive Agenda */}
      <FadeInSection>
        <Card>
          <SectionHeader
            title="Adaptive Practice Agenda for Today"
            description="AI-selected exercises to maximize memory retention and target your highest impact weak points."
            icon={<Zap className="w-5 h-5 text-[var(--accent)]" />}
            badge="3 Priorities"
          />

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">
            
            {/* Item 1: Mock Interview Drill */}
            <StaggerItem>
              <MotionCard
                onClick={onStartInterview}
                className={`p-5 bg-[var(--bg-app)] hover:bg-[var(--bg-hover)] border transition-all duration-200 rounded-xl cursor-pointer group shadow-xs flex flex-col justify-between h-full ${
                  completedTasks["task-1"]
                    ? "border-[var(--success)]/40 opacity-75"
                    : "border-[var(--border-color)] hover:border-[var(--accent)]/50"
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Badge variant={completedTasks["task-1"] ? "success" : "accent"}>
                      {completedTasks["task-1"] ? "COMPLETED" : "SIMULATOR DRILL"}
                    </Badge>
                    <div className="flex items-center space-x-2">
                      <span className="text-[11px] text-[var(--text-secondary)] font-mono flex items-center">
                        <Clock className="w-3 h-3 mr-1 text-[var(--accent)]" /> 15 mins
                      </span>
                      <button
                        onClick={(e) => toggleTask("task-1", e)}
                        className="p-1 rounded text-[var(--text-secondary)] hover:text-[var(--success)] transition-colors"
                        title={completedTasks["task-1"] ? "Mark incomplete" : "Mark as completed"}
                      >
                        <CheckCircle2 className={`w-4 h-4 ${completedTasks["task-1"] ? "text-[var(--success)] fill-[var(--success)]/10" : ""}`} />
                      </button>
                    </div>
                  </div>
                  <h4 className={`text-sm font-bold font-heading transition-colors ${completedTasks["task-1"] ? "line-through text-[var(--text-secondary)]" : "text-[var(--text-primary)] group-hover:text-[var(--accent)]"}`}>
                    Distributed Rate Limiter Scenario
                  </h4>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed line-clamp-2">
                    Practice multi-region rate limiting logic, sliding window memory formulas, and split-brain fallback.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[var(--border-color)]/50 flex items-center text-xs font-mono text-[var(--text-primary)] font-medium">
                  <span>{completedTasks["task-1"] ? "Review Session" : "Start Session"}</span>
                  <ChevronRight className="w-3.5 h-3.5 ml-1 text-[var(--accent)] group-hover:translate-x-1 transition-transform" />
                </div>
              </MotionCard>
            </StaggerItem>

            {/* Item 2: Flashcards Due */}
            <StaggerItem>
              <MotionCard 
                onClick={() => onNavigateTab("flashcards")}
                className={`p-5 bg-[var(--bg-app)] hover:bg-[var(--bg-hover)] border transition-all duration-200 rounded-xl cursor-pointer group shadow-xs flex flex-col justify-between h-full ${
                  completedTasks["task-2"]
                    ? "border-[var(--success)]/40 opacity-75"
                    : "border-[var(--border-color)] hover:border-[var(--accent)]/50"
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Badge variant={completedTasks["task-2"] ? "success" : "secondary"}>
                      {completedTasks["task-2"] ? "COMPLETED" : `SPACED RECALL (${dueFlashcards.length} DUE)`}
                    </Badge>
                    <div className="flex items-center space-x-2">
                      <span className="text-[11px] text-[var(--text-secondary)] font-mono flex items-center">
                        <Clock className="w-3 h-3 mr-1 text-[var(--secondary-accent)]" /> 8 mins
                      </span>
                      <button
                        onClick={(e) => toggleTask("task-2", e)}
                        className="p-1 rounded text-[var(--text-secondary)] hover:text-[var(--success)] transition-colors"
                        title={completedTasks["task-2"] ? "Mark incomplete" : "Mark as completed"}
                      >
                        <CheckCircle2 className={`w-4 h-4 ${completedTasks["task-2"] ? "text-[var(--success)] fill-[var(--success)]/10" : ""}`} />
                      </button>
                    </div>
                  </div>
                  <h4 className={`text-sm font-bold font-heading transition-colors ${completedTasks["task-2"] ? "line-through text-[var(--text-secondary)]" : "text-[var(--text-primary)] group-hover:text-[var(--secondary-accent)]"}`}>
                    High-Yield Architecture Flashcards
                  </h4>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed line-clamp-2">
                    Saga vs 2PC transactions, React 18 Concurrent schedulers, and LSM Write Amplification formulas.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[var(--border-color)]/50 flex items-center text-xs font-mono text-[var(--text-primary)] font-medium">
                  <span>Open Deck</span>
                  <ChevronRight className="w-3.5 h-3.5 ml-1 text-[var(--secondary-accent)] group-hover:translate-x-1 transition-transform" />
                </div>
              </MotionCard>
            </StaggerItem>

            {/* Item 3: Skill Decay Risk */}
            <StaggerItem>
              <MotionCard 
                onClick={() => onNavigateTab("skillgraph")}
                className={`p-5 bg-[var(--bg-app)] hover:bg-[var(--bg-hover)] border transition-all duration-200 rounded-xl cursor-pointer group shadow-xs flex flex-col justify-between h-full ${
                  completedTasks["task-3"]
                    ? "border-[var(--success)]/40 opacity-75"
                    : "border-[var(--border-color)] hover:border-[var(--accent)]/50"
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Badge variant={completedTasks["task-3"] ? "success" : "error"}>
                      {completedTasks["task-3"] ? "COMPLETED" : "DECAY WARNING"}
                    </Badge>
                    <div className="flex items-center space-x-2">
                      <span className="text-[11px] text-[var(--text-secondary)] font-mono flex items-center">
                        <Clock className="w-3 h-3 mr-1 text-[var(--error)]" /> 12 mins
                      </span>
                      <button
                        onClick={(e) => toggleTask("task-3", e)}
                        className="p-1 rounded text-[var(--text-secondary)] hover:text-[var(--success)] transition-colors"
                        title={completedTasks["task-3"] ? "Mark incomplete" : "Mark as completed"}
                      >
                        <CheckCircle2 className={`w-4 h-4 ${completedTasks["task-3"] ? "text-[var(--success)] fill-[var(--success)]/10" : ""}`} />
                      </button>
                    </div>
                  </div>
                  <h4 className={`text-sm font-bold font-heading transition-colors ${completedTasks["task-3"] ? "line-through text-[var(--text-secondary)]" : "text-[var(--text-primary)] group-hover:text-[var(--error)]"}`}>
                    Micro-Frontend State Hydration Node
                  </h4>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed line-clamp-2">
                    Mastery score dropped to 45% due to 14 days without review. Re-read code blueprints and complete check.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[var(--border-color)]/50 flex items-center text-xs font-mono text-[var(--text-primary)] font-medium">
                  <span>Review Node</span>
                  <ChevronRight className="w-3.5 h-3.5 ml-1 text-[var(--error)] group-hover:translate-x-1 transition-transform" />
                </div>
              </MotionCard>
            </StaggerItem>

          </StaggerContainer>
        </Card>
      </FadeInSection>

      {/* Recent Interview Evaluation Log */}
      <FadeInSection>
        <Card>
          <SectionHeader
            title="Recent Mock Interview Evaluations"
            description="Historical committee scores and gap analysis feedback."
            action={
              <button 
                onClick={() => onNavigateTab("analytics")}
                className="text-xs font-mono text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors font-medium cursor-pointer"
              >
                View All History →
              </button>
            }
          />

          {interviewSessions.length === 0 ? (
            /* Elegant Empty State */
            <div className="py-12 px-4 text-center border border-dashed border-[var(--border-color)] rounded-xl mt-6 space-y-3">
              <div className="p-3 w-12 h-12 mx-auto rounded-full bg-[var(--bg-app)] border border-[var(--border-color)] flex items-center justify-center text-[var(--accent)]">
                <BrainCircuit className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold font-heading text-[var(--text-primary)]">
                No Interview Simulations Completed Yet
              </h4>
              <p className="text-xs text-[var(--text-secondary)] max-w-sm mx-auto leading-relaxed">
                Start your first interactive interview drill to receive instant AI scoring across architecture, coding, and behavioral STAR dimensions.
              </p>
              <div className="pt-2">
                <Button
                  onClick={onStartInterview}
                  variant="primary"
                  size="md"
                  icon={<BrainCircuit className="w-3.5 h-3.5" />}
                >
                  Start First Simulation
                </Button>
              </div>
            </div>
          ) : (
            <StaggerContainer className="space-y-3.5 mt-6">
              {interviewSessions.map((session) => (
                <StaggerItem key={session.id}>
                  <MotionCard
                    className="p-5 rounded-xl bg-[var(--bg-app)] border border-[var(--border-color)] hover:border-[var(--accent)]/40 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors"
                  >
                    <div className="space-y-1.5 max-w-2xl">
                      <div className="flex items-center space-x-2">
                        <Badge variant="neutral">{session.mode}</Badge>
                        <span className="text-xs text-[var(--border-color)]">•</span>
                        <span className="text-xs text-[var(--text-secondary)] font-mono">{session.date}</span>
                      </div>
                      <h4 className="text-xs font-bold font-heading text-[var(--text-primary)] line-clamp-1">
                        {session.question}
                      </h4>
                      <p className="text-xs text-[var(--text-secondary)] line-clamp-1">
                        <span className="font-semibold text-[var(--text-primary)]">Suggested Upgrade:</span> {session.suggestedUpgrade}
                      </p>
                    </div>

                    <div className="flex items-center space-x-5 shrink-0">
                      <div className="text-right">
                        <div className="text-xl font-bold font-numbers text-[var(--text-primary)]">
                          <CountUpNumber value={session.overallScore} suffix="/100" />
                        </div>
                        <div className="text-[10px] text-[var(--text-secondary)] font-mono">Committee Score</div>
                      </div>
                      <Button
                        onClick={onStartInterview}
                        variant="outline"
                        size="sm"
                      >
                        Retry Drill
                      </Button>
                    </div>
                  </MotionCard>
                </StaggerItem>
              ))}
            </StaggerContainer>
          )}
        </Card>
      </FadeInSection>

    </div>
  );
};
