import React from "react";
import { motion, useReducedMotion } from "motion/react";
import { WeakTopicItem } from "../../../types/studyTypes";
import { Card, Button, Badge, SectionHeader, PageTransition } from "../../DesignSystem";
import { EmptyState } from "../components/EmptyState";
import { StaggerContainer, StaggerItem } from "../../motion/StaggerContainer";
import { 
  AlertTriangle, 
  Clock, 
  Zap, 
  BookOpen, 
  ArrowRight, 
  CheckCircle2, 
  TrendingUp,
  Sparkles
} from "lucide-react";

interface WeakTopicsSubViewProps {
  weakTopics: WeakTopicItem[];
  onStartPractice: (topicName: string) => void;
}

export const WeakTopicsSubView: React.FC<WeakTopicsSubViewProps> = ({
  weakTopics,
  onStartPractice,
}) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <PageTransition className="space-y-6 max-w-4xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[var(--border-color)]">
        <div>
          <h1 className="text-xl font-bold font-heading text-[var(--text-primary)] flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-amber-500" />
            <span>Targeted Skill Gap & Weak Topics Analysis</span>
          </h1>
          <p className="text-xs text-[var(--text-secondary)] mt-0.5">
            AI Coach identified these knowledge gaps based on your recent quiz and practice session telemetry.
          </p>
        </div>

        <Badge variant="accent" icon={<Sparkles className="w-3.5 h-3.5" />}>
          {weakTopics.length} Priority Focus Areas
        </Badge>
      </div>

      {/* Weak Topics List */}
      {weakTopics.length === 0 ? (
        <EmptyState variant="no-weak-topics" />
      ) : (
        <StaggerContainer staggerDelay={0.07} className="space-y-4">
          {weakTopics.map((item) => (
            <StaggerItem key={item.id}>
              <motion.div
                whileHover={shouldReduceMotion ? {} : { y: -2 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="space-y-4 border-l-4 border-l-amber-500 hover:border-[var(--accent)] transition-colors">
                  
                  {/* Top Bar */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="w-5 h-5 rounded-full bg-amber-500/15 text-amber-500 font-bold text-xs font-mono flex items-center justify-center">
                          #{item.suggestedOrder}
                        </span>
                        <Badge variant={item.priority === "High" ? "error" : "accent"}>
                          {item.priority} Priority Gap
                        </Badge>
                        <span className="text-xs font-mono text-[var(--text-secondary)]">{item.subjectName}</span>
                      </div>

                      <h3 className="text-base font-bold font-heading text-[var(--text-primary)]">
                        {item.topicName}
                      </h3>
                    </div>

                    <div className="flex items-center space-x-3 shrink-0">
                      <div className="text-right">
                        <div className="text-xs font-mono text-[var(--text-secondary)]">Current Mastery</div>
                        <div className="text-sm font-bold font-numbers text-[var(--text-primary)]">{item.currentMastery}%</div>
                      </div>

                      <Button
                        onClick={() => onStartPractice(item.topicName)}
                        variant="accent"
                        size="sm"
                        icon={<Zap className="w-3.5 h-3.5" />}
                      >
                        Start Remedial Drill
                      </Button>
                    </div>
                  </div>

                  {/* Gap Description */}
                  <p className="text-xs text-[var(--text-secondary)] bg-[var(--bg-app)] p-3 rounded-xl border border-[var(--border-color)] leading-relaxed font-body">
                    <span className="font-mono font-bold text-[var(--text-primary)]">Gap Telemetry: </span>
                    {item.skillGap}
                  </p>

                  {/* Recommendations & Estimated Time */}
                  <div className="pt-3 border-t border-[var(--border-color)] flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
                    <div className="space-y-1">
                      <div className="font-mono font-bold text-[var(--text-secondary)] uppercase text-[10px]">
                        Recommended Remedial Drills:
                      </div>
                      <div className="flex flex-wrap gap-2 pt-0.5">
                        {item.practiceRecommendations.map((rec, idx) => (
                          <span key={idx} className="px-2.5 py-1 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-color)] text-[11px] font-mono text-[var(--text-primary)] flex items-center space-x-1">
                            <CheckCircle2 className="w-3 h-3 text-[var(--accent)]" />
                            <span>{rec}</span>
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center space-x-1.5 text-xs font-mono text-[var(--text-secondary)] shrink-0 self-end md:self-center">
                      <Clock className="w-3.5 h-3.5 text-[var(--accent)]" />
                      <span>Est. Fix Time: {item.estimatedImprovementHours} hrs</span>
                    </div>
                  </div>

                </Card>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      )}

    </PageTransition>
  );
};
