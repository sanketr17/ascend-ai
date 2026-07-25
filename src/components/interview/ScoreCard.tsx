import React from "react";
import { Award, TrendingUp, Target, Clock } from "lucide-react";

interface ScoreCardProps {
  label: string;
  score: number | string;
  subtext?: string;
  icon?: React.ReactNode;
  trend?: string;
  className?: string;
}

export const ScoreCard: React.FC<ScoreCardProps> = ({
  label,
  score,
  subtext,
  icon,
  trend,
  className = "",
}) => {
  return (
    <div className={`bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-2xl p-5 shadow-craft space-y-2 text-[var(--text-primary)] ${className}`}>
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-mono text-[var(--text-secondary)] uppercase tracking-wider">
          {label}
        </span>
        {icon && <span className="text-[var(--accent)]">{icon}</span>}
      </div>

      <div className="text-3xl font-extrabold font-numbers tracking-tight">
        {score}
      </div>

      {(subtext || trend) && (
        <div className="flex items-center justify-between text-xs pt-1">
          {subtext && <span className="text-[var(--text-secondary)]">{subtext}</span>}
          {trend && <span className="font-numbers font-medium text-[var(--success)]">{trend}</span>}
        </div>
      )}
    </div>
  );
};
