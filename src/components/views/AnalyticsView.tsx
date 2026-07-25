import React from "react";
import { UserProfile, SkillNode, InterviewSession } from "../../types";
import { Card, StatBox, SectionHeader } from "../DesignSystem";
import { StaggerContainer, StaggerItem, FadeInSection } from "../motion";
import { 
  BarChart3
} from "lucide-react";

interface AnalyticsViewProps {
  userProfile: UserProfile;
  skillNodes: SkillNode[];
  interviewSessions: InterviewSession[];
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({
  userProfile,
  skillNodes,
}) => {
  const masteredCount = skillNodes.filter(s => s.status === "Mastered").length;
  const reviewCount = skillNodes.filter(s => s.status === "Needs Review" || s.status === "Decay Risk").length;

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <FadeInSection>
        <Card>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-bold font-heading text-[var(--text-primary)] flex items-center space-x-2">
                <BarChart3 className="w-5 h-5 text-[var(--accent)]" />
                <span>Performance Analytics & Percentiles</span>
              </h2>
              <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                Historical trajectories, mastery distribution, and target benchmark breakdown.
              </p>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-2xl font-extrabold font-numbers text-[var(--text-primary)]">
                  Top 12%
                </div>
                <div className="text-[10px] text-[var(--text-secondary)] font-mono uppercase tracking-wider">Percentile vs Applicants</div>
              </div>
            </div>
          </div>
        </Card>
      </FadeInSection>

      {/* Overview Stat Grid */}
      <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StaggerItem>
          <StatBox
            label="Readiness Index"
            value={`${userProfile.readinessScore}/100`}
            trend="+4.2% this week"
          />
        </StaggerItem>

        <StaggerItem>
          <StatBox
            label="Mastered Nodes"
            value={`${masteredCount}/${skillNodes.length}`}
            subtitle={`${Math.round((masteredCount / skillNodes.length) * 100)}% total coverage`}
          />
        </StaggerItem>

        <StaggerItem>
          <StatBox
            label="Current Streak"
            value={`${userProfile.currentStreakDays}d (${userProfile.completedHoursThisWeek}h)`}
            subtitle="14 consecutive days"
          />
        </StaggerItem>

        <StaggerItem>
          <StatBox
            label="Needs Review"
            value={`${reviewCount} Nodes`}
            subtitle="Queued for review today"
          />
        </StaggerItem>
      </StaggerContainer>

      {/* Skill Breakdown Chart / Table */}
      <FadeInSection>
        <Card className="space-y-4">
          <SectionHeader
            title="Target Metric Breakdown vs Tier 1 Standards"
            subtitle="Real-time calibration against benchmark engineering standards."
          />

          <div className="space-y-3 pt-1">
            {Object.entries(userProfile.targetMetrics).map(([key, rawScore]) => {
              const score = Number(rawScore);
              return (
                <div key={key} className="p-3.5 bg-[var(--bg-app)] rounded-xl border border-[var(--border-color)] space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-bold font-heading">
                    <span className="capitalize text-[var(--text-primary)]">
                      {key.replace(/([A-Z])/g, " $1")}
                    </span>
                    <span className="font-numbers text-[var(--text-primary)]">{score}%</span>
                  </div>

                  <div className="w-full h-2 bg-[var(--bg-surface)] border border-[var(--border-color)]/60 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${score >= 85 ? "bg-[var(--success)]" : "bg-[var(--accent)]"}`}
                      style={{ width: `${score}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-[var(--text-secondary)] font-mono pt-0.5">
                    <span>Tier 1 Target Benchmark: 85%</span>
                    <span className="font-bold">{score >= 85 ? "Target Exceeded" : "Needs boost"}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </FadeInSection>

    </div>
  );
};
