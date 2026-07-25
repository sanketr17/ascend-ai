import React, { useState } from "react";
import { LearningHistoryRecord, AchievementBadgeData } from "../../../types/studyTypes";
import { Card, Button, Badge, PageTransition, SectionHeader } from "../../DesignSystem";
import { AchievementCard } from "../components/AchievementCard";
import { EmptyState } from "../components/EmptyState";
import { StaggerContainer, StaggerItem } from "../../motion/StaggerContainer";
import { 
  History, 
  Search, 
  Filter, 
  BookOpen, 
  Award, 
  Zap, 
  RotateCcw, 
  Calendar, 
  CheckCircle2, 
  Flame, 
  Workflow, 
  Code2 
} from "lucide-react";

interface LearningHistorySubViewProps {
  history: LearningHistoryRecord[];
  badges: AchievementBadgeData[];
}

export const LearningHistorySubView: React.FC<LearningHistorySubViewProps> = ({
  history,
  badges,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string>("All");

  const filteredHistory = history.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.subjectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.details.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType = selectedType === "All" || item.type === selectedType;

    return matchesSearch && matchesType;
  });

  return (
    <PageTransition className="space-y-8 max-w-4xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[var(--border-color)]">
        <div>
          <h1 className="text-xl font-bold font-heading text-[var(--text-primary)] flex items-center space-x-2">
            <History className="w-5 h-5 text-[var(--accent)]" />
            <span>Learning History & Achievements</span>
          </h1>
          <p className="text-xs text-[var(--text-secondary)] mt-0.5">
            Audit log of completed lessons, quizzes, practice drills, and earned badges.
          </p>
        </div>

        <Badge variant="accent">{history.length} Completed Records</Badge>
      </div>

      {/* Achievement Badges Row */}
      <div className="space-y-4">
        <SectionHeader
          title="Earned Achievements & Trophies"
          subtitle="Milestones unlocked through continuous daily practice."
          icon={<Award className="w-4 h-4 text-amber-400" />}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {badges.map((badge) => (
            <AchievementCard key={badge.id} badge={badge} />
          ))}
        </div>
      </div>

      {/* History Activity Timeline Section */}
      <div className="space-y-4">
        <SectionHeader
          title="Activity Log Timeline"
          subtitle="Chronological sequence of all learning events."
          icon={<Calendar className="w-4 h-4 text-[var(--accent)]" />}
        />

        {/* Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-2xl shadow-craft">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]" />
            <input
              type="text"
              placeholder="Search history..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-[var(--bg-app)] border border-[var(--border-color)] rounded-xl text-xs font-mono text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]"
            />
          </div>

          <div className="flex items-center space-x-1.5 overflow-x-auto">
            {["All", "quiz", "lesson", "practice", "achievement"].map((t) => (
              <button
                key={t}
                onClick={() => setSelectedType(t)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all capitalize shrink-0 border ${
                  selectedType === t
                    ? "bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] border border-[var(--border-color)] font-bold shadow-xs"
                    : "bg-[var(--bg-app)] text-[var(--text-secondary)] border-[var(--border-color)]"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Activity Items List */}
        {filteredHistory.length === 0 ? (
          <EmptyState variant="no-history" />
        ) : (
          <StaggerContainer staggerDelay={0.05} className="space-y-3">
            {filteredHistory.map((item) => (
              <StaggerItem key={item.id}>
                <Card className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-[var(--accent)]/50 transition-colors">
                  <div className="flex items-start space-x-3">
                    <div className="w-9 h-9 rounded-xl bg-[var(--bg-app)] border border-[var(--border-color)] flex items-center justify-center text-[var(--accent)] shrink-0 mt-0.5">
                      {item.type === "quiz" ? <Award className="w-4 h-4 text-[var(--success)]" /> : item.type === "practice" ? <Zap className="w-4 h-4 text-[var(--secondary-accent)]" /> : <BookOpen className="w-4 h-4 text-[var(--accent)]" />}
                    </div>

                    <div className="space-y-0.5">
                      <div className="flex items-center space-x-2">
                        <Badge variant="neutral" size="sm">{item.subjectName}</Badge>
                        <span className="text-[11px] font-mono text-[var(--text-secondary)]">{item.date} • {item.timestamp}</span>
                      </div>

                      <h4 className="text-xs font-bold font-heading text-[var(--text-primary)]">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-[var(--text-secondary)] font-body">
                        {item.details}
                      </p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-xs font-mono font-bold text-[var(--accent)]">
                      {item.durationOrScore}
                    </span>
                  </div>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        )}
      </div>

    </PageTransition>
  );
};
