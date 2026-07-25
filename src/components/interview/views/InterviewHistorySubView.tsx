import React, { useState } from "react";
import { MockSessionRecord } from "../../../data/interviewData";
import { Card, Button } from "../../DesignSystem";
import { InterviewResultCard } from "../InterviewResultCard";
import { Search, Filter, History, Award, BrainCircuit } from "lucide-react";
import { StaggerContainer, StaggerItem } from "../../motion/StaggerContainer";

interface InterviewHistorySubViewProps {
  interviewHistory: MockSessionRecord[];
  onViewReport: (session: MockSessionRecord) => void;
  onRetakeSession: (session: MockSessionRecord) => void;
  onStartNewSession?: () => void;
}

export const InterviewHistorySubView: React.FC<InterviewHistorySubViewProps> = ({
  interviewHistory,
  onViewReport,
  onRetakeSession,
  onStartNewSession,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTypeFilter, setSelectedTypeFilter] = useState<string>("All");

  const filteredHistory = interviewHistory.filter((session) => {
    const matchesSearch =
      session.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      session.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      session.companyTier.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType =
      selectedTypeFilter === "All" || session.type === selectedTypeFilter;

    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[var(--border-color)]">
        <div>
          <h1 className="text-xl font-bold font-heading text-[var(--text-primary)] flex items-center space-x-2">
            <History className="w-5 h-5 text-[var(--accent)]" />
            <span>Interview Battery Archives</span>
          </h1>
          <p className="text-xs text-[var(--text-secondary)] mt-0.5">
            Historical transcript logs, AI evaluations, and performance trajectories.
          </p>
        </div>

        <div className="flex items-center space-x-2 font-mono text-xs text-[var(--text-secondary)]">
          <Award className="w-4 h-4 text-[var(--accent)]" />
          <span>{interviewHistory.length} Recorded Sessions</span>
        </div>
      </div>

      {/* Search and Filters Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-2xl shadow-craft">
        
        {/* Search Input */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]" />
          <input
            type="text"
            placeholder="Search by role, type, or company..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-[var(--bg-app)] border border-[var(--border-color)] rounded-xl text-xs font-mono text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:outline-none focus:border-[var(--accent)]"
          />
        </div>

        {/* Type Filter Buttons */}
        <div className="flex items-center space-x-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          <span className="text-xs font-mono text-[var(--text-secondary)] mr-1 flex items-center">
            <Filter className="w-3 h-3 mr-1" /> Type:
          </span>
          {["All", "Technical", "Behavioral", "Coding", "Mixed"].map((t) => (
            <button
              key={t}
              onClick={() => setSelectedTypeFilter(t)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
                selectedTypeFilter === t
                  ? "bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] border border-[var(--border-color)] font-bold shadow-xs"
                  : "bg-[var(--bg-app)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-transparent"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

      </div>

      {/* List of Interview Results or Elegant Empty State */}
      {filteredHistory.length > 0 ? (
        <StaggerContainer className="space-y-4">
          {filteredHistory.map((session) => (
            <StaggerItem key={session.id}>
              <InterviewResultCard
                session={session}
                onViewReport={onViewReport}
                onRetake={onRetakeSession}
              />
            </StaggerItem>
          ))}
        </StaggerContainer>
      ) : (
        /* Requirement 14: Elegant Empty State */
        <Card className="text-center py-16 px-6 space-y-4 border-dashed border-[var(--border-color)]">
          <div className="w-12 h-12 mx-auto rounded-full bg-[var(--bg-app)] border border-[var(--border-color)] flex items-center justify-center text-[var(--accent)]">
            <BrainCircuit className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-bold font-heading text-[var(--text-primary)]">
              No Interview History Found
            </h3>
            <p className="text-xs text-[var(--text-secondary)] max-w-sm mx-auto leading-relaxed">
              Start your first voice or text interview simulation to generate comprehensive committee reports and gap analysis.
            </p>
          </div>
          {onStartNewSession && (
            <div className="pt-2">
              <Button
                onClick={onStartNewSession}
                variant="primary"
                size="md"
                icon={<BrainCircuit className="w-3.5 h-3.5" />}
              >
                Start First Interview
              </Button>
            </div>
          )}
        </Card>
      )}

    </div>
  );
};
