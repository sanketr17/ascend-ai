import React from "react";
import { CheckCircle2, XCircle, Clock } from "lucide-react";

interface TimelineItem {
  id: string;
  question: string;
  category: string;
  score: number;
  responseTimeSeconds: number;
  skipped: boolean;
  userAnswer?: string;
  feedback?: string;
}

interface InterviewTimelineProps {
  questions: TimelineItem[];
  className?: string;
}

export const InterviewTimeline: React.FC<InterviewTimelineProps> = ({ questions, className = "" }) => {
  return (
    <div className={`space-y-4 ${className}`}>
      <h4 className="text-xs font-bold font-mono text-[var(--text-secondary)] uppercase tracking-wider">
        Question Sequence & Response Performance Timeline
      </h4>

      <div className="space-y-3 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-[var(--border-color)]">
        {questions.map((q, idx) => (
          <div key={q.id || idx} className="relative pl-9 space-y-1.5">
            {/* Circle Node */}
            <div className="absolute left-1 top-1 w-5 h-5 rounded-full bg-[var(--bg-surface)] border-2 border-[var(--accent)] flex items-center justify-center text-[10px] font-bold font-mono text-[var(--accent)] shadow-xs">
              {idx + 1}
            </div>

            <div className="p-4 bg-[var(--bg-app)] border border-[var(--border-color)] rounded-xl space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono text-[11px] text-[var(--accent)] font-semibold">
                  {q.category}
                </span>
                <div className="flex items-center space-x-3 text-xs font-mono">
                  <span className="text-[var(--text-secondary)] flex items-center">
                    <Clock className="w-3 h-3 mr-1 text-[var(--accent)]" /> {q.responseTimeSeconds}s
                  </span>
                  <span className="font-bold text-[var(--text-primary)] font-numbers">
                    {q.skipped ? "Skipped" : `${q.score}/100`}
                  </span>
                </div>
              </div>

              <h5 className="text-xs font-bold text-[var(--text-primary)] font-heading leading-relaxed">
                {q.question}
              </h5>

              {q.feedback && (
                <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed font-body border-t border-[var(--border-color)]/50 pt-2">
                  <span className="font-semibold text-[var(--text-primary)]">Committee Notes: </span>
                  {q.feedback}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
