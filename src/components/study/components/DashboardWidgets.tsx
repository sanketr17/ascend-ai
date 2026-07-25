import React from "react";
import { 
  DailyGoalData, 
  WeeklyActivityData, 
  MotivationalQuoteData, 
  LearningMilestone 
} from "../../../types/studyTypes";
import { Card, Button, Badge, StatBox } from "../../DesignSystem";
import { 
  Flame, 
  Clock, 
  CheckCircle2, 
  Award, 
  Target, 
  Zap, 
  TrendingUp, 
  Calendar, 
  Quote,
  ArrowRight,
  BookOpen
} from "lucide-react";

interface DailyGoalWidgetProps {
  dailyGoal: DailyGoalData;
}

export const DailyGoalWidget: React.FC<DailyGoalWidgetProps> = ({ dailyGoal }) => {
  const percentMinutes = Math.min(100, Math.round((dailyGoal.completedMinutes / dailyGoal.targetMinutes) * 100));

  return (
    <Card className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Target className="w-4 h-4 text-[var(--accent)]" />
          <span className="text-xs font-mono font-bold text-[var(--text-secondary)] uppercase tracking-wider">
            Daily Goal
          </span>
        </div>
        <Badge variant={percentMinutes >= 100 ? "success" : "accent"}>
          {percentMinutes >= 100 ? "Goal Met!" : `${dailyGoal.completedMinutes}/${dailyGoal.targetMinutes} Mins`}
        </Badge>
      </div>

      <div className="space-y-2">
        <div className="text-2xl font-extrabold font-numbers text-[var(--text-primary)]">
          {dailyGoal.completedMinutes} <span className="text-sm font-normal text-[var(--text-secondary)]">/ {dailyGoal.targetMinutes} Mins</span>
        </div>

        <div className="w-full h-2.5 bg-[var(--bg-app)] rounded-full overflow-hidden border border-[var(--border-color)]">
          <div 
            className="h-full bg-[var(--accent)] rounded-full transition-all duration-300"
            style={{ width: `${percentMinutes}%` }}
          />
        </div>
      </div>

      <div className="flex items-center justify-between text-xs font-mono text-[var(--text-secondary)] pt-1">
        <span>Lessons Completed: {dailyGoal.completedLessons}/{dailyGoal.targetLessons}</span>
        <span className="font-bold text-[var(--success)]">{percentMinutes}% Complete</span>
      </div>
    </Card>
  );
};

interface StreakWidgetProps {
  currentStreakDays: number;
}

export const StreakWidget: React.FC<StreakWidgetProps> = ({ currentStreakDays }) => {
  return (
    <Card className="flex flex-col justify-between space-y-4 bg-gradient-to-br from-[var(--bg-surface)] to-[var(--bg-app)]">
      <div className="flex items-center justify-between">
        <span className="text-xs font-mono font-bold text-[var(--text-secondary)] uppercase tracking-wider flex items-center space-x-1.5">
          <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
          <span>Current Streak</span>
        </span>
        <Badge variant="accent">Active</Badge>
      </div>

      <div className="flex items-baseline space-x-2">
        <div className="text-4xl font-extrabold font-numbers text-[var(--text-primary)]">
          {currentStreakDays}
        </div>
        <div className="text-sm font-heading font-bold text-[var(--text-secondary)]">
          Consecutive Days
        </div>
      </div>

      <p className="text-xs text-[var(--text-secondary)] font-body">
        Keep learning today to extend your streak to {currentStreakDays + 1} days!
      </p>
    </Card>
  );
};

interface WeeklyActivityWidgetProps {
  weeklyData: WeeklyActivityData[];
}

export const WeeklyActivityWidget: React.FC<WeeklyActivityWidgetProps> = ({ weeklyData }) => {
  return (
    <Card className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-xs font-mono font-bold text-[var(--text-secondary)] uppercase tracking-wider flex items-center space-x-1.5">
          <TrendingUp className="w-4 h-4 text-[var(--accent)]" />
          <span>Weekly Learning Activity</span>
        </span>
        <span className="text-xs font-mono text-[var(--text-secondary)]">13.3 Hours Total</span>
      </div>

      {/* Bar Chart */}
      <div className="flex items-end justify-between h-28 pt-2 px-2 gap-2 border-b border-[var(--border-color)] pb-2">
        {weeklyData.map((item, idx) => (
          <div key={idx} className="flex-1 flex flex-col items-center gap-1 group">
            <div className="text-[10px] font-mono text-[var(--text-secondary)] opacity-0 group-hover:opacity-100 transition-opacity">
              {item.hours}h
            </div>
            <div className="w-full bg-[var(--bg-app)] rounded-t-lg h-20 flex items-end overflow-hidden border border-[var(--border-color)]/40">
              <div
                className="w-full bg-[var(--accent)] rounded-t-lg transition-all duration-300 group-hover:brightness-110"
                style={{ height: `${item.percentage}%` }}
              />
            </div>
            <div className="text-[10px] font-mono font-bold text-[var(--text-secondary)]">{item.day}</div>
          </div>
        ))}
      </div>
    </Card>
  );
};

interface MotivationalQuoteWidgetProps {
  quote: MotivationalQuoteData;
}

export const MotivationalQuoteWidget: React.FC<MotivationalQuoteWidgetProps> = ({ quote }) => {
  return (
    <Card className="space-y-3 bg-gradient-to-r from-[var(--bg-surface)] via-[var(--bg-app)] to-[var(--bg-surface)] border-l-4 border-l-[var(--accent)]">
      <div className="flex items-center space-x-2 text-xs font-mono font-bold text-[var(--accent)] uppercase tracking-wider">
        <Quote className="w-4 h-4" />
        <span>Daily Motivational Insight</span>
      </div>

      <p className="text-sm font-heading font-medium italic text-[var(--text-primary)] leading-relaxed">
        "{quote.quote}"
      </p>

      <div className="text-xs font-mono text-[var(--text-secondary)]">
        — <span className="font-bold text-[var(--text-primary)]">{quote.author}</span>, {quote.role}
      </div>
    </Card>
  );
};

interface UpcomingMilestoneWidgetProps {
  milestone: LearningMilestone;
  onViewRoadmap: () => void;
}

export const UpcomingMilestoneWidget: React.FC<UpcomingMilestoneWidgetProps> = ({
  milestone,
  onViewRoadmap,
}) => {
  return (
    <Card className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-xs font-mono font-bold text-[var(--text-secondary)] uppercase tracking-wider flex items-center space-x-1.5">
          <Calendar className="w-4 h-4 text-[var(--secondary-accent)]" />
          <span>Upcoming Milestone</span>
        </span>
        <Badge variant="accent">In Progress</Badge>
      </div>

      <div>
        <h4 className="text-sm font-bold font-heading text-[var(--text-primary)]">
          {milestone.title}
        </h4>
        <p className="text-xs text-[var(--text-secondary)] mt-1 font-body">
          {milestone.description}
        </p>
      </div>

      <div className="pt-2 border-t border-[var(--border-color)] flex items-center justify-between text-xs font-mono">
        <span className="text-[var(--text-secondary)]">Est: {milestone.estimatedCompletion}</span>
        <Button onClick={onViewRoadmap} variant="ghost" size="sm" icon={<ArrowRight className="w-3.5 h-3.5" />}>
          View Roadmap
        </Button>
      </div>
    </Card>
  );
};

interface TodaysChallengeWidgetProps {
  onStartChallenge: () => void;
}

export const TodaysChallengeWidget: React.FC<TodaysChallengeWidgetProps> = ({ onStartChallenge }) => {
  return (
    <Card className="p-6 space-y-4 bg-gradient-to-br from-[var(--bg-surface)] via-[var(--bg-app)] to-[var(--bg-surface)] border-2 border-[var(--accent)]/30">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Zap className="w-4 h-4 text-[var(--accent)]" />
          <span className="text-xs font-mono font-bold text-[var(--text-secondary)] uppercase tracking-wider">
            Today's Challenge
          </span>
        </div>
        <Badge variant="accent">+50 XP</Badge>
      </div>

      <div className="space-y-1">
        <h4 className="text-sm font-bold font-heading text-[var(--text-primary)]">
          Distributed Consensus & Raft Protocol Quiz
        </h4>
        <p className="text-xs text-[var(--text-secondary)] font-body">
          Test your understanding of leader election, log replication, and split-brain safety guarantees.
        </p>
      </div>

      <Button
        onClick={onStartChallenge}
        variant="accent"
        size="sm"
        className="w-full"
        icon={<Zap className="w-3.5 h-3.5" />}
      >
        Accept Today's Challenge
      </Button>
    </Card>
  );
};
