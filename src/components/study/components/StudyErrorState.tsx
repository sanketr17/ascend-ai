import React from "react";
import { AlertCircle, RotateCcw } from "lucide-react";
import { Button } from "../../DesignSystem";

interface StudyErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  className?: string;
}

export const StudyErrorState: React.FC<StudyErrorStateProps> = ({
  title = "Unable to Load Study Data",
  message = "A temporary network disruption occurred while fetching your learning roadmap telemetry. Please try again.",
  onRetry,
  className = "",
}) => {
  return (
    <div className={`p-8 sm:p-12 bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-2xl shadow-craft text-center space-y-4 flex flex-col items-center justify-center ${className}`}>
      <div className="w-12 h-12 rounded-2xl bg-[var(--error)]/15 border border-[var(--error)]/30 flex items-center justify-center text-[var(--error)]">
        <AlertCircle className="w-6 h-6" />
      </div>

      <div className="space-y-1.5 max-w-md">
        <h3 className="text-base font-bold font-heading text-[var(--text-primary)]">
          {title}
        </h3>
        <p className="text-xs text-[var(--text-secondary)] leading-relaxed font-body">
          {message}
        </p>
      </div>

      {onRetry && (
        <Button onClick={onRetry} variant="accent" size="sm" icon={<RotateCcw className="w-3.5 h-3.5" />}>
          Retry Connection
        </Button>
      )}
    </div>
  );
};
