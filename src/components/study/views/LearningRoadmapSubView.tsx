import React from "react";
import { LearningMilestone } from "../../../types/studyTypes";
import { MilestoneCard } from "../components/MilestoneCard";
import { PageTransition, Card, Badge } from "../../DesignSystem";
import { EmptyState } from "../components/EmptyState";
import { StaggerContainer, StaggerItem } from "../../motion/StaggerContainer";
import { Workflow, Sparkles, CheckCircle2 } from "lucide-react";

interface LearningRoadmapSubViewProps {
  milestones: LearningMilestone[];
  onStartPractice: (id: string) => void;
  onStartQuiz: (id: string) => void;
}

export const LearningRoadmapSubView: React.FC<LearningRoadmapSubViewProps> = ({
  milestones,
  onStartPractice,
  onStartQuiz,
}) => {
  return (
    <PageTransition className="space-y-6 max-w-4xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[var(--border-color)]">
        <div>
          <h1 className="text-xl font-bold font-heading text-[var(--text-primary)] flex items-center space-x-2">
            <Workflow className="w-5 h-5 text-[var(--accent)]" />
            <span>Structured Learning Roadmap</span>
          </h1>
          <p className="text-xs text-[var(--text-secondary)] mt-0.5">
            Sequential milestones calibrated for Senior/Staff Engineer mastery.
          </p>
        </div>

        <Badge variant="accent" icon={<Sparkles className="w-3.5 h-3.5" />}>
          Curriculum Phase 2 of 4
        </Badge>
      </div>

      {/* Timeline Section */}
      {milestones.length === 0 ? (
        <EmptyState variant="no-roadmap" />
      ) : (
        <StaggerContainer staggerDelay={0.08} className="pt-4">
          {milestones.map((ms) => (
            <StaggerItem key={ms.id}>
              <MilestoneCard
                milestone={ms}
                onSelectPractice={onStartPractice}
                onSelectQuiz={onStartQuiz}
              />
            </StaggerItem>
          ))}
        </StaggerContainer>
      )}

    </PageTransition>
  );
};
