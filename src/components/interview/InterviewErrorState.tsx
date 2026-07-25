import React from "react";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import { Button } from "../DesignSystem";

interface InterviewErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  onHome?: () => void;
  className?: string;
}

export const InterviewErrorState: React.FC<InterviewErrorStateProps> = ({
  title = "Interview Session Disrupted",
  message = "An unexpected network or media stream error occurred while processing the voice simulation response.",
  onRetry,
  onHome,
  className = "",
}) => {
  return (
    <div className={`p-8 bg-[var(--bg-surface)] border border-[var(--error)]/30 rounded-2xl shadow-craft text-center space-y-6 max-w-md mx-auto ${className}`}>
      <div className="w-14 h-14 mx-auto rounded-full bg-[var(--error)]/10 text-[var(--error)] border border-[var(--error)]/20 flex items-center justify-center">
        <AlertTriangle className="w-7 h-7" />
      </div>

      <div className="space-y-2">
        <h3 className="text-base font-bold font-heading text-[var(--text-primary)]">
          {title}
        </h3>
        <p className="text-xs text-[var(--text-secondary)] font-body leading-relaxed">
          {message}
        </p>
      </div>

      <div className="flex items-center justify-center space-x-3 pt-2">
        {onRetry && (
          <Button
            onClick={onRetry}
            variant="outline"
            size="sm"
            icon={<RefreshCw className="w-3.5 h-3.5" />}
          >
            Retry Session
          </Button>
        )}
        {onHome && (
          <Button
            onClick={onHome}
            variant="primary"
            size="sm"
            icon={<Home className="w-3.5 h-3.5" />}
          >
            Return Home
          </Button>
        )}
      </div>
    </div>
  );
};
