import React from "react";
import { Sparkles, ChevronRight, Zap } from "lucide-react";

interface RecommendationCardProps {
  title: string;
  description: string;
  impactScore: string;
  category: string;
  onAction?: () => void;
  className?: string;
}

export const RecommendationCard: React.FC<RecommendationCardProps> = ({
  title,
  description,
  impactScore,
  category,
  onAction,
  className = "",
}) => {
  return (
    <div
      onClick={onAction}
      className={`p-5 bg-[var(--bg-app)] hover:bg-[var(--bg-hover)] border border-[var(--border-color)] hover:border-[var(--accent)]/50 rounded-xl cursor-pointer group transition-all duration-200 shadow-xs flex flex-col justify-between ${className}`}
    >
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="font-mono text-[10px] text-[var(--accent)] uppercase font-semibold tracking-wider">
            {category}
          </span>
          <span className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-[var(--accent)]/15 text-[var(--accent)] border border-[var(--accent)]/30 font-bold">
            {impactScore}
          </span>
        </div>

        <h4 className="text-xs font-bold font-heading text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
          {title}
        </h4>

        <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed line-clamp-2 font-body">
          {description}
        </p>
      </div>

      <div className="mt-3 pt-2.5 border-t border-[var(--border-color)]/50 flex items-center text-[11px] font-mono text-[var(--text-primary)] font-medium">
        <span>Apply Recommendation</span>
        <ChevronRight className="w-3.5 h-3.5 ml-1 text-[var(--accent)] group-hover:translate-x-1 transition-transform" />
      </div>
    </div>
  );
};
