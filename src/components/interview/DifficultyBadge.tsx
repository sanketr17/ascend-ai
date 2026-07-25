import React from "react";
import { Gauge, Zap, Flame, ShieldAlert } from "lucide-react";

interface DifficultyBadgeProps {
  difficulty: "Easy" | "Medium" | "Hard" | "Adaptive";
  className?: string;
}

export const DifficultyBadge: React.FC<DifficultyBadgeProps> = ({ difficulty, className = "" }) => {
  const config = {
    Easy: {
      color: "bg-[var(--success)]/15 text-[var(--success)] border-[var(--success)]/30",
      icon: Gauge,
      label: "Easy Difficulty",
    },
    Medium: {
      color: "bg-[var(--accent)]/15 text-[var(--accent)] border-[var(--accent)]/30",
      icon: Zap,
      label: "Medium Difficulty",
    },
    Hard: {
      color: "bg-[var(--error)]/15 text-[var(--error)] border-[var(--error)]/30",
      icon: Flame,
      label: "Hard Difficulty",
    },
    Adaptive: {
      color: "bg-[var(--secondary-accent)]/15 text-[var(--secondary-accent)] border-[var(--secondary-accent)]/30",
      icon: ShieldAlert,
      label: "Adaptive Difficulty",
    },
  };

  const curr = config[difficulty] || config.Adaptive;
  const Icon = curr.icon;

  return (
    <span
      className={`inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-md text-[11px] font-mono font-semibold uppercase tracking-wider border ${curr.color} ${className}`}
    >
      <Icon className="w-3 h-3 shrink-0" />
      <span>{difficulty}</span>
    </span>
  );
};
