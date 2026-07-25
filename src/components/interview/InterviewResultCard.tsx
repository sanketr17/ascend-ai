import React from "react";
import { MockSessionRecord } from "../../data/interviewData";
import { Badge } from "../DesignSystem";
import { DifficultyBadge } from "./DifficultyBadge";
import { Clock, Calendar, ChevronRight, Award, RotateCcw } from "lucide-react";

interface InterviewResultCardProps {
  session: MockSessionRecord;
  onViewReport: (session: MockSessionRecord) => void;
  onRetake: (session: MockSessionRecord) => void;
  className?: string;
}

export const InterviewResultCard: React.FC<InterviewResultCardProps> = ({
  session,
  onViewReport,
  onRetake,
  className = "",
}) => {
  return (
    <div className={`p-5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] hover:border-[var(--accent)]/50 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-craft ${className}`}>
      
      {/* Role & Date Info */}
      <div className="space-y-2 max-w-xl">
        <div className="flex items-center space-x-2 text-xs">
          <Badge variant="accent">{session.type}</Badge>
          <DifficultyBadge difficulty={session.difficulty} />
          <span className="text-[var(--text-secondary)] font-mono text-[11px] flex items-center">
            <Calendar className="w-3 h-3 mr-1 text-[var(--accent)]" /> {session.date}
          </span>
        </div>

        <h4 className="text-sm font-bold font-heading text-[var(--text-primary)]">
          {session.role}
        </h4>

        <div className="flex items-center space-x-4 text-xs text-[var(--text-secondary)] font-mono">
          <span className="flex items-center">
            <Clock className="w-3.5 h-3.5 mr-1 text-[var(--accent)]" /> {session.durationMinutes} mins
          </span>
          <span>•</span>
          <span>{session.questionsList.length} Questions</span>
          <span>•</span>
          <span className="text-[var(--success)] font-bold">{session.readinessVerdict}</span>
        </div>
      </div>

      {/* Score & Actions */}
      <div className="flex items-center space-x-5 shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-[var(--border-color)]">
        <div className="text-right">
          <div className="text-3xl font-extrabold font-numbers text-[var(--text-primary)]">
            {session.overallScore}/100
          </div>
          <div className="text-[10px] text-[var(--text-secondary)] font-mono uppercase tracking-wider">Verdict Score</div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => onRetake(session)}
            className="p-2.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-app)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--accent)] transition-colors"
            title="Retake this session"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={() => onViewReport(session)}
            className="px-4 py-2.5 rounded-xl bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] border border-[var(--border-color)] hover:border-[var(--accent)] text-xs font-mono font-medium transition-colors flex items-center space-x-1"
          >
            <span>View Report</span>
            <ChevronRight className="w-3.5 h-3.5 text-[var(--accent)]" />
          </button>
        </div>
      </div>

    </div>
  );
};
