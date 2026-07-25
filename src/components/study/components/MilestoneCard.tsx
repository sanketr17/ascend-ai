import React, { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { LearningMilestone } from "../../../types/studyTypes";
import { Card, Button, Badge } from "../../DesignSystem";
import { 
  CheckCircle2, 
  Circle, 
  ChevronDown, 
  ChevronUp, 
  Clock, 
  BookOpen, 
  Zap, 
  Lock,
  Play
} from "lucide-react";

interface MilestoneCardProps {
  milestone: LearningMilestone;
  onSelectPractice?: (id: string) => void;
  onSelectQuiz?: (id: string) => void;
  className?: string;
}

export const MilestoneCard: React.FC<MilestoneCardProps> = ({
  milestone,
  onSelectPractice,
  onSelectQuiz,
  className = "",
}) => {
  const [isExpanded, setIsExpanded] = useState(milestone.status === "Current");
  const shouldReduceMotion = useReducedMotion();

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Completed":
        return <Badge variant="success" icon={<CheckCircle2 className="w-3 h-3" />}>Completed</Badge>;
      case "Current":
        return <Badge variant="accent" icon={<Clock className="w-3 h-3 animate-spin" />}>In Progress</Badge>;
      case "Upcoming":
        return <Badge variant="neutral" icon={<Lock className="w-3 h-3" />}>Upcoming</Badge>;
      default:
        return null;
    }
  };

  const isCompleted = milestone.status === "Completed";
  const isCurrent = milestone.status === "Current";
  const isUpcoming = milestone.status === "Upcoming";

  return (
    <motion.div 
      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`relative pl-8 sm:pl-10 pb-8 last:pb-0 group ${className}`}
    >
      
      {/* Timeline Node Line */}
      <div className={`absolute left-3 top-3 bottom-0 w-0.5 transition-colors group-last:hidden ${
        isCompleted ? "bg-[var(--success)]/40" : "bg-[var(--border-color)]"
      }`} />

      {/* Timeline Indicator Node */}
      <motion.div 
        animate={isCurrent && !shouldReduceMotion ? { scale: [1, 1.08, 1] } : {}}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        className={`absolute left-0 top-1.5 w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs transition-colors ${
          isCompleted
            ? "bg-[var(--success)]/15 border-[var(--success)] text-[var(--success)]"
            : isCurrent
            ? "bg-[var(--accent)]/15 border-[var(--accent)] text-[var(--accent)] shadow-[0_0_12px_rgba(59,130,246,0.3)]"
            : "bg-[var(--bg-app)] border-[var(--border-color)] text-[var(--text-secondary)] opacity-70"
        }`}
      >
        {isCompleted ? (
          <CheckCircle2 className="w-3.5 h-3.5" />
        ) : isCurrent ? (
          <Circle className="w-2.5 h-2.5 fill-current" />
        ) : (
          <Lock className="w-2.5 h-2.5" />
        )}
      </motion.div>

      <Card className={`space-y-4 transition-all duration-200 ${
        isUpcoming ? "opacity-80 hover:opacity-100" : ""
      } ${isCurrent ? "border-[var(--accent)]/50 shadow-craft-md" : ""}`}>
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              {getStatusBadge(milestone.status)}
              <span className="text-xs font-mono text-[var(--text-secondary)]">Est: {milestone.estimatedCompletion}</span>
            </div>
            <h3 className="text-base font-bold font-heading text-[var(--text-primary)]">
              {milestone.title}
            </h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed font-body">
              {milestone.description}
            </p>
          </div>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 rounded-xl border border-[var(--border-color)] bg-[var(--bg-app)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors self-start sm:self-center flex items-center space-x-1.5 text-xs font-mono"
          >
            <span>{isExpanded ? "Collapse" : "Expand"}</span>
            {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1">
          <div className="flex justify-between items-center text-xs font-mono">
            <span className="text-[var(--text-secondary)]">Milestone Progress</span>
            <span className="font-bold text-[var(--text-primary)] font-numbers">{milestone.progressPercentage}%</span>
          </div>
          <div className="w-full h-2 bg-[var(--bg-app)] rounded-full overflow-hidden border border-[var(--border-color)]/60">
            <motion.div
              className={`h-full rounded-full ${
                isCompleted ? "bg-[var(--success)]" : "bg-[var(--accent)]"
              }`}
              initial={{ width: "0%" }}
              animate={{ width: `${milestone.progressPercentage}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </div>
        </div>

        {/* Expandable Module Detail Cards */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="pt-4 border-t border-[var(--border-color)] grid grid-cols-1 md:grid-cols-2 gap-4 text-xs overflow-hidden"
            >
              
              {/* Lessons Column */}
              <div className="p-3.5 bg-[var(--bg-app)] rounded-xl border border-[var(--border-color)] space-y-2">
                <div className="font-mono font-bold text-[var(--text-primary)] flex items-center justify-between">
                  <span className="flex items-center space-x-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-[var(--accent)]" />
                    <span>Lessons ({milestone.lessonsList.length})</span>
                  </span>
                </div>
                <ul className="space-y-1.5">
                  {milestone.lessonsList.map((les) => (
                    <li key={les.id} className="flex items-center justify-between text-[11px] text-[var(--text-secondary)]">
                      <span className="truncate pr-2">{les.title}</span>
                      {les.completed ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-[var(--success)] shrink-0" />
                      ) : (
                        <Circle className="w-3 h-3 text-[var(--text-secondary)] shrink-0" />
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Practice & Quizzes Column */}
              <div className="p-3.5 bg-[var(--bg-app)] rounded-xl border border-[var(--border-color)] space-y-2">
                <div className="font-mono font-bold text-[var(--text-primary)] flex items-center justify-between">
                  <span className="flex items-center space-x-1.5">
                    <Zap className="w-3.5 h-3.5 text-[var(--secondary-accent)]" />
                    <span>Drills & Quizzes</span>
                  </span>
                </div>
                <div className="space-y-2 pt-1">
                  {milestone.practiceItemsList.map((p) => (
                    <div key={p.id} className="flex items-center justify-between bg-[var(--bg-surface)] p-2 rounded-lg border border-[var(--border-color)]">
                      <span className="truncate text-[11px] font-mono text-[var(--text-primary)]">{p.title}</span>
                      <Button
                        onClick={() => onSelectPractice && onSelectPractice(p.id)}
                        variant="outline"
                        size="sm"
                        className="py-1 px-2 text-[10px]"
                      >
                        Practice
                      </Button>
                    </div>
                  ))}
                  {milestone.quizItemsList.map((q) => (
                    <div key={q.id} className="flex items-center justify-between bg-[var(--bg-surface)] p-2 rounded-lg border border-[var(--border-color)]">
                      <span className="truncate text-[11px] font-mono text-[var(--text-primary)]">{q.title}</span>
                      <Button
                        onClick={() => onSelectQuiz && onSelectQuiz(q.id)}
                        variant="accent"
                        size="sm"
                        className="py-1 px-2 text-[10px]"
                      >
                        Take Quiz
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

            </motion.div>
          )}
        </AnimatePresence>

      </Card>

    </motion.div>
  );
};
