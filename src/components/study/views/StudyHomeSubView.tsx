import React from "react";
import { UserProfile } from "../../../types";
import { 
  StudySubject, 
  DailyGoalData, 
  WeeklyActivityData, 
  MotivationalQuoteData, 
  LearningMilestone 
} from "../../../types/studyTypes";
import { Card, Button, Badge, SectionHeader, StatBox, PageTransition } from "../../DesignSystem";
import { StudyCard } from "../components/StudyCard";
import { StaggerContainer, StaggerItem } from "../../motion/StaggerContainer";
import { 
  DailyGoalWidget, 
  StreakWidget, 
  WeeklyActivityWidget, 
  MotivationalQuoteWidget, 
  UpcomingMilestoneWidget, 
  TodaysChallengeWidget 
} from "../components/DashboardWidgets";
import { 
  BrainCircuit, 
  BookOpen, 
  Zap, 
  RotateCcw, 
  Play, 
  Sparkles, 
  Flame, 
  Award, 
  Clock, 
  CheckCircle2, 
  ArrowRight,
  Target
} from "lucide-react";

interface StudyHomeSubViewProps {
  userProfile: UserProfile;
  subjects: StudySubject[];
  dailyGoal: DailyGoalData;
  weeklyActivity: WeeklyActivityData[];
  quote: MotivationalQuoteData;
  upcomingMilestone: LearningMilestone;
  onNavigateToSubView: (view: string, payload?: any) => void;
  onToggleFavoriteSubject: (id: string) => void;
}

export const StudyHomeSubView: React.FC<StudyHomeSubViewProps> = ({
  userProfile,
  subjects,
  dailyGoal,
  weeklyActivity,
  quote,
  upcomingMilestone,
  onNavigateToSubView,
  onToggleFavoriteSubject,
}) => {
  const continueSubject = subjects.find((s) => s.id === "subj-react") || subjects[0];
  const recentSubjects = subjects.slice(0, 3);

  return (
    <PageTransition className="space-y-8">
      
      <StaggerContainer staggerDelay={0.08} className="space-y-8">
        
        {/* 1. Welcome Section & Coach Greeting */}
        <StaggerItem>
          <Card className="bg-gradient-to-r from-[var(--bg-surface)] via-[var(--bg-app)] to-[var(--bg-surface)] border border-[var(--border-color)] space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2 max-w-2xl">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[var(--success)] animate-pulse" />
                  <span className="text-xs font-mono font-bold text-[var(--text-secondary)] uppercase tracking-wider">
                    ASCEND AI Personal Learning Coach
                  </span>
                  <Badge variant="accent">Tier 1 Calibrated</Badge>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-[var(--text-primary)] tracking-tight">
                  Good morning, {userProfile.name.split(" ")[0] || "Scholar"}
                </h1>
                <p className="text-xs font-body text-[var(--text-secondary)] leading-relaxed">
                  Your personal coach has structured today's learning path targeting <span className="font-bold text-[var(--text-primary)]">{userProfile.targetRole}</span> requirements. Complete 13 more minutes to reach today's goal.
                </p>
              </div>

              <div className="flex items-center space-x-4 shrink-0 pt-4 md:pt-0 border-t md:border-t-0 border-[var(--border-color)]">
                <div className="text-right">
                  <div className="text-3xl font-extrabold font-numbers text-[var(--text-primary)]">
                    {userProfile.readinessScore}%
                  </div>
                  <div className="text-[10px] text-[var(--text-secondary)] font-mono uppercase tracking-wider">Mastery Score</div>
                </div>

                <Button
                  onClick={() => onNavigateToSubView("practice")}
                  variant="accent"
                  size="lg"
                  icon={<Zap className="w-4 h-4" />}
                >
                  Start Daily Practice
                </Button>
              </div>
            </div>

            {/* Learning Statistics Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-[var(--border-color)]">
              <div className="space-y-0.5">
                <div className="text-[10px] font-mono text-[var(--text-secondary)] uppercase">Hours Learned</div>
                <div className="text-xl font-bold font-numbers text-[var(--text-primary)]">38.5 Hours</div>
              </div>
              <div className="space-y-0.5">
                <div className="text-[10px] font-mono text-[var(--text-secondary)] uppercase">Completion Rate</div>
                <div className="text-xl font-bold font-numbers text-[var(--success)]">78% Overall</div>
              </div>
              <div className="space-y-0.5">
                <div className="text-[10px] font-mono text-[var(--text-secondary)] uppercase">Subjects Completed</div>
                <div className="text-xl font-bold font-numbers text-[var(--text-primary)]">4 / 10 Active</div>
              </div>
              <div className="space-y-0.5">
                <div className="text-[10px] font-mono text-[var(--text-secondary)] uppercase">Current Streak</div>
                <div className="text-xl font-bold font-numbers text-amber-500">{dailyGoal.currentStreakDays} Days</div>
              </div>
            </div>
          </Card>
        </StaggerItem>

        {/* 2. Quick Actions Bar */}
        <StaggerItem>
          <div className="p-4 bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-2xl shadow-craft flex items-center justify-between overflow-x-auto gap-3">
            <span className="text-xs font-mono font-bold text-[var(--text-secondary)] uppercase tracking-wider shrink-0 mr-2">
              Quick Actions:
            </span>
            <div className="flex items-center space-x-2 shrink-0">
              <Button
                onClick={() => onNavigateToSubView("flashcards")}
                variant="outline"
                size="sm"
                icon={<RotateCcw className="w-3.5 h-3.5 text-[var(--accent)]" />}
              >
                Review Flashcards
              </Button>

              <Button
                onClick={() => onNavigateToSubView("practice")}
                variant="outline"
                size="sm"
                icon={<Zap className="w-3.5 h-3.5 text-[var(--secondary-accent)]" />}
              >
                Practice Session
              </Button>

              <Button
                onClick={() => onNavigateToSubView("quiz")}
                variant="outline"
                size="sm"
                icon={<Award className="w-3.5 h-3.5 text-[var(--success)]" />}
              >
                Take Quiz
              </Button>

              <Button
                onClick={() => onNavigateToSubView("roadmap")}
                variant="outline"
                size="sm"
                icon={<BookOpen className="w-3.5 h-3.5 text-[var(--accent)]" />}
              >
                Learning Roadmap
              </Button>
            </div>
          </div>
        </StaggerItem>

        {/* 3. Continue Learning & Today's Recommendation */}
        <StaggerItem>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Continue Learning Card (2 Cols) */}
            <Card className="lg:col-span-2 space-y-4 bg-gradient-to-br from-[var(--bg-surface)] to-[var(--bg-app)]">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-[var(--text-secondary)] uppercase tracking-wider flex items-center space-x-2">
                  <Play className="w-4 h-4 text-[var(--accent)] fill-current" />
                  <span>Continue Learning</span>
                </span>
                <Badge variant="accent">Last Studied: {continueSubject.lastStudied}</Badge>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-[var(--bg-app)] rounded-2xl border border-[var(--border-color)]">
                <div className="space-y-1">
                  <h3 className="text-base font-bold font-heading text-[var(--text-primary)]">
                    {continueSubject.name} • Phase 2: CRDT State Synchronization
                  </h3>
                  <p className="text-xs text-[var(--text-secondary)] font-body">
                    Master LWW-Element-Sets, Vector Clocks, and optimistic mutation rollbacks.
                  </p>
                  <div className="flex items-center space-x-4 text-[11px] font-mono text-[var(--text-secondary)] pt-2">
                    <span>{continueSubject.progress}% Complete</span>
                    <span>•</span>
                    <span>Est: {continueSubject.estimatedTimeHours}h</span>
                  </div>
                </div>

                <Button
                  onClick={() => onNavigateToSubView("topic-detail", continueSubject)}
                  variant="accent"
                  size="md"
                  icon={<ArrowRight className="w-4 h-4" />}
                >
                  Resume Lesson
                </Button>
              </div>
            </Card>

            {/* Today's Recommendation (1 Col) */}
            <Card className="space-y-4 border-2 border-[var(--accent)]/30">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-[var(--text-secondary)] uppercase tracking-wider flex items-center space-x-1.5">
                  <Sparkles className="w-4 h-4 text-[var(--accent)]" />
                  <span>Coach Recommendation</span>
                </span>
                <Badge variant="accent">High Priority</Badge>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-bold font-heading text-[var(--text-primary)]">
                  Refine Vector Clock Tombstones
                </h4>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed font-body">
                  Your last quiz indicated a minor gap in CRDT garbage collection under write surges.
                </p>
              </div>

              <Button
                onClick={() => onNavigateToSubView("weak-topics")}
                variant="outline"
                size="sm"
                className="w-full"
                icon={<ArrowRight className="w-3.5 h-3.5" />}
              >
                Review Weak Topics (3)
              </Button>
            </Card>

          </div>
        </StaggerItem>

        {/* 4. Widgets Grid (Daily Goal, Streak, Weekly Activity) */}
        <StaggerItem>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <DailyGoalWidget dailyGoal={dailyGoal} />
            <StreakWidget currentStreakDays={dailyGoal.currentStreakDays} />
            <WeeklyActivityWidget weeklyData={weeklyActivity} />
          </div>
        </StaggerItem>

        {/* 5. Recent Subjects Grid */}
        <StaggerItem>
          <div className="space-y-4">
            <SectionHeader
              title="Recent Subjects"
              subtitle="Quick access to active learning courses."
              action={
                <Button
                  onClick={() => onNavigateToSubView("library")}
                  variant="ghost"
                  size="sm"
                  icon={<ArrowRight className="w-3.5 h-3.5" />}
                >
                  View All 10 Subjects
                </Button>
              }
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recentSubjects.map((subj) => (
                <StudyCard
                  key={subj.id}
                  subject={subj}
                  onContinue={(s) => onNavigateToSubView("topic-detail", s)}
                  onToggleFavorite={onToggleFavoriteSubject}
                />
              ))}
            </div>
          </div>
        </StaggerItem>

        {/* 6. Motivational Quote & Todays Challenge */}
        <StaggerItem>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <MotivationalQuoteWidget quote={quote} />
            <TodaysChallengeWidget onStartChallenge={() => onNavigateToSubView("quiz")} />
          </div>
        </StaggerItem>

      </StaggerContainer>

    </PageTransition>
  );
};
