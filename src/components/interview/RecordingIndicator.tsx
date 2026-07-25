import React from "react";
import { Mic, Pause, CheckCircle2, Loader2 } from "lucide-react";

interface RecordingIndicatorProps {
  status: "idle" | "recording" | "paused" | "evaluating" | "completed";
  className?: string;
}

export const RecordingIndicator: React.FC<RecordingIndicatorProps> = ({ status, className = "" }) => {
  if (status === "recording") {
    return (
      <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[var(--error)]/15 border border-[var(--error)]/30 text-[var(--error)] text-xs font-mono font-medium ${className}`}>
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--error)] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--error)]"></span>
        </span>
        <Mic className="w-3.5 h-3.5" />
        <span>Live Voice Recording</span>
      </div>
    );
  }

  if (status === "paused") {
    return (
      <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[var(--accent)]/15 border border-[var(--accent)]/30 text-[var(--accent)] text-xs font-mono font-medium ${className}`}>
        <Pause className="w-3.5 h-3.5" />
        <span>Interview Paused</span>
      </div>
    );
  }

  if (status === "evaluating") {
    return (
      <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[var(--secondary-accent)]/15 border border-[var(--secondary-accent)]/30 text-[var(--secondary-accent)] text-xs font-mono font-medium ${className}`}>
        <Loader2 className="w-3.5 h-3.5 animate-spin" />
        <span>AI Committee Scoring...</span>
      </div>
    );
  }

  if (status === "completed") {
    return (
      <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[var(--success)]/15 border border-[var(--success)]/30 text-[var(--success)] text-xs font-mono font-medium ${className}`}>
        <CheckCircle2 className="w-3.5 h-3.5" />
        <span>Evaluation Ready</span>
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[var(--bg-app)] border border-[var(--border-color)] text-[var(--text-secondary)] text-xs font-mono ${className}`}>
      <span className="w-2 h-2 rounded-full bg-[var(--text-secondary)]/50" />
      <span>Standby / Ready</span>
    </div>
  );
};
