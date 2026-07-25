import React from "react";
import { Badge } from "../DesignSystem";
import { DifficultyBadge } from "./DifficultyBadge";
import { Clock, Play, ArrowRight } from "lucide-react";

interface InterviewCardProps {
  title: string;
  description: string;
  type: "Resume" | "Topic" | "Job Role" | "Mock" | "Practice";
  durationMinutes: number;
  difficulty: "Easy" | "Medium" | "Hard" | "Adaptive";
  icon: React.ReactNode;
  onLaunch: () => void;
  className?: string;
}

export const InterviewCard: React.FC<InterviewCardProps> = ({
  title,
  description,
  type,
  durationMinutes,
  difficulty,
  icon,
  onLaunch,
  className = "",
}) => {
  return (
    <div
      onClick={onLaunch}
      className={`bg-[var(--bg-surface)] border border-[var(--border-color)] hover:border-[var(--accent)]/60 rounded-2xl p-6 shadow-craft hover:shadow-craft-lg cursor-pointer transition-all duration-200 flex flex-col justify-between group text-[var(--text-primary)] ${className}`}
    >
      <div className="space-y-4">
        {/* Top Badges */}
        <div className="flex items-center justify-between">
          <div className="p-2.5 rounded-xl bg-[var(--bg-app)] text-[var(--accent)] border border-[var(--border-color)] group-hover:bg-[var(--accent)] group-hover:text-[var(--bg-app)] transition-colors">
            {icon}
          </div>
          <DifficultyBadge difficulty={difficulty} />
        </div>

        {/* Title & Desc */}
        <div className="space-y-1.5">
          <h3 className="text-base font-bold font-heading text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
            {title}
          </h3>
          <p className="text-xs font-body text-[var(--text-secondary)] leading-relaxed line-clamp-2">
            {description}
          </p>
        </div>
      </div>

      {/* Footer Info */}
      <div className="pt-4 mt-6 border-t border-[var(--border-color)]/60 flex items-center justify-between text-xs font-mono">
        <span className="text-[var(--text-secondary)] flex items-center">
          <Clock className="w-3.5 h-3.5 mr-1 text-[var(--accent)]" />
          {durationMinutes} mins
        </span>

        <span className="text-[var(--text-primary)] font-bold flex items-center space-x-1 group-hover:text-[var(--accent)] transition-colors">
          <span>Start Session</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </span>
      </div>
    </div>
  );
};
